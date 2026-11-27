"use server";

import { randomUUID } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ALLOWED_REGIONS } from "@/config/regions";
import { getPrisma } from "@/server/db";
import { canApplyToEvent, canUseCommunityAccount, eventResultSchema, eventSchema, releasesEventSlot, waitlistSchema } from "@/server/community-validation";
import { requireEventManager, requireGuildManager, requireUserId } from "@/server/permissions";
import type { FormActionState } from "@/server/profile-actions";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
}

export async function createEvent(_previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    topic: formData.get("topic"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    registrationDeadline: formData.get("registrationDeadline"),
    capacity: formData.get("capacity"),
    isOnline: formData.get("isOnline"),
    location: formData.get("location"),
    hostGuildId: formData.get("hostGuildId"),
  });
  if (!parsed.success) return { error: "Please check all event details and try again." };
  if (parsed.data.startsAt <= new Date()
    || parsed.data.endsAt <= parsed.data.startsAt
    || parsed.data.registrationDeadline >= parsed.data.startsAt
    || parsed.data.registrationDeadline <= new Date()
    || (!parsed.data.isOnline && !parsed.data.location)) {
    return { error: "Check the event dates, deadline, and in-person location." };
  }

  const userId = await requireUserId();
  await requireGuildManager(parsed.data.hostGuildId, userId);
  const event = await getPrisma().hackathonEvent.create({
    data: {
      ...parsed.data,
      location: parsed.data.location || null,
      slug: `${slugify(parsed.data.title)}-${randomUUID().slice(0, 8)}`,
      timezone: "Asia/Manila",
    },
    select: { slug: true },
  });
  revalidatePath("/hackathons");
  redirect(`/hackathons/${event.slug}`);
}

export async function applyToEvent(eventId: string, _previous: FormActionState, _formData: FormData): Promise<FormActionState> {
  const userId = await requireUserId();
  const db = getPrisma();
  let eventSlug: string;
  try {
    eventSlug = await db.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<Array<{ id: string }>>`
        SELECT "id" FROM "HackathonEvent" WHERE "id" = ${eventId} FOR UPDATE
      `;
      if (locked.length === 0) throw new Error("Event not found.");

      const event = await tx.hackathonEvent.findUniqueOrThrow({ where: { id: eventId } });
      if (!canApplyToEvent(event)) {
        throw new Error("This event is closed, past its deadline, or at capacity.");
      }
      const existing = await tx.eventRegistration.findUnique({
        where: { eventId_userId: { eventId, userId } },
        select: { id: true },
      });
      if (existing) throw new Error("You have already applied to this event.");

      await tx.hackathonEvent.update({
        where: { id: eventId },
        data: { reservedSlots: { increment: 1 } },
      });
      await tx.eventRegistration.create({ data: { eventId, userId } });
      const managers = await tx.guildMembership.findMany({
        where: { guildId: event.hostGuildId, role: { in: ["OWNER", "ADMIN"] }, userId: { not: userId } },
        select: { userId: true },
      });
      await Promise.all(managers.map(({ userId: recipientId }) => tx.notification.create({
        data: {
          recipientId,
          actorId: userId,
          type: "EVENT_APPLICATION",
          title: `New application for ${event.title}`,
          message: "An applicant is waiting for organizer review.",
          href: `/hackathons/${event.slug}/manage`,
        },
      })));
      return event.slug;
    });
  } catch (error) {
    if (error instanceof Error && (
      error.message === "Event not found."
      || error.message === "This event is closed, past its deadline, or at capacity."
      || error.message === "You have already applied to this event."
    )) return { error: error.message };
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "You have already applied to this event." };
    }
    throw error;
  }
  revalidatePath(`/hackathons/${eventSlug}`);
  revalidatePath(`/hackathons/${eventSlug}/manage`);
  return { success: "Application submitted. Your pending place counts toward event capacity." };
}

export async function reviewEventRegistration(
  eventId: string,
  registrationId: string,
  status: "ACCEPTED" | "REJECTED",
  _formData: FormData,
) {
  const reviewerId = await requireUserId();
  await requireEventManager(eventId, reviewerId);
  const db = getPrisma();
  const event = await db.$transaction(async (tx) => {
    const locked = await tx.$queryRaw<Array<{ id: string }>>`
      SELECT "id" FROM "HackathonEvent" WHERE "id" = ${eventId} FOR UPDATE
    `;
    if (locked.length === 0) throw new Error("Event not found.");
    const registration = await tx.eventRegistration.findUnique({
      where: { id: registrationId },
      select: { eventId: true, userId: true, status: true, user: { select: { adultAttestedAt: true } } },
    });
    if (!registration || registration.eventId !== eventId || registration.status !== "PENDING") {
      throw new Error("This application is no longer pending.");
    }
    if (status === "ACCEPTED" && !registration.user.adultAttestedAt) {
      throw new Error("This applicant must confirm their age before being accepted.");
    }

    await tx.eventRegistration.update({
      where: { id: registrationId },
      data: { status, reviewedById: reviewerId },
    });
    if (releasesEventSlot(registration.status, status)) {
      await tx.hackathonEvent.update({
        where: { id: eventId },
        data: { reservedSlots: { decrement: 1 } },
      });
    }
    const event = await tx.hackathonEvent.findUniqueOrThrow({
      where: { id: eventId },
      select: { slug: true, title: true },
    });
    await tx.notification.create({
      data: {
        recipientId: registration.userId,
        actorId: reviewerId,
        type: "EVENT_APPLICATION_REVIEW",
        title: `Application update for ${event.title}`,
        message: status === "ACCEPTED" ? "Your application was accepted." : "Your application was declined.",
        href: `/hackathons/${event.slug}`,
      },
    });
    return event;
  });
  revalidatePath(`/hackathons/${event.slug}`);
  revalidatePath(`/hackathons/${event.slug}/manage`);
}

export async function assignEventOrganizer(eventId: string, _previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = waitlistSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { error: "Enter the organizer's account email." };
  const userId = await requireUserId();
  const db = getPrisma();
  const event = await db.hackathonEvent.findUnique({
    where: { id: eventId },
    select: { slug: true, hostGuildId: true },
  });
  if (!event) return { error: "Event not found." };
  await requireGuildManager(event.hostGuildId, userId);
  const organizer = await db.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, username: true, regionId: true, area: true, waitlistedAt: true, emailVerifiedAt: true, adultAttestedAt: true },
  });
  if (!organizer) return { error: "No account matches that email." };
  if (!canUseCommunityAccount(organizer, ALLOWED_REGIONS.map((region) => region.id))) {
    return { error: "That account must complete onboarding before organizing an event." };
  }
  if (organizer.id === userId) return { error: "You already have organizer access as a Guild manager." };

  await db.eventOrganizer.upsert({
    where: { eventId_userId: { eventId, userId: organizer.id } },
    create: { eventId, userId: organizer.id },
    update: {},
  });
  revalidatePath(`/hackathons/${event.slug}/manage`);
  return { success: "Organizer access granted." };
}

export async function publishEventResult(eventId: string, _previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = eventResultSchema.safeParse({
    projectName: formData.get("projectName"),
    summary: formData.get("summary"),
    placement: formData.get("placement") || undefined,
  });
  if (!parsed.success) return { error: "Enter a project name, result summary, and valid placement." };
  const userId = await requireUserId();
  await requireEventManager(eventId, userId);
  const db = getPrisma();
  const event = await db.$transaction(async (tx) => {
    const event = await tx.hackathonEvent.findUnique({
      where: { id: eventId },
      select: { slug: true, title: true },
    });
    if (!event) return null;
    const existing = await tx.eventResult.findUnique({
      where: { eventId_projectName: { eventId, projectName: parsed.data.projectName } },
      select: { id: true },
    });
    await tx.eventResult.upsert({
      where: { eventId_projectName: { eventId, projectName: parsed.data.projectName } },
      create: { eventId, ...parsed.data, publishedAt: new Date() },
      update: { ...parsed.data, publishedAt: new Date() },
    });
    await tx.hackathonEvent.update({ where: { id: eventId }, data: { status: "COMPLETED" } });
    if (!existing) {
      const recipients = await tx.eventRegistration.findMany({
        where: { eventId, status: "ACCEPTED" },
        select: { userId: true },
      });
      await Promise.all(recipients.map(({ userId: recipientId }) => tx.notification.create({
        data: {
          recipientId,
          actorId: userId,
          type: "EVENT_RESULT",
          title: `Results published for ${event.title}`,
          message: `Results now include ${parsed.data.projectName}.`,
          href: `/hackathons/${event.slug}`,
        },
      })));
    }
    return event;
  });
  if (!event) return { error: "Event not found." };
  revalidatePath(`/hackathons/${event.slug}`);
  revalidatePath(`/hackathons/${event.slug}/manage`);
  return { success: "Result published." };
}

"use server";

import { randomUUID } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ALLOWED_REGIONS } from "@/config/regions";
import { getPrisma } from "@/server/db";
import { canUseCommunityAccount, guildSchema, waitlistSchema } from "@/server/community-validation";
import { requireGuildManager, requireUserId } from "@/server/permissions";
import type { FormActionState } from "@/server/profile-actions";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
}

export async function createGuild(_previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = guildSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    visibility: formData.get("visibility"),
  });
  if (!parsed.success) return { error: "Please check the Guild details and try again." };
  const userId = await requireUserId();
  const db = getPrisma();
  const guild = await db.$transaction(async (tx) => {
    const created = await tx.guild.create({
      data: {
        ...parsed.data,
        slug: `${slugify(parsed.data.name)}-${randomUUID().slice(0, 8)}`,
        createdById: userId,
      },
    });
    await tx.guildMembership.create({
      data: { guildId: created.id, userId, role: "OWNER" },
    });
    return created;
  });
  revalidatePath("/guilds");
  redirect(`/guilds/${guild.slug}`);
}

export async function toggleGuildMembership(guildId: string, _formData: FormData) {
  const userId = await requireUserId();
  const db = getPrisma();
  const guild = await db.guild.findUnique({
    where: { id: guildId },
    select: { slug: true, visibility: true },
  });
  if (!guild) throw new Error("Guild not found.");

  const membership = await db.guildMembership.findUnique({
    where: { guildId_userId: { guildId, userId } },
    select: { id: true, role: true },
  });
  if (membership) {
    if (membership.role === "OWNER") throw new Error("Transfer Guild ownership before leaving.");
    await db.guildMembership.delete({ where: { id: membership.id } });
  } else {
    if (guild.visibility === "PRIVATE") throw new Error("Private Guilds require an invitation.");
    await db.guildMembership.create({ data: { guildId, userId } });
  }
  revalidatePath(`/guilds/${guild.slug}`);
  revalidatePath("/guilds");
}

export async function inviteGuildMember(guildId: string, _previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = waitlistSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { error: "Enter a valid email address." };
  const inviterId = await requireUserId();
  await requireGuildManager(guildId, inviterId);
  const db = getPrisma();
  const guild = await db.guild.findUnique({ where: { id: guildId }, select: { slug: true, name: true } });
  if (!guild) return { error: "Guild not found." };
  const invitee = await db.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, username: true, regionId: true, area: true, waitlistedAt: true, emailVerifiedAt: true, adultAttestedAt: true },
  });
  if (!invitee) return { error: "No HackLink account matches that email." };
  if (!canUseCommunityAccount(invitee, ALLOWED_REGIONS.map((region) => region.id))) {
    return { error: "That account must complete onboarding before joining a Guild." };
  }
  const alreadyMember = await db.guildMembership.findUnique({
    where: { guildId_userId: { guildId, userId: invitee.id } },
    select: { id: true },
  });
  if (alreadyMember) return { error: "That person is already a Guild member." };

  await db.$transaction(async (tx) => {
    const previous = await tx.guildInvitation.findUnique({
      where: { guildId_inviteeEmail: { guildId, inviteeEmail: parsed.data.email } },
      select: { status: true },
    });
    const invite = await tx.guildInvitation.upsert({
      where: { guildId_inviteeEmail: { guildId, inviteeEmail: parsed.data.email } },
      create: { guildId, inviterId, inviteeEmail: parsed.data.email },
      update: { inviterId, status: "PENDING" },
      select: { id: true },
    });
    if (previous?.status === "PENDING") return;
    await tx.notification.create({
      data: {
        recipientId: invitee.id,
        actorId: inviterId,
        type: "GUILD_INVITATION",
        title: `Invitation to ${guild.name}`,
        message: `You have been invited to join ${guild.name}.`,
        href: `/guilds/${guild.slug}?invite=${invite.id}`,
        targetId: invite.id,
      },
    });
  });
  revalidatePath("/notifications");
  return { success: "Invitation created. It will appear in the member's in-app notifications." };
}

export async function acceptGuildInvitation(invitationId: string, _formData: FormData) {
  const userId = await requireUserId();
  const user = await getPrisma().user.findUniqueOrThrow({ where: { id: userId }, select: { email: true } });
  const db = getPrisma();
  const invite = await db.guildInvitation.findFirst({
    where: { id: invitationId, inviteeEmail: user.email, status: "PENDING" },
    select: { id: true, guildId: true, guild: { select: { slug: true } } },
  });
  if (!invite) throw new Error("This invitation is no longer available.");

  await db.$transaction([
    db.guildInvitation.update({ where: { id: invitationId }, data: { status: "ACCEPTED" } }),
    db.guildMembership.upsert({
      where: { guildId_userId: { guildId: invite.guildId, userId } },
      create: { guildId: invite.guildId, userId },
      update: {},
    }),
    db.notification.updateMany({
      where: { recipientId: userId, targetId: invitationId, type: "GUILD_INVITATION", readAt: null },
      data: { readAt: new Date() },
    }),
  ]);
  revalidatePath("/notifications");
  redirect(`/guilds/${invite.guild.slug}`);
}

export async function transferGuildOwnership(guildId: string, newOwnerId: string, _formData: FormData) {
  const userId = await requireUserId();
  const db = getPrisma();
  await db.$transaction(async (tx) => {
    const currentOwner = await tx.guildMembership.findUnique({
      where: { guildId_userId: { guildId, userId } },
      select: { role: true },
    });
    const nextOwner = await tx.guildMembership.findUnique({
      where: { guildId_userId: { guildId, userId: newOwnerId } },
      select: { id: true, user: { select: { adultAttestedAt: true } } },
    });
    if (currentOwner?.role !== "OWNER" || !nextOwner?.user.adultAttestedAt || userId === newOwnerId) {
      throw new Error("Choose a current Guild member to receive ownership.");
    }
    await tx.guildMembership.update({
      where: { guildId_userId: { guildId, userId } },
      data: { role: "ADMIN" },
    });
    await tx.guildMembership.update({
      where: { guildId_userId: { guildId, userId: newOwnerId } },
      data: { role: "OWNER" },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  revalidatePath("/guilds");
}

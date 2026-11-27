import { randomBytes } from "node:crypto";
import { config } from "dotenv";
import { hash } from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import { canRunSampleSeed } from "../src/server/community-validation";

async function main() {
  config({ path: ".env.local" });
  config();

  if (!canRunSampleSeed(process.env.NODE_ENV, process.env.SAMPLE_SEED)) {
    throw new Error("Sample seed refused. Use a non-production database and set SAMPLE_SEED=true explicitly.");
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL must be set before seeding.");
const db = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
const passwordHash = await hash(randomBytes(32).toString("hex"), 12);
const now = new Date();
const startsAt = new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000);
const endsAt = new Date(startsAt.getTime() + 2 * 24 * 60 * 60 * 1000);
const registrationDeadline = new Date(startsAt.getTime() - 10 * 24 * 60 * 60 * 1000);

try {
  await db.$transaction(async (tx) => {
    const owner = await tx.user.upsert({
      where: { email: "sample-owner@example.invalid" },
      create: {
        email: "sample-owner@example.invalid",
        emailVerifiedAt: now,
        passwordHash,
        username: "sample-owner",
        displayName: "SAMPLE · Guild Owner",
        focus: "Community organizer",
        regionId: "iloilo",
        area: "Iloilo City",
      },
      update: {},
      select: { id: true },
    });
    const member = await tx.user.upsert({
      where: { email: "sample-member@example.invalid" },
      create: {
        email: "sample-member@example.invalid",
        emailVerifiedAt: now,
        passwordHash,
        username: "sample-member",
        displayName: "SAMPLE · Community Member",
        focus: "Student builder",
        regionId: "iloilo",
        area: "Iloilo City",
      },
      update: {},
      select: { id: true },
    });

    const guild = await tx.guild.upsert({
      where: { slug: "sample-build-iloilo" },
      create: {
        slug: "sample-build-iloilo",
        name: "SAMPLE · Build Iloilo",
        category: "Community projects",
        description: "SAMPLE DATA — a Guild used to demonstrate HackLink features.",
        createdById: owner.id,
      },
      update: {},
      select: { id: true },
    });
    await tx.guildMembership.upsert({
      where: { guildId_userId: { guildId: guild.id, userId: owner.id } },
      create: { guildId: guild.id, userId: owner.id, role: "OWNER" },
      update: {},
    });
    await tx.guildMembership.upsert({
      where: { guildId_userId: { guildId: guild.id, userId: member.id } },
      create: { guildId: guild.id, userId: member.id, role: "MEMBER" },
      update: {},
    });

    const postBody = "SAMPLE DATA — Share a small project update and invite the community to give feedback.";
    const post = await tx.post.upsert({
      where: { id: "sample-community-post" },
      create: { id: "sample-community-post", authorId: owner.id, body: postBody },
      update: { body: postBody },
      select: { id: true },
    });
    await tx.comment.upsert({
      where: { id: "sample-community-comment" },
      create: { id: "sample-community-comment", postId: post.id, authorId: member.id, body: "SAMPLE DATA — Looking forward to seeing the next update." },
      update: {},
    });
    await tx.postLike.upsert({
      where: { postId_userId: { postId: post.id, userId: member.id } },
      create: { postId: post.id, userId: member.id },
      update: {},
    });
    await tx.connection.upsert({
      where: { requesterId_recipientId: { requesterId: owner.id, recipientId: member.id } },
      create: { requesterId: owner.id, recipientId: member.id, status: "ACCEPTED" },
      update: { status: "ACCEPTED" },
    });

    const event = await tx.hackathonEvent.upsert({
      where: { slug: "sample-community-build-day" },
      create: {
        slug: "sample-community-build-day",
        title: "SAMPLE · Community Build Day",
        description: "SAMPLE DATA — A sample event for demonstrating applications and organizer tools.",
        topic: "Community projects",
        startsAt,
        endsAt,
        registrationDeadline,
        capacity: 20,
        reservedSlots: 1,
        status: "PUBLISHED",
        hostGuildId: guild.id,
        location: "Iloilo City",
      },
      update: {},
      select: { id: true },
    });
    await tx.eventRegistration.upsert({
      where: { eventId_userId: { eventId: event.id, userId: member.id } },
      create: { eventId: event.id, userId: member.id, status: "ACCEPTED" },
      update: { status: "ACCEPTED" },
    });
    await tx.eventResult.upsert({
      where: { eventId_projectName: { eventId: event.id, projectName: "SAMPLE · Open Community" } },
      create: {
        eventId: event.id,
        projectName: "SAMPLE · Open Community",
        summary: "SAMPLE DATA — A placeholder result for the event results view.",
        placement: 1,
        publishedAt: now,
      },
      update: {},
    });
    await tx.notification.upsert({
      where: { id: "sample-notification" },
      create: {
        id: "sample-notification",
        recipientId: member.id,
        actorId: owner.id,
        type: "EVENT_RESULT",
        title: "SAMPLE · Event results published",
        message: "This notification is sample data.",
        href: `/hackathons/sample-community-build-day`,
      },
      update: {},
    });
  });
} finally {
  await db.$disconnect();
}

console.info("Sample records added. They are marked SAMPLE and use non-deliverable example.invalid emails.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

import "server-only";
import { getServerSession } from "next-auth";
import type { GuildRole } from "@/generated/prisma/client";
import { ALLOWED_REGIONS } from "@/config/regions";
import { authOptions } from "@/server/auth-options";
import { canManageEvent, canManageGuild, canUseCommunityAccount } from "@/server/community-validation";
import { getPrisma } from "@/server/db";

export { canManageEvent, canManageGuild };

export async function requireAuthenticatedUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("You must be signed in to do that.");
  const user = await getPrisma().user.findUnique({
    where: { id: session.user.id },
    select: { adultAttestedAt: true },
  });
  if (!user?.adultAttestedAt) throw new Error("Confirm you are 18 or older before using HackLink.");
  return session.user.id;
}

export async function requireUserId() {
  const userId = await requireAuthenticatedUserId();
  const user = await getPrisma().user.findUnique({
    where: { id: userId },
    select: { username: true, regionId: true, area: true, waitlistedAt: true, emailVerifiedAt: true, adultAttestedAt: true },
  });
  if (!user || !canUseCommunityAccount(user, ALLOWED_REGIONS.map((region) => region.id))) {
    throw new Error("Complete onboarding in a supported area before using community features.");
  }
  return userId;
}

export async function requireGuildManager(guildId: string, userId: string) {
  const membership = await getPrisma().guildMembership.findUnique({
    where: { guildId_userId: { guildId, userId } },
    select: { role: true },
  });
  if (!canManageGuild(membership?.role)) throw new Error("Only Guild owners and admins can do that.");
}

export async function requireEventManager(eventId: string, userId: string) {
  const event = await getPrisma().hackathonEvent.findUnique({
    where: { id: eventId },
    select: {
      hostGuild: { select: { memberships: { where: { userId }, select: { role: true } } } },
      organizers: { where: { userId }, select: { id: true } },
    },
  });
  if (!event) throw new Error("Event not found.");
  if (!canManageEvent(event.hostGuild.memberships[0]?.role, event.organizers.length > 0)) {
    throw new Error("You are not an organizer for this event.");
  }
}


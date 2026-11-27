import { z } from "zod";

type GuildRole = "OWNER" | "ADMIN" | "MEMBER";
type OnboardedAccount = {
  username: string | null;
  regionId: string | null;
  area: string | null;
  waitlistedAt: Date | null;
  emailVerifiedAt: Date | null;
  adultAttestedAt: Date | null;
};

const requiredText = (max: number) => z.string().trim().min(1).max(max);
const manilaDateTime = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
  .transform((value) => new Date(`${value}:00+08:00`))
  .refine((value) => !Number.isNaN(value.getTime()));

export const onboardingSchema = z.object({
  displayName: requiredText(60),
  username: z.string().trim().min(3).max(24).regex(/^[A-Za-z0-9._-]+$/).transform((value) => value.toLowerCase()),
  regionId: requiredText(80),
  area: requiredText(80),
  focus: z.string().trim().max(80).optional().default(""),
  bio: z.string().trim().max(500).optional().default(""),
});

export const waitlistSchema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  area: z.string().trim().max(80).optional().default(""),
});

export const postSchema = z.object({ body: requiredText(2000) });
export const commentSchema = z.object({ body: requiredText(1000) });
export const guildSchema = z.object({
  name: requiredText(60),
  category: requiredText(80),
  description: requiredText(500),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
});

export const eventSchema = z.object({
  title: requiredText(100),
  description: requiredText(2000),
  topic: requiredText(80),
  startsAt: manilaDateTime,
  endsAt: manilaDateTime,
  registrationDeadline: manilaDateTime,
  capacity: z.coerce.number().int().min(1).max(10000),
  isOnline: z.enum(["true", "false"]).transform((value) => value === "true"),
  location: z.string().trim().max(160).optional().default(""),
  hostGuildId: requiredText(64),
});

export const eventResultSchema = z.object({
  projectName: requiredText(100),
  summary: requiredText(500),
  placement: z.coerce.number().int().min(1).max(1000).optional(),
});

export function canManageGuild(role: GuildRole | null | undefined) {
  return role === "OWNER" || role === "ADMIN";
}

export function canManageEvent(role: GuildRole | null | undefined, isAssignedOrganizer: boolean) {
  return canManageGuild(role) || isAssignedOrganizer;
}

export function canApplyToEvent(event: {
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
  registrationDeadline: Date;
  capacity: number | null;
  reservedSlots: number;
}, now = new Date()) {
  return event.status === "PUBLISHED"
    && event.registrationDeadline > now
    && (event.capacity === null || event.reservedSlots < event.capacity);
}

export function releasesEventSlot(previousStatus: "PENDING" | "ACCEPTED" | "REJECTED", nextStatus: "PENDING" | "ACCEPTED" | "REJECTED") {
  return previousStatus !== "REJECTED" && nextStatus === "REJECTED";
}

export function canRunSampleSeed(nodeEnvironment: string | undefined, sampleSeed: string | undefined) {
  return nodeEnvironment !== "production" && sampleSeed === "true";
}

export function canUseCommunityAccount(user: OnboardedAccount, allowedRegionIds: readonly string[]) {
  return user.waitlistedAt === null
    && user.emailVerifiedAt !== null
    && user.adultAttestedAt !== null
    && Boolean(user.username && user.area)
    && user.regionId !== null
    && allowedRegionIds.includes(user.regionId);
}

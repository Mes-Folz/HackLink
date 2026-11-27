import { describe, expect, it } from "vitest";
import { canApplyToEvent, canManageEvent, canManageGuild, canRunSampleSeed, canUseCommunityAccount, eventSchema, onboardingSchema, releasesEventSlot } from "./community-validation";

describe("community validation", () => {
  it("normalizes usernames and rejects invalid handles", () => {
    expect(onboardingSchema.safeParse({
      displayName: "A Builder",
      username: "A.Builder_1",
      regionId: "iloilo",
      area: "Iloilo City",
    }).data?.username).toBe("a.builder_1");
    expect(onboardingSchema.safeParse({
      displayName: "A Builder",
      username: "bad handle",
      regionId: "iloilo",
      area: "Iloilo City",
    }).success).toBe(false);
  });

  it("counts pending applications toward capacity and enforces the deadline", () => {
    const event = {
      status: "PUBLISHED" as const,
      registrationDeadline: new Date("2026-12-01T00:00:00Z"),
      capacity: 2,
      reservedSlots: 1,
    };
    expect(canApplyToEvent(event, new Date("2026-11-27T00:00:00Z"))).toBe(true);
    expect(canApplyToEvent({ ...event, reservedSlots: 2 }, new Date("2026-11-27T00:00:00Z"))).toBe(false);
    expect(canApplyToEvent(event, new Date("2026-12-02T00:00:00Z"))).toBe(false);
  });

  it("interprets event form times in HackLink's Manila timezone", () => {
    const result = eventSchema.safeParse({
      title: "Build day",
      description: "A local event",
      topic: "Community",
      startsAt: "2026-12-01T12:00",
      endsAt: "2026-12-02T12:00",
      registrationDeadline: "2026-11-30T12:00",
      capacity: "20",
      isOnline: "false",
      location: "Iloilo City",
      hostGuildId: "guild-id",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.startsAt.toISOString()).toBe("2026-12-01T04:00:00.000Z");
  });

  it("releases a slot once when a registration becomes rejected", () => {
    expect(releasesEventSlot("PENDING", "REJECTED")).toBe(true);
    expect(releasesEventSlot("ACCEPTED", "REJECTED")).toBe(true);
    expect(releasesEventSlot("REJECTED", "REJECTED")).toBe(false);
  });

  it("allows only Guild owners/admins or assigned event organizers to manage events", () => {
    expect(canManageGuild("OWNER")).toBe(true);
    expect(canManageGuild("ADMIN")).toBe(true);
    expect(canManageGuild("MEMBER")).toBe(false);
    expect(canManageEvent("MEMBER", true)).toBe(true);
    expect(canManageEvent("MEMBER", false)).toBe(false);
  });

  it("requires an explicit non-production opt-in before seeding sample records", () => {
    expect(canRunSampleSeed("development", "true")).toBe(true);
    expect(canRunSampleSeed("production", "true")).toBe(false);
    expect(canRunSampleSeed("development", undefined)).toBe(false);
  });

  it("allows community access only after supported-area onboarding and blocks waitlisted accounts", () => {
    const supportedRegions = ["iloilo"];
    const verifiedAt = new Date();
    const adultAttestedAt = new Date();
    expect(canUseCommunityAccount({ username: "maker", regionId: "iloilo", area: "Iloilo City", waitlistedAt: null, emailVerifiedAt: verifiedAt, adultAttestedAt }, supportedRegions)).toBe(true);
    expect(canUseCommunityAccount({ username: "maker", regionId: "outside-supported-regions", area: "Cebu", waitlistedAt: null, emailVerifiedAt: verifiedAt, adultAttestedAt }, supportedRegions)).toBe(false);
    expect(canUseCommunityAccount({ username: "maker", regionId: "iloilo", area: "Iloilo City", waitlistedAt: new Date(), emailVerifiedAt: verifiedAt, adultAttestedAt }, supportedRegions)).toBe(false);
    expect(canUseCommunityAccount({ username: "maker", regionId: "iloilo", area: "Iloilo City", waitlistedAt: null, emailVerifiedAt: null, adultAttestedAt }, supportedRegions)).toBe(false);
    expect(canUseCommunityAccount({ username: "maker", regionId: "iloilo", area: "Iloilo City", waitlistedAt: null, emailVerifiedAt: verifiedAt, adultAttestedAt: null }, supportedRegions)).toBe(false);
  });
});

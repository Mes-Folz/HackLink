import { describe, expect, it } from "vitest";
import { credentialsSchema, registrationSchema, verificationTokenSchema, verifyEmailPasswordSchema } from "./auth-validation";

describe("authentication input validation", () => {
  it("normalizes email addresses", () => {
    const result = credentialsSchema.safeParse({
      email: "  Maker@Example.com ",
      password: "password123",
    });

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("maker@example.com");
  });

  it("rejects passwords that exceed bcrypt's byte limit", () => {
    const result = credentialsSchema.safeParse({
      email: "maker@example.com",
      password: "é".repeat(40),
    });

    expect(result.success).toBe(false);
  });

  it("does not accept a password during email registration", () => {
    const result = registrationSchema.safeParse({
      email: "maker@example.com",
      adultConfirmed: true,
      password: "password123",
      passwordConfirmation: "password456",
    });

    expect(result.success).toBe(false);
  });

  it("requires an 18+ confirmation for registration", () => {
    expect(registrationSchema.safeParse({ email: "maker@example.com", adultConfirmed: false }).success).toBe(false);
    expect(registrationSchema.safeParse({ email: "maker@example.com", adultConfirmed: true }).success).toBe(true);
  });

  it("requires matching passwords when completing email verification", () => {
    const result = verifyEmailPasswordSchema.safeParse({
      password: "password123",
      passwordConfirmation: "password456",
    });

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0]?.path).toEqual(["passwordConfirmation"]);
  });

  it("accepts only URL-safe verification token strings of the expected length", () => {
    expect(verificationTokenSchema.safeParse("A".repeat(43)).success).toBe(true);
    expect(verificationTokenSchema.safeParse("short").success).toBe(false);
  });
});

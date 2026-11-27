"use server";

import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPrisma } from "@/server/db";
import { emailSchema, registrationSchema, verifyEmailPasswordSchema } from "@/server/auth-validation";
import { assertEmailVerificationConfigured, EmailDeliveryError, sendVerificationEmail, verifyEmailToken } from "@/server/email-verification";
import { consumeRateLimit } from "@/server/rate-limit";
import { clientIpFromHeaders } from "@/server/rate-limit-policy";
import type { AuthFormState } from "@/types/auth";

export async function registerUser(_previousState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = registrationSchema.safeParse({
    email: formData.get("email"),
    adultConfirmed: formData.get("adultConfirmed") === "on",
  });

  if (!parsed.success) {
    const issues = parsed.error.issues;
    return {
      email: typeof formData.get("email") === "string" ? String(formData.get("email")) : "",
      error: "Please correct the highlighted fields.",
      fieldErrors: {
        email: issues.find((issue) => issue.path[0] === "email")?.message,
        adultConfirmed: issues.find((issue) => issue.path[0] === "adultConfirmed")?.message,
      },
    };
  }

  const requestHeaders = await headers();
  const clientIp = clientIpFromHeaders(requestHeaders.get("x-real-ip"), requestHeaders.get("x-forwarded-for"));
  if (clientIp && !(await consumeRateLimit("registration-ip", clientIp, 5, 60 * 60 * 1000))) {
    return { error: "Too many registration attempts. Please try again later." };
  }
  if (!(await consumeRateLimit("registration-email", parsed.data.email, 5, 60 * 60 * 1000))) {
    return { error: "Too many registration attempts. Please try again later." };
  }
  try {
    assertEmailVerificationConfigured();
  } catch (error) {
    if (!(error instanceof EmailDeliveryError)) throw error;
    return { error: error.message };
  }

  const db = getPrisma();
  const existingUser = await db.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, emailVerifiedAt: true },
  });
  if (existingUser) {
    if (!existingUser.emailVerifiedAt) {
      try {
        await sendVerificationEmail(existingUser.id, parsed.data.email);
      } catch (error) {
        if (!(error instanceof EmailDeliveryError)) throw error;
        return { error: "We couldn't send a verification email. Check the email settings or use the resend link to retry." };
      }
    }
    return { success: "If this address can be used, a verification link has been sent. Check your inbox." };
  }

  let userId: string;
  try {
    const user = await db.user.create({
      data: {
        email: parsed.data.email,
        adultAttestedAt: new Date(),
      },
      select: { id: true },
    });
    userId = user.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: "If this address can be used, a verification link has been sent. Check your inbox." };
    }
    throw error;
  }

  try {
    await sendVerificationEmail(userId, parsed.data.email);
  } catch (error) {
    if (!(error instanceof EmailDeliveryError)) throw error;
    return { error: "We couldn't send a verification email. Check the email settings and use the resend link to retry." };
  }
  return { success: "If this address can be used, a verification link has been sent. Check your inbox." };
}

export async function resendVerificationEmail(_previousState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { error: "Enter a valid email address." };

  const requestHeaders = await headers();
  const clientIp = clientIpFromHeaders(requestHeaders.get("x-real-ip"), requestHeaders.get("x-forwarded-for"));
  if (clientIp && !(await consumeRateLimit("verification-ip", clientIp, 10, 60 * 60 * 1000))) {
    return { error: "Too many requests. Please try again later." };
  }
  if (!(await consumeRateLimit("verification-email", parsed.data, 3, 60 * 60 * 1000))) {
    return { error: "Too many requests. Please try again later." };
  }

  const user = await getPrisma().user.findUnique({
    where: { email: parsed.data },
    select: { id: true, emailVerifiedAt: true },
  });
  if (user && !user.emailVerifiedAt) {
    try {
      await sendVerificationEmail(user.id, parsed.data);
    } catch (error) {
      if (!(error instanceof EmailDeliveryError)) throw error;
      return { error: "We couldn't send a verification email. Check the email settings and try again." };
    }
  }
  return { success: "If this address has an unverified account, a verification link has been sent." };
}

export async function verifyEmail(token: string, _previousState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = verifyEmailPasswordSchema.safeParse({
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });
  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: {
        password: parsed.error.issues.find((issue) => issue.path[0] === "password")?.message,
        passwordConfirmation: parsed.error.issues.find((issue) => issue.path[0] === "passwordConfirmation")?.message,
      },
    };
  }
  if (await verifyEmailToken(token, parsed.data.password)) redirect("/login?verified=1");
  redirect("/verify-email?status=invalid");
}

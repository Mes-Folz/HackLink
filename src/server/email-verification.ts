import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { hash } from "bcryptjs";
import { getPrisma } from "@/server/db";
import { verificationTokenSchema } from "@/server/auth-validation";

export class EmailDeliveryError extends Error {}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const appUrl = process.env.NEXTAUTH_URL;
  if (!apiKey || !from || !appUrl) {
    throw new EmailDeliveryError("Email verification needs RESEND_API_KEY, EMAIL_FROM, and NEXTAUTH_URL in .env.local.");
  }

  let origin: URL;
  try {
    origin = new URL(appUrl);
  } catch {
    throw new EmailDeliveryError("NEXTAUTH_URL must be a valid URL for email verification.");
  }
  if (!["http:", "https:"].includes(origin.protocol) || (process.env.NODE_ENV === "production" && origin.protocol !== "https:")) {
    throw new EmailDeliveryError("Email verification requires an HTTPS app URL in production.");
  }
  return { apiKey, from, origin };
}

export function assertEmailVerificationConfigured() {
  getEmailConfig();
}

export async function sendVerificationEmail(userId: string, email: string) {
  const { apiKey, from, origin } = getEmailConfig();

  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const db = getPrisma();
  await db.emailVerificationToken.upsert({
    where: { userId },
    create: { userId, tokenHash, expiresAt },
    update: { tokenHash, expiresAt, createdAt: new Date() },
  });

  const verificationUrl = new URL("/verify-email", origin);
  verificationUrl.searchParams.set("token", token);
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Verify your HackLink email",
        text: `Confirm your email for HackLink by opening this link within 24 hours:\n\n${verificationUrl.toString()}\n\nIf you did not request this, you can ignore this message.`,
      }),
    });
  } catch {
    throw new EmailDeliveryError("The verification email provider could not be reached. Check the email configuration and try again.");
  }
  if (!response.ok) throw new EmailDeliveryError("The verification email provider rejected the request. Check the email configuration and try again.");
}

export async function verifyEmailToken(token: string, password: string) {
  const parsed = verificationTokenSchema.safeParse(token);
  if (!parsed.success) return false;

  const tokenHash = createHash("sha256").update(parsed.data).digest("hex");
  const db = getPrisma();
  const now = new Date();
  const stored = await db.emailVerificationToken.findFirst({
    where: { tokenHash, expiresAt: { gt: now } },
    select: { id: true, userId: true },
  });
  if (!stored) return false;

  const passwordHash = await hash(password, 12);
  return db.$transaction(async (tx) => {
    const deleted = await tx.emailVerificationToken.deleteMany({
      where: { id: stored.id, expiresAt: { gt: now } },
    });
    if (deleted.count !== 1) return false;

    await tx.user.update({
      where: { id: stored.userId },
      data: { emailVerifiedAt: now, passwordHash },
    });
    return true;
  });
}

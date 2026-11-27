import "server-only";
import { createHmac } from "node:crypto";
import { getPrisma } from "@/server/db";
import { rateLimitAllowed } from "@/server/rate-limit-policy";

let lastCleanupAt = 0;
export async function consumeRateLimit(scope: string, identifier: string, limit: number, windowMs: number) {
  if (!Number.isInteger(limit) || limit < 1 || !Number.isInteger(windowMs) || windowMs < 1) {
    throw new Error("Rate-limit settings must be positive integers.");
  }
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET must be set before using rate limits.");

  const now = new Date();
  const key = createHmac("sha256", secret).update(`${scope}:${identifier}`).digest("hex");
  const db = getPrisma();
  if (now.getTime() - lastCleanupAt >= 60 * 60 * 1000) {
    await db.authRateLimit.deleteMany({ where: { windowStartedAt: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) } } });
    lastCleanupAt = now.getTime();
  }

  const rows = await db.$queryRaw<Array<{ attempts: number }>>`
    INSERT INTO "AuthRateLimit" ("key", "windowStartedAt", "attempts")
    VALUES (${key}, ${now}, 1)
    ON CONFLICT ("key") DO UPDATE
    SET
      "attempts" = CASE
        WHEN "AuthRateLimit"."windowStartedAt" <= ${new Date(now.getTime() - windowMs)} THEN 1
        ELSE "AuthRateLimit"."attempts" + 1
      END,
      "windowStartedAt" = CASE
        WHEN "AuthRateLimit"."windowStartedAt" <= ${new Date(now.getTime() - windowMs)} THEN ${now}
        ELSE "AuthRateLimit"."windowStartedAt"
      END
    RETURNING "attempts"
  `;
  const attempts = rows[0]?.attempts;
  if (attempts === undefined) throw new Error("Rate-limit counter was not updated.");
  return rateLimitAllowed(attempts, limit);
}

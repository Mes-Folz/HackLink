"use server";

import { Prisma } from "@/generated/prisma/client";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ALLOWED_REGIONS } from "@/config/regions";
import { authOptions } from "@/server/auth-options";
import { getPrisma } from "@/server/db";
import { onboardingSchema, waitlistSchema } from "@/server/community-validation";
import { requireAuthenticatedUserId } from "@/server/permissions";
import { consumeRateLimit } from "@/server/rate-limit";
import { clientIpFromHeaders } from "@/server/rate-limit-policy";

export type FormActionState = { error?: string; success?: string };

export async function saveOnboarding(_previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = onboardingSchema.safeParse({
    displayName: formData.get("displayName"),
    username: formData.get("username"),
    regionId: formData.get("regionId"),
    area: formData.get("area"),
    focus: formData.get("focus"),
    bio: formData.get("bio"),
  });
  if (!parsed.success) return { error: "Please check your profile details and try again." };

  const userId = await requireAuthenticatedUserId();
  if (parsed.data.regionId === "outside-supported-regions") {
    const db = getPrisma();
    const user = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { email: true } });
    await db.$transaction([
      db.waitlistEntry.upsert({
        where: { email: user.email },
        create: { email: user.email, area: parsed.data.area },
        update: { area: parsed.data.area },
      }),
      db.user.update({ where: { id: userId }, data: { waitlistedAt: new Date() } }),
    ]);
    redirect("/waitlist?joined=1");
  }

  if (!ALLOWED_REGIONS.some((region) => region.id === parsed.data.regionId)) {
    return { error: "Choose an available region or join the waitlist." };
  }

  try {
    await getPrisma().user.update({
      where: { id: userId },
      data: {
        displayName: parsed.data.displayName,
        username: parsed.data.username,
        bio: parsed.data.bio || null,
        focus: parsed.data.focus || null,
        regionId: parsed.data.regionId,
        area: parsed.data.area,
        waitlistedAt: null,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "That username is already taken. Choose another one." };
    }
    throw error;
  }

  redirect("/home");
}

export async function joinWaitlist(_previous: FormActionState, formData: FormData): Promise<FormActionState> {
  if (formData.get("adultConfirmed") !== "on") {
    return { error: "Confirm that you are 18 or older to join the waitlist." };
  }

  let email = formData.get("email");
  let area = formData.get("area");
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    const user = await getPrisma().user.findUniqueOrThrow({
      where: { id: session.user.id },
      select: { email: true, adultAttestedAt: true },
    });
    if (!user.adultAttestedAt) return { error: "Confirm your age before joining the waitlist." };
    email = user.email;
  }

  const parsed = waitlistSchema.safeParse({ email, area });
  if (!parsed.success) return { error: "Enter a valid email address." };
  const requestHeaders = await headers();
  const clientIp = clientIpFromHeaders(requestHeaders.get("x-real-ip"), requestHeaders.get("x-forwarded-for"));
  if (clientIp && !(await consumeRateLimit("waitlist-ip", clientIp, 5, 60 * 60 * 1000))) {
    return { error: "Too many waitlist requests. Please try again later." };
  }
  if (!(await consumeRateLimit("waitlist-email", parsed.data.email, 3, 60 * 60 * 1000))) {
    return { error: "Too many waitlist requests. Please try again later." };
  }
  await getPrisma().waitlistEntry.upsert({
    where: { email: parsed.data.email },
    create: { email: parsed.data.email, area: parsed.data.area || null },
    update: { area: parsed.data.area || null },
  });
  redirect("/waitlist?joined=1");
}

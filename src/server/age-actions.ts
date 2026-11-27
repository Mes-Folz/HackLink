"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/server/auth-options";
import { getPrisma } from "@/server/db";

export type AgeFormState = { error?: string };

export async function confirmAdultAge(_previousState: AgeFormState, formData: FormData): Promise<AgeFormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (formData.get("adultConfirmed") !== "on") {
    return { error: "Confirm that you are 18 or older to continue." };
  }

  await getPrisma().user.update({
    where: { id: session.user.id },
    data: { adultAttestedAt: new Date() },
  });
  redirect("/home");
}

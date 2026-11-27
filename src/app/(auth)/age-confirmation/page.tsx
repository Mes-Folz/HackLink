import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AgeConfirmationForm from "@/components/AgeConfirmationForm";
import { authOptions } from "@/server/auth-options";
import { getPrisma } from "@/server/db";

export default async function AgeConfirmationPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await getPrisma().user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { adultAttestedAt: true },
  });
  if (user.adultAttestedAt) redirect("/home");

  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Age confirmation</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">Confirm your age</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        HackLink is currently limited to people aged 18 or older. This is a self-declaration, not formal age verification. Under-18 accounts are paused while guardian-consent and child-privacy safeguards are developed and reviewed.
      </p>
      <AgeConfirmationForm />
      <p className="mt-4 text-xs leading-5 text-muted">
        If you are under 18, do not confirm or continue. Sign out and wait until HackLink announces that its under-18 protections are ready.
      </p>
    </>
  );
}

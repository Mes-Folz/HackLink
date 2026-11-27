import Link from "next/link";
import { notFound } from "next/navigation";
import VerifyEmailForm from "@/components/VerifyEmailForm";
import { verificationTokenSchema } from "@/server/auth-validation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; status?: string }>;
}) {
  const { token, status } = await searchParams;
  if (status !== "invalid" && !verificationTokenSchema.safeParse(token).success) notFound();

  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Email verification</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
        {status === "invalid" ? "This link has expired" : "Confirm your email"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        {status === "invalid"
          ? "Request a fresh verification link to finish setting up your account."
          : "Confirm that you control this email address, then choose a password to finish creating your account."}
      </p>
      {status === "invalid" || !token
        ? <Link href="/verify-email/resend" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Request a new link</Link>
        : <VerifyEmailForm token={token} />}
    </>
  );
}

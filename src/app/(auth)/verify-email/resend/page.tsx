import Link from "next/link";
import ResendVerificationForm from "@/components/ResendVerificationForm";

export default async function ResendVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ required?: string }>;
}) {
  const { required } = await searchParams;

  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Email verification</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">Check your inbox</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        {required === "1"
          ? "Verify your email before using community features."
          : "Enter your account email and we’ll send a new verification link if it needs one."}
      </p>
      <ResendVerificationForm />
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/login" className="font-bold text-primary hover:text-white">Back to sign in</Link>
      </p>
    </>
  );
}

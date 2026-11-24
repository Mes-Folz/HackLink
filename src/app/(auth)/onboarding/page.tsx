import Link from "next/link";
import OnboardingPreviewForm from "@/components/OnboardingPreviewForm";

export default function OnboardingPage() {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Profile setup · preview</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">Make it yours</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        Tell the community what you build and choose an approximate area.
      </p>
      <OnboardingPreviewForm />
      <p className="mt-6 text-center text-sm text-muted">
        Have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:text-white">Sign in</Link>
      </p>
    </>
  );
}

import Link from "next/link";
import MockAuthForm from "@/components/MockAuthForm";

export default function LoginPage() {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Welcome back</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">Sign in</h1>
      <p className="mt-2 text-sm leading-6 text-muted">Pick up where your next idea left off.</p>
      <MockAuthForm mode="login" />
      <p className="mt-6 text-center text-sm text-muted">
        New to HackLink?{" "}
        <Link href="/register" className="font-bold text-primary hover:text-white">Create an account</Link>
      </p>
    </>
  );
}

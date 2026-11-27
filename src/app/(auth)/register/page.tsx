import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { authOptions } from "@/server/auth-options";

export default async function RegisterPage() {
  if (await getServerSession(authOptions)) redirect("/home");

  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Find your people</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">Create an account</h1>
      <p className="mt-2 text-sm leading-6 text-muted">Start with the community. Build from there.</p>
      <AuthForm mode="register" />
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:text-white">Sign in</Link>
      </p>
    </>
  );
}

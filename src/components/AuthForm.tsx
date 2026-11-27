"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/server/auth-actions";
import type { AuthFormState } from "@/types/auth";

type AuthFormProps = {
  mode: "login" | "register";
  verified?: boolean;
};

export default function AuthForm({ mode, verified = false }: AuthFormProps) {
  const isRegister = mode === "register";
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [registerState, registerAction, registerPending] = useActionState<AuthFormState, FormData>(registerUser, {});
  const [loginError, setLoginError] = useState("");
  const [loginPending, setLoginPending] = useState(false);
  const fieldErrors = isRegister ? registerState.fieldErrors : undefined;
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary";

  useEffect(() => {
    if (registerState.success) formRef.current?.reset();
  }, [registerState.success]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email !== "string" || typeof password !== "string") {
      setLoginError("Enter your email and password.");
      return;
    }

    setLoginPending(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/home",
        redirect: false,
      });

      if (!result || result.error) {
        setLoginError("Email or password is incorrect. Check your details and try again.");
        return;
      }

      router.push("/home");
      router.refresh();
    } catch (error) {
      if (error instanceof TypeError) {
        setLoginError("Could not reach sign-in. Check your connection and try again.");
        return;
      }
      throw error;
    } finally {
      setLoginPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="mt-6 space-y-4"
      action={isRegister ? registerAction : undefined}
      onSubmit={isRegister ? undefined : handleLogin}
    >
      {verified && (
        <p role="status" className="rounded-xl border border-emerald-400/30 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">
          Email verified. You can sign in now.
        </p>
      )}

      {isRegister && registerState.success && (
        <p role="status" className="rounded-xl border border-emerald-400/30 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">
          {registerState.success}
        </p>
      )}

      {(isRegister ? registerState.error : loginError) && (
        <div role="alert" className="rounded-xl border border-red-400/30 bg-red-950/50 px-4 py-3 text-sm leading-5 text-red-200">
          <p>{isRegister ? registerState.error : loginError}</p>
        </div>
      )}

      <label htmlFor="auth-email" className="block text-sm font-semibold text-ink">
        Email address
        <input
          id="auth-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          defaultValue={isRegister ? registerState.email : undefined}
          aria-invalid={Boolean(fieldErrors?.email)}
          aria-describedby={fieldErrors?.email ? "auth-email-error" : undefined}
          className={inputClassName}
          placeholder="you@example.com"
        />
        {fieldErrors?.email && <span id="auth-email-error" className="mt-1 block text-xs font-normal text-red-300">{fieldErrors.email}</span>}
      </label>

      {isRegister && (
        <div>
          <label htmlFor="adult-confirmation" className="flex items-start gap-3 text-sm leading-6 text-muted">
            <input
              id="adult-confirmation"
              name="adultConfirmed"
              type="checkbox"
              required
              aria-invalid={Boolean(fieldErrors?.adultConfirmed)}
              aria-describedby={fieldErrors?.adultConfirmed ? "adult-confirmation-error" : undefined}
              className="mt-1 size-4 shrink-0 accent-primary focus-visible:ring-2 focus-visible:ring-primary"
            />
            <span>I confirm I am 18 or older. This is a self-declaration, not formal age verification; its date is stored with my account. Under-18 accounts are paused until guardian-consent and privacy safeguards are implemented and reviewed.</span>
          </label>
          {fieldErrors?.adultConfirmed && <p id="adult-confirmation-error" className="mt-1 text-xs text-red-300">{fieldErrors.adultConfirmed}</p>}
        </div>
      )}

      {!isRegister && (
        <label htmlFor="auth-password" className="block text-sm font-semibold text-ink">
          Password
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete="current-password"
            minLength={8}
            maxLength={72}
            required
            aria-invalid={Boolean(fieldErrors?.password)}
            aria-describedby={fieldErrors?.password ? "auth-password-error" : undefined}
            className={inputClassName}
            placeholder="Enter your password"
          />
          {fieldErrors?.password && <span id="auth-password-error" className="mt-1 block text-xs font-normal text-red-300">{fieldErrors.password}</span>}
        </label>
      )}

      <button
        type="submit"
        disabled={isRegister ? registerPending : loginPending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRegister
          ? registerPending ? "Sending verification link..." : "Continue with email"
          : loginPending ? "Signing in..." : "Sign in"}
      </button>
      {isRegister && <p className="text-xs leading-5 text-muted">You’ll choose a password after confirming your email.</p>}
      {!isRegister && (
        <p className="text-center text-sm text-muted">
          Haven&apos;t verified your email?{" "}
          <Link href="/verify-email/resend" className="font-bold text-primary hover:text-white">Resend the link</Link>
        </p>
      )}
    </form>
  );
}

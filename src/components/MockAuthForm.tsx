"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type MockAuthFormProps = {
  mode: "login" | "register";
};

export default function MockAuthForm({ mode }: MockAuthFormProps) {
  const isRegister = mode === "register";
  const [feedback, setFeedback] = useState<{ kind: "error" | "info"; message: string } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isRegister) {
      const formData = new FormData(event.currentTarget);
      if (formData.get("password") !== formData.get("passwordConfirmation")) {
        setFeedback({ kind: "error", message: "Those passwords do not match. Please check and try again." });
        return;
      }
    }

    setFeedback({
      kind: "info",
      message: isRegister
        ? "Preview only: no account was created and no data was saved."
        : "Preview only: no account or sign-in session exists.",
    });
  }

  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="auth-email" className="block text-sm font-semibold text-ink">
        Email address
        <input
          id="auth-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClassName}
          placeholder="you@example.com"
        />
      </label>

      <label htmlFor="auth-password" className="block text-sm font-semibold text-ink">
        Password
        <input
          id="auth-password"
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          minLength={8}
          required
          className={inputClassName}
          placeholder={isRegister ? "At least 8 characters" : "Enter a password"}
        />
      </label>

      {isRegister && (
        <label htmlFor="auth-password-confirmation" className="block text-sm font-semibold text-ink">
          Confirm password
          <input
            id="auth-password-confirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className={inputClassName}
            placeholder="Re-enter your password"
          />
        </label>
      )}

      <p className="text-xs leading-5 text-muted">Password managers and paste are supported. These fields are never submitted.</p>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {isRegister ? "Preview account setup" : "Preview sign in"}
      </button>

      {feedback && (
        <div
          role={feedback.kind === "error" ? "alert" : "status"}
          className={`rounded-xl border px-4 py-3 text-sm leading-5 ${
            feedback.kind === "error"
              ? "border-red-400/30 bg-red-950/50 text-red-200"
              : "border-primary/20 bg-primary/5 text-ink"
          }`}
        >
          <p>{feedback.message}</p>
          {isRegister && feedback.kind === "info" && (
            <Link href="/onboarding" className="mt-2 inline-flex min-h-10 items-center font-bold text-primary hover:text-white">
              Continue to onboarding preview <span className="ml-1" aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      )}
    </form>
  );
}

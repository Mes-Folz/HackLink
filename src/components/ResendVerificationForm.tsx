"use client";

import { useActionState } from "react";
import { resendVerificationEmail } from "@/server/auth-actions";
import type { AuthFormState } from "@/types/auth";

export default function ResendVerificationForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(resendVerificationEmail, {});

  return (
    <form action={action} className="mt-6 space-y-4">
      <label htmlFor="verification-email" className="block text-sm font-semibold text-ink">
        Email address
        <input
          id="verification-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className="mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="you@example.com"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send verification link"}
      </button>
      {state.error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm leading-5 text-red-200">{state.error}</p>}
      {state.success && <p role="status" className="rounded-xl border border-emerald-400/30 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">{state.success}</p>}
    </form>
  );
}

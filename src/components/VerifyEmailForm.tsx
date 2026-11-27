"use client";

import { useActionState } from "react";
import { verifyEmail } from "@/server/auth-actions";
import type { AuthFormState } from "@/types/auth";

export default function VerifyEmailForm({ token }: { token: string }) {
  const verifyAction = verifyEmail.bind(null, token);
  const [state, action, pending] = useActionState<AuthFormState, FormData>(verifyAction, {});
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <form action={action} className="mt-6 space-y-4">
      {state.error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm leading-5 text-red-200">{state.error}</p>}
      <label htmlFor="verification-password" className="block text-sm font-semibold text-ink">
        Choose a password
        <input
          id="verification-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={72}
          required
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={state.fieldErrors?.password ? "verification-password-error" : undefined}
          className={inputClassName}
          placeholder="At least 8 characters"
        />
        {state.fieldErrors?.password && <span id="verification-password-error" className="mt-1 block text-xs font-normal text-red-300">{state.fieldErrors.password}</span>}
      </label>
      <label htmlFor="verification-password-confirmation" className="block text-sm font-semibold text-ink">
        Confirm password
        <input
          id="verification-password-confirmation"
          name="passwordConfirmation"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={72}
          required
          aria-invalid={Boolean(state.fieldErrors?.passwordConfirmation)}
          aria-describedby={state.fieldErrors?.passwordConfirmation ? "verification-password-confirmation-error" : undefined}
          className={inputClassName}
          placeholder="Re-enter your password"
        />
        {state.fieldErrors?.passwordConfirmation && <span id="verification-password-confirmation-error" className="mt-1 block text-xs font-normal text-red-300">{state.fieldErrors.passwordConfirmation}</span>}
      </label>
      <p className="text-xs leading-5 text-muted">Passwords are hashed before storage.</p>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Confirming email..." : "Confirm email and set password"}
      </button>
    </form>
  );
}

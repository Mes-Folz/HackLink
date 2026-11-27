"use client";

import { useActionState } from "react";
import { confirmAdultAge, type AgeFormState } from "@/server/age-actions";

export default function AgeConfirmationForm() {
  const [state, action, pending] = useActionState<AgeFormState, FormData>(confirmAdultAge, {});

  return (
    <form action={action} className="mt-6 space-y-4">
      <label htmlFor="adult-confirmation" className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          id="adult-confirmation"
          name="adultConfirmed"
          type="checkbox"
          required
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "adult-confirmation-error" : undefined}
          className="mt-1 size-4 shrink-0 accent-primary focus-visible:ring-2 focus-visible:ring-primary"
        />
        <span>I confirm I am 18 or older. I understand this confirmation date will be stored with my account.</span>
      </label>
      {state.error && <p id="adult-confirmation-error" role="alert" className="text-sm text-red-300">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Confirming…" : "Continue"}
      </button>
    </form>
  );
}

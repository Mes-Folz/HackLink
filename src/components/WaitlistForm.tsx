"use client";

import { useActionState } from "react";
import { joinWaitlist } from "@/server/profile-actions";

export default function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, {});
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <form className="mt-6 space-y-4" action={action}>
      <label htmlFor="waitlist-email" className="block text-sm font-semibold text-ink">
        Email address
        <input id="waitlist-email" name="email" type="email" autoComplete="email" required className={inputClassName} placeholder="you@example.com" />
      </label>

      <label htmlFor="waitlist-area" className="block text-sm font-semibold text-ink">
        City or region <span className="font-normal text-muted">(optional)</span>
        <input
          id="waitlist-area"
          name="area"
          maxLength={80}
          autoComplete="address-level2"
          className={inputClassName}
          placeholder="A city or region is enough"
          aria-describedby="waitlist-area-help"
        />
        <span id="waitlist-area-help" className="mt-2 block text-xs font-normal leading-5 text-muted">
          Don&apos;t enter an exact address.
        </span>
      </label>

      <label htmlFor="waitlist-adult-confirmation" className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          id="waitlist-adult-confirmation"
          name="adultConfirmed"
          type="checkbox"
          required
          className="mt-1 size-4 shrink-0 accent-primary focus-visible:ring-2 focus-visible:ring-primary"
        />
        <span>I confirm I am 18 or older. This is a self-declaration, not formal age verification. Under-18 waitlist entries are paused.</span>
      </label>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {pending ? "Joining…" : "Join the waitlist"}
      </button>

      {state.error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm leading-5 text-red-200">{state.error}</p>}
      {state.success && <p role="status" className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-5 text-ink">{state.success}</p>}
    </form>
  );
}

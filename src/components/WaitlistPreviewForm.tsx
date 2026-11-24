"use client";

import { useState, type FormEvent } from "react";

export default function WaitlistPreviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Preview waitlist signup
      </button>

      {submitted && (
        <p role="status" className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-5 text-ink">
          Preview only: no waitlist entry was sent or saved. The real waitlist will be connected later.
        </p>
      )}
    </form>
  );
}

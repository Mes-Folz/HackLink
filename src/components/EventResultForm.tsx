"use client";

import { useActionState } from "react";
import { publishEventResult } from "@/server/event-actions";

export default function EventResultForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState(publishEventResult.bind(null, eventId), {});
  const inputClassName = "mt-2 min-h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
  return (
    <form action={action} className="mt-4 space-y-3 rounded-xl border border-line bg-bg p-4">
      <label htmlFor={`result-name-${eventId}`} className="block text-sm font-semibold text-ink">
        Project or team name
        <input id={`result-name-${eventId}`} name="projectName" maxLength={100} required className={inputClassName} />
      </label>
      <label htmlFor={`result-summary-${eventId}`} className="block text-sm font-semibold text-ink">
        Result summary
        <textarea id={`result-summary-${eventId}`} name="summary" maxLength={500} required rows={2} className={`${inputClassName} py-2 leading-5`} />
      </label>
      <label htmlFor={`result-place-${eventId}`} className="block text-sm font-semibold text-ink">
        Placement <span className="font-normal text-muted">(optional)</span>
        <input id={`result-place-${eventId}`} name="placement" type="number" min={1} max={1000} className={inputClassName} />
      </label>
      <button type="submit" disabled={pending} className="min-h-11 rounded-lg bg-primary-dark px-4 text-sm font-bold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60">
        {pending ? "Publishing…" : "Publish result"}
      </button>
      {state.error && <p role="alert" className="text-sm text-red-300">{state.error}</p>}
      {state.success && <p role="status" className="text-sm text-emerald-300">{state.success}</p>}
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { assignEventOrganizer } from "@/server/event-actions";

export default function EventOrganizerForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState(assignEventOrganizer.bind(null, eventId), {});
  return (
    <form action={action} className="flex flex-col gap-3 rounded-xl border border-line bg-bg p-4 sm:flex-row sm:items-end">
      <label htmlFor={`organizer-${eventId}`} className="min-w-0 flex-1 text-sm font-semibold text-ink">
        Add organizer by account email
        <input id={`organizer-${eventId}`} name="email" type="email" required autoComplete="email" className="mt-2 min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
      </label>
      <button type="submit" disabled={pending} className="min-h-11 rounded-lg border border-line px-4 text-sm font-bold text-ink hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60">
        {pending ? "Adding…" : "Add organizer"}
      </button>
      {state.error && <p role="alert" className="text-xs text-red-300">{state.error}</p>}
      {state.success && <p role="status" className="text-xs text-emerald-300">{state.success}</p>}
    </form>
  );
}

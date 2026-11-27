"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createEvent } from "@/server/event-actions";

export default function EventCreateForm({ guilds }: { guilds: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(createEvent, {});
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  if (guilds.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-5 text-sm leading-6 text-muted">
        Create a Guild first. Events must have a host Guild, and only its owner or admins can manage them.
        <Link href="/guilds/create" className="ml-1 font-bold text-primary hover:text-white">Create a Guild</Link>
      </div>
    );
  }
  return (
    <form action={action} className="space-y-4 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <label htmlFor="event-host" className="block text-sm font-semibold text-ink">
        Host Guild
        <select id="event-host" name="hostGuildId" required className={inputClassName} defaultValue="">
          <option value="" disabled>Select a Guild you manage</option>
          {guilds.map((guild) => <option key={guild.id} value={guild.id}>{guild.name}</option>)}
        </select>
      </label>
      <label htmlFor="event-title" className="block text-sm font-semibold text-ink">
        Event name
        <input id="event-title" name="title" required maxLength={100} className={inputClassName} placeholder="What are we building?" />
      </label>
      <label htmlFor="event-topic" className="block text-sm font-semibold text-ink">
        Topic
        <input id="event-topic" name="topic" required maxLength={80} className={inputClassName} placeholder="e.g. Civic tech, climate, open source" />
      </label>
      <label htmlFor="event-description" className="block text-sm font-semibold text-ink">
        Description
        <textarea id="event-description" name="description" required maxLength={1000} rows={4} className={`${inputClassName} py-3 leading-6`} placeholder="Share the challenge, format, and who should join." />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="event-date" className="block text-sm font-semibold text-ink">
          Event date
          <input id="event-date" name="startsAt" type="datetime-local" required className={inputClassName} />
        </label>
        <label htmlFor="event-end-date" className="block text-sm font-semibold text-ink">
          Event ends
          <input id="event-end-date" name="endsAt" type="datetime-local" required className={inputClassName} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="event-deadline" className="block text-sm font-semibold text-ink">
          Application deadline
          <input id="event-deadline" name="registrationDeadline" type="datetime-local" required className={inputClassName} />
        </label>
        <label htmlFor="event-capacity" className="block text-sm font-semibold text-ink">
          Capacity
          <input id="event-capacity" name="capacity" type="number" min={1} max={10000} required inputMode="numeric" className={inputClassName} placeholder="48" />
          <span className="mt-2 block text-xs font-normal leading-5 text-muted">Pending applications count toward this limit.</span>
        </label>
        <label htmlFor="event-format" className="block text-sm font-semibold text-ink">
          Format
          <select id="event-format" name="isOnline" defaultValue="false" className={inputClassName}>
            <option value="false">In person</option>
            <option value="true">Online</option>
          </select>
        </label>
      </div>
      <label htmlFor="event-location" className="block text-sm font-semibold text-ink">
        Location or online details
        <input id="event-location" name="location" maxLength={160} className={inputClassName} placeholder="Iloilo City or event venue" />
        <span className="mt-2 block text-xs font-normal text-muted">Required for in-person events; online events can leave this blank.</span>
      </label>
      <button type="submit" disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-60">
        {pending ? "Publishing…" : "Publish event"}
      </button>
      {state.error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm leading-5 text-red-200">{state.error}</p>}
    </form>
  );
}

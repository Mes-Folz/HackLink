"use client";

import { useState, type FormEvent } from "react";

export default function EventCreatePreviewForm() {
  const [message, setMessage] = useState("");
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preview only: this event was not created or saved.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <label htmlFor="event-title" className="block text-sm font-semibold text-ink">
        Event name
        <input id="event-title" name="title" required maxLength={100} className={inputClassName} placeholder="What are we building?" />
      </label>
      <label htmlFor="event-description" className="block text-sm font-semibold text-ink">
        Description
        <textarea id="event-description" name="description" required maxLength={1000} rows={4} className={`${inputClassName} py-3 leading-6`} placeholder="Share the challenge, format, and who should join." />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="event-date" className="block text-sm font-semibold text-ink">
          Event date
          <input id="event-date" name="date" type="date" required className={inputClassName} />
        </label>
        <label htmlFor="event-deadline" className="block text-sm font-semibold text-ink">
          Application deadline
          <input id="event-deadline" name="deadline" type="date" required className={inputClassName} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="event-capacity" className="block text-sm font-semibold text-ink">
          Capacity
          <input id="event-capacity" name="capacity" type="number" min={1} max={10000} required inputMode="numeric" className={inputClassName} placeholder="48" />
          <span className="mt-2 block text-xs font-normal leading-5 text-muted">Pending applications count toward this limit.</span>
        </label>
        <label htmlFor="event-format" className="block text-sm font-semibold text-ink">
          Format
          <select id="event-format" name="format" defaultValue="in-person" className={inputClassName}>
            <option value="in-person">In person</option>
            <option value="online">Online</option>
          </select>
        </label>
      </div>
      <label htmlFor="event-location" className="block text-sm font-semibold text-ink">
        Location or online details
        <input id="event-location" name="location" required maxLength={100} className={inputClassName} placeholder="Iloilo City or meeting details" />
      </label>
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
        Preview event creation
      </button>
      {message && <p role="status" className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-5 text-ink">{message}</p>}
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";

export default function GuildCreatePreviewForm() {
  const [message, setMessage] = useState("");
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preview only: this Guild was not created or saved.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <label htmlFor="guild-name" className="block text-sm font-semibold text-ink">
        Guild name
        <input id="guild-name" name="name" required maxLength={60} className={inputClassName} placeholder="A name people can remember" />
      </label>
      <label htmlFor="guild-category" className="block text-sm font-semibold text-ink">
        Focus
        <input id="guild-category" name="category" required maxLength={80} className={inputClassName} placeholder="e.g. Open source, product design" />
      </label>
      <label htmlFor="guild-description" className="block text-sm font-semibold text-ink">
        What will members do together?
        <textarea id="guild-description" name="description" required maxLength={500} rows={4} className={`${inputClassName} py-3 leading-6`} placeholder="Describe the projects, learning, or community you want to build." />
      </label>
      <label htmlFor="guild-privacy" className="block text-sm font-semibold text-ink">
        Membership
        <select id="guild-privacy" name="privacy" defaultValue="public" className={inputClassName}>
          <option value="public">Public — anyone can discover and join</option>
          <option value="private">Private — members need an invitation or approval</option>
        </select>
        <span className="mt-2 block text-xs font-normal leading-5 text-muted">
          Private Guild access controls are a mockup only and are not enforced yet.
        </span>
      </label>
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
        Preview Guild creation
      </button>
      {message && <p role="status" className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-5 text-ink">{message}</p>}
    </form>
  );
}

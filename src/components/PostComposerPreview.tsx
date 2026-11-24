"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export default function PostComposerPreview() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preview only: this post was not published or saved.");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">
      <label htmlFor="post-preview" className="block font-display text-lg font-bold text-ink">
        Share what you&apos;re building
      </label>
      <textarea
        id="post-preview"
        name="post"
        required
        maxLength={500}
        rows={3}
        placeholder="A small win, a question, or a work-in-progress..."
        className="mt-3 w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-sm leading-6 text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-describedby="post-preview-help"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p id="post-preview-help" className="text-xs leading-5 text-muted">
          Preview only. Posts are not submitted or saved.
        </p>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Preview post <Send size={15} aria-hidden="true" />
        </button>
      </div>
      {message && (
        <p role="status" className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-5 text-ink">
          {message}
        </p>
      )}
    </form>
  );
}

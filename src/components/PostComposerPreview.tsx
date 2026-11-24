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
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-surface/90 p-3 shadow-[0_12px_36px_rgba(0,0,0,0.2)] sm:p-4">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/40 bg-gradient-to-br from-primary-dark to-night font-display text-xs font-bold text-white">
          MS
        </span>
        <div className="min-w-0 flex-1">
          <label htmlFor="post-preview" className="sr-only">What&apos;s on your mind?</label>
          <textarea
            id="post-preview"
            name="post"
            required
            maxLength={500}
            rows={2}
            placeholder="What's on your mind?"
            className="min-h-12 w-full resize-y rounded-xl border border-transparent bg-bg/70 px-4 py-3 text-sm leading-6 text-ink placeholder:text-muted focus-visible:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-describedby="post-preview-help"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <p id="post-preview-help" className="text-[11px] leading-5 text-muted">
              Preview only · nothing is published or saved
            </p>
            <button
              type="submit"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary-dark px-5 text-xs font-bold text-white shadow-[0_0_20px_rgba(185,28,43,0.22)] transition-[background-color,transform,box-shadow] hover:scale-[1.02] hover:bg-red-800 hover:shadow-[0_0_24px_rgba(185,28,43,0.35)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Post <Send size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {message && (
        <p role="status" className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-5 text-ink">
          {message}
        </p>
      )}
    </form>
  );
}

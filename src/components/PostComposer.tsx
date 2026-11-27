"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { createPost } from "@/server/social-actions";

export default function PostComposer() {
  const [state, action, pending] = useActionState(createPost, {});

  return (
    <form action={action} className="rounded-2xl border border-line bg-surface/90 p-3 shadow-[0_12px_36px_rgba(0,0,0,0.2)] sm:p-4">
      <label htmlFor="post-body" className="sr-only">What&apos;s on your mind?</label>
      <textarea
        id="post-body"
        name="body"
        required
        maxLength={2000}
        rows={3}
        placeholder="What's on your mind?"
        className="min-h-20 w-full resize-y rounded-xl border border-transparent bg-bg/70 px-4 py-3 text-sm leading-6 text-ink placeholder:text-muted focus-visible:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-describedby="post-body-help"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p id="post-body-help" className="text-[11px] leading-5 text-muted">Share progress, ideas, or questions with your community.</p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-dark px-5 text-xs font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Posting…" : "Post"} <Send size={14} aria-hidden="true" />
        </button>
      </div>
      {state.error && <p role="alert" className="mt-3 text-sm text-red-300">{state.error}</p>}
      {state.success && <p role="status" className="mt-3 text-sm text-emerald-300">{state.success}</p>}
    </form>
  );
}

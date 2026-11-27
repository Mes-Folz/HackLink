"use client";

import { useActionState } from "react";
import { addComment } from "@/server/social-actions";

export default function CommentForm({ postId }: { postId: string }) {
  const [state, action, pending] = useActionState(addComment.bind(null, postId), {});
  return (
    <form action={action} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor={`comment-${postId}`} className="sr-only">Write a comment</label>
      <input
        id={`comment-${postId}`}
        name="body"
        required
        maxLength={1000}
        className="min-h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        placeholder="Write a comment…"
      />
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-lg border border-line px-4 text-xs font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
      >
        {pending ? "Sending…" : "Comment"}
      </button>
      {state.error && <p role="alert" className="text-xs text-red-300">{state.error}</p>}
    </form>
  );
}

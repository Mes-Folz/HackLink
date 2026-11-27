import { Heart } from "lucide-react";
import { togglePostLike } from "@/server/social-actions";

export default function LikeButton({ postId, count, liked }: { postId: string; count: number; liked: boolean }) {
  return (
    <form action={togglePostLike.bind(null, postId)}>
      <button
        type="submit"
        aria-label={`${liked ? "Unlike" : "Like"} post, ${count} likes`}
        aria-pressed={liked}
        className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          liked ? "bg-rose-950 text-rose-300" : "text-muted hover:bg-white/5 hover:text-rose-300"
        }`}
      >
        <Heart size={17} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
        <span>{count}</span>
      </button>
    </form>
  );
}

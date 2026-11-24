"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({ count }: { count: number }) {
  const [liked, setLiked] = useState(false);
  const shownCount = count + Number(liked);

  return (
    <button
      type="button"
      aria-label={`${liked ? "Unlike" : "Like"} sample post, ${shownCount} likes`}
      aria-pressed={liked}
      onClick={() => setLiked((current) => !current)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary ${
        liked ? "bg-rose-950 text-rose-300" : "text-muted hover:bg-white/5 hover:text-rose-300"
      }`}
    >
      <Heart size={17} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
      <span>{shownCount}</span>
    </button>
  );
}

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Avatar from "@/components/Avatar";
import LikeButton from "@/components/LikeButton";
import type { FeedPost } from "@/types/community";
import { displayName, initialsForName } from "@/types/community";
import CommentForm from "@/components/CommentForm";

export default function PostCard({ post, viewerId }: { post: FeedPost; viewerId: string }) {
  const authorName = displayName(post.author);
  const liked = post.likes.some((like) => like.userId === viewerId);

  return (
    <article className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5" aria-labelledby={`post-${post.id}`}>
      <div className="flex items-start gap-3">
        <Avatar initials={initialsForName(authorName)} tone="violet" />
        <div className="min-w-0 flex-1">
          <h3 id={`post-${post.id}`} className="truncate text-sm font-bold text-ink">
            {post.author.username
              ? <Link href={`/people/${post.author.username}`} className="hover:text-primary">{authorName}</Link>
              : authorName}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{post.author.focus || "HackLink member"}</p>
        </div>
        <time dateTime={post.createdAt.toISOString()} className="shrink-0 pt-1 text-xs text-muted">
          {post.createdAt.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" })}
        </time>
      </div>

      <p className="mt-4 whitespace-pre-line break-words text-sm leading-6 text-ink">{post.body}</p>

      <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
        <LikeButton postId={post.id} count={post.likes.length} liked={liked} />
        <details className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted transition-colors hover:bg-white/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
            <MessageCircle size={17} aria-hidden="true" />
            <span>{post.comments.length}</span>
            <span className="sr-only">comments</span>
          </summary>
          <div className="mt-2 space-y-3 rounded-xl bg-bg p-3 sm:ml-2">
            {post.comments.map((comment) => (
              <p key={comment.id} className="break-words text-sm leading-5 text-muted">
                <span className="font-semibold text-ink">{displayName(comment.author)}</span> {comment.body}
              </p>
            ))}
            <CommentForm postId={post.id} />
          </div>
        </details>
        <span className="ml-auto hidden text-xs text-muted sm:inline">Community post</span>
      </div>
    </article>
  );
}

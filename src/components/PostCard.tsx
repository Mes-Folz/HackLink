import { MessageCircle } from "lucide-react";
import Avatar from "@/components/Avatar";
import LikeButton from "@/components/LikeButton";
import type { SamplePost } from "@/config/sample-content";

export default function PostCard({ post }: { post: SamplePost }) {
  return (
    <article className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5" aria-labelledby={`post-${post.id}`}>
      <div className="flex items-start gap-3">
        <Avatar initials={post.initials} tone={post.tone} />
        <div className="min-w-0 flex-1">
          <h3 id={`post-${post.id}`} className="truncate text-sm font-bold text-ink">
            {post.author}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{post.role}</p>
        </div>
        <span aria-label={`Posted ${post.time} ago`} className="shrink-0 pt-1 text-xs text-muted">
          {post.time}
        </span>
      </div>

      <p className="mt-4 whitespace-pre-line text-sm leading-6 text-ink">{post.body}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Post topics">
        {post.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
        <LikeButton count={post.likes} />
        <details className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted transition-colors hover:bg-white/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
            <MessageCircle size={17} aria-hidden="true" />
            <span>{post.comments.length}</span>
            <span className="sr-only">sample comments</span>
          </summary>
          <div className="mt-2 rounded-xl bg-bg p-3 sm:ml-2">
            {post.comments.map((comment) => (
              <p key={comment.author} className="text-sm leading-5 text-muted">
                <span className="font-semibold text-ink">{comment.author}</span> {comment.body}
              </p>
            ))}
          </div>
        </details>
        <span className="ml-auto hidden text-xs text-muted sm:inline">Community post</span>
      </div>
    </article>
  );
}

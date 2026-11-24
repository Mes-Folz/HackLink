"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import PostCard from "@/components/PostCard";
import PostComposerPreview from "@/components/PostComposerPreview";
import type { SamplePost } from "@/config/sample-content";

type FeedFilter = "for-you" | "following" | "latest";
type FeedSort = "recent" | "popular";

const FILTERS: { id: FeedFilter; label: string }[] = [
  { id: "for-you", label: "For You" },
  { id: "following", label: "Following" },
  { id: "latest", label: "Latest" },
];

export default function FeedPreview({ posts }: { posts: SamplePost[] }) {
  const [filter, setFilter] = useState<FeedFilter>("for-you");
  const [sort, setSort] = useState<FeedSort>("recent");

  let visiblePosts = filter === "following" ? posts.slice(0, 1) : [...posts];

  if (filter === "latest") visiblePosts = visiblePosts.filter((post) => Number.parseInt(post.time, 10) <= 24);
  visiblePosts = sort === "popular"
    ? [...visiblePosts].sort((a, b) => b.likes - a.likes)
    : [...visiblePosts].sort((a, b) => Number.parseInt(a.time, 10) - Number.parseInt(b.time, 10));

  return (
    <section className="space-y-4" aria-labelledby="feed-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 -skew-x-12 rounded-full bg-primary" aria-hidden="true" />
            <h2 id="feed-heading" className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">Your Feed</h2>
          </div>
          <div role="group" aria-label="Feed filter" className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1">
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
                className={`min-h-9 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  filter === id ? "bg-primary-dark text-white shadow-[0_4px_14px_rgba(185,28,43,0.28)]" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface/70 px-3 text-xs text-muted">
          <SlidersHorizontal size={14} aria-hidden="true" />
          <span className="sr-only">Sort sample feed</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value === "popular" ? "popular" : "recent")}
            className="max-w-[120px] cursor-pointer bg-transparent text-xs font-semibold text-ink focus-visible:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Liked</option>
          </select>
        </label>
      </div>

      <PostComposerPreview />

      <div className="space-y-4">
        {visiblePosts.length > 0
          ? visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
          : <EmptyState title="No sample updates yet" body="New posts will appear here when the feed is connected." />}
      </div>
    </section>
  );
}

import EmptyState from "@/components/EmptyState";
import PostCard from "@/components/PostCard";
import PostComposer from "@/components/PostComposer";
import type { FeedPost } from "@/types/community";

export default function Feed({ posts, viewerId }: { posts: FeedPost[]; viewerId: string }) {
  return (
    <section className="space-y-4" aria-labelledby="feed-heading">
      <div className="flex items-center gap-2">
        <span className="h-6 w-1 -skew-x-12 rounded-full bg-primary" aria-hidden="true" />
        <h2 id="feed-heading" className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">Your Feed</h2>
      </div>
      <PostComposer />
      <div className="space-y-4">
        {posts.length > 0
          ? posts.map((post) => <PostCard key={post.id} post={post} viewerId={viewerId} />)
          : <EmptyState title="Your feed is ready" body="Be the first to share a project, question, or update with the community." />}
      </div>
    </section>
  );
}

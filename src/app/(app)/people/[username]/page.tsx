import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import Avatar from "@/components/Avatar";
import EmptyState from "@/components/EmptyState";
import PageHeading from "@/components/PageHeading";
import PostCard from "@/components/PostCard";
import { sendConnectionRequest } from "@/server/social-actions";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";
import { displayName, initialsForName } from "@/types/community";

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const viewerId = await requireUserId();
  const user = await getPrisma().user.findUnique({
    where: { username: username.toLowerCase() },
    select: {
      id: true,
      username: true,
      displayName: true,
      bio: true,
      focus: true,
      area: true,
      adultAttestedAt: true,
      posts: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: {
          author: { select: { id: true, displayName: true, username: true, focus: true } },
          likes: { select: { userId: true } },
          comments: {
            where: { author: { is: { adultAttestedAt: { not: null } } } },
            orderBy: { createdAt: "asc" },
            include: { author: { select: { displayName: true, username: true } } },
          },
        },
      },
    },
  });
  if (!user || user.id === viewerId || !user.adultAttestedAt) notFound();
  const name = displayName(user);

  return (
    <div className="space-y-7">
      <Link href="/explore" className="inline-flex min-h-11 items-center text-sm font-semibold text-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">← Back to Explore</Link>
      <PageHeading eyebrow={`MEMBER · @${user.username}`} title={name} description={user.focus || "HackLink community member"} />
      <section className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar initials={initialsForName(name)} tone="violet" size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-bold text-ink">{name}</h2>
            <p className="mt-1 text-sm text-muted">@{user.username} · {user.focus || "HackLink member"}</p>
          </div>
          <form action={sendConnectionRequest.bind(null, user.id)}>
            <button type="submit" className="min-h-11 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Connect</button>
          </form>
        </div>
        <p className="mt-5 whitespace-pre-line text-sm leading-6 text-ink">{user.bio || "This member has not added an introduction yet."}</p>
        {user.area && <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted"><MapPin size={15} className="text-primary" aria-hidden="true" />{user.area} · approximate area only</p>}
      </section>
      <section aria-labelledby="public-profile-posts">
        <h2 id="public-profile-posts" className="mb-4 font-display text-xl font-bold text-ink">Recent posts</h2>
        <div className="space-y-4">{user.posts.length ? user.posts.map((post) => <PostCard key={post.id} post={post} viewerId={viewerId} />) : <EmptyState title="No posts yet" body="This member hasn't shared a public post." />}</div>
      </section>
    </div>
  );
}

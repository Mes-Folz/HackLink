import Link from "next/link";
import { MapPin } from "lucide-react";
import Avatar from "@/components/Avatar";
import EmptyState from "@/components/EmptyState";
import PageHeading from "@/components/PageHeading";
import PostCard from "@/components/PostCard";
import SignOutButton from "@/components/SignOutButton";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";
import { displayName, initialsForName } from "@/types/community";

export default async function ProfilePage() {
  const userId = await requireUserId();
  const user = await getPrisma().user.findUniqueOrThrow({
    where: { id: userId },
    include: {
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
  const name = displayName(user);

  return (
    <div className="space-y-7">
      <PageHeading eyebrow="PROFILE · YOUR COMMUNITY IDENTITY" title="Your profile, your story." description="Share what you build and let local makers know what you care about." />
      <section className="overflow-hidden rounded-3xl border border-line bg-surface" aria-labelledby="profile-name">
        <div className="h-24 bg-gradient-to-r from-primary-dark/70 via-primary/20 to-night" aria-hidden="true" />
        <div className="-mt-8 flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div className="flex items-end gap-4">
            <Avatar initials={initialsForName(name)} tone="violet" size="lg" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">@{user.username}</p>
              <h2 id="profile-name" className="mt-1 font-display text-2xl font-bold text-ink">{name}</h2>
              <p className="mt-1 text-sm text-muted">{user.focus || "HackLink member"}</p>
            </div>
          </div>
          <Link href="/onboarding?edit=1" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Edit profile</Link>
        </div>
        <div className="grid gap-4 border-t border-line p-5 sm:grid-cols-2 sm:p-7">
          <div><h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">About</h3><p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink">{user.bio || "Add a short introduction so people know what you are building."}</p></div>
          <div><h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Focus</h3><p className="mt-2 text-sm text-ink">{user.focus || "Add your role or interests in Edit profile."}</p></div>
          <div className="sm:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Approximate area</h3>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink"><MapPin size={16} className="text-primary" aria-hidden="true" />{user.area}</p>
            <p className="mt-1 text-xs text-muted">Only a broad area is shown; no exact location is collected or displayed.</p>
          </div>
        </div>
      </section>
      <section aria-labelledby="profile-posts">
        <div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">COMMUNITY ACTIVITY</p><h2 id="profile-posts" className="mt-1 font-display text-xl font-bold text-ink">Recent posts</h2></div>
        <div className="space-y-4">
          {user.posts.length > 0
            ? user.posts.map((post) => <PostCard key={post.id} post={post} viewerId={userId} />)
            : <EmptyState title="No posts yet" body="Your updates will appear here when you share something with the community." />}
        </div>
      </section>
      <section className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm leading-6 text-muted">Your profile shows only your approximate area. Never add a street address or exact location.</p>
        <div className="mt-4"><SignOutButton /></div>
      </section>
    </div>
  );
}

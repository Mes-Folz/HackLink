import { MapPin } from "lucide-react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import EmptyState from "@/components/EmptyState";
import PageHeading from "@/components/PageHeading";
import PostCard from "@/components/PostCard";
import PreviewSignOutButton from "@/components/PreviewSignOutButton";
import { ALLOWED_REGIONS } from "@/config/regions";
import { SAMPLE_MEMBERS, SAMPLE_POSTS } from "@/config/sample-content";

const member = SAMPLE_MEMBERS[0];
const profilePosts = SAMPLE_POSTS.filter((post) => post.author === member.name);
const approximateArea = ALLOWED_REGIONS.map((region) => region.name).join(" · ");

export default function ProfilePage() {
  return (
    <div className="space-y-7">
      <PageHeading
        eyebrow="PROFILE · PREVIEW"
        title="Your profile, your story."
        description="This sample profile shows how a community member could introduce their work and interests."
      />

      <section className="overflow-hidden rounded-3xl border border-line bg-surface" aria-labelledby="profile-name">
        <div className="h-24 bg-gradient-to-r from-primary-dark/70 via-primary/20 to-night" aria-hidden="true" />
        <div className="-mt-8 flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div className="flex items-end gap-4">
            <Avatar initials={member.initials} tone={member.tone} size="lg" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Sample member</p>
              <h2 id="profile-name" className="mt-1 font-display text-2xl font-bold text-ink">{member.name}</h2>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
            </div>
          </div>
          <Link href="/onboarding" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
            Edit profile preview
          </Link>
        </div>

        <div className="grid gap-4 border-t border-line p-5 sm:grid-cols-2 sm:p-7">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">About</h3>
            <p className="mt-2 text-sm leading-6 text-ink">
              Learning by building, sharing early, and finding good collaborators along the way.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Interests</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {member.interests.map((interest) => (
                <li key={interest} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Approximate area</h3>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink">
              <MapPin size={16} className="text-primary" aria-hidden="true" />
              {approximateArea}
            </p>
            <p className="mt-1 text-xs text-muted">Only a broad area is shown; no exact location is displayed.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="profile-posts">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Community activity</p>
          <h2 id="profile-posts" className="mt-1 font-display text-xl font-bold text-ink">Recent posts</h2>
        </div>
        <div className="space-y-4">
          {profilePosts.length > 0
            ? profilePosts.map((post) => <PostCard key={post.id} post={post} />)
            : <EmptyState title="No preview posts yet" body="Sample posts will appear here when available." />}
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm leading-6 text-muted">This is a preview profile. Editing does not save changes, and sign-out is simulated.</p>
        <div className="mt-4">
          <PreviewSignOutButton />
        </div>
      </section>
    </div>
  );
}

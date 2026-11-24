import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, LockKeyhole, Users } from "lucide-react";
import EventCard from "@/components/EventCard";
import GuildMembershipPreviewButton from "@/components/GuildMembershipPreviewButton";
import PageHeading from "@/components/PageHeading";
import PostCard from "@/components/PostCard";
import { SAMPLE_EVENTS, SAMPLE_GUILDS, SAMPLE_POSTS } from "@/config/sample-content";

export function generateStaticParams() {
  return SAMPLE_GUILDS.map((guild) => ({ slug: guild.slug }));
}

export default async function GuildDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guild = SAMPLE_GUILDS.find((item) => item.slug === slug);

  if (!guild) notFound();

  const guildEvents = SAMPLE_EVENTS.filter((event) => event.host === guild.name);

  return (
    <div className="space-y-7">
      <Link href="/guilds" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Guilds
      </Link>

      <section className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="h-28 bg-gradient-to-r from-primary-dark/70 via-primary/15 to-night" aria-hidden="true" />
        <div className="-mt-7 flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Public Guild · sample</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">{guild.name}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">{guild.category}</p>
          </div>
          <GuildMembershipPreviewButton />
        </div>
        <div className="grid gap-4 border-t border-line p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-7">
          <p className="max-w-2xl text-sm leading-6 text-ink">{guild.description}</p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
            <Users size={16} className="text-primary" aria-hidden="true" />
            {guild.members} sample members
          </p>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
        <LockKeyhole size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-xs leading-5 text-muted">
          This is public sample content. Real Guild membership, private access rules, and server-side permissions are not connected.
        </p>
      </div>

      {guildEvents.length > 0 && (
        <section aria-labelledby="guild-events-heading">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays size={17} className="text-primary" aria-hidden="true" />
            <h2 id="guild-events-heading" className="font-display text-xl font-bold text-ink">Hosted event previews</h2>
          </div>
          <div className="space-y-4">
            {guildEvents.map((event) => <EventCard key={event.slug} event={event} />)}
          </div>
        </section>
      )}

      <section aria-labelledby="guild-activity-heading">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">COMMUNITY ACTIVITY</p>
          <h2 id="guild-activity-heading" className="mt-1 font-display text-xl font-bold text-ink">A few sample updates</h2>
        </div>
        <div className="space-y-4">
          {SAMPLE_POSTS.slice(0, 1).map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, UserRoundPlus } from "lucide-react";
import Avatar from "@/components/Avatar";
import EventCard from "@/components/EventCard";
import GuildCard from "@/components/GuildCard";
import PageHeading from "@/components/PageHeading";
import { sendConnectionRequest } from "@/server/social-actions";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";
import { displayName, initialsForName } from "@/types/community";

export default async function ExplorePage() {
  const userId = await requireUserId();
  const db = getPrisma();
  const [people, guilds, events] = await Promise.all([
    db.user.findMany({
      where: { id: { not: userId }, username: { not: null }, adultAttestedAt: { not: null } },
      select: { id: true, displayName: true, username: true, focus: true, area: true },
      orderBy: { createdAt: "desc" },
      take: 9,
    }),
    db.guild.findMany({
      where: { visibility: "PUBLIC" },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { memberships: true } } },
    }),
    db.hackathonEvent.findMany({
      where: { status: "PUBLISHED", hostGuild: { is: { visibility: "PUBLIC" } } },
      orderBy: { startsAt: "asc" },
      take: 3,
      include: { hostGuild: { select: { name: true, slug: true, visibility: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <PageHeading eyebrow="EXPLORE · FIND YOUR PEOPLE" title="Good work starts with a good connection." description="Meet local makers, find a Guild that fits, and see what the community is building next." />
      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="people-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">People to know</p><h2 id="people-heading" className="mt-1 font-display text-xl font-bold text-ink">Meet the makers</h2></div>
          <Link href="/connections" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-xs font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><UserRoundPlus size={15} aria-hidden="true" /> Your connections</Link>
        </div>
        {people.length > 0 ? <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => <article key={person.id} className="rounded-xl border border-line bg-bg p-4">
            <Avatar initials={initialsForName(displayName(person))} tone="blue" />
            <h3 className="mt-3 text-sm font-bold text-ink"><Link href={`/people/${person.username}`} className="hover:text-primary">{displayName(person)}</Link></h3>
            <p className="mt-1 min-h-10 text-xs leading-5 text-muted">{person.focus || "HackLink member"}{person.area ? ` · ${person.area}` : ""}</p>
            <form action={sendConnectionRequest.bind(null, person.id)} className="mt-4"><button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 text-xs font-bold text-ink hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><UserRoundPlus size={14} aria-hidden="true" /> Connect</button></form>
          </article>)}
        </div> : <p className="mt-5 text-sm text-muted">More member profiles will appear here as people join.</p>}
      </section>
      <section aria-labelledby="guilds-heading">
        <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">FIND YOUR CREW</p><h2 id="guilds-heading" className="mt-1 font-display text-xl font-bold text-ink">Guilds worth a look</h2></div><Link href="/guilds" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary hover:text-white">All Guilds <ArrowRight size={15} aria-hidden="true" /></Link></div>
        {guilds.length > 0 ? <div className="grid gap-4 sm:grid-cols-2">{guilds.map((guild) => <GuildCard key={guild.id} guild={guild} />)}</div> : <p className="rounded-xl border border-dashed border-line p-5 text-sm text-muted">No public Guilds yet.</p>}
      </section>
      <section aria-labelledby="events-heading">
        <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">MAKE SOMETHING HAPPEN</p><h2 id="events-heading" className="mt-1 font-display text-xl font-bold text-ink">Upcoming events</h2></div><Link href="/hackathons" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary hover:text-white">All events <ArrowRight size={15} aria-hidden="true" /></Link></div>
        {events.length > 0 ? <div className="grid gap-4">{events.map((event) => <EventCard key={event.id} event={event} />)}</div> : <p className="rounded-xl border border-dashed border-line p-5 text-sm text-muted">No public events yet.</p>}
      </section>
    </div>
  );
}

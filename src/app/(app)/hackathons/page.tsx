import Link from "next/link";
import { CalendarDays, Plus, Users } from "lucide-react";
import EventCard from "@/components/EventCard";
import PageHeading from "@/components/PageHeading";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";

export default async function HackathonsPage() {
  const userId = await requireUserId();
  const events = await getPrisma().hackathonEvent.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { hostGuild: { is: { visibility: "PUBLIC" } } },
        { hostGuild: { is: { memberships: { some: { userId } } } } },
      ],
    },
    orderBy: { startsAt: "asc" },
    include: { hostGuild: { select: { name: true, slug: true, visibility: true } } },
  });

  return (
    <div className="space-y-7">
      <PageHeading eyebrow="HACKATHONS · MAKE IT REAL" title="A good challenge can change everything." description="Find a room, a team, and a reason to turn an idea into something people can try." />
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="text-sm leading-6 text-muted">Organizing a build sprint or design jam? Host it through a Guild you manage.</p>
        <Link href="/hackathons/create" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Plus size={16} aria-hidden="true" /> Host an event
        </Link>
      </div>
      <section className="grid gap-3 sm:grid-cols-2" aria-label="Hackathon highlights">
        <div className="rounded-2xl bg-night p-5 text-white">
          <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-primary"><CalendarDays size={19} aria-hidden="true" /></span>
          <h2 className="mt-4 font-display text-lg font-bold">Build something useful.</h2>
          <p className="mt-1 text-sm leading-5 text-white/75">Short sprints, thoughtful prompts, and room to experiment.</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Users size={19} aria-hidden="true" /></span>
          <h2 className="mt-4 font-display text-lg font-bold text-ink">Pending applications count.</h2>
          <p className="mt-1 text-sm leading-5 text-muted">Capacity stays fair during review; rejecting an application frees the place.</p>
        </div>
      </section>
      <section aria-labelledby="event-list-heading">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">COMMUNITY CALENDAR</p>
          <h2 id="event-list-heading" className="mt-1 font-display text-xl font-bold text-ink">Upcoming events</h2>
        </div>
        {events.length > 0
          ? <div className="grid gap-4">{events.map((event) => <EventCard key={event.id} event={event} />)}</div>
          : <p className="rounded-2xl border border-dashed border-line bg-surface p-6 text-sm text-muted">No events are published yet. Check back soon or host one with your Guild.</p>}
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Compass, UserRoundPlus } from "lucide-react";
import Avatar from "@/components/Avatar";
import ConnectionPreviewButton from "@/components/ConnectionPreviewButton";
import EventCard from "@/components/EventCard";
import GuildCard from "@/components/GuildCard";
import PageHeading from "@/components/PageHeading";
import { SAMPLE_EVENTS, SAMPLE_GUILDS, SAMPLE_MEMBERS } from "@/config/sample-content";

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="EXPLORE · FIND YOUR PEOPLE"
        title="Good work starts with a good connection."
        description="Meet local makers, find a Guild that fits, and see what the community is building next."
      />

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="people-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">People to know</p>
            <h2 id="people-heading" className="mt-1 font-display text-xl font-bold text-ink">Meet the makers</h2>
          </div>
          <Link href="/connections" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-xs font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <UserRoundPlus size={15} aria-hidden="true" /> Connections preview
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_MEMBERS.map((member) => (
            <article key={member.name} className="rounded-xl border border-line bg-bg p-4">
              <Avatar initials={member.initials} tone={member.tone} />
              <h3 className="mt-3 text-sm font-bold text-ink">{member.name}</h3>
              <p className="mt-1 min-h-10 text-xs leading-5 text-muted">{member.role}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${member.name}'s interests`}>
                {member.interests.map((interest) => (
                  <li key={interest} className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted">
                    {interest}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <ConnectionPreviewButton name={member.name} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="guilds-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">FIND YOUR CREW</p>
            <h2 id="guilds-heading" className="mt-1 font-display text-xl font-bold text-ink">Guilds worth a look</h2>
          </div>
          <Link href="/guilds" className="inline-flex min-h-10 items-center gap-1 text-sm font-bold text-primary hover:text-white">
            All Guilds <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SAMPLE_GUILDS.slice(0, 2).map((guild) => <GuildCard key={guild.name} guild={guild} />)}
        </div>
      </section>

      <section aria-labelledby="events-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">MAKE SOMETHING HAPPEN</p>
            <h2 id="events-heading" className="mt-1 font-display text-xl font-bold text-ink">Upcoming event previews</h2>
          </div>
          <Link href="/hackathons" aria-label="See all hackathon previews" className="grid size-10 place-items-center rounded-xl text-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary">
            <Compass size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4">
          {SAMPLE_EVENTS.slice(0, 2).map((event) => <EventCard key={event.title} event={event} />)}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Bell, CalendarDays, MapPin, Sparkles } from "lucide-react";
import Avatar from "@/components/Avatar";
import { ALLOWED_REGIONS } from "@/config/regions";
import { SAMPLE_EVENTS, SAMPLE_GUILDS } from "@/config/sample-content";

export default function CommunityRail() {
  const regionLabel = ALLOWED_REGIONS.map((region) => region.name).join(" · ");

  return (
    <aside className="hidden border-l border-line/80 bg-bg/70 xl:block" aria-label="Community highlights">
      <div className="sticky top-0 space-y-4 px-4 pb-6 pt-[88px]">
        <section className="rounded-2xl border border-line bg-surface/90 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.2)]" aria-labelledby="rail-communities">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 id="rail-communities" className="font-display text-sm font-bold text-ink">Your Communities</h2>
            <Link href="/guilds" className="inline-flex min-h-9 items-center gap-1 text-[11px] font-bold text-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              See all <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <ul className="space-y-1">
            {SAMPLE_GUILDS.map((guild) => (
              <li key={guild.slug}>
                <Link
                  href={`/guilds/${guild.slug}`}
                  aria-label={`Open ${guild.name} Guild preview`}
                  className="flex min-h-[58px] items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Avatar initials={guild.initials} tone={guild.tone} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-ink">{guild.name}</span>
                    <span className="mt-0.5 block text-[10px] text-muted">{guild.members} sample members</span>
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold text-muted">Join</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-surface/90 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.2)]" aria-labelledby="rail-events">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 id="rail-events" className="flex items-center gap-2 font-display text-sm font-bold text-ink">
              <CalendarDays size={16} className="text-primary" aria-hidden="true" />
              Upcoming Events
            </h2>
            <Link href="/hackathons" className="inline-flex min-h-9 items-center gap-1 text-[11px] font-bold text-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              See all <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y divide-line/80">
            {SAMPLE_EVENTS.slice(0, 2).map((event) => (
              <li key={event.slug}>
                <Link
                  href={`/hackathons/${event.slug}`}
                  className="flex min-h-[76px] items-center gap-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-bg text-center">
                    <span className="text-[9px] font-bold uppercase text-primary">{event.online ? "Online" : event.date.split(" ")[0]}</span>
                    <span className="font-display text-sm font-bold leading-4 text-ink">{event.date.match(/\d+/)?.[0]}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-ink">{event.title}</span>
                    <span className="mt-1 flex items-center gap-1 text-[10px] text-muted">
                      {event.online ? <Sparkles size={11} aria-hidden="true" /> : <MapPin size={11} aria-hidden="true" />}
                      {event.online ? "Online" : regionLabel}
                    </span>
                    <span className="mt-1 block text-[10px] text-primary">{event.pending} pending · sample</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary-dark/30 via-surface to-night p-4 shadow-[0_12px_40px_rgba(185,28,43,0.12)]">
          <div className="pointer-events-none absolute -bottom-10 -right-7 size-28 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
          <div className="relative flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Bell size={17} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-ink">Stay in the loop</h2>
              <p className="mt-1 text-xs leading-5 text-muted">See sample updates from Guilds, people, and events.</p>
            </div>
          </div>
          <Link href="/notifications" className="relative mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary-dark px-3 text-xs font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Open notifications <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </aside>
  );
}

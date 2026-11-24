import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { ALLOWED_REGIONS } from "@/config/regions";
import { SAMPLE_EVENTS } from "@/config/sample-content";

export default function CommunityRail() {
  const regionLabel = ALLOWED_REGIONS.map((region) => region.name).join(" · ");
  const featuredEvent = SAMPLE_EVENTS[0];

  return (
    <aside className="hidden border-l border-line bg-surface/55 xl:block" aria-label="Community highlights">
      <div className="sticky top-0 space-y-5 px-5 py-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-muted">Your corner</p>
          <span className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
            <Sparkles size={16} aria-hidden="true" />
          </span>
        </div>

        <section className="rounded-2xl border border-line bg-surface p-4 shadow-sm" aria-labelledby="rail-region">
          <p className="text-xs font-semibold text-muted">COMMUNITY AREA</p>
          <h2 id="rail-region" className="mt-2 flex items-center gap-2 font-display text-lg font-bold text-ink">
            <MapPin size={17} className="text-primary" aria-hidden="true" />
            {regionLabel}
          </h2>
          <p className="mt-2 text-sm leading-5 text-muted">
            A community for local developers, designers, students, and organizers.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm" aria-labelledby="rail-event">
          <div className="bg-primary-dark px-4 py-4 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">On the radar</p>
            <h2 id="rail-event" className="mt-1 font-display text-lg font-bold leading-tight">
              {featuredEvent.title}
            </h2>
          </div>
          <div className="p-4">
            <p className="flex items-center gap-2 text-xs font-medium text-muted">
              <CalendarDays size={15} className="text-primary" aria-hidden="true" />
              {featuredEvent.date}
            </p>
            <p className="mt-2 text-sm leading-5 text-muted">{featuredEvent.description}</p>
            <Link
              href={`/hackathons/${featuredEvent.slug}`}
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-primary hover:text-white"
            >
              Browse event previews <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="rounded-2xl bg-night p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Good things happen together</p>
          <p className="mt-2 text-sm leading-5 text-white/80">
            Find a Guild that turns your curiosity into a project.
          </p>
          <Link
            href="/guilds"
            className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-white hover:text-primary"
          >
            Meet the Guilds <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </aside>
  );
}

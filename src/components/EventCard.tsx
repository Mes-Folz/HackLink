import { CalendarDays, MapPin, Monitor } from "lucide-react";
import type { SampleEvent } from "@/config/sample-content";

export default function EventCard({ event }: { event: SampleEvent }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className={`h-1 ${event.tone === "violet" ? "bg-rose-400" : event.tone === "cyan" ? "bg-red-500" : "bg-primary-dark"}`} />
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {event.topic}
          </span>
          <span className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-muted">
            Sample listing
          </span>
        </div>
        <h2 className="mt-4 font-display text-xl font-bold leading-snug text-ink">{event.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{event.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} className="text-primary" aria-hidden="true" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {event.online ? (
              <Monitor size={15} className="text-primary" aria-hidden="true" />
            ) : (
              <MapPin size={15} className="text-primary" aria-hidden="true" />
            )}
            {event.location}
          </span>
        </div>
        <p className="mt-3 text-xs text-muted">Hosted by {event.host}</p>
      </div>
    </article>
  );
}

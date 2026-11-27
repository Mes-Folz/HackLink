import Link from "next/link";
import { CalendarDays, MapPin, Monitor } from "lucide-react";
import type { EventListItem } from "@/types/community";

export default function EventCard({ event }: { event: EventListItem }) {
  return (
    <Link href={`/hackathons/${event.slug}`} className="block overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <article>
        <div className="h-1 bg-primary-dark" aria-hidden="true" />
        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{event.topic}</span>
            <span className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-muted">{event.status.toLowerCase()}</span>
          </div>
          <h2 className="mt-4 font-display text-xl font-bold leading-snug text-ink">{event.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{event.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 text-xs font-medium text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} className="text-primary" aria-hidden="true" />
              {event.startsAt.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              {event.isOnline ? <Monitor size={15} className="text-primary" aria-hidden="true" /> : <MapPin size={15} className="text-primary" aria-hidden="true" />}
              {event.isOnline ? "Online" : event.location}
            </span>
          </div>
          <p className="mt-3 text-xs text-muted">Hosted by {event.hostGuild.name}</p>
          <p className="mt-3 text-xs font-semibold text-primary">
            {event.reservedSlots} of {event.capacity ?? "unlimited"} spots reserved · pending applications count
          </p>
        </div>
      </article>
    </Link>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Monitor, Users } from "lucide-react";
import EventApplicationPreviewButton from "@/components/EventApplicationPreviewButton";
import PageHeading from "@/components/PageHeading";
import { SAMPLE_EVENTS, SAMPLE_GUILDS } from "@/config/sample-content";

export function generateStaticParams() {
  return SAMPLE_EVENTS.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = SAMPLE_EVENTS.find((item) => item.slug === slug);

  if (!event) notFound();

  const hostGuild = SAMPLE_GUILDS.find((guild) => guild.name === event.host);
  const reserved = event.accepted + event.pending;

  return (
    <div className="space-y-7">
      <Link href="/hackathons" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to events
      </Link>
      <PageHeading
        eyebrow={`${event.topic} · EVENT PREVIEW`}
        title={event.title}
        description={event.description}
      />

      <section className="grid gap-5 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:grid-cols-2 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CalendarDays size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-ink">When</h2>
              <p className="mt-1 text-sm text-muted">{event.date}</p>
              <p className="mt-1 text-xs text-muted">Applications close {event.registrationDeadline}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            {event.online ? (
              <Monitor size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            ) : (
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            )}
            <div>
              <h2 className="text-sm font-bold text-ink">{event.online ? "Online event" : "Location"}</h2>
              <p className="mt-1 text-sm text-muted">{event.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-ink">Capacity</h2>
              <p className="mt-1 text-sm text-muted">{reserved} of {event.capacity} spots reserved</p>
              <p className="mt-1 text-xs text-muted">{event.pending} pending applications count toward capacity.</p>
            </div>
          </div>
          <p className="border-t border-line pt-4 text-sm text-muted">
            Hosted by{" "}
            {hostGuild
              ? <Link href={`/guilds/${hostGuild.slug}`} className="font-semibold text-primary hover:text-white">{event.host}</Link>
              : <span className="font-semibold text-ink">{event.host}</span>}
          </p>
        </div>
        <EventApplicationPreviewButton
          accepted={event.accepted}
          pending={event.pending}
          capacity={event.capacity}
        />
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6" aria-labelledby="event-next-heading">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Organizer tools</p>
        <h2 id="event-next-heading" className="mt-1 font-display text-xl font-bold text-ink">Review applicants and share results</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          This sample organizer screen is not permission-protected. It is not connected to an account or event.
        </p>
        <Link href={`/hackathons/${event.slug}/manage`} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Open organizer preview <Users size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

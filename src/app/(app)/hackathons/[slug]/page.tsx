import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Monitor, Users } from "lucide-react";
import EventApplyButton from "@/components/EventApplyButton";
import PageHeading from "@/components/PageHeading";
import { getPrisma } from "@/server/db";
import { canManageGuild, requireUserId } from "@/server/permissions";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const userId = await requireUserId();
  const event = await getPrisma().hackathonEvent.findFirst({
    where: {
      slug,
      OR: [
        { hostGuild: { is: { visibility: "PUBLIC" } } },
        { hostGuild: { is: { memberships: { some: { userId } } } } },
      ],
    },
    include: {
      hostGuild: { select: { name: true, slug: true, visibility: true, memberships: { where: { userId }, select: { role: true } } } },
      registrations: { where: { userId }, select: { status: true } },
      results: { where: { publishedAt: { not: null } }, orderBy: { placement: "asc" } },
    },
  });
  if (!event) notFound();
  const canManage = canManageGuild(event.hostGuild.memberships[0]?.role);

  return (
    <div className="space-y-7">
      <Link href="/hackathons" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to events
      </Link>
      <PageHeading
        eyebrow={`${event.topic} · ${event.status}`}
        title={event.title}
        description={event.description}
      />

      <section className="grid gap-5 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:grid-cols-2 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CalendarDays size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-ink">When</h2>
              <p className="mt-1 text-sm text-muted">{event.startsAt.toLocaleString("en-PH", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Manila" })} · Asia/Manila</p>
              <p className="mt-1 text-xs text-muted">Applications close {event.registrationDeadline.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" })}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            {event.isOnline ? (
              <Monitor size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            ) : (
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            )}
            <div>
              <h2 className="text-sm font-bold text-ink">{event.isOnline ? "Online event" : "Location"}</h2>
              <p className="mt-1 text-sm text-muted">{event.isOnline ? "Online" : event.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-ink">Capacity</h2>
              <p className="mt-1 text-sm text-muted">{event.reservedSlots} of {event.capacity ?? "unlimited"} spots reserved</p>
              <p className="mt-1 text-xs text-muted">Pending applications count toward capacity.</p>
            </div>
          </div>
          <p className="border-t border-line pt-4 text-sm text-muted">
            Hosted by{" "}
            <Link href={`/guilds/${event.hostGuild.slug}`} className="font-semibold text-primary hover:text-white">{event.hostGuild.name}</Link>
          </p>
        </div>
        <EventApplyButton
          eventId={event.id}
          status={event.status}
          registrationDeadline={event.registrationDeadline}
          capacity={event.capacity}
          reservedSlots={event.reservedSlots}
          existingStatus={event.registrations[0]?.status}
        />
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6" aria-labelledby="event-next-heading">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Organizer tools</p>
        <h2 id="event-next-heading" className="mt-1 font-display text-xl font-bold text-ink">Review applicants and share results</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Applications and results are visible only to this Guild&apos;s managers and assigned event organizers.</p>
        {canManage && <Link href={`/hackathons/${event.slug}/manage`} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Manage event <Users size={16} aria-hidden="true" /></Link>}
      </section>
      {event.results.length > 0 && (
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-xl font-bold text-ink">Published results</h2>
          <ol className="mt-3 space-y-2">
            {event.results.map((result) => <li key={result.id} className="rounded-xl bg-bg p-4"><p className="font-semibold text-ink">{result.placement ? `${result.placement}. ` : ""}{result.projectName}</p><p className="mt-1 text-sm text-muted">{result.summary}</p></li>)}
          </ol>
        </section>
      )}
    </div>
  );
}

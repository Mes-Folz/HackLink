import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, CircleX } from "lucide-react";
import EventOrganizerForm from "@/components/EventOrganizerForm";
import EventResultForm from "@/components/EventResultForm";
import PageHeading from "@/components/PageHeading";
import { reviewEventRegistration } from "@/server/event-actions";
import { getPrisma } from "@/server/db";
import { canManageGuild, requireUserId } from "@/server/permissions";
import { displayName, initialsForName } from "@/types/community";
import Avatar from "@/components/Avatar";

export default async function ManageEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const userId = await requireUserId();
  const event = await getPrisma().hackathonEvent.findUnique({
    where: { slug },
    include: {
      hostGuild: { select: { id: true, name: true, memberships: { where: { userId }, select: { role: true } } } },
      organizers: { where: { userId }, select: { id: true } },
      registrations: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { id: true, displayName: true, username: true, focus: true, adultAttestedAt: true } } },
      },
      results: { orderBy: { placement: "asc" } },
    },
  });
  if (!event) notFound();
  const isGuildManager = canManageGuild(event.hostGuild.memberships[0]?.role);
  if (!isGuildManager && event.organizers.length === 0) notFound();

  const acceptedCount = event.registrations.filter((registration) => registration.status === "ACCEPTED").length;
  const pendingCount = event.registrations.filter((registration) => registration.status === "PENDING").length;

  return (
    <div className="space-y-6">
      <Link href={`/hackathons/${event.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to event
      </Link>
      <PageHeading eyebrow="ORGANIZER · PRIVATE TO EVENT STAFF" title={event.title} description="Review applications, manage organizer access, and publish event results." />

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="applications-heading">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Organizer dashboard</p>
            <h2 id="applications-heading" className="mt-1 font-display text-xl font-bold text-ink">Review applications</h2>
          </div>
          <span className="rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-muted">{event.status.toLowerCase()}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-bg p-3"><p className="text-lg font-bold text-ink">{acceptedCount}</p><p className="text-[11px] leading-4 text-muted">Accepted</p></div>
          <div className="rounded-xl bg-bg p-3"><p className="text-lg font-bold text-ink">{pendingCount}</p><p className="text-[11px] leading-4 text-muted">Pending</p></div>
          <div className="rounded-xl bg-bg p-3"><p className="text-lg font-bold text-ink">{event.reservedSlots}/{event.capacity ?? "∞"}</p><p className="text-[11px] leading-4 text-muted">Reserved</p></div>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">Pending applications count toward capacity. Approving keeps a spot reserved; rejecting frees one.</p>
        {event.registrations.length === 0
          ? <p className="mt-4 rounded-xl border border-dashed border-line p-4 text-sm text-muted">No applications yet.</p>
          : <ul className="mt-4 divide-y divide-line">
            {event.registrations.map((registration) => (
              <li key={registration.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar initials={initialsForName(displayName(registration.user))} tone="violet" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{registration.user.adultAttestedAt ? displayName(registration.user) : "Account pending age confirmation"}</p>
                    <p className="text-xs text-muted">{registration.user.adultAttestedAt ? registration.user.focus || "HackLink member" : "Member details are hidden until age confirmation."}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold capitalize text-muted">{registration.status.toLowerCase()}</span>
                  {registration.status === "PENDING" && (
                    <>
                      {registration.user.adultAttestedAt && <form action={reviewEventRegistration.bind(null, event.id, registration.id, "ACCEPTED")}>
                        <button type="submit" aria-label={`Approve ${displayName(registration.user)}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line px-3 text-xs font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Check size={15} aria-hidden="true" /> Approve</button>
                      </form>}
                      <form action={reviewEventRegistration.bind(null, event.id, registration.id, "REJECTED")}>
                        <button type="submit" aria-label={`Reject ${displayName(registration.user)}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line px-3 text-xs font-bold text-muted transition-colors hover:border-red-900 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><CircleX size={15} aria-hidden="true" /> Reject</button>
                      </form>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>}
      </section>

      {isGuildManager && (
        <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">EVENT STAFF</p>
          <h2 className="mt-1 font-display text-xl font-bold text-ink">Assign an event organizer</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Assigned organizers can review applications and publish results for this event only.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {event.organizers.map((organizer) => <span key={organizer.id} className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-muted">Event staff</span>)}
          </div>
          <div className="mt-4"><EventOrganizerForm eventId={event.id} /></div>
        </section>
      )}

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="results-heading">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">RESULTS</p>
        <h2 id="results-heading" className="mt-1 font-display text-xl font-bold text-ink">Share what the teams made</h2>
        {event.results.length > 0 && (
          <ol className="mt-4 space-y-3">
            {event.results.map((result) => <li key={result.id} className="rounded-xl bg-bg p-3"><p className="font-semibold text-ink">{result.placement ? `${result.placement}. ` : ""}{result.projectName}</p><p className="mt-1 text-sm text-muted">{result.summary}</p></li>)}
          </ol>
        )}
        <EventResultForm eventId={event.id} />
      </section>
    </div>
  );
}

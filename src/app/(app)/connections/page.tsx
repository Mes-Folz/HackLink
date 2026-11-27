import Link from "next/link";
import { ArrowRight, Check, UserRoundPlus, Users, X } from "lucide-react";
import Avatar from "@/components/Avatar";
import PageHeading from "@/components/PageHeading";
import { removeConnection, respondToConnection, sendConnectionRequest } from "@/server/social-actions";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";
import { displayName, initialsForName } from "@/types/community";

export default async function ConnectionsPage() {
  const userId = await requireUserId();
  const db = getPrisma();
  const [incoming, connections, suggestions] = await Promise.all([
    db.connection.findMany({
      where: { recipientId: userId, status: "PENDING", requester: { is: { adultAttestedAt: { not: null } } } },
      orderBy: { createdAt: "desc" },
      include: { requester: { select: { id: true, displayName: true, username: true, focus: true } } },
    }),
    db.connection.findMany({
      where: {
        status: "ACCEPTED",
        OR: [
          { requesterId: userId, recipient: { is: { adultAttestedAt: { not: null } } } },
          { recipientId: userId, requester: { is: { adultAttestedAt: { not: null } } } },
        ],
      },
      orderBy: { updatedAt: "desc" },
      include: {
        requester: { select: { id: true, displayName: true, username: true, focus: true } },
        recipient: { select: { id: true, displayName: true, username: true, focus: true } },
      },
    }),
    db.user.findMany({
      where: {
        id: { not: userId },
        username: { not: null },
        adultAttestedAt: { not: null },
        sentConnections: { none: { recipientId: userId } },
        receivedConnections: { none: { requesterId: userId } },
      },
      select: { id: true, displayName: true, username: true, focus: true, area: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
  ]);
  const connectedPeople = connections.map((connection) => connection.requesterId === userId ? connection.recipient : connection.requester);

  return (
    <div className="space-y-7">
      <PageHeading eyebrow="CONNECTIONS · BUILD YOUR CIRCLE" title="Good people make good work possible." description="Keep up with the makers you meet, and start a conversation through shared projects." />
      {incoming.length > 0 && (
        <section className="rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-surface text-primary"><Users size={20} aria-hidden="true" /></span>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-ink">Connection requests</h2>
              <ul className="mt-4 space-y-3">
                {incoming.map(({ id, requester }) => (
                  <li key={id} className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
                    <Avatar initials={initialsForName(displayName(requester))} tone="violet" />
                    <div className="min-w-0 flex-1">
                      <Link href={`/people/${requester.username}`} className="text-sm font-bold text-ink hover:text-primary">{displayName(requester)}</Link>
                      <p className="text-xs text-muted">{requester.focus || "HackLink member"}</p>
                    </div>
                    <div className="flex gap-2">
                      <form action={respondToConnection.bind(null, id, "ACCEPTED")}><button type="submit" className="inline-flex min-h-11 items-center gap-1 rounded-lg bg-primary-dark px-3 text-xs font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Check size={14} aria-hidden="true" /> Accept</button></form>
                      <form action={respondToConnection.bind(null, id, "REJECTED")}><button type="submit" className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-line px-3 text-xs font-bold text-muted hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={14} aria-hidden="true" /> Decline</button></form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
      <section aria-labelledby="connections-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">YOUR NETWORK</p><h2 id="connections-heading" className="mt-1 font-display text-xl font-bold text-ink">Connections · {connectedPeople.length}</h2></div>
          <Link href="/explore" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:text-white"><ArrowRight size={15} aria-hidden="true" /> Explore people</Link>
        </div>
        {connectedPeople.length > 0 ? (
          <ul className="space-y-3">
            {connections.map((connection) => {
              const person = connection.requesterId === userId ? connection.recipient : connection.requester;
              return <li key={connection.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:p-5">
                <Avatar initials={initialsForName(displayName(person))} tone="blue" />
                <div className="min-w-0 flex-1"><Link href={`/people/${person.username}`} className="font-bold text-ink hover:text-primary">{displayName(person)}</Link><p className="mt-1 text-sm text-muted">{person.focus || "HackLink member"}</p></div>
                <form action={removeConnection.bind(null, connection.id)}><button type="submit" className="min-h-11 rounded-lg border border-line px-3 text-xs font-bold text-muted hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Remove connection</button></form>
              </li>;
            })}
          </ul>
        ) : <p className="rounded-2xl border border-dashed border-line bg-surface p-5 text-sm text-muted">You have no connections yet. Send a request to someone you know.</p>}
      </section>
      <section aria-labelledby="people-heading">
        <div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">PEOPLE YOU MAY KNOW</p><h2 id="people-heading" className="mt-1 font-display text-xl font-bold text-ink">Meet local makers</h2></div>
        {suggestions.length > 0 ? <ul className="space-y-3">{suggestions.map((person) => (
          <li key={person.id} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
            <Avatar initials={initialsForName(displayName(person))} tone="cyan" />
            <div className="min-w-0 flex-1"><Link href={`/people/${person.username}`} className="font-bold text-ink hover:text-primary">{displayName(person)}</Link><p className="mt-1 text-sm text-muted">{person.focus || "HackLink member"}{person.area ? ` · ${person.area}` : ""}</p></div>
            <form action={sendConnectionRequest.bind(null, person.id)}><button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line px-4 text-xs font-bold text-ink hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><UserRoundPlus size={15} aria-hidden="true" /> Connect</button></form>
          </li>
        ))}</ul> : <p className="rounded-2xl border border-dashed border-line bg-surface p-5 text-sm text-muted">No more members to suggest right now.</p>}
      </section>
    </div>
  );
}

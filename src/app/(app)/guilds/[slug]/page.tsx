import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LockKeyhole, Users } from "lucide-react";
import GuildInviteForm from "@/components/GuildInviteForm";
import PageHeading from "@/components/PageHeading";
import { toggleGuildMembership, transferGuildOwnership } from "@/server/guild-actions";
import { getPrisma } from "@/server/db";
import { canManageGuild, requireUserId } from "@/server/permissions";
import { displayName, initialsForName } from "@/types/community";
import Avatar from "@/components/Avatar";

export default async function GuildDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const userId = await requireUserId();
  const guild = await getPrisma().guild.findFirst({
    where: {
      slug,
      OR: [{ visibility: "PUBLIC" }, { memberships: { some: { userId } } }],
    },
    include: {
      memberships: {
        where: { user: { is: { adultAttestedAt: { not: null } } } },
        orderBy: { createdAt: "asc" },
        include: { user: { select: { id: true, displayName: true, username: true, focus: true } } },
      },
      events: {
        where: { status: "PUBLISHED" },
        orderBy: { startsAt: "asc" },
        select: { id: true, slug: true, title: true, startsAt: true },
      },
    },
  });
  if (!guild) notFound();

  const membership = guild.memberships.find((item) => item.userId === userId);
  const canManage = canManageGuild(membership?.role);
  return (
    <div className="space-y-7">
      <Link href="/guilds" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Guilds
      </Link>
      <section className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="h-28 bg-gradient-to-r from-primary-dark/70 via-primary/15 to-night" aria-hidden="true" />
        <div className="-mt-7 flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              {guild.visibility === "PRIVATE" ? <LockKeyhole size={13} aria-hidden="true" /> : null}
              {guild.visibility} GUILD
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">{guild.name}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">{guild.category}</p>
          </div>
          {membership?.role === "OWNER"
            ? <span className="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-semibold text-muted">Guild owner</span>
            : <form action={toggleGuildMembership.bind(null, guild.id)}>
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {membership ? "Leave Guild" : "Join Guild"}
              </button>
            </form>}
        </div>
        <div className="grid gap-4 border-t border-line p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-7">
          <p className="max-w-2xl whitespace-pre-line text-sm leading-6 text-ink">{guild.description}</p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted"><Users size={16} className="text-primary" aria-hidden="true" />{guild.memberships.length} members</p>
        </div>
      </section>

      {canManage && (
        <section className="space-y-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">MANAGE GUILD</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink">Invite members and manage ownership</h2>
          </div>
          <GuildInviteForm guildId={guild.id} />
          {membership?.role === "OWNER" && guild.memberships.length > 1 && (
            <div className="space-y-2 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">Transfer ownership</p>
              <div className="flex flex-wrap gap-2">
                {guild.memberships.filter((item) => item.userId !== userId).map((item) => (
                  <form key={item.id} action={transferGuildOwnership.bind(null, guild.id, item.userId)}>
                    <button type="submit" className="min-h-11 rounded-lg border border-line px-3 text-xs font-semibold text-muted hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      Make {displayName(item.user)} owner
                    </button>
                  </form>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section aria-labelledby="guild-members">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">COMMUNITY</p>
          <h2 id="guild-members" className="mt-1 font-display text-xl font-bold text-ink">Members</h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {guild.memberships.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
              <Avatar initials={initialsForName(displayName(item.user))} tone="violet" />
              <div className="min-w-0">
                {item.user.username
                  ? <Link href={`/people/${item.user.username}`} className="text-sm font-bold text-ink hover:text-primary">{displayName(item.user)}</Link>
                  : <p className="text-sm font-bold text-ink">{displayName(item.user)}</p>}
                <p className="text-xs text-muted">{item.role.toLowerCase()} · {item.user.focus || "HackLink member"}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {guild.events.length > 0 && (
        <section aria-labelledby="guild-events-heading">
          <h2 id="guild-events-heading" className="font-display text-xl font-bold text-ink">Hosted events</h2>
          <ul className="mt-3 space-y-2">
            {guild.events.map((event) => (
              <li key={event.id} className="rounded-xl border border-line bg-surface p-4">
                <Link href={`/hackathons/${event.slug}`} className="font-semibold text-ink hover:text-primary">{event.title}</Link>
                <p className="mt-1 text-xs text-muted">{event.startsAt.toLocaleString("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" })}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

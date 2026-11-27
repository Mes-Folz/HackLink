import Link from "next/link";
import { ArrowRight, Bell, CheckCheck } from "lucide-react";
import Avatar from "@/components/Avatar";
import PageHeading from "@/components/PageHeading";
import { acceptGuildInvitation } from "@/server/guild-actions";
import { markAllNotificationsRead, markNotificationRead } from "@/server/social-actions";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";
import { displayName, initialsForName } from "@/types/community";

export default async function NotificationsPage() {
  const userId = await requireUserId();
  const notifications = await getPrisma().notification.findMany({
    where: {
      recipientId: userId,
      OR: [{ actorId: null }, { actor: { is: { adultAttestedAt: { not: null } } } }],
    },
    include: { actor: { select: { displayName: true, username: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  const unread = notifications.filter((notification) => !notification.readAt).length;

  return (
    <div className="space-y-7">
      <PageHeading eyebrow="NOTIFICATIONS · STAY IN THE LOOP" title="Good things happen when you show up." description="Connection requests, Guild invitations, and event updates all land here." />
      <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm" aria-labelledby="activity-heading">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">RECENT ACTIVITY</p><h2 id="activity-heading" className="mt-1 font-display text-lg font-bold text-ink">{unread} unread</h2></div>
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Bell size={18} aria-hidden="true" /></span>
          {unread > 0 && <form action={markAllNotificationsRead}><button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 text-xs font-bold text-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><CheckCheck size={15} aria-hidden="true" /> Mark all read</button></form>}
        </div>
        {notifications.length > 0 ? <ul className="divide-y divide-line">
          {notifications.map((notification) => {
            const title = notification.title;
            const actor = notification.actor ? displayName(notification.actor) : "HackLink";
            return <li key={notification.id} className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:py-5 ${notification.readAt ? "" : "bg-primary/[0.03]"}`}>
              <Avatar initials={initialsForName(actor)} tone="violet" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-5 text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{notification.message}</p>
                <time dateTime={notification.createdAt.toISOString()} className="mt-2 block text-xs font-semibold text-primary">
                  {notification.createdAt.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" })}
                </time>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {notification.type === "GUILD_INVITATION" && notification.targetId && !notification.readAt && (
                  <form action={acceptGuildInvitation.bind(null, notification.targetId)}>
                    <button type="submit" className="inline-flex min-h-11 items-center rounded-lg bg-primary-dark px-3 text-xs font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Accept invite</button>
                  </form>
                )}
                {notification.href && <Link href={notification.href} className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-line px-3 text-xs font-semibold text-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Open <ArrowRight size={13} aria-hidden="true" /></Link>}
                {!notification.readAt && <form action={markNotificationRead.bind(null, notification.id)}><button type="submit" aria-label={`Mark ${title} as read`} className="min-h-11 rounded-lg border border-line px-3 text-xs font-semibold text-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Mark read</button></form>}
              </div>
            </li>;
          })}
        </ul> : <div className="px-5 py-10 text-center">
          <p className="font-display text-lg font-bold text-ink">You&apos;re all caught up.</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Updates will appear here when someone connects, invites you to a Guild, or reviews an event application.</p>
          <Link href="/explore" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Explore HackLink <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>}
      </section>
    </div>
  );
}

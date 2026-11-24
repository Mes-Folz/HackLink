import Link from "next/link";
import { ArrowRight, Bell, CalendarDays, UserRound, Users } from "lucide-react";
import Avatar from "@/components/Avatar";
import PageHeading from "@/components/PageHeading";

const SAMPLE_ACTIVITY = [
  {
    initials: "MS",
    tone: "violet" as const,
    Icon: Users,
    title: "Mika Santos invited you to Build Iloilo",
    detail: "A sample Guild invitation · Build Iloilo",
    time: "2 hours ago",
  },
  {
    initials: "AC",
    tone: "blue" as const,
    Icon: CalendarDays,
    title: "A new hackathon is on the calendar",
    detail: "Sample event · Western Visayas Build Weekend",
    time: "Yesterday",
  },
  {
    initials: "NV",
    tone: "cyan" as const,
    Icon: UserRound,
    title: "Nina Villanueva connected with your work",
    detail: "Sample community activity · Explore",
    time: "2 days ago",
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-7">
      <PageHeading
        eyebrow="NOTIFICATIONS · STAY IN THE LOOP"
        title="Good things happen when you show up."
        description="Guild invitations, connections, and event updates will all have a home here."
      />

      <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm" aria-labelledby="activity-heading">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">RECENT ACTIVITY</p>
            <h2 id="activity-heading" className="mt-1 font-display text-lg font-bold text-ink">A few things to explore</h2>
          </div>
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Bell size={18} aria-hidden="true" />
          </span>
        </div>
        <ul className="divide-y divide-line">
          {SAMPLE_ACTIVITY.map(({ initials, tone, Icon, title, detail, time }) => (
            <li key={title} className="flex gap-3 px-5 py-4 sm:gap-4 sm:py-5">
              <Avatar initials={initials} tone={tone} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-5 text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
                <p className="mt-2 text-xs font-semibold text-primary">{time}</p>
              </div>
              <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-xl bg-bg text-muted">
                <Icon size={16} aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-2xl border border-dashed border-line bg-surface px-5 py-6 text-center">
        <p className="font-display text-lg font-bold text-ink">Your real updates will live here.</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          This preview is illustrative. Notifications will appear when connections, Guilds, and events are connected.
        </p>
        <Link href="/explore" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          Explore HackLink <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

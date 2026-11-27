import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import EventCreateForm from "@/components/EventCreateForm";
import PageHeading from "@/components/PageHeading";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";

export default async function CreateHackathonPage() {
  const userId = await requireUserId();
  const guilds = await getPrisma().guild.findMany({
    where: { memberships: { some: { userId, role: { in: ["OWNER", "ADMIN"] } } } },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  return (
    <div className="space-y-6">
      <Link href="/hackathons" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to events
      </Link>
      <PageHeading
        eyebrow="HACKATHONS · CREATE EVENT"
        title="Give a good idea a place to start."
        description="Set a clear challenge, a fair capacity, and enough detail for people to decide if it fits."
      />
      <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
        <CalendarDays size={19} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-6 text-muted">
          Pending applications count toward capacity. Only the host Guild&apos;s admins or assigned event organizers can manage this event.
        </p>
      </div>
      <EventCreateForm guilds={guilds} />
    </div>
  );
}

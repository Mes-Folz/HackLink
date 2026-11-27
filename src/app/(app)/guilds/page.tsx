import Link from "next/link";
import { LockKeyhole, Plus, Users } from "lucide-react";
import GuildCard from "@/components/GuildCard";
import PageHeading from "@/components/PageHeading";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";

export default async function GuildsPage() {
  const userId = await requireUserId();
  const guilds = await getPrisma().guild.findMany({
    where: { OR: [{ visibility: "PUBLIC" }, { memberships: { some: { userId } } }] },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { memberships: true } } },
  });

  return (
    <div className="space-y-7">
      <PageHeading eyebrow="GUILDS · BUILD IN GOOD COMPANY" title="Find a crew that helps you grow." description="Guilds bring people together around shared interests, projects, and the kind of learning that happens by doing." />
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="text-sm leading-6 text-muted">Have a group idea? Start with a clear purpose and welcoming membership.</p>
        <Link href="/guilds/create" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Plus size={16} aria-hidden="true" /> Create a Guild
        </Link>
      </div>
      <section className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-surface text-primary"><Users size={20} aria-hidden="true" /></span>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">A Guild is more than a group chat.</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-muted">Find a place to share work, trade feedback, and make progress with people who get it.</p>
          </div>
        </div>
        <Link href="/explore" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Explore people
        </Link>
      </section>
      <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-xs leading-5 text-muted">
        <LockKeyhole size={16} className="shrink-0 text-primary" aria-hidden="true" />
        Private Guilds are only listed to their members; their details are never exposed to non-members.
      </div>
      <section aria-labelledby="guild-list-heading">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">GUILDS</p>
          <h2 id="guild-list-heading" className="mt-1 font-display text-xl font-bold text-ink">Find your people</h2>
        </div>
        {guilds.length > 0
          ? <div className="grid gap-4 sm:grid-cols-2">{guilds.map((guild) => <GuildCard key={guild.id} guild={guild} />)}</div>
          : <p className="rounded-2xl border border-dashed border-line bg-surface p-6 text-sm text-muted">No Guilds yet. Start one for your community.</p>}
      </section>
    </div>
  );
}

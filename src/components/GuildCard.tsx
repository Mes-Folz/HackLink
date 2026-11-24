import Link from "next/link";
import { Users } from "lucide-react";
import Avatar from "@/components/Avatar";
import type { SampleGuild } from "@/config/sample-content";

export default function GuildCard({ guild }: { guild: SampleGuild }) {
  return (
    <Link
      href={`/guilds/${guild.slug}`}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <article className="rounded-2xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-primary/40">
        <div className="flex items-start justify-between gap-3">
          <Avatar initials={guild.initials} tone={guild.tone} size="lg" />
          <span className="rounded-full border border-emerald-900 bg-emerald-950/70 px-3 py-1 text-xs font-semibold text-emerald-200">
            Public Guild
          </span>
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-primary">{guild.category}</p>
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink">{guild.name}</h2>
        <p className="mt-2 min-h-[3rem] text-sm leading-6 text-muted">{guild.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Users size={15} aria-hidden="true" />
            {guild.members} sample members
          </span>
          <span className="text-xs font-semibold text-primary">View Guild preview →</span>
        </div>
      </article>
    </Link>
  );
}

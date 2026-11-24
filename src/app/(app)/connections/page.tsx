import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import Avatar from "@/components/Avatar";
import ConnectionPreviewButton from "@/components/ConnectionPreviewButton";
import PageHeading from "@/components/PageHeading";
import { SAMPLE_MEMBERS } from "@/config/sample-content";

export default function ConnectionsPage() {
  return (
    <div className="space-y-7">
      <PageHeading
        eyebrow="CONNECTIONS · BUILD YOUR CIRCLE"
        title="Good people make good work possible."
        description="Keep up with the makers you meet, and start a conversation through shared projects."
      />

      <section className="rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-surface text-primary">
            <Users size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Connection requests · preview</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Accepting or sending requests is not connected. These sample profiles and actions are not saved.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="people-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">PEOPLE YOU MAY KNOW</p>
            <h2 id="people-heading" className="mt-1 font-display text-xl font-bold text-ink">Meet local makers</h2>
          </div>
          <Link href="/explore" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:text-white">
            Explore everyone <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <ul className="space-y-3">
          {SAMPLE_MEMBERS.map((member) => (
            <li key={member.name} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
              <Avatar initials={member.initials} tone={member.tone} size="lg" />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-ink">{member.name}</h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${member.name}'s interests`}>
                  {member.interests.map((interest) => (
                    <li key={interest} className="rounded-full bg-bg px-2.5 py-1 text-[11px] font-semibold text-muted">
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
              <ConnectionPreviewButton name={member.name} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import GuildCreatePreviewForm from "@/components/GuildCreatePreviewForm";
import PageHeading from "@/components/PageHeading";

export default function CreateGuildPage() {
  return (
    <div className="space-y-6">
      <Link href="/guilds" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Guilds
      </Link>
      <PageHeading
        eyebrow="GUILDS · CREATION PREVIEW"
        title="Make room for good work."
        description="Shape a welcoming place for people to learn, share progress, and build together."
      />
      <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
        <Users size={19} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-6 text-muted">
          This form is a visual preview only. Guilds, memberships, and privacy settings are not saved or enforced.
        </p>
      </div>
      <GuildCreatePreviewForm />
    </div>
  );
}

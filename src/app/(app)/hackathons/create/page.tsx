import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import EventCreatePreviewForm from "@/components/EventCreatePreviewForm";
import PageHeading from "@/components/PageHeading";

export default function CreateHackathonPage() {
  return (
    <div className="space-y-6">
      <Link href="/hackathons" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to events
      </Link>
      <PageHeading
        eyebrow="HACKATHONS · EVENT CREATION PREVIEW"
        title="Give a good idea a place to start."
        description="Set a clear challenge, a fair capacity, and enough detail for people to decide if it fits."
      />
      <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
        <CalendarDays size={19} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-6 text-muted">
          Pending applications count toward capacity. This preview does not create events or enforce organizer permissions.
        </p>
      </div>
      <EventCreatePreviewForm />
    </div>
  );
}

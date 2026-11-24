import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EventReviewPreview from "@/components/EventReviewPreview";
import PageHeading from "@/components/PageHeading";
import { SAMPLE_EVENTS } from "@/config/sample-content";

export function generateStaticParams() {
  return SAMPLE_EVENTS.map((event) => ({ slug: event.slug }));
}

export default async function ManageEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = SAMPLE_EVENTS.find((item) => item.slug === slug);

  if (!event) notFound();

  return (
    <div className="space-y-6">
      <Link href={`/hackathons/${event.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to event
      </Link>
      <PageHeading
        eyebrow="ORGANIZER · PREVIEW ONLY"
        title={event.title}
        description="Review sample applications, see how capacity changes, and preview publishing results."
      />
      <EventReviewPreview event={event} />
    </div>
  );
}

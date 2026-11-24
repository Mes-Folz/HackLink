import Link from "next/link";
import WaitlistPreviewForm from "@/components/WaitlistPreviewForm";
import { ALLOWED_REGIONS } from "@/config/regions";

const regionLabel = ALLOWED_REGIONS.map((region) => region.name).join(" · ");

export default function WaitlistPage() {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">More places, later</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">Join the waitlist</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        HackLink is starting in {regionLabel}. Leave a preview-only note for when the community expands.
      </p>
      <WaitlistPreviewForm />
      <p className="mt-6 text-center text-sm text-muted">
        Back to{" "}
        <Link href="/register" className="font-bold text-primary hover:text-white">account preview</Link>
      </p>
    </>
  );
}

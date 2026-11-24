"use client";

import { useState } from "react";
import { Check, UserPlus } from "lucide-react";

export default function EventApplicationPreviewButton({
  accepted,
  pending,
  capacity,
}: {
  accepted: number;
  pending: number;
  capacity: number;
}) {
  const [applied, setApplied] = useState(false);
  const full = accepted + pending >= capacity;
  const reserved = accepted + pending + Number(applied);

  return (
    <div className="rounded-2xl border border-line bg-bg p-4">
      <p className="font-semibold text-ink">
        {reserved} of {capacity} spots reserved
      </p>
      <p className="mt-1 text-xs leading-5 text-muted">
        {pending + Number(applied)} pending applications count toward capacity.
      </p>
      <button
        type="button"
        disabled={full || applied}
        onClick={() => setApplied(true)}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:bg-night disabled:text-muted"
      >
        {applied ? <Check size={16} aria-hidden="true" /> : <UserPlus size={16} aria-hidden="true" />}
        {full ? "Capacity reached" : applied ? "Application added · preview" : "Apply to this event · preview"}
      </button>
      <p role="status" className="mt-3 text-xs leading-5 text-muted">
        {applied
          ? "Preview only: no application was sent or saved."
          : full
            ? "Pending applications already use the remaining capacity."
            : "Your sample application would be pending review. Nothing is submitted."}
      </p>
    </div>
  );
}

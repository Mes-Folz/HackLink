"use client";

import { useActionState } from "react";
import { Check, UserPlus } from "lucide-react";
import { applyToEvent } from "@/server/event-actions";
import type { EventRegistrationStatus } from "@/generated/prisma/client";
import { canApplyToEvent } from "@/server/community-validation";

export default function EventApplyButton({
  eventId,
  status,
  registrationDeadline,
  capacity,
  reservedSlots,
  existingStatus,
}: {
  eventId: string;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
  registrationDeadline: Date;
  capacity: number | null;
  reservedSlots: number;
  existingStatus?: EventRegistrationStatus;
}) {
  const [state, action, pending] = useActionState(applyToEvent.bind(null, eventId), {});
  const canApply = canApplyToEvent({ status, registrationDeadline, capacity, reservedSlots });

  if (existingStatus) {
    return (
      <div className="rounded-2xl border border-line bg-bg p-4">
        <p className="font-semibold text-ink">Application {existingStatus.toLowerCase()}</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          {existingStatus === "PENDING" ? "Your place is reserved while organizers review your application." : "Check notifications for the latest update."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-bg p-4">
      <p className="font-semibold text-ink">{reservedSlots} of {capacity ?? "unlimited"} spots reserved</p>
      <p className="mt-1 text-xs leading-5 text-muted">Pending applications count toward capacity.</p>
      <form action={action}>
        <button
          type="submit"
          disabled={!canApply || pending}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:bg-night disabled:text-muted"
        >
          {pending ? "Submitting…" : canApply ? "Apply to this event" : <><Check size={16} aria-hidden="true" /> Applications closed</>}
        </button>
      </form>
      {state.error && <p role="alert" className="mt-3 text-xs leading-5 text-red-300">{state.error}</p>}
      {state.success && <p role="status" className="mt-3 text-xs leading-5 text-emerald-300">{state.success}</p>}
    </div>
  );
}

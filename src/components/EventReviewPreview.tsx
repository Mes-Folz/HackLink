"use client";

import { useState } from "react";
import { Check, CircleX } from "lucide-react";
import Avatar from "@/components/Avatar";
import type { SampleEvent } from "@/config/sample-content";

type Application = {
  id: string;
  name: string;
  initials: string;
  tone: "blue" | "cyan" | "violet";
  focus: string;
  status: "pending" | "accepted" | "rejected";
};

const INITIAL_APPLICATIONS: Application[] = [
  { id: "mika", name: "Mika Santos", initials: "MS", tone: "violet", focus: "Product design", status: "pending" },
  { id: "andrei", name: "Andrei Cruz", initials: "AC", tone: "blue", focus: "Full-stack development", status: "pending" },
  { id: "nina", name: "Nina Villanueva", initials: "NV", tone: "cyan", focus: "Student builder", status: "accepted" },
  { id: "jules", name: "Jules Dela Cruz", initials: "JD", tone: "violet", focus: "Frontend development", status: "pending" },
];
const INITIAL_PENDING_IDS = new Set(
  INITIAL_APPLICATIONS.filter((application) => application.status === "pending").map((application) => application.id),
);

export default function EventReviewPreview({ event }: { event: SampleEvent }) {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [resultsPublished, setResultsPublished] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("Preview changes stay on this page and are not saved.");
  const acceptedFromPreview = applications.filter((application) => (
    INITIAL_PENDING_IDS.has(application.id) && application.status === "accepted"
  )).length;
  const rejectedFromPreview = applications.filter((application) => (
    INITIAL_PENDING_IDS.has(application.id) && application.status === "rejected"
  )).length;
  const pendingCount = event.pending - acceptedFromPreview - rejectedFromPreview;
  const acceptedCount = event.accepted + acceptedFromPreview;
  const reservedCount = acceptedCount + pendingCount;

  function review(id: string, status: "accepted" | "rejected") {
    setApplications((current) => current.map((application) => (
      application.id === id && application.status === "pending"
        ? { ...application, status }
        : application
    )));
    const application = applications.find((item) => item.id === id);
    if (application?.status === "pending") {
      setReviewMessage(
        status === "accepted"
          ? `${application.name} is accepted in this preview. The spot remains reserved.`
          : `${application.name} is rejected in this preview. One spot is now free.`,
      );
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="applications-heading">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Organizer preview</p>
            <h2 id="applications-heading" className="mt-1 font-display text-xl font-bold text-ink">Review applications</h2>
          </div>
          <span className="rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-muted">
            Sample controls · no authorization
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-bg p-3">
            <p className="text-lg font-bold text-ink">{acceptedCount}</p>
            <p className="text-[11px] leading-4 text-muted">Accepted</p>
          </div>
          <div className="rounded-xl bg-bg p-3">
            <p className="text-lg font-bold text-ink">{pendingCount}</p>
            <p className="text-[11px] leading-4 text-muted">Pending</p>
          </div>
          <div className="rounded-xl bg-bg p-3">
            <p className="text-lg font-bold text-ink">{reservedCount}/{event.capacity}</p>
            <p className="text-[11px] leading-4 text-muted">Reserved</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">
          Pending applications count toward capacity. Approving keeps a spot reserved; rejecting frees one.
        </p>

        <ul className="mt-4 divide-y divide-line">
          {applications.map((application) => (
            <li key={application.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar initials={application.initials} tone={application.tone} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{application.name}</p>
                  <p className="text-xs text-muted">{application.focus}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold capitalize text-muted">
                  {application.status}
                </span>
                {application.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => review(application.id, "accepted")}
                      aria-label={`Approve ${application.name} in the preview`}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line px-3 text-xs font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Check size={15} aria-hidden="true" /> Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => review(application.id, "rejected")}
                      aria-label={`Reject ${application.name} in the preview`}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line px-3 text-xs font-bold text-muted transition-colors hover:border-red-900 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <CircleX size={15} aria-hidden="true" /> Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p role="status" className="text-xs leading-5 text-muted">
          {reviewMessage}
        </p>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="results-heading">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Results</p>
          <h2 id="results-heading" className="mt-1 font-display text-xl font-bold text-ink">Share what the teams made</h2>
        </div>
        <ol className="mt-4 space-y-3">
          <li className="flex items-center gap-3 rounded-xl bg-bg p-3">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-sm font-bold text-primary">1</span>
            <span className="text-sm font-semibold text-ink">Barangay Buddy <span className="font-normal text-muted">· sample project</span></span>
          </li>
          <li className="flex items-center gap-3 rounded-xl bg-bg p-3">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-sm font-bold text-primary">2</span>
            <span className="text-sm font-semibold text-ink">TideTurn <span className="font-normal text-muted">· sample project</span></span>
          </li>
          <li className="flex items-center gap-3 rounded-xl bg-bg p-3">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-sm font-bold text-primary">3</span>
            <span className="text-sm font-semibold text-ink">Study Circle <span className="font-normal text-muted">· sample project</span></span>
          </li>
        </ol>
        <button
          type="button"
          aria-pressed={resultsPublished}
          onClick={() => setResultsPublished((current) => !current)}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {resultsPublished ? "Results preview published" : "Preview publishing results"}
        </button>
        <p role="status" className="mt-3 text-xs leading-5 text-muted">
          {resultsPublished
            ? "Preview only: sample results were not published or saved."
            : "Sample results are visible here; publishing is not connected."}
        </p>
      </section>
    </div>
  );
}

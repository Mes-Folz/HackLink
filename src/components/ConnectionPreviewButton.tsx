"use client";

import { useState } from "react";
import { Check, UserRoundPlus } from "lucide-react";

export default function ConnectionPreviewButton({ name }: { name: string }) {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-pressed={sent}
        onClick={() => setSent((current) => !current)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          sent ? "border border-primary/30 bg-primary/10 text-primary" : "bg-primary-dark text-white hover:bg-red-800"
        }`}
      >
        {sent ? <Check size={15} aria-hidden="true" /> : <UserRoundPlus size={15} aria-hidden="true" />}
        {sent ? "Request sent · preview" : "Connect · preview"}
      </button>
      <span className="sr-only" role="status">
        {sent ? `A sample connection request to ${name} is shown as sent. Nothing was saved.` : ""}
      </span>
    </div>
  );
}

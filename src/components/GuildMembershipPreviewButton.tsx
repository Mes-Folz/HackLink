"use client";

import { useState } from "react";
import { Check, Users } from "lucide-react";

export default function GuildMembershipPreviewButton() {
  const [joined, setJoined] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-pressed={joined}
        onClick={() => setJoined((current) => !current)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
          joined ? "border border-primary/30 bg-primary/10 text-primary" : "bg-primary-dark text-white hover:bg-red-800"
        }`}
      >
        {joined ? <Check size={16} aria-hidden="true" /> : <Users size={16} aria-hidden="true" />}
        {joined ? "Joined · preview" : "Join this Guild · preview"}
      </button>
      <p role="status" className="mt-2 text-xs leading-5 text-muted">
        {joined ? "Preview only: no membership was created or saved." : "This sample Guild is public. Joining is not connected yet."}
      </p>
    </div>
  );
}

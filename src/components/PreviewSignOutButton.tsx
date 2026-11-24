"use client";

import { useState } from "react";
import Link from "next/link";

export default function PreviewSignOutButton() {
  const [signedOut, setSignedOut] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setSignedOut(true)}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
      >
        Sign out (preview)
      </button>
      {signedOut && (
        <p role="status" className="mt-3 text-sm leading-5 text-muted">
          Preview only: there was no active session to end.{" "}
          <Link href="/login" className="font-bold text-primary hover:text-white">Open sign-in preview</Link>
        </p>
      )}
    </div>
  );
}

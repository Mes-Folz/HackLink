"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
    >
      Sign out
    </button>
  );
}

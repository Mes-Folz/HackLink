"use client";

import { useActionState } from "react";
import { inviteGuildMember } from "@/server/guild-actions";

export default function GuildInviteForm({ guildId }: { guildId: string }) {
  const [state, action, pending] = useActionState(inviteGuildMember.bind(null, guildId), {});
  return (
    <form action={action} className="flex flex-col gap-3 rounded-xl border border-line bg-bg p-4 sm:flex-row sm:items-end">
      <label htmlFor={`invite-${guildId}`} className="min-w-0 flex-1 text-sm font-semibold text-ink">
        Invite by account email
        <input
          id={`invite-${guildId}`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>
      <button type="submit" disabled={pending} className="min-h-11 rounded-lg bg-primary-dark px-4 text-sm font-bold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60">
        {pending ? "Inviting…" : "Send invite"}
      </button>
      {state.error && <p role="alert" className="text-xs text-red-300">{state.error}</p>}
      {state.success && <p role="status" className="text-xs text-emerald-300">{state.success}</p>}
    </form>
  );
}

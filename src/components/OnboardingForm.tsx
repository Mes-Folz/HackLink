"use client";

import { useActionState } from "react";
import { ALLOWED_REGIONS } from "@/config/regions";
import { saveOnboarding } from "@/server/profile-actions";

export default function OnboardingForm({ profile }: { profile?: { displayName: string | null; username: string | null; bio: string | null; focus: string | null; regionId: string | null; area: string | null } }) {
  const [state, action, pending] = useActionState(saveOnboarding, {});
  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <form className="mt-6 space-y-4" action={action}>
      <label htmlFor="display-name" className="block text-sm font-semibold text-ink">
        Display name
        <input id="display-name" name="displayName" autoComplete="name" required maxLength={60} defaultValue={profile?.displayName ?? ""} className={inputClassName} placeholder="How people know you" />
      </label>

      <label htmlFor="username" className="block text-sm font-semibold text-ink">
        Username
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          minLength={3}
          maxLength={24}
          defaultValue={profile?.username ?? ""}
          pattern="[A-Za-z0-9._\-]+"
          title="Use 3–24 letters, numbers, periods, underscores, or hyphens."
          className={inputClassName}
          placeholder="your-handle"
        />
      </label>

      <label htmlFor="bio" className="block text-sm font-semibold text-ink">
        About you <span className="font-normal text-muted">(optional)</span>
        <textarea id="bio" name="bio" maxLength={500} rows={3} defaultValue={profile?.bio ?? ""} className={`${inputClassName} py-3 leading-6`} placeholder="What are you building or learning?" />
      </label>

      <label htmlFor="region" className="block text-sm font-semibold text-ink">
        Where are you based?
        <select
          id="region"
          name="regionId"
          required
          defaultValue={profile?.regionId ?? ""}
          className={inputClassName}
        >
          <option value="" disabled>Select a region</option>
          {ALLOWED_REGIONS.map((region) => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
          <option value="outside-supported-regions">Outside the available regions · join waitlist</option>
        </select>
      </label>

      <label htmlFor="area" className="block text-sm font-semibold text-ink">
        Approximate area
        <input id="area" name="area" required maxLength={80} autoComplete="address-level2" defaultValue={profile?.area ?? ""} className={inputClassName} placeholder="City district or province town" aria-describedby="area-help" />
        <span id="area-help" className="mt-2 block text-xs font-normal leading-5 text-muted">
          Use a district or town only. Don&apos;t enter a street address or exact location.
        </span>
      </label>

      <label htmlFor="focus" className="block text-sm font-semibold text-ink">
        What best describes your focus? <span className="font-normal text-muted">(optional)</span>
        <select id="focus" name="focus" defaultValue={profile?.focus ?? ""} className={inputClassName}>
          <option value="" disabled>Choose a focus</option>
          <option>Developer</option>
          <option>Designer</option>
          <option>Student</option>
          <option>Organizer</option>
          <option>Other</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {pending ? "Saving profile…" : profile?.username ? "Save profile changes" : "Finish profile setup"}
      </button>

      {state.error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm leading-5 text-red-200">{state.error}</p>}
    </form>
  );
}

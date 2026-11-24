"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALLOWED_REGIONS } from "@/config/regions";

const OUTSIDE_REGION = "outside-supported-regions";

export default function OnboardingPreviewForm() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showProfileLink, setShowProfileLink] = useState(false);
  const [message, setMessage] = useState("");
  const hasAllowedRegion = ALLOWED_REGIONS.some((region) => region.id === selectedRegion);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedRegion === OUTSIDE_REGION) {
      router.push("/waitlist");
      return;
    }

    if (!hasAllowedRegion) {
      setMessage("Choose a supported region or select the waitlist option.");
      setShowProfileLink(false);
      return;
    }

    setMessage("Preview only: profile details were not saved.");
    setShowProfileLink(true);
  }

  const inputClassName = "mt-2 min-h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="display-name" className="block text-sm font-semibold text-ink">
        Display name
        <input id="display-name" name="displayName" autoComplete="name" required maxLength={60} className={inputClassName} placeholder="How people know you" />
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
          pattern="[A-Za-z0-9._\-]+"
          title="Use 3–24 letters, numbers, periods, underscores, or hyphens."
          className={inputClassName}
          placeholder="your-handle"
        />
      </label>

      <label htmlFor="region" className="block text-sm font-semibold text-ink">
        Where are you based?
        <select
          id="region"
          name="region"
          required
          value={selectedRegion}
          onChange={(event) => {
            setSelectedRegion(event.target.value);
            setMessage("");
            setShowProfileLink(false);
          }}
          className={inputClassName}
        >
          <option value="" disabled>Select a region</option>
          {ALLOWED_REGIONS.map((region) => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
          <option value={OUTSIDE_REGION}>Outside the available regions</option>
        </select>
      </label>

      {hasAllowedRegion && (
        <label htmlFor="area" className="block text-sm font-semibold text-ink">
          Approximate area
          <input
            id="area"
            name="area"
            required
            maxLength={80}
            autoComplete="address-level2"
            className={inputClassName}
            placeholder="City district or province town"
            aria-describedby="area-help"
          />
          <span id="area-help" className="mt-2 block text-xs font-normal leading-5 text-muted">
            Use a district or town only. Don&apos;t enter a street address or exact location.
          </span>
        </label>
      )}

      <label htmlFor="focus" className="block text-sm font-semibold text-ink">
        What best describes your focus? <span className="font-normal text-muted">(optional)</span>
        <select id="focus" name="focus" defaultValue="" className={inputClassName}>
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
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Preview profile setup
      </button>

      {message && (
        <div role="status" className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-5 text-ink">
          <p>{message}</p>
          {showProfileLink && (
            <Link href="/profile" className="mt-2 inline-flex min-h-10 items-center font-bold text-primary hover:text-white">
              View sample profile <span className="ml-1" aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      )}
    </form>
  );
}

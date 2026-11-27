import Link from "next/link";
import { getServerSession } from "next-auth";
import WaitlistForm from "@/components/WaitlistForm";
import { ALLOWED_REGIONS } from "@/config/regions";
import { authOptions } from "@/server/auth-options";
import SignOutButton from "@/components/SignOutButton";

const regionLabel = ALLOWED_REGIONS.map((region) => region.name).join(" · ");

export default async function WaitlistPage({ searchParams }: { searchParams: Promise<{ joined?: string }> }) {
  const [{ joined }, session] = await Promise.all([searchParams, getServerSession(authOptions)]);
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">More places, later</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">Join the waitlist</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        HackLink is starting in {regionLabel}. Join the waitlist and we&apos;ll keep your interest on file for future regions.
      </p>
      {joined === "1" ? (
        <div className="mt-6 space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-ink">
          <p>Your waitlist entry is saved. You&apos;ll need to wait until HackLink supports your area before using community features.</p>
          {session?.user?.id
            ? <div className="flex flex-wrap items-center gap-4"><Link href="/onboarding" className="font-bold text-primary hover:text-white">Update your area</Link><SignOutButton /></div>
            : <Link href="/register" className="font-bold text-primary hover:text-white">Create an account</Link>}
        </div>
      ) : <WaitlistForm />}
      <p className="mt-6 text-center text-sm text-muted">Only a city or region is requested; don&apos;t provide an exact address.</p>
    </>
  );
}

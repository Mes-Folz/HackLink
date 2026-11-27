import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/OnboardingForm";
import { authOptions } from "@/server/auth-options";
import { getPrisma } from "@/server/db";

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const user = await getPrisma().user.findUnique({
    where: { id: session.user.id },
    select: { displayName: true, username: true, bio: true, focus: true, regionId: true, area: true, waitlistedAt: true },
  });
  if (!user?.waitlistedAt && user?.username && user.regionId && user.area && edit !== "1") redirect("/home");
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Profile setup</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">{edit === "1" ? "Update your profile" : "Make it yours"}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        Tell the community what you build and choose an approximate area.
      </p>
      <OnboardingForm profile={user ?? undefined} />
      <p className="mt-6 text-center text-sm text-muted">
        Your profile and approximate area are saved to your account.
      </p>
    </>
  );
}

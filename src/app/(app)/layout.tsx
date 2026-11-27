import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Shell from "@/components/Shell";
import { ALLOWED_REGIONS } from "@/config/regions";
import { authOptions } from "@/server/auth-options";
import { canUseCommunityAccount } from "@/server/community-validation";
import { getPrisma } from "@/server/db";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const user = await getPrisma().user.findUnique({
    where: { id: session.user.id },
    select: {
      displayName: true,
      username: true,
      regionId: true,
      area: true,
      waitlistedAt: true,
      emailVerifiedAt: true,
      adultAttestedAt: true,
      notifications: { where: { readAt: null }, select: { id: true }, take: 100 },
    },
  });
  if (!user) redirect("/login");
  if (!user.emailVerifiedAt) redirect("/verify-email/resend?required=1");
  if (!user.adultAttestedAt) redirect("/age-confirmation");
  if (user.waitlistedAt) redirect("/waitlist?joined=1");
  if (!user.username || !canUseCommunityAccount(user, ALLOWED_REGIONS.map((region) => region.id))) redirect("/onboarding");

  return (
    <Shell
      userName={user.displayName || user.username}
      unreadCount={user.notifications.length}
    >
      {children}
    </Shell>
  );
}

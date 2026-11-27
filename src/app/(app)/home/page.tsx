import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Code2, MessageCircle, UsersRound } from "lucide-react";
import Feed from "@/components/Feed";
import { getPrisma } from "@/server/db";
import { requireUserId } from "@/server/permissions";

export default async function HomePage() {
  const viewerId = await requireUserId();
  const posts = await getPrisma().post.findMany({
    where: { author: { is: { adultAttestedAt: { not: null } } } },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      author: { select: { id: true, displayName: true, username: true, focus: true } },
      likes: { select: { userId: true } },
      comments: {
        where: { author: { is: { adultAttestedAt: { not: null } } } },
        orderBy: { createdAt: "asc" },
        take: 20,
        include: { author: { select: { displayName: true, username: true } } },
      },
    },
  });

  return (
    <div className="space-y-7">
      <section className="motion-enter relative isolate grid overflow-hidden rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-primary-dark/25 via-night to-bg px-5 py-6 shadow-[0_20px_60px_rgba(185,28,43,0.12)] sm:px-7 sm:py-8 lg:min-h-[300px] lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_50%,rgba(185,28,43,0.2),transparent_58%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1 bg-gradient-to-b from-primary via-primary-dark to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-xl">
          <span className="inline-flex min-h-7 items-center rounded-full border border-primary/25 bg-primary-dark/20 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
            Welcome to HackLink
          </span>
          <h1 className="mt-4 max-w-xl font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
            <span className="block">Your next idea</span>
            <span className="block">needs <span className="text-primary">good people.</span></span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            HackLink brings developers, designers, students, and organizers closer to the projects they want to build.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-dark px-5 text-sm font-bold text-white shadow-[0_0_24px_rgba(185,28,43,0.28)] transition-[background-color,transform,box-shadow] hover:scale-[1.02] hover:bg-red-800 hover:shadow-[0_0_30px_rgba(185,28,43,0.38)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              Join the community <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/hackathons"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <CalendarDays size={16} aria-hidden="true" /> Explore events
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-5 h-[220px] w-full max-w-[410px] sm:h-[270px] lg:mt-0 lg:h-[290px]" aria-hidden="true">
          <div className="motion-orbit absolute left-[7%] top-[8%] size-[86%] rounded-[50%] border border-primary/25 shadow-[0_0_36px_rgba(185,28,43,0.12)]" />
          <div className="absolute left-[13%] top-[15%] size-[74%] rotate-[-18deg] rounded-[50%] border border-white/10" />
          <div className="absolute left-[4%] top-[46%] h-px w-[92%] rotate-[-12deg] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

          <span className="absolute left-[4%] top-[16%] grid size-11 place-items-center rounded-xl border border-white/10 bg-night/90 text-primary shadow-xl sm:size-12">
            <MessageCircle size={20} />
          </span>
          <span className="absolute right-[5%] top-[12%] grid size-11 place-items-center rounded-xl border border-white/10 bg-night/90 text-white shadow-xl sm:size-12">
            <UsersRound size={20} />
          </span>
          <span className="absolute bottom-[13%] right-[4%] grid size-12 place-items-center rounded-xl border border-primary/30 bg-night/95 text-primary shadow-[0_0_24px_rgba(185,28,43,0.22)] sm:size-14">
            <Code2 size={24} />
          </span>

          <div className="absolute bottom-[16%] left-[12%] z-10 w-[75%] -rotate-3 rounded-xl border border-white/15 bg-[#111012] p-2.5 shadow-[0_24px_48px_rgba(0,0,0,0.6)] sm:bottom-[15%] sm:p-3">
            <div className="flex aspect-[1.62] flex-col overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#1b1013] via-[#0d0c0e] to-[#050506]">
              <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3">
                <span className="size-1.5 rounded-full bg-primary-dark" />
                <span className="size-1.5 rounded-full bg-white/20" />
                <span className="size-1.5 rounded-full bg-white/10" />
              </div>
              <div className="flex flex-1 items-center justify-center gap-3">
                <Image src="/hacklink-icon.png" alt="" width={54} height={54} className="size-12 rounded-xl object-cover sm:size-14" />
                <div>
                  <p className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                    Hack<span className="text-primary">Link</span>
                  </p>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">Build together</p>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-primary-dark/70 via-primary/30 to-transparent" />
            </div>
            <div className="mx-auto mt-1 h-1.5 w-[28%] rounded-b-md bg-white/15" />
          </div>
          <span className="absolute bottom-[9%] left-[23%] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
        </div>
      </section>

      <Feed posts={posts} viewerId={viewerId} />
    </div>
  );
}

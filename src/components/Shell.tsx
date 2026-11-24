"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Compass, Home, MapPin, Trophy, UserRound, Users } from "lucide-react";
import { ALLOWED_REGIONS } from "@/config/regions";
import CommunityRail from "@/components/CommunityRail";
import PreviewNotice from "@/components/PreviewNotice";

const NAV = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/explore", label: "Explore", Icon: Compass },
  { href: "/guilds", label: "Guilds", Icon: Users },
  { href: "/hackathons", label: "Hackathons", Icon: Trophy },
  { href: "/notifications", label: "Notifications", Icon: Bell },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const active = (href: string) => path === href || path.startsWith(`${href}/`);
  const regionLabel = ALLOWED_REGIONS.map((region) => region.name).join(" · ");

  return (
    <div className="min-h-dvh bg-bg">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-surface px-4 py-3 text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>

      <div className="mx-auto min-h-dvh max-w-[1480px] md:grid md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[244px_minmax(0,720px)_288px] xl:justify-center">
        <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-surface/90 px-4 py-7 md:flex xl:px-5">
          <Link href="/home" className="mb-9 flex items-center gap-3 px-2" aria-label="HackLink home">
            <Image
              src="/hacklink-icon.png"
              alt=""
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-2xl border border-primary/30 object-cover shadow-sm"
            />
            <span className="min-w-0">
              <span className="block font-display text-xl font-bold tracking-tight text-ink">HackLink</span>
              <span className="block text-[10px] font-semibold tracking-[0.16em] text-muted">CONNECT · COMPETE · COLLABORATE</span>
            </span>
          </Link>

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Your community</p>
          <nav aria-label="Main navigation" className="flex flex-col gap-1">
            {NAV.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={active(href) ? "page" : undefined}
                className={`group flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
                  active(href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-bg hover:text-ink"
                }`}
              >
                <Icon size={19} strokeWidth={active(href) ? 2.3 : 1.9} aria-hidden="true" />
                <span>{label}</span>
                {active(href) && <span className="ml-auto size-1.5 rounded-full bg-primary" aria-hidden="true" />}
              </Link>
            ))}
            <Link
              href="/profile"
              aria-current={active("/profile") ? "page" : undefined}
              className={`group flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
                active("/profile") ? "bg-primary/10 text-primary" : "text-muted hover:bg-bg hover:text-ink"
              }`}
            >
              <UserRound size={19} strokeWidth={active("/profile") ? 2.3 : 1.9} aria-hidden="true" />
              <span>My profile</span>
              {active("/profile") && <span className="ml-auto size-1.5 rounded-full bg-primary" aria-hidden="true" />}
            </Link>
          </nav>

          <div className="mt-auto rounded-2xl border border-primary/10 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <MapPin size={15} aria-hidden="true" />
              <span>{regionLabel} community</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              Meet local builders, find your crew, and make something worth sharing.
            </p>
            <Link
              href="/explore"
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-primary hover:text-white"
            >
              Explore the community <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line/80 bg-bg/95 px-4 py-3 backdrop-blur md:hidden">
            <Link href="/home" className="flex items-center gap-2.5" aria-label="HackLink home">
              <Image
                src="/hacklink-icon.png"
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-xl border border-primary/30 object-cover"
              />
              <span className="font-display text-lg font-bold tracking-tight text-ink">HackLink</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/explore"
                aria-label="Explore HackLink"
                className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Compass size={19} aria-hidden="true" />
              </Link>
              <Link
                href="/profile"
                aria-label="Profile preview"
                className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
              >
                <UserRound size={19} aria-hidden="true" />
              </Link>
            </div>
          </header>

          <main
            id="main-content"
            className="mx-auto w-full max-w-[760px] px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-5 sm:px-7 md:pb-10 md:pt-8 xl:max-w-none xl:px-8"
          >
            <PreviewNotice />
            {children}
          </main>
        </div>

        <CommunityRail />
      </div>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(16,24,40,0.06)] backdrop-blur md:hidden"
      >
        <div className="mx-auto flex max-w-lg">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={`flex min-h-16 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-0.5 text-[10px] font-semibold leading-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                active(href) ? "text-primary" : "text-muted hover:text-ink"
              }`}
            >
              <Icon size={20} strokeWidth={active(href) ? 2.3 : 1.8} aria-hidden="true" />
              <span className="whitespace-nowrap">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

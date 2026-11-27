"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Compass, Home, Trophy, Users } from "lucide-react";

const NAV = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/explore", label: "Explore", Icon: Compass },
  { href: "/guilds", label: "Guilds", Icon: Users },
  { href: "/hackathons", label: "Hackathons", Icon: Trophy },
  { href: "/notifications", label: "Notifications", Icon: Bell },
] as const;

function NavigationLinks({ path, mobile = false, unreadCount }: { path: string; mobile?: boolean; unreadCount: number }) {
  return NAV.map(({ href, label, Icon }) => {
    const active = path === href || path.startsWith(`${href}/`);

    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        aria-label={label === "Notifications" && unreadCount > 0 ? `Notifications, ${unreadCount} unread` : undefined}
        className={mobile
          ? `relative flex min-h-16 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-0.5 text-[10px] font-semibold leading-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
            active ? "text-primary" : "text-muted hover:text-ink"
          }`
          : `group flex min-h-12 items-center gap-3 rounded-xl border-l-2 px-3 text-sm font-semibold transition-colors ${
            active
              ? "border-primary bg-gradient-to-r from-primary-dark/30 to-primary-dark/5 text-white"
              : "border-transparent text-muted hover:bg-white/[0.04] hover:text-ink"
          }`}
      >
        <Icon size={mobile ? 20 : 19} strokeWidth={active ? 2.3 : 1.9} aria-hidden="true" />
        <span className={mobile ? "whitespace-nowrap" : undefined}>{label}</span>
        {label === "Notifications" && unreadCount > 0 && (
          <span className={mobile
            ? "absolute right-[calc(50%-23px)] top-2 grid min-w-4 place-items-center rounded-full bg-primary-dark px-1 text-[9px] font-bold leading-4 text-white"
            : "ml-auto grid min-w-5 place-items-center rounded-full bg-primary-dark px-1.5 py-0.5 text-[10px] font-bold leading-4 text-white"}
            aria-hidden="true"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
        {!mobile && active && (
          <span className="ml-auto size-1.5 rounded-full bg-primary" aria-hidden="true" />
        )}
      </Link>
    );
  });
}

function ProfileAvatar({ small = false, initials }: { small?: boolean; initials: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border border-primary/40 bg-gradient-to-br from-primary-dark to-night font-display font-bold text-white shadow-[0_0_16px_rgba(185,28,43,0.2)] ${small ? "size-9 text-xs" : "size-10 text-sm"}`}>
      {initials}
    </span>
  );
}

export default function Shell({ children, userName, unreadCount }: { children: React.ReactNode; userName: string; unreadCount: number }) {
  const path = usePathname();
  const userInitials = userName.split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase() || "HL";

  return (
    <div className="min-h-dvh bg-bg">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-surface px-4 py-3 text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>

      <div className="mx-auto min-h-dvh max-w-[1580px] md:grid md:grid-cols-[224px_minmax(0,1fr)] xl:grid-cols-[252px_minmax(0,1000px)] xl:justify-center">
        <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line/80 bg-night px-3 py-6 md:flex xl:px-4">
          <Link href="/home" className="mb-9 flex items-center gap-3 px-2" aria-label="HackLink home">
            <Image
              src="/hacklink-icon.png"
              alt=""
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-xl object-cover"
            />
            <span className="min-w-0">
              <span className="block font-display text-xl font-bold tracking-tight text-white">
                Hack<span className="text-primary">Link</span>
              </span>
              <span className="block text-[9px] font-semibold tracking-[0.14em] text-muted">CONNECT · COMPETE · COLLABORATE</span>
            </span>
          </Link>

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Your community</p>
          <nav aria-label="Main navigation" className="flex flex-col gap-1">
            <NavigationLinks path={path} unreadCount={unreadCount} />
            <Link
              href="/profile"
              aria-current={path.startsWith("/profile") ? "page" : undefined}
              className={`mt-1 flex min-h-12 items-center gap-3 rounded-xl border-l-2 px-3 text-sm font-semibold transition-colors ${
                path.startsWith("/profile")
                  ? "border-primary bg-gradient-to-r from-primary-dark/30 to-primary-dark/5 text-white"
                  : "border-transparent text-muted hover:bg-white/[0.04] hover:text-ink"
              }`}
            >
              <ProfileAvatar small initials={userInitials} />
              <span>My profile</span>
            </Link>
          </nav>

          <section className="mt-auto overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-dark/30 via-surface to-night p-4 shadow-[0_12px_40px_rgba(185,28,43,0.12)]">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Trophy size={20} aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold leading-tight text-white">Build your next big idea</h2>
            <p className="mt-2 text-xs leading-5 text-muted">
              Join challenges, meet creators, and grow together.
            </p>
            <Link
              href="/hackathons"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-3 text-xs font-bold text-white transition-[background-color,transform] hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              Explore Hackathons <Trophy size={14} aria-hidden="true" />
            </Link>
          </section>

          <Link
            href="/profile"
            className="mt-4 flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-surface/70 p-3 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="relative">
              <ProfileAvatar small initials={userInitials} />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-surface bg-emerald-400" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-ink">{userName}</span>
              <span className="block truncate text-[11px] text-muted">Signed in</span>
            </span>
          </Link>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between gap-3 border-b border-line/70 bg-bg/90 px-4 backdrop-blur-xl sm:px-6">
            <Link href="/home" className="flex items-center gap-2.5 md:hidden" aria-label="HackLink home">
              <Image src="/hacklink-icon.png" alt="" width={36} height={36} className="size-9 rounded-xl object-cover" />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Hack<span className="text-primary">Link</span>
              </span>
            </Link>

            <Link
              href="/explore"
              aria-label="Explore HackLink"
              className="hidden h-11 min-w-0 max-w-[610px] flex-1 items-center gap-3 rounded-full border border-line bg-surface/70 px-4 text-sm text-muted transition-colors hover:border-primary/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:flex"
            >
              <Compass size={18} aria-hidden="true" />
              <span>Explore people, Guilds, and events</span>
              <span className="ml-auto rounded-md border border-line bg-bg px-2 py-1 text-[10px] text-muted">Explore</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/explore"
                aria-label="Browse Explore preview"
                className="grid size-11 place-items-center rounded-xl border border-transparent text-muted transition-colors hover:border-line hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
              >
                <Compass size={19} aria-hidden="true" />
              </Link>
              <Link
                href="/notifications"
                aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"}
                className="relative grid size-11 place-items-center rounded-xl border border-transparent text-muted transition-colors hover:border-line hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Bell size={19} aria-hidden="true" />
                {unreadCount > 0 && <span className="absolute right-1 top-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-primary-dark px-1 text-[9px] font-bold text-white" aria-hidden="true">{unreadCount > 99 ? "99+" : unreadCount}</span>}
              </Link>
              <Link
                href="/profile"
                aria-label="Open profile"
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <ProfileAvatar small initials={userInitials} />
              </Link>
            </div>
          </header>

          <main
            id="main-content"
            className="mx-auto w-full max-w-[860px] px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 md:pb-10 md:pt-6 xl:max-w-none xl:px-7"
          >
            {children}
          </main>
        </div>

      </div>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto flex max-w-lg">
          <NavigationLinks path={path} mobile unreadCount={unreadCount} />
        </div>
      </nav>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Compass, Home, Trophy, Users } from "lucide-react";

const NAV = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/explore", label: "Explore", Icon: Compass },
  { href: "/guilds", label: "Guilds", Icon: Users },
  { href: "/hackathons", label: "Hackathons", Icon: Trophy },
  { href: "/notifications", label: "Notifications", Icon: Bell },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const active = (href: string) => path === href || path.startsWith(href + "/");
  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden md:flex md:w-60 md:flex-col md:border-r md:border-line md:bg-surface md:px-4 md:py-6">
        <Link href="/home" className="mb-8 px-2">
          <span className="font-display text-xl font-bold text-ink">HackLink</span>
          <span className="block text-sm text-muted">Connect. Compete. Collaborate.</span>
        </Link>
        <nav aria-label="Main" className="flex flex-col gap-1">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active(href) ? "bg-primary/10 text-primary-dark" : "text-muted hover:bg-bg hover:text-ink"
              }`}
            >
              <Icon size={18} aria-hidden /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-8">{children}</main>
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-10 flex border-t border-line bg-surface md:hidden">
        {NAV.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={active(href) ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs ${active(href) ? "text-primary" : "text-muted"}`}
          >
            <Icon size={20} aria-hidden /> {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

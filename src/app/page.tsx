import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import Avatar from "@/components/Avatar";
import { ALLOWED_REGIONS } from "@/config/regions";
import { SAMPLE_EVENTS, SAMPLE_GUILDS, SAMPLE_POSTS } from "@/config/sample-content";

const featuredPost = SAMPLE_POSTS[0];
const featuredEvent = SAMPLE_EVENTS[0];
const featuredGuild = SAMPLE_GUILDS[0];
const regionLabel = ALLOWED_REGIONS.map((region) => region.name).join(" · ");

export default function IndexPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-bg px-4 py-5 text-ink sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="HackLink home">
            <Image src="/hacklink-icon.png" alt="" width={48} height={48} className="size-12 rounded-2xl border border-primary/30 object-cover" />
            <span>
              <span className="block font-display text-lg font-bold text-ink">HackLink</span>
              <span className="block text-[10px] font-semibold tracking-[0.14em] text-muted">CONNECT · COMPETE · COLLABORATE</span>
            </span>
          </Link>
          <Link href="/login" className="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary">
            Sign in
          </Link>
        </header>

        <div className="grid items-center gap-12 py-12 md:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{regionLabel} · For the hackathon community</p>
            <h1 className="mt-5 max-w-xl font-display text-5xl font-bold leading-[1.06] tracking-tight text-white sm:text-6xl">
              Connect.<br />Compete.<br /><span className="text-primary">Collaborate.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">
              Meet the developers, designers, students, and organizers who can help your next idea take shape.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary-dark px-5 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                Join HackLink <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/home" className="inline-flex min-h-12 items-center rounded-xl border border-line px-5 text-sm font-bold text-ink transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary">
                Explore the preview
              </Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-muted">Mockup only: accounts and form submissions are not connected or saved.</p>
          </section>

          <section className="relative" aria-label="Illustrative community preview">
            <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full border-[28px] border-primary/10" aria-hidden="true" />
            <div className="relative rounded-[1.75rem] border border-line bg-surface p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <Image src="/hacklink-icon.png" alt="" width={36} height={36} className="size-9 rounded-xl border border-primary/30 object-cover" />
                  <div>
                    <p className="text-sm font-bold text-ink">Community preview</p>
                    <p className="text-xs text-muted">Sample content · not live</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">Preview</span>
              </div>

              <article className="mt-4 rounded-2xl border border-line bg-bg p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <Avatar initials={featuredPost.initials} tone={featuredPost.tone} size="sm" />
                  <div>
                    <p className="text-sm font-bold text-ink">{featuredPost.author}</p>
                    <p className="text-xs text-muted">{featuredPost.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink">{featuredPost.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{tag}</span>
                  ))}
                </div>
              </article>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-bg p-4">
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                    <Users size={15} aria-hidden="true" /> Guild
                  </p>
                  <p className="mt-2 font-display font-bold text-ink">{featuredGuild.name}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{featuredGuild.description}</p>
                </div>
                <div className="rounded-2xl border border-line bg-bg p-4">
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                    <CalendarDays size={15} aria-hidden="true" /> Upcoming
                  </p>
                  <p className="mt-2 font-display font-bold text-ink">{featuredEvent.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{featuredEvent.date} · {featuredEvent.location}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

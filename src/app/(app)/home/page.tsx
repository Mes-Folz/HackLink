import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, Lightbulb, Users } from "lucide-react";
import PageHeading from "@/components/PageHeading";
import PostCard from "@/components/PostCard";
import { SAMPLE_POSTS } from "@/config/sample-content";

const STARTING_POINTS = [
  {
    title: "Meet your people",
    body: "Find builders who care about the same things.",
    Icon: Users,
    href: "/explore",
  },
  {
    title: "Join a Guild",
    body: "Learn together, make progress, share the credit.",
    Icon: Lightbulb,
    href: "/guilds",
  },
  {
    title: "Show up and build",
    body: "Explore events made for curious people.",
    Icon: CalendarDays,
    href: "/hackathons",
  },
] as const;

export default function HomePage() {
  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="HOME · YOUR COMMUNITY"
        title="Your next idea needs good people."
        description="HackLink brings Iloilo’s developers, designers, students, and organizers closer to the projects they want to build."
      />

      <section className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-night px-6 py-7 text-white shadow-sm sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-16 -top-20 -z-10 size-64 rounded-full border-[34px] border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-[-5.5rem] right-24 -z-10 size-40 rounded-full bg-primary/25 blur-2xl" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary" aria-hidden="true" />
        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Connect · Compete · Collaborate</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Big things are built together.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white sm:text-base">
            Find a teammate, meet a Guild, or discover a challenge that gets you thinking.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/explore"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-dark px-4 text-sm font-bold text-white transition-colors hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              Meet the community <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/hackathons"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
            >
              Browse events <CalendarDays size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="start-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">A good place to start</p>
            <h2 id="start-heading" className="mt-1 font-display text-xl font-bold tracking-tight text-ink">
              Make your next move
            </h2>
          </div>
          <Link href="/explore" className="hidden min-h-10 items-center gap-1 text-sm font-bold text-primary hover:text-white sm:inline-flex">
            Explore <Compass size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STARTING_POINTS.map(({ title, body, Icon, href }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-2xl border border-line bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon size={19} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-ink">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted">{body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                Take a look <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="feed-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">From the community</p>
            <h2 id="feed-heading" className="mt-1 font-display text-xl font-bold tracking-tight text-ink">
              Ideas in motion
            </h2>
          </div>
          <Link href="/explore" className="inline-flex min-h-10 items-center gap-1 text-sm font-bold text-primary hover:text-white">
            Discover more <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="space-y-4">
          {SAMPLE_POSTS.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
    </div>
  );
}

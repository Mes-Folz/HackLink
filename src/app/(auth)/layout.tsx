import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-bg px-4 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto grid min-h-[calc(100dvh-2.5rem)] max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(400px,480px)]">
        <aside className="relative hidden overflow-hidden rounded-[2rem] border border-line bg-night p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full border-[44px] border-primary/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <Link href="/" className="relative flex w-fit items-center gap-3" aria-label="HackLink home">
            <Image src="/hacklink-icon.png" alt="" width={48} height={48} className="size-12 rounded-2xl border border-primary/30 object-cover" />
            <span className="font-display text-xl font-bold text-ink">HackLink</span>
          </Link>

          <div className="relative max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Connect · Compete · Collaborate</p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-[1.08] tracking-tight text-white">
              Build good things with your people.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted">
              Find local makers, join a Guild, and discover a challenge worth building for.
            </p>
          </div>

          <Link href="/register" className="relative inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-primary hover:text-white">
            Join the community <span aria-hidden="true">→</span>
          </Link>
        </aside>

        <section className="flex items-center justify-center py-4">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-5 flex w-fit items-center gap-2.5 lg:hidden" aria-label="HackLink home">
              <Image src="/hacklink-icon.png" alt="" width={40} height={40} className="size-10 rounded-xl border border-primary/30 object-cover" />
              <span className="font-display text-lg font-bold text-ink">HackLink</span>
            </Link>

            <div className="rounded-3xl border border-line bg-surface p-6 shadow-2xl shadow-black/20 sm:p-8">
              {children}
            </div>

            <p role="note" className="mt-4 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-xs leading-5 text-muted">
              <span className="font-bold text-primary">Built for local makers.</span> Choose your area during profile setup; exact location is never requested.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

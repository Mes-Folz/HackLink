import { Sparkles } from "lucide-react";

export default function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border border-dashed border-line bg-surface px-6 py-10 text-center sm:px-10">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/5 text-primary">
        <Sparkles size={20} aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-display text-xl font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">{body}</p>
    </section>
  );
}

import { Sparkles } from "lucide-react";

export default function PreviewNotice() {
  return (
    <div
      role="note"
      className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3.5 text-sm"
    >
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-surface text-primary shadow-sm">
        <Sparkles size={16} aria-hidden="true" />
      </span>
      <p className="leading-5 text-muted">
        <span className="font-bold text-ink">Sample preview.</span>{" "}
        People, posts, Guilds, and events are illustrative; changes aren&apos;t saved yet.
      </p>
    </div>
  );
}

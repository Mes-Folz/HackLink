import { Sparkles } from "lucide-react";

export default function PreviewNotice() {
  return (
    <div
      role="note"
      className="mb-4 flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-3 py-2 text-xs xl:hidden"
    >
      <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Sparkles size={13} aria-hidden="true" />
      </span>
      <p className="leading-4 text-muted">
        <span className="font-bold text-ink">Sample preview.</span>{" "}
        People and actions are illustrative; nothing is saved.
      </p>
    </div>
  );
}

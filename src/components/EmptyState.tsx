export default function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-xl border border-dashed border-line bg-surface p-8 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{body}</p>
    </section>
  );
}

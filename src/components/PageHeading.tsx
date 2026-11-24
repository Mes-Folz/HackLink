export default function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-7">
      <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.4rem]">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{description}</p>
    </header>
  );
}

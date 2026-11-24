export type AvatarTone = "blue" | "cyan" | "violet" | "amber" | "green";

const TONE_CLASSES: Record<AvatarTone, string> = {
  blue: "bg-blue-950/70 text-blue-200",
  cyan: "bg-cyan-950/70 text-cyan-200",
  violet: "bg-violet-950/70 text-violet-200",
  amber: "bg-amber-950/70 text-amber-200",
  green: "bg-emerald-950/70 text-emerald-200",
};

export default function Avatar({
  initials,
  tone,
  size = "md",
}: {
  initials: string;
  tone: AvatarTone;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-14 text-base",
  };

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-2xl font-display font-bold ${sizeClasses[size]} ${TONE_CLASSES[tone]}`}
    >
      {initials}
    </span>
  );
}

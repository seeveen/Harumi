type StatCardProps = {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
  hint?: string;
};

export function StatCard({
  icon,
  iconBg,
  label,
  value,
  valueColor = "text-ink",
  hint,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-surface p-4 shadow-glow">
      <div className="flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-base"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </span>
        <p className="text-xs font-medium uppercase tracking-wide text-inkSoft">
          {label}
        </p>
      </div>
      <p className={`mt-3 font-display text-xl ${valueColor}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-inkSoft">{hint}</p>}
    </div>
  );
}

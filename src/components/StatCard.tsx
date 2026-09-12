import { IconBadge, type IconName } from "@/components/Icons";

type StatCardProps = {
  icon: IconName;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
  hint?: string;
};

export function StatCard({
  icon,
  iconColor,
  iconBg,
  label,
  value,
  valueColor = "text-ink",
  hint,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-surface p-4 shadow-glow transition hover:shadow-card">
      <div className="flex items-center gap-2">
        <IconBadge icon={icon} color={iconColor} bg={iconBg} className="h-8 w-8" />
        <p className="text-xs font-medium uppercase tracking-wide text-inkSoft">
          {label}
        </p>
      </div>
      <p className={`mt-3 font-display text-xl ${valueColor}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-inkSoft">{hint}</p>}
    </div>
  );
}

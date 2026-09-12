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

/** Tile de estatística com número grande em destaque — como os cartõezinhos de resultado dos paineis de referência, só que fofo. */
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
    <div className="group rounded-2xl border border-line bg-surface p-4 shadow-glow transition hover:-translate-y-0.5 hover:border-white/10 hover:shadow-card">
      <div className="flex items-center gap-2">
        <IconBadge icon={icon} color={iconColor} bg={iconBg} className="h-8 w-8" />
        <p className="text-xs font-medium text-inkSoft">{label}</p>
      </div>
      <p className={`mt-3 font-display text-2xl ${valueColor}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-inkSoft">{hint}</p>}
    </div>
  );
}

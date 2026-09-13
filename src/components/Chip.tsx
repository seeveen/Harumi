import { Icons, type IconName } from "@/components/Icons";

type ChipProps = {
  label: string;
  count?: number;
  active?: boolean;
  icon?: IconName;
  onClick?: () => void;
};

/** Filtro em formato de pílula, com ícone e contador opcionais. */
export function Chip({ label, count, active, icon, onClick }: ChipProps) {
  const Icon = icon ? Icons[icon] : null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-grad-brand text-bg shadow-pop"
          : "border border-line bg-surface text-inkSoft hover:text-rose"
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />}
      {label}
      {typeof count === "number" && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-xs ${
            active ? "bg-bg/25 text-bg" : "bg-white/5 text-inkSoft"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

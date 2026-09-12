type ChipProps = {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
};

/** Filtro em formato de pílula, com contador opcional. */
export function Chip({ label, count, active, onClick }: ChipProps) {
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

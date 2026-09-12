type ChipProps = {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
};

/** Filtro em formato de pílula, com contador opcional — tipo os filtros de faixa dos modais de referência. */
export function Chip({ label, count, active, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-sakura text-bg"
          : "bg-surfaceMuted text-inkSoft hover:text-rose"
      }`}
    >
      {label}
      {typeof count === "number" && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-xs ${
            active ? "bg-bg/25 text-bg" : "bg-bg/40 text-inkSoft"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

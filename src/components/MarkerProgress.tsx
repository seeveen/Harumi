type MarkerProgressProps = {
  percent: number; // 0-100
  markers: { label: string; value: string; color?: string }[]; // ex: [inicio, meta, atual]
  currentLabel?: string;
  currentValue?: string;
};

/**
 * Barra de progresso com marcadores nas duas pontas (ex.: XP atual /
 * meta de nível), igual à barra de "risco x meta" dos modais de
 * referência, só que em rosa fofo.
 */
export function MarkerProgress({
  percent,
  markers,
  currentLabel,
  currentValue,
}: MarkerProgressProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div>
      <div className="relative h-2.5 rounded-full bg-surfaceMuted">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-sakuraDark to-sakura"
          style={{ width: `${clamped}%` }}
        />
        <div
          className="absolute -top-1.5 h-[22px] w-[22px] rounded-full border-2 border-bg bg-white shadow-soft"
          style={{ left: `calc(${clamped}% - 11px)` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        {markers.map((marker) => (
          <div key={marker.label}>
            <p className="text-inkSoft/80">{marker.label}</p>
            <p className="font-semibold" style={{ color: marker.color ?? "#F9EEF6" }}>
              {marker.value}
            </p>
          </div>
        ))}
      </div>

      {currentLabel && (
        <div className="mt-3 rounded-2xl bg-surfaceMuted px-4 py-3">
          <p className="text-xs text-inkSoft">
            {currentLabel} <span className="text-rose">agora</span>
          </p>
          <p className="mt-0.5 font-display text-lg text-ink">{currentValue}</p>
        </div>
      )}
    </div>
  );
}

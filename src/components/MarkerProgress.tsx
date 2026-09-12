type MarkerProgressProps = {
  percent: number; // 0-100
  markers: { label: string; value: string; color?: string }[]; // ex: [inicio, meta, atual]
  currentLabel?: string;
  currentValue?: string;
};

/**
 * Barra de progresso com marcadores nas duas pontas (ex.: XP atual /
 * meta de nível) e um pino flutuante indicando a posição atual.
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
      <div className="relative h-2.5 rounded-full bg-surfaceHi">
        <div
          className="h-2.5 rounded-full bg-grad-brand"
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
            <p className="font-semibold" style={{ color: marker.color ?? "#F6EFF8" }}>
              {marker.value}
            </p>
          </div>
        ))}
      </div>

      {currentLabel && (
        <div className="mt-3 rounded-2xl bg-surfaceHi px-4 py-3">
          <p className="text-xs text-inkSoft">
            {currentLabel} <span className="text-rose">agora</span>
          </p>
          <p className="mt-0.5 font-display text-lg text-ink">{currentValue}</p>
        </div>
      )}
    </div>
  );
}

"use client";

type DangoSwitchProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

const EASE = "420ms cubic-bezier(.34,1.56,.64,1)";

/**
 * Interruptor em forma de dango (aquele docinho japonês no palitinho).
 * Desligado: só 2 bolinhas, sem graça, cor neutra.
 * Ligado: aparece a 3ª bolinha e as cores do hanami dango (rosa, creme, verde-menta).
 * Nada de bolinha deslizante genérica — o próprio doce é o indicador de estado.
 */
export function DangoSwitch({ checked, onChange, label }: DangoSwitchProps) {
  const off = "#4A3F55";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="relative h-9 w-[4.5rem] shrink-0 rounded-full border border-line bg-surfaceHi transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura/60"
    >
      <svg viewBox="0 0 72 36" className="h-full w-full overflow-visible" aria-hidden="true">
        {/* palitinho de bambu */}
        <line
          x1={checked ? 12 : 18}
          y1="18"
          x2={checked ? 60 : 44}
          y2="18"
          stroke="#B98B5E"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transition: `all ${EASE}` }}
        />

        {/* bolinha 1 */}
        <circle
          cx={checked ? 22 : 24}
          cy="18"
          r="9"
          fill={checked ? "#FF6FB8" : off}
          style={{ transition: `all ${EASE}` }}
        />
        {/* bolinha 2 */}
        <circle
          cx="36"
          cy="18"
          r="9"
          fill={checked ? "#FFF3E6" : off}
          style={{ transition: `all ${EASE}` }}
        />
        {/* bolinha 3 — só existe quando ligado */}
        <circle
          cx="50"
          cy="18"
          r="9"
          fill="#8CE8C2"
          style={{
            opacity: checked ? 1 : 0,
            transform: checked ? "scale(1)" : "scale(0.15)",
            transformOrigin: "50px 18px",
            transformBox: "fill-box",
            transition: `all ${EASE}`,
          }}
        />
      </svg>
    </button>
  );
}

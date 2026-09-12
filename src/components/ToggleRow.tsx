"use client";

import { useId, useState } from "react";

type ToggleRowProps = {
  label: string;
  description?: string;
  defaultChecked?: boolean;
};

/**
 * Linha de configuração com interruptor. Usa `style` pra posicionar a
 * bolinha, garantindo que o estado desligado sempre fique à esquerda.
 * É só visual (não salva nada) — mostra a preferência marcada por padrão.
 */
export function ToggleRow({ label, description, defaultChecked = false }: ToggleRowProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {description && <p className="mt-0.5 text-xs text-inkSoft">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked((v) => !v)}
        className="relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200"
        style={{
          backgroundImage: checked ? "linear-gradient(135deg, #FF6FB8, #C76BFF)" : "none",
          backgroundColor: checked ? undefined : "#150F1C",
          borderColor: checked ? "transparent" : "rgba(255,255,255,0.12)",
        }}
      >
        <span
          className="absolute top-0.5 rounded-full bg-white shadow-soft transition-all duration-200"
          style={{
            left: checked ? "22px" : "2px",
            height: "18px",
            width: "18px",
          }}
        />
      </button>
    </div>
  );
}

"use client";

import { useId, useState } from "react";

type ToggleRowProps = {
  label: string;
  description?: string;
  defaultChecked?: boolean;
};

/**
 * Linha de configuração com interruptor, no estilo do painel de
 * "Configurações" fofo: título + descrição à esquerda, toggle à direita.
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
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-sakura" : "bg-surfaceMuted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

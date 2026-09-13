"use client";

import { useId, useState } from "react";
import { DangoSwitch } from "@/components/DangoSwitch";

type ToggleRowProps = {
  label: string;
  description?: string;
  defaultChecked?: boolean;
};

/**
 * Linha de configuração com o interruptor em forma de dango.
 * É só visual (não salva nada) — mostra a preferência marcada por padrão.
 */
export function ToggleRow({ label, description, defaultChecked = false }: ToggleRowProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <label id={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {description && <p className="mt-0.5 text-xs text-inkSoft">{description}</p>}
      </div>
      <DangoSwitch checked={checked} onChange={() => setChecked((v) => !v)} label={label} />
    </div>
  );
}

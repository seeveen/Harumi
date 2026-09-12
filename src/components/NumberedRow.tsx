import type { ReactNode } from "react";

type NumberedRowProps = {
  index: number;
  highlight?: boolean;
  media?: ReactNode; // avatar ou ícone à esquerda, depois do número
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
};

/**
 * Linha com selo numerado (01, 02, 03...) + conteúdo — usada na lista
 * de servidores do perfil e no ranking, no estilo das listas dos modais
 * de referência.
 */
export function NumberedRow({ index, highlight, media, title, subtitle, trailing }: NumberedRowProps) {
  const num = String(index).padStart(2, "0");

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl p-3 transition ${
        highlight ? "bg-sakura/15 ring-1 ring-sakura/40" : "bg-surfaceMuted"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm ${
          highlight ? "bg-sakura text-bg" : "bg-bg/40 text-rose"
        }`}
      >
        {num}
      </span>
      {media}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{title}</p>
        {subtitle && <p className="truncate text-xs text-inkSoft">{subtitle}</p>}
      </div>
      {trailing}
    </div>
  );
}

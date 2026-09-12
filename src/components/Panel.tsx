import type { ReactNode } from "react";
import { IconBadge, type IconName } from "@/components/Icons";

type PanelProps = {
  icon?: IconName;
  iconColor?: string;
  iconBg?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Cartão de painel no estilo "modal fofo": selo com ícone + título na
 * mesma linha, com espaço opcional pra uma legenda e ações à direita.
 * É a base visual repetida pelo site inteiro (perfil, ranking, comandos).
 */
export function Panel({
  icon,
  iconColor = "#FF6FA8",
  iconBg = "#FF6FA81F",
  title,
  subtitle,
  actions,
  children,
  className = "",
}: PanelProps) {
  return (
    <div
      className={`rounded-blob-lg border border-border/60 bg-surface p-5 shadow-glow sm:p-6 ${className}`}
    >
      {(icon || title) && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {icon && <IconBadge icon={icon} color={iconColor} bg={iconBg} className="h-9 w-9" />}
            <div>
              <p className="font-display text-base text-ink">{title}</p>
              {subtitle && <p className="text-xs text-inkSoft">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={icon || title ? "mt-4" : ""}>{children}</div>
    </div>
  );
}

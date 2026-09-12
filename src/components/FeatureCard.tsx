import { IconBadge, type IconName } from "@/components/Icons";

type FeatureCardProps = {
  icon: IconName;
  color: string;
  title: string;
  text: string;
  className?: string;
};

/**
 * Card de recurso: selo com ícone, brilho suave atrás no hover e um
 * leve movimento pra cima — sutil, sem exagerar.
 */
export function FeatureCard({ icon, color, title, text, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-blob-lg border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-card ${className}`}
    >
      <span
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-25"
        style={{ backgroundColor: color }}
      />

      <IconBadge
        icon={icon}
        color={color}
        bg={`${color}1F`}
        className="h-11 w-11 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <p className="relative mt-4 font-display text-lg text-ink">{title}</p>
      <p className="relative mt-1 text-sm leading-relaxed text-inkSoft">{text}</p>
    </div>
  );
}

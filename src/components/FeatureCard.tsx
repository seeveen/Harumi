import { IconBadge, type IconName } from "@/components/Icons";

type FeatureCardProps = {
  icon: IconName;
  color: string;
  title: string;
  text: string;
  className?: string;
};

/**
 * Card de recurso com um pouco de vida: barra colorida que "abre" no
 * hover, ícone que cresce e gira levemente, e um brilho suave atrás —
 * tudo sutil, sem exagerar.
 */
export function FeatureCard({ icon, color, title, text, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-blob-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-card ${className}`}
    >
      <span
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: color }}
      />
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
        style={{ backgroundColor: color }}
      />

      <IconBadge
        icon={icon}
        color={color}
        bg={`${color}1F`}
        className="h-11 w-11 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3"
      />
      <p className="relative mt-4 font-display text-lg text-ink">{title}</p>
      <p className="relative mt-1 text-sm text-inkSoft">{text}</p>
    </div>
  );
}

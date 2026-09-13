import { Icons, type IconName } from "@/components/Icons";

type FeatureCardProps = {
  icon: IconName;
  color: string;
  title: string;
  text: string;
  example?: string;
  className?: string;
};

/**
 * Cartão de recurso — selo-adesivo levemente torto que endireita no
 * hover, blob de cor atrás e uma pílula com um comando de exemplo.
 * Cantos bem arredondados e borda que ganha brilho da cor da categoria.
 */
export function FeatureCard({ icon, color, title, text, example, className = "" }: FeatureCardProps) {
  const Icon = Icons[icon];

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/10 ${className}`}
    >
      <span
        className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 24px 55px -24px ${color}80` }}
      />

      <span
        className="relative flex h-14 w-14 -rotate-6 items-center justify-center rounded-2xl border border-white/10 transition-transform duration-300 group-hover:rotate-0"
        style={{ backgroundImage: `linear-gradient(135deg, ${color}3D, ${color}0D)` }}
      >
        <Icon className="h-6 w-6" style={{ color }} strokeWidth={2.25} />
      </span>

      <p className="relative mt-5 font-display text-xl text-ink">{title}</p>
      <p className="relative mt-2 text-sm leading-relaxed text-inkSoft">{text}</p>

      {example && (
        <p className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/15 px-3 py-1.5 font-mono text-xs text-inkSoft">
          <Icons.sparkle className="h-3 w-3" style={{ color }} strokeWidth={2.5} />
          {example}
        </p>
      )}
    </div>
  );
}

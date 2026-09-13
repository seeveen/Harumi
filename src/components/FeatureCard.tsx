import { Icons, type IconName } from "@/components/Icons";

type FeatureCardProps = {
  icon: IconName;
  color: string;
  title: string;
  text: string;
  example?: string;
  /** Nome da área no grid `.feature-bento` (eco, mod, int, div, uti). */
  area?: string;
  /** Tratamento maior — pro card que ocupa 2 colunas x 2 linhas. */
  featured?: boolean;
};

/**
 * Cartão de recurso — selo-adesivo levemente torto que endireita no
 * hover, blob de cor atrás e uma pílula com um comando de exemplo.
 * `featured` dá mais respiro e um ícone maior pro card em destaque do
 * bento, em vez de só esticar o card comum e deixar espaço vazio.
 */
export function FeatureCard({
  icon,
  color,
  title,
  text,
  example,
  area,
  featured = false,
}: FeatureCardProps) {
  const Icon = Icons[icon];

  return (
    <div
      data-area={area}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/10 ${
        featured ? "justify-between p-8" : "p-6"
      }`}
    >
      <span
        className="pointer-events-none absolute -right-12 -top-16 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundColor: color, height: featured ? "16rem" : "11rem", width: featured ? "16rem" : "11rem" }}
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 24px 55px -24px ${color}80` }}
      />

      <div>
        <span
          className={`relative flex -rotate-6 items-center justify-center rounded-2xl border border-white/10 transition-transform duration-300 group-hover:rotate-0 ${
            featured ? "h-16 w-16" : "h-14 w-14"
          }`}
          style={{ backgroundImage: `linear-gradient(135deg, ${color}3D, ${color}0D)` }}
        >
          <Icon className={featured ? "h-7 w-7" : "h-6 w-6"} style={{ color }} strokeWidth={2.25} />
        </span>

        <p className={`relative mt-5 font-display text-ink ${featured ? "text-2xl" : "text-xl"}`}>
          {title}
        </p>
        <p className={`relative mt-2 leading-relaxed text-inkSoft ${featured ? "max-w-sm text-base" : "text-sm"}`}>
          {text}
        </p>
      </div>

      {example && (
        <p className="relative mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed border-white/15 px-3 py-1.5 font-mono text-xs text-inkSoft">
          <Icons.sparkle className="h-3 w-3" style={{ color }} strokeWidth={2.5} />
          {example}
        </p>
      )}
    </div>
  );
}

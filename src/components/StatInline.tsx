import { Icons, type IconName } from "@/components/Icons";

type StatInlineProps = {
  icon: IconName;
  value: number | string;
  label: string;
};

/** Estatística solta direto na página — sem cartão em volta, do jeito que os sites de bot costumam mostrar. */
export function StatInline({ icon, value, label }: StatInlineProps) {
  const Icon = Icons[icon];
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
        <Icon className="h-4 w-4 text-rose" strokeWidth={2.25} />
      </span>
      <div>
        <p className="font-display text-lg leading-none text-ink">
          {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
        </p>
        <p className="mt-1 text-xs text-inkSoft">{label}</p>
      </div>
    </div>
  );
}

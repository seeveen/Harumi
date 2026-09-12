import { Icons, type IconName } from "@/components/Icons";

type IconButtonProps = {
  icon: IconName;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  href?: string;
};

/** Botão circular com um ícone — a "barra de ferramentas" fofa. */
export function IconButton({ icon, label, onClick, variant = "default", href }: IconButtonProps) {
  const Icon = Icons[icon];
  const classes = `flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
    variant === "danger"
      ? "border-sakuraDeep/40 bg-sakuraDeep/10 text-rose hover:bg-sakuraDeep/20"
      : "border-line bg-surfaceHi text-inkSoft hover:border-sakura/50 hover:text-rose"
  }`;

  if (href) {
    return (
      <a href={href} aria-label={label} title={label} className={classes}>
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={classes}>
      <Icon className="h-4 w-4" strokeWidth={2.25} />
    </button>
  );
}

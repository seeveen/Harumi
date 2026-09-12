import {
  Flower2,
  ShieldCheck,
  Heart,
  Dices,
  Gift,
  Coins,
  Landmark,
  Sparkles,
  Users,
  LayoutGrid,
  Wallet,
  MessageCircle,
  LogOut,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapa central de ícones da Harumi.
 * Antes usávamos emojis espalhados pelo código; agora cada "conceito"
 * (economia, moderação, nível, etc.) aponta para um ícone SVG único,
 * então trocar o estilo do ícone em um lugar só atualiza o site inteiro.
 */
export const Icons: Record<string, LucideIcon> = {
  flower: Flower2,
  shield: ShieldCheck,
  heart: Heart,
  dice: Dices,
  gift: Gift,
  coin: Coins,
  bank: Landmark,
  sparkle: Sparkles,
  users: Users,
  grid: LayoutGrid,
  wallet: Wallet,
  chat: MessageCircle,
  logout: LogOut,
};

export type IconName = keyof typeof Icons;

type IconBadgeProps = {
  icon: IconName;
  color: string;
  bg: string;
  className?: string;
};

/** Círculo com o ícone dentro, no lugar dos antigos "emoji em bolinha colorida". */
export function IconBadge({ icon, color, bg, className = "h-11 w-11" }: IconBadgeProps) {
  const Icon = Icons[icon];
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{ backgroundColor: bg }}
    >
      <Icon className="h-[45%] w-[45%]" style={{ color }} strokeWidth={2.25} />
    </span>
  );
}

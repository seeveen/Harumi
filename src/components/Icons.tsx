import {
  Flower2,
  ShieldCheck,
  Heart,
  Dices,
  Gift,
  Coins,
  PiggyBank,
  Sparkles,
  Users,
  LayoutGrid,
  Wallet,
  MessageCircle,
  LogOut,
  Target,
  Pencil,
  RefreshCw,
  Share2,
  Bell,
  Volume2,
  Trophy,
  Crown,
  ChevronDown,
  Zap,
  Radio,
  Search,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapa central de ícones da Harumi.
 * Cada "conceito" (economia, moderação, nível, etc.) aponta para um
 * ícone SVG único — trocar o estilo em um lugar só atualiza o site inteiro.
 */
export const Icons: Record<string, LucideIcon> = {
  flower: Flower2,
  shield: ShieldCheck,
  heart: Heart,
  dice: Dices,
  gift: Gift,
  coin: Coins,
  bank: PiggyBank,
  sparkle: Sparkles,
  users: Users,
  grid: LayoutGrid,
  wallet: Wallet,
  chat: MessageCircle,
  logout: LogOut,
  target: Target,
  edit: Pencil,
  refresh: RefreshCw,
  share: Share2,
  bell: Bell,
  sound: Volume2,
  trophy: Trophy,
  crown: Crown,
  chevronDown: ChevronDown,
  bolt: Zap,
  live: Radio,
  search: Search,
};

export type IconName = keyof typeof Icons;

type IconTileProps = {
  icon: IconName;
  color: string;
  bg: string;
  shape?: "square" | "circle";
  className?: string;
};

/** Selo com ícone dentro — quadrado arredondado (padrão) ou círculo. */
export function IconBadge({
  icon,
  color,
  bg,
  shape = "square",
  className = "h-11 w-11",
}: IconTileProps) {
  const Icon = Icons[icon];
  return (
    <span
      className={`flex shrink-0 items-center justify-center ${
        shape === "circle" ? "rounded-full" : "rounded-xl"
      } ${className}`}
      style={{ backgroundColor: bg }}
    >
      <Icon className="h-[45%] w-[45%]" style={{ color }} strokeWidth={2.25} />
    </span>
  );
}

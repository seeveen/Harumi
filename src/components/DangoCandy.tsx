import { Icons, type IconName } from "@/components/Icons";

type DangoCandyProps = {
  icon: IconName;
  color: string;
  size?: number;
  className?: string;
};

/**
 * Docinho em formato de dango — bolinha de mochi num palitinho, no
 * mesmo espírito do DangoSwitch (hanami dango) que já existe no site.
 * Cada comando vira um dango colorido com o ícone dele por cima, em
 * vez de uma bolinha genérica ou um emoji solto.
 */
export function DangoCandy({ icon, color, size = 56, className = "" }: DangoCandyProps) {
  const Icon = Icons[icon];
  const gradId = `dango-grad-${icon}`;

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size * 1.18 }}
    >
      <svg viewBox="0 0 64 76" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={gradId} cx="36%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="38%" stopColor={color} stopOpacity="0.92" />
            <stop offset="100%" stopColor={color} />
          </radialGradient>
        </defs>
        {/* palitinho */}
        <rect x="29" y="50" width="6" height="22" rx="3" fill="#B98B5E" />
        {/* bolinha de mochi */}
        <circle cx="32" cy="30" r="27" fill={`url(#${gradId})`} stroke="#FFFFFF" strokeOpacity="0.18" />
        <ellipse cx="23" cy="19" rx="9" ry="5.5" fill="#FFFFFF" opacity="0.45" />
      </svg>
      <span
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        style={{ color: "#3A2333" }}
      >
        <Icon size={size * 0.34} strokeWidth={2.5} />
      </span>
    </span>
  );
}

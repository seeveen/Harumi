export function HarumiMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mascote fofa da Harumi"
    >
      <defs>
        <radialGradient id="harumi-glow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF9DC8" />
          <stop offset="100%" stopColor="#FFF6FA" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="175" rx="122" ry="112" fill="#2A1534" />
      <ellipse cx="160" cy="182" rx="96" ry="89" fill="url(#harumi-glow)" />
      <path d="M75 112 Q58 60 100 54 Q92 90 106 106 Z" fill="#FF6FA8" />
      <path d="M245 112 Q262 60 220 54 Q228 90 214 106 Z" fill="#FF6FA8" />
      <path d="M75 112 Q58 60 100 54 Q92 90 106 106 Z" fill="#E24E86" opacity="0.35" />
      <path d="M245 112 Q262 60 220 54 Q228 90 214 106 Z" fill="#E24E86" opacity="0.35" />
      <circle cx="128" cy="178" r="7" fill="#3A2333" />
      <circle cx="192" cy="178" r="7" fill="#3A2333" />
      <circle cx="125.5" cy="175" r="2" fill="#FFF" />
      <circle cx="189.5" cy="175" r="2" fill="#FFF" />
      <ellipse cx="110" cy="200" rx="15" ry="8.5" fill="#FFB8D6" opacity="0.85" />
      <ellipse cx="210" cy="200" rx="15" ry="8.5" fill="#FFB8D6" opacity="0.85" />
      <path
        d="M140 208 Q160 223 180 208"
        stroke="#3A2333"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="160" cy="70" r="10" fill="#E24E86" />
      <path
        d="M60 250q100 34 200 0"
        stroke="#E24E86"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
      />
    </svg>
  );
}

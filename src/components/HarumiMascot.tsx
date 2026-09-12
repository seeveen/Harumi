export function HarumiMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mascote fofa da Harumi"
    >
      <ellipse cx="160" cy="170" rx="120" ry="110" fill="#2A1B30" />
      <ellipse cx="160" cy="180" rx="95" ry="88" fill="#FFF3F8" />
      <path d="M75 110 Q60 60 100 55 Q90 90 105 105 Z" fill="#FF6FA5" />
      <path d="M245 110 Q260 60 220 55 Q230 90 215 105 Z" fill="#FF6FA5" />
      <circle cx="128" cy="175" r="7" fill="#3A2333" />
      <circle cx="192" cy="175" r="7" fill="#3A2333" />
      <ellipse cx="110" cy="198" rx="14" ry="8" fill="#FFB8D1" opacity="0.8" />
      <ellipse cx="210" cy="198" rx="14" ry="8" fill="#FFB8D1" opacity="0.8" />
      <path
        d="M140 205 Q160 220 180 205"
        stroke="#3A2333"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="160" cy="70" r="10" fill="#E85394" />
    </svg>
  );
}

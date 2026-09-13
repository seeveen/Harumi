"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Icons, type IconName } from "@/components/Icons";
import { HarumiMascot } from "@/components/HarumiMascot";
import { DangoCandy } from "@/components/DangoCandy";

type Command = { icon: IconName; label: string };
type Stop = {
  id: string;
  title: string;
  icon: IconName;
  color: string;
  colorDeep: string;
  commands: Command[];
};

const STOPS: Stop[] = [
  {
    id: "economia",
    title: "Economia",
    icon: "coin",
    color: "#FF6FB8",
    colorDeep: "#9A1670",
    commands: [
      { icon: "wallet", label: "/trabalhar" },
      { icon: "bank", label: "/banco" },
      { icon: "target", label: "/apostar" },
      { icon: "trophy", label: "/ranking" },
    ],
  },
  {
    id: "moderacao",
    title: "Moderação",
    icon: "shield",
    color: "#6EE7C8",
    colorDeep: "#0E6E63",
    commands: [
      { icon: "bot", label: "/automod ativar" },
      { icon: "ban", label: "/banir" },
      { icon: "mute", label: "/mutar" },
      { icon: "bell", label: "/avisos" },
    ],
  },
  {
    id: "interacao",
    title: "Interação",
    icon: "heart",
    color: "#FFB6DC",
    colorDeep: "#A83466",
    commands: [
      { icon: "gem", label: "/casar" },
      { icon: "hug", label: "/abraçar" },
      { icon: "profile", label: "/perfil" },
      { icon: "heart", label: "/casal" },
    ],
  },
  {
    id: "diversao",
    title: "Diversão",
    icon: "dice",
    color: "#C76BFF",
    colorDeep: "#5A1FA0",
    commands: [
      { icon: "roulette", label: "/roleta" },
      { icon: "laugh", label: "/piada" },
      { icon: "meme", label: "/meme" },
      { icon: "eightball", label: "/8ball" },
    ],
  },
  {
    id: "utilidades",
    title: "Utilidades",
    icon: "gift",
    color: "#FFD166",
    colorDeep: "#A66C08",
    commands: [
      { icon: "wifi", label: "/ping" },
      { icon: "alarm", label: "/lembrete" },
      { icon: "cloudSun", label: "/clima" },
      { icon: "translate", label: "/traduzir" },
    ],
  },
];

// posições em unidades do viewBox (400 x 1180), de cima pra baixo
const POINTS = [
  { x: 200, y: 55 }, // Harumi
  { x: 110, y: 250 }, // Economia
  { x: 300, y: 460 }, // Moderação
  { x: 110, y: 670 }, // Interação
  { x: 300, y: 880 }, // Diversão
  { x: 170, y: 1090 }, // Utilidades
];
const VB_W = 400;
const VB_H = 1180;
const pct = (v: number, total: number) => (v / total) * 100;

const PATH_D = `
  M${POINTS[0].x} ${POINTS[0].y}
  C ${POINTS[0].x} ${POINTS[0].y + 85}, ${POINTS[1].x} ${POINTS[1].y - 90}, ${POINTS[1].x} ${POINTS[1].y}
  C ${POINTS[1].x} ${POINTS[1].y + 90}, ${POINTS[2].x} ${POINTS[2].y - 100}, ${POINTS[2].x} ${POINTS[2].y}
  C ${POINTS[2].x} ${POINTS[2].y + 100}, ${POINTS[3].x} ${POINTS[3].y - 90}, ${POINTS[3].x} ${POINTS[3].y}
  C ${POINTS[3].x} ${POINTS[3].y + 90}, ${POINTS[4].x} ${POINTS[4].y - 100}, ${POINTS[4].x} ${POINTS[4].y}
  C ${POINTS[4].x} ${POINTS[4].y + 100}, ${POINTS[5].x} ${POINTS[5].y - 90}, ${POINTS[5].x} ${POINTS[5].y}
`;

const POP_EASE = "cubic-bezier(.34,1.56,.64,1)";
const FALLBACK_AVATAR = "https://cdn.discordapp.com/embed/avatars/0.png";

type CandyPoint = {
  key: string;
  x: number;
  y: number;
  icon: IconName;
  label: string;
  color: string;
};

export function CandyTrail() {
  const { data: session } = useSession();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [candies, setCandies] = useState<CandyPoint[]>([]);
  const [avatarPoint, setAvatarPoint] = useState(POINTS[0]);

  // pop-in de paradas/docinhos na primeira vez que a seção aparece
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // espalha os docinhos ao longo do próprio traçado, não mais ao redor da parada
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();

    const pointWithOffset = (len: number, offset: number) => {
      const clamped = Math.max(0, Math.min(total, len));
      const p = path.getPointAtLength(clamped);
      const ahead = path.getPointAtLength(Math.min(total, clamped + 1));
      const dx = ahead.x - p.x;
      const dy = ahead.y - p.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = -dy / dist;
      const ny = dx / dist;
      return { x: p.x + nx * offset, y: p.y + ny * offset };
    };

    const next: CandyPoint[] = [];
    STOPS.forEach((stop, i) => {
      const segStart = (i / STOPS.length) * total;
      const segLen = total / STOPS.length;
      stop.commands.forEach((cmd, k) => {
        const len = segStart + ((k + 0.5) / stop.commands.length) * segLen;
        const side = k % 2 === 0 ? 1 : -1;
        const offset = side * (20 + k * 3);
        const pt = pointWithOffset(len, offset);
        next.push({ key: `${stop.id}-${k}`, x: pt.x, y: pt.y, icon: cmd.icon, label: cmd.label, color: stop.color });
      });
    });
    setCandies(next);
  }, []);

  // avatar do usuário percorrendo o caminho junto com o scroll — sobe e desce
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = rootRef.current;
      const path = pathRef.current;
      if (!el || !path) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progresso = qual pedaço da trilha está no meio da tela agora —
      // assim o avatar acompanha junto o que você está vendo, em vez de
      // só bater 100% quando a seção inteira já saiu da tela
      const raw = (vh / 2 - rect.top) / rect.height;
      const p = Math.min(1, Math.max(0, raw));
      setProgress(p);

      const total = path.getTotalLength();
      setAvatarPoint(path.getPointAtLength(p * total));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const avatarSrc = session?.user?.image ?? FALLBACK_AVATAR;
  const avatarName = session?.user?.name ?? "Você";

  return (
    <div ref={rootRef} className="flex justify-center py-6">
      <div className="relative w-full" style={{ maxWidth: 640, aspectRatio: `${VB_W} / ${VB_H}` }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* trilha completa — pontilhado apagado, serve de base e de régua pras medições */}
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray="1 15"
          />
        </svg>

        {/* trecho já percorrido — recortado pelo progresso do scroll */}
        <div
          className="absolute inset-0 transition-[clip-path] duration-100 ease-linear"
          style={{ clipPath: `inset(0 0 ${(1 - progress) * 100}% 0)` }}
        >
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="trail-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6FB8" />
                <stop offset="50%" stopColor="#C76BFF" />
                <stop offset="100%" stopColor="#6EE7C8" />
              </linearGradient>
            </defs>
            <path
              d={PATH_D}
              fill="none"
              stroke="url(#trail-grad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="1 15"
              style={{ filter: "drop-shadow(0 0 5px rgba(255,111,184,.45))" }}
            />
          </svg>
        </div>

        {/* avatar do usuário viajando pela trilha */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-100 ease-linear"
          style={{
            left: `${pct(avatarPoint.x, VB_W)}%`,
            top: `${pct(avatarPoint.y, VB_H)}%`,
            opacity: inView ? 1 : 0,
          }}
        >
          <span
            className="block overflow-hidden rounded-full border-2 border-white/80 shadow-[0_4px_14px_rgba(0,0,0,.55)]"
            style={{ width: 34, height: 34 }}
          >
            <Image src={avatarSrc} alt={avatarName} width={34} height={34} className="h-full w-full object-cover" />
          </span>
        </div>

        {/* Harumi — início da trilha */}
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all"
          style={{
            left: `${pct(POINTS[0].x, VB_W)}%`,
            top: `${pct(POINTS[0].y, VB_H)}%`,
            opacity: inView ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.6})`,
            transitionDuration: "550ms",
            transitionTimingFunction: POP_EASE,
          }}
        >
          <span
            className="flex items-center justify-center rounded-full border-[3px] border-bg bg-surface shadow-soft"
            style={{ width: 96, height: 96 }}
          >
            <HarumiMascot className="h-[70%] w-[70%]" />
          </span>
          <span className="mt-2 rounded-full border border-line bg-surface px-3 py-1 font-display text-sm text-ink">
            Harumi
          </span>
        </div>

        {/* paradas — círculo sólido na cor da categoria, sem transparência */}
        {STOPS.map((stop, i) => {
          const point = POINTS[i + 1];
          const left = pct(point.x, VB_W);
          const top = pct(point.y, VB_H);
          const Icon = Icons[stop.icon];
          const stopDelay = 150 + i * 140;

          return (
            <div
              key={stop.id}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                opacity: inView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.5})`,
                transitionDuration: "500ms",
                transitionTimingFunction: POP_EASE,
                transitionDelay: `${stopDelay}ms`,
              }}
            >
              <span className="relative">
                <span
                  className="flex items-center justify-center rounded-full border-[3px] border-bg transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                  style={{
                    width: 84,
                    height: 84,
                    background: `linear-gradient(160deg, ${stop.color} 0%, ${stop.colorDeep} 100%)`,
                    boxShadow: `0 16px 30px -14px ${stop.color}99, inset 0 2px 0 0 rgba(255,255,255,.2)`,
                  }}
                >
                  <Icon className="h-8 w-8 text-white" strokeWidth={2.25} />
                </span>
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg bg-surfaceHi text-[11px] font-bold"
                  style={{ color: stop.color }}
                >
                  {stop.commands.length}
                </span>
              </span>
              <span className="mt-2 rounded-full border border-line bg-surface px-3 py-1 text-center font-display text-sm text-ink">
                {stop.title}
              </span>
            </div>
          );
        })}

        {/* docinhos espalhados ao longo da trilha, não mais ao redor da parada */}
        {candies.map((c, i) => (
          <div
            key={c.key}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all"
            style={{
              left: `${pct(c.x, VB_W)}%`,
              top: `${pct(c.y, VB_H)}%`,
              opacity: inView ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.3})`,
              transitionDuration: "450ms",
              transitionTimingFunction: POP_EASE,
              transitionDelay: `${260 + i * 55}ms`,
            }}
          >
            <div style={{ animation: "trail-float 3.2s ease-in-out infinite", animationDelay: `${i * 0.22}s` }}>
              <button
                type="button"
                className="group/candy relative block cursor-default transition-transform hover:scale-[1.18] focus-visible:scale-[1.18]"
                aria-label={c.label}
              >
                <DangoCandy icon={c.icon} color={c.color} size={34} />
                <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-surfaceHi px-2 py-1 font-mono text-[11px] text-ink opacity-0 shadow-glow transition-all duration-150 group-hover/candy:opacity-100 group-focus-visible/candy:opacity-100">
                  {c.label}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes trail-float {
          0%,
          100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-6px) rotate(4deg);
          }
        }
      `}</style>
    </div>
  );
}

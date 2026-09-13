"use client";

import { useEffect, useRef, useState } from "react";
import { Icons, type IconName } from "@/components/Icons";
import { HarumiMascot } from "@/components/HarumiMascot";
import { DangoCandy } from "@/components/DangoCandy";

type Command = { icon: IconName; label: string };
type Stop = {
  id: string;
  title: string;
  icon: IconName;
  color: string;
  text: string;
  commands: Command[];
};

const STOPS: Stop[] = [
  {
    id: "economia",
    title: "Economia",
    icon: "coin",
    color: "#FF6FB8",
    text: "Moedas, banco, apostas e trabalho.",
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
    text: "Bans, mutes, avisos e automod.",
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
    text: "Abraços, casamentos e perfis.",
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
    text: "Jogos, memes e brincadeiras.",
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
    text: "Lembretes, clima e tradução.",
    commands: [
      { icon: "wifi", label: "/ping" },
      { icon: "alarm", label: "/lembrete" },
      { icon: "cloudSun", label: "/clima" },
      { icon: "translate", label: "/traduzir" },
    ],
  },
];

// posições em % do board (viewBox 400 x 1180), de cima pra baixo
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

// pequeno leque de posições pros dangos ao redor de cada parada
const CANDY_OFFSETS = [
  { dx: -12, dy: -2.4 },
  { dx: 12, dy: -1.2 },
  { dx: -10, dy: 2.6 },
  { dx: 10, dy: 3.6 },
];

const POP_EASE = "cubic-bezier(.34,1.56,.64,1)";

export function CandyTrail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

  return (
    <div ref={rootRef} className="flex justify-center py-6">
      <div
        className="relative w-full"
        style={{ maxWidth: 640, aspectRatio: `${VB_W} / ${VB_H}` }}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="trail-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6FB8" />
              <stop offset="50%" stopColor="#C76BFF" />
              <stop offset="100%" stopColor="#6EE7C8" />
            </linearGradient>
          </defs>
          <path d={PATH_D} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
          <path
            d={PATH_D}
            fill="none"
            stroke="url(#trail-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={100}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: inView ? 0 : 100,
              transition: "stroke-dashoffset 1.8s ease-out",
            }}
          />
        </svg>

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
            className="flex items-center justify-center rounded-full border border-white/10 bg-surface shadow-soft"
            style={{ width: 96, height: 96, animation: "trail-bob 4.2s ease-in-out infinite" }}
          >
            <HarumiMascot className="h-[70%] w-[70%]" />
          </span>
          <span className="mt-2 rounded-full border border-line bg-surface px-3 py-1 font-display text-sm text-ink">
            Harumi
          </span>
        </div>

        {/* paradas + docinhos */}
        {STOPS.map((stop, i) => {
          const point = POINTS[i + 1];
          const left = pct(point.x, VB_W);
          const top = pct(point.y, VB_H);
          const Icon = Icons[stop.icon];
          const stopDelay = 150 + i * 140;

          return (
            <div key={stop.id}>
              <div
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
                <span
                  className="flex items-center justify-center rounded-full border border-white/10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                  style={{
                    width: 84,
                    height: 84,
                    backgroundImage: `linear-gradient(135deg, ${stop.color}40, ${stop.color}10)`,
                    boxShadow: `0 18px 40px -18px ${stop.color}80, inset 0 1px 0 0 rgba(255,255,255,.06)`,
                    animation: "trail-bob 5s ease-in-out infinite",
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <Icon className="h-8 w-8" style={{ color: stop.color }} strokeWidth={2.25} />
                </span>
                <span className="mt-2 rounded-full border border-line bg-surface px-3 py-1 text-center font-display text-sm text-ink">
                  {stop.title}
                </span>
                <span className="mt-1 max-w-[10rem] text-center text-xs text-inkSoft">{stop.text}</span>
              </div>

              {stop.commands.map((cmd, ci) => {
                const off = CANDY_OFFSETS[ci % CANDY_OFFSETS.length];
                const candyDelay = stopDelay + 180 + ci * 90;
                return (
                  <div
                    key={cmd.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all"
                    style={{
                      left: `${left + off.dx}%`,
                      top: `${top + off.dy}%`,
                      opacity: inView ? 1 : 0,
                      transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.3})`,
                      transitionDuration: "450ms",
                      transitionTimingFunction: POP_EASE,
                      transitionDelay: `${candyDelay}ms`,
                    }}
                  >
                    <div
                      style={{
                        animation: "trail-float 3.2s ease-in-out infinite",
                        animationDelay: `${ci * 0.35}s`,
                      }}
                    >
                      <button
                        type="button"
                        className="group/candy relative block cursor-default transition-transform hover:scale-[1.15] focus-visible:scale-[1.15]"
                        aria-label={cmd.label}
                      >
                        <DangoCandy icon={cmd.icon} color={stop.color} size={40} />
                        <span
                          className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-surfaceHi px-2 py-1 font-mono text-[11px] text-ink opacity-0 shadow-glow transition-all duration-150 group-hover/candy:opacity-100 group-focus-visible/candy:opacity-100"
                        >
                          {cmd.label}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes trail-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes trail-float {
          0%,
          100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-7px) rotate(4deg);
          }
        }
      `}</style>
    </div>
  );
}

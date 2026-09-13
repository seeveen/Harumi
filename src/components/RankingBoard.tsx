"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Icons } from "@/components/Icons";

export type RankingMember = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  balance: number;
};

const medalByRank: Record<number, { ring: string; badge: string; glow: string }> = {
  1: {
    ring: "ring-[#FFD66B]/70",
    badge: "bg-[#FFD66B] text-[#2A1B00]",
    glow: "shadow-[0_20px_40px_-16px_rgba(255,214,107,0.55)]",
  },
  2: {
    ring: "ring-[#D7DDE6]/70",
    badge: "bg-[#D7DDE6] text-[#1C1C22]",
    glow: "shadow-[0_18px_36px_-18px_rgba(215,221,230,0.4)]",
  },
  3: {
    ring: "ring-[#E3A66B]/70",
    badge: "bg-[#E3A66B] text-[#2A1500]",
    glow: "shadow-[0_18px_36px_-18px_rgba(227,166,107,0.4)]",
  },
};

/** Ranking interativo: busca por nome, alterna ordenação e mostra um pódio pros 3 primeiros. */
export function RankingBoard({ members }: { members: RankingMember[] }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"saldo" | "nivel">("saldo");

  const sorted = useMemo(() => {
    return [...members].sort((a, b) =>
      sortBy === "saldo" ? b.balance - a.balance : b.level - a.level
    );
  }, [members, sortBy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((m) => m.name.toLowerCase().includes(q));
  }, [sorted, query]);

  const showPodium = !query.trim() && sorted.length >= 3;
  const podium = showPodium
    ? [
        { member: sorted[1], rank: 2 },
        { member: sorted[0], rank: 1 },
        { member: sorted[2], rank: 3 },
      ]
    : [];
  const rest = showPodium ? filtered.slice(3) : filtered;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Icons.search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-inkSoft"
            strokeWidth={2.25}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar um membro..."
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-inkSoft/70 focus:border-sakura/50"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSortBy("saldo")}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              sortBy === "saldo"
                ? "bg-grad-brand text-bg"
                : "border border-line text-inkSoft hover:text-rose"
            }`}
          >
            Por saldo
          </button>
          <button
            type="button"
            onClick={() => setSortBy("nivel")}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              sortBy === "nivel"
                ? "bg-grad-brand text-bg"
                : "border border-line text-inkSoft hover:text-rose"
            }`}
          >
            Por nível
          </button>
        </div>
      </div>

      {showPodium && (
        <div className="mt-8 grid grid-cols-3 items-end gap-3">
          {podium.map(({ member, rank }) => {
            const medal = medalByRank[rank];
            const isFirst = rank === 1;
            return (
              <div
                key={member.id}
                className={`flex flex-col items-center rounded-3xl border border-line bg-surface px-3 pb-4 ${
                  isFirst ? "-translate-y-3 pt-7" : "pt-5"
                }`}
              >
                {isFirst && (
                  <Icons.crown className="mb-1 h-5 w-5 text-[#FFD66B]" strokeWidth={2.25} />
                )}
                <div className={`relative rounded-full ring-4 ${medal.ring} ${medal.glow}`}>
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={isFirst ? 64 : 52}
                    height={isFirst ? 64 : 52}
                    className="rounded-full"
                  />
                  <span
                    className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold ${medal.badge}`}
                  >
                    {rank}º
                  </span>
                </div>
                <p className="mt-3 max-w-[6.5rem] truncate text-center text-sm font-medium text-ink">
                  {member.name}
                </p>
                <p className="mt-1 flex items-center gap-1 font-display text-sm text-sakura">
                  {member.balance.toLocaleString("pt-BR")}
                  <Icons.coin className="h-3.5 w-3.5" strokeWidth={2.25} />
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 space-y-2.5">
        {filtered.length === 0 && (
          <p className="flex items-center gap-2 rounded-2xl bg-surfaceHi p-6 text-inkSoft">
            <Icons.flower className="h-5 w-5 shrink-0 text-sakura" strokeWidth={2.25} />
            Ninguém encontrado.
          </p>
        )}

        {rest.map((member) => {
          const rank = sorted.findIndex((m) => m.id === member.id) + 1;
          return (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surfaceHi p-3 transition hover:border-white/10"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg/40 font-display text-sm text-rose">
                {String(rank).padStart(2, "0")}
              </span>
              <Image src={member.avatar} alt={member.name} width={36} height={36} className="rounded-full" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{member.name}</p>
                <p className="text-xs text-inkSoft">nível {member.level}</p>
              </div>
              <p className="flex shrink-0 items-center gap-1.5 font-display text-base text-sakura">
                {member.balance.toLocaleString("pt-BR")}
                <Icons.coin className="h-4 w-4" strokeWidth={2.25} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

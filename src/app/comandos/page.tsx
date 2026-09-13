"use client";

import { useMemo, useState } from "react";
import { commandCategories } from "@/lib/commands";
import { Panel } from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { Icons } from "@/components/Icons";

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  economia: { color: "#FF6FB8", bg: "#FF6FB81F" },
  moderacao: { color: "#6EE7C8", bg: "#6EE7C81F" },
  interacao: { color: "#FFB6DC", bg: "#FFB6DC1F" },
  utilidades: { color: "#6EE7C8", bg: "#6EE7C81F" },
  diversao: { color: "#C76BFF", bg: "#C76BFF1F" },
};

export default function ComandosPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "todas">("todas");

  const totalComandos = commandCategories.reduce((sum, cat) => sum + cat.commands.length, 0);

  const filtered = useMemo(() => {
    return commandCategories
      .filter((cat) => activeCategory === "todas" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        commands: cat.commands.filter(
          (cmd) =>
            cmd.name.toLowerCase().includes(query.toLowerCase()) ||
            cmd.description.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((cat) => cat.commands.length > 0);
  }, [query, activeCategory]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-display text-3xl text-ink">Comandos</p>
      <p className="mt-2 text-inkSoft">
        Tudo que a Harumi sabe fazer, organizado por categoria.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Icons.search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-inkSoft"
            strokeWidth={2.25}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar um comando..."
            className="w-full rounded-full border border-line bg-surface py-3 pl-10 pr-5 text-ink placeholder:text-inkSoft/70 focus:border-sakura/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip
            label="Todas"
            icon="grid"
            count={totalComandos}
            active={activeCategory === "todas"}
            onClick={() => setActiveCategory("todas")}
          />
          {commandCategories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              count={cat.commands.length}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {filtered.map((cat) => {
          const palette = CATEGORY_COLORS[cat.id] ?? { color: "#FF6FB8", bg: "#FF6FB81F" };
          return (
            <Panel
              key={cat.id}
              icon={cat.icon}
              iconColor={palette.color}
              iconBg={palette.bg}
              title={cat.label}
              subtitle={cat.description}
              actions={
                <span className="rounded-full bg-surfaceHi px-3 py-1 text-xs text-inkSoft">
                  {cat.commands.length} comandos
                </span>
              }
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {cat.commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="group relative overflow-hidden rounded-2xl border border-line bg-surfaceHi p-4 pl-5 transition hover:-translate-y-0.5 hover:border-white/10"
                  >
                    <span
                      className="absolute inset-y-3 left-0 w-1 rounded-r-full transition-all group-hover:inset-y-2"
                      style={{ backgroundColor: palette.color }}
                    />
                    <p className="font-mono text-sm font-semibold" style={{ color: palette.color }}>
                      {cmd.name}
                    </p>
                    <p className="mt-1 text-sm text-inkSoft">{cmd.description}</p>
                    <p className="mt-2 text-xs text-inkSoft/70">{cmd.usage}</p>
                  </div>
                ))}
              </div>
            </Panel>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-inkSoft">
            Nenhum comando encontrado para &quot;{query}&quot;.
          </p>
        )}
      </div>
    </div>
  );
}

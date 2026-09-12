"use client";

import { useMemo, useState } from "react";
import { commandCategories } from "@/lib/commands";
import { Panel } from "@/components/Panel";
import { Chip } from "@/components/Chip";

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  economia: { color: "#FF6FA8", bg: "#FF6FA81F" },
  moderacao: { color: "#5EEAD4", bg: "#5EEAD41F" },
  interacao: { color: "#FF8FA3", bg: "#FF8FA31F" },
  utilidades: { color: "#5EEAD4", bg: "#5EEAD41F" },
  diversao: { color: "#FFA9D3", bg: "#FFA9D31F" },
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
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar um comando..."
          className="w-full rounded-full border border-border bg-surface px-5 py-3 text-ink placeholder:text-inkSoft/70 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <Chip
            label="Todas"
            count={totalComandos}
            active={activeCategory === "todas"}
            onClick={() => setActiveCategory("todas")}
          />
          {commandCategories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.label}
              count={cat.commands.length}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {filtered.map((cat) => {
          const palette = CATEGORY_COLORS[cat.id] ?? { color: "#FF6FA8", bg: "#FF6FA81F" };
          return (
            <Panel
              key={cat.id}
              icon={cat.icon}
              iconColor={palette.color}
              iconBg={palette.bg}
              title={cat.label}
              subtitle={cat.description}
              actions={
                <span className="rounded-full bg-surfaceMuted px-3 py-1 text-xs text-inkSoft">
                  {cat.commands.length} comandos
                </span>
              }
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {cat.commands.map((cmd) => (
                  <div key={cmd.name} className="rounded-2xl bg-surfaceMuted p-4">
                    <p className="font-mono text-sm font-semibold text-sakura">{cmd.name}</p>
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

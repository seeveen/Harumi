"use client";

import { useMemo, useState } from "react";
import { commandCategories } from "@/lib/commands";
import { Icons } from "@/components/Icons";

export default function ComandosPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "todas">("todas");

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
          <button
            onClick={() => setActiveCategory("todas")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === "todas"
                ? "bg-sakura text-bg"
                : "bg-surface text-inkSoft hover:text-rose"
            }`}
          >
            Todas
          </button>
          {commandCategories.map((cat) => {
            const Icon = Icons[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat.id
                    ? "bg-sakura text-bg"
                    : "bg-surface text-inkSoft hover:text-rose"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {filtered.map((cat) => {
          const Icon = Icons[cat.icon];
          return (
            <div key={cat.id}>
              <div className="flex items-center gap-2">
                <Icon className="h-6 w-6 text-sakura" strokeWidth={2.25} />
                <p className="font-display text-xl text-rose">{cat.label}</p>
              </div>
              <p className="mt-1 text-sm text-inkSoft">{cat.description}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {cat.commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="rounded-2xl bg-surface p-4 shadow-glow"
                  >
                    <p className="font-mono text-sm font-semibold text-sakura">
                      {cmd.name}
                    </p>
                    <p className="mt-1 text-sm text-inkSoft">
                      {cmd.description}
                    </p>
                    <p className="mt-2 text-xs text-inkSoft/70">{cmd.usage}</p>
                  </div>
                ))}
              </div>
            </div>
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

"use client";

import { useMemo, useState } from "react";
import { commandCategories } from "@/lib/commands";

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
      <p className="font-display text-3xl text-plum">Comandos</p>
      <p className="mt-2 text-plumSoft">
        Tudo que a Harumi sabe fazer, organizado por categoria.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar um comando..."
          className="w-full rounded-full border border-petal bg-white px-5 py-3 text-plum placeholder:text-plumSoft/70 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("todas")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === "todas"
                ? "bg-sakura text-white"
                : "bg-white text-plumSoft hover:text-rose"
            }`}
          >
            Todas
          </button>
          {commandCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.id
                  ? "bg-sakura text-white"
                  : "bg-white text-plumSoft hover:text-rose"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {filtered.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl">{cat.emoji}</span>
              <p className="font-display text-xl text-rose">{cat.label}</p>
            </div>
            <p className="mt-1 text-sm text-plumSoft">{cat.description}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cat.commands.map((cmd) => (
                <div
                  key={cmd.name}
                  className="rounded-2xl bg-white p-4 shadow-soft"
                >
                  <p className="font-mono text-sm font-semibold text-sakuraDark">
                    {cmd.name}
                  </p>
                  <p className="mt-1 text-sm text-plumSoft">
                    {cmd.description}
                  </p>
                  <p className="mt-2 text-xs text-plumSoft/70">{cmd.usage}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-plumSoft">
            Nenhum comando encontrado para &quot;{query}&quot;.
          </p>
        )}
      </div>
    </div>
  );
}

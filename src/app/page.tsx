import Link from "next/link";
import { HarumiMascot } from "@/components/HarumiMascot";
import { StatCard } from "@/components/StatCard";
import { commandCategories } from "@/lib/commands";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const features = [
  {
    id: "economia",
    title: "Economia",
    emoji: "🌸",
    iconBg: "#E8539433",
    span: "md:col-span-2",
    text: "Moedas, banco, apostas e trabalho — os membros constroem uma economia de verdade dentro do servidor, com ranking próprio.",
  },
  {
    id: "moderacao",
    title: "Moderação",
    emoji: "🛡️",
    iconBg: "#34D39933",
    span: "",
    text: "Bans, mutes, avisos e automod, sem complicação.",
  },
  {
    id: "interacao",
    title: "Interação",
    emoji: "💞",
    iconBg: "#FB6F9233",
    span: "",
    text: "Abraços, casamentos e perfis para os membros interagirem.",
  },
  {
    id: "diversao",
    title: "Diversão",
    emoji: "🍡",
    iconBg: "#FF6FA533",
    span: "",
    text: "Jogos, memes e brincadeiras para animar qualquer canal.",
  },
  {
    id: "utilidades",
    title: "Utilidades",
    emoji: "🎀",
    iconBg: "#34D39933",
    span: "md:col-span-2",
    text: "Lembretes, enquetes e informações do servidor sempre à mão.",
  },
];

export default async function HomePage() {
  const totalComandos = commandCategories.reduce(
    (sum, cat) => sum + cat.commands.length,
    0
  );

  const [totalMembros, economia] = await Promise.all([
    prisma.user.count(),
    prisma.economyProfile.aggregate({ _sum: { balance: true } }),
  ]);

  const moedasEmCirculacao = economia._sum.balance ?? 0;

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            A bot mais fofa para tomar conta do seu servidor
          </p>
          <p className="mt-5 max-w-md text-inkSoft">
            A Harumi cuida da economia, da moderação e da diversão do seu
            Discord — tudo com um jeitinho kawaii e sem perder a organização.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="rounded-full bg-sakura px-6 py-3 font-semibold text-bg shadow-pop transition active:translate-y-0.5 active:shadow-none"
            >
              Adicionar ao servidor
            </a>
            <Link
              href="/comandos"
              className="rounded-full border border-border bg-surface px-6 py-3 font-semibold text-rose transition hover:border-sakura"
            >
              Ver comandos
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
            <StatCard
              icon="🎀"
              iconBg="#FF6FA533"
              label="Comandos"
              value={String(totalComandos)}
            />
            <StatCard
              icon="🌷"
              iconBg="#34D39933"
              label="Categorias"
              value={String(commandCategories.length)}
              valueColor="text-mint"
            />
            <StatCard
              icon="👥"
              iconBg="#FB6F9233"
              label="Membros no site"
              value={String(totalMembros)}
            />
            <StatCard
              icon="🪙"
              iconBg="#E8539433"
              label="Moedas em circulação"
              value={moedasEmCirculacao.toLocaleString("pt-BR")}
              valueColor="text-rose"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <HarumiMascot className="w-full drop-shadow-[0_20px_35px_rgba(232,83,148,0.35)]" />
          <span className="absolute -left-4 top-6 rotate-[-8deg] rounded-2xl bg-surface px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            +250 🪙 hoje
          </span>
          <span className="absolute -right-2 bottom-10 rotate-[6deg] rounded-2xl bg-surface px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            nível 12 ✨
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="font-display text-2xl text-ink">O que ela faz por você</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.span} rounded-blob-lg bg-surface p-6 shadow-glow`}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-xl"
                style={{ backgroundColor: feature.iconBg }}
              >
                {feature.emoji}
              </span>
              <p className="mt-3 font-display text-lg text-rose">
                {feature.title}
              </p>
              <p className="mt-1 text-sm text-inkSoft">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

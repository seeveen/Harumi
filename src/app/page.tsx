import Link from "next/link";
import { HarumiMascot } from "@/components/HarumiMascot";
import { StatCard } from "@/components/StatCard";
import { IconBadge, Icons, type IconName } from "@/components/Icons";
import { commandCategories } from "@/lib/commands";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const features: {
  id: string;
  title: string;
  icon: IconName;
  iconColor: string;
  iconBg: string;
  span: string;
  text: string;
}[] = [
  {
    id: "economia",
    title: "Economia",
    icon: "coin",
    iconColor: "#FF6FA8",
    iconBg: "#FF6FA81F",
    span: "md:col-span-2",
    text: "Moedas, banco, apostas e trabalho — os membros constroem uma economia de verdade dentro do servidor, com ranking próprio.",
  },
  {
    id: "moderacao",
    title: "Moderação",
    icon: "shield",
    iconColor: "#5EEAD4",
    iconBg: "#5EEAD41F",
    span: "",
    text: "Bans, mutes, avisos e automod, sem complicação.",
  },
  {
    id: "interacao",
    title: "Interação",
    icon: "heart",
    iconColor: "#FF8FA3",
    iconBg: "#FF8FA31F",
    span: "",
    text: "Abraços, casamentos e perfis para os membros interagirem.",
  },
  {
    id: "diversao",
    title: "Diversão",
    icon: "dice",
    iconColor: "#FFA9D3",
    iconBg: "#FFA9D31F",
    span: "",
    text: "Jogos, memes e brincadeiras para animar qualquer canal.",
  },
  {
    id: "utilidades",
    title: "Utilidades",
    icon: "gift",
    iconColor: "#5EEAD4",
    iconBg: "#5EEAD41F",
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
              icon="grid"
              iconColor="#FF6FA8"
              iconBg="#FF6FA81F"
              label="Comandos"
              value={String(totalComandos)}
            />
            <StatCard
              icon="flower"
              iconColor="#5EEAD4"
              iconBg="#5EEAD41F"
              label="Categorias"
              value={String(commandCategories.length)}
              valueColor="text-mint"
            />
            <StatCard
              icon="users"
              iconColor="#FF8FA3"
              iconBg="#FF8FA31F"
              label="Membros no site"
              value={String(totalMembros)}
            />
            <StatCard
              icon="coin"
              iconColor="#FFA9D3"
              iconBg="#FFA9D31F"
              label="Moedas em circulação"
              value={moedasEmCirculacao.toLocaleString("pt-BR")}
              valueColor="text-rose"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <HarumiMascot className="w-full drop-shadow-[0_20px_35px_rgba(198,66,138,0.35)]" />
          <span className="absolute -left-4 top-6 flex -rotate-[8deg] items-center gap-1.5 rounded-2xl bg-surface px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            <Icons.coin className="h-4 w-4" strokeWidth={2.25} />
            +250 hoje
          </span>
          <span className="absolute -right-2 bottom-10 flex rotate-[6deg] items-center gap-1.5 rounded-2xl bg-surface px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            <Icons.sparkle className="h-4 w-4" strokeWidth={2.25} />
            nível 12
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="font-display text-2xl text-ink">O que ela faz por você</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.span} rounded-blob-lg bg-surface p-6 shadow-glow transition hover:shadow-card`}
            >
              <IconBadge icon={feature.icon} color={feature.iconColor} bg={feature.iconBg} />
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

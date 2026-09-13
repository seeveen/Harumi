import Link from "next/link";
import { HarumiMascot } from "@/components/HarumiMascot";
import { FeatureCard } from "@/components/FeatureCard";
import { StatInline } from "@/components/StatInline";
import { Icons, type IconName } from "@/components/Icons";
import { getBotStats } from "@/lib/stats";

export const revalidate = 0;

const features: {
  id: string;
  title: string;
  icon: IconName;
  color: string;
  area: string;
  featured?: boolean;
  text: string;
  example: string;
}[] = [
  {
    id: "economia",
    title: "Economia",
    icon: "coin",
    color: "#FF6FB8",
    area: "eco",
    featured: true,
    text: "Moedas, banco, apostas e trabalho — os membros constroem uma economia de verdade dentro do servidor, com ranking próprio.",
    example: "/trabalhar",
  },
  {
    id: "moderacao",
    title: "Moderação",
    icon: "shield",
    color: "#6EE7C8",
    area: "mod",
    text: "Bans, mutes, avisos e automod, sem complicação.",
    example: "/automod ativar",
  },
  {
    id: "interacao",
    title: "Interação",
    icon: "heart",
    color: "#FFB6DC",
    area: "int",
    text: "Abraços, casamentos e perfis para os membros interagirem.",
    example: "/casar",
  },
  {
    id: "diversao",
    title: "Diversão",
    icon: "dice",
    color: "#C76BFF",
    area: "div",
    text: "Jogos, memes e brincadeiras para animar qualquer canal.",
    example: "/shipp",
  },
  {
    id: "utilidades",
    title: "Utilidades",
    icon: "gift",
    color: "#6EE7C8",
    area: "uti",
    text: "Lembretes, enquetes e informações do servidor sempre à mão.",
    example: "/enquete",
  },
];

export default async function HomePage() {
  const stats = await getBotStats();

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
              className="rounded-full bg-grad-brand px-6 py-3 font-semibold text-bg shadow-pop transition active:translate-y-0.5 active:shadow-none"
            >
              Adicionar ao servidor
            </a>
            <Link
              href="/comandos"
              className="rounded-full border border-line bg-surface px-6 py-3 font-semibold text-rose transition hover:border-sakura/50"
            >
              Ver comandos
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <StatInline icon="users" value={stats.usuarios} label="usuários" />
            <StatInline icon="grid" value={stats.servidores} label="servidores" />
            <StatInline icon="bolt" value={stats.comandos} label="comandos" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <HarumiMascot className="w-full drop-shadow-[0_25px_45px_rgba(199,71,158,0.35)]" />
          <span className="absolute -left-4 top-6 flex -rotate-[8deg] items-center gap-1.5 rounded-2xl border border-line bg-surface px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            <Icons.coin className="h-4 w-4" strokeWidth={2.25} />
            +250 hoje
          </span>
          <span className="absolute -right-2 bottom-10 flex rotate-[6deg] items-center gap-1.5 rounded-2xl border border-line bg-surface px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            <Icons.sparkle className="h-4 w-4" strokeWidth={2.25} />
            nível 12
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-center gap-2">
          <Icons.flower className="h-5 w-5 text-sakura" strokeWidth={2.25} />
          <p className="font-display text-2xl text-ink">O que ela faz por você</p>
        </div>
        <p className="mt-2 max-w-md text-sm text-inkSoft">
          Cinco frentes, um bot só — passe o mouse pra ver um comando de
          exemplo de cada uma.
        </p>
        <div className="feature-bento mt-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              color={feature.color}
              title={feature.title}
              text={feature.text}
              example={feature.example}
              area={feature.area}
              featured={feature.featured}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

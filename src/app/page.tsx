import Link from "next/link";
import { HarumiMascot } from "@/components/HarumiMascot";

const features = [
  {
    id: "economia",
    title: "Economia",
    emoji: "🌸",
    span: "md:col-span-2",
    text: "Moedas, banco, apostas e trabalho — os membros constroem uma economia de verdade dentro do servidor, com ranking próprio.",
  },
  {
    id: "moderacao",
    title: "Moderação",
    emoji: "🛡️",
    span: "",
    text: "Bans, mutes, avisos e automod, sem complicação.",
  },
  {
    id: "interacao",
    title: "Interação",
    emoji: "💞",
    span: "",
    text: "Abraços, casamentos e perfis para os membros interagirem.",
  },
  {
    id: "diversao",
    title: "Diversão",
    emoji: "🍡",
    span: "",
    text: "Jogos, memes e brincadeiras para animar qualquer canal.",
  },
  {
    id: "utilidades",
    title: "Utilidades",
    emoji: "🎀",
    span: "md:col-span-2",
    text: "Lembretes, enquetes e informações do servidor sempre à mão.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-display text-4xl leading-tight text-plum sm:text-5xl">
            A bot mais fofa para tomar conta do seu servidor
          </p>
          <p className="mt-5 max-w-md text-plumSoft">
            A Harumi cuida da economia, da moderação e da diversão do seu
            Discord — tudo com um jeitinho kawaii e sem perder a organização.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="rounded-full bg-sakura px-6 py-3 font-semibold text-white shadow-pop transition active:translate-y-0.5 active:shadow-none"
            >
              Adicionar ao servidor
            </a>
            <Link
              href="/comandos"
              className="rounded-full border border-petal bg-white px-6 py-3 font-semibold text-rose transition hover:border-sakura"
            >
              Ver comandos
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <HarumiMascot className="w-full drop-shadow-[0_20px_25px_rgba(226,87,148,0.25)]" />
          <span className="absolute -left-4 top-6 rotate-[-8deg] rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            +250 🪙 hoje
          </span>
          <span className="absolute -right-2 bottom-10 rotate-[6deg] rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-rose shadow-soft">
            nível 12 ✨
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="font-display text-2xl text-plum">O que ela faz por você</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.span} rounded-blob-lg bg-white p-6 shadow-soft`}
            >
              <span className="text-3xl">{feature.emoji}</span>
              <p className="mt-3 font-display text-lg text-rose">
                {feature.title}
              </p>
              <p className="mt-1 text-sm text-plumSoft">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

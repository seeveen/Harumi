import Link from "next/link";
import { Icons } from "@/components/Icons";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/comandos", label: "Comandos" },
  { href: "/ranking", label: "Ranking" },
  { href: "/perfil", label: "Perfil" },
];

export function Footer() {
  return (
    <footer className="mt-24 px-3 pb-6 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-surface">
        <div className="h-1 w-full bg-grad-brand" />

        <div className="grid gap-10 px-8 py-12 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-brand">
                <Icons.flower className="h-4 w-4 text-bg" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg text-ink">Harumi</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-inkSoft">
              Cuida da economia, da moderação e da diversão do seu servidor —
              sempre com um jeitinho kawaii.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-inkSoft">
              feita com carinho 🍡
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-inkSoft">Navegação</p>
            <ul className="mt-3 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink/80 transition hover:text-rose">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-inkSoft">Comece agora</p>
            <p className="mt-3 text-sm leading-relaxed text-inkSoft">
              Adicione a Harumi no seu servidor e deixe tudo mais fofo em
              poucos minutos.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-grad-brand px-5 py-2.5 text-sm font-semibold text-bg shadow-pop transition active:translate-y-0.5 active:shadow-none"
            >
              <Icons.chat className="h-4 w-4" strokeWidth={2.5} />
              Adicionar ao servidor
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-line px-8 py-5 text-xs text-inkSoft sm:flex-row">
          <p>© {new Date().getFullYear()} Harumi</p>
          <p className="flex items-center gap-1.5">
            <Icons.flower className="h-3.5 w-3.5 text-sakura" strokeWidth={2.25} />
            sua bot mais fofa de Discord
          </p>
        </div>
      </div>
    </footer>
  );
}

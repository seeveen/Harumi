"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Icons } from "@/components/Icons";

const links = [
  { href: "/", label: "Início" },
  { href: "/comandos", label: "Comandos" },
  { href: "/ranking", label: "Ranking" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-line bg-surface/80 px-3 py-2 shadow-glow backdrop-blur-xl sm:px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 pl-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grad-brand">
            <Icons.flower className="h-4 w-4 text-bg" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold text-ink">Harumi</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-bg" : "text-inkSoft hover:text-ink"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-grad-brand shadow-pop" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {status === "authenticated" ? (
          <div className="flex items-center gap-2">
            <Link
              href="/perfil"
              className="flex items-center gap-2 rounded-full bg-surfaceHi py-1 pl-1 pr-3 transition hover:brightness-110 sm:pr-4"
            >
              <Image
                src={session.user.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                alt={session.user.name ?? "Seu avatar"}
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="hidden text-sm font-medium text-ink sm:inline">
                {session.user.name}
              </span>
            </Link>
            <button
              onClick={() => signOut()}
              aria-label="Sair"
              title="Sair"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-inkSoft transition hover:border-sakura/50 hover:text-rose"
            >
              <Icons.logout className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className="flex items-center gap-2 rounded-full bg-grad-brand px-4 py-2.5 text-sm font-semibold text-bg shadow-pop transition active:translate-y-0.5 active:shadow-none sm:px-5"
          >
            <Icons.chat className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Entrar com Discord</span>
            <span className="sm:hidden">Entrar</span>
          </button>
        )}
      </div>
    </header>
  );
}

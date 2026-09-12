"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Início" },
  { href: "/comandos", label: "Comandos" },
  { href: "/ranking", label: "Ranking" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-petal/70 bg-blush/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="font-display text-xl font-semibold text-rose">Harumi</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-white/70 p-1 shadow-sm md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sakura text-white shadow-pop"
                    : "text-plumSoft hover:bg-petal hover:text-rose"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {status === "authenticated" ? (
          <div className="flex items-center gap-3">
            <Link
              href="/perfil"
              className="flex items-center gap-2 rounded-full bg-white/80 py-1 pl-1 pr-4 shadow-sm transition hover:shadow-soft"
            >
              <Image
                src={session.user.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                alt={session.user.name ?? "Seu avatar"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-plum">
                {session.user.name}
              </span>
            </Link>
            <button
              onClick={() => signOut()}
              className="rounded-full border border-petal px-3 py-2 text-sm text-plumSoft transition hover:border-sakura hover:text-rose"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className="rounded-full bg-sakura px-5 py-2.5 text-sm font-semibold text-white shadow-pop transition active:translate-y-0.5 active:shadow-none"
          >
            Entrar com Discord
          </button>
        )}
      </div>
    </header>
  );
}

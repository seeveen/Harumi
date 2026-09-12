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
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Icons.flower className="h-6 w-6 text-sakura" strokeWidth={2.25} />
          <span className="font-display text-xl font-semibold text-rose">Harumi</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-surface p-1 shadow-glow md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sakura text-bg shadow-pop"
                    : "text-inkSoft hover:bg-surfaceMuted hover:text-rose"
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
              className="flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-4 shadow-glow transition hover:shadow-soft"
            >
              <Image
                src={session.user.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
                alt={session.user.name ?? "Seu avatar"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-ink">
                {session.user.name}
              </span>
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm text-inkSoft transition hover:border-sakura hover:text-rose"
            >
              <Icons.logout className="h-4 w-4" strokeWidth={2.25} />
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className="flex items-center gap-2 rounded-full bg-sakura px-5 py-2.5 text-sm font-semibold text-bg shadow-pop transition active:translate-y-0.5 active:shadow-none"
          >
            <Icons.chat className="h-4 w-4" strokeWidth={2.5} />
            Entrar com Discord
          </button>
        )}
      </div>
    </header>
  );
}

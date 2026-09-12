import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchUserGuilds, getGuildIconUrl } from "@/lib/discord";

export const revalidate = 0;

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="font-display text-2xl text-plum">
          Entre com o Discord para ver seu perfil
        </p>
        <p className="mt-2 text-plumSoft">
          Use o botão &quot;Entrar com Discord&quot; no topo da página.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-sakura px-6 py-3 font-semibold text-white shadow-pop"
        >
          Voltar para o início
        </Link>
      </div>
    );
  }

  const [member, guilds] = await Promise.all([
    prisma.user.findUnique({
      where: { discordId: session.user.discordId },
      include: { economy: true },
    }),
    session.accessToken ? fetchUserGuilds(session.accessToken) : Promise.resolve([]),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center gap-5 rounded-blob-lg bg-white p-6 shadow-soft">
        <Image
          src={session.user.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
          alt={session.user.name ?? "Seu avatar"}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <p className="font-display text-2xl text-plum">
            {session.user.name}
          </p>
          <p className="text-sm text-plumSoft">
            Membro desde{" "}
            {member?.createdAt.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 text-center shadow-soft">
          <p className="text-xs text-plumSoft">Carteira</p>
          <p className="mt-1 font-display text-2xl text-sakuraDark">
            {member?.economy?.balance ?? 0} 🪙
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center shadow-soft">
          <p className="text-xs text-plumSoft">Banco</p>
          <p className="mt-1 font-display text-2xl text-sakuraDark">
            {member?.economy?.bank ?? 0} 🪙
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center shadow-soft">
          <p className="text-xs text-plumSoft">Nível</p>
          <p className="mt-1 font-display text-2xl text-sakuraDark">
            {member?.economy?.level ?? 1}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-display text-xl text-plum">Seus servidores</p>
        <p className="mt-1 text-sm text-plumSoft">
          Servidores do Discord em que você está, buscados em tempo real.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {guilds.map((guild) => {
            const icon = getGuildIconUrl(guild.id, guild.icon);
            return (
              <div
                key={guild.id}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft"
              >
                {icon ? (
                  <Image
                    src={icon}
                    alt={guild.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-petal text-sm font-semibold text-rose">
                    {guild.name.slice(0, 1)}
                  </div>
                )}
                <p className="truncate text-sm text-plum">{guild.name}</p>
              </div>
            );
          })}
          {guilds.length === 0 && (
            <p className="text-sm text-plumSoft">
              Não foi possível carregar seus servidores agora.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchUserGuilds, getGuildIconUrl } from "@/lib/discord";
import { StatCard } from "@/components/StatCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Icons } from "@/components/Icons";

export const revalidate = 0;

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="font-display text-2xl text-ink">
          Entre com o Discord para ver seu perfil
        </p>
        <p className="mt-2 text-inkSoft">
          Use o botão &quot;Entrar com Discord&quot; no topo da página.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-sakura px-6 py-3 font-semibold text-bg shadow-pop"
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

  const level = member?.economy?.level ?? 1;
  const xp = member?.economy?.xp ?? 0;
  const xpParaProximoNivel = level * 100;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center gap-5 rounded-blob-lg bg-surface p-6 shadow-glow">
        <Image
          src={session.user.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
          alt={session.user.name ?? "Seu avatar"}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <p className="font-display text-2xl text-ink">
            {session.user.name}
          </p>
          <p className="text-sm text-inkSoft">
            Membro desde{" "}
            {member?.createdAt.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatCard
          icon="wallet"
          iconColor="#FF6FA8"
          iconBg="#FF6FA81F"
          label="Carteira"
          value={`${member?.economy?.balance ?? 0}`}
          valueColor="text-rose"
        />
        <StatCard
          icon="bank"
          iconColor="#5EEAD4"
          iconBg="#5EEAD41F"
          label="Banco"
          value={`${member?.economy?.bank ?? 0}`}
          valueColor="text-mint"
        />
        <StatCard
          icon="sparkle"
          iconColor="#FFA9D3"
          iconBg="#FFA9D31F"
          label="Nível"
          value={`${level}`}
        />
      </div>

      <div className="mt-4">
        <ProgressBar
          label="Progresso de nível"
          startLabel={`${xp} XP`}
          goalLabel={`${xpParaProximoNivel} XP para o nível ${level + 1}`}
          percent={(xp / xpParaProximoNivel) * 100}
        />
      </div>

      <div className="mt-10">
        <p className="font-display text-xl text-ink">Seus servidores</p>
        <p className="mt-1 text-sm text-inkSoft">
          Servidores do Discord em que você está, buscados em tempo real.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {guilds.map((guild) => {
            const icon = getGuildIconUrl(guild.id, guild.icon);
            return (
              <div
                key={guild.id}
                className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-glow"
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surfaceMuted text-sm font-semibold text-rose">
                    {guild.name.slice(0, 1)}
                  </div>
                )}
                <p className="truncate text-sm text-ink">{guild.name}</p>
              </div>
            );
          })}
          {guilds.length === 0 && (
            <p className="text-sm text-inkSoft">
              Não foi possível carregar seus servidores agora.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchUserGuilds, getGuildIconUrl } from "@/lib/discord";
import { StatCard } from "@/components/StatCard";
import { Panel } from "@/components/Panel";
import { MarkerProgress } from "@/components/MarkerProgress";
import { ToggleRow } from "@/components/ToggleRow";
import { NumberedRow } from "@/components/NumberedRow";
import { IconButton } from "@/components/IconButton";

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
  const percentXp = (xp / xpParaProximoNivel) * 100;

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-6 py-16">
      <Panel
        icon="sparkle"
        title="Perfil"
        subtitle="Suas estatísticas na Harumi"
        actions={
          <>
            <IconButton icon="refresh" label="Atualizar" />
            <IconButton icon="share" label="Compartilhar perfil" />
          </>
        }
      >
        <div className="flex items-center gap-5">
          <Image
            src={session.user.image ?? "https://cdn.discordapp.com/embed/avatars/0.png"}
            alt={session.user.name ?? "Seu avatar"}
            width={72}
            height={72}
            className="rounded-full ring-2 ring-sakura/40"
          />
          <div>
            <p className="font-display text-xl text-ink">{session.user.name}</p>
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
      </Panel>

      <div className="grid gap-3 sm:grid-cols-3">
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

      <Panel icon="target" title="Progresso de nível" subtitle="Continue conversando pra evoluir">
        <MarkerProgress
          percent={percentXp}
          markers={[
            { label: "NÍVEL ATUAL", value: `${level}`, color: "#FFA9D3" },
            { label: "XP ATUAL", value: `${xp}`, color: "#F9EEF6" },
            { label: "PRÓXIMO NÍVEL", value: `${xpParaProximoNivel} XP`, color: "#5EEAD4" },
          ]}
          currentLabel="Faltam"
          currentValue={`${Math.max(xpParaProximoNivel - xp, 0)} XP para o nível ${level + 1}`}
        />
      </Panel>

      <Panel icon="bell" title="Preferências" subtitle="Só neste navegador, é só visual por enquanto">
        <div className="divide-y divide-border/60">
          <ToggleRow
            label="Notificar quando eu subir de nível"
            description="Mostra um aviso flutuante ao bater a meta de XP."
            defaultChecked
          />
          <ToggleRow
            label="Mostrar meu perfil no ranking público"
            description="Outros membros veem seu saldo e nível na página de ranking."
            defaultChecked
          />
          <ToggleRow
            label="Som ao completar uma meta diária"
            description="Emite um som curto quando você recebe o /daily."
          />
        </div>
      </Panel>

      <Panel icon="users" title="Seus servidores" subtitle="Buscados em tempo real no Discord">
        <div className="grid gap-3 sm:grid-cols-2">
          {guilds.map((guild, index) => {
            const icon = getGuildIconUrl(guild.id, guild.icon);
            return (
              <NumberedRow
                key={guild.id}
                index={index + 1}
                media={
                  icon ? (
                    <Image
                      src={icon}
                      alt={guild.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg/40 text-xs font-semibold text-rose">
                      {guild.name.slice(0, 1)}
                    </div>
                  )
                }
                title={guild.name}
                subtitle={guild.owner ? "Você é dono(a)" : undefined}
              />
            );
          })}
          {guilds.length === 0 && (
            <p className="text-sm text-inkSoft">
              Não foi possível carregar seus servidores agora.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}

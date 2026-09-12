import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getAvatarUrl } from "@/lib/discord";
import { Panel } from "@/components/Panel";
import { NumberedRow } from "@/components/NumberedRow";
import { Icons } from "@/components/Icons";

export const revalidate = 0; // sempre busca dados reais e atuais

export default async function RankingPage() {
  const top = await prisma.user.findMany({
    where: { economy: { isNot: null } },
    include: { economy: true },
    orderBy: { economy: { balance: "desc" } },
    take: 20,
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Panel
        icon="trophy"
        title="Ranking"
        subtitle="Os membros com mais moedas no site"
      >
        <p className="text-sm text-inkSoft">
          Quando a Harumi estiver rodando no seu servidor, esse ranking passa
          a refletir a economia real de lá também.
        </p>

        <div className="mt-5 space-y-2.5">
          {top.length === 0 && (
            <p className="flex items-center gap-2 rounded-2xl bg-surfaceMuted p-6 text-inkSoft">
              <Icons.flower className="h-5 w-5 shrink-0 text-sakura" strokeWidth={2.25} />
              Ainda ninguém entrou. Seja a primeira pessoa a aparecer aqui —
              entre com o Discord no canto superior direito.
            </p>
          )}

          {top.map((member, index) => (
            <NumberedRow
              key={member.id}
              index={index + 1}
              highlight={index === 0}
              media={
                <Image
                  src={getAvatarUrl(member.discordId, member.avatar)}
                  alt={member.globalName ?? member.username}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              }
              title={member.globalName ?? member.username}
              subtitle={`nível ${member.economy?.level}`}
              trailing={
                <p className="flex shrink-0 items-center gap-1.5 font-display text-base text-sakura">
                  {member.economy?.balance}
                  <Icons.coin className="h-4 w-4" strokeWidth={2.25} />
                </p>
              }
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}

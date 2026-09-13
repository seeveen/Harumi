import { prisma } from "@/lib/prisma";
import { getAvatarUrl } from "@/lib/discord";
import { Panel } from "@/components/Panel";
import { Icons } from "@/components/Icons";
import { RankingBoard, type RankingMember } from "@/components/RankingBoard";

export const revalidate = 0; // sempre busca dados reais e atuais

export default async function RankingPage() {
  const top = await prisma.user.findMany({
    where: { economy: { isNot: null } },
    include: { economy: true },
    orderBy: { economy: { balance: "desc" } },
    take: 50,
  });

  const members: RankingMember[] = top.map((member) => ({
    id: member.id,
    name: member.globalName ?? member.username,
    avatar: getAvatarUrl(member.discordId, member.avatar),
    level: member.economy?.level ?? 1,
    balance: member.economy?.balance ?? 0,
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Panel icon="trophy" title="Ranking" subtitle="Os membros com mais moedas no site">
        {members.length === 0 ? (
          <p className="flex items-center gap-2 rounded-2xl bg-surfaceHi p-6 text-inkSoft">
            <Icons.flower className="h-5 w-5 shrink-0 text-sakura" strokeWidth={2.25} />
            Ainda ninguém entrou. Seja a primeira pessoa a aparecer aqui —
            entre com o Discord no canto superior direito.
          </p>
        ) : (
          <RankingBoard members={members} />
        )}
      </Panel>
    </div>
  );
}

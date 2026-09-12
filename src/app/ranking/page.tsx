import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getAvatarUrl } from "@/lib/discord";

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
      <p className="font-display text-3xl text-plum">Ranking</p>
      <p className="mt-2 text-plumSoft">
        Os membros com mais moedas depois de entrar no site. Quando a Harumi
        estiver rodando no seu servidor, esse ranking passa a refletir a
        economia real de lá também.
      </p>

      <div className="mt-8 space-y-3">
        {top.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-plumSoft shadow-soft">
            Ainda ninguém entrou. Seja a primeira pessoa a aparecer aqui —
            entre com o Discord no canto superior direito. 🌸
          </p>
        )}

        {top.map((member, index) => (
          <div
            key={member.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft"
          >
            <span className="w-6 text-center font-display text-lg text-rose">
              {index + 1}
            </span>
            <Image
              src={getAvatarUrl(member.discordId, member.avatar)}
              alt={member.globalName ?? member.username}
              width={44}
              height={44}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-plum">
                {member.globalName ?? member.username}
              </p>
              <p className="text-xs text-plumSoft">nível {member.economy?.level}</p>
            </div>
            <p className="font-display text-lg text-sakuraDark">
              {member.economy?.balance} 🪙
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

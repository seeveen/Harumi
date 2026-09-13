import { prisma } from "@/lib/prisma";
import { commandCategories } from "@/lib/commands";

// A Harumi (o bot em si) ainda não escreve a contagem de servidores no
// banco — isso normalmente vem do processo do bot, não do site. Por
// enquanto é um valor fixo; troque por uma consulta real assim que o bot
// tiver uma rota/tabela reportando isso (ex.: BotStats no schema.prisma).
const SERVIDORES_ATIVOS = 1;

export async function getBotStats() {
  const [usuarios] = await Promise.all([prisma.user.count()]);
  const comandos = commandCategories.reduce((sum, cat) => sum + cat.commands.length, 0);

  return {
    usuarios,
    servidores: SERVIDORES_ATIVOS,
    comandos,
  };
}

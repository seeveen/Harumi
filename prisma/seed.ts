import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Cria um membro de exemplo só para você ver o ranking funcionando
  // antes do primeiro login real. Pode apagar isso quando quiser.
  await prisma.user.upsert({
    where: { discordId: "000000000000000000" },
    create: {
      discordId: "000000000000000000",
      username: "harumi_exemplo",
      globalName: "Exemplo",
      economy: { create: { balance: 500, level: 3 } },
    },
    update: {},
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

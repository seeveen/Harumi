import type { IconName } from "@/components/Icons";

export type Command = {
  name: string;
  description: string;
  usage: string;
};

export type CommandCategory = {
  id: string;
  label: string;
  icon: IconName;
  description: string;
  commands: Command[];
};

export const commandCategories: CommandCategory[] = [
  {
    id: "economia",
    label: "Economia",
    icon: "coin",
    description: "Junte moedas, aposte e suba de nível conversando no servidor.",
    commands: [
      { name: "/saldo", description: "Mostra quanto você tem em carteira e no banco.", usage: "/saldo [membro]" },
      { name: "/daily", description: "Recolhe sua recompensa diária de moedas.", usage: "/daily" },
      { name: "/trabalhar", description: "Trabalha para ganhar moedas (com cooldown).", usage: "/trabalhar" },
      { name: "/depositar", description: "Guarda moedas da carteira no banco.", usage: "/depositar <quantidade>" },
      { name: "/apostar", description: "Aposta moedas em um cara-ou-coroa.", usage: "/apostar <quantidade>" },
      { name: "/ranking", description: "Mostra os membros mais ricos do servidor.", usage: "/ranking" },
    ],
  },
  {
    id: "moderacao",
    label: "Moderação",
    icon: "shield",
    description: "Mantenha o servidor organizado e seguro sem esforço.",
    commands: [
      { name: "/ban", description: "Bane um membro do servidor.", usage: "/ban <membro> [motivo]" },
      { name: "/kick", description: "Expulsa um membro do servidor.", usage: "/kick <membro> [motivo]" },
      { name: "/mute", description: "Silencia um membro por um tempo.", usage: "/mute <membro> <tempo>" },
      { name: "/warn", description: "Aplica uma advertência a um membro.", usage: "/warn <membro> <motivo>" },
      { name: "/clear", description: "Limpa mensagens do canal.", usage: "/clear <quantidade>" },
      { name: "/automod", description: "Configura filtros automáticos do servidor.", usage: "/automod <ativar|desativar>" },
    ],
  },
  {
    id: "interacao",
    label: "Interação",
    icon: "heart",
    description: "Comandos para interagir e brincar com os amigos.",
    commands: [
      { name: "/abraçar", description: "Manda um abraço fofo para alguém.", usage: "/abraçar <membro>" },
      { name: "/beijar", description: "Manda um beijo para alguém.", usage: "/beijar <membro>" },
      { name: "/tapa", description: "Dá um tapa de brincadeira em alguém.", usage: "/tapa <membro>" },
      { name: "/casar", description: "Pede alguém em casamento no servidor.", usage: "/casar <membro>" },
      { name: "/perfil", description: "Mostra o perfil e nível de um membro.", usage: "/perfil [membro]" },
    ],
  },
  {
    id: "utilidades",
    label: "Utilidades",
    icon: "gift",
    description: "Ferramentas do dia a dia para o servidor.",
    commands: [
      { name: "/ajuda", description: "Mostra a lista de comandos da Harumi.", usage: "/ajuda [categoria]" },
      { name: "/avatar", description: "Mostra o avatar de um membro em tamanho grande.", usage: "/avatar [membro]" },
      { name: "/servidor", description: "Mostra informações sobre o servidor atual.", usage: "/servidor" },
      { name: "/lembrete", description: "Cria um lembrete para você.", usage: "/lembrete <tempo> <mensagem>" },
      { name: "/enquete", description: "Cria uma votação rápida no canal.", usage: "/enquete <pergunta>" },
    ],
  },
  {
    id: "diversao",
    label: "Diversão",
    icon: "dice",
    description: "Jogos e brincadeiras para animar o servidor.",
    commands: [
      { name: "/8ball", description: "Faz uma pergunta para a bola 8 mágica.", usage: "/8ball <pergunta>" },
      { name: "/meme", description: "Manda um meme aleatório.", usage: "/meme" },
      { name: "/shipp", description: "Calcula a % de combinação entre dois membros.", usage: "/shipp <membro1> <membro2>" },
      { name: "/forca", description: "Inicia um jogo da forca no canal.", usage: "/forca" },
      { name: "/piada", description: "Conta uma piada aleatória.", usage: "/piada" },
    ],
  },
];

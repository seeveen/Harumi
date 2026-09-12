import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds",
    }),
  ],
  callbacks: {
    // Roda a cada login: garante que existe um membro real no banco,
    // com um perfil de economia real (mesma tabela que o bot vai usar).
    async signIn({ profile }) {
      if (!profile) return false;
      const discordProfile = profile as {
        id: string;
        username: string;
        global_name?: string | null;
        avatar?: string | null;
      };

      await prisma.user.upsert({
        where: { discordId: discordProfile.id },
        create: {
          discordId: discordProfile.id,
          username: discordProfile.username,
          globalName: discordProfile.global_name ?? null,
          avatar: discordProfile.avatar ?? null,
          economy: {
            create: {},
          },
        },
        update: {
          username: discordProfile.username,
          globalName: discordProfile.global_name ?? null,
          avatar: discordProfile.avatar ?? null,
        },
      });

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const discordProfile = profile as { id: string };
        token.discordId = discordProfile.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.discordId = token.discordId as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/", // usamos um botão na própria home/navbar, sem página de login separada
  },
};

# Harumi 🌸

Site oficial da Harumi: landing page, página de comandos, ranking de
economia (dados reais do banco) e perfil com login real via Discord.

Este projeto **não é uma simulação** — o login usa OAuth2 real do Discord
e os dados (usuários, saldo, nível) ficam num banco Postgres real. É a
mesma base que, no futuro, o bot da Harumi pode usar para ler/escrever a
economia dos servidores.

## 1. Criar o app no Discord

1. Acesse https://discord.com/developers/applications e crie uma aplicação
   chamada "Harumi" (ou use a que já existe, se o bot já foi criado lá).
2. Vá em **OAuth2 → General**.
3. Copie o **Client ID** e gere/copie o **Client Secret**.
4. Em **Redirects**, adicione:
   - `http://localhost:3000/api/auth/callback/discord` (para testar local)
   - `https://SEU-DOMINIO.vercel.app/api/auth/callback/discord` (depois do deploy)

## 2. Criar o banco de dados (Postgres)

Use qualquer Postgres gerenciado — mais fácil com Vercel:

1. No dashboard da Vercel: **Storage → Create Database → Postgres**
   (ou use https://neon.tech, que também tem plano gratuito).
2. Copie a `DATABASE_URL` (connection string) gerada.

## 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Preencha `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DATABASE_URL` e gere
o `NEXTAUTH_SECRET` com:

```bash
openssl rand -base64 32
```

## 4. Instalar e rodar localmente

```bash
npm install
npm run db:push   # cria as tabelas reais no banco (User, EconomyProfile)
npm run dev
```

Abra http://localhost:3000, clique em "Entrar com Discord" e faça login de
verdade — isso já cria seu usuário real no banco (visível em `npm run db:studio`).

## 5. Deploy na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Importe o repositório na Vercel.
3. Em **Settings → Environment Variables**, adicione as mesmas variáveis do
   `.env` (com `NEXTAUTH_URL` já apontando para o domínio da Vercel).
4. Depois do primeiro deploy, rode `npm run db:push` apontando para a
   `DATABASE_URL` de produção (pode ser local, só trocando a variável), para
   criar as tabelas lá também.
5. Atualize o redirect no Discord Developer Portal com a URL final da Vercel.

## Estrutura

- `src/app/page.tsx` — página inicial
- `src/app/comandos` — lista de comandos (edite `src/lib/commands.ts`)
- `src/app/ranking` — ranking real de economia, direto do banco
- `src/app/perfil` — perfil logado, com dados reais do Discord (avatar,
  servidores) e da economia (saldo, banco, nível)
- `src/lib/auth.ts` — configuração do login real com Discord (NextAuth)
- `prisma/schema.prisma` — modelos reais `User` e `EconomyProfile`

## Próximo passo natural

Quando o bot da Harumi existir, ele pode usar a **mesma `DATABASE_URL`** e os
mesmos modelos `User`/`EconomyProfile` — assim o saldo que aparece no site é
exatamente o saldo que o bot movimenta no Discord.

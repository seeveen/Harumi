export function getAvatarUrl(discordId: string, avatarHash: string | null, size = 128) {
  if (!avatarHash) {
    // Avatar padrão do Discord (baseado no id, igual o Discord faz)
    const fallbackIndex = Number(BigInt(discordId) % BigInt(6));
    return `https://cdn.discordapp.com/embed/avatars/${fallbackIndex}.png`;
  }
  const ext = avatarHash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.${ext}?size=${size}`;
}

export type DiscordGuild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
};

export async function fetchUserGuilds(accessToken: string): Promise<DiscordGuild[]> {
  const res = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export function getGuildIconUrl(guildId: string, icon: string | null) {
  if (!icon) return null;
  const ext = icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.${ext}?size=64`;
}

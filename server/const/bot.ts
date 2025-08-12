export const BOT_TOKEN = process.env.NITRO_BOT_TOKEN as string;
export const ADMIN_CHAT_IDS = (process.env.NITRO_ADMIN_CHAT_IDS as string)
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

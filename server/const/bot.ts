import 'dotenv/config';

export const BOT_TOKEN = process.env.NITRO_BOT_TOKEN as string;
export const BOT_INVITE_LINK = 'https://t.me/tronexapptesting_bot?start=invited_by_' as string;
export const ADMIN_CHAT_IDS = (process.env.NITRO_ADMIN_CHAT_IDS as string)
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

// export const CHANNEL_CHAT_ID = -1002774387090;
export const CHANNEL_CHAT_ID = -1002993341114;
export const MAIN_CHANNEL_LINK = 'https://t.me/TONminerEX';
export const MINI_APP_LINK = 'https://t.me/tronexapptesting_bot/startapp';
export const DOMAIN_URL = 'https://sequentially-titillated-cephalopod.cloudpub.ru';

import { ADMIN_CHAT_IDS, BOT_TOKEN, DOMAIN_URL, MAIN_CHANNEL_LINK, MINI_APP_LINK } from '~/const/bot';

export async function sendTelegramMessage(chatId: number | string, text: string) {
  try {
    await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        chat_id: chatId,
        text,
      },
    });
  } catch (error: any) {
    console.error(
      `Failed to send Telegram message to ${chatId}:`,
      error.response?.data || error.message || error
    );
  }
}

export async function sendTelegramMessageImageAndButtons(
  chatId: number | string,
  text: string,
  imageUrl: string
) {
  try {
    await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        chat_id: chatId,
        photo: `${DOMAIN_URL}/${imageUrl}`,
        caption: text,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🚀 Открыть мини-приложение', url: MINI_APP_LINK }],
            [{ text: '📢 Наш канал', url: MAIN_CHANNEL_LINK }],
          ],
        },
      },
    });
  } catch (error: any) {
    console.error(
      `Failed to send Telegram photo-message to ${chatId}:`,
      error.response?.data || error.message || error
    );
  }
}

export async function sendTelegramMessageAllAdmin(text: string) {
  for (const chatId of ADMIN_CHAT_IDS) {
    await sendTelegramMessage(chatId, text);
  }
}

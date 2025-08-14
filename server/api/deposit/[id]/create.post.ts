import { ADMIN_CHAT_IDS, BOT_TOKEN } from '~/const/bot';
import { models } from '~/db';

export default defineEventHandler(async (event) => {
   const id_tg = getRouterParam(event, 'id');
  const { network, wallet_address, amount } = await readBody(event);

  if (!id_tg || !amount || !network || !wallet_address) {
    return useApiError(event, 'bad-request');
  }

  const user = await models.User.findByPk(String(id_tg));

  if (!user) return useApiError(event, 'not-found-user');

  await models.Deposit.create({
    user_id_tg: id_tg,
    network,
    wallet_address,
    amount,
  });

  user.set({ investment_balance: parseFloat(user.investment_balance || '0') + parseFloat(amount) });

  const username = user.username || id_tg;
  const messageText = `💸 Новое пополнение:
  👤 Пользователь: ${username}
  💰 Сумма: ${amount} TON
  🌐 Сеть: ${network}
  🏦 Адрес: ${wallet_address}`;

  for (const chatId of ADMIN_CHAT_IDS) {
    try {
      await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          chat_id: chatId,
          text: messageText,
        },
      });
    } catch (error: any) {
      console.error(
        `Failed to send Telegram message to chatId ${chatId}:`,
        error.response?.data || error.message || error
      );
    }
  }

  return await user.save();
});

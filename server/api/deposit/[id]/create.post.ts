import { CHANNEL_CHAT_ID } from '~/const/bot';
import { models } from '~/db';

type RequestBody = {
  amount: string;
  wallet_address: string;
  network: string;
  hash: string;
};

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id');
  const { network, wallet_address, amount, hash } = await readBody<RequestBody>(event);

  if (!id_tg || !amount || !network || !wallet_address || !hash) {
    return useApiError(event, 'bad-request');
  }

  const user = await models.User.findByPk(String(id_tg));

  if (!user) return useApiError(event, 'not-found-user');

  await models.Deposit.create({
    user_id_tg: id_tg,
    network,
    wallet_address,
    amount,
    hash,
  });

  user.set({ investment_balance: parseFloat(user.investment_balance || '0') + parseFloat(amount) });

  const username = user.username || id_tg;
  const messageTextAdmin = `💸 Новое пополнение:
👤 Пользователь: ${username}
💰 Сумма: ${parseFloat(amount).toFixed(2)} TON
🌐 Сеть: ${network}
🏦 Адрес: <code>${wallet_address}</code>
📝 Txid: <code>${hash}</code>`;

  const messageTextChannel = `✅ Successful payout ✅

👤 User: ${username}
💰 Amount: ${amount} TON 
🏦 Txid: <code>${wallet_address}</code>`;

  await sendTelegramMessageAllAdmin(messageTextAdmin);
  await sendTelegramMessageImageAndButtons(CHANNEL_CHAT_ID, messageTextChannel, "payout-successful.jpg");

  return await user.save();
});

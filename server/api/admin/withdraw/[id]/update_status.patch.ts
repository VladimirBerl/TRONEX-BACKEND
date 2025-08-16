import { CHANNEL_CHAT_ID } from '~/const/bot';
import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { status, hash } = await readBody(event);

  if (!id || !status) {
    return useApiError(event, 'bad-request');
  }

  if (!['paid', 'rejected'].includes(status)) {
    return useApiError(event, 'bad-request', { detail: 'Invalid status' });
  }

  const withdrawal = await models.Withdrawal.findByPk(id);
  if (!withdrawal) return useApiError(event, 'not-found');

  if (withdrawal.status === 'paid' || withdrawal.status === 'rejected') {
    return useApiError(event, 'bad-request', { detail: 'Withdrawal already processed' });
  }

  const user = await models.User.findByPk(withdrawal.user_id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  const isPaid = status === 'paid';

  if (hash) {
    withdrawal.hash = hash;
  }
  withdrawal.status = status;
  await withdrawal.save();

  if (status === 'paid' || status === 'rejected') {
    const user = await models.User.findByPk(withdrawal.user_id_tg);
    if (user) {
      const message = isPaid ? 'Your withdrawal has been approved!✅💸' : 'Your withdrawal is rejected!❌';

      await sendTelegramMessage(user.id_tg, message);
      if (isPaid) {
        const messageChannelChat = `🚀 New withdrawal of funds 🚀

👤 User: ${user.username}
💰 Amount: ${parseFloat(withdrawal.amount).toFixed(2)} ${withdrawal.network}
🌐 Txid: <code>${withdrawal.hash}</code>`;
        sendTelegramMessageImageAndButtons(CHANNEL_CHAT_ID, messageChannelChat, 'ton-banner.jpg');
      }
    }
  }

  return withdrawal;
});

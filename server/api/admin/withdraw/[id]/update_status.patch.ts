import { BOT_TOKEN } from '~/const/bot';
import { models } from '~/db';

type RequestBody = {
  status: 'pending' | 'paid' | 'rejected';
};

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { status } = await readBody(event);

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

  withdrawal.status = status;
  await withdrawal.save();

  if (status === 'paid' || status === 'rejected') {
    const user = await models.User.findByPk(withdrawal.user_id_tg);
    if (user) {
      const message = status === 'paid' ? 'Вам одобрили вывод!✅💸' : 'Ваш вывод отклонен!❌';

      await $fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          chat_id: user.id_tg,
          text: message,
        },
      });
    }
  }

  return withdrawal;
});

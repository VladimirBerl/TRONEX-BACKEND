import { models } from '~/db';

type RequestQuery = {
  id_tg: string;
};

export default defineEventHandler(async (event) => {
  const { id_tg } = getQuery<RequestQuery>(event);

  if (!id_tg) {
    return useApiError(event, 'bad-request');
  }

  const user = await models.User.findByPk(id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  const withdraws = await models.Withdrawal.findAll({ where: { user_id_tg: id_tg } });

  if (!withdraws) {
    return useApiError(event, 'not-found', { detail: 'Withdrawals not found' });
  }

  return withdraws;
});

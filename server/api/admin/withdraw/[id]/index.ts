import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) return useApiError(event, 'bad-request');

  const withdrawal = await models.Withdrawal.findByPk(id);
  if (!withdrawal) return useApiError(event, 'not-found', { detail: 'Withdrawal not found' });

  const user = await models.User.findByPk(withdrawal.user_id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  return {
    username: user.username,
    ...withdrawal.dataValues,
  };
});

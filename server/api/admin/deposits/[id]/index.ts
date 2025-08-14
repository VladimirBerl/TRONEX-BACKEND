import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) return useApiError(event, 'bad-request');

  const deposit = await models.Deposit.findByPk(id);
  if (!deposit) return useApiError(event, 'not-found', { detail: 'Deposit not found' });

  const user = await models.User.findByPk(deposit.user_id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  return {
    username: user.username,
    ...deposit.dataValues,
  };
});

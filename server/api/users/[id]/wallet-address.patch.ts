import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id');
  const { wallet_address } = await readBody(event);
  if (!id_tg || !wallet_address) return useApiError(event, 'bad-request');

  const user = await models.User.findByPk(id_tg);

  if (!user) return useApiError(event, 'not-found-user');

  user.set({ wallet_address });
  await user.save();

  return user;
});

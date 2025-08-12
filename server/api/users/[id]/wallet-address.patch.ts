import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id');
  const { wallet_address } = await readBody(event);
  if (!id_tg) return useApiError(event, 'bad-request');
  if (!wallet_address && wallet_address !== null) return useApiError(event, 'bad-request');

  const user = await models.User.findByPk(id_tg);

  if (!user) return useApiError(event, 'not-found-user');

  user.set({ wallet_address });
  await user.save();

  return user;
});

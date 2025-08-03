import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id_tg');

  const user = models.User.findByPk(id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  return user;
});

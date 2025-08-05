import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id');
  if (!id_tg) return useApiError(event, 'bad-request');

  const user = await models.User.findByPk(id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  const levels = await models.Level.findAll();
  const userLevel = user.level;

  return levels.filter((level) => level.level >= userLevel);
});

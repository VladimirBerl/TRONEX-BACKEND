import { models } from '~/db';

type RequestBody = {
  ban: boolean;
};

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id_tg');
  const { ban } = await readBody<RequestBody>(event);

  console.log(ban, id_tg);

  const status = ban ? 'banned' : 'active';
  const user = await models.User.findByPk(id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  user.set({ status });

  return await user.save();
});

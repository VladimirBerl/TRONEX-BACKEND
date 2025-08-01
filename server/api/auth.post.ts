import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const { username, id_tg } = await readBody(event);

  if (!username || !id_tg) {
    return useApiError(event, 'bad-request');
  }

  let user = await models.User.findByPk(id_tg);

  if (!user) {
    user = await models.User.create({
      username,
      id_tg,
    });
  }

  await updataFarmBalanceOneHour(user);

  return user;
});

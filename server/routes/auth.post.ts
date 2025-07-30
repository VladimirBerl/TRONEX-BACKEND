import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const { username, id_tg } = await readBody(event);

  if (!username || !id_tg) {
    return createError({
      status: 400,
      message: 'Invalid body',
    });
  }

  let user = await models.User.findByPk(id_tg);

  if (!user) {
    user = await models.User.create({
      username,
      id_tg,
    });
  }

  return {
    id_tg: user.id_tg,
    username: user.username,
    level: user.level,
    investment_balance: user.investment_balance,
    farm_balance: user.farm_balance,
    clicks_today: user.clicks_today,
  };
});

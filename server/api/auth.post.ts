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

  return {
    id_tg: user.id_tg,
    username: user.username,
    level: user.level,
    investment_balance: user.investment_balance,
    farm_balance: user.farm_balance,
    clicks_today: user.clicks_today,
    clicks_today_reset_at: user.clicks_today_reset_at,
  };
});

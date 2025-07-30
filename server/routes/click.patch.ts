import { models } from '~/db';

const DAILY_CLICKS_LIMIT = 50;
const PRICE_PER_CLICK = 0.01;

type RequestBody = {
  id_tg: string;
  clicks: number;
};

export default defineEventHandler(async (event) => {
  const { id_tg, clicks } = await readBody<RequestBody>(event);

  if (!id_tg || typeof clicks !== 'number' || clicks <= 0) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
    });
  }

  const user = await models.User.findByPk(id_tg);

  if (!user) {
    return createError({
      status: 404,
      message: 'User not found',
    });
  }

  const clicksToday = user.clicks_today || 0;
  const farmBalance = parseFloat(user.farm_balance);

  if (clicksToday >= DAILY_CLICKS_LIMIT) {
    return createError({
      status: 400,
      message: 'Daily clicks limit exceeded',
    });
  }

  const remainingClicks = DAILY_CLICKS_LIMIT - clicksToday;
  const validClicks = Math.min(clicks, remainingClicks);
  const reward = validClicks * PRICE_PER_CLICK;

  user.set({
    farm_balance: farmBalance + reward,
    clicks_today: clicksToday + validClicks,
  });
  await user.save();

  return {
    status: 'ok',
    added_clicks: validClicks,
    reward_added: reward,
    farm_balance: user.farm_balance,
    clicks_today: user.clicks_today,
    message:
      validClicks < clicks
        ? `Partial reward added. ${clicks - validClicks} clicks exceeded limit.`
        : 'Reward added successfully.',
  };
});

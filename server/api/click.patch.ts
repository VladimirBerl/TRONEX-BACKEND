import { models } from '~/db';
import { isSameDay } from 'date-fns';

const DAILY_CLICKS_LIMIT = 50;
const PRICE_PER_CLICK = 0.01;

type RequestBody = {
  id_tg: string;
  clicks: number;
};

export default defineEventHandler(async (event) => {
  const { id_tg, clicks } = await readBody<RequestBody>(event);

  if (!id_tg || typeof clicks !== 'number' || clicks <= 0) {
    return useApiError(event, 'bad-request');
  }

  const user = await models.User.findByPk(id_tg);

  if (!user) {
    return useApiError(event, 'not-found-user');
  }

  const now = new Date();
  const lastReset = user.clicks_today_reset_at;

  if (!isSameDay(now, lastReset)) {
    user.set({
      clicks_today: 0,
      clicks_today_reset_at: now,
    });
    await user.save();
  }

  // const now = new Date();
  // const lastReset = user.clicks_today_reset_at;

  // const diffMs = now.getTime() - lastReset.getTime(); // разница в миллисекундах
  // const diffMinutes = diffMs / (1000 * 60); // разница в минутах

  // if (diffMinutes >= 1) {
  //   user.set({
  //     clicks_today: 0,
  //     clicks_today_reset_at: now,
  //   });
  //   await user.save();
  // }

  const clicksToday = user.clicks_today || 0;
  const farmBalance = parseFloat(user.farm_balance);

  if (clicksToday >= DAILY_CLICKS_LIMIT) {
    return useApiError(event, 'bad-request', {
      detail: 'Daily limit exceeded',
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
    added_clicks: validClicks,
    reward_added: reward,
    farm_balance: user.farm_balance,
    clicks_today: user.clicks_today,
    detail:
      validClicks < clicks
        ? `Partial reward added. ${clicks - validClicks} clicks exceeded limit.`
        : 'Reward added successfully.',
  };
});

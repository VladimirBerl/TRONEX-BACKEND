import { UserInstance } from '~/db/models/user';
import { isSameDay } from 'date-fns';
import { models } from '~/db';

const determinePercentage = async (level: number) => {
  const levels = models.Level.findAll();
  const percent = (await levels).find((l) => l.level === level).percent;
  return percent ?? 2;
};

export const updataFarmBalanceOneHour = async (user: UserInstance): Promise<boolean> => {
  const now = new Date();
  const lastReset = user.farm_balance_reset_at;

  if (isSameDay(now, lastReset)) return;

  const investmentBalance = parseFloat(user.investment_balance || '0');
  const farmBalance = parseFloat(user.farm_balance || '0');
  const percent = await determinePercentage(user.level);

  const reward = 24 * ((percent / 100) * investmentBalance);

  user.set({
    farm_balance: farmBalance + reward,
    farm_balance_reset_at: now,
  });

  await user.save();
  return true;
};

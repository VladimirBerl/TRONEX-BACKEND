import { models } from '~/db';

const BONUS_INVESTMENT_BALANCE = 1.0;

type RequestBody = {
  id_tg: string;
};

export default defineEventHandler(async (event) => {
  const { id_tg } = await readBody<RequestBody>(event);
  if (!id_tg) return useApiError(event, 'bad-request', { detail: 'Missing id_tg' });

  const user = await models.User.findByPk(id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  const nextLevel = await models.Level.findByPk(user.level + 1);
  if (!nextLevel) return useApiError(event, 'not-found', { detail: 'Next level not found' });

  const investmentBalance = parseFloat(user.investment_balance || '0');
  const effectiveBalance = investmentBalance - BONUS_INVESTMENT_BALANCE;
  const levelPrice = parseFloat(nextLevel.price || '0');

  if (effectiveBalance < levelPrice)
    return useApiError(event, 'bad-request', {
      detail: `Insufficient funds: need ${levelPrice - effectiveBalance} TON more`,
    });

  const newInvestmentBalance = effectiveBalance - levelPrice + BONUS_INVESTMENT_BALANCE;
  user.set({
    level: user.level + 1,
    investment_balance: newInvestmentBalance.toFixed(18),
  });
  await user.save();

  return {
    message: `Level upgraded to ${user.level}`,
    level: user.level,
    investment_balance: user.investment_balance,
  };
});

import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const { count: countWithdrawal } = await models.Withdrawal.findAndCountAll();
  const { count: countDeposit } = await models.Deposit.findAndCountAll();
  const { count: countUser } = await models.User.findAndCountAll();

  if (!countWithdrawal || !countUser || !countDeposit) return useApiError(event, 'bad-request');

  return {
    totalUser: countUser,
    totalWithdrawal: countWithdrawal,
    totalDeposit: countDeposit,
  };
});

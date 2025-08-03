import { models } from '~/db';
import { setWithdrawBalance } from '~/utils/set-withdraw-balance';

export default defineEventHandler(async (event) => {
  const { id_tg, network, wallet_address, amount } = await readBody(event);

  if (!id_tg || !network || !wallet_address || !amount) {
    return useApiError(event, 'bad-request');
  }

  const user = await models.User.findByPk(id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  const userBalance = parseFloat(user.investment_balance || '0') + parseFloat(user.farm_balance || '0');

  if (amount < 0.5) {
    return useApiError(event, 'bad-request', { detail: 'Minimum amount is 0.5 TON' });
  }

  if (userBalance < parseFloat(amount)) {
    return useApiError(event, 'bad-request', {
      detail: `Insufficient funds: need ${amount - userBalance} TON more`,
    });
  }

  const withdrawal = await models.Withdrawal.create({
    user_id_tg: id_tg,
    network,
    wallet_address,
    amount,
    status: 'pending',
  });

  const { newFarmBalance, newInvestmentBalance } = setWithdrawBalance(
    user.investment_balance,
    user.farm_balance,
    amount
  );

  user.set({
    farm_balance: newFarmBalance.toFixed(18),
    investment_balance: newInvestmentBalance.toFixed(18),
  });
  await user.save();

  return withdrawal;
});

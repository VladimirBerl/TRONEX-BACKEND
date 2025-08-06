import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const { id_tg, amount } = await readBody(event);

  if (!id_tg || !amount) {
    return useApiError(event, 'bad-request');
  }

  const user = await models.User.findByPk(String(id_tg));

  if (!user) {
    return useApiError(event, 'not-found-user');
  }

  user.set({ investment_balance: parseFloat(user.investment_balance || '0') + parseFloat(amount) });
  return await user.save();
});

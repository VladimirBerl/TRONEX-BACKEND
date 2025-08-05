import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id');
  if (!id_tg) return useApiError(event, 'bad-request');

  const user = await models.User.findByPk(id_tg);
  if (!user) return useApiError(event, 'not-found-user');

  return {
    all_referrals: 0,
    all_referrals_deposit: 0,
    invite_link: `https://t.me/tronexapptesting_bot?start=invited_by_${id_tg}`,
    deposit_amount: 0,
  };
});

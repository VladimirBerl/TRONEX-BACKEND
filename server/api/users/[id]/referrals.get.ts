import { BOT_INVITE_LINK } from '~/const/bot';
import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id');
  if (!id_tg) return useApiError(event, 'bad-request');

  const user = await models.User.findByPk(id_tg, {
    include: [
      {
        model: models.Referral,
        as: 'Referrals',
      },
    ],
  });

  if (!user) return useApiError(event, 'not-found-user');

  const all_referrals_deposit = await Promise.all(
    user.Referrals.map(async (ref) => {
      const invitedUser = await models.User.findByPk(ref.invited_id_tg);
      return invitedUser ? parseFloat(invitedUser.deposit || '0') : 0;
    })
  )
    .then((deposits) => deposits.reduce((sum, val) => sum + val, 0))
    .catch(() => 0);

  return {
    all_referrals: user.Referrals.length,
    all_referrals_deposit,
    invite_link: BOT_INVITE_LINK + id_tg,
    deposit_amount: user.deposit,
  };
});

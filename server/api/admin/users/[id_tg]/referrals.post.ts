import { models } from '~/db';

type RequestBody = {
  invited_id_tg: string;
};

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id_tg');
  const { invited_id_tg } = await readBody<RequestBody>(event);

  if (!id_tg || !invited_id_tg) {
    return useApiError(event, 'bad-request', { detail: 'Missing id_tg or invited_id_tg' });
  }

  if (id_tg === invited_id_tg) {
    return useApiError(event, 'bad-request', { detail: 'You cannot invite yourself' });
  }

  const inviterUser = await models.User.findByPk(id_tg);
  console.log('inviterUser', !!inviterUser);

  if (!inviterUser) {
    return useApiError(event, 'not-found', {
      detail: 'Inviter user not found',
    });
  }

  const invitedUser = await models.User.findByPk(invited_id_tg);
  console.log('invitedUser', `ID:${invited_id_tg}`, !!invitedUser);

  if (!invitedUser) {
    return useApiError(event, 'not-found', {
      detail: 'Invited user not found',
    });
  }

  const [referral, created] = await models.Referral.findOrCreate({
    where: { invited_id_tg },
    defaults: {
      inviter_id_tg: id_tg,
      invited_id_tg,
    },
  });

  console.log({
    referral,
    created,
  });

  return {
    referral,
    created,
  };
});

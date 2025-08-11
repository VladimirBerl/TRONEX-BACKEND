import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const { username, id_tg } = await readBody(event);

  if (!username || !id_tg) {
    return useApiError(event, 'bad-request');
  }

  const [user] = await models.User.findOrCreate({
    where: { id_tg: String(id_tg) },
    defaults: { username },
  });

  await updataFarmBalanceOneHour(user);

  return {
    ...user.dataValues,
    wallet_address: user.wallet_address || null,
  };
});

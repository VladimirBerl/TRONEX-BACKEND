import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id_tg = getRouterParam(event, 'id');
  const { page = '1', limit = '10' } = getQuery(event);
  const pageNum = parseFloat(page as string);
  const limitNum = parseFloat(limit as string);

  if (!id_tg) {
    return useApiError(event, 'bad-request');
  }

  const user = await models.User.findByPk(String(id_tg));
  if (!user) return useApiError(event, 'not-found-user');

  const { rows, count } = await models.Deposit.findAndCountAll({
    where: { user_id_tg: id_tg },
    limit: limitNum,
    offset: (pageNum - 1) * limitNum,
    order: [['createdAt', 'DESC']],
  });

  return {
    total: count,
    page: pageNum,
    deposits: rows,
  };
});

import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const { page = '1', limit = '10' } = getQuery(event);
  const pageNum = parseFloat(page as string);
  const limitNum = parseFloat(limit as string);

  const { rows, count } = await models.Deposit.findAndCountAll({
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

import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const { page = '1', limit = '10' } = getQuery(event);
  const id_tg = getRouterParam(event, 'id');

  if (!id_tg) {
    return useApiError(event, 'bad-request');
  }

  const pageNum = parseFloat(page as string);
  const limitNum = parseFloat(limit as string);

  const { rows, count } = await models.UserTask.findAndCountAll({
    where: { id_tg },
    limit: limitNum,
    offset: (pageNum - 1) * limitNum,
    order: [['createdAt', 'DESC']],
  });

  const userTasksRow = await Promise.all(
    rows.map(async (userTask) => {
      const task = await models.Task.findByPk(userTask.task_id);
      if (!task) return null;

      return {
        id: task.id,
        title: task.title,
        status: userTask.status,
        reward: task.reward,
        reward_issued: userTask.reward_issued,
        url: task.url,
        imageUrl: task.imageUrl,
      };
    })
  );

  return {
    total: count,
    page: pageNum,
    tasks: userTasksRow.filter(Boolean),
  };
});

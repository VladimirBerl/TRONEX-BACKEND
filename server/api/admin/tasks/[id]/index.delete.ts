import { models } from '~/db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) return useApiError(event, 'bad-request');

  const task = await models.Task.findByPk(id);
  if (!task) return useApiError(event, 'not-found');

  const userTasks = await models.UserTask.findAll({ where: { task_id: id } });
  for (const userTask of userTasks) {
    await userTask.destroy();
  }

  await task.destroy();

  return task;
});

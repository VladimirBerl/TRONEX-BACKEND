import { db, models } from '~/db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { id_tg } = await readBody(event);
  if (!id || !id_tg) return useApiError(event, 'bad-request');

  const user = await models.User.findByPk(id_tg);
  if (!user) {
    return useApiError(event, 'not-found-user');
  }

  const task = await models.Task.findByPk(id);
  const userTasks = await models.UserTask.findOne({ where: { id_tg, task_id: id } });
  if (!task || !userTasks) {
    return useApiError(event, 'not-found', {
      detail: 'Task not found',
    });
  }

  const userTaskStatus = userTasks.status;

  if (userTaskStatus === 'pending') {
    userTasks.set({ status: 'checking' });
    await userTasks.save();

    return {
      status: userTasks.status,
    };
  }

  if (userTaskStatus === 'checking') {
    const t = await (await db()).transaction();

    try {
      userTasks.set({ status: 'completed', reward_issued: true });
      await userTasks.save({ transaction: t });

      user.set({
        farm_balance: parseFloat(user.farm_balance || '0') + parseFloat(task.reward),
      });
      await user.save({ transaction: t });

      await t.commit();

      return {
        reward: task.reward,
        status: userTasks.status,
      };
    } catch (error) {
      await t.rollback();
      return useApiError(event, 'bad-request', {
        detail: error,
      });
    }
  }

  if (userTaskStatus === 'completed') {
    return useApiError(event, 'bad-request', {
      detail: 'Task already completed',
    });
  }
});

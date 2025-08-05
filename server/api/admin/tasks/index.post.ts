import { models } from '~/db';

type RequestBody = {
  title: string;
  reward: string;
  url: string;
  imageFileId: string;
  imageUrl: string;
};

export default defineEventHandler(async (event) => {
  const { title, reward, url, imageFileId, imageUrl } = await readBody<RequestBody>(event);
  if (!title || !reward || !url || !imageFileId || !imageUrl) {
    return useApiError(event, 'bad-request');
  }
  const task = await models.Task.create({ title, reward, url, imageFileId, imageUrl });
  const allUsers = await models.User.findAll();

  for (const user of allUsers) {
    await models.UserTask.create({ id_tg: user.id_tg, task_id: task.id });
  }
  return task;
});

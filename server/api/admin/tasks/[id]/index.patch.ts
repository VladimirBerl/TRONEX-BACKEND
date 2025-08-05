import { models } from '~/db';

type RequestBody = {
  title: string;
  reward: string;
  url: string;
  imageFileId: string;
  imageUrl: string;
};

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { title, reward, url, imageFileId, imageUrl } = await readBody<RequestBody>(event);
  if (!id || !title || !reward || !url || !imageFileId || !imageUrl) {
    return useApiError(event, 'bad-request');
  }

  const task = await models.Task.findByPk(id);
  if (!task) return useApiError(event, 'not-found');

  task.set({ title, reward, url, imageFileId, imageUrl });
  return await task.save();
});

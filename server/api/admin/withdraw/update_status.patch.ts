import { models } from "~/db";

export default defineEventHandler(async (event) => {
  const { id, status } = await readBody(event);

  if (!id || !status) {
    return useApiError(event, 'bad-request');
  }

  if (!['paid', 'rejected'].includes(status)) {
    return useApiError(event, 'bad-request', { detail: 'Invalid status' });
  }

  const withdrawal = await models.Withdrawal.findByPk(id);
  if (!withdrawal) return useApiError(event, 'not-found');

  withdrawal.status = status;
  await withdrawal.save();

  return withdrawal;
});

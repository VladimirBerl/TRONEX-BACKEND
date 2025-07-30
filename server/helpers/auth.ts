export const checkValidInitDataRaw = (combiner, initDataRaw: string | undefined) => {
  if (!initDataRaw) return combiner.set('initDataRaw', 'initDataRaw is required');
};

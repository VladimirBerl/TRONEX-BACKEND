import { models } from '~/db';

export default defineEventHandler(async (event) => {
  return (await models.Level.findAll()).map((level) => ({
    level: level.level,
    price: level.price,
    percent: level.percent,
  }));
});

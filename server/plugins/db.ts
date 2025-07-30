import { db } from '~/db';

export default defineNitroPlugin(async () => {
  await db();
  console.log('✅ DB initialized');
});

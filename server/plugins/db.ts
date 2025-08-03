import { db } from '~/db';

export default defineNitroPlugin(async () => {
  console.log('🔌 Connecting to DB...');
  
  await db();
  console.log('✅ DB initialized');
});

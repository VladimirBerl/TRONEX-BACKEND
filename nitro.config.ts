export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-07-26',
  runtimeConfig: {
    databaseUrl: 'DATABASE_URL',
    jwtSecret: 'JWT_SECRET',
    botToken: 'BOT_TOKEN',
  },
});

export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-07-26',
  runtimeConfig: {
    databaseUrl: 'NITRO_DATABASE_URL',
    jwtSecret: 'NITRO_JWT_SECRET',
  },
});

export default defineEventHandler((event) => {
  assertMethod(event, 'GET');
  const contentType = getRequestHeader(event, 'content-type'); // "application/json"

  return useRuntimeConfig(event).jwtSecret;
});

export default defineEventHandler((event) => {
  setHeader(event, 'Access-Control-Allow-Origin', '*');
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 200);
    return '';
  }
});

export default defineEventHandler((event) => {
  setHeader(event, 'Access-Control-Allow-Origin', 'https://delightedly-original-shrike.cloudpub.ru');
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

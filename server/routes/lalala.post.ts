type requestBody = {
  key: string;
};

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => {
    return typeof body === 'object' && body !== null && 'key' in body;
  });

  const headers = getResponseHeaders(event);
  console.log(headers);

  if (!body) {
    setResponseStatus(event, 400, 'Invalid body');
    return { detail: 'Invalid body' };
  }

  setResponseStatus(event, 200, body.toString());
  return body;
});

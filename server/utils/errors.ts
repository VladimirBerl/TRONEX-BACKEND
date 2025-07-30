import { H3Event } from 'h3';

type TokenErrorType = 'bad-request' | 'not-found';

interface ApiErrorResponse {
  detail: string;
}

const errorDetails: Record<TokenErrorType, { status: number; message: string; detail: string }> = {
  'bad-request': {
    status: 400,
    message: 'Bad request',
    detail: 'Invalid request body',
  },
  'not-found': {
    status: 404,
    message: 'Not found',
    detail: 'Resource not found',
  },
};

export const useApiError = (
  event: H3Event,
  type: TokenErrorType,
  msg?: string | { detail: any }
): ApiErrorResponse => {
  const error = errorDetails[type];

  setResponseStatus(event, error.status, error.message);

  if (typeof msg === 'string') {
    return { detail: msg };
  } else if (typeof msg === 'object' && msg.hasOwnProperty('detail')) {
    return msg;
  } else {
    return error;
  }
};

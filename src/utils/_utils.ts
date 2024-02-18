export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  };
}

export function resultSuccess<T>(result: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  };
}


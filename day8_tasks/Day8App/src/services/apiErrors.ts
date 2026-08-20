export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  isTimeout?: boolean;
}

export function normalizeError(error: any): ApiError {
  if (error.name === 'AbortError' || error.isTimeout) {
    return {
      message: 'The request timed out. Please check your connection and try again.',
      isTimeout: true,
      code: 'TIMEOUT',
    };
  }

  if (error.status) {
    return {
      message: error.message || `An error occurred with status ${error.status}`,
      status: error.status,
      code: error.code || 'HTTP_ERROR',
    };
  }

  if (error.message === 'Network request failed') {
    return {
      message: 'Network connection failed. Please check your internet.',
      code: 'NETWORK_ERROR',
    };
  }

  return {
    message: error.message || 'An unexpected error occurred.',
    code: 'UNKNOWN_ERROR',
  };
}
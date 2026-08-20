import { normalizeError, ApiError } from './apiErrors';
import { retryRequest } from './retryHelper';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const DEFAULT_TIMEOUT = 10000;

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

async function fetchWithTimeout(url: string, options: RequestOptions = {}): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      const timeoutError: ApiError = { message: 'Request timed out', isTimeout: true };
      throw timeoutError;
    }
    throw error;
  }
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { retries = 2, ...fetchOptions } = options;
  const url = `${BASE_URL}${endpoint}`;

  const makeCall = async (): Promise<T> => {
    try {
      const response = await fetchWithTimeout(url, fetchOptions);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: errorBody.message || `HTTP error! status: ${response.status}`,
        };
      }

      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
      throw normalizeError(error);
    }
  };

  return retryRequest(makeCall, { retries });
}
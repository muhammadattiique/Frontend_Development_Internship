interface RetryOptions {
  retries?: number;
  delayMs?: number;
}

export async function retryRequest<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { retries = 3, delayMs = 1000 } = options;

  try {
    return await fn();
  } catch (error: any) {
    if (error.status && error.status >= 400 && error.status < 500) {
      throw error;
    }

    if (retries <= 0) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));

    return retryRequest(fn, { retries: retries - 1, delayMs: delayMs * 2 });
  }
}
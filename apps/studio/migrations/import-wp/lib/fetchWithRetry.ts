type RetryOptions = {
  retries?: number;
  baseDelayMs?: number;
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(status: number) {
  return status === 429 || status >= 500;
}

export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  options: RetryOptions = {}
) {
  const retries = options.retries ?? 4;
  const baseDelayMs = options.baseDelayMs ?? 500;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(input, init);
      if (response.ok || !shouldRetryStatus(response.status) || attempt === retries) {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (attempt === retries) {
        throw error;
      }
    }

    const backoff = baseDelayMs * (attempt + 1);
    await wait(backoff);
  }

  throw lastError instanceof Error ? lastError : new Error("Fetch failed after retries");
}

export type AIProvider = "gemini" | "ark";

export type AIProviderErrorOptions = {
  status?: number;
  retryable?: boolean;
  cause?: unknown;
};

export class AIProviderError extends Error {
  readonly provider: AIProvider;
  readonly status?: number;
  readonly retryable: boolean;

  constructor(provider: AIProvider, message: string, options: AIProviderErrorOptions = {}) {
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = "AIProviderError";
    this.provider = provider;
    this.status = options.status;
    this.retryable = options.retryable ?? false;
  }
}

export function isRetryableStatus(status: number | undefined): boolean {
  if (status === undefined) return false;
  return status === 429 || status >= 500;
}

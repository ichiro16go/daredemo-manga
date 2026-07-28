type BucketState = {
  tokens: number;
  lastRefillAt: number;
};

/**
 * プロバイダごとのトークンバケット式レート制限。
 * MVPは単一Nextインスタンス想定のためインメモリで十分(複数インスタンス運用時はRedis等に置き換える)。
 */
export class RateLimiter {
  private readonly buckets = new Map<string, BucketState>();

  constructor(
    private readonly capacity: number,
    private readonly refillPerMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  async acquire(key: string, sleep: (ms: number) => Promise<void> = defaultSleep): Promise<void> {
    for (;;) {
      const nowMs = this.now();
      const bucket = this.buckets.get(key) ?? { tokens: this.capacity, lastRefillAt: nowMs };
      const elapsed = Math.max(0, nowMs - bucket.lastRefillAt);
      const refilled = Math.min(this.capacity, bucket.tokens + elapsed * this.refillPerMs);

      if (refilled >= 1) {
        this.buckets.set(key, { tokens: refilled - 1, lastRefillAt: nowMs });
        return;
      }

      this.buckets.set(key, { tokens: refilled, lastRefillAt: nowMs });
      const waitMs = (1 - refilled) / this.refillPerMs;
      await sleep(waitMs);
    }
  }
}

function defaultSleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

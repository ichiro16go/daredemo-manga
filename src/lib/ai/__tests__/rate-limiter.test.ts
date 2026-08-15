import { describe, expect, it } from "vitest";
import { RateLimiter } from "../rate-limiter";

describe("RateLimiter", () => {
  it("容量内であれば待たずにトークンを払い出す", async () => {
    let now = 0;
    const limiter = new RateLimiter(2, 1 / 1000, () => now);
    const waits: number[] = [];
    const sleep = async (ms: number) => {
      waits.push(ms);
      now += ms;
    };

    await limiter.acquire("gemini", sleep);
    await limiter.acquire("gemini", sleep);

    expect(waits).toHaveLength(0);
  });

  it("容量を使い切ったら補充されるまで待つ", async () => {
    let now = 0;
    const limiter = new RateLimiter(1, 1 / 1000, () => now);
    const sleep = async (ms: number) => {
      now += ms;
    };

    await limiter.acquire("ark", sleep);
    await limiter.acquire("ark", sleep);

    expect(now).toBeGreaterThan(0);
  });

  it("キーが異なれば独立してトークンを管理する", async () => {
    let now = 0;
    const limiter = new RateLimiter(1, 1 / 1000, () => now);
    const waits: number[] = [];
    const sleep = async (ms: number) => {
      waits.push(ms);
      now += ms;
    };

    await limiter.acquire("gemini", sleep);
    await limiter.acquire("ark", sleep);

    expect(waits).toHaveLength(0);
  });
});

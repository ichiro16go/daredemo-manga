import { describe, expect, it, vi } from "vitest";
import { withRetry } from "../retry";
import { AIProviderError } from "../errors";

const noopSleep = async () => {};

describe("withRetry", () => {
  it("成功時はリトライせず結果を返す", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await withRetry(fn, { sleep: noopSleep });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retryableなエラーは最大試行回数までリトライする", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new AIProviderError("gemini", "rate limited", { retryable: true }))
      .mockRejectedValueOnce(new AIProviderError("gemini", "rate limited", { retryable: true }))
      .mockResolvedValue("ok");

    const result = await withRetry(fn, { sleep: noopSleep, maxAttempts: 3 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("最大試行回数を超えたら最後のエラーをthrowする", async () => {
    const error = new AIProviderError("gemini", "still failing", { retryable: true });
    const fn = vi.fn().mockRejectedValue(error);

    await expect(withRetry(fn, { sleep: noopSleep, maxAttempts: 2 })).rejects.toBe(error);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("retryableでないエラーは即座にthrowする(リトライしない)", async () => {
    const error = new AIProviderError("gemini", "bad request", { retryable: false });
    const fn = vi.fn().mockRejectedValue(error);

    await expect(withRetry(fn, { sleep: noopSleep, maxAttempts: 5 })).rejects.toBe(error);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

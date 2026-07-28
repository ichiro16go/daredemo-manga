import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AIProviderError } from "../errors";

describe("ark.generateImage", () => {
  const originalFetch = global.fetch;
  const originalApiKey = process.env.ARK_API_KEY;

  beforeEach(() => {
    process.env.ARK_API_KEY = "test-key";
    vi.resetModules();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.ARK_API_KEY = originalApiKey;
    vi.restoreAllMocks();
  });

  it("APIキー未設定なら retryable=false のAIProviderErrorを投げる", async () => {
    delete process.env.ARK_API_KEY;
    const { generateImage } = await import("../ark");

    await expect(generateImage({ prompt: "test" })).rejects.toMatchObject({
      provider: "ark",
      retryable: false,
    });
  });

  it("生成APIが画像URLを返し、画像バイナリを取得できる", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [{ url: "https://example.com/generated.png" }] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: async () => new ArrayBuffer(8),
        headers: new Headers({ "content-type": "image/png" }),
      });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { generateImage } = await import("../ark");
    const result = await generateImage({ prompt: "test" });

    expect(result.mimeType).toBe("image/png");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("429エラーはretryable=trueのAIProviderErrorに変換する", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ message: "rate limited" }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { generateImage } = await import("../ark");

    await expect(generateImage({ prompt: "test" })).rejects.toMatchObject({
      provider: "ark",
      status: 429,
      retryable: true,
    } satisfies Partial<AIProviderError>);
  });

  it("400エラーはretryable=falseのAIProviderErrorに変換する", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: "bad request" }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { generateImage } = await import("../ark");

    await expect(generateImage({ prompt: "test" })).rejects.toMatchObject({
      provider: "ark",
      status: 400,
      retryable: false,
    } satisfies Partial<AIProviderError>);
  });
});

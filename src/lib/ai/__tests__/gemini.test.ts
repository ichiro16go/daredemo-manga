import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createMock = vi.fn();

vi.mock("@google/genai", () => ({
  GoogleGenAI: vi.fn().mockImplementation(function GoogleGenAIMock() {
    return { interactions: { create: createMock } };
  }),
}));

describe("gemini.generateImage", () => {
  const originalApiKey = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    process.env.GEMINI_API_KEY = "test-key";
    createMock.mockReset();
    vi.resetModules();
  });

  afterEach(() => {
    process.env.GEMINI_API_KEY = originalApiKey;
  });

  it("APIキー未設定なら retryable=false のAIProviderErrorを投げる", async () => {
    delete process.env.GEMINI_API_KEY;
    const { generateImage } = await import("../gemini");

    await expect(generateImage({ prompt: "test" })).rejects.toMatchObject({
      provider: "gemini",
      retryable: false,
    });
  });

  it("output_image.dataが返れば画像バッファに変換する", async () => {
    createMock.mockResolvedValue({
      output_image: { type: "image", data: Buffer.from("hello").toString("base64"), mime_type: "image/png" },
    });

    const { generateImage } = await import("../gemini");
    const result = await generateImage({ prompt: "test" });

    expect(result.mimeType).toBe("image/png");
    expect(result.data.toString()).toBe("hello");
  });

  it("画像データが無ければAIProviderErrorを投げる", async () => {
    createMock.mockResolvedValue({ output_text: "画像は生成されませんでした" });

    const { generateImage } = await import("../gemini");

    await expect(generateImage({ prompt: "test" })).rejects.toMatchObject({
      provider: "gemini",
    });
  });

  it("SDKが429相当のエラーを投げたらretryable=trueに変換する", async () => {
    createMock.mockRejectedValue({ status: 429, message: "rate limited" });

    const { generateImage } = await import("../gemini");

    await expect(generateImage({ prompt: "test" })).rejects.toMatchObject({
      provider: "gemini",
      status: 429,
      retryable: true,
    });
  });
});

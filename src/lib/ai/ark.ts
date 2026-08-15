import { AIProviderError, isRetryableStatus } from "./errors";
import { withRetry } from "./retry";
import { RateLimiter } from "./rate-limiter";

const ARK_IMAGE_ENDPOINT = "https://ark.ap-southeast.bytepluses.com/api/v3/images/generations";
const DEFAULT_MODEL = "seedream-4-5-251128";
const DEFAULT_SIZE = "1024x1024";

const rateLimiter = new RateLimiter(3, 3 / 1000);

export type GenerateImageInput = {
  prompt: string;
  size?: string;
  model?: string;
};

export type GeneratedImage = {
  data: ArrayBuffer;
  mimeType: string;
};

export async function generateImage({
  prompt,
  size = DEFAULT_SIZE,
  model = DEFAULT_MODEL,
}: GenerateImageInput): Promise<GeneratedImage> {
  const apiKey = process.env.ARK_API_KEY;
  if (!apiKey) {
    throw new AIProviderError("ark", "ARK_API_KEY is not configured");
  }

  return withRetry(async () => {
    await rateLimiter.acquire("ark");

    const imageUrl = await requestImageUrl({ apiKey, prompt, size, model });
    return fetchImage(imageUrl);
  });
}

async function requestImageUrl({
  apiKey,
  prompt,
  size,
  model,
}: {
  apiKey: string;
  prompt: string;
  size: string;
  model: string;
}): Promise<string> {
  let response: Response;
  try {
    response = await fetch(ARK_IMAGE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, prompt, size, watermark: false }),
    });
  } catch (error) {
    throw new AIProviderError("ark", "ARK APIへの接続に失敗しました", {
      retryable: true,
      cause: error,
    });
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}) as { message?: string });
    throw new AIProviderError("ark", body.message ?? `ARK API request failed with status ${response.status}`, {
      status: response.status,
      retryable: isRetryableStatus(response.status),
    });
  }

  const json = (await response.json()) as { data?: Array<{ url?: string }> };
  const imageUrl = json.data?.[0]?.url;
  if (!imageUrl) {
    throw new AIProviderError("ark", "ARK APIレスポンスに画像URLが含まれていません");
  }
  return imageUrl;
}

async function fetchImage(imageUrl: string): Promise<GeneratedImage> {
  let response: Response;
  try {
    response = await fetch(imageUrl);
  } catch (error) {
    throw new AIProviderError("ark", "生成された画像の取得に失敗しました", {
      retryable: true,
      cause: error,
    });
  }

  if (!response.ok) {
    throw new AIProviderError("ark", "生成された画像の取得に失敗しました", {
      status: response.status,
      retryable: isRetryableStatus(response.status),
    });
  }

  return {
    data: await response.arrayBuffer(),
    mimeType: response.headers.get("content-type") ?? "image/png",
  };
}

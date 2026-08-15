import { GoogleGenAI } from "@google/genai";
import { AIProviderError, isRetryableStatus } from "./errors";
import { withRetry } from "./retry";
import { RateLimiter } from "./rate-limiter";

const DEFAULT_MODEL = "gemini-3-pro-image-preview";

// Gemini Developer APIの実測レート制限に対する保険。実際の上限が判明したら調整する。
const rateLimiter = new RateLimiter(5, 5 / 1000);

export type ReferenceImage = {
  data: string; // base64
  mimeType: string;
};

export type GenerateImageInput = {
  prompt: string;
  referenceImage?: ReferenceImage;
  model?: string;
};

export type GeneratedImage = {
  data: Buffer;
  mimeType: string;
};

let client: GoogleGenAI | undefined;

function getClient(): GoogleGenAI {
  if (client) return client;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AIProviderError("gemini", "GEMINI_API_KEY is not configured");
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}

export async function generateImage({
  prompt,
  referenceImage,
  model = DEFAULT_MODEL,
}: GenerateImageInput): Promise<GeneratedImage> {
  const ai = getClient();

  return withRetry(async () => {
    await rateLimiter.acquire("gemini");

    const input = referenceImage
      ? [
          { type: "text" as const, text: prompt },
          {
            type: "image" as const,
            data: referenceImage.data,
            mime_type: referenceImage.mimeType,
          },
        ]
      : prompt;

    const interaction = await withProviderErrorHandling(() =>
      ai.interactions.create({
        model,
        input,
        response_modalities: ["image"],
      }),
    );

    const image = interaction.output_image;
    if (image?.data) {
      return {
        data: Buffer.from(image.data, "base64"),
        mimeType: image.mime_type ?? "image/png",
      };
    }

    if (image?.uri) {
      const fetched = await fetchImage(image.uri);
      return fetched;
    }

    throw new AIProviderError("gemini", "Geminiのレスポンスに画像データが含まれていません");
  });
}

async function withProviderErrorHandling<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const status = extractStatus(error);
    throw new AIProviderError("gemini", extractMessage(error), {
      status,
      retryable: isRetryableStatus(status),
      cause: error,
    });
  }
}

async function fetchImage(uri: string): Promise<GeneratedImage> {
  let response: Response;
  try {
    response = await fetch(uri);
  } catch (error) {
    throw new AIProviderError("gemini", "生成された画像の取得に失敗しました", {
      retryable: true,
      cause: error,
    });
  }

  if (!response.ok) {
    throw new AIProviderError("gemini", "生成された画像の取得に失敗しました", {
      status: response.status,
      retryable: isRetryableStatus(response.status),
    });
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    data: Buffer.from(arrayBuffer),
    mimeType: response.headers.get("content-type") ?? "image/png",
  };
}

function extractStatus(error: unknown): number | undefined {
  if (typeof error === "object" && error !== null && "status" in error) {
    const status = (error as { status?: unknown }).status;
    return typeof status === "number" ? status : undefined;
  }
  return undefined;
}

function extractMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Gemini API request failed";
}

/**
 * Configuração central de APIs de IA
 * WM3 Digital - AI Services Stack
 */

import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { VertexAI } from '@google-cloud/vertexai';

// ============================================
// Anthropic Claude Configuration
// ============================================
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const CLAUDE_MODELS = {
  SONNET: 'claude-sonnet-4-5-20250929',  // Claude Sonnet 4.5 (melhor modelo disponível!)
  HAIKU: 'claude-3-5-haiku-20241022',   // Claude 3.5 Haiku (rápido e barato)
} as const;

// ============================================
// Google Gemini Configuration (for text/chat)
// ============================================
export const googleAI = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_API_KEY!
);

// ============================================
// Google Vertex AI - Imagen 3 Configuration
// ============================================
export const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT || 'wm3-digital',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

export const IMAGEN_MODEL = 'imagegeneration@006';

// ============================================
// Model Selection by Service
// ============================================
export const SERVICE_MODELS = {
  TEMA_360: CLAUDE_MODELS.SONNET,
  RAIO_X_LANDING: CLAUDE_MODELS.SONNET,
  BRAND_SNAPSHOT_TEXT: CLAUDE_MODELS.SONNET,
  BRAND_SNAPSHOT_IMAGE: IMAGEN_MODEL,
  LANDING_BLUEPRINT: CLAUDE_MODELS.SONNET,
  QR_CODE_TEXT: CLAUDE_MODELS.SONNET,
  QR_CODE_IMAGE: IMAGEN_MODEL,
} as const;

// ============================================
// Default Generation Parameters
// ============================================
export const DEFAULT_CLAUDE_PARAMS = {
  max_tokens: 4000,
  temperature: 0.7,
  top_p: 0.95,
} as const;

export const DEFAULT_IMAGEN_PARAMS = {
  numberOfImages: 1,
  aspectRatio: '1:1',
  safetyFilterLevel: 'block_few',
  personGeneration: 'allow_all',
} as const;

// ============================================
// Prompt Caching Configuration
// ============================================
export const ENABLE_PROMPT_CACHING = true;

/**
 * Helper para criar system message com cache
 */
export function createCachedSystemPrompt(content: string) {
  return ENABLE_PROMPT_CACHING
    ? [
        {
          type: 'text' as const,
          text: content,
          cache_control: { type: 'ephemeral' as const },
        },
      ]
    : content;
}

// ============================================
// Error Handling
// ============================================
export class AIServiceError extends Error {
  constructor(
    message: string,
    public service: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

// ============================================
// Cost Tracking (opcional)
// ============================================
export interface GenerationCost {
  service: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  estimatedCostBRL: number;
  timestamp: Date;
}

const COST_PER_1M_TOKENS = {
  [CLAUDE_MODELS.SONNET]: {
    input: 3.0,   // USD per 1M tokens
    output: 15.0, // USD per 1M tokens
  },
  [CLAUDE_MODELS.HAIKU]: {
    input: 0.25,  // USD per 1M tokens
    output: 1.25, // USD per 1M tokens
  },
} as const;

const USD_TO_BRL = 5.0;

export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = COST_PER_1M_TOKENS[model as keyof typeof COST_PER_1M_TOKENS];
  if (!costs) return 0;

  const inputCost = (inputTokens / 1_000_000) * costs.input;
  const outputCost = (outputTokens / 1_000_000) * costs.output;

  return (inputCost + outputCost) * USD_TO_BRL;
}

// ============================================
// Imagen 3 Cost Calculation
// ============================================
// Pricing: $0.020 per image (Imagen 3 on Vertex AI)
// Source: https://cloud.google.com/vertex-ai/generative-ai/pricing
const IMAGEN_COST_PER_IMAGE_USD = 0.02;

export function calculateImagenCost(numberOfImages: number): number {
  return numberOfImages * IMAGEN_COST_PER_IMAGE_USD * USD_TO_BRL;
}

// ============================================
// Imagen 3 Helper Functions
// ============================================
export interface ImageGenerationParams {
  prompt: string;
  numberOfImages?: number;
  aspectRatio?: '1:1' | '9:16' | '16:9' | '4:3' | '3:4';
  negativePrompt?: string;
}

export interface ImageGenerationResult {
  imageUrl?: string;
  imageBase64?: string;
  mimeType: string;
  error?: string;
}

/**
 * Generate images using Vertex AI Imagen 3
 */
export async function generateWithImagen3(
  params: ImageGenerationParams
): Promise<ImageGenerationResult[]> {
  try {
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: IMAGEN_MODEL,
    });

    const prompt = params.prompt;
    const numberOfImages = params.numberOfImages || 1;

    console.log('[Imagen 3] Gerando imagens...', {
      prompt: prompt.substring(0, 100),
      numberOfImages,
    });

    // Generate images - Vertex AI Imagen uses simple text prompts
    const response = await generativeModel.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }]
    });

    if (!response.response) {
      throw new Error('Resposta vazia do Imagen 3');
    }

    const results: ImageGenerationResult[] = [];

    // Process response parts
    const parts = response.response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        results.push({
          imageBase64: part.inlineData.data,
          mimeType: part.inlineData.mimeType || 'image/png',
        });
      }
    }

    console.log(`[Imagen 3] ${results.length} imagens geradas com sucesso`);
    return results;
  } catch (error) {
    console.error('[Imagen 3] Erro ao gerar imagens:', error);
    throw new AIServiceError(
      'Erro ao gerar imagens com Imagen 3',
      'imagen-3',
      error
    );
  }
}

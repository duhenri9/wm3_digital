/**
 * Configuração central de APIs de IA
 * WM3 Digital - AI Services Stack
 */

import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================
// Anthropic Claude Configuration
// ============================================
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const CLAUDE_MODELS = {
  SONNET: 'claude-sonnet-4-5-20241022',
  HAIKU: 'claude-haiku-3-5-20241022',
  OPUS: 'claude-opus-4-20250514',
} as const;

// ============================================
// Google Imagen 3 Configuration
// ============================================
export const googleAI = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_API_KEY!
);

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
    input: 3.0, // USD
    output: 15.0, // USD
  },
  [CLAUDE_MODELS.HAIKU]: {
    input: 0.25,
    output: 1.25,
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

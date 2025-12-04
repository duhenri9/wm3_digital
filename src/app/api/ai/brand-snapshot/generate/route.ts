/**
 * API Route: Brand Snapshot - Identidade Visual Inicial
 * POST /api/ai/brand-snapshot/generate
 *
 * Stack: Claude Sonnet 4.5 (estratégia) + Google Imagen 3 (logos)
 * Security: API Key + Rate Limit + Cost Monitor + Circuit Breaker
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateBrandSnapshot,
  generateBrandSnapshotWithLogos,
  validateOutput,
  type BrandSnapshotInput,
} from '@/lib/ai/brand-snapshot';
import { verifyApiKey } from '@/lib/security/api-key';
import { rateLimiter } from '@/lib/security/rate-limiter';
import { costMonitor } from '@/lib/security/cost-monitor';
import { circuitBreaker } from '@/lib/security/circuit-breaker';

export const runtime = 'nodejs';
export const maxDuration = 120; // 2 minutos

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 0. Autenticação por API Key
    const authHeader = request.headers.get('authorization') ?? undefined;
    if (!verifyApiKey(authHeader)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 1. Extrair IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // 2. Verificar rate limit
    const rateLimit = rateLimiter.checkLimit(ip, 'brand-snapshot');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: rateLimit.reason,
          resetAt: new Date(rateLimit.resetAt).toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString(),
          },
        }
      );
    }

    // 3. Parsear body
    let body: BrandSnapshotInput & { generateImages?: boolean };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Validar campos obrigatórios
    if (
      !body.nomeEmpresa ||
      !body.setor ||
      !body.publicoAlvo ||
      !body.valores ||
      !body.diferenciais
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Campos obrigatórios: nomeEmpresa, setor, publicoAlvo, valores, diferenciais',
        },
        { status: 400 }
      );
    }

    // Check if user wants actual logo generation
    const generateImages = body.generateImages || false;

    // 4. Verificar custo estimado
    // Concepts only: ~R$ 0,35 | With Imagen (6 logos): +R$ 0,60 = ~R$ 0,95 total
    const estimatedCost = generateImages ? 0.95 : 0.35;
    const costCheck = costMonitor.canProcess(estimatedCost);
    if (!costCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: costCheck.reason,
          dailyCost: costCheck.currentDailyCost,
          dailyRemaining: costCheck.dailyRemaining,
        },
        { status: 429 }
      );
    }

    // 5. Gerar Brand Snapshot via Circuit Breaker
    const output = await circuitBreaker.execute(
      () =>
        generateImages
          ? generateBrandSnapshotWithLogos(body)
          : generateBrandSnapshot(body),
      { service: 'brand-snapshot', estimatedCost }
    );

    // 6. Validar output
    const validation = validateOutput(output);

    // 7. Registrar custo real e requisição
    const actualCost = output.metadata.totalCost;
    rateLimiter.recordRequest(ip, 'brand-snapshot', actualCost);
    costMonitor.record({
      service: 'brand-snapshot',
      cost: actualCost,
      model: 'claude-sonnet-4-5 + imagen-3',
      inputTokens: 0,
      outputTokens: 0,
    });

    // 8. Log e resposta
    const duration = Date.now() - startTime;
    console.log(
      `[Brand Snapshot API] Concluído: ${duration}ms | Custo: R$ ${actualCost.toFixed(4)}`
    );

    if (!validation.isValid) {
      console.warn('[Brand Snapshot API] Avisos:', validation.errors);
    }

    return NextResponse.json(
      {
        success: true,
        data: output,
        validation,
        mode: generateImages ? 'concepts + images' : 'concepts only',
        note: generateImages
          ? '6 logo concepts + imagens geradas com Imagen 3'
          : 'Logos concepts gerados. Use "generateImages": true para gerar imagens reais.',
      },
      {
        status: 200,
        headers: {
          'X-Generation-Time': duration.toString(),
          'X-Generation-Cost': actualCost.toFixed(4),
          'X-Generation-Mode': generateImages ? 'with-images' : 'concepts-only',
        },
      }
    );
  } catch (error) {
    console.error('[Brand Snapshot API] Erro:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        service: 'brand-snapshot',
      },
      { status: 500 }
    );
  }
}

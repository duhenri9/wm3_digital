/**
 * API Route: QR Code Hero
 * POST /api/ai/qr-code-hero/generate
 *
 * Stack: Claude Sonnet 4.5 (conceitos) + Google Imagen 3 (geração)
 * Security: API Key + Rate Limit + Cost Monitor + Circuit Breaker
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateQRCodeHero,
  generateQRCodeHeroWithImages,
  validateOutput,
  type QRCodeHeroInput,
} from '@/lib/ai/qr-code-hero';
import { verifyApiKey } from '@/lib/security/api-key';
import { rateLimiter } from '@/lib/security/rate-limiter';
import { costMonitor } from '@/lib/security/cost-monitor';
import { circuitBreaker } from '@/lib/security/circuit-breaker';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 0. Autenticação
    const authHeader = request.headers.get('authorization') ?? undefined;
    if (!verifyApiKey(authHeader)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 1. IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // 2. Rate limit
    const rateLimit = rateLimiter.checkLimit(ip, 'qr-code-hero');
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

    // 3. Body
    let body: QRCodeHeroInput & { generateImages?: boolean };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Validar campos
    if (!body.urlDestino || !body.estiloDesejado || !body.usoCaso) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos obrigatórios: urlDestino, estiloDesejado, usoCaso',
        },
        { status: 400 }
      );
    }

    // Check if user wants actual QR code generation
    const generateImages = body.generateImages || false;

    // 4. Cost check
    // Concepts only: ~R$ 0,25 | With Imagen (6 QR codes): +R$ 0,60 = ~R$ 0,85 total
    const estimatedCost = generateImages ? 0.85 : 0.25;
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

    // 5. Generate
    const output = await circuitBreaker.execute(
      () =>
        generateImages
          ? generateQRCodeHeroWithImages(body)
          : generateQRCodeHero(body),
      { service: 'qr-code-hero', estimatedCost }
    );

    // 6. Validate
    const validation = validateOutput(output);

    // 7. Record
    const actualCost = output.metadata.totalCost;
    rateLimiter.recordRequest(ip, 'qr-code-hero', actualCost);
    costMonitor.record({
      service: 'qr-code-hero',
      cost: actualCost,
      model: 'claude-sonnet-4-5 + imagen-3',
      inputTokens: 0,
      outputTokens: 0,
    });

    // 8. Response
    const duration = Date.now() - startTime;
    console.log(
      `[QR Code Hero API] Concluído: ${duration}ms | Custo: R$ ${actualCost.toFixed(4)}`
    );

    if (!validation.isValid) {
      console.warn('[QR Code Hero API] Avisos:', validation.errors);
    }

    return NextResponse.json(
      {
        success: true,
        data: output,
        validation,
        mode: generateImages ? 'concepts + images' : 'concepts only',
        note: generateImages
          ? '6 QR code concepts + imagens geradas com Imagen 3. IMPORTANTE: Verificar escaneabilidade!'
          : 'QR code concepts gerados. Use "generateImages": true para gerar imagens reais.',
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
    console.error('[QR Code Hero API] Erro:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        service: 'qr-code-hero',
      },
      { status: 500 }
    );
  }
}

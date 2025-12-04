/**
 * API Route: Landing Blueprint
 * POST /api/ai/landing-blueprint/generate
 *
 * Stack: Claude Sonnet 4.5
 * Security: API Key + Rate Limit + Cost Monitor + Circuit Breaker
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateLandingBlueprint,
  validateOutput,
  type LandingBlueprintInput,
} from '@/lib/ai/landing-blueprint';
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
    const rateLimit = rateLimiter.checkLimit(ip, 'landing-blueprint');
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
    let body: LandingBlueprintInput;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Validar campos
    if (
      !body.produto ||
      !body.publicoAlvo ||
      !body.objetivo ||
      !body.diferenciais ||
      !body.beneficiosPrincipais
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Campos obrigatórios: produto, publicoAlvo, objetivo, diferenciais, beneficiosPrincipais',
        },
        { status: 400 }
      );
    }

    // 4. Cost check
    const estimatedCost = 0.45; // ~R$ 0,45
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
      () => generateLandingBlueprint(body),
      { service: 'landing-blueprint', estimatedCost }
    );

    // 6. Validate
    const validation = validateOutput(output);

    // 7. Record
    const actualCost = output.metadata.generationCost;
    rateLimiter.recordRequest(ip, 'landing-blueprint', actualCost);
    costMonitor.record({
      service: 'landing-blueprint',
      cost: actualCost,
      model: 'claude-sonnet-4-5',
      inputTokens: 0,
      outputTokens: 0,
    });

    // 8. Response
    const duration = Date.now() - startTime;
    console.log(
      `[Landing Blueprint API] Concluído: ${duration}ms | Custo: R$ ${actualCost.toFixed(4)}`
    );

    if (!validation.isValid) {
      console.warn('[Landing Blueprint API] Avisos:', validation.errors);
    }

    return NextResponse.json(
      {
        success: true,
        data: output,
        validation,
      },
      {
        status: 200,
        headers: {
          'X-Generation-Time': duration.toString(),
          'X-Generation-Cost': actualCost.toFixed(4),
        },
      }
    );
  } catch (error) {
    console.error('[Landing Blueprint API] Erro:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        service: 'landing-blueprint',
      },
      { status: 500 }
    );
  }
}

/**
 * API Route: Raio-X de Landing Page
 * POST /api/ai/raio-x-landing/analyze
 *
 * Security: API Key + Rate Limit + Cost Monitor + Circuit Breaker
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyzeRaioX, validateOutput, type RaioXInput } from '@/lib/ai/raio-x-landing';
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
    const rateLimit = rateLimiter.checkLimit(ip, 'raio-x-landing');
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
    let body: RaioXInput;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Validar campos obrigatórios
    if (!body.url || !body.produto || !body.publicoAlvo || !body.objetivoPrincipal) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos obrigatórios: url, produto, publicoAlvo, objetivoPrincipal',
        },
        { status: 400 }
      );
    }

    // 4. Verificar custo estimado
    const estimatedCost = 0.42; // Estimativa baseada em ~3500 tokens output
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

    // 5. Gerar análise via Circuit Breaker
    const output = await circuitBreaker.execute(
      () => analyzeRaioX(body),
      { service: 'raio-x-landing', estimatedCost }
    );

    // 6. Validar output
    const validation = validateOutput(output);

    // 7. Registrar custo real e requisição
    const actualCost = output.metadata.generationCost;
    rateLimiter.recordRequest(ip, 'raio-x-landing', actualCost);
    costMonitor.record({
      service: 'raio-x-landing',
      cost: actualCost,
      model: 'claude-sonnet-4-5',
      inputTokens: 0, // TODO: get from API response
      outputTokens: 0, // TODO: get from API response
    });

    // 8. Log e resposta
    const duration = Date.now() - startTime;
    console.log(
      `[Raio-X API] Análise concluída: ${duration}ms | Score: ${output.analiseGeral.score} | Custo: R$ ${actualCost.toFixed(4)}`
    );

    if (!validation.isValid) {
      console.warn('[Raio-X API] Avisos de qualidade:', validation.errors);
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
          'X-Analysis-Score': output.analiseGeral.score.toString(),
        },
      }
    );
  } catch (error) {
    console.error('[Raio-X API] Erro:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        service: 'raio-x-landing',
      },
      { status: 500 }
    );
  }
}

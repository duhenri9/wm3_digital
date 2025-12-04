import { NextRequest, NextResponse } from 'next/server';
import {
  generateTema360,
  validateOutput,
  type Tema360Input,
} from '@/lib/ai/tema-360';
import { AIServiceError } from '@/lib/ai/config';
import { rateLimiter } from '@/lib/security/rate-limiter';
import { costMonitor } from '@/lib/security/cost-monitor';
import { circuitBreaker } from '@/lib/security/circuit-breaker';
import { verifyApiKey } from '@/lib/security/api-key';

export const runtime = 'nodejs';
export const maxDuration = 120; // 120 segundos (para Tema 360 completo)

/**
 * POST /api/ai/tema-360/generate
 * Gera conteúdo completo Tema 360 com proteções de segurança
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 0. Autenticação por API Key
    const authHeader = request.headers.get('authorization') ?? undefined;
    if (!verifyApiKey(authHeader)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Extrair IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // 2. Verificar rate limit
    const rateLimit = rateLimiter.checkLimit(ip, 'tema-360');
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

    // 3. Parse body
    const body = (await request.json()) as Partial<Tema360Input>;

    // Validação de entrada
    if (!body.tema || !body.publico || !body.tom) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos obrigatórios: tema, publico, tom',
        },
        { status: 400 }
      );
    }

    const input: Tema360Input = {
      tema: body.tema,
      publico: body.publico,
      tom: body.tom,
      linkOferta: body.linkOferta || 'https://wm3digital.com.br',
    };

    // 4. Verificar custo estimado (Tema 360 ~R$ 0.20-0.30)
    const estimatedCost = 0.35; // Estimativa conservadora
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

    // 5. Gerar conteúdo via Circuit Breaker
    const output = await circuitBreaker.execute(
      () => generateTema360(input),
      { service: 'tema-360', estimatedCost }
    );

    // 6. Validar qualidade
    const validation = validateOutput(output);

    if (!validation.isValid) {
      console.warn('[Tema 360] Avisos de qualidade:', validation.errors);
    }

    // 7. Registrar custo real e requisição
    const actualCost = output.metadata.generationCost;
    rateLimiter.recordRequest(ip, 'tema-360', actualCost);
    costMonitor.record({
      service: 'tema-360',
      cost: actualCost,
      model: 'claude-sonnet-4-5',
      inputTokens: 0, // Será preenchido no tema-360.ts
      outputTokens: 0,
    });

    const duration = Date.now() - startTime;
    console.log(
      `✅ [Tema 360] Geração concluída em ${duration}ms | Custo: R$ ${actualCost.toFixed(4)} | IP: ${ip}`
    );

    return NextResponse.json(
      {
        success: true,
        data: output,
        validation: {
          isValid: validation.isValid,
          warnings: validation.errors,
        },
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetAt.toString(),
          'X-Generation-Cost': actualCost.toFixed(4),
        },
      }
    );
  } catch (error) {
    console.error('[Tema 360 API] Erro:', error);

    if (error instanceof AIServiceError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          service: error.service,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao gerar conteúdo. Tente novamente.',
      },
      { status: 500 }
    );
  }
}

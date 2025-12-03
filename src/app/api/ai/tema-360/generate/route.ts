import { NextRequest, NextResponse } from 'next/server';
import {
  generateTema360,
  validateOutput,
  type Tema360Input,
} from '@/lib/ai/tema-360';
import { AIServiceError } from '@/lib/ai/config';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 segundos (Vercel Pro)

/**
 * POST /api/ai/tema-360/generate
 * Gera conteúdo completo Tema 360
 */
export async function POST(request: NextRequest) {
  try {
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

    // Gerar conteúdo
    const output = await generateTema360(input);

    // Validar qualidade
    const validation = validateOutput(output);

    if (!validation.isValid) {
      console.warn('[Tema 360] Avisos de qualidade:', validation.errors);
      // Não falha, mas loga os avisos
    }

    return NextResponse.json(
      {
        success: true,
        data: output,
        validation: {
          isValid: validation.isValid,
          warnings: validation.errors,
        },
      },
      { status: 200 }
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

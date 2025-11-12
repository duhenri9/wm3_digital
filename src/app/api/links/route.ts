import { NextRequest, NextResponse } from 'next/server';
import { readLinksConfig, saveLinksConfig } from '@/lib/data-storage';
import { requireAuth } from '@/lib/middleware';

// GET - Obter configuração da página de links (público)
export async function GET() {
  try {
    const config = await readLinksConfig();
    
    if (!config) {
      return NextResponse.json(
        { error: 'Configuração não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Erro ao buscar configuração de links:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar configuração' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar configuração da página de links (requer autenticação)
export const PUT = requireAuth(async (request) => {
  try {
    const body = await request.json();
    const config = body;

    // Validação básica
    if (!config.profile || !config.socialLinks) {
      return NextResponse.json(
        { error: 'Configuração inválida. Campos obrigatórios: profile, socialLinks' },
        { status: 400 }
      );
    }

    await saveLinksConfig(config);
    return NextResponse.json({ 
      success: true, 
      message: 'Configuração atualizada com sucesso',
      config 
    });
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar configuração' },
      { status: 500 }
    );
  }
});

// POST - Criar ou atualizar configuração (requer autenticação)
export const POST = requireAuth(async (request) => {
  try {
    const body = await request.json();
    const config = body;

    // Validação básica
    if (!config.profile || !config.socialLinks) {
      return NextResponse.json(
        { error: 'Configuração inválida. Campos obrigatórios: profile, socialLinks' },
        { status: 400 }
      );
    }

    await saveLinksConfig(config);
    return NextResponse.json({ 
      success: true, 
      message: 'Configuração atualizada com sucesso',
      config 
    });
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar configuração' },
      { status: 500 }
    );
  }
});


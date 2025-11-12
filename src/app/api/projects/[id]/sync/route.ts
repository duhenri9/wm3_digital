// API para sincronizar dados de um projeto específico a partir de sua página oficial
import { NextRequest, NextResponse } from 'next/server';
import { updateProjectFromOfficialPage, syncProjectFromOfficialPage } from '@/lib/project-sync';
import { requireAuth } from '@/lib/middleware';

// GET - Buscar dados da página oficial (sem autenticação, apenas leitura)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    if (!projectId) {
      return NextResponse.json(
        { error: 'ID do projeto não fornecido' },
        { status: 400 }
      );
    }

    const syncData = await syncProjectFromOfficialPage(projectId);

    if (!syncData) {
      return NextResponse.json(
        { error: 'Não foi possível buscar dados da página oficial' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      projectId,
      data: syncData,
      source: 'official-page'
    });
  } catch (error: any) {
    console.error('Erro ao sincronizar projeto:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao sincronizar projeto' },
      { status: 500 }
    );
  }
}

// POST - Atualizar projeto com dados da página oficial (requer autenticação)
export const POST = requireAuth(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: projectId } = await params;

    if (!projectId) {
      return NextResponse.json(
        { error: 'ID do projeto não fornecido' },
        { status: 400 }
      );
    }

    const updatedProject = await updateProjectFromOfficialPage(projectId);

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Não foi possível atualizar o projeto' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Projeto atualizado com sucesso a partir da página oficial',
      project: updatedProject
    });
  } catch (error: any) {
    console.error('Erro ao atualizar projeto:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao atualizar projeto' },
      { status: 500 }
    );
  }
});


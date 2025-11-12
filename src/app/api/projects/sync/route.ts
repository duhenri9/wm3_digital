// API para sincronizar todos os projetos de uma vez
import { NextRequest, NextResponse } from 'next/server';
import { syncAllProjects } from '@/lib/project-sync';
import { requireAuth } from '@/lib/middleware';

// GET - Buscar dados de todas as páginas oficiais (sem autenticação, apenas leitura)
export async function GET(request: NextRequest) {
  try {
    const results = await syncAllProjects();

    return NextResponse.json({
      success: true,
      count: Object.keys(results).length,
      projects: results,
      source: 'official-pages'
    });
  } catch (error: any) {
    console.error('Erro ao sincronizar projetos:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao sincronizar projetos' },
      { status: 500 }
    );
  }
}

// POST - Atualizar todos os projetos (requer autenticação)
export const POST = requireAuth(async (request: NextRequest) => {
  try {
    const { readProjects, saveProjects } = await import('@/lib/data-storage');
    const { updateProjectFromOfficialPage } = await import('@/lib/project-sync');
    const { SYNC_CONFIGS } = await import('@/lib/project-sync');

    const projects = await readProjects();
    const updatedProjects: any[] = [];
    const errors: any[] = [];

    // Atualizar cada projeto configurado
    for (const projectId of Object.keys(SYNC_CONFIGS)) {
      try {
        const project = projects.find(p => p.id === projectId);
        if (project) {
          const updated = await updateProjectFromOfficialPage(projectId);
          if (updated) {
            updatedProjects.push(updated);
          }
        }
      } catch (error: any) {
        errors.push({
          projectId,
          error: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sincronização concluída. ${updatedProjects.length} projetos atualizados.`,
      updated: updatedProjects.length,
      errors: errors.length,
      details: {
        updated: updatedProjects.map(p => ({ id: p.id, title: p.title })),
        errors
      }
    });
  } catch (error: any) {
    console.error('Erro ao sincronizar todos os projetos:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao sincronizar projetos' },
      { status: 500 }
    );
  }
});


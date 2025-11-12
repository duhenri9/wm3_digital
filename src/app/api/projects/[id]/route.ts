import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, upsertProject, deleteProject } from '@/lib/data-storage';
import { Project } from '@/lib/projects';
import { requireAuth } from '@/lib/middleware';

// GET - Buscar projeto específico por ID (público)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await getProjectById(id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projeto' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar projeto específico (requer autenticação)
export const PUT = requireAuth(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const project: Project = { ...body, id };

    const existing = await getProjectById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    const updatedProject = await upsertProject(project);
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar projeto' },
      { status: 500 }
    );
  }
});

// DELETE - Deletar projeto específico (requer autenticação)
export const DELETE = requireAuth(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const deleted = await deleteProject(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Projeto deletado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar projeto' },
      { status: 500 }
    );
  }
});


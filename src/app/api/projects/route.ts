import { NextRequest, NextResponse } from 'next/server';
import {
  readProjects,
  saveProjects,
  getProjectById,
  upsertProject,
  deleteProject
} from '@/lib/data-storage';
import { Project } from '@/lib/projects';
import { requireAuth } from '@/lib/middleware';

// GET - Listar todos os projetos ou buscar por ID (público)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    let projects = await readProjects();

    // Filtrar por ID
    if (id) {
      const project = await getProjectById(id);
      if (!project) {
        return NextResponse.json(
          { error: 'Projeto não encontrado' },
          { status: 404 }
        );
      }
      return NextResponse.json(project);
    }

    // Filtrar por status
    if (status) {
      projects = projects.filter(p => p.status === status);
    }

    // Filtrar por categoria
    if (category) {
      projects = projects.filter(p => p.category === category);
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projetos' },
      { status: 500 }
    );
  }
}

// POST - Criar novo projeto (requer autenticação)
export const POST = requireAuth(async (request) => {
  try {
    const body = await request.json();
    const project: Project = body;

    // Validação básica
    if (!project.id || !project.title || !project.description) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: id, title, description' },
        { status: 400 }
      );
    }

    // Verificar se já existe
    const existing = await getProjectById(project.id);
    if (existing) {
      return NextResponse.json(
        { error: 'Projeto com este ID já existe' },
        { status: 409 }
      );
    }

    const newProject = await upsertProject(project);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar projeto' },
      { status: 500 }
    );
  }
});

// PUT - Atualizar projeto existente (requer autenticação)
export const PUT = requireAuth(async (request) => {
  try {
    const body = await request.json();
    const project: Project = body;

    if (!project.id) {
      return NextResponse.json(
        { error: 'ID do projeto é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se existe
    const existing = await getProjectById(project.id);
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

// DELETE - Deletar projeto (requer autenticação)
export const DELETE = requireAuth(async (request) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID do projeto é obrigatório' },
        { status: 400 }
      );
    }

    const deleted = await deleteProject(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar projeto' },
      { status: 500 }
    );
  }
});


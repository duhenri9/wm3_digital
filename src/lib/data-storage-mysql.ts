// Sistema de armazenamento de dados usando MySQL
import { query } from './db';
import { Project } from './projects';

// Ler todos os projetos
export async function readProjects(): Promise<Project[]> {
  try {
    const results = await query<any[]>(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    
    return results.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      tags: JSON.parse(row.tags || '[]'),
      status: row.status,
      category: row.category,
      price: row.price || undefined,
      links: JSON.parse(row.links || '{}'),
      image: row.image || undefined,
      showInLanding: row.show_in_landing !== undefined ? Boolean(row.show_in_landing) : true,
    }));
  } catch (error) {
    console.error('Erro ao ler projetos:', error);
    return [];
  }
}

// Salvar projetos (inserir ou atualizar)
export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    // Limpar tabela e inserir todos os projetos
    await query('DELETE FROM projects');
    
    for (const project of projects) {
      await query(
        `INSERT INTO projects (id, title, description, tags, status, category, price, links, image, show_in_landing)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          project.id,
          project.title,
          project.description,
          JSON.stringify(project.tags),
          project.status,
          project.category,
          project.price || null,
          JSON.stringify(project.links),
          project.image || null,
          project.showInLanding !== false ? 1 : 0,
        ]
      );
    }
  } catch (error) {
    console.error('Erro ao salvar projetos:', error);
    throw error;
  }
}

// Buscar projeto por ID
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const results = await query<any[]>(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (results.length === 0) {
      return null;
    }

    const row = results[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      tags: JSON.parse(row.tags || '[]'),
      status: row.status,
      category: row.category,
      price: row.price || undefined,
      links: JSON.parse(row.links || '{}'),
      image: row.image || undefined,
      showInLanding: row.show_in_landing !== undefined ? Boolean(row.show_in_landing) : true,
    };
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return null;
  }
}

// Adicionar ou atualizar projeto
export async function upsertProject(project: Project): Promise<Project> {
  try {
    await query(
      `INSERT INTO projects (id, title, description, tags, status, category, price, links, image, show_in_landing)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         description = VALUES(description),
         tags = VALUES(tags),
         status = VALUES(status),
         category = VALUES(category),
         price = VALUES(price),
         links = VALUES(links),
         image = VALUES(image),
         show_in_landing = VALUES(show_in_landing),
         updated_at = CURRENT_TIMESTAMP`,
      [
        project.id,
        project.title,
        project.description,
        JSON.stringify(project.tags),
        project.status,
        project.category,
        project.price || null,
        JSON.stringify(project.links),
        project.image || null,
        project.showInLanding !== false ? 1 : 0,
      ]
    );

    const saved = await getProjectById(project.id);
    if (!saved) {
      throw new Error('Erro ao salvar projeto');
    }

    return saved;
  } catch (error) {
    console.error('Erro ao salvar projeto:', error);
    throw error;
  }
}

// Deletar projeto
export async function deleteProject(id: string): Promise<boolean> {
  try {
    const result = await query<any>(
      'DELETE FROM projects WHERE id = ?',
      [id]
    );

    return (result as any).affectedRows > 0;
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return false;
  }
}

// Ler configuração de links
export async function readLinksConfig(): Promise<any> {
  try {
    const results = await query<any[]>(
      'SELECT config_value FROM links_config WHERE config_key = ?',
      ['main']
    );

    if (results.length === 0) {
      return null;
    }

    return JSON.parse(results[0].config_value);
  } catch (error) {
    console.error('Erro ao ler configuração de links:', error);
    return null;
  }
}

// Salvar configuração de links
export async function saveLinksConfig(config: any): Promise<void> {
  try {
    await query(
      `INSERT INTO links_config (config_key, config_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE
         config_value = VALUES(config_value),
         updated_at = CURRENT_TIMESTAMP`,
      ['main', JSON.stringify(config)]
    );
  } catch (error) {
    console.error('Erro ao salvar configuração de links:', error);
    throw error;
  }
}

// Migrar dados de JSON para MySQL (função auxiliar)
export async function migrateFromJSON(): Promise<void> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const projectsFile = path.join(process.cwd(), 'data', 'projects.json');
    
    if (fs.existsSync(projectsFile)) {
      const data = fs.readFileSync(projectsFile, 'utf-8');
      const projects: Project[] = JSON.parse(data);
      await saveProjects(projects);
      console.log(`Migrados ${projects.length} projetos para MySQL`);
    }

    const linksFile = path.join(process.cwd(), 'data', 'links-config.json');
    if (fs.existsSync(linksFile)) {
      const data = fs.readFileSync(linksFile, 'utf-8');
      const config = JSON.parse(data);
      await saveLinksConfig(config);
      console.log('Configuração de links migrada para MySQL');
    }
  } catch (error) {
    console.error('Erro na migração:', error);
  }
}


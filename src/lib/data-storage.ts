// Sistema de armazenamento de dados para projetos e links
// Suporta tanto arquivos JSON (desenvolvimento) quanto MySQL (produção)

import { Project, SocialLink } from './projects';

// Verificar se deve usar MySQL ou JSON
const USE_MYSQL = process.env.DB_HOST && process.env.DB_HOST !== 'localhost';

// Importar funções MySQL ou JSON dinamicamente
let mysqlStorage: any = null;
let jsonStorage: any = null;

async function getStorage() {
  if (USE_MYSQL) {
    if (!mysqlStorage) {
      mysqlStorage = await import('./data-storage-mysql');
    }
    return mysqlStorage;
  } else {
    if (!jsonStorage) {
      jsonStorage = await import('./data-storage-json');
    }
    return jsonStorage;
  }
}

// Wrapper functions que usam MySQL ou JSON dependendo da configuração
export async function readProjects(): Promise<Project[]> {
  const storage = await getStorage();
  return storage.readProjects();
}

export async function saveProjects(projects: Project[]): Promise<void> {
  const storage = await getStorage();
  return storage.saveProjects(projects);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const storage = await getStorage();
  return storage.getProjectById(id);
}

export async function upsertProject(project: Project): Promise<Project> {
  const storage = await getStorage();
  return storage.upsertProject(project);
}

export async function deleteProject(id: string): Promise<boolean> {
  const storage = await getStorage();
  return storage.deleteProject(id);
}

export async function readLinksConfig(): Promise<any> {
  const storage = await getStorage();
  return storage.readLinksConfig();
}

export async function saveLinksConfig(config: any): Promise<void> {
  const storage = await getStorage();
  return storage.saveLinksConfig(config);
}

// Este arquivo agora é um wrapper que escolhe entre MySQL e JSON automaticamente
// As implementações estão em data-storage-mysql.ts e data-storage-json.ts


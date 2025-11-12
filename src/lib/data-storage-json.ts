// Sistema de armazenamento de dados usando arquivos JSON (fallback)
import fs from 'fs';
import path from 'path';
import { Project } from './projects';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const LINKS_FILE = path.join(DATA_DIR, 'links-config.json');

// Garantir que o diretório existe
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Inicializar arquivos se não existirem
function initializeFiles() {
  ensureDataDir();
  
  if (!fs.existsSync(PROJECTS_FILE)) {
    // Importar allProjects do arquivo projects.ts para manter sincronizado
    const { allProjects } = require('./projects');
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(allProjects, null, 2));
  }
  
  if (!fs.existsSync(LINKS_FILE)) {
    const initialLinksConfig = {
      profile: {
        title: 'WM3 Digital',
        description: 'SaaS, automação e marketing digital com habilidades excepcionais em design de websites',
        avatar: '/wm3-icon.png'
      },
      socialLinks: [
        {
          id: 'instagram',
          title: 'Instagram',
          url: 'https://instagram.com/wm3digital',
          icon: 'instagram',
          description: 'Siga-nos no Instagram',
          color: 'from-pink-500 to-purple-500'
        },
        {
          id: 'whatsapp',
          title: 'WhatsApp',
          url: 'https://wa.me/5511999999999',
          icon: 'whatsapp',
          description: 'Fale conosco no WhatsApp',
          color: 'from-green-500 to-emerald-500'
        },
        {
          id: 'email',
          title: 'E-mail',
          url: 'mailto:info@wm3digital.com.br',
          icon: 'mail',
          description: 'Envie-nos um e-mail',
          color: 'from-blue-500 to-cyan-500'
        }
      ],
      sections: [
        {
          id: 'available',
          title: 'Projetos Disponíveis',
          showInLinks: true
        },
        {
          id: 'upcoming',
          title: 'Em Desenvolvimento',
          showInLinks: true
        },
        {
          id: 'social',
          title: 'Conecte-se Conosco',
          showInLinks: true
        }
      ]
    };
    fs.writeFileSync(LINKS_FILE, JSON.stringify(initialLinksConfig, null, 2));
  }
}

// Ler projetos
export function readProjects(): Project[] {
  initializeFiles();
  try {
    const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler projetos:', error);
    return [];
  }
}

// Salvar projetos
export function saveProjects(projects: Project[]): void {
  ensureDataDir();
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

// Buscar projeto por ID
export function getProjectById(id: string): Project | null {
  const projects = readProjects();
  return projects.find(p => p.id === id) || null;
}

// Adicionar ou atualizar projeto
export function upsertProject(project: Project): Project {
  const projects = readProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  
  saveProjects(projects);
  return project;
}

// Deletar projeto
export function deleteProject(id: string): boolean {
  const projects = readProjects();
  const filtered = projects.filter(p => p.id !== id);
  
  if (filtered.length < projects.length) {
    saveProjects(filtered);
    return true;
  }
  
  return false;
}

// Ler configuração de links
export function readLinksConfig(): any {
  initializeFiles();
  try {
    const data = fs.readFileSync(LINKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler configuração de links:', error);
    return null;
  }
}

// Salvar configuração de links
export function saveLinksConfig(config: any): void {
  ensureDataDir();
  fs.writeFileSync(LINKS_FILE, JSON.stringify(config, null, 2));
}


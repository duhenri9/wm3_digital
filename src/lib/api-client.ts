// Cliente API para buscar dados dos projetos e links
import { Project, SocialLink } from './projects';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Função auxiliar para fazer requisições
async function fetchAPI<T>(endpoint: string, options?: RequestInit & { requireAuth?: boolean }): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Obter token do cookie se necessário
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  // Se requireAuth, tentar obter token do cookie
  if (options?.requireAuth && typeof window !== 'undefined') {
    // Em client-side, o cookie é enviado automaticamente
    // Mas podemos adicionar Authorization header se necessário
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Incluir cookies
    cache: 'no-store', // Sempre buscar dados atualizados
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

// Projetos
export async function fetchProjects(params?: {
  status?: string;
  category?: 'servico' | 'projeto';
}): Promise<Project[]> {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.category) queryParams.append('category', params.category);

  const queryString = queryParams.toString();
  const endpoint = `/api/projects${queryString ? `?${queryString}` : ''}`;
  
  return fetchAPI<Project[]>(endpoint);
}

export async function fetchProjectById(id: string): Promise<Project> {
  return fetchAPI<Project>(`/api/projects/${id}`);
}

export async function createProject(project: Project): Promise<Project> {
  return fetchAPI<Project>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(project),
    requireAuth: true,
  });
}

export async function updateProject(project: Project): Promise<Project> {
  return fetchAPI<Project>(`/api/projects/${project.id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
    requireAuth: true,
  });
}

export async function deleteProjectById(id: string): Promise<void> {
  await fetchAPI(`/api/projects/${id}`, {
    method: 'DELETE',
    requireAuth: true,
  });
}

// Links
export interface LinksConfig {
  profile: {
    title: string;
    description: string;
    avatar?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string;
    };
  };
  socialLinks: SocialLink[];
  sections: Array<{
    id: string;
    title: string;
    showInLinks: boolean;
  }>;
  // Novos campos de personalização visual
  theme?: {
    backgroundColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    textColor?: string;
    backgroundImage?: string;
    fontFamily?: string;
  };
  analytics?: {
    googleAnalyticsId?: string;
    enabled?: boolean;
  };
}

export async function fetchLinksConfig(): Promise<LinksConfig> {
  return fetchAPI<LinksConfig>('/api/links');
}

export async function updateLinksConfig(config: LinksConfig): Promise<LinksConfig> {
  const result = await fetchAPI<{ success: boolean; config: LinksConfig }>('/api/links', {
    method: 'PUT',
    body: JSON.stringify(config),
    requireAuth: true,
  });
  return result.config;
}

// Funções auxiliares para compatibilidade com código existente
export async function getAvailableProjects(): Promise<Project[]> {
  return fetchProjects({ status: 'Disponível' });
}

export async function getUpcomingProjects(): Promise<Project[]> {
  const allProjects = await fetchProjects();
  return allProjects.filter(p => 
    p.status !== 'Disponível'
  );
}

export async function getProjectsByCategory(category: 'servico' | 'projeto'): Promise<Project[]> {
  return fetchProjects({ category });
}


// Wrapper para compatibilidade - usa API quando disponível, fallback para dados estáticos
import { Project, getAvailableProjects as getAvailableStatic, getUpcomingProjects as getUpcomingStatic, getProjectsByCategory as getByCategoryStatic, getProjectById as getByIdStatic, getLandingPageProjects as getLandingPageStatic, allProjects } from './projects';
import { fetchProjects, fetchProjectById, getAvailableProjects as getAvailableAPI, getUpcomingProjects as getUpcomingAPI, getProjectsByCategory as getByCategoryAPI } from './api-client';

// Flag para usar API ou dados estáticos (útil durante desenvolvimento)
const USE_API = process.env.NEXT_PUBLIC_USE_API === 'true';

// Funções que tentam usar API primeiro, depois fallback para estático
export async function getAvailableProjects(): Promise<Project[]> {
  if (USE_API && typeof window === 'undefined') {
    // Server-side: usar dados do storage diretamente
    try {
      const { readProjects } = await import('./data-storage');
      const projects = await readProjects();
      return projects.filter(p => p.status === 'Disponível' || p.status === 'Making & Beta');
    } catch (error) {
      console.warn('Erro ao buscar do storage, usando dados estáticos:', error);
      return getAvailableStatic();
    }
  }
  
  if (USE_API) {
    try {
      return await getAvailableAPI();
    } catch (error) {
      console.warn('Erro ao buscar da API, usando dados estáticos:', error);
      return getAvailableStatic();
    }
  }
  
  return getAvailableStatic();
}

export async function getUpcomingProjects(): Promise<Project[]> {
  if (USE_API && typeof window === 'undefined') {
    try {
      const { readProjects } = await import('./data-storage');
      const projects = await readProjects();
      return projects.filter(p => 
        p.status === 'Early Adopters' || 
        p.status === 'Em Desenvolvimento' || 
        p.status === 'Beta' || 
        p.status === 'Upcoming' || 
        p.status === 'Em Breve'
      );
    } catch (error) {
      console.warn('Erro ao buscar do storage, usando dados estáticos:', error);
      return getUpcomingStatic();
    }
  }
  
  if (USE_API) {
    try {
      return await getUpcomingAPI();
    } catch (error) {
      console.warn('Erro ao buscar da API, usando dados estáticos:', error);
      return getUpcomingStatic();
    }
  }
  
  return getUpcomingStatic();
}

export async function getProjectsByCategory(category: 'servico' | 'projeto'): Promise<Project[]> {
  if (USE_API && typeof window === 'undefined') {
    try {
      const { readProjects } = await import('./data-storage');
      const projects = await readProjects();
      return projects.filter(p => p.category === category);
    } catch (error) {
      console.warn('Erro ao buscar do storage, usando dados estáticos:', error);
      return getByCategoryStatic(category);
    }
  }
  
  if (USE_API) {
    try {
      return await getByCategoryAPI(category);
    } catch (error) {
      console.warn('Erro ao buscar da API, usando dados estáticos:', error);
      return getByCategoryStatic(category);
    }
  }
  
  return getByCategoryStatic(category);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  if (USE_API && typeof window === 'undefined') {
    try {
      const { getProjectById: getById } = await import('./data-storage');
      return (await getById(id)) || undefined;
    } catch (error) {
      console.warn('Erro ao buscar do storage, usando dados estáticos:', error);
      return getByIdStatic(id);
    }
  }
  
  if (USE_API) {
    try {
      return await fetchProjectById(id);
    } catch (error) {
      console.warn('Erro ao buscar da API, usando dados estáticos:', error);
      return getByIdStatic(id);
    }
  }
  
  return getByIdStatic(id);
}

// Função para obter projetos que aparecem na landing page
export async function getLandingPageProjects(): Promise<Project[]> {
  if (USE_API && typeof window === 'undefined') {
    try {
      const { readProjects } = await import('./data-storage');
      const projects = await readProjects();
      return projects.filter(p => 
        p.showInLanding !== false && 
        (p.status === 'Disponível' || p.status === 'Making & Beta')
      );
    } catch (error) {
      console.warn('Erro ao buscar do storage, usando dados estáticos:', error);
      return getLandingPageStatic();
    }
  }
  
  if (USE_API) {
    try {
      // Se usar API, filtrar client-side
      const projects = await fetchProjects({ status: 'Disponível' });
      return projects.filter(p => 
        p.showInLanding !== false && 
        (p.status === 'Disponível' || p.status === 'Making & Beta')
      );
    } catch (error) {
      console.warn('Erro ao buscar da API, usando dados estáticos:', error);
      return getLandingPageStatic();
    }
  }
  
  return getLandingPageStatic();
}

// Exportar allProjects para compatibilidade
export { allProjects };


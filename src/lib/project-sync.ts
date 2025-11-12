// Serviço para sincronizar dados de projetos a partir de suas páginas oficiais
import { Project } from './projects';

interface ProjectSyncConfig {
  id: string;
  officialUrl: string;
  selectors?: {
    title?: string;
    description?: string;
    status?: string;
    price?: string;
  };
}

// Configuração de sincronização para cada projeto
const SYNC_CONFIGS: Record<string, ProjectSyncConfig> = {
  'design-saas': {
    id: 'design-saas',
    officialUrl: 'https://designsaas.wm3digital.com.br/',
    selectors: {
      title: 'h1, .hero-title, [data-title]',
      description: 'meta[name="description"], .hero-description, p.lead',
      status: '[data-status], .status-badge',
      price: '[data-price], .price, .pricing'
    }
  },
  // Adicionar outros projetos aqui conforme necessário
  'socialflux': {
    id: 'socialflux',
    officialUrl: 'https://socialflux.wm3.digital/',
  },
  'metrify': {
    id: 'metrify',
    officialUrl: 'https://metrify.wm3digital.com.br/',
  },
  'seo-blog': {
    id: 'seo-blog',
    officialUrl: 'https://seoblog.wm3digital.com.br/',
  },
  'funil-que-vende': {
    id: 'funil-que-vende',
    officialUrl: 'https://funilquevende.wm3digital.com.br/',
  },
  'subhub': {
    id: 'subhub',
    officialUrl: 'https://subhub.wm3digital.com.br/',
  },
  'humantic': {
    id: 'humantic',
    officialUrl: 'https://humantic.wm3digital.com.br/',
  }
};

/**
 * Busca dados de uma página HTML e extrai informações usando seletores CSS
 */
async function fetchPageData(url: string, selectors?: ProjectSyncConfig['selectors']): Promise<Partial<Project>> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    // Extrair dados básicos da página
    const data: Partial<Project> = {};

    // 1. Extrair título da meta tag ou do HTML
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      let title = titleMatch[1]
        .replace(/\s*[-|]\s*WM3.*$/i, '')
        .replace(/\s*[-|]\s*Design.*$/i, '')
        .trim();
      // Remover sufixos comuns
      title = title.replace(/\s*[-|]\s*SaaS.*$/i, '').trim();
      data.title = title || undefined;
    }

    // 2. Extrair descrição da meta tag
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    if (descMatch) {
      data.description = descMatch[1].trim();
    }

    // 3. Tentar extrair dados de JSON-LD se disponível
    const jsonLdMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    for (const match of jsonLdMatches) {
      try {
        const jsonLd = JSON.parse(match[1]);
        if (jsonLd.name && !data.title) data.title = jsonLd.name;
        if (jsonLd.description && !data.description) data.description = jsonLd.description;
        if (jsonLd.headline && !data.title) data.title = jsonLd.headline;
      } catch (e) {
        // Ignorar erros de parsing JSON-LD
      }
    }

    // 4. Tentar extrair de Open Graph
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    if (ogTitleMatch && !data.title) {
      data.title = ogTitleMatch[1].trim();
    }

    const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
    if (ogDescMatch && !data.description) {
      data.description = ogDescMatch[1].trim();
    }

    // 5. Tentar extrair preço (buscar por padrões comuns)
    const pricePatterns = [
      /(?:R\$|preço|price)[:\s]*([R$]?\s*\d+[.,]?\d*)/i,
      /(?:a partir de|starting at|from)[:\s]*([R$]?\s*\d+[.,]?\d*)/i,
      /<[^>]*data-price=["']([^"']+)["']/i,
      /<[^>]*class=["'][^"']*price[^"']*["'][^>]*>([^<]+)</i
    ];

    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        const price = match[1].trim();
        if (price && price.length < 50) { // Evitar textos muito longos
          data.price = price;
          break;
        }
      }
    }

    return data;
  } catch (error) {
    console.error(`Erro ao buscar dados de ${url}:`, error);
    throw error;
  }
}

/**
 * Sincroniza dados de um projeto a partir de sua página oficial
 */
export async function syncProjectFromOfficialPage(projectId: string): Promise<Partial<Project> | null> {
  const config = SYNC_CONFIGS[projectId];
  
  if (!config) {
    throw new Error(`Configuração de sincronização não encontrada para projeto: ${projectId}`);
  }

  try {
    const pageData = await fetchPageData(config.officialUrl, config.selectors);
    
    return {
      ...pageData,
      links: {
        live: config.officialUrl,
        website: config.officialUrl
      }
    };
  } catch (error) {
    console.error(`Erro ao sincronizar projeto ${projectId}:`, error);
    return null;
  }
}

/**
 * Sincroniza todos os projetos configurados
 */
export async function syncAllProjects(): Promise<Record<string, Partial<Project>>> {
  const results: Record<string, Partial<Project>> = {};
  
  for (const [projectId, config] of Object.entries(SYNC_CONFIGS)) {
    try {
      const data = await syncProjectFromOfficialPage(projectId);
      if (data) {
        results[projectId] = data;
      }
    } catch (error) {
      console.error(`Erro ao sincronizar ${projectId}:`, error);
    }
  }
  
  return results;
}

/**
 * Atualiza um projeto existente com dados da página oficial
 */
export async function updateProjectFromOfficialPage(projectId: string): Promise<Project | null> {
  const { getProjectById, upsertProject } = await import('./data-storage');
  
  try {
    // Buscar projeto atual
    const currentProject = await getProjectById(projectId);
    if (!currentProject) {
      throw new Error(`Projeto ${projectId} não encontrado`);
    }

    // Verificar se há configuração de sincronização
    const config = SYNC_CONFIGS[projectId];
    if (!config) {
      throw new Error(`Configuração de sincronização não encontrada para projeto: ${projectId}`);
    }

    // Buscar dados atualizados da página oficial
    const syncData = await syncProjectFromOfficialPage(projectId);
    if (!syncData) {
      throw new Error(`Não foi possível sincronizar dados de ${projectId}`);
    }

    // Mesclar dados: manter dados existentes e atualizar apenas o que veio da página
    const updatedProject: Project = {
      ...currentProject,
      // Atualizar título e descrição se vieram da página
      title: syncData.title || currentProject.title,
      description: syncData.description || currentProject.description,
      // Manter campos importantes que não devem ser sobrescritos
      id: currentProject.id,
      category: currentProject.category,
      tags: currentProject.tags,
      status: currentProject.status, // Status é controlado internamente
      showInLanding: currentProject.showInLanding, // Manter configuração de landing
      price: syncData.price || currentProject.price,
      links: {
        ...currentProject.links,
        ...syncData.links,
        // Garantir que o link website aponta para a página oficial
        website: config.officialUrl
      }
    };

    // Salvar projeto atualizado
    await upsertProject(updatedProject);
    
    return updatedProject;
  } catch (error) {
    console.error(`Erro ao atualizar projeto ${projectId}:`, error);
    throw error;
  }
}

export { SYNC_CONFIGS };


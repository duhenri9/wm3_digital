// Arquivo centralizado de dados dos projetos e serviços da WM3 Digital

export type ProjectStatus = 'Disponível' | 'Early Adopters' | 'Em Desenvolvimento' | 'Beta' | 'Upcoming' | 'Em Breve' | 'Making & Beta';

export interface ProjectLink {
  live?: string;
  demo?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string; // Thumbnail para o link
  tags: string[];
  status: ProjectStatus;
  links: ProjectLink;
  price?: string;
  category: 'servico' | 'projeto';
  showInLanding?: boolean; // Controla se aparece na landing page principal
  // Novos campos do Linktree
  visible?: boolean; // Controla se o link está visível
  scheduleStart?: string; // Data/hora de início (ISO 8601)
  scheduleEnd?: string; // Data/hora de fim (ISO 8601)
  order?: number; // Ordem customizada
  clicks?: number; // Contador de cliques
  views?: number; // Contador de visualizações
  featured?: boolean; // Link destacado/pinned
}

// Todos os projetos e serviços
export const allProjects: Project[] = [
  {
    id: 'funil-que-vende',
    title: 'Funil que Vende+',
    description: 'Sistema completo de funil de vendas com automação avançada para maximizar conversões e vendas.',
    tags: ['Automação', 'Vendas', 'Funil', 'Conversão'],
    status: 'Em Breve',
    price: 'A partir de R$ 1.500',
    links: {
      live: '/servicos/funil-que-vende'
    },
    category: 'servico',
    showInLanding: false // Removido da landing page, apenas no admin
  },
  {
    id: 'socialflux',
    title: 'SocialFlux∞',
    description: 'Micro-SaaS de geração automática de anúncios para Instagram e Redes Sociais com IA avançada.',
    tags: ['Micro-SaaS', 'IA', 'Marketing', 'Automação'],
    status: 'Beta',
    links: {
      live: '/servicos/socialflux',
      demo: 'https://socialflux.wm3.digital'
    },
    category: 'servico',
    showInLanding: true
  },
  {
    id: 'subhub',
    title: 'SubHub',
    description: 'SaaS completo para gestão de subscrições e assinaturas com controle financeiro integrado.',
    tags: ['SaaS', 'Gestão', 'Financeiro', 'Assinaturas'],
    status: 'Em Desenvolvimento',
    links: {
      live: '/servicos/subhub',
      demo: 'https://subhub.wm3.digital'
    },
    category: 'projeto',
    showInLanding: false // Removido da landing page, apenas no admin
  },
  {
    id: 'humantic',
    title: 'HumanTic',
    description: 'Plataforma AaaS para criação e gerenciamento de agentes humanizados inteligentes.',
    tags: ['AaaS', 'IA', 'Agentes', 'Automação'],
    status: 'Em Breve',
    links: {
      live: '/servicos/humantic'
    },
    category: 'projeto',
    showInLanding: false // Removido da landing page, apenas no admin
  },
  {
    id: 'design-saas',
    title: 'Design SaaS Solutions',
    description: 'Projetos de design completos para SaaS, micro-SaaS, startups, websites e landing pages com foco em conversão.',
    tags: ['Design', 'UX/UI', 'SaaS', 'Conversão'],
    status: 'Disponível',
    price: 'A partir de R$ 652',
    links: {
      live: '/servicos/design-saas'
    },
    category: 'servico',
    showInLanding: true
  },
  {
    id: 'metrify',
    title: 'Metrify',
    description: 'Plataforma completa de métricas e analytics para SaaS e aplicações web com dashboards personalizados.',
    tags: ['Analytics', 'Métricas', 'SaaS', 'Dashboard'],
    status: 'Em Breve',
    links: {
      live: '/servicos/metrify'
    },
    category: 'servico',
    showInLanding: false // Removido da landing page, apenas no admin
  },
  {
    id: 'seo-blog',
    title: 'SEO Blog',
    description: 'Solução completa de SEO e conteúdo para blogs com otimização automática e geração de conteúdo otimizado.',
    tags: ['SEO', 'Conteúdo', 'Blog', 'Marketing'],
    status: 'Em Breve',
    links: {
      live: '/servicos/seo-blog'
    },
    category: 'servico',
    showInLanding: false // Removido da landing page, apenas no admin
  }
];

// Funções auxiliares para filtrar projetos
export function getAvailableProjects(): Project[] {
  return allProjects.filter(p => p.status === 'Disponível' || p.status === 'Making & Beta');
}

// Projetos que aparecem na landing page principal
export function getLandingPageProjects(): Project[] {
  return allProjects.filter(p => p.showInLanding !== false && (p.status === 'Disponível' || p.status === 'Making & Beta'));
}

export function getUpcomingProjects(): Project[] {
  return allProjects.filter(p => 
    p.status === 'Em Desenvolvimento' || 
    p.status === 'Beta' || 
    p.status === 'Upcoming' || 
    p.status === 'Em Breve' ||
    p.status === 'Early Adopters'
  );
}

export function getProjectsByCategory(category: 'servico' | 'projeto'): Project[] {
  return allProjects.filter(p => p.category === category);
}

export function getProjectById(id: string): Project | undefined {
  return allProjects.find(p => p.id === id);
}

// Links de redes sociais e contato
export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  description?: string;
  color?: string;
  // Novos campos do Linktree
  visible?: boolean; // Controla se o link está visível
  scheduleStart?: string; // Data/hora de início (ISO 8601)
  scheduleEnd?: string; // Data/hora de fim (ISO 8601)
  order?: number; // Ordem customizada
  clicks?: number; // Contador de cliques
  image?: string; // Thumbnail do link
  featured?: boolean; // Link destacado
}

export const socialLinks: SocialLink[] = [
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
];


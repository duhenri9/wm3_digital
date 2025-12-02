export type ServiceStage = 'Disponível' | 'Early Adopters' | 'Em Beta';

export interface ServiceOffering {
  id: string;
  name: string;
  headline: string;
  description: string;
  status: ServiceStage;
  href: string;
  category: 'SaaS' | 'Serviço' | 'Plataforma';
  price?: string;
  highlight?: boolean;
  tags?: string[];
}

export const serviceOfferings: ServiceOffering[] = [
  {
    id: 'funil-que-vende',
    name: 'Funil que Vende+',
    headline: 'Automação completa de vendas com IA aplicada em todo o fluxo.',
    description:
      'Sistema orquestrado para captação, nutrição, qualificação e conversão de leads com integrações omnichannel e playbooks automatizados.',
    status: 'Disponível',
    href: '/servicos/funil-que-vende',
    category: 'Serviço',
    price: 'Soluções a partir de R$ 1.500,00',
    highlight: true,
    tags: ['Automação de Vendas', 'IA', 'Omnichannel'],
  },
  {
    id: 'design-saas',
    name: 'Design SaaS',
    headline: 'Squad modular de design, desenvolvimento e identidade visual.',
    description:
      'Squad modular de design, desenvolvimento e identidade visual com governança WM3 e integrações MCP/Abacate Pay.',
    status: 'Early Adopters',
    href: '/servicos/design-saas',
    category: 'Serviço',
    price: 'Projetos a partir de R$ 2.652,00',
    tags: ['Design', 'UX/UI', 'Branding', 'Landing Pages'],
  },
  {
    id: 'socialflux',
    name: 'SocialFlux∞',
    headline: 'Automação inteligente para redes sociais com criação assistida por IA.',
    description:
      'Solução para geração automática de anúncios e campanhas no Instagram e redes sociais com recursos de IA avançada.',
    status: 'Disponível',
    href: '/servicos/socialflux',
    category: 'SaaS',
    tags: ['Marketing Digital', 'n8n', 'Automação'],
  },
  {
    id: 'subhub',
    name: 'SubHub',
    headline: 'Gestão de assinaturas com eficiência operacional de ponta a ponta.',
    description:
      'Backoffice completo para economia por recorrência, com billing integrado, automações de cobrança e controle de churn.',
    status: 'Early Adopters',
    href: '/servicos/subhub',
    category: 'SaaS',
    tags: ['FinOps', 'Assinaturas', 'Retenção'],
  },
  {
    id: 'humantic',
    name: 'HumanTic',
    headline:
      'Automação inteligente que otimiza processos, reduz custos e libera sua equipe para o estratégico.',
    description:
      'Plataforma modular de agentes digitais com orquestração de fluxos, RPA e copilotos customizados para operações de atendimento e backoffice.',
    status: 'Early Adopters',
    href: '/servicos/humantic',
    category: 'Plataforma',
    tags: ['IA Generativa', 'RPA', 'Operações'],
  },
  {
    id: 'metrify',
    name: 'Metrify',
    headline: 'Monitoramento contínuo de métricas e alertas inteligentes para SaaS.',
    description:
      'Observabilidade orientada a produto com dashboards em tempo real, métricas acionáveis e automação de alertas via n8n.',
    status: 'Em Beta',
    href: '/servicos/metrify',
    category: 'SaaS',
    tags: ['Observabilidade', 'Analytics', 'Alertas'],
  },
  {
    id: 'eryon-core',
    name: 'Eryon Core',
    headline:
      'Atendimento excepcional que transforma cada contato em fidelização e crescimento.',
    description:
      'Arquitetura pensada para otimizar o atendimento para o nível multimodal com agente universal inteligente que executa tarefas a partir de APIs de monitoramento e que definem as ações executáveis dentro do website do negócio. Gateway Abacate Pay ↔ MCP e APIs com governança e observabilidade contínuas garante sincronização. Onboarding em até 30 dias úteis com rotas guiadas.',
    status: 'Early Adopters',
    href: '/servicos/eryon',
    category: 'Plataforma',
    tags: ['CX', 'Omnichannel', 'Atendimento', 'Agentes Multimodais'],
  },
  {
    id: 'aurion-veridex',
    name: 'Aurion by Veridex',
    headline: 'Motor de verificação e compliance com inteligência de dados proprietária.',
    description:
      'Camada de validação e scoring que conecta dados internos e externos para decisões seguras e auditáveis.',
    status: 'Em Beta',
    href: '/servicos/aurion',
    category: 'Serviço',
    tags: ['Compliance', 'Data', 'Segurança'],
  },
  {
    id: 'solo-in-public',
    name: 'Solo in Public',
    headline: 'Construa seu produto compartilhando progresso com a comunidade.',
    description:
      'Plataforma para creators e makers documentarem etapas, métricas e aprendizados em tempo real, fortalecendo audiência e validação contínua.',
    status: 'Em Beta',
    href: '/em-breve',
    category: 'SaaS',
    tags: ['Comunidade', 'Product-Led', 'Build in Public'],
  },
];

export const flagshipServiceId = 'funil-que-vende';

export const flagshipService = serviceOfferings.find(
  (service) => service.id === flagshipServiceId,
);

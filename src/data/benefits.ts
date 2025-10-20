export interface Benefit {
  id: string;
  title: string;
  description: string;
  metricHighlight?: string;
}

export const strategicBenefits: Benefit[] = [
  {
    id: 'satisfacao',
    title: '+35% satisfação',
    description: 'Investimentos que se pagam em menos de 6 meses.',
  },
  {
    id: 'orquestracao',
    title: 'Orquestração HumanTic + Eryon',
    description:
      'Implementação ponta a ponta das plataformas WM3 para entregar operações integradas com foco em valor.',
  },
  {
    id: 'suporte',
    title: 'Suporte Dedicado',
    description:
      'Equipe especializada acompanhando implementação, treinamento e evolução contínua dos fluxos críticos.',
  },
  {
    id: 'escalabilidade',
    title: 'Escalabilidade',
    description:
      'Soluções preparadas para crescer com o negócio, de operações em ramp-up a estruturas corporativas globais.',
  },
  {
    id: 'integracao',
    title: 'Integração Fácil',
    description:
      'Integra-se aos sistemas existentes com baixa fricção, mantendo governança e segurança sobre dados sensíveis.',
  },
  {
    id: 'analytics',
    title: 'Analytics Avançado',
    description:
      'Dashboards em tempo real e relatórios detalhados para decisões baseadas em dados e acionáveis.',
  },
];

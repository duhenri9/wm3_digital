import { AIServiceDefinition } from '@/types/ai-services';

// Re-export types for convenience
export type { AIServiceDefinition } from '@/types/ai-services';

export const aiServices: AIServiceDefinition[] = [
  // 1. Tema 360 - R$ 79,00
  {
    id: 'tema360',
    name: 'Tema 360',
    priceBRL: 7900, // 79.00 BRL in cents
    shortDescription:
      'Um tema vira um pacote completo de conteúdo (artigo/roteiro, posts e hooks) em poucos minutos.',
    fullDescription:
      'Transformar um tema em um pacote de conteúdo para blog, vídeo e redes sociais. A IA gera um artigo/roteiro completo, posts para redes sociais e hooks cativantes.',
    inputFields: [
      {
        name: 'theme',
        label: 'Tema',
        type: 'text',
        required: true,
        placeholder: 'Ex: Automação de marketing para SaaS B2B',
        description: 'Sobre o que você quer criar conteúdo?',
      },
      {
        name: 'offerLink',
        label: 'Link da oferta',
        type: 'url',
        required: false,
        placeholder: 'https://...',
        description: 'Link do produto/serviço que você quer promover (opcional)',
      },
      {
        name: 'audience',
        label: 'Público-alvo',
        type: 'textarea',
        required: true,
        placeholder: 'Founders de SaaS B2B que querem escalar sem aumentar time de vendas',
        description: 'Descreva seu público em 1-2 frases',
      },
      {
        name: 'tone',
        label: 'Tom de voz',
        type: 'select',
        required: true,
        options: [
          { value: 'professional', label: 'Profissional' },
          { value: 'casual', label: 'Casual' },
          { value: 'friendly', label: 'Amigável' },
          { value: 'technical', label: 'Técnico' },
          { value: 'inspirational', label: 'Inspirador' },
        ],
      },
    ],
    previewDescription:
      'Veja o título sugerido, outline do conteúdo e um trecho inicial antes de gerar o pacote completo.',
    finalDeliverables: [
      '1 artigo/roteiro completo (1.000-1.300 palavras)',
      '3 posts para redes sociais',
      '3 hooks cativantes',
      '3 variações de título',
    ],
  },

  // 2. Raio-X de Landing - R$ 97,00
  {
    id: 'raioxLanding',
    name: 'Raio-X de Landing',
    priceBRL: 9700, // 97.00 BRL in cents
    shortDescription:
      'Análise automatizada da sua landing para identificar pontos fracos e sugerir novos heros.',
    fullDescription:
      'Diagnosticar uma landing page e sugerir melhorias baseadas em boas práticas de conversão. A IA analisa a estrutura, copy e oferece recomendações acionáveis.',
    inputFields: [
      {
        name: 'landingUrl',
        label: 'URL da landing page',
        type: 'url',
        required: true,
        placeholder: 'https://...',
        description: 'Link da landing que você quer analisar',
      },
      {
        name: 'goal',
        label: 'Objetivo da landing',
        type: 'select',
        required: true,
        options: [
          { value: 'lead', label: 'Captura de leads' },
          { value: 'sale', label: 'Venda direta' },
          { value: 'signup', label: 'Cadastro/trial' },
          { value: 'booking', label: 'Agendamento' },
        ],
      },
      {
        name: 'audience',
        label: 'Público-alvo',
        type: 'textarea',
        required: true,
        placeholder: 'Pequenos empreendedores que querem automatizar processos',
        description: 'Quem é o público desta landing?',
      },
      {
        name: 'trafficSource',
        label: 'Principal origem de tráfego',
        type: 'select',
        required: false,
        options: [
          { value: 'organic', label: 'Busca orgânica (SEO)' },
          { value: 'paid', label: 'Anúncios pagos' },
          { value: 'social', label: 'Redes sociais' },
          { value: 'email', label: 'E-mail marketing' },
          { value: 'direct', label: 'Tráfego direto' },
        ],
      },
    ],
    previewDescription:
      'Veja os 3 principais problemas identificados e uma sugestão de hero completo antes de gerar o relatório completo.',
    finalDeliverables: [
      'Análise detalhada por seção',
      'Recomendações claras e acionáveis',
      '2-3 variações de hero completas (headline + subheadline + CTA)',
      'Relatório em PDF para download',
    ],
  },

  // 3. Brand Snapshot - R$ 149,00
  {
    id: 'brandSnapshot',
    name: 'Brand Snapshot',
    priceBRL: 14900, // 149.00 BRL in cents
    shortDescription:
      'Identidade visual inicial com duas rodadas de logos e paletas para escolher a favorita antes de pagar.',
    fullDescription:
      'Gere um snapshot de identidade visual inicial 100% por IA. Receba 4 variações de logo e paleta, com direito a uma segunda rodada de refinamento antes de escolher e pagar.',
    inputFields: [
      {
        name: 'brandName',
        label: 'Nome da marca/produto',
        type: 'text',
        required: true,
        placeholder: 'Ex: CloudSync',
        description: 'Qual o nome da sua marca ou produto?',
      },
      {
        name: 'segment',
        label: 'Segmento',
        type: 'text',
        required: true,
        placeholder: 'Ex: SaaS de gestão de projetos',
        description: 'Em qual segmento seu negócio atua?',
      },
      {
        name: 'styleKeywords',
        label: 'Palavras de estilo',
        type: 'text',
        required: true,
        placeholder: 'Ex: moderno, minimalista, tecnológico',
        description: 'Descreva o estilo desejado em 2-3 palavras',
      },
      {
        name: 'referenceUrl',
        label: 'Referência visual (opcional)',
        type: 'url',
        required: false,
        placeholder: 'https://...',
        description: 'Link de alguma marca/design que inspire você',
      },
    ],
    previewDescription:
      'Rodada 1: veja 4 variações de logo + paleta. Você pode escolher uma ou pedir uma segunda rodada com feedback.',
    finalDeliverables: [
      'Logo escolhido em múltiplos formatos (PNG 512px, 1024px, 2048px)',
      'Paleta de cores completa (HEX)',
      'Fontes sugeridas (títulos + corpo)',
      '2 mockups (ex: capa LinkedIn + hero fictício)',
      'Pacote completo em ZIP para download',
    ],
    supportsRounds: true,
    maxRounds: 2,
  },

  // 4. Landing Blueprint - R$ 147,00
  {
    id: 'landingBlueprint',
    name: 'Landing Blueprint',
    priceBRL: 14700, // 147.00 BRL in cents
    shortDescription:
      'Blueprint textual completo de uma landing: estrutura, copy e sugestões de layout prontos para implementar.',
    fullDescription:
      'Receba um blueprint textual completo da sua landing page, pronto para o desenvolvedor implementar. Inclui estrutura das seções, copy completa e sugestões de layout.',
    inputFields: [
      {
        name: 'offering',
        label: 'O que você vende?',
        type: 'textarea',
        required: true,
        placeholder:
          'Ex: Plataforma SaaS para gerenciar assinaturas e cobranças recorrentes',
        description: 'Descreva seu produto/serviço',
      },
      {
        name: 'targetAudience',
        label: 'Para quem?',
        type: 'textarea',
        required: true,
        placeholder: 'Ex: Founders de SaaS B2B com MRR entre $5k-$50k',
        description: 'Quem é seu cliente ideal?',
      },
      {
        name: 'landingGoal',
        label: 'Objetivo da landing',
        type: 'select',
        required: true,
        options: [
          { value: 'trial', label: 'Trial gratuito' },
          { value: 'demo', label: 'Agendar demo' },
          { value: 'purchase', label: 'Compra direta' },
          { value: 'waitlist', label: 'Lista de espera' },
        ],
      },
      {
        name: 'references',
        label: 'Referências de landing pages (opcional)',
        type: 'textarea',
        required: false,
        placeholder: 'https://exemplo1.com, https://exemplo2.com',
        description: '1-2 URLs de landings que você admira',
      },
    ],
    previewDescription:
      'Veja a estrutura completa das seções e um hero sugerido antes de gerar o blueprint completo.',
    finalDeliverables: [
      'Estrutura completa das seções',
      'Copy completa de cada seção',
      'Sugestões de layout e hierarquia',
      'Snippet HTML/Tailwind opcional',
      'Documento Markdown para download',
    ],
  },

  // 5. QR Code - R$ 39,00
  {
    id: 'qrCode',
    name: 'QR Code',
    priceBRL: 3900, // 39.00 BRL in cents
    shortDescription:
      'QR codes criativos: defina destino e estilo, veja variações e baixe arquivos prontos para impressão ou web.',
    fullDescription:
      'Gere QR codes estilizados e criativos com IA. Receba 4 variações visuais, com direito a uma segunda rodada de refinamento. Sempre legíveis e prontos para uso.',
    inputFields: [
      {
        name: 'destinationType',
        label: 'Tipo de destino',
        type: 'select',
        required: true,
        options: [
          { value: 'url', label: 'URL / Site' },
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'wifi', label: 'Wi-Fi' },
          { value: 'text', label: 'Texto' },
        ],
      },
      {
        name: 'destination',
        label: 'Destino',
        type: 'textarea',
        required: true,
        placeholder:
          'Ex: https://seusite.com ou número do WhatsApp ou dados de Wi-Fi',
        description: 'Para onde o QR code deve levar?',
      },
      {
        name: 'visualStyle',
        label: 'Estilo visual',
        type: 'text',
        required: true,
        placeholder: 'Ex: minimalista, tech, colorido, elegante',
        description: 'Descreva o estilo desejado',
      },
      {
        name: 'primaryColor',
        label: 'Cor principal (opcional)',
        type: 'text',
        required: false,
        placeholder: 'Ex: azul, #5687A6',
        description: 'Cor predominante do QR code',
      },
    ],
    previewDescription:
      'Rodada 1: veja 4 variações de QR code estilizados. Você pode escolher uma ou pedir uma segunda rodada com feedback.',
    finalDeliverables: [
      'QR code escolhido em PNG (512px, 1024px, 2048px)',
      'Versão com fundo sólido',
      'Sugestão de usos em texto curto',
      'Pacote completo em ZIP para download',
    ],
    supportsRounds: true,
    maxRounds: 2,
  },
];

// Helper functions
export function getServiceById(id: string): AIServiceDefinition | undefined {
  return aiServices.find((service) => service.id === id);
}

export function formatPriceBRL(priceCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceCents / 100);
}

export function getServicesByIds(ids: string[]): AIServiceDefinition[] {
  return aiServices.filter((service) => ids.includes(service.id));
}

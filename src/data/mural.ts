export interface MuralEntry {
  id: string;
  quote: string;
  authorName: string;
  authorTagline: string;
  sourceUrl?: string;
  language?: 'pt' | 'en' | 'es';
}

export const muralEntries: MuralEntry[] = [
  {
    id: '1',
    quote:
      'A melhor métrica de um SaaS não é o MRR, é quantos clientes cancelariam se você sumir amanhã.',
    authorName: 'Patrick Campbell',
    authorTagline: 'Founder @ ProfitWell',
    language: 'pt',
  },
  {
    id: '2',
    quote:
      'Pricing is your competitive moat. Most founders underprice because they fear losing customers, but great pricing attracts the right customers.',
    authorName: 'Patrick Campbell',
    authorTagline: 'Founder @ ProfitWell',
    sourceUrl: 'https://www.profitwell.com',
    language: 'en',
  },
  {
    id: '3',
    quote:
      'O problema da maioria dos SaaS não é falta de features, é falta de clareza sobre o valor que entregam.',
    authorName: 'April Dunford',
    authorTagline: 'Author of Obviously Awesome',
    language: 'pt',
  },
  {
    id: '4',
    quote:
      'Your SaaS doesn\'t need 100 features. It needs one feature that 100 customers can\'t live without.',
    authorName: 'Des Traynor',
    authorTagline: 'Co-founder @ Intercom',
    sourceUrl: 'https://www.intercom.com',
    language: 'en',
  },
  {
    id: '5',
    quote:
      'Churn é feedback. Se você não está ouvindo, está perdendo dinheiro duas vezes.',
    authorName: 'Lincoln Murphy',
    authorTagline: 'Customer Success Pioneer',
    language: 'pt',
  },
  {
    id: '6',
    quote:
      'A conversão começa muito antes da landing page. Começa com a promessa que você faz em cada ponto de contato.',
    authorName: 'Peep Laja',
    authorTagline: 'Founder @ CXL',
    language: 'pt',
  },
  {
    id: '7',
    quote:
      'The best time to fix your funnel was at launch. The second best time is now.',
    authorName: 'Hiten Shah',
    authorTagline: 'Co-founder @ FYI',
    language: 'en',
  },
  {
    id: '8',
    quote:
      'Automação sem estratégia é só velocidade na direção errada.',
    authorName: 'WM3 Digital',
    authorTagline: 'Agência AI-First',
    language: 'pt',
  },
  {
    id: '9',
    quote:
      'La IA no reemplaza la estrategia, la amplifica. Si tu estrategia es débil, la IA solo hará que falles más rápido.',
    authorName: 'WM3 Digital',
    authorTagline: 'Agencia AI-First',
    language: 'es',
  },
  {
    id: '10',
    quote:
      'Seu produto resolve um problema ou cria uma experiência? A resposta define sua estratégia de crescimento.',
    authorName: 'Brian Balfour',
    authorTagline: 'Founder @ Reforge',
    language: 'pt',
  },
  {
    id: '11',
    quote:
      'Distribution is everything. A good product with great distribution beats a great product with good distribution every time.',
    authorName: 'Naval Ravikant',
    authorTagline: 'Founder @ AngelList',
    language: 'en',
  },
  {
    id: '12',
    quote:
      'O erro de quem começa em SaaS: otimizar conversão antes de ter product-market fit. Você está otimizando o caminho errado.',
    authorName: 'Jason Cohen',
    authorTagline: 'Founder @ WP Engine',
    language: 'pt',
  },
  {
    id: '13',
    quote:
      'Metrics without context are just numbers. Numbers without action are just waste.',
    authorName: 'WM3 Digital',
    authorTagline: 'AI-First Agency',
    language: 'en',
  },
  {
    id: '14',
    quote:
      'La recurrencia no se construye con contratos, se construye con valor entregado consistentemente.',
    authorName: 'WM3 Digital',
    authorTagline: 'Agencia AI-First',
    language: 'es',
  },
  {
    id: '15',
    quote:
      'Se você não consegue explicar seu SaaS em uma frase, seu cliente não vai conseguir vender internamente pra empresa dele.',
    authorName: 'April Dunford',
    authorTagline: 'Author of Obviously Awesome',
    language: 'pt',
  },
  {
    id: '16',
    quote:
      'The hardest part of building SaaS isn\'t building features. It\'s saying no to features that don\'t align with your core value.',
    authorName: 'Jason Fried',
    authorTagline: 'Founder @ 37signals',
    language: 'en',
  },
  {
    id: '17',
    quote:
      'Copy que converte não é sobre você. É sobre o cliente vendo a própria dor refletida nas suas palavras.',
    authorName: 'Joanna Wiebe',
    authorTagline: 'Founder @ Copyhackers',
    language: 'pt',
  },
  {
    id: '18',
    quote:
      'Your landing page is not a brochure. It\'s a conversation. And conversations convert better than monologues.',
    authorName: 'Oli Gardner',
    authorTagline: 'Co-founder @ Unbounce',
    language: 'en',
  },
  {
    id: '19',
    quote:
      'A primeira venda é sobre confiança. A segunda venda é sobre entrega. A recorrência é sobre consistência.',
    authorName: 'WM3 Digital',
    authorTagline: 'Agência AI-First',
    language: 'pt',
  },
  {
    id: '20',
    quote:
      'No midas el éxito por cuántas funciones tienes, mídelo por cuántos problemas resuelves de forma consistente.',
    authorName: 'WM3 Digital',
    authorTagline: 'Agencia AI-First',
    language: 'es',
  },
];

// Helper to filter by language
export function getMuralEntriesByLanguage(
  language: 'pt' | 'en' | 'es'
): MuralEntry[] {
  return muralEntries.filter(
    (entry) => !entry.language || entry.language === language
  );
}

// Get random entry
export function getRandomMuralEntry(language?: 'pt' | 'en' | 'es'): MuralEntry {
  const entries = language
    ? getMuralEntriesByLanguage(language)
    : muralEntries;
  return entries[Math.floor(Math.random() * entries.length)];
}

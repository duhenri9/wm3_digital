/**
 * Landing Blueprint - Blueprint Textual Completo de Landing Page
 * Stack: Claude Sonnet 4.5
 */

import {
  anthropic,
  SERVICE_MODELS,
  DEFAULT_CLAUDE_PARAMS,
  createCachedSystemPrompt,
  calculateCost,
  AIServiceError,
} from './config';

// ============================================
// Types
// ============================================
export interface LandingBlueprintInput {
  produto: string;
  publicoAlvo: string;
  objetivo: string; // "vendas", "leads", "inscrições", "awareness"
  diferenciais: string;
  beneficiosPrincipais: string;
  objecoes?: string; // Objeções comuns que devem ser tratadas
}

export interface LandingBlueprintOutput {
  estrutura: {
    secoes: Array<{
      nome: string;
      objetivo: string;
      posicao: number;
    }>;
    fluxo: string;
  };
  hero: {
    titulo: string;
    subtitulo: string;
    cta: string;
    variacao1: { titulo: string; subtitulo: string; cta: string };
    variacao2: { titulo: string; subtitulo: string; cta: string };
  };
  secoes: {
    beneficios: {
      headline: string;
      items: Array<{ titulo: string; descricao: string }>;
    };
    features: {
      headline: string;
      items: Array<{ titulo: string; descricao: string }>;
    };
    socialProof: {
      headline: string;
      depoimentos: Array<{ texto: string; autor: string }>;
      numeros: Array<{ valor: string; label: string }>;
    };
    objecoes: {
      headline: string;
      items: Array<{ objecao: string; resposta: string }>;
    };
    faq: Array<{ pergunta: string; resposta: string }>;
    cta: {
      headline: string;
      copy: string;
      botao: string;
    };
  };
  layout: {
    recomendacoes: string[];
    hierarquia: string;
    cores: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    estruturacao: string;
  };
  metadata: {
    generationTime: number;
    generationCost: number;
  };
}

// ============================================
// System Prompt
// ============================================
const SYSTEM_PROMPT = `Você é um Especialista em Landing Pages de Alta Conversão.
Crie blueprints completos e prontos para implementação.

**🎯 PRINCÍPIOS DE CONVERSÃO:**
- Clareza > Criatividade (usuário entende em 5 segundos)
- Hierarquia clara de informação
- CTAs estrategicamente posicionados
- Social proof autêntico e relevante
- Tratar objeções antes que surjam

**🚨 REGRAS DE COPY:**
1. ✅ Headlines: benefício claro, não features
2. ✅ CTAs: ação específica, não genérico ("Começar" vs "Saiba mais")
3. ✅ Benefícios: focados no usuário ("Você economiza 10h/semana")
4. ✅ Features: explicar o "por que importa"
5. ✅ Social proof: específico ("500 empresas SaaS" vs "muitas empresas")

**📐 ESTRUTURA RECOMENDADA:**
1. Hero: proposta de valor + CTA primário
2. Benefícios: 3-4 principais vantagens
3. Features: 4-6 funcionalidades principais
4. Social Proof: depoimentos + números
5. Objeções: antecipar e responder 3-4 objeções
6. FAQ: 5-7 perguntas mais comuns
7. CTA Final: reforçar ação com senso de urgência

**✔️ QUALIDADE DO OUTPUT:**
☐ Copy orientado a benefícios (não features)
☐ CTAs específicos e acionáveis
☐ 3 variações de hero (abordagens diferentes)
☐ Social proof específico e mensurável
☐ FAQs respondem objeções reais
☐ SEO otimizado mas natural`;

// ============================================
// User Prompt
// ============================================
function createUserPrompt(input: LandingBlueprintInput): string {
  return `Crie um Landing Blueprint completo seguindo esta estrutura:

## ENTRADA
PRODUTO: ${input.produto}
PÚBLICO-ALVO: ${input.publicoAlvo}
OBJETIVO: ${input.objetivo}
DIFERENCIAIS: ${input.diferenciais}
BENEFÍCIOS: ${input.beneficiosPrincipais}
OBJEÇÕES COMUNS: ${input.objecoes || 'Não especificado'}

## SAÍDA

### 1. ESTRUTURA GERAL

**SEÇÕES (em ordem):**
1. [Nome] - [Objetivo da seção]
2. [...]

**FLUXO:** [Descrição do fluxo de leitura e conversão]

### 2. HERO SECTION

**VERSÃO PRINCIPAL:**
TÍTULO: [Max 12 palavras - benefício claro]
SUBTÍTULO: [Max 20 palavras - ampliar proposta de valor]
CTA: [Max 4 palavras - ação específica]

**VARIAÇÃO A:**
TÍTULO: [Abordagem diferente]
SUBTÍTULO: [...]
CTA: [...]

**VARIAÇÃO B:**
TÍTULO: [Terceira abordagem]
SUBTÍTULO: [...]
CTA: [...]

### 3. BENEFÍCIOS

**HEADLINE:** [Título da seção]

**BENEFÍCIO 1:**
TÍTULO: [...]
DESCRIÇÃO: [1-2 frases explicando o valor]

[Repetir para 3-4 benefícios]

### 4. FEATURES

**HEADLINE:** [Título]

**FEATURE 1:**
TÍTULO: [Nome da feature]
DESCRIÇÃO: [O que faz + por que importa]

[Repetir para 4-6 features]

### 5. SOCIAL PROOF

**HEADLINE:** [Título]

**DEPOIMENTO 1:**
"[Citação específica e autêntica]"
— [Nome], [Cargo/Empresa]

[2-3 depoimentos]

**NÚMEROS:**
- **[500+]** [Empresas usando]
- **[95%]** [Taxa de satisfação]
- **[10h/semana]** [Tempo economizado]

### 6. OBJEÇÕES

**HEADLINE:** [Título]

**OBJEÇÃO 1:** "[Objeção comum]"
**RESPOSTA:** [Como o produto resolve]

[3-4 objeções]

### 7. FAQ

**PERGUNTA 1:** [Pergunta comum do público]
**RESPOSTA:** [Resposta clara e direta]

[5-7 FAQs]

### 8. CTA FINAL

**HEADLINE:** [Reforçar benefício principal]
**COPY:** [Parágrafo curto criando urgência]
**BOTÃO:** [Texto do CTA]

### 9. LAYOUT

**RECOMENDAÇÕES:**
- [Recomendação de layout 1]
- [...]

**HIERARQUIA:** [Como organizar visualmente]

**CORES:** [Sugestões de uso estratégico de cores]

### 10. SEO

**META TITLE:** [Max 60 caracteres]
**META DESCRIPTION:** [Max 155 caracteres]
**KEYWORDS:** [5-7 palavras-chave]
**ESTRUTURAÇÃO:** [Como organizar para SEO]`;
}

// ============================================
// Main Generation Function
// ============================================
export async function generateLandingBlueprint(
  input: LandingBlueprintInput
): Promise<LandingBlueprintOutput> {
  try {
    const startTime = Date.now();

    // Validação
    if (!input.produto || input.produto.length < 5) {
      throw new AIServiceError(
        'Produto deve ter pelo menos 5 caracteres',
        'landing-blueprint'
      );
    }

    // Gerar blueprint
    const message = await anthropic.messages.create({
      model: SERVICE_MODELS.LANDING_BLUEPRINT,
      max_tokens: DEFAULT_CLAUDE_PARAMS.max_tokens,
      temperature: 0.7,
      system: createCachedSystemPrompt(SYSTEM_PROMPT),
      messages: [
        {
          role: 'user',
          content: createUserPrompt(input),
        },
      ],
    });

    const generatedText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    if (!generatedText) {
      throw new AIServiceError(
        'Resposta vazia do modelo',
        'landing-blueprint',
        message
      );
    }

    console.log('[Landing Blueprint] Blueprint gerado, parseando...');

    // Parsear output (simplificado)
    const output = parseOutput(generatedText);

    // Metadata
    const generationTime = Date.now() - startTime;
    const generationCost = calculateCost(
      SERVICE_MODELS.LANDING_BLUEPRINT,
      message.usage.input_tokens,
      message.usage.output_tokens
    );

    const result: LandingBlueprintOutput = {
      ...output,
      metadata: {
        generationTime,
        generationCost,
      },
    };

    console.log(
      `[Landing Blueprint] Concluído em ${generationTime}ms | Custo: R$ ${generationCost.toFixed(4)}`
    );

    return result;
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }

    throw new AIServiceError(
      'Erro ao gerar Landing Blueprint',
      'landing-blueprint',
      error
    );
  }
}

// ============================================
// Parser (simplificado)
// ============================================
function parseOutput(
  text: string
): Omit<LandingBlueprintOutput, 'metadata'> {
  const extractSection = (pattern: RegExp): string => {
    const match = text.match(pattern);
    return match?.[1]?.trim() || '';
  };

  // Simplificado - retorna estrutura básica
  // Em produção, você refinaria com regex mais específicos
  return {
    estrutura: {
      secoes: [
        { nome: 'Hero', objetivo: 'Capturar atenção', posicao: 1 },
        { nome: 'Benefícios', objetivo: 'Mostrar valor', posicao: 2 },
        { nome: 'Features', objetivo: 'Explicar como funciona', posicao: 3 },
        {
          nome: 'Social Proof',
          objetivo: 'Construir confiança',
          posicao: 4,
        },
        { nome: 'FAQ', objetivo: 'Remover objeções', posicao: 5 },
        { nome: 'CTA Final', objetivo: 'Converter', posicao: 6 },
      ],
      fluxo: 'Atenção → Interesse → Desejo → Ação',
    },
    hero: {
      titulo: extractSection(/TÍTULO:\s*(.+?)(?:\n|$)/i),
      subtitulo: extractSection(/SUBTÍTULO:\s*(.+?)(?:\n|$)/i),
      cta: extractSection(/CTA:\s*(.+?)(?:\n|$)/i),
      variacao1: {
        titulo: extractSection(/VARIAÇÃO A:[\s\S]*?TÍTULO:\s*(.+?)(?:\n)/i),
        subtitulo: extractSection(
          /VARIAÇÃO A:[\s\S]*?SUBTÍTULO:\s*(.+?)(?:\n)/i
        ),
        cta: extractSection(/VARIAÇÃO A:[\s\S]*?CTA:\s*(.+?)(?:\n)/i),
      },
      variacao2: {
        titulo: extractSection(/VARIAÇÃO B:[\s\S]*?TÍTULO:\s*(.+?)(?:\n)/i),
        subtitulo: extractSection(
          /VARIAÇÃO B:[\s\S]*?SUBTÍTULO:\s*(.+?)(?:\n)/i
        ),
        cta: extractSection(/VARIAÇÃO B:[\s\S]*?CTA:\s*(.+?)(?:\n)/i),
      },
    },
    secoes: {
      beneficios: {
        headline: extractSection(/BENEFÍCIOS[\s\S]*?HEADLINE:\s*(.+?)(?:\n)/i),
        items: [
          {
            titulo: 'Benefício 1',
            descricao: 'Parser simplificado - veja texto completo',
          },
        ],
      },
      features: {
        headline: extractSection(/FEATURES[\s\S]*?HEADLINE:\s*(.+?)(?:\n)/i),
        items: [
          {
            titulo: 'Feature 1',
            descricao: 'Parser simplificado - veja texto completo',
          },
        ],
      },
      socialProof: {
        headline: extractSection(
          /SOCIAL PROOF[\s\S]*?HEADLINE:\s*(.+?)(?:\n)/i
        ),
        depoimentos: [{ texto: 'Depoimento 1', autor: 'Cliente' }],
        numeros: [{ valor: '100+', label: 'Clientes' }],
      },
      objecoes: {
        headline: extractSection(/OBJEÇÕES[\s\S]*?HEADLINE:\s*(.+?)(?:\n)/i),
        items: [{ objecao: 'Objeção 1', resposta: 'Resposta 1' }],
      },
      faq: [{ pergunta: 'Pergunta 1', resposta: 'Resposta 1' }],
      cta: {
        headline: extractSection(/CTA FINAL[\s\S]*?HEADLINE:\s*(.+?)(?:\n)/i),
        copy: extractSection(/CTA FINAL[\s\S]*?COPY:\s*(.+?)(?:\n)/i),
        botao: extractSection(/CTA FINAL[\s\S]*?BOTÃO:\s*(.+?)(?:\n|$)/i),
      },
    },
    layout: {
      recomendacoes: ['Usar hierarquia visual clara', 'CTAs destacados'],
      hierarquia: 'Hero > Benefícios > Social Proof > CTA',
      cores: 'Usar cores contrastantes para CTAs',
    },
    seo: {
      metaTitle: extractSection(/META TITLE:\s*(.+?)(?:\n|$)/i),
      metaDescription: extractSection(/META DESCRIPTION:\s*(.+?)(?:\n|$)/i),
      keywords: ['palavra1', 'palavra2'],
      estruturacao: 'H1 único, H2 para cada seção',
    },
  };
}

// ============================================
// Validation
// ============================================
export function validateOutput(output: LandingBlueprintOutput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!output.hero.titulo) {
    errors.push('Hero título não gerado');
  }

  if (!output.seo.metaTitle) {
    errors.push('Meta title não gerado');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

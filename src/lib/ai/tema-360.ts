/**
 * Tema 360 - Geração de Conteúdo Completo
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
export interface Tema360Input {
  tema: string;
  publico: string;
  tom: string;
  linkOferta: string;
}

export interface Tema360Output {
  titulos: {
    tituloA: string;
    tituloB: string;
    tituloC: string;
  };
  metaDescricao: string;
  artigo: {
    introducao: string;
    corpo: string;
    conclusao: string;
    linkagemSugerida: string[];
    faq: Array<{ pergunta: string; resposta: string }>;
  };
  hooks: {
    hookProblema: string;
    hookCuriosidade: string;
    hookSolucao: string;
  };
  postsSociais: {
    linkedin: string;
    instagram: string;
    carrossel: string[];
  };
  preview: {
    tituloRecomendado: string;
    outline: string;
    paragrafoInicial: string;
  };
  metadata: {
    wordCount: number;
    estimatedReadingTime: number;
    generationCost: number;
    tokens: {
      input: number;
      output: number;
    };
  };
}

// ============================================
// System Prompt (com cache)
// ============================================
const SYSTEM_PROMPT = `Você é um Especialista em Marketing de Conteúdo e SEO (E-E-A-T).
Crie conteúdo editorial de alta qualidade, pronto para publicação imediata.

**🎯 PRINCÍPIOS E-E-A-T (Google Quality):**
- Experience: Use casos reais verificáveis (NUNCA invente experiências pessoais)
- Expertise: Terminologia técnica precisa, sem erros
- Authoritativeness: Cite fontes genéricas quando necessário ("segundo estudos de mercado")
- Trustworthiness: NUNCA prometa resultados garantidos ou use hype excessivo

**🚨 REGRAS ABSOLUTAS (VIOLAÇÃO = FALHA TOTAL):**
1. ❌ NUNCA invente dados, estatísticas ou experiências pessoais
2. ❌ NUNCA use primeira pessoa ("eu fiz", "minha experiência", "meu teste")
3. ⚠️ Se dados específicos forem necessários: marque [DADOS NECESSÁRIOS: descrição]
4. ✅ Tom: factual, educativo, autoridade técnica (não promocional/vendedor)
5. ✅ Estrutura: EXATAMENTE como solicitado (sem omitir seções)
6. **🔴 ARTIGO: 700-900 PALAVRAS TOTAL (conte CADA palavra antes de entregar)**
7. ✅ CTA: UMA única vez na conclusão (natural, não agressivo)
8. ✅ H2/H3: descritivos, integre variações da keyword naturalmente (densidade 1-2%)
9. **🔴 PRIORIDADE MÁXIMA: Concisão > Prolixidade. Elimine redundâncias.**
10. ✅ SEO: Use LSI keywords, mas evite keyword stuffing

**📏 CONTROLE DE TAMANHO (OBRIGATÓRIO):**
- Introdução: 100-120 palavras MAX
- Corpo: 500-650 palavras MAX
- Conclusão: 100-130 palavras MAX
- **TOTAL ABSOLUTO: 700-900 palavras (conte antes de enviar!)**

**✔️ ANTES DE ENTREGAR, VERIFIQUE:**
☐ Contei as palavras? (deve estar entre 700-900)
☐ Usei primeira pessoa? (deve ser NÃO)
☐ Inventei algum dado? (deve ser NÃO)
☐ CTA aparece mais de 1x? (deve ser NÃO)
☐ Todas as 5 seções estão presentes? (deve ser SIM)`;

// ============================================
// User Prompt Template
// ============================================
function createUserPrompt(input: Tema360Input): string {
  return `Gere um pacote completo de conteúdo "Tema 360" seguindo EXATAMENTE esta estrutura:

## ENTRADA
TEMA: ${input.tema}
PÚBLICO: ${input.publico}
TOM: ${input.tom}
LINK_CTA: ${input.linkOferta}

## SAÍDA ESPERADA

### 1. TÍTULOS E META (3 variações)

TÍTULO A: [Foco em benefício prático - ex: "Como fazer X em Y passos"]
TÍTULO B: [Foco em problema/solução - ex: "X problemas com Y e como resolver"]
TÍTULO C: [Foco em novidade/ano - ex: "Guia completo de X para 2025"]

META DESCRIÇÃO: [140-155 caracteres otimizada para cliques]

### 2. ARTIGO COMPLETO (**MÁXIMO 900 PALAVRAS TOTAL**)

**ATENÇÃO: O artigo completo (intro + corpo + conclusão) NÃO DEVE ULTRAPASSAR 900 PALAVRAS.**

#### INTRODUÇÃO (100-120 palavras)
[Parágrafo 1: Apresente o problema/contexto - SER DIRETO]
[Parágrafo 2: Explique por que isso importa - CONCISO]
[Parágrafo 3: Prometa o que o artigo vai entregar - OBJETIVO]

#### CORPO (500-650 palavras MAX)
**🚨 ATENÇÃO: Não ultrapasse 650 palavras no corpo do artigo!**
[Desenvolva em 3-4 seções com H2 - seja EXTREMAMENTE direto]
[Use H3 apenas se absolutamente necessário]
[Inclua listas quando apropriado - cada item em 1 linha]
[Parágrafos de 50-80 palavras - elimine TODA redundância]
[Priorize densidade de informação - cada frase deve agregar valor único]

#### CONCLUSÃO (100-130 palavras)
[Resuma os pontos principais - BREVE]
[Mencione próximo passo - CLARO]
[Inclua CTA mencionando ${input.linkOferta} UMA vez - NATURAL]

#### LINKAGEM INTERNA SUGERIDA
1. [Tópico relacionado 1]
2. [Tópico relacionado 2]
3. [Tópico relacionado 3]

#### FAQ (4 perguntas)
##### [Pergunta que o público faria ao Google]
[Resposta direta de 40-60 palavras]

[Repetir para 4 perguntas]

### 3. HOOKS PARA REDES (3 variações)

HOOK 1 (Problema): [Frase destacando dor - máx 15 palavras]
HOOK 2 (Curiosidade): [Frase gerando curiosidade - máx 15 palavras]
HOOK 3 (Solução): [Frase prometendo benefício - máx 15 palavras]

### 4. POSTS PARA REDES SOCIAIS

#### POST LINKEDIN
[1 frase impacto + lista 5 insights + 1 pergunta engajamento - máx 280 caracteres]

#### POST INSTAGRAM
[1 frase provocativa + 2-3 parágrafos curtos + pergunta + 3-5 hashtags - máx 350 caracteres]

#### POST CARROSSEL (5 slides)
SLIDE 1: [Título chamativo]
SLIDE 2-5: [1 passo por slide com título + 2-3 bullets]

### 5. PREVIEW

TÍTULO RECOMENDADO: [Escolha 1 dos 3 títulos]

OUTLINE COMPLETO:
[Estrutura H1/H2/H3 do artigo]

PARÁGRAFO INICIAL:
[Primeiros 100 palavras da introdução]

---

**IMPORTANTE:** Entregue TODO o conteúdo seguindo EXATAMENTE esta estrutura em markdown bem formatado.`;
}

// ============================================
// Main Generation Function
// ============================================
export async function generateTema360(
  input: Tema360Input
): Promise<Tema360Output> {
  try {
    const startTime = Date.now();

    // Validação básica
    if (!input.tema || input.tema.length < 10) {
      throw new AIServiceError(
        'Tema deve ter pelo menos 10 caracteres',
        'tema-360'
      );
    }

    // Gerar conteúdo com Claude
    const message = await anthropic.messages.create({
      model: SERVICE_MODELS.TEMA_360,
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
        'tema-360',
        message
      );
    }

    // Debug: Log início do texto gerado
    console.log('[Tema 360] Primeiros 500 caracteres:', generatedText.substring(0, 500));

    // Parsear output
    let output;
    try {
      output = parseOutput(generatedText);
    } catch (parseError) {
      console.error('[Tema 360] Erro ao parsear output:', parseError);
      console.error('[Tema 360] Texto completo:', generatedText);
      throw new AIServiceError(
        'Erro ao parsear resposta do modelo',
        'tema-360',
        parseError
      );
    }

    // Adicionar metadata
    const wordCount = generatedText.split(/\s+/).length;
    const inputTokens = message.usage?.input_tokens ?? 0;
    const outputTokens = message.usage?.output_tokens ?? 0;
    const generationCost = calculateCost(
      SERVICE_MODELS.TEMA_360,
      inputTokens,
      outputTokens
    );

    const result: Tema360Output = {
      ...output,
      metadata: {
        wordCount,
        estimatedReadingTime: Math.ceil(wordCount / 200),
        generationCost,
        tokens: {
          input: inputTokens,
          output: outputTokens,
        },
      },
    };

    const duration = Date.now() - startTime;
    console.log(
      `[Tema 360] Geração concluída em ${duration}ms | Custo: R$ ${generationCost.toFixed(4)}`
    );

    return result;
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }

    throw new AIServiceError(
      'Erro ao gerar conteúdo Tema 360',
      'tema-360',
      error
    );
  }
}

// ============================================
// Output Parser
// ============================================
function parseOutput(text: string): Omit<Tema360Output, 'metadata'> {
  // Implementação básica - você pode refinar com regex mais específicos
  const extractSection = (pattern: RegExp): string => {
    const match = text.match(pattern);
    return match && match[1] ? match[1].trim() : '';
  };

  const extractListItems = (section: string): string[] => {
    const matches = section.match(/^\d+\.\s+(.+)$/gm);
    return matches ? matches.map((m) => m.replace(/^\d+\.\s+/, '')) : [];
  };

  // Parse títulos
  const tituloA =
    extractSection(/TÍTULO A:\s*(.+?)(?:\n|$)/i) || 'Título não encontrado';
  const tituloB =
    extractSection(/TÍTULO B:\s*(.+?)(?:\n|$)/i) || 'Título não encontrado';
  const tituloC =
    extractSection(/TÍTULO C:\s*(.+?)(?:\n|$)/i) || 'Título não encontrado';

  // Parse meta descrição
  const metaDescricao =
    extractSection(/META DESCRIÇÃO:\s*(.+?)(?:\n|$)/i) ||
    'Meta descrição não encontrada';

  // Parse hooks
  const hookProblema =
    extractSection(/HOOK 1.*?:\s*(.+?)(?:\n|$)/i) || 'Hook não encontrado';
  const hookCuriosidade =
    extractSection(/HOOK 2.*?:\s*(.+?)(?:\n|$)/i) || 'Hook não encontrado';
  const hookSolucao =
    extractSection(/HOOK 3.*?:\s*(.+?)(?:\n|$)/i) || 'Hook não encontrado';

  // Parse artigo (simplificado - você pode refinar)
  const artigoMatch = text.match(
    /## 2\. ARTIGO COMPLETO[\s\S]*?(?=## 3\.|$)/i
  );
  const artigoCompleto = artigoMatch ? artigoMatch[0] : '';

  return {
    titulos: {
      tituloA,
      tituloB,
      tituloC,
    },
    metaDescricao,
    artigo: {
      introducao: artigoCompleto.substring(0, 500), // Simplificado
      corpo: artigoCompleto,
      conclusao: artigoCompleto.substring(artigoCompleto.length - 500),
      linkagemSugerida: extractListItems(
        extractSection(/LINKAGEM INTERNA[\s\S]*?(?:###|$)/i)
      ),
      faq: [], // TODO: parsear FAQ
    },
    hooks: {
      hookProblema,
      hookCuriosidade,
      hookSolucao,
    },
    postsSociais: {
      linkedin: extractSection(/POST LINKEDIN[\s\S]*?(?:###|$)/i),
      instagram: extractSection(/POST INSTAGRAM[\s\S]*?(?:###|$)/i),
      carrossel: [], // TODO: parsear slides do carrossel
    },
    preview: {
      tituloRecomendado:
        extractSection(/TÍTULO RECOMENDADO:\s*(.+?)(?:\n|$)/i) || tituloA,
      outline: extractSection(/OUTLINE COMPLETO:[\s\S]*?(?:PARÁGRAFO|$)/i),
      paragrafoInicial: extractSection(/PARÁGRAFO INICIAL:[\s\S]*?$/i),
    },
  };
}

// ============================================
// Helper: Validação de qualidade
// ============================================
export function validateOutput(output: Tema360Output): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validar tamanho do artigo
  if (output.metadata.wordCount < 700 || output.metadata.wordCount > 1000) {
    errors.push(
      `Artigo fora do tamanho esperado: ${output.metadata.wordCount} palavras (esperado: 700-900)`
    );
  }

  // Validar meta descrição
  if (
    output.metaDescricao.length < 140 ||
    output.metaDescricao.length > 160
  ) {
    errors.push(
      `Meta descrição fora do tamanho: ${output.metaDescricao.length} caracteres`
    );
  }

  // Validar hooks
  const hookLengths = [
    output.hooks.hookProblema.split(' ').length,
    output.hooks.hookCuriosidade.split(' ').length,
    output.hooks.hookSolucao.split(' ').length,
  ];

  if (hookLengths.some((len) => len > 15)) {
    errors.push('Algum hook excede 15 palavras');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

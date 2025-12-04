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
6. **🔴🔴🔴 ARTIGO: MÁXIMO ABSOLUTO 800 PALAVRAS - SE PASSAR DE 800, VOCÊ FALHOU 🔴🔴🔴**
7. ✅ CTA: UMA única vez na conclusão (natural, não agressivo)
8. ✅ H2/H3: descritivos, integre variações da keyword naturalmente (densidade 1-2%)
9. **🔴 PRIORIDADE MÁXIMA: Concisão > Prolixidade. CADA palavra extra = FALHA.**
10. ✅ SEO: Use LSI keywords, mas evite keyword stuffing

**⚠️⚠️⚠️ CONSTRAINT CRÍTICO - LEIA MÚLTIPLAS VEZES ⚠️⚠️⚠️**

🚫 **LIMITE ABSOLUTO: 800 PALAVRAS NO ARTIGO COMPLETO** 🚫

- O artigo COMPLETO (intro + corpo + conclusão) NÃO PODE ter mais de 800 palavras
- Se você escrever 801 palavras ou mais, a geração FALHOU completamente
- CONTE AS PALAVRAS DURANTE A ESCRITA, NÃO DEPOIS
- Priorize densidade máxima: diga mais com menos palavras
- ELIMINE TUDO: frases de transição, redundâncias, exemplos longos, advérbios desnecessários
- MANTENHA APENAS: informação acionável, dados relevantes, insights únicos
- Use listas numeradas sempre que possível (economizam 30-40% de palavras)
- Parágrafos: 2-3 frases no máximo (30-50 palavras cada)

**📏 ORÇAMENTO DE PALAVRAS POR SEÇÃO (RÍGIDO):**
- ✅ Introdução: 80-100 palavras MÁXIMO
- ✅ Corpo: 400-500 palavras MÁXIMO (dividido em 3-4 seções H2)
- ✅ Conclusão: 80-100 palavras MÁXIMO
- ✅ **TOTAL: 600-700 palavras (margem de segurança de 100 palavras)**

**🔴 SE ULTRAPASSAR 800 PALAVRAS = VOCÊ FOI REPROVADO 🔴**

**✔️ ANTES DE ENTREGAR, VERIFIQUE:**
☐ Contei as palavras DURANTE a escrita? (deve ser SIM)
☐ Total está entre 600-800 palavras? (deve ser SIM)
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

### 2. ARTIGO COMPLETO (**ORÇAMENTO: 600-700 PALAVRAS | LIMITE MÁXIMO: 800 PALAVRAS**)

**🔴🔴🔴 ATENÇÃO CRÍTICA - LEIA 3 VEZES:**
- Artigo COMPLETO: ORÇAMENTO de 600-700 palavras | LIMITE ABSOLUTO de 800 palavras
- Se ultrapassar 800 palavras = GERAÇÃO FALHOU COMPLETAMENTE
- CONTE AS PALAVRAS A CADA PARÁGRAFO QUE ESCREVER
- Ao chegar em 700 palavras, FINALIZE IMEDIATAMENTE
- Cada palavra acima de 800 = VOCÊ FOI REPROVADO

**📊 ORÇAMENTO POR SEÇÃO (SIGA RIGOROSAMENTE):**

#### INTRODUÇÃO (80-100 palavras | MÁXIMO ABSOLUTO: 100)
**Orçamento: 80-100 palavras**
[Parágrafo 1: Problema/contexto - 25-35 palavras]
[Parágrafo 2: Por que importa - 25-35 palavras]
[Parágrafo 3: O que o artigo entrega - 25-35 palavras]

#### CORPO (400-500 palavras | MÁXIMO ABSOLUTO: 500)
**Orçamento: 400-500 palavras TOTAL para TODAS as seções H2**
**IMPORTANTE: Divida esse orçamento entre 3-4 seções H2 (100-125 palavras cada)**

[SEÇÃO H2 #1: 100-125 palavras]
- Use listas numeradas (economizam 30-40% de palavras)
- Máximo 3-4 bullets por lista
- Parágrafos: 2-3 frases (30-40 palavras cada)

[SEÇÃO H2 #2: 100-125 palavras]
[SEÇÃO H2 #3: 100-125 palavras]
[SEÇÃO H2 #4 (opcional): 100-125 palavras]

**ELIMINE COMPLETAMENTE:**
- Frases de transição ("além disso", "por exemplo", "é importante notar")
- Advérbios desnecessários ("realmente", "muito", "extremamente")
- Redundâncias e repetições
- Exemplos longos (use bullets)

**MANTENHA APENAS:**
- Informação acionável e prática
- Dados relevantes (números, percentuais)
- Insights únicos

#### CONCLUSÃO (80-100 palavras | MÁXIMO ABSOLUTO: 100)
**Orçamento: 80-100 palavras**
[Resumo: 30-40 palavras]
[Próximo passo: 25-35 palavras]
[CTA com ${input.linkOferta}: 25-30 palavras]

**🎯 TOTAL ESPERADO: 600-700 palavras (margem de 100 palavras até o limite de 800)**

#### LINKAGEM INTERNA SUGERIDA
1. [Tópico relacionado 1]
2. [Tópico relacionado 2]
3. [Tópico relacionado 3]

#### FAQ (4 perguntas - RESPOSTAS CURTAS)
##### [Pergunta que o público faria ao Google]
[Resposta DIRETA de 35-50 palavras - SEM prolixidade]

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
[Primeiros 80 palavras da introdução]

---

**CHECKLIST FINAL ANTES DE ENVIAR:**
☐ Contei as palavras do artigo completo? (deve estar entre 600-800)
☐ Introdução tem 80-100 palavras?
☐ Corpo tem 400-500 palavras?
☐ Conclusão tem 80-100 palavras?
☐ Total NÃO ultrapassa 800 palavras?

**SE QUALQUER RESPOSTA FOR "NÃO", REESCREVA MAIS CURTO!**`;
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
// Multi-Step Generation (Controle Preciso de Word Count)
// ============================================

/**
 * Step 1: Gerar outline do artigo
 */
async function generateOutline(input: Tema360Input): Promise<{
  titulo: string;
  secoes: Array<{ h2: string; h3?: string[] }>;
}> {
  const prompt = `Crie um outline conciso para artigo sobre: "${input.tema}"

PÚBLICO: ${input.publico}
TOM: ${input.tom}

RETORNE APENAS:
TÍTULO: [título otimizado SEO]

SEÇÃO 1: [H2 title - ex: "Como funciona X"]
SEÇÃO 2: [H2 title]
SEÇÃO 3: [H2 title]
SEÇÃO 4: [H2 title - opcional]

**Máximo 4 seções H2. Seja direto e claro.**`;

  const message = await anthropic.messages.create({
    model: SERVICE_MODELS.TEMA_360,
    max_tokens: 500,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';

  // Parse outline
  const tituloMatch = text.match(/TÍTULO:\s*(.+)/i);
  const titulo = tituloMatch ? tituloMatch[1].trim() : '';

  const secoes: Array<{ h2: string }> = [];
  const secaoMatches = text.matchAll(/SEÇÃO \d+:\s*(.+)/gi);

  for (const match of secaoMatches) {
    secoes.push({ h2: match[1].trim() });
  }

  return { titulo, secoes };
}

/**
 * Step 2: Gerar seção específica com limite rígido
 */
async function generateSection(
  sectionTitle: string,
  input: Tema360Input,
  wordLimit: number
): Promise<string> {
  const prompt = `Escreva APENAS esta seção do artigo:

## ${sectionTitle}

TEMA GERAL: ${input.tema}
PÚBLICO: ${input.publico}
TOM: ${input.tom}

**🔴 LIMITE ABSOLUTO: ${wordLimit} PALAVRAS 🔴**

REGRAS:
- Use listas numeradas quando possível
- Parágrafos: 2-3 frases (30-40 palavras)
- ELIMINE: frases de transição, redundâncias
- MANTENHA: apenas informação acionável

**Pare IMEDIATAMENTE ao atingir ${wordLimit} palavras.**

Escreva a seção agora:`;

  const message = await anthropic.messages.create({
    model: SERVICE_MODELS.TEMA_360,
    max_tokens: Math.ceil(wordLimit * 1.5), // tokens ~= palavras * 1.5
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';

  // Truncar se exceder limite
  const words = text.split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  return text;
}

/**
 * Main Multi-Step Generation Function
 */
export async function generateTema360MultiStep(
  input: Tema360Input
): Promise<Tema360Output> {
  try {
    const startTime = Date.now();
    console.log('[Tema 360 Multi-Step] Iniciando geração em etapas...');

    // Step 1: Gerar outline
    console.log('[Step 1/6] Gerando outline...');
    const outline = await generateOutline(input);

    // Step 2: Gerar introdução
    console.log('[Step 2/6] Gerando introdução (90 palavras)...');
    const introducao = await generateSection(
      'Introdução',
      { ...input, tema: `Introduza o tema: ${input.tema}` },
      90
    );

    // Step 3: Gerar cada seção H2 do corpo
      const corpoSections: string[] = [];

    for (let i = 0; i < outline.secoes.length; i++) {
      const secao = outline.secoes[i];
      console.log(`[Step ${3 + i}/6] Gerando seção "${secao.h2}" (110 palavras)...`);

        const secaoContent = await generateSection(secao.h2, input, 110);
        corpoSections.push(`### ${secao.h2}\n\n${secaoContent}`);
    }

    const corpo = corpoSections.join('\n\n');

    // Step 4: Gerar conclusão
    console.log('[Step 5/6] Gerando conclusão (90 palavras)...');
    const conclusao = await generateSection(
      'Conclusão',
      { ...input, tema: `Conclua o artigo sobre: ${input.tema}. CTA: ${input.linkOferta}` },
      90
    );

    // Step 5: Gerar títulos, meta, hooks, posts (single call)
    console.log('[Step 6/6] Gerando meta, hooks e posts sociais...');
    const metaPrompt = `Gere APENAS:

TÍTULO A: [foco benefício]
TÍTULO B: [foco problema/solução]
TÍTULO C: [foco novidade 2025]

META DESCRIÇÃO: [140-155 caracteres]

HOOK 1: [problema - 15 palavras]
HOOK 2: [curiosidade - 15 palavras]
HOOK 3: [solução - 15 palavras]

POST LINKEDIN: [280 caracteres]
POST INSTAGRAM: [350 caracteres]

TEMA: ${input.tema}`;

    const metaMessage = await anthropic.messages.create({
      model: SERVICE_MODELS.TEMA_360,
      max_tokens: 800,
      temperature: 0.7,
      messages: [{ role: 'user', content: metaPrompt }],
    });

    const metaText = metaMessage.content[0].type === 'text' ? metaMessage.content[0].text : '';

    // Parse meta content
    const tituloA = metaText.match(/TÍTULO A:\s*(.+)/i)?.[1]?.trim() || outline.titulo;
    const tituloB = metaText.match(/TÍTULO B:\s*(.+)/i)?.[1]?.trim() || outline.titulo;
    const tituloC = metaText.match(/TÍTULO C:\s*(.+)/i)?.[1]?.trim() || outline.titulo;
    const metaDescricao = metaText.match(/META DESCRIÇÃO:\s*(.+)/i)?.[1]?.trim() || '';

    const hookProblema = metaText.match(/HOOK 1:\s*(.+)/i)?.[1]?.trim() || '';
    const hookCuriosidade = metaText.match(/HOOK 2:\s*(.+)/i)?.[1]?.trim() || '';
    const hookSolucao = metaText.match(/HOOK 3:\s*(.+)/i)?.[1]?.trim() || '';

    const linkedin = metaText.match(/POST LINKEDIN:\s*(.+)/i)?.[1]?.trim() || '';
    const instagram = metaText.match(/POST INSTAGRAM:\s*(.+)/i)?.[1]?.trim() || '';

    // Calcular word count total
    const artigoCompleto = `${introducao}\n\n${corpo}\n\n${conclusao}`;
    const wordCount = artigoCompleto.split(/\s+/).length;

    // Mock FAQ (pode ser melhorado depois)
    const faq = [
      { pergunta: 'Pergunta 1', resposta: 'Resposta 1' },
      { pergunta: 'Pergunta 2', resposta: 'Resposta 2' },
      { pergunta: 'Pergunta 3', resposta: 'Resposta 3' },
      { pergunta: 'Pergunta 4', resposta: 'Resposta 4' },
    ];

    // Calcular custo total (múltiplas chamadas)
    const estimatedCost = 0.35; // Aproximado para multi-step

    const result: Tema360Output = {
      titulos: { tituloA, tituloB, tituloC },
      metaDescricao,
      artigo: {
        introducao,
        corpo,
        conclusao,
        linkagemSugerida: [
          'Tópico relacionado 1',
          'Tópico relacionado 2',
          'Tópico relacionado 3',
        ],
        faq,
      },
      hooks: {
        hookProblema,
        hookCuriosidade,
        hookSolucao,
      },
      postsSociais: {
        linkedin,
        instagram,
        carrossel: [],
      },
      preview: {
        tituloRecomendado: tituloA,
        outline: outline.secoes.map(s => `## ${s.h2}`).join('\n'),
        paragrafoInicial: introducao.substring(0, 200),
      },
      metadata: {
        wordCount,
        estimatedReadingTime: Math.ceil(wordCount / 200),
        generationCost: estimatedCost,
        tokens: {
          input: 0, // Não temos token count preciso em multi-step
          output: 0,
        },
      },
    };

    const duration = Date.now() - startTime;
    console.log(
      `[Tema 360 Multi-Step] ✅ Concluído em ${duration}ms | ${wordCount} palavras`
    );

    return result;
  } catch (error) {
    console.error('[Tema 360 Multi-Step] Erro:', error);
    throw new AIServiceError(
      'Erro na geração multi-step do Tema 360',
      'tema-360-multistep',
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

  // Validar tamanho do artigo - RIGOROSO
  if (output.metadata.wordCount < 600) {
    errors.push(
      `Artigo muito curto: ${output.metadata.wordCount} palavras (mínimo: 600)`
    );
  }

  if (output.metadata.wordCount > 800) {
    errors.push(
      `🔴 CRÍTICO: Artigo excedeu limite: ${output.metadata.wordCount} palavras (máximo: 800)`
    );
  }

  // Warning se estiver muito perto do limite
  if (output.metadata.wordCount > 750 && output.metadata.wordCount <= 800) {
    errors.push(
      `⚠️ Aviso: Artigo muito próximo do limite: ${output.metadata.wordCount} palavras (máximo: 800)`
    );
  }

  // Alerta se estiver abaixo do orçamento ideal
  if (output.metadata.wordCount < 650 && output.metadata.wordCount >= 600) {
    errors.push(
      `⚠️ Aviso: Artigo abaixo do orçamento ideal: ${output.metadata.wordCount} palavras (ideal: 650-750)`
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

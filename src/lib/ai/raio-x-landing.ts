/**
 * Raio-X de Landing - Análise Automatizada de Landing Pages
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
export interface RaioXInput {
  url: string;
  produto: string;
  publicoAlvo: string;
  objetivoPrincipal: string; // "conversão", "leads", "awareness"
}

export interface RaioXOutput {
  analiseGeral: {
    score: number; // 0-100
    resumo: string;
    pontosFortes: string[];
    pontosFracos: string[];
  };
  heroAtual: {
    titulo: string;
    subtitulo: string;
    cta: string;
    problemas: string[];
    sugestoes: string[];
  };
  sugestoesHero: {
    variacao1: {
      titulo: string;
      subtitulo: string;
      cta: string;
      justificativa: string;
    };
    variacao2: {
      titulo: string;
      subtitulo: string;
      cta: string;
      justificativa: string;
    };
    variacao3: {
      titulo: string;
      subtitulo: string;
      cta: string;
      justificativa: string;
    };
  };
  recomendacoes: {
    uxUI: string[];
    copy: string[];
    conversao: string[];
    seo: string[];
  };
  proximosPassos: string[];
  metadata: {
    analysisTime: number;
    generationCost: number;
  };
}

// ============================================
// System Prompt (com cache)
// ============================================
const SYSTEM_PROMPT = `Você é um Especialista em CRO (Conversion Rate Optimization), UX/UI e Copywriting.
Analise landing pages de forma crítica e objetiva, identificando problemas reais e sugerindo melhorias acion\u00e1veis.

**🎯 PRINCÍPIOS DE ANÁLISE:**
- Priorize conversão > estética
- Identifique barreiras de conversão concretas
- Seja direto e específico nas críticas
- Sugestões devem ser acionáveis, não genéricas
- Considere o público-alvo e objetivo do negócio

**🚨 REGRAS ABSOLUTAS:**
1. ❌ NUNCA seja vago ("melhorar o design", "otimizar o copy")
2. ✅ Seja específico ("reduzir o título de 15 para 8 palavras", "adicionar prova social acima do CTA")
3. ✅ Score deve refletir REALIDADE (não seja generoso demais)
4. ✅ Cada problema identificado deve ter uma sugestão concreta
5. ✅ Hero variations devem ser DIFERENTES entre si (não apenas reformulações)
6. ✅ CTAs devem ser específicos para o produto (não "Saiba mais" genérico)

**📊 CRITÉRIOS DE AVALIAÇÃO:**
- Clareza da proposta de valor (peso 25%)
- Força do CTA e posicionamento (peso 20%)
- Hierarquia visual e fluxo (peso 15%)
- Prova social e credibilidade (peso 15%)
- Velocidade de carga e mobile (peso 10%)
- SEO e acessibilidade (peso 10%)
- Copy e persuasão (peso 5%)

**✔️ OUTPUT ESPERADO:**
- Score honesto baseado em critérios objetivos
- 3-5 pontos fortes concretos
- 5-8 pontos fracos específicos
- 3 variações de hero DISTINTAS (não apenas rewrites)
- Recomendações agrupadas por categoria
- Próximos passos priorizados`;

// ============================================
// User Prompt Template
// ============================================
function createUserPrompt(input: RaioXInput): string {
  return `Analise esta landing page e forneça um Raio-X completo seguindo EXATAMENTE esta estrutura:

## ENTRADA
URL: ${input.url}
PRODUTO/SERVIÇO: ${input.produto}
PÚBLICO-ALVO: ${input.publicoAlvo}
OBJETIVO: ${input.objetivoPrincipal}

## SAÍDA ESPERADA

### 1. ANÁLISE GERAL

**SCORE: [0-100]**
[Justifique o score em 2-3 linhas baseado nos critérios de avaliação]

**PONTOS FORTES (3-5):**
1. [Aspecto específico que funciona bem]
2. [Outro ponto forte concreto]
3. [...]

**PONTOS FRACOS (5-8):**
1. [Problema específico identificado]
2. [Outro problema concreto]
3. [...]

### 2. ANÁLISE DO HERO ATUAL

**TÍTULO ATUAL:**
[Copie o título exato da landing]

**SUBTÍTULO ATUAL:**
[Copie o subtítulo exato]

**CTA ATUAL:**
[Copie o texto do botão principal]

**PROBLEMAS IDENTIFICADOS:**
1. [Problema específico do hero]
2. [Outro problema]
3. [...]

**SUGESTÕES DE MELHORIA:**
1. [Sugestão concreta e acionável]
2. [Outra sugestão específica]
3. [...]

### 3. SUGESTÕES DE HERO (3 VARIAÇÕES DISTINTAS)

#### VARIAÇÃO 1: [Nome descritivo da abordagem]

**TÍTULO:**
[Novo título - máx 12 palavras]

**SUBTÍTULO:**
[Novo subtítulo - máx 20 palavras]

**CTA:**
[Novo texto do botão - máx 4 palavras]

**JUSTIFICATIVA:**
[Por que esta abordagem funcionaria melhor - 2-3 linhas]

---

#### VARIAÇÃO 2: [Nome descritivo da abordagem DIFERENTE]

**TÍTULO:**
[Novo título com abordagem diferente]

**SUBTÍTULO:**
[Novo subtítulo com ângulo diferente]

**CTA:**
[Novo CTA com urgência/benefício]

**JUSTIFICATIVA:**
[Por que esta abordagem funcionaria - 2-3 linhas]

---

#### VARIAÇÃO 3: [Nome descritivo da TERCEIRA abordagem]

**TÍTULO:**
[Terceiro título com ângulo único]

**SUBTÍTULO:**
[Terceiro subtítulo]

**CTA:**
[Terceiro CTA]

**JUSTIFICATIVA:**
[Por que funcionaria - 2-3 linhas]

### 4. RECOMENDAÇÕES POR CATEGORIA

#### UX/UI (3-5 itens)
1. [Recomendação específica de interface]
2. [...]

#### COPY (3-5 itens)
1. [Recomendação específica de texto]
2. [...]

#### CONVERSÃO (3-5 itens)
1. [Recomendação para aumentar conversão]
2. [...]

#### SEO (2-3 itens)
1. [Recomendação de SEO]
2. [...]

### 5. PRÓXIMOS PASSOS PRIORIZADOS

1. [Ação mais importante a tomar primeiro]
2. [Segunda prioridade]
3. [Terceira prioridade]
4. [...]

---

**IMPORTANTE:** Seja direto, específico e acionável em TODAS as recomendações.`;
}

// ============================================
// Main Analysis Function
// ============================================
export async function analyzeRaioX(input: RaioXInput): Promise<RaioXOutput> {
  try {
    const startTime = Date.now();

    // Validação básica
    if (!input.url || input.url.length < 10) {
      throw new AIServiceError(
        'URL deve ter pelo menos 10 caracteres',
        'raio-x-landing'
      );
    }

    if (!input.produto || input.produto.length < 5) {
      throw new AIServiceError(
        'Descrição do produto deve ter pelo menos 5 caracteres',
        'raio-x-landing'
      );
    }

    // Gerar análise com Claude
    const message = await anthropic.messages.create({
      model: SERVICE_MODELS.RAIO_X_LANDING,
      max_tokens: DEFAULT_CLAUDE_PARAMS.max_tokens,
      temperature: 0.5, // Mais determinístico para análise
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
        'raio-x-landing',
        message
      );
    }

    // Debug log
    console.log('[Raio-X] Análise gerada, parseando output...');

    // Parsear output
    let output;
    try {
      output = parseOutput(generatedText);
    } catch (parseError) {
      console.error('[Raio-X] Erro ao parsear output:', parseError);
      throw new AIServiceError(
        'Erro ao parsear resposta do modelo',
        'raio-x-landing',
        parseError
      );
    }

    // Calcular metadata
    const analysisTime = Date.now() - startTime;
    const generationCost = calculateCost(
      SERVICE_MODELS.RAIO_X_LANDING,
      message.usage.input_tokens,
      message.usage.output_tokens
    );

    const result: RaioXOutput = {
      ...output,
      metadata: {
        analysisTime,
        generationCost,
      },
    };

    console.log(
      `[Raio-X] Análise concluída em ${analysisTime}ms | Custo: R$ ${generationCost.toFixed(4)}`
    );

    return result;
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }

    throw new AIServiceError(
      'Erro ao analisar landing page',
      'raio-x-landing',
      error
    );
  }
}

// ============================================
// Output Parser
// ============================================
function parseOutput(text: string): Omit<RaioXOutput, 'metadata'> {
  const extractSection = (pattern: RegExp): string => {
    const match = text.match(pattern);
    return match && match[1] ? match[1].trim() : '';
  };

  const extractListItems = (section: string): string[] => {
    const matches = section.match(/^\d+\.\s+(.+)$/gm);
    return matches ? matches.map((m) => m.replace(/^\d+\.\s+/, '').trim()) : [];
  };

  const extractScore = (): number => {
    const match = text.match(/SCORE:\s*(\d+)/i);
    return match ? parseInt(match[1], 10) : 50;
  };

  // Parse análise geral
  const score = extractScore();
  const pontosFortes = extractListItems(
    extractSection(/PONTOS FORTES[:\s]+([\s\S]+?)(?=PONTOS FRACOS|$)/i)
  );
  const pontosFracos = extractListItems(
    extractSection(/PONTOS FRACOS[:\s]+([\s\S]+?)(?=###|$)/i)
  );

  // Parse hero atual
  const tituloAtual = extractSection(/TÍTULO ATUAL:\s*(.+?)(?:\n|$)/i);
  const subtituloAtual = extractSection(/SUBTÍTULO ATUAL:\s*(.+?)(?:\n|$)/i);
  const ctaAtual = extractSection(/CTA ATUAL:\s*(.+?)(?:\n|$)/i);

  const problemasHero = extractListItems(
    extractSection(/PROBLEMAS IDENTIFICADOS[:\s]+([\s\S]+?)(?=SUGESTÕES|$)/i)
  );
  const sugestoesHero = extractListItems(
    extractSection(/SUGESTÕES DE MELHORIA[:\s]+([\s\S]+?)(?=###|$)/i)
  );

  // Parse sugestões de hero (simplified - you can refine with more specific regex)
  const variacao1Match = text.match(
    /VARIAÇÃO 1:[\s\S]*?TÍTULO:\s*(.+?)\s*SUBTÍTULO:\s*(.+?)\s*CTA:\s*(.+?)\s*JUSTIFICATIVA:\s*(.+?)(?=---|VARIAÇÃO|$)/i
  );
  const variacao2Match = text.match(
    /VARIAÇÃO 2:[\s\S]*?TÍTULO:\s*(.+?)\s*SUBTÍTULO:\s*(.+?)\s*CTA:\s*(.+?)\s*JUSTIFICATIVA:\s*(.+?)(?=---|VARIAÇÃO|$)/i
  );
  const variacao3Match = text.match(
    /VARIAÇÃO 3:[\s\S]*?TÍTULO:\s*(.+?)\s*SUBTÍTULO:\s*(.+?)\s*CTA:\s*(.+?)\s*JUSTIFICATIVA:\s*(.+?)(?=---|###|$)/i
  );

  // Parse recomendações
  const uxUI = extractListItems(
    extractSection(/UX\/UI.*?[\n\r]+([\s\S]+?)(?=####|$)/i)
  );
  const copy = extractListItems(
    extractSection(/COPY.*?[\n\r]+([\s\S]+?)(?=####|$)/i)
  );
  const conversao = extractListItems(
    extractSection(/CONVERSÃO.*?[\n\r]+([\s\S]+?)(?=####|$)/i)
  );
  const seo = extractListItems(
    extractSection(/SEO.*?[\n\r]+([\s\S]+?)(?=###|$)/i)
  );

  const proximosPassos = extractListItems(
    extractSection(/PRÓXIMOS PASSOS[:\s]+([\s\S]+?)$/i)
  );

  return {
    analiseGeral: {
      score,
      resumo: extractSection(/SCORE.*?\n([\s\S]+?)(?=\*\*PONTOS|$)/i),
      pontosFortes: pontosFortes.length > 0 ? pontosFortes : ['Não identificado'],
      pontosFracos: pontosFracos.length > 0 ? pontosFracos : ['Não identificado'],
    },
    heroAtual: {
      titulo: tituloAtual || 'Não identificado',
      subtitulo: subtituloAtual || 'Não identificado',
      cta: ctaAtual || 'Não identificado',
      problemas: problemasHero.length > 0 ? problemasHero : ['Nenhum problema identificado'],
      sugestoes: sugestoesHero.length > 0 ? sugestoesHero : ['Sem sugestões'],
    },
    sugestoesHero: {
      variacao1: {
        titulo: variacao1Match?.[1]?.trim() || 'Variação não gerada',
        subtitulo: variacao1Match?.[2]?.trim() || '',
        cta: variacao1Match?.[3]?.trim() || '',
        justificativa: variacao1Match?.[4]?.trim() || '',
      },
      variacao2: {
        titulo: variacao2Match?.[1]?.trim() || 'Variação não gerada',
        subtitulo: variacao2Match?.[2]?.trim() || '',
        cta: variacao2Match?.[3]?.trim() || '',
        justificativa: variacao2Match?.[4]?.trim() || '',
      },
      variacao3: {
        titulo: variacao3Match?.[1]?.trim() || 'Variação não gerada',
        subtitulo: variacao3Match?.[2]?.trim() || '',
        cta: variacao3Match?.[3]?.trim() || '',
        justificativa: variacao3Match?.[4]?.trim() || '',
      },
    },
    recomendacoes: {
      uxUI: uxUI.length > 0 ? uxUI : ['Sem recomendações'],
      copy: copy.length > 0 ? copy : ['Sem recomendações'],
      conversao: conversao.length > 0 ? conversao : ['Sem recomendações'],
      seo: seo.length > 0 ? seo : ['Sem recomendações'],
    },
    proximosPassos: proximosPassos.length > 0 ? proximosPassos : ['Revisar análise completa'],
  };
}

// ============================================
// Helper: Validação de qualidade
// ============================================
export function validateOutput(output: RaioXOutput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validar score
  if (output.analiseGeral.score < 0 || output.analiseGeral.score > 100) {
    errors.push(`Score inválido: ${output.analiseGeral.score} (deve ser 0-100)`);
  }

  // Validar pontos fortes
  if (output.analiseGeral.pontosFortes.length < 3) {
    errors.push('Menos de 3 pontos fortes identificados');
  }

  // Validar pontos fracos
  if (output.analiseGeral.pontosFracos.length < 5) {
    errors.push('Menos de 5 pontos fracos identificados');
  }

  // Validar variações de hero
  if (
    !output.sugestoesHero.variacao1.titulo ||
    !output.sugestoesHero.variacao2.titulo ||
    !output.sugestoesHero.variacao3.titulo
  ) {
    errors.push('Nem todas as 3 variações de hero foram geradas');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

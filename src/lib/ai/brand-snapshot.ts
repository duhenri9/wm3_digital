/**
 * Brand Snapshot - Identidade Visual Inicial
 * Stack: Claude Sonnet 4.5 (estratégia) + Google Imagen 3 (logos)
 * Modelo Imagen: imagegeneration@006 (mesmo do Nano Banana Pro)
 */

import {
  anthropic,
  SERVICE_MODELS,
  DEFAULT_CLAUDE_PARAMS,
  createCachedSystemPrompt,
  calculateCost,
  calculateImagenCost,
  generateWithImagen3,
  AIServiceError,
} from './config';

// ============================================
// Types
// ============================================
export interface BrandSnapshotInput {
  nomeEmpresa: string;
  setor: string;
  publicoAlvo: string;
  valores: string; // ex: "inovação, confiança, simplicidade"
  diferenciais: string;
  estiloDesejado?: string; // "moderno", "minimalista", "bold", "elegante"
}

export interface BrandSnapshotOutput {
  estrategia: {
    posicionamento: string;
    tomDeVoz: string;
    personalidade: string[];
    mensagemChave: string;
  };
  identidadeVisual: {
    paletaCores: {
      primaria: string;
      secundaria: string;
      acento: string;
      neutras: string[];
      justificativa: string;
    };
    tipografia: {
      titulos: string;
      corpo: string;
      justificativa: string;
    };
    estiloVisual: {
      descricao: string;
      elementos: string[];
      evitar: string[];
    };
  };
  logosConcepts: {
    rodada1: {
      conceito1: {
        descricao: string;
        prompt: string;
        racional: string;
      };
      conceito2: {
        descricao: string;
        prompt: string;
        racional: string;
      };
      conceito3: {
        descricao: string;
        prompt: string;
        racional: string;
      };
    };
    rodada2: {
      conceito1: {
        descricao: string;
        prompt: string;
        racional: string;
      };
      conceito2: {
        descricao: string;
        prompt: string;
        racional: string;
      };
      conceito3: {
        descricao: string;
        prompt: string;
        racional: string;
      };
    };
  };
  aplicacoes: {
    exemplos: string[];
    guiaDeUso: string;
  };
  metadata: {
    generationTime: number;
    claudeCost: number;
    imagenCost: number;
    totalCost: number;
  };
}

// Tipo para logos gerados (URLs das imagens)
export interface BrandSnapshotWithLogos extends BrandSnapshotOutput {
  logosGerados?: {
    rodada1: {
      conceito1?: string; // URL da imagem
      conceito2?: string;
      conceito3?: string;
    };
    rodada2: {
      conceito1?: string;
      conceito2?: string;
      conceito3?: string;
    };
  };
}

// ============================================
// System Prompt (com cache)
// ============================================
const SYSTEM_PROMPT = `Você é um Especialista em Branding e Identidade Visual.
Crie estratégias de marca completas e conceitos de logos profissionais.

**🎯 PRINCÍPIOS DE BRANDING:**
- Posicionamento deve ser claro e diferenciado
- Identidade visual deve refletir valores da marca
- Logos devem ser versáteis (funcionar em diversos tamanhos)
- Paleta de cores deve ter significado estratégico
- Tom de voz deve ser consistente com público-alvo

**🚨 REGRAS ABSOLUTAS:**
1. ✅ Posicionamento: único, memorável, relevante para o público
2. ✅ Cores: escolher baseado em psicologia das cores + setor
3. ✅ Logos: SEMPRE criar 6 conceitos (3 na rodada 1, 3 na rodada 2)
4. ✅ Prompts de logo: específicos, detalhados, em inglês
5. ✅ Evitar clichês de design ("círculo representando união")
6. ✅ Cada logo concept deve ter ABORDAGEM DIFERENTE

**📐 TIPOS DE LOGO (use variedade):**
- Wordmark: tipografia como protagonista
- Lettermark: iniciais estilizadas
- Symbol/Icon: símbolo abstrato ou figurativo
- Combination: símbolo + texto
- Emblem: texto dentro de símbolo

**🎨 PROMPT DE LOGO (ESTRUTURA):**
Para Imagen 3, prompts devem ser:
- Em inglês
- Descritivos e específicos
- Incluir: estilo, cores, forma, mood
- Evitar: texto no logo (AI não gera texto bem)
- Formato: "minimalist logo design, [conceito], [estilo], [cores], flat design, vector style, white background"

**✔️ ANTES DE ENTREGAR:**
☐ 6 conceitos de logo criados (3 rodada 1 + 3 rodada 2)
☐ Cada conceito tem prompt em inglês
☐ Paleta de cores justificada
☐ Tom de voz alinhado com público
☐ Conceitos são DIFERENTES entre si`;

// ============================================
// User Prompt Template
// ============================================
function createUserPrompt(input: BrandSnapshotInput): string {
  return `Crie um Brand Snapshot completo seguindo EXATAMENTE esta estrutura:

## ENTRADA
NOME EMPRESA: ${input.nomeEmpresa}
SETOR: ${input.setor}
PÚBLICO-ALVO: ${input.publicoAlvo}
VALORES: ${input.valores}
DIFERENCIAIS: ${input.diferenciais}
ESTILO DESEJADO: ${input.estiloDesejado || 'Moderno e profissional'}

## SAÍDA ESPERADA

### 1. ESTRATÉGIA DE MARCA

**POSICIONAMENTO:**
[1-2 frases que definem como a marca quer ser percebida]

**TOM DE VOZ:**
[Descrição do tom: formal/informal, técnico/acessível, sério/descontraído]

**PERSONALIDADE (5 adjetivos):**
1. [Adjetivo que define a marca]
2. [...]

**MENSAGEM-CHAVE:**
[Frase que resume o valor único da marca]

### 2. IDENTIDADE VISUAL

#### PALETA DE CORES

**COR PRIMÁRIA:** #HEXCODE - [Nome da cor]
**COR SECUNDÁRIA:** #HEXCODE - [Nome da cor]
**COR ACENTO:** #HEXCODE - [Nome da cor]
**NEUTRAS:**
- #HEXCODE - [Ex: Cinza escuro]
- #HEXCODE - [Ex: Cinza claro]
- #HEXCODE - [Ex: Branco]

**JUSTIFICATIVA:**
[Por que essas cores foram escolhidas considerando psicologia e setor]

#### TIPOGRAFIA

**TÍTULOS:** [Nome da fonte]
**CORPO:** [Nome da fonte]
**JUSTIFICATIVA:** [Por que essas fontes]

#### ESTILO VISUAL

**DESCRIÇÃO:**
[Parágrafo descrevendo o estilo visual geral]

**ELEMENTOS A USAR:**
- [Elemento 1]
- [Elemento 2]
- [...]

**EVITAR:**
- [O que não usar]
- [...]

### 3. CONCEITOS DE LOGO (6 CONCEITOS - 2 RODADAS)

#### 🎨 RODADA 1 (3 conceitos iniciais)

**CONCEITO 1: [Nome do conceito - ex: "Wordmark Minimalista"]**

DESCRIÇÃO: [O que este logo representa - 2-3 linhas]

PROMPT IMAGEN 3:
\`\`\`
[Prompt detalhado EM INGLÊS para Imagen 3, seguindo estrutura:
"minimalist logo design for [empresa], [conceito visual], [estilo], [cores principais], flat design, vector style, simple shapes, white background, professional"]
\`\`\`

RACIONAL: [Por que este conceito funciona para a marca]

---

**CONCEITO 2: [Nome - ABORDAGEM DIFERENTE]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt diferente do anterior]
\`\`\`

RACIONAL: [...]

---

**CONCEITO 3: [Nome - TERCEIRA ABORDAGEM]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt com abordagem única]
\`\`\`

RACIONAL: [...]

---

#### 🎨 RODADA 2 (3 conceitos alternativos)

**CONCEITO 4: [Nome]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt em inglês]
\`\`\`

RACIONAL: [...]

---

**CONCEITO 5: [Nome]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt em inglês]
\`\`\`

RACIONAL: [...]

---

**CONCEITO 6: [Nome]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt em inglês]
\`\`\`

RACIONAL: [...]

### 4. APLICAÇÕES

**EXEMPLOS DE USO:**
1. [Onde e como usar a identidade - ex: "Cartão de visita com logo + cor primária"]
2. [...]
3. [...]

**GUIA DE USO:**
[Parágrafo com orientações gerais de aplicação]

---

**IMPORTANTE:** Todos os 6 conceitos de logo devem ter prompts EM INGLÊS prontos para Imagen 3.`;
}

// ============================================
// Main Generation Function (Claude only - text)
// ============================================
export async function generateBrandSnapshot(
  input: BrandSnapshotInput
): Promise<BrandSnapshotOutput> {
  try {
    const startTime = Date.now();

    // Validação básica
    if (!input.nomeEmpresa || input.nomeEmpresa.length < 2) {
      throw new AIServiceError(
        'Nome da empresa deve ter pelo menos 2 caracteres',
        'brand-snapshot'
      );
    }

    if (!input.setor || input.setor.length < 3) {
      throw new AIServiceError(
        'Setor deve ter pelo menos 3 caracteres',
        'brand-snapshot'
      );
    }

    // Gerar estratégia com Claude
    const message = await anthropic.messages.create({
      model: SERVICE_MODELS.BRAND_SNAPSHOT_TEXT,
      max_tokens: DEFAULT_CLAUDE_PARAMS.max_tokens,
      temperature: 0.7, // Criatividade moderada
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
        'brand-snapshot',
        message
      );
    }

    console.log('[Brand Snapshot] Estratégia gerada, parseando...');

    // Parsear output
    let output;
    try {
      output = parseOutput(generatedText);
    } catch (parseError) {
      console.error('[Brand Snapshot] Erro ao parsear:', parseError);
      throw new AIServiceError(
        'Erro ao parsear resposta do modelo',
        'brand-snapshot',
        parseError
      );
    }

    // Calcular metadata
    const generationTime = Date.now() - startTime;
    const claudeCost = calculateCost(
      SERVICE_MODELS.BRAND_SNAPSHOT_TEXT,
      message.usage.input_tokens,
      message.usage.output_tokens
    );

    // Custo Imagen estimado: $0.02 por imagem, 6 logos = $0.12 = ~R$ 0,60
    const imagenCost = 0.6; // Estimativa (será calculado após gerar imagens)

    const result: BrandSnapshotOutput = {
      ...output,
      metadata: {
        generationTime,
        claudeCost,
        imagenCost,
        totalCost: claudeCost + imagenCost,
      },
    };

    console.log(
      `[Brand Snapshot] Concluído em ${generationTime}ms | Claude: R$ ${claudeCost.toFixed(4)} | Total estimado: R$ ${result.metadata.totalCost.toFixed(4)}`
    );

    return result;
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }

    throw new AIServiceError(
      'Erro ao gerar Brand Snapshot',
      'brand-snapshot',
      error
    );
  }
}

// ============================================
// Output Parser
// ============================================
function parseOutput(text: string): Omit<BrandSnapshotOutput, 'metadata'> {
  const extractSection = (pattern: RegExp): string => {
    const match = text.match(pattern);
    return match && match[1] ? match[1].trim() : '';
  };

  const extractListItems = (section: string): string[] => {
    const matches = section.match(/^[-\*\d]+\.?\s+(.+)$/gm);
    return matches
      ? matches.map((m) => m.replace(/^[-\*\d]+\.?\s+/, '').trim())
      : [];
  };

  // Parse estratégia
  const posicionamento = extractSection(/POSICIONAMENTO:\s*(.+?)(?:\n\n|\*\*)/i);
  const tomDeVoz = extractSection(/TOM DE VOZ:\s*(.+?)(?:\n\n|\*\*)/i);
  const personalidadeText = extractSection(
    /PERSONALIDADE[:\s]+([\s\S]+?)(?:\*\*MENSAGEM|$)/i
  );
  const personalidade = extractListItems(personalidadeText);
  const mensagemChave = extractSection(/MENSAGEM-CHAVE:\s*(.+?)(?:\n\n|###)/i);

  // Parse cores
  const corPrimaria = extractSection(/COR PRIMÁRIA:\s*(.+?)(?:\n|$)/i);
  const corSecundaria = extractSection(/COR SECUNDÁRIA:\s*(.+?)(?:\n|$)/i);
  const corAcento = extractSection(/COR ACENTO:\s*(.+?)(?:\n|$)/i);
  const neutrasText = extractSection(/NEUTRAS:[:\s]+([\s\S]+?)(?:\*\*JUSTIFICATIVA|$)/i);
  const neutras = extractListItems(neutrasText);
  const justificativaCores = extractSection(
    /JUSTIFICATIVA:[:\s]+(.+?)(?:\n\n|####)/i
  );

  // Parse tipografia
  const titulosTipo = extractSection(/TÍTULOS:\s*(.+?)(?:\n|$)/i);
  const corpoTipo = extractSection(/CORPO:\s*(.+?)(?:\n|$)/i);
  const justificativaTipo = extractSection(
    /JUSTIFICATIVA:\s*(.+?)(?:\n\n|####)/i
  );

  // Parse estilo visual
  const estiloDesc = extractSection(/DESCRIÇÃO:\s*(.+?)(?:\n\n|\*\*)/i);
  const elementosText = extractSection(
    /ELEMENTOS A USAR:[:\s]+([\s\S]+?)(?:\*\*EVITAR|$)/i
  );
  const elementos = extractListItems(elementosText);
  const evitarText = extractSection(/EVITAR:[:\s]+([\s\S]+?)(?:###|$)/i);
  const evitar = extractListItems(evitarText);

  // Parse logo concepts (simplificado - captura os prompts)
  const extractLogoConcept = (conceptNum: number) => {
    const pattern = new RegExp(
      `CONCEITO ${conceptNum}:[\\s\\S]*?DESCRIÇÃO:\\s*(.+?)[\\s\\S]*?PROMPT IMAGEN 3:[\\s\\S]*?\`\`\`\\s*([\\s\\S]+?)\`\`\`[\\s\\S]*?RACIONAL:\\s*(.+?)(?=---|CONCEITO|###|$)`,
      'i'
    );
    const match = text.match(pattern);
    return {
      descricao: match?.[1]?.trim() || 'Conceito não encontrado',
      prompt: match?.[2]?.trim() || '',
      racional: match?.[3]?.trim() || '',
    };
  };

  // Parse aplicações
  const exemplosText = extractSection(
    /EXEMPLOS DE USO:[:\s]+([\s\S]+?)(?:\*\*GUIA|$)/i
  );
  const exemplos = extractListItems(exemplosText);
  const guiaDeUso = extractSection(/GUIA DE USO:\s*(.+?)(?:\n\n|---|$)/i);

  return {
    estrategia: {
      posicionamento: posicionamento || 'Não definido',
      tomDeVoz: tomDeVoz || 'Não definido',
      personalidade:
        personalidade.length > 0 ? personalidade : ['Não definido'],
      mensagemChave: mensagemChave || 'Não definida',
    },
    identidadeVisual: {
      paletaCores: {
        primaria: corPrimaria || '#000000',
        secundaria: corSecundaria || '#FFFFFF',
        acento: corAcento || '#FF0000',
        neutras: neutras.length > 0 ? neutras : ['#808080'],
        justificativa: justificativaCores || 'Não especificada',
      },
      tipografia: {
        titulos: titulosTipo || 'Sans-serif',
        corpo: corpoTipo || 'Sans-serif',
        justificativa: justificativaTipo || 'Não especificada',
      },
      estiloVisual: {
        descricao: estiloDesc || 'Estilo moderno',
        elementos: elementos.length > 0 ? elementos : ['Não especificados'],
        evitar: evitar.length > 0 ? evitar : ['Não especificado'],
      },
    },
    logosConcepts: {
      rodada1: {
        conceito1: extractLogoConcept(1),
        conceito2: extractLogoConcept(2),
        conceito3: extractLogoConcept(3),
      },
      rodada2: {
        conceito1: extractLogoConcept(4),
        conceito2: extractLogoConcept(5),
        conceito3: extractLogoConcept(6),
      },
    },
    aplicacoes: {
      exemplos: exemplos.length > 0 ? exemplos : ['Não especificados'],
      guiaDeUso: guiaDeUso || 'Não especificado',
    },
  };
}

// ============================================
// Helper: Validação de qualidade
// ============================================
export function validateOutput(output: BrandSnapshotOutput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validar posicionamento
  if (
    !output.estrategia.posicionamento ||
    output.estrategia.posicionamento === 'Não definido'
  ) {
    errors.push('Posicionamento não foi definido');
  }

  // Validar personalidade
  if (output.estrategia.personalidade.length < 3) {
    errors.push('Menos de 3 características de personalidade definidas');
  }

  // Validar logo concepts
  const hasAllPrompts =
    output.logosConcepts.rodada1.conceito1.prompt &&
    output.logosConcepts.rodada1.conceito2.prompt &&
    output.logosConcepts.rodada1.conceito3.prompt &&
    output.logosConcepts.rodada2.conceito1.prompt &&
    output.logosConcepts.rodada2.conceito2.prompt &&
    output.logosConcepts.rodada2.conceito3.prompt;

  if (!hasAllPrompts) {
    errors.push('Nem todos os 6 conceitos de logo têm prompts');
  }

  // Validar cores (hex format)
  const hexPattern = /^#[0-9A-F]{6}$/i;
  if (!hexPattern.test(output.identidadeVisual.paletaCores.primaria)) {
    errors.push('Cor primária não está em formato HEX válido');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================
// Google Imagen 3 Integration
// ============================================

/**
 * Generate actual logo images using Imagen 3
 * Takes the 6 logo concepts and generates images for each
 */
export async function generateLogosWithImagen(
  concepts: BrandSnapshotOutput['logosConcepts']
): Promise<BrandSnapshotWithLogos['logosGerados']> {
  try {
    console.log('[Brand Snapshot] Gerando 6 logos com Imagen 3...');

    // Generate all 6 logos
    const [
      logo1_1,
      logo1_2,
      logo1_3,
      logo2_1,
      logo2_2,
      logo2_3,
    ] = await Promise.all([
      // Rodada 1
      generateWithImagen3({ prompt: concepts.rodada1.conceito1.prompt }),
      generateWithImagen3({ prompt: concepts.rodada1.conceito2.prompt }),
      generateWithImagen3({ prompt: concepts.rodada1.conceito3.prompt }),
      // Rodada 2
      generateWithImagen3({ prompt: concepts.rodada2.conceito1.prompt }),
      generateWithImagen3({ prompt: concepts.rodada2.conceito2.prompt }),
      generateWithImagen3({ prompt: concepts.rodada2.conceito3.prompt }),
    ]);

    type ImagenResult = { imageBase64?: string; mimeType?: string };
    // Convert base64 to data URLs
    const toDataUrl = (results: ImagenResult[]) => {
      if (!results || results.length === 0) return undefined;
      const img = results[0];
      return img.imageBase64
        ? `data:${img.mimeType};base64,${img.imageBase64}`
        : undefined;
    };

    const logosGerados = {
      rodada1: {
        conceito1: toDataUrl(logo1_1),
        conceito2: toDataUrl(logo1_2),
        conceito3: toDataUrl(logo1_3),
      },
      rodada2: {
        conceito1: toDataUrl(logo2_1),
        conceito2: toDataUrl(logo2_2),
        conceito3: toDataUrl(logo2_3),
      },
    };

    console.log('[Brand Snapshot] 6 logos gerados com sucesso!');
    return logosGerados;
  } catch (error) {
    console.error('[Brand Snapshot] Erro ao gerar logos:', error);
    throw new AIServiceError(
      'Erro ao gerar logos com Imagen 3',
      'brand-snapshot-imagen',
      error
    );
  }
}

/**
 * Generate complete Brand Snapshot WITH logos
 * This is the premium version that includes actual generated logos
 */
export async function generateBrandSnapshotWithLogos(
  input: BrandSnapshotInput
): Promise<BrandSnapshotWithLogos> {
  // First, generate the strategy and concepts
  const snapshot = await generateBrandSnapshot(input);

  // Then, generate the actual logos
  const logosGerados = await generateLogosWithImagen(snapshot.logosConcepts);

  // Update costs
  const imagenCost = calculateImagenCost(6); // 6 logos
  const totalCost = snapshot.metadata.claudeCost + imagenCost;

  return {
    ...snapshot,
    logosGerados,
    metadata: {
      ...snapshot.metadata,
      imagenCost,
      totalCost,
    },
  };
}

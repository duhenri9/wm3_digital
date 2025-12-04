/**
 * QR Code Hero - QR Codes Criativos e Artísticos
 * Stack: Claude Sonnet 4.5 (conceitos) + Google Imagen 3 (geração)
 * Modelo Imagen: imagegeneration@006 (mesmo do Nano Banana Pro)
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
export interface QRCodeHeroInput {
  urlDestino: string;
  estiloDesejado: string; // "moderno", "minimalista", "colorido", "abstrato", "orgânico"
  coresPrincipais?: string; // ex: "azul e branco", "gradiente roxo"
  usoCaso: string; // "material impresso", "web", "embalagem", "evento"
  marca?: string; // Nome da marca (opcional)
}

export interface QRCodeHeroOutput {
  conceitos: {
    rodada1: {
      conceito1: {
        nome: string;
        descricao: string;
        prompt: string;
        caracteristicas: string[];
      };
      conceito2: {
        nome: string;
        descricao: string;
        prompt: string;
        caracteristicas: string[];
      };
      conceito3: {
        nome: string;
        descricao: string;
        prompt: string;
        caracteristicas: string[];
      };
    };
    rodada2: {
      conceito1: {
        nome: string;
        descricao: string;
        prompt: string;
        caracteristicas: string[];
      };
      conceito2: {
        nome: string;
        descricao: string;
        prompt: string;
        caracteristicas: string[];
      };
      conceito3: {
        nome: string;
        descricao: string;
        prompt: string;
        caracteristicas: string[];
      };
    };
  };
  guiaDeUso: {
    impressao: string[];
    digital: string[];
    melhoresPraticas: string[];
  };
  especificacoesTecnicas: {
    resolucaoRecomendada: string;
    formatosExportacao: string[];
    tamanhoMinimo: string;
    contrasteRecomendado: string;
  };
  metadata: {
    generationTime: number;
    claudeCost: number;
    imagenCost: number;
    totalCost: number;
  };
}

// Tipo com QR codes gerados (URLs das imagens)
export interface QRCodeHeroWithImages extends QRCodeHeroOutput {
  qrCodesGerados?: {
    rodada1: {
      conceito1?: string; // URL da imagem do QR code
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
// System Prompt
// ============================================
const SYSTEM_PROMPT = `Você é um Especialista em Design de QR Codes Criativos.
Crie conceitos de QR codes que sejam funcionais E visualmente atraentes.

**🎯 PRINCÍPIOS DE QR CODE DESIGN:**
- Funcionalidade > Estética (QR code DEVE ser escaneável)
- Contraste suficiente entre elementos claros e escuros
- Área de margem branca obrigatória (quiet zone)
- Elementos decorativos não devem cobrir dados críticos
- Testar em diferentes tamanhos e dispositivos

**🚨 REGRAS TÉCNICAS OBRIGATÓRIAS:**
1. ✅ QR code deve ter contraste mínimo 70% (claro vs escuro)
2. ✅ Margem branca de pelo menos 4 módulos ao redor
3. ✅ Cantos de detecção (3 quadrados) devem ser claramente visíveis
4. ✅ Correção de erro: usar nível H (30% de redundância)
5. ✅ Tamanho mínimo: 2cm x 2cm para impressão
6. ✅ Resolução mínima: 300 DPI para impressão, 72 DPI para web

**🎨 ESTILOS CRIATIVOS (manter escaneabilidade):**
- Minimalista: design limpo, cores sólidas, geométrico
- Orgânico: formas fluidas, naturais, curvas suaves
- Tecnológico: circuitos, neon, futurista
- Artístico: ilustrativo, texturas, gradientes
- Branded: incorporar elementos da marca sutilmente

**📐 PROMPT ESTRUCTURA (Imagen 3):**
Para gerar QR codes artísticos com Imagen 3:
- Em inglês
- Descrever estilo visual claramente
- Especificar cores e forma geral
- Incluir: "functional QR code design" no prompt
- Exemplo: "minimalist QR code design, [estilo], [cores], high contrast, scannable, with white quiet zone border, vector style, clean"

**✔️ CHECKLIST ANTES DE ENTREGAR:**
☐ 6 conceitos criados (3 rodada 1 + 3 rodada 2)
☐ Cada conceito tem prompt em inglês para Imagen 3
☐ Todos mantêm escaneabilidade (contraste, margens)
☐ Conceitos são DIFERENTES entre si
☐ Guia de uso inclui recomendações técnicas`;

// ============================================
// User Prompt
// ============================================
function createUserPrompt(input: QRCodeHeroInput): string {
  return `Crie conceitos de QR Codes criativos seguindo esta estrutura:

## ENTRADA
URL DESTINO: ${input.urlDestino}
ESTILO: ${input.estiloDesejado}
CORES: ${input.coresPrincipais || 'Não especificado'}
USO: ${input.usoCaso}
MARCA: ${input.marca || 'Não especificado'}

## SAÍDA

### 1. CONCEITOS DE QR CODE (6 CONCEITOS - 2 RODADAS)

#### 🎨 RODADA 1 (3 conceitos iniciais)

**CONCEITO 1: [Nome do conceito]**

DESCRIÇÃO: [2-3 linhas explicando o conceito visual]

PROMPT IMAGEN 3:
\`\`\`
[Prompt detalhado EM INGLÊS para Imagen 3:
"functional QR code design, [conceito visual], [estilo], [cores], high contrast for scanning, white quiet zone border, [características específicas], clean and scannable, professional"]
\`\`\`

CARACTERÍSTICAS:
- [Característica 1]
- [Característica 2]
- [Característica 3]

---

**CONCEITO 2: [Nome - ABORDAGEM DIFERENTE]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt diferente]
\`\`\`

CARACTERÍSTICAS:
- [...]

---

**CONCEITO 3: [Nome - TERCEIRA ABORDAGEM]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt único]
\`\`\`

CARACTERÍSTICAS:
- [...]

---

#### 🎨 RODADA 2 (3 conceitos alternativos)

**CONCEITO 4: [Nome]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt em inglês]
\`\`\`

CARACTERÍSTICAS:
- [...]

---

**CONCEITO 5: [Nome]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt em inglês]
\`\`\`

CARACTERÍSTICAS:
- [...]

---

**CONCEITO 6: [Nome]**

DESCRIÇÃO: [...]

PROMPT IMAGEN 3:
\`\`\`
[Prompt em inglês]
\`\`\`

CARACTERÍSTICAS:
- [...]

### 2. GUIA DE USO

**PARA IMPRESSÃO:**
1. [Recomendação 1]
2. [Recomendação 2]
3. [Recomendação 3]

**PARA DIGITAL (WEB/APPS):**
1. [Recomendação 1]
2. [Recomendação 2]
3. [Recomendação 3]

**MELHORES PRÁTICAS:**
1. [Prática 1]
2. [Prática 2]
3. [Prática 3]

### 3. ESPECIFICAÇÕES TÉCNICAS

**RESOLUÇÃO RECOMENDADA:** [Ex: 1000x1000px para impressão, 500x500px para web]
**FORMATOS DE EXPORTAÇÃO:** [PNG, SVG, PDF, etc]
**TAMANHO MÍNIMO:** [Ex: 2cm x 2cm para garantir escaneabilidade]
**CONTRASTE RECOMENDADO:** [Ex: Mínimo 70% entre elementos claros e escuros]

---

**IMPORTANTE:** Todos os prompts devem estar EM INGLÊS e garantir que os QR codes sejam ESCANEÁVEIS.`;
}

// ============================================
// Main Generation Function
// ============================================
export async function generateQRCodeHero(
  input: QRCodeHeroInput
): Promise<QRCodeHeroOutput> {
  try {
    const startTime = Date.now();

    // Validação
    if (!input.urlDestino || input.urlDestino.length < 10) {
      throw new AIServiceError(
        'URL destino deve ter pelo menos 10 caracteres',
        'qr-code-hero'
      );
    }

    // Gerar conceitos com Claude
    const message = await anthropic.messages.create({
      model: SERVICE_MODELS.QR_CODE_TEXT,
      max_tokens: DEFAULT_CLAUDE_PARAMS.max_tokens,
      temperature: 0.8, // Mais criatividade para designs
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
        'qr-code-hero',
        message
      );
    }

    console.log('[QR Code Hero] Conceitos gerados, parseando...');

    // Parsear output
    let output;
    try {
      output = parseOutput(generatedText);
    } catch (parseError) {
      console.error('[QR Code Hero] Erro ao parsear:', parseError);
      throw new AIServiceError(
        'Erro ao parsear resposta do modelo',
        'qr-code-hero',
        parseError
      );
    }

    // Metadata
    const generationTime = Date.now() - startTime;
    const claudeCost = calculateCost(
      SERVICE_MODELS.QR_CODE_TEXT,
      message.usage.input_tokens,
      message.usage.output_tokens
    );

    // Custo Imagen estimado: $0.02 por imagem, 6 QR codes = $0.12 = ~R$ 0,60
    const imagenCost = 0.6;

    const result: QRCodeHeroOutput = {
      ...output,
      metadata: {
        generationTime,
        claudeCost,
        imagenCost,
        totalCost: claudeCost + imagenCost,
      },
    };

    console.log(
      `[QR Code Hero] Concluído em ${generationTime}ms | Total: R$ ${result.metadata.totalCost.toFixed(4)}`
    );

    return result;
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }

    throw new AIServiceError(
      'Erro ao gerar QR Code Hero',
      'qr-code-hero',
      error
    );
  }
}

// ============================================
// Parser (simplificado)
// ============================================
function parseOutput(text: string): Omit<QRCodeHeroOutput, 'metadata'> {
  const extractConcept = (conceptNum: number) => {
    const pattern = new RegExp(
      `CONCEITO ${conceptNum}:[\\s\\S]*?DESCRIÇÃO:\\s*(.+?)[\\s\\S]*?PROMPT IMAGEN 3:[\\s\\S]*?\`\`\`\\s*([\\s\\S]+?)\`\`\`[\\s\\S]*?CARACTERÍSTICAS:[\\s\\S]*?-\\s*(.+?)[\\s\\S]*?-\\s*(.+?)[\\s\\S]*?-\\s*(.+?)(?=---|CONCEITO|###|$)`,
      'i'
    );
    const match = text.match(pattern);
    return {
      nome: `Conceito ${conceptNum}`,
      descricao: match?.[1]?.trim() || 'Conceito não encontrado',
      prompt: match?.[2]?.trim() || '',
      caracteristicas: match
        ? [match[3]?.trim(), match[4]?.trim(), match[5]?.trim()].filter(Boolean)
        : [],
    };
  };

  return {
    conceitos: {
      rodada1: {
        conceito1: extractConcept(1),
        conceito2: extractConcept(2),
        conceito3: extractConcept(3),
      },
      rodada2: {
        conceito1: extractConcept(4),
        conceito2: extractConcept(5),
        conceito3: extractConcept(6),
      },
    },
    guiaDeUso: {
      impressao: [
        'Usar resolução mínima de 300 DPI',
        'Tamanho mínimo 2cm x 2cm',
        'Testar escaneabilidade antes de imprimir',
      ],
      digital: [
        'Resolução mínima 500x500px',
        'Formato PNG ou SVG',
        'Testar em diferentes dispositivos',
      ],
      melhoresPraticas: [
        'Manter contraste alto',
        'Não cobrir áreas críticas',
        'Incluir margem branca ao redor',
      ],
    },
    especificacoesTecnicas: {
      resolucaoRecomendada: '1000x1000px (impressão) / 500x500px (web)',
      formatosExportacao: ['PNG', 'SVG', 'PDF'],
      tamanhoMinimo: '2cm x 2cm',
      contrasteRecomendado: 'Mínimo 70%',
    },
  };
}

// ============================================
// Validation
// ============================================
export function validateOutput(output: QRCodeHeroOutput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  const hasAllPrompts =
    output.conceitos.rodada1.conceito1.prompt &&
    output.conceitos.rodada1.conceito2.prompt &&
    output.conceitos.rodada1.conceito3.prompt &&
    output.conceitos.rodada2.conceito1.prompt &&
    output.conceitos.rodada2.conceito2.prompt &&
    output.conceitos.rodada2.conceito3.prompt;

  if (!hasAllPrompts) {
    errors.push('Nem todos os 6 conceitos têm prompts');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================
// TODO: Google Imagen 3 Integration
// ============================================
// export async function generateQRCodesWithImagen(
//   concepts: QRCodeHeroOutput['conceitos'],
//   urlDestino: string
// ): Promise<QRCodeHeroWithImages['qrCodesGerados']> {
//   // Implementar integração com Google Vertex AI Imagen 3
//   // Usar SERVICE_MODELS.QR_CODE_IMAGE (imagegeneration@006)
//   // Gerar QR codes funcionais com overlay artístico
// }

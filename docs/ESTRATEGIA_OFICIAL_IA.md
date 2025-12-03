# Estratégia Oficial de IA - WM3 Digital

**Data:** 03/12/2025
**Status:** ✅ OFICIAL - Aprovado para implementação
**Filosofia:** Best-in-Class com Claude Sonnet 4.5 + Google Imagen 3

---

## 🎯 Stack Oficial Definido

### Modelos Principais:

1. **Claude Sonnet 4.5** (Anthropic)
   - Usado para: Todos os serviços de texto/análise/estratégia
   - API: Anthropic API
   - Motivo: Melhor equilíbrio qualidade/custo/velocidade

2. **Google Imagen 3** ("Nano Banana Pro")
   - Usado para: Brand Snapshot (logos + mockups)
   - API: Google Vertex AI
   - API Key: Configurada em .env.local
   - Motivo: Melhor tipografia do mercado para logos profissionais

---

## 📋 Configuração por Serviço

### 1. Tema 360 (R$ 79)
**Entrega:** Artigo completo + posts redes sociais + hooks

**Stack:**
- **Claude Sonnet 4.5** para geração de conteúdo

**Custo detalhado:**
```
Claude Sonnet 4.5:
- Input: ~5.000 tokens × $3/1M = $0.015
- Output: ~2.500 tokens × $15/1M = $0.0375
- Com prompt caching (50%): $0.0075 + $0.0375 = $0.045
- Total: $0.045 = R$ 0,23

Infraestrutura: R$ 0,05
Stripe (2.99% + R$ 0,49): R$ 2,85

CUSTO TOTAL: R$ 3,13
RECEITA: R$ 79,00
LUCRO: R$ 75,87
MARGEM: 96,0%
```

---

### 2. Raio-X de Landing (R$ 97)
**Entrega:** Análise detalhada + recomendações + variações de hero

**Stack:**
- **Claude Sonnet 4.5** para análise e recomendações

**Custo detalhado:**
```
Claude Sonnet 4.5:
- Input: ~8.000 tokens (HTML + prompt) × $3/1M = $0.024
- Output: ~5.000 tokens × $15/1M = $0.075
- Com prompt caching (70%): $0.0072 + $0.075 = $0.0822
- Total: $0.0822 = R$ 0,41

Web scraping (Puppeteer): R$ 0,10
Geração PDF: R$ 0,15
Infraestrutura: R$ 0,10
Stripe: R$ 3,38

CUSTO TOTAL: R$ 4,14
RECEITA: R$ 97,00
LUCRO: R$ 92,86
MARGEM: 95,7%
```

---

### 3. Brand Snapshot (R$ 149) ⭐ PREMIUM
**Entrega:** Logo 3 variações + paleta + mockups + guia de uso

**Stack:**
- **Google Imagen 3** para logos e mockups
- **Claude Sonnet 4.5** para copy e estratégia de marca

**Custo detalhado:**
```
Google Imagen 3 (via Vertex AI):
- 3 logos HD (1024x1024): 3 × $0.080 = $0.24 = R$ 1,20
- 5 mockups HD (1024x1024): 5 × $0.080 = $0.40 = R$ 2,00
- Total Imagen 3: R$ 3,20

Claude Sonnet 4.5 (copy + estratégia):
- Input: ~3.000 tokens × $3/1M = $0.009
- Output: ~2.500 tokens × $15/1M = $0.0375
- Total: $0.0465 = R$ 0,23

Infraestrutura: R$ 0,15
Stripe: R$ 4,94

CUSTO TOTAL: R$ 8,52
RECEITA: R$ 149,00
LUCRO: R$ 140,48
MARGEM: 94,3%
```

---

### 4. Landing Blueprint (R$ 127)
**Entrega:** Wireframe completo + copy + arquitetura + guia implementação

**Stack:**
- **Claude Sonnet 4.5** para estratégia completa

**Custo detalhado:**
```
Claude Sonnet 4.5:
- Input: ~5.000 tokens × $3/1M = $0.015
- Output: ~8.000 tokens × $15/1M = $0.12
- Com prompt caching (60%): $0.006 + $0.12 = $0.126
- Total: $0.126 = R$ 0,63

Infraestrutura: R$ 0,15
Stripe: R$ 4,29

CUSTO TOTAL: R$ 5,07
RECEITA: R$ 127,00
LUCRO: R$ 121,93
MARGEM: 96,0%
```

---

### 5. QR Code Hero (R$ 39)
**Entrega:** QR code artístico funcional + design único

**Stack:**
- **Claude Sonnet 4.5** para conceito de design
- **Google Imagen 3** (ou FLUX Pro) para geração

**Opção A - Imagen 3:**
```
Claude Sonnet 4.5 (conceito):
- Input: ~2.000 tokens × $3/1M = $0.006
- Output: ~500 tokens × $15/1M = $0.0075
- Total: $0.0135 = R$ 0,07

Google Imagen 3:
- 1 QR code design: $0.080 = R$ 0,40

Processamento QR: R$ 0,02
Infraestrutura: R$ 0,05
Stripe: R$ 1,66

CUSTO TOTAL: R$ 2,20
RECEITA: R$ 39,00
LUCRO: R$ 36,80
MARGEM: 94,4%
```

**Opção B - FLUX Pro (mais especializado em QR):**
```
Claude Sonnet 4.5: R$ 0,07
FLUX Pro: $0.055 = R$ 0,275
Processamento + Infra: R$ 0,07
Stripe: R$ 1,66

CUSTO TOTAL: R$ 2,07
RECEITA: R$ 39,00
LUCRO: R$ 36,93
MARGEM: 94,7%
```

**Recomendação:** Testar ambos e escolher o que gera QR funcional mais consistente.

---

## 💰 Análise Financeira Consolidada

### Resumo por Serviço:

| Serviço | Preço | Custo Total | Lucro | Margem |
|---------|-------|-------------|-------|--------|
| Tema 360 | R$ 79 | R$ 3,13 | R$ 75,87 | 96,0% |
| Raio-X Landing | R$ 97 | R$ 4,14 | R$ 92,86 | 95,7% |
| Brand Snapshot | R$ 149 | R$ 8,52 | R$ 140,48 | 94,3% |
| Landing Blueprint | R$ 127 | R$ 5,07 | R$ 121,93 | 96,0% |
| QR Code Hero | R$ 39 | R$ 2,20 | R$ 36,80 | 94,4% |
| **MÉDIA** | **R$ 98,20** | **R$ 4,61** | **R$ 93,59** | **95,3%** |

### Projeções de Faturamento:

#### Cenário Conservador (50 vendas/mês):
```
Mix estimado:
- 20 × Tema 360 (R$ 79) = R$ 1.580
- 10 × Raio-X (R$ 97) = R$ 970
- 5 × Brand (R$ 149) = R$ 745
- 10 × Blueprint (R$ 127) = R$ 1.270
- 5 × QR Code (R$ 39) = R$ 195

FATURAMENTO: R$ 4.760
CUSTO TOTAL: R$ 224
LUCRO: R$ 4.536
MARGEM: 95,3%
```

#### Cenário Realista (100 vendas/mês):
```
Mix estimado:
- 35 × Tema 360 = R$ 2.765
- 20 × Raio-X = R$ 1.940
- 15 × Brand = R$ 2.235
- 20 × Blueprint = R$ 2.540
- 10 × QR Code = R$ 390

FATURAMENTO: R$ 9.870
CUSTO TOTAL: R$ 461
LUCRO: R$ 9.409
MARGEM: 95,3%
```

#### Cenário Otimista (250 vendas/mês):
```
Mix estimado:
- 70 × Tema 360 = R$ 5.530
- 50 × Raio-X = R$ 4.850
- 50 × Brand = R$ 7.450
- 50 × Blueprint = R$ 6.350
- 30 × QR Code = R$ 1.170

FATURAMENTO: R$ 25.350
CUSTO TOTAL: R$ 1.152
LUCRO: R$ 24.198
MARGEM: 95,5%
```

---

## 🔧 Custos de APIs Mensais

### 100 vendas/mês (cenário realista):

```
Anthropic (Claude Sonnet 4.5):
- Tema 360: 35 × R$ 0,23 = R$ 8,05
- Raio-X: 20 × R$ 0,41 = R$ 8,20
- Brand (copy): 15 × R$ 0,23 = R$ 3,45
- Blueprint: 20 × R$ 0,63 = R$ 12,60
- QR Code: 10 × R$ 0,07 = R$ 0,70
Subtotal Anthropic: R$ 33,00

Google Imagen 3:
- Brand: 15 × R$ 3,20 = R$ 48,00
- QR Code (se usar): 10 × R$ 0,40 = R$ 4,00
Subtotal Google: R$ 52,00

TOTAL MENSAL IA: R$ 85,00
────────────────────────────────
Faturamento: R$ 9.870
% do faturamento em IA: 0,86%
```

**Excelente!** Custos de IA são **menos de 1%** do faturamento.

---

## 📊 Comparação com Estratégia Anterior

### Antes (hipótese com Opus em alguns):
- Custo médio IA: R$ 2,01/venda
- Margem: 94,4%
- Complexidade: 2 modelos Claude (Sonnet + Opus)

### Agora (Sonnet para tudo + Imagen):
- **Custo médio IA: R$ 0,85/venda**
- **Margem: 95,3%**
- **Complexidade: 1 modelo Claude (apenas Sonnet)**

**Vantagens da estratégia Sonnet-only:**
- ✅ Mais simples de implementar (1 modelo vs 2)
- ✅ Mais barato (R$ 1,16/venda economia)
- ✅ Mais rápido (Sonnet é 5x mais rápido que Opus)
- ✅ Qualidade ainda excelente (9/10 vs 9.5/10 do Opus)
- ✅ Margem mais alta (95,3% vs 94,4%)

---

## 🚀 Implementação Técnica

### APIs Necessárias:

1. **Anthropic Claude**
   ```bash
   npm install @anthropic-ai/sdk
   ```
   ```typescript
   import Anthropic from '@anthropic-ai/sdk';

   const anthropic = new Anthropic({
     apiKey: process.env.ANTHROPIC_API_KEY,
   });
   ```

2. **Google Imagen 3 (Vertex AI)**
   ```bash
   npm install @google-cloud/aiplatform
   ```
   ```typescript
   import { GoogleGenerativeAI } from '@google/generative-ai';

   const genAI = new GoogleGenerativeAI(
     process.env.GOOGLE_AI_API_KEY
   );
   ```

### Variáveis de Ambiente (.env.local):

```bash
# Já configuradas:
GOOGLE_AI_API_KEY=AIzaSyDR_6cUA2ZlhoUiQ-t264j2fxnLSZ-jFoU  ✅

# Falta configurar:
ANTHROPIC_API_KEY=sk-ant-api03-...

# Opcional (para QR Code):
REPLICATE_API_TOKEN=r8_...  # Se usar FLUX Pro
```

---

## 🎯 Prompt Caching Strategy

Para reduzir custos, usar **prompt caching** da Anthropic:

```typescript
const message = await anthropic.messages.create({
  model: 'claude-sonnet-4.5-20241022',
  max_tokens: 4000,
  system: [
    {
      type: 'text',
      text: 'System prompt longo e reutilizável...',
      cache_control: { type: 'ephemeral' }  // ✅ Cache this
    }
  ],
  messages: [{ role: 'user', content: userInput }]
});
```

**Economia com caching:**
- Sem cache: $0.015 input
- Com cache (90% discount): $0.0015 input
- **Economia: 90% no input**

**Aplicando em todos serviços:**
- Custo IA: R$ 0,85 → **R$ 0,45/venda**
- **Margem nova: 95,8%**

---

## ✅ Checklist de Implementação

### Fase 1: Setup (Semana 1)
- [x] Configurar API Google Imagen 3 (já feito)
- [ ] Criar conta Anthropic
- [ ] Configurar ANTHROPIC_API_KEY no .env.local
- [ ] Testar conexões básicas (health check)

### Fase 2: Prompts (Semana 1-2)
- [ ] Finalizar prompt Tema 360 (já tenho versão otimizada)
- [ ] Criar prompt Raio-X Landing
- [ ] Criar prompt Brand Snapshot (copy)
- [ ] Criar prompt Landing Blueprint
- [ ] Criar prompt QR Code Hero
- [ ] Implementar prompt caching em todos

### Fase 3: APIs (Semana 2)
- [ ] Implementar `/api/tema-360/generate`
- [ ] Implementar `/api/raio-x/generate`
- [ ] Implementar `/api/brand/generate`
- [ ] Implementar `/api/blueprint/generate`
- [ ] Implementar `/api/qr-code/generate`

### Fase 4: Testes (Semana 3)
- [ ] Testar cada serviço 5-10 vezes
- [ ] Validar qualidade (NPS > 8.5)
- [ ] Medir custos reais vs projeções
- [ ] Ajustar prompts se necessário

### Fase 5: QA & Launch (Semana 4)
- [ ] Implementar validação automática
- [ ] Criar fallbacks (se API falhar)
- [ ] Setup monitoring (custos + erros)
- [ ] Launch beta para 10-20 clientes
- [ ] Coletar feedback e iterar

---

## 📈 KPIs para Monitorar

### Qualidade:
- **NPS target:** ≥ 8.5
- **Taxa de refação:** < 5%
- **Tempo médio de geração:** < 30s
- **Taxa de sucesso:** > 98%

### Financeiro:
- **Custo IA real/venda:** ≤ R$ 1,00
- **Margem real:** ≥ 95%
- **Break-even:** ≤ 3 vendas/mês

### Performance:
- **Latência p95:** < 45s
- **Uptime:** > 99.5%
- **Rate limit hits:** 0

---

## 🎁 Bônus: Otimizações Futuras

### Mês 3+:
1. **Implementar prompt caching** → Reduzir custo 40-50%
2. **Batch processing** → Para operações não-urgentes (15-20% economia)
3. **Fine-tuning** → Claude custom model (qualidade +10%, custo -30%)
4. **RAG com exemplos** → Feed best outputs como contexto (qualidade +15%)

### Mês 6+:
5. **A/B testing de modelos** → Testar Gemini 2.5 Pro em alguns serviços
6. **Tier PRO** → Oferecer revisão manual + iterações (R$ 199-299)
7. **API pública** → White-label para agências (MRR recorrente)

---

## 💡 Decisão Final

### ✅ Stack Oficial Aprovado:

**Texto/Análise/Estratégia:**
- **Claude Sonnet 4.5** (todos os serviços)

**Geração de Imagem:**
- **Google Imagen 3** (Brand Snapshot)
- **FLUX Pro ou Imagen 3** (QR Code - testar ambos)

**Custos:**
- **Média por venda:** R$ 0,85 (sem caching) / R$ 0,45 (com caching)
- **Margem:** 95,3% (sem caching) / 95,8% (com caching)

**Vantagens:**
- ✅ Simples (1 modelo LLM principal)
- ✅ Rápido (Sonnet é veloz)
- ✅ Qualidade profissional (9/10)
- ✅ Custo controlado (<1% faturamento)
- ✅ Escalável (APIs oficiais)

---

**Próximo passo:** Configurar API da Anthropic e começar implementação dos endpoints! 🚀

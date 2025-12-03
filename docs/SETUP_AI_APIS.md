# Setup de APIs de IA - WM3 Digital

**Versão:** 1.0
**Stack:** Claude Sonnet 4.5 + Google Imagen 3
**Status:** Em implementação

---

## 📋 Pré-requisitos

- Node.js 18+
- Conta Anthropic (Claude API)
- Conta Google Cloud (Imagen 3 via Vertex AI)
- Conta Replicate (opcional, para FLUX Pro)

---

## 🔧 Passo 1: Instalar Dependências

```bash
npm install @anthropic-ai/sdk @google/generative-ai
```

**Pacotes instalados:**
- `@anthropic-ai/sdk`: Claude Sonnet/Haiku/Opus
- `@google/generative-ai`: Google Imagen 3

---

## 🔑 Passo 2: Configurar API Keys

### 2.1 Anthropic Claude

1. Acesse: https://console.anthropic.com/
2. Crie uma conta (se ainda não tiver)
3. Vá em **API Keys** → **Create Key**
4. Copie a chave (`sk-ant-api03-...`)

### 2.2 Google Cloud (Imagen 3)

**Opção A: Usar Google AI Studio (Mais Fácil)**
1. Acesse: https://aistudio.google.com/app/apikey
2. Crie um projeto (se necessário)
3. Click em **Get API Key**
4. Copie a chave (`AIzaSy...`)

**Opção B: Usar Vertex AI (Produção)**
1. Acesse: https://console.cloud.google.com/
2. Crie um projeto
3. Ative Vertex AI API
4. Crie service account e baixe JSON key
5. Configure autenticação:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"
```

---

## 📝 Passo 3: Configurar .env.local

Abra `.env.local` e adicione:

```bash
# ==========================================
# Anthropic Claude API
# ==========================================
ANTHROPIC_API_KEY=sk-ant-api03-[SUA_CHAVE_AQUI]

# ==========================================
# Google AI (Imagen 3)
# ==========================================
# Já configurado:
GOOGLE_AI_API_KEY=AIzaSyDR_6cUA2ZlhoUiQ-t264j2fxnLSZ-jFoU

# ==========================================
# Replicate (Opcional - para FLUX Pro)
# ==========================================
# REPLICATE_API_TOKEN=r8_...
```

**⚠️ IMPORTANTE:**
- Nunca faça commit do `.env.local`
- Arquivo já está no `.gitignore`
- Use `.env.example` para documentar variáveis necessárias

---

## ✅ Passo 4: Testar Configuração

### 4.1 Criar arquivo de teste

Crie `test-ai.ts` na raiz:

```typescript
import { generateTema360 } from './src/lib/ai/tema-360';

async function test() {
  try {
    console.log('🧪 Testando integração com Claude Sonnet...\n');

    const result = await generateTema360({
      tema: 'Como validar ideia de SaaS antes de investir R$ 50 mil',
      publico: 'Empreendedores tech iniciantes que querem lançar SaaS',
      tom: 'Didático, pragmático, motivacional',
      linkOferta: 'https://wm3digital.com.br/servicos',
    });

    console.log('✅ Geração concluída!\n');
    console.log('📊 Metadata:');
    console.log(`   Palavras: ${result.metadata.wordCount}`);
    console.log(`   Tempo leitura: ${result.metadata.estimatedReadingTime} min`);
    console.log(`   Custo: R$ ${result.metadata.generationCost.toFixed(4)}\n`);

    console.log('📝 Títulos gerados:');
    console.log(`   A: ${result.titulos.tituloA}`);
    console.log(`   B: ${result.titulos.tituloB}`);
    console.log(`   C: ${result.titulos.tituloC}\n`);

    console.log('🎯 Hooks:');
    console.log(`   Problema: ${result.hooks.hookProblema}`);
    console.log(`   Curiosidade: ${result.hooks.hookCuriosidade}`);
    console.log(`   Solução: ${result.hooks.hookSolucao}\n`);

    console.log('🎉 Teste concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    process.exit(1);
  }
}

test();
```

### 4.2 Executar teste

```bash
npx tsx test-ai.ts
```

**Saída esperada:**
```
🧪 Testando integração com Claude Sonnet...

[Tema 360] Geração concluída em 12345ms | Custo: R$ 0.2300
✅ Geração concluída!

📊 Metadata:
   Palavras: 847
   Tempo leitura: 5 min
   Custo: R$ 0.2300

📝 Títulos gerados:
   A: Como Validar sua Ideia de SaaS em 7 Passos Práticos
   B: 5 Erros Fatais ao Validar SaaS (e Como Evitá-los)
   C: Guia Completo: Validação de SaaS em 2025

🎯 Hooks:
   Problema: 80% das startups falham por não validar antes de construir
   Curiosidade: O método que te economiza R$ 40 mil em desenvolvimento
   Solução: Valide seu SaaS em 30 dias com apenas R$ 500

🎉 Teste concluído com sucesso!
```

---

## 🚀 Passo 5: Testar Endpoint API

### 5.1 Iniciar servidor dev

```bash
npm run dev
```

### 5.2 Testar com curl

```bash
curl -X POST http://localhost:3002/api/ai/tema-360/generate \
  -H "Content-Type: application/json" \
  -d '{
    "tema": "Como configurar CI/CD para Next.js com GitHub Actions",
    "publico": "Desenvolvedores front-end intermediários",
    "tom": "Técnico, direto, sem rodeios",
    "linkOferta": "https://wm3digital.com.br"
  }'
```

### 5.3 Testar com Postman/Insomnia

**URL:** `POST http://localhost:3002/api/ai/tema-360/generate`

**Body (JSON):**
```json
{
  "tema": "Estratégias de growth hacking para micro-SaaS em 2025",
  "publico": "Founders de startups B2B SaaS com pouco budget",
  "tom": "Experiente, data-driven, acionável",
  "linkOferta": "https://wm3digital.com.br/servicos"
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "titulos": {
      "tituloA": "...",
      "tituloB": "...",
      "tituloC": "..."
    },
    "metaDescricao": "...",
    "artigo": { ... },
    "hooks": { ... },
    "postsSociais": { ... },
    "preview": { ... },
    "metadata": {
      "wordCount": 847,
      "estimatedReadingTime": 5,
      "generationCost": 0.23
    }
  },
  "validation": {
    "isValid": true,
    "warnings": []
  }
}
```

---

## 📊 Monitoramento de Custos

### Custos por Serviço (Claude Sonnet 4.5):

| Serviço | Tokens Input | Tokens Output | Custo Estimado |
|---------|--------------|---------------|----------------|
| Tema 360 | ~5.000 | ~2.500 | R$ 0,23 |
| Raio-X | ~8.000 | ~5.000 | R$ 0,41 |
| Blueprint | ~5.000 | ~8.000 | R$ 0,63 |

### Como rastrear custos:

A biblioteca já calcula automaticamente. Você pode:

1. **Ver no console:**
```
[Tema 360] Geração concluída em 12345ms | Custo: R$ 0.2300
```

2. **Na resposta da API:**
```json
{
  "metadata": {
    "generationCost": 0.23
  }
}
```

3. **Implementar tracking** (opcional):

```typescript
// src/lib/analytics/cost-tracking.ts
export async function trackGeneration(data: {
  service: string;
  cost: number;
  userId?: string;
}) {
  // Enviar para analytics, Supabase, etc
  console.log(`[Cost Tracking] ${data.service}: R$ ${data.cost}`);
}
```

---

## 🛡️ Boas Práticas

### Segurança:

1. ✅ **NUNCA exponha API keys no cliente**
   ```typescript
   // ❌ ERRADO
   const key = process.env.NEXT_PUBLIC_ANTHROPIC_KEY;

   // ✅ CERTO
   const key = process.env.ANTHROPIC_API_KEY; // Sem NEXT_PUBLIC_
   ```

2. ✅ **Valide entrada do usuário**
   ```typescript
   if (!body.tema || body.tema.length < 10) {
     return error('Tema muito curto');
   }
   ```

3. ✅ **Implemente rate limiting**
   ```typescript
   // Exemplo: máx 5 gerações/minuto por IP
   ```

### Performance:

1. ✅ **Use prompt caching** (já implementado)
   - Economiza 40-50% nos custos
   - Reduz latência

2. ✅ **Set timeouts apropriados**
   ```typescript
   export const maxDuration = 60; // 60s na rota
   ```

3. ✅ **Monitore latência**
   ```typescript
   const startTime = Date.now();
   // ... geração ...
   console.log(`Duração: ${Date.now() - startTime}ms`);
   ```

### Qualidade:

1. ✅ **Valide outputs**
   ```typescript
   const validation = validateOutput(output);
   if (!validation.isValid) {
     console.warn('Avisos:', validation.errors);
   }
   ```

2. ✅ **Implemente fallbacks**
   ```typescript
   try {
     return await generateWithSonnet();
   } catch (error) {
     // Fallback para Haiku se Sonnet falhar
     return await generateWithHaiku();
   }
   ```

---

## 🐛 Troubleshooting

### Erro: "API key not found"

**Causa:** `.env.local` não configurado ou variável errada

**Solução:**
```bash
# Verifique se existe
cat .env.local | grep ANTHROPIC_API_KEY

# Deve mostrar:
# ANTHROPIC_API_KEY=sk-ant-api03-...

# Se não aparecer, adicione manualmente
```

### Erro: "Rate limit exceeded"

**Causa:** Muitas requisições em pouco tempo

**Solução:**
1. Aguarde 1 minuto
2. Implemente retry com backoff:
```typescript
import pRetry from 'p-retry';

await pRetry(() => generateTema360(input), {
  retries: 3,
  minTimeout: 2000,
});
```

### Erro: "Timeout"

**Causa:** Geração demorou > 60s

**Solução:**
```typescript
// Aumentar timeout na rota
export const maxDuration = 120; // 2 minutos
```

### Output malformatado

**Causa:** Modelo não seguiu estrutura exata

**Solução:**
1. Revisar prompt (deixar mais explícito)
2. Melhorar parser com regex mais robustos
3. Adicionar validação pós-geração

---

## ✅ Checklist de Setup Completo

- [ ] Dependências instaladas (`@anthropic-ai/sdk`, `@google/generative-ai`)
- [ ] Conta Anthropic criada
- [ ] API Key Anthropic configurada no `.env.local`
- [ ] API Key Google já configurada (Imagen 3)
- [ ] Teste local executado com sucesso (`npx tsx test-ai.ts`)
- [ ] Servidor dev rodando (`npm run dev`)
- [ ] Endpoint API testado (curl ou Postman)
- [ ] Custos monitorados (console logs)
- [ ] Rate limiting implementado (opcional para MVP)

---

## 🎯 Próximos Passos

1. **Implementar outros serviços:**
   - [ ] Raio-X de Landing
   - [ ] Brand Snapshot (texto + imagem)
   - [ ] Landing Blueprint
   - [ ] QR Code Hero

2. **Melhorar parser:**
   - [ ] Regex mais robustos para extração
   - [ ] Validação de estrutura markdown
   - [ ] Fallbacks se seções faltarem

3. **Adicionar features:**
   - [ ] Preview antes de gerar completo
   - [ ] Regeneração de seções específicas
   - [ ] Export para PDF/DOCX
   - [ ] Histórico de gerações

4. **Deploy produção:**
   - [ ] Variáveis de ambiente no Vercel
   - [ ] Monitoring (Sentry, LogRocket)
   - [ ] Analytics de uso
   - [ ] Dashboard de custos

---

**Setup completo! 🎉**

Agora você pode gerar conteúdo Tema 360 com Claude Sonnet 4.5.

Próximo serviço a implementar: **Raio-X de Landing** ou **Brand Snapshot**?

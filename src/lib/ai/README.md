# WM3 AI Services Library

Biblioteca de integração com modelos de IA para os serviços da WM3 Digital.

## 📁 Estrutura

```
lib/ai/
├── config.ts              # Configuração central de APIs
├── tema-360.ts            # Serviço Tema 360 (IMPLEMENTADO ✅)
├── raio-x.ts              # Serviço Raio-X Landing (TODO)
├── brand-snapshot.ts      # Serviço Brand Snapshot (TODO)
├── landing-blueprint.ts   # Serviço Landing Blueprint (TODO)
└── qr-code.ts             # Serviço QR Code Hero (TODO)
```

## 🎯 Stack Oficial

| Serviço | Modelo | Status |
|---------|--------|--------|
| Tema 360 | Claude Sonnet 4.5 | ✅ Implementado |
| Raio-X Landing | Claude Sonnet 4.5 | 🔄 A fazer |
| Brand Snapshot | Imagen 3 + Sonnet | 🔄 A fazer |
| Landing Blueprint | Claude Sonnet 4.5 | 🔄 A fazer |
| QR Code Hero | Imagen 3 + Sonnet | 🔄 A fazer |

## 🚀 Como Usar

### 1. Configurar variáveis de ambiente

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-api03-...
GOOGLE_AI_API_KEY=AIzaSy...
```

### 2. Importar e usar

```typescript
import { generateTema360 } from '@/lib/ai/tema-360';

const result = await generateTema360({
  tema: 'Como validar ideia de SaaS',
  publico: 'Empreendedores tech',
  tom: 'Didático e motivacional',
  linkOferta: 'https://wm3digital.com.br',
});

console.log(result.titulos.tituloA);
console.log(result.metadata.generationCost); // R$ 0.23
```

### 3. Via API endpoint

```bash
curl -X POST http://localhost:3002/api/ai/tema-360/generate \
  -H "Content-Type: application/json" \
  -d '{"tema":"...","publico":"...","tom":"..."}'
```

## 💰 Custos

| Serviço | Custo Médio | Margem |
|---------|-------------|--------|
| Tema 360 | R$ 0,23 | 96,0% |
| Raio-X | R$ 0,41 | 95,7% |
| Brand | R$ 3,43 | 94,3% |
| Blueprint | R$ 0,63 | 96,0% |
| QR Code | R$ 0,47 | 94,6% |

## 📚 Documentação Completa

Veja `docs/SETUP_AI_APIS.md` para setup detalhado.

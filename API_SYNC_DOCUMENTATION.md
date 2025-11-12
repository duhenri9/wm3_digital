# 🔄 API de Sincronização de Projetos

## 📋 Visão Geral

Sistema de sincronização automática que busca dados atualizados de cada projeto/serviço a partir de suas páginas oficiais publicadas.

## 🎯 Funcionalidade

Cada projeto/serviço da WM3 pode ter sua página oficial configurada. A API busca automaticamente:
- **Título** da página (meta tags, JSON-LD, Open Graph)
- **Descrição** da página (meta tags, JSON-LD, Open Graph)
- **Preço** (se disponível na página)
- **Links** atualizados

## 🔌 Endpoints da API

### 1. Sincronizar Projeto Específico

#### GET `/api/projects/[id]/sync`
**Descrição**: Busca dados da página oficial (sem autenticação, apenas leitura)

**Exemplo**:
```bash
GET /api/projects/design-saas/sync
```

**Resposta**:
```json
{
  "success": true,
  "projectId": "design-saas",
  "data": {
    "title": "Design SaaS Solutions",
    "description": "Projetos de design completos...",
    "price": "A partir de R$ 652",
    "links": {
      "live": "/servicos/design-saas",
      "website": "https://designsaas.wm3digital.com.br/"
    }
  },
  "source": "official-page"
}
```

#### POST `/api/projects/[id]/sync`
**Descrição**: Atualiza projeto com dados da página oficial (requer autenticação)

**Exemplo**:
```bash
POST /api/projects/design-saas/sync
Authorization: Bearer <token>
```

**Resposta**:
```json
{
  "success": true,
  "message": "Projeto atualizado com sucesso a partir da página oficial",
  "project": {
    "id": "design-saas",
    "title": "Design SaaS Solutions",
    "description": "...",
    ...
  }
}
```

### 2. Sincronizar Todos os Projetos

#### GET `/api/projects/sync`
**Descrição**: Busca dados de todas as páginas oficiais (sem autenticação)

**Exemplo**:
```bash
GET /api/projects/sync
```

**Resposta**:
```json
{
  "success": true,
  "count": 4,
  "projects": {
    "design-saas": { ... },
    "socialflux": { ... },
    ...
  },
  "source": "official-pages"
}
```

#### POST `/api/projects/sync`
**Descrição**: Atualiza todos os projetos configurados (requer autenticação)

**Exemplo**:
```bash
POST /api/projects/sync
Authorization: Bearer <token>
```

**Resposta**:
```json
{
  "success": true,
  "message": "Sincronização concluída. 4 projetos atualizados.",
  "updated": 4,
  "errors": 0,
  "details": {
    "updated": [
      { "id": "design-saas", "title": "Design SaaS Solutions" },
      ...
    ],
    "errors": []
  }
}
```

## ⚙️ Configuração

### Adicionar Novo Projeto para Sincronização

Edite `src/lib/project-sync.ts`:

```typescript
const SYNC_CONFIGS: Record<string, ProjectSyncConfig> = {
  'meu-projeto': {
    id: 'meu-projeto',
    officialUrl: 'https://meuprojeto.wm3digital.com.br/',
    selectors: {
      // Opcional: seletores CSS customizados
      title: 'h1.hero-title',
      description: '.hero-description',
      price: '[data-price]'
    }
  }
};
```

## 🔍 Como Funciona

1. **Busca da Página**: Faz fetch da URL oficial do projeto
2. **Extração de Dados**:
   - Título: `<title>`, JSON-LD, Open Graph
   - Descrição: `<meta name="description">`, JSON-LD, Open Graph
   - Preço: Padrões regex para encontrar preços
3. **Mesclagem**: Mantém dados existentes e atualiza apenas campos que vieram da página
4. **Preservação**: Não sobrescreve campos importantes como:
   - `id`, `category`, `tags`, `status`
   - `showInLanding`

## 🎨 Interface Admin

### Botão de Sincronização Individual

Cada projeto que tem uma página oficial configurada mostra um botão de sincronização (ícone de refresh) ao lado dos botões de editar/deletar.

**Funcionalidade**:
- Clica no botão → Sincroniza apenas aquele projeto
- Mostra animação de loading durante sincronização
- Atualiza automaticamente a lista após sincronização

### Botão "Sincronizar Todos"

Botão no topo da lista de projetos que sincroniza todos os projetos de uma vez.

**Funcionalidade**:
- Confirmação antes de executar
- Mostra progresso e resultados
- Atualiza lista automaticamente

## 📊 Projetos Configurados

### Design SaaS
- **URL**: https://designsaas.wm3digital.com.br/
- **Status**: ✅ Configurado e funcionando

### SocialFlux∞
- **URL**: https://socialflux.wm3.digital/
- **Status**: ✅ Configurado

### Metrify
- **URL**: https://metrify.wm3digital.com.br/
- **Status**: ✅ Configurado

### SEO Blog
- **URL**: https://seoblog.wm3digital.com.br/
- **Status**: ✅ Configurado

### Outros Projetos
- Funil que Vende+
- SubHub
- HumanTic

## 🧪 Testando

### Teste Manual

1. **Acesse o admin**: `/admin`
2. **Faça login** se necessário
3. **Clique no botão de sincronização** (ícone refresh) em um projeto
4. **Verifique** se os dados foram atualizados

### Teste via API

```bash
# Buscar dados do Design SaaS (sem autenticação)
curl http://localhost:3006/api/projects/design-saas/sync

# Atualizar Design SaaS (com autenticação)
curl -X POST http://localhost:3006/api/projects/design-saas/sync \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json"
```

## 🔒 Segurança

- **GET**: Público (apenas leitura)
- **POST**: Requer autenticação (modificação de dados)
- **Rate Limiting**: Cache de 1 hora para evitar sobrecarga

## 📝 Notas

- A sincronização não sobrescreve dados críticos (status, categoria, tags)
- Mantém a configuração `showInLanding` existente
- Atualiza apenas título, descrição, preço e links
- Se a página oficial não estiver disponível, mantém dados existentes

---

**Status**: ✅ Implementado e Funcional
**Última atualização**: Dezembro 2024


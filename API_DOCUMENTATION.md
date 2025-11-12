# Documentação da API - WM3 Digital

## 📋 Visão Geral

Este documento descreve as APIs criadas para gerenciar projetos e a página de links da WM3 Digital. As APIs permitem atualizações automáticas sem necessidade de editar código manualmente.

## 🔗 Endpoints Disponíveis

### Projetos

#### GET `/api/projects`
Lista todos os projetos ou filtra por parâmetros.

**Query Parameters:**
- `id` (opcional): ID específico do projeto
- `status` (opcional): Filtrar por status (Disponível, Early Adopters, etc.)
- `category` (opcional): Filtrar por categoria (servico, projeto)

**Exemplo:**
```bash
# Listar todos os projetos
GET /api/projects

# Filtrar por status
GET /api/projects?status=Disponível

# Filtrar por categoria
GET /api/projects?category=projeto

# Buscar projeto específico
GET /api/projects?id=socialflux
```

**Resposta:**
```json
[
  {
    "id": "socialflux",
    "title": "SocialFlux∞",
    "description": "Micro-SaaS de geração automática de anúncios...",
    "tags": ["Micro-SaaS", "IA", "Marketing"],
    "status": "Disponível",
    "category": "projeto",
    "links": {
      "live": "/servicos/socialflux",
      "demo": "https://socialflux.wm3.digital"
    }
  }
]
```

#### GET `/api/projects/[id]`
Busca um projeto específico por ID.

**Exemplo:**
```bash
GET /api/projects/socialflux
```

#### POST `/api/projects`
Cria um novo projeto.

**Body:**
```json
{
  "id": "novo-projeto",
  "title": "Novo Projeto",
  "description": "Descrição do projeto",
  "tags": ["Tag1", "Tag2"],
  "status": "Disponível",
  "category": "projeto",
  "links": {
    "live": "/servicos/novo-projeto"
  }
}
```

#### PUT `/api/projects`
Atualiza um projeto existente (requer ID no body).

#### PUT `/api/projects/[id]`
Atualiza um projeto específico por ID.

**Body:**
```json
{
  "title": "Título Atualizado",
  "description": "Nova descrição",
  "status": "Disponível"
}
```

#### DELETE `/api/projects?id=[id]`
Deleta um projeto por ID.

**Exemplo:**
```bash
DELETE /api/projects?id=novo-projeto
```

#### DELETE `/api/projects/[id]`
Deleta um projeto específico por ID.

**Exemplo:**
```bash
DELETE /api/projects/novo-projeto
```

### Links

#### GET `/api/links`
Obtém a configuração da página de links.

**Resposta:**
```json
{
  "profile": {
    "title": "WM3 Digital",
    "description": "SaaS, automação e marketing digital...",
    "avatar": "/wm3-icon.png"
  },
  "socialLinks": [
    {
      "id": "instagram",
      "title": "Instagram",
      "url": "https://instagram.com/wm3digital",
      "icon": "instagram",
      "description": "Siga-nos no Instagram",
      "color": "from-pink-500 to-purple-500"
    }
  ],
  "sections": [
    {
      "id": "available",
      "title": "Projetos Disponíveis",
      "showInLinks": true
    }
  ]
}
```

#### PUT `/api/links`
Atualiza a configuração da página de links.

**Body:**
```json
{
  "profile": {
    "title": "Novo Título",
    "description": "Nova descrição"
  },
  "socialLinks": [...],
  "sections": [...]
}
```

#### POST `/api/links`
Mesmo comportamento do PUT (cria ou atualiza).

## 🛠️ Interface de Administração

Acesse `/admin` para gerenciar projetos e configurações através de uma interface visual.

### Funcionalidades:
- ✅ Listar todos os projetos
- ✅ Criar novos projetos
- ✅ Editar projetos existentes
- ✅ Deletar projetos
- ✅ Configurar página de links
- ✅ Preview das configurações

## 📝 Exemplos de Uso

### Atualizar um projeto via API

```javascript
// Atualizar status de um projeto
const response = await fetch('/api/projects/socialflux', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'Disponível',
    description: 'Nova descrição atualizada'
  })
});

const updatedProject = await response.json();
```

### Criar novo projeto

```javascript
const newProject = {
  id: 'meu-novo-projeto',
  title: 'Meu Novo Projeto',
  description: 'Descrição do projeto',
  tags: ['SaaS', 'IA'],
  status: 'Em Desenvolvimento',
  category: 'projeto',
  links: {
    live: '/servicos/meu-novo-projeto'
  }
};

const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProject)
});
```

### Atualizar página de links

```javascript
const linksConfig = {
  profile: {
    title: 'WM3 Digital',
    description: 'Nova descrição atualizada'
  },
  socialLinks: [
    {
      id: 'instagram',
      title: 'Instagram',
      url: 'https://instagram.com/wm3digital',
      icon: 'instagram',
      color: 'from-pink-500 to-purple-500'
    }
  ],
  sections: [...]
};

await fetch('/api/links', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(linksConfig)
});
```

## 🔄 Sincronização Automática

As páginas da landing page buscam dados automaticamente das APIs:

- **Landing Page (`/`)**: Busca projetos disponíveis via API
- **Página de Projetos (`/projetos`)**: Lista projetos disponíveis
- **Página de Serviços (`/servicos`)**: Lista serviços disponíveis
- **Página Em Breve (`/em-breve`)**: Lista projetos em desenvolvimento
- **Página de Links (`/links`)**: Busca configuração e projetos via API

Todas as atualizações feitas via API ou interface de admin são refletidas automaticamente nas páginas.

## 📁 Estrutura de Dados

### Armazenamento
Os dados são armazenados em arquivos JSON no diretório `/data`:
- `data/projects.json`: Lista de todos os projetos
- `data/links-config.json`: Configuração da página de links

**Nota**: Em produção, considere migrar para um banco de dados real (PostgreSQL, MongoDB, etc.) para melhor performance e escalabilidade.

## 🔒 Segurança

**Importante**: A interface de admin (`/admin`) atualmente não possui autenticação. Para produção, adicione:

1. Autenticação (JWT, OAuth, etc.)
2. Middleware de autorização nas rotas de API
3. Validação de dados de entrada
4. Rate limiting

## 🚀 Próximos Passos

1. **Autenticação**: Adicionar sistema de login para `/admin`
2. **Banco de Dados**: Migrar de JSON para banco de dados real
3. **Cache**: Implementar sistema de cache para melhor performance
4. **Webhooks**: Notificar outros sistemas quando projetos são atualizados
5. **Versionamento**: Histórico de alterações nos projetos

## 📞 Suporte

Para dúvidas ou problemas com as APIs, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

---

**Última atualização**: Dezembro 2024


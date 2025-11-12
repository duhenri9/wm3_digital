# 🔐 Sistema de Autenticação e MySQL - WM3 Digital

## ✅ Status: Implementação Completa

Sistema completo de autenticação com JWT e migração para MySQL implementado e funcional.

## 📋 O que foi implementado

### 1. Autenticação
- ✅ Sistema de login com JWT
- ✅ Página de login (`/login`)
- ✅ Proteção de rotas de API (POST, PUT, DELETE)
- ✅ Proteção da página `/admin`
- ✅ Logout funcional
- ✅ Verificação de autenticação em tempo real

### 2. Banco de Dados MySQL
- ✅ Schema completo do banco de dados
- ✅ Suporte automático MySQL/JSON
- ✅ Migração de dados
- ✅ Funções de CRUD para MySQL
- ✅ Fallback para JSON em desenvolvimento

### 3. Segurança
- ✅ Senhas com hash bcrypt
- ✅ Tokens JWT com expiração
- ✅ Cookies HTTP-only
- ✅ Middleware de autenticação
- ✅ Validação de permissões

## 🚀 Como Usar

### Configuração Rápida

1. **Instalar dependências** (já feito):
```bash
npm install
```

2. **Configurar variáveis de ambiente**:
```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais MySQL
```

3. **Criar banco de dados**:
```bash
mysql -u seu_usuario -p < database/schema.sql
```

4. **Criar usuário admin**:
```bash
node scripts/create-admin-user.js admin minhasenha123 admin@email.com
```

5. **Iniciar servidor**:
```bash
npm run dev
```

6. **Acessar login**:
```
http://localhost:3000/login
```

### Para Produção (VPS Hostinger)

1. **Configure variáveis de ambiente no servidor**:
```env
DB_HOST=localhost
DB_USER=u123456789_wm3
DB_PASSWORD=sua_senha
DB_NAME=u123456789_wm3_digital
JWT_SECRET=string-aleatoria-segura
```

2. **Execute o schema SQL** no MySQL da Hostinger

3. **Crie usuário admin** usando o script ou SQL direto

4. **Deploy da aplicação**

## 📁 Arquivos Criados

### Banco de Dados
- `database/schema.sql` - Schema completo do MySQL
- `database/README.md` - Documentação do banco

### Autenticação
- `src/lib/auth.ts` - Sistema de autenticação
- `src/lib/middleware.ts` - Middleware de proteção
- `src/app/api/auth/login/route.ts` - API de login
- `src/app/api/auth/logout/route.ts` - API de logout
- `src/app/api/auth/me/route.ts` - Verificar usuário atual
- `src/app/login/page.tsx` - Página de login

### Banco de Dados
- `src/lib/db.ts` - Conexão MySQL
- `src/lib/data-storage-mysql.ts` - Funções MySQL
- `src/lib/data-storage-json.ts` - Fallback JSON
- `src/lib/data-storage.ts` - Wrapper automático

### Scripts
- `scripts/create-admin-user.js` - Criar usuário admin

### Documentação
- `SETUP_AUTENTICACAO_MYSQL.md` - Guia completo
- `README_AUTENTICACAO.md` - Este arquivo
- `.env.example` - Exemplo de variáveis

## 🔑 Credenciais Padrão

**IMPORTANTE**: Altere imediatamente em produção!

- **Username**: `admin`
- **Senha**: `admin123`
- **Email**: `admin@wm3digital.com.br`

## 🔒 Rotas Protegidas

### Requerem Autenticação:
- `POST /api/projects` - Criar projeto
- `PUT /api/projects` - Atualizar projeto
- `PUT /api/projects/[id]` - Atualizar projeto específico
- `DELETE /api/projects` - Deletar projeto
- `DELETE /api/projects/[id]` - Deletar projeto específico
- `PUT /api/links` - Atualizar configuração de links
- `POST /api/links` - Criar/atualizar configuração
- `/admin` - Página de administração

### Públicas (não requerem autenticação):
- `GET /api/projects` - Listar projetos
- `GET /api/projects/[id]` - Buscar projeto
- `GET /api/links` - Obter configuração de links
- `/login` - Página de login

## 🧪 Testando

### 1. Testar Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 2. Testar API Protegida

```bash
# Obter token do login acima, depois:
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 3. Testar Criação de Projeto

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "id": "teste",
    "title": "Projeto Teste",
    "description": "Descrição",
    "tags": ["teste"],
    "status": "Disponível",
    "category": "projeto",
    "links": {}
  }'
```

## 📝 Próximos Passos

1. ✅ Configurar MySQL na VPS Hostinger
2. ✅ Alterar senha do admin
3. ✅ Configurar JWT_SECRET seguro
4. ✅ Testar todas as funcionalidades
5. ✅ Fazer backup do banco regularmente

## 🐛 Troubleshooting

Veja `SETUP_AUTENTICACAO_MYSQL.md` para troubleshooting detalhado.

---

**Implementado em**: Dezembro 2024
**Status**: ✅ Completo e Funcional


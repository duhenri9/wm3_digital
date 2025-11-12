# Guia de Configuração - Autenticação e MySQL

## ✅ Implementações Concluídas

### 1. Sistema de Autenticação
- ✅ Autenticação com JWT
- ✅ Página de login (`/login`)
- ✅ Proteção de rotas de API
- ✅ Proteção da página `/admin`
- ✅ Logout funcional

### 2. Migração para MySQL
- ✅ Suporte para MySQL e JSON (fallback)
- ✅ Detecção automática do modo (MySQL ou JSON)
- ✅ Schema SQL completo
- ✅ Funções de migração

## 🚀 Passos para Configuração

### Passo 1: Instalar Dependências

As dependências já foram instaladas:
- `mysql2` - Cliente MySQL
- `bcryptjs` - Hash de senhas
- `jsonwebtoken` - Tokens JWT

### Passo 2: Configurar Banco de Dados MySQL

#### 2.1 Criar Banco de Dados

Execute o script SQL em `database/schema.sql`:

```bash
# Via linha de comando
mysql -u seu_usuario -p < database/schema.sql

# Ou via phpMyAdmin/MySQL Workbench
# Copie e cole o conteúdo de database/schema.sql
```

#### 2.2 Configurar Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
# Para desenvolvimento local (usa JSON)
DB_HOST=localhost
# ou deixe vazio para usar JSON

# Para produção (usa MySQL)
DB_HOST=seu_host_mysql
DB_PORT=3306
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=wm3_digital

# IMPORTANTE: Altere em produção!
JWT_SECRET=uma-string-aleatoria-muito-segura-aqui
JWT_EXPIRES_IN=7d
```

### Passo 3: Configurar VPS Hostinger

Para o domínio `wm3digital.com.br`:

1. **Acesse o painel da Hostinger**
2. **Obtenha as credenciais do MySQL**:
   - Host: geralmente `localhost` ou um IP específico
   - Usuário: formato `u123456789_wm3`
   - Senha: sua senha MySQL
   - Banco: formato `u123456789_wm3_digital`

3. **Configure no `.env.local` (ou variáveis de ambiente do servidor)**:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123456789_wm3
DB_PASSWORD=sua_senha_aqui
DB_NAME=u123456789_wm3_digital

JWT_SECRET=gerar-uma-string-aleatoria-segura-aqui
```

4. **Execute o schema SQL** no seu banco MySQL da Hostinger

### Passo 4: Criar Usuário Admin

O schema SQL cria um usuário padrão:
- **Username**: `admin`
- **Senha**: `admin123` (ALTERE IMEDIATAMENTE!)

Para criar um novo usuário ou alterar senha:

```sql
-- Gerar hash da senha usando bcrypt (use um gerador online ou script)
-- Exemplo: senha "minhasenha123" -> hash "$2a$10$..."

UPDATE users 
SET password_hash = '$2a$10$SEU_HASH_AQUI' 
WHERE username = 'admin';
```

**Gerador de hash bcrypt online**: https://bcrypt-generator.com/

### Passo 5: Testar Sistema

1. **Inicie o servidor**:
```bash
npm run dev
```

2. **Acesse `/login`**:
```
http://localhost:3000/login
```

3. **Faça login**:
- Username: `admin`
- Senha: `admin123` (ou a senha que você configurou)

4. **Acesse `/admin`**:
```
http://localhost:3000/admin
```

## 🔐 Segurança

### Checklist de Segurança

- [ ] Alterar senha do usuário admin padrão
- [ ] Configurar `JWT_SECRET` com string aleatória segura
- [ ] Usar HTTPS em produção
- [ ] Configurar firewall para MySQL
- [ ] Limitar acesso ao MySQL apenas do servidor
- [ ] Não commitar `.env.local` (já está no `.gitignore`)
- [ ] Usar senhas fortes
- [ ] Habilitar SSL no MySQL se disponível

### Gerar JWT_SECRET Seguro

```bash
# Via Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Ou use um gerador online
```

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas

1. **users** - Usuários do sistema
   - id, username, email, password_hash, role
   
2. **projects** - Projetos/serviços
   - id, title, description, tags (JSON), status, category, price, links (JSON)
   
3. **links_config** - Configuração da página de links
   - id, config_key, config_value (JSON)

## 🔄 Modo de Operação

O sistema detecta automaticamente qual modo usar:

### Modo JSON (Desenvolvimento)
- Quando `DB_HOST` não está configurado ou é `localhost`
- Dados armazenados em `data/*.json`
- Não requer MySQL

### Modo MySQL (Produção)
- Quando `DB_HOST` está configurado e não é `localhost`
- Dados armazenados no MySQL
- Requer conexão com banco de dados

## 🐛 Troubleshooting

### Erro: "Cannot connect to MySQL"

1. Verifique se o MySQL está rodando
2. Verifique credenciais no `.env.local`
3. Verifique se o banco de dados existe
4. Verifique firewall/portas

### Erro: "Token inválido"

1. Verifique se `JWT_SECRET` está configurado
2. Limpe cookies e faça login novamente
3. Verifique se o token não expirou

### Erro: "Não autorizado"

1. Verifique se está logado (`/login`)
2. Verifique se o token está sendo enviado
3. Verifique se o token não expirou

## 📝 Próximos Passos

1. ✅ Configurar MySQL na VPS
2. ✅ Alterar senha do admin
3. ✅ Configurar JWT_SECRET seguro
4. ✅ Testar todas as funcionalidades
5. ✅ Fazer backup do banco de dados regularmente

## 📞 Suporte

Para problemas:
1. Verifique os logs do servidor
2. Verifique conexão com MySQL
3. Verifique variáveis de ambiente
4. Consulte `database/README.md` para mais detalhes

---

**Status**: ✅ Sistema completo e funcional
**Próximo**: Configurar na VPS Hostinger


# Configuração do Banco de Dados MySQL

## 📋 Passos para Configuração

### 1. Criar Banco de Dados

Execute o script SQL em `database/schema.sql` no seu MySQL:

```bash
# Via linha de comando MySQL
mysql -u seu_usuario -p < database/schema.sql

# Ou via phpMyAdmin/MySQL Workbench
# Copie e cole o conteúdo de database/schema.sql
```

### 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
DB_HOST=seu_host_mysql
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=wm3_digital

JWT_SECRET=uma-string-aleatoria-muito-segura-aqui
```

### 3. Para VPS Hostinger (wm3digital.com.br)

Configure as variáveis de ambiente no seu servidor:

```env
DB_HOST=localhost  # ou o IP do servidor MySQL
DB_PORT=3306
DB_USER=u123456789_wm3  # seu usuário MySQL da Hostinger
DB_PASSWORD=sua_senha_mysql
DB_NAME=u123456789_wm3_digital  # seu banco de dados

JWT_SECRET=gerar-uma-string-aleatoria-segura
```

### 4. Criar Usuário Admin

Após executar o schema, você pode criar um usuário admin:

```sql
-- O schema já cria um usuário padrão com senha "admin123"
-- ALTERE A SENHA IMEDIATAMENTE EM PRODUÇÃO!

-- Para criar um novo usuário:
INSERT INTO users (username, email, password_hash, role) 
VALUES ('seu_usuario', 'seu@email.com', '$2a$10$hash_aqui', 'admin');
```

**Importante**: O hash da senha deve ser gerado usando bcrypt. Use um script ou ferramenta online para gerar o hash.

### 5. Testar Conexão

O sistema detecta automaticamente se deve usar MySQL ou JSON:
- Se `DB_HOST` estiver configurado e não for 'localhost', usa MySQL
- Caso contrário, usa arquivos JSON (modo desenvolvimento)

## 🔐 Segurança

1. **Nunca commite o arquivo `.env.local`** - ele está no `.gitignore`
2. **Altere o JWT_SECRET** em produção para uma string aleatória segura
3. **Altere a senha do usuário admin** padrão imediatamente
4. **Use HTTPS** em produção
5. **Configure firewall** para limitar acesso ao MySQL apenas do servidor

## 🚀 Migração de Dados

Se você já tem dados em JSON e quer migrar para MySQL:

1. Configure o MySQL primeiro
2. Execute o schema
3. O sistema migrará automaticamente na primeira execução (se implementado)
4. Ou use um script de migração manual

## 📞 Suporte

Para problemas de conexão:
- Verifique se o MySQL está rodando
- Verifique credenciais
- Verifique firewall/portas
- Verifique se o banco de dados existe


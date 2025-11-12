# 🚀 Guia Rápido de Deploy

## ⚡ Deploy Rápido (Recomendado)

### No Servidor:

```bash
cd /var/www/wm3
git pull origin main
./scripts/quick-deploy.sh
```

Pronto! ✅

## 📋 Configuração Inicial do Servidor

### 1. Clone o Repositório

```bash
cd /var/www
git clone seu-repositorio.git wm3
cd wm3
```

### 2. Configure Variáveis de Ambiente

```bash
cp env.production.example .env.local
nano .env.local
```

Configure:
```env
DB_HOST=localhost
DB_USER=wm3_user
DB_PASSWORD=sup@2026UP
DB_NAME=wm3_db
JWT_SECRET=sua-string-secreta-aqui
PROJECT_PATH=/var/www/wm3
```

### 3. Configure Banco de Dados

```bash
mysql -u wm3_user -p wm3_db < database/schema.sql
node scripts/create-admin-user.js admin sua_senha admin@email.com
```

### 4. Configure PM2

```bash
chmod +x scripts/setup-pm2.sh
./scripts/setup-pm2.sh
```

### 5. Primeiro Deploy

```bash
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save
```

## 🔄 Deploy Contínuo

### Opção 1: Git Pull Manual

```bash
cd /var/www/wm3
git pull origin main
./scripts/quick-deploy.sh
```

### Opção 2: Git Hook Automático

Configure o hook `post-receive` no servidor para deploy automático ao fazer push.

### Opção 3: GitHub Actions

Configure os secrets no GitHub e faça push - o deploy será automático.

## 📝 Scripts Disponíveis

- `quick-deploy.sh` - Deploy rápido (recomendado)
- `deploy-git.sh` - Deploy completo via Git
- `setup-pm2.sh` - Configurar PM2
- `create-admin-user.js` - Criar usuário admin

## 🔍 Verificação

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs wm3-digital

# Testar API
curl http://localhost:3000/api/projects
```

## 📚 Documentação Completa

Veja `DEPLOY.md` para documentação detalhada.

---

**Deploy rápido**: `git pull && ./scripts/quick-deploy.sh`


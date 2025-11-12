# ⚡ Início Rápido - WM3 Digital

## 🎯 Configuração em 5 Minutos

### 1. No Servidor (Primeira Vez)

```bash
# Clone o repositório
cd /var/www
git clone seu-repositorio.git wm3
cd wm3

# Configure ambiente
cp env.production.example .env.local
nano .env.local  # Configure DB_PASSWORD e JWT_SECRET

# Configure banco
mysql -u wm3_user -p wm3_db < database/schema.sql
node scripts/create-admin-user.js admin sua_senha admin@email.com

# Instale e configure
npm install
npm run build
chmod +x scripts/*.sh
npm run deploy:setup
```

### 2. Deploy Diário (Depois)

```bash
cd /var/www/wm3
git pull origin main
npm run deploy
```

**Pronto!** ✅

## 📋 Informações do Servidor

- **Host**: wm3digital.com.br
- **Path**: `/var/www/wm3`
- **DB**: `wm3_db` (user: `wm3_user`, pass: `sup@2026UP`)

## 🔑 Acessos

- **Site**: https://wm3digital.com.br
- **Admin**: https://wm3digital.com.br/admin
- **Login**: https://wm3digital.com.br/login
- **API**: https://wm3digital.com.br/api/projects

## 📚 Documentação Completa

- `DEPLOY.md` - Guia completo
- `SCRIPTS_DEPLOY.md` - Documentação dos scripts
- `SETUP_AUTENTICACAO_MYSQL.md` - Setup detalhado

---

**Deploy rápido**: `git pull && npm run deploy` 🚀


# 📦 Scripts de Deploy - WM3 Digital

## 📋 Scripts Disponíveis

### Scripts de Deploy

#### 1. `quick-deploy.sh` ⚡ (Recomendado)
**Uso**: Deploy rápido após git pull
```bash
cd /var/www/wm3
git pull origin main
./scripts/quick-deploy.sh
```

**O que faz**:
- Instala dependências de produção
- Constrói a aplicação
- Reinicia PM2 ou systemd

#### 2. `deploy.sh`
**Uso**: Deploy completo (local → servidor)
```bash
./scripts/deploy.sh production
```

**O que faz**:
- Instala dependências
- Executa lint
- Constrói aplicação
- Cria arquivo compactado para envio

#### 3. `deploy-remote.sh`
**Uso**: Deploy no servidor (execute no servidor)
```bash
# Após enviar deploy.tar.gz para o servidor
./scripts/deploy-remote.sh
```

**O que faz**:
- Faz backup da versão atual
- Extrai novo deploy
- Para aplicação
- Copia arquivos
- Instala dependências
- Verifica MySQL
- Inicia aplicação

#### 4. `deploy-git.sh`
**Uso**: Deploy via Git (no servidor)
```bash
cd /var/www/wm3
./scripts/deploy-git.sh main
```

**O que faz**:
- Faz pull do repositório
- Cria backup da branch atual
- Atualiza código
- Instala dependências
- Constrói aplicação
- Reinicia aplicação

#### 5. `deploy-ftp.sh`
**Uso**: Deploy via FTP
```bash
# Configure FTP_HOST, FTP_USER, FTP_PASS no .env.local
./scripts/deploy-ftp.sh
```

**Requisitos**: `lftp` instalado

### Scripts de Configuração

#### 6. `setup-pm2.sh`
**Uso**: Configurar PM2 no servidor (uma vez)
```bash
chmod +x scripts/setup-pm2.sh
./scripts/setup-pm2.sh
```

**O que faz**:
- Instala PM2 (se necessário)
- Cria `ecosystem.config.js`
- Inicia aplicação
- Configura para iniciar no boot

#### 7. `setup-systemd.sh`
**Uso**: Configurar systemd service (uma vez, com sudo)
```bash
sudo chmod +x scripts/setup-systemd.sh
sudo ./scripts/setup-systemd.sh
```

**O que faz**:
- Cria serviço systemd
- Configura para iniciar no boot
- Inicia serviço

#### 8. `create-admin-user.js`
**Uso**: Criar usuário admin no banco
```bash
node scripts/create-admin-user.js username senha email
```

**Exemplo**:
```bash
node scripts/create-admin-user.js admin minhasenha123 admin@wm3digital.com.br
```

#### 9. `post-receive.sh`
**Uso**: Git hook para deploy automático
```bash
# Configure no servidor:
# /var/www/wm3.git/hooks/post-receive
chmod +x /var/www/wm3.git/hooks/post-receive
```

**O que faz**:
- Executado automaticamente ao receber push
- Faz checkout do código
- Executa deploy rápido

## 🚀 Fluxo de Deploy Recomendado

### Primeira Vez (Setup Inicial)

```bash
# 1. No servidor
cd /var/www
git clone seu-repositorio.git wm3
cd wm3

# 2. Configurar ambiente
cp env.production.example .env.local
nano .env.local  # Configure com suas credenciais

# 3. Configurar banco
mysql -u wm3_user -p wm3_db < database/schema.sql
node scripts/create-admin-user.js admin senha admin@email.com

# 4. Instalar e configurar
npm install
npm run build
chmod +x scripts/setup-pm2.sh
./scripts/setup-pm2.sh
```

### Deploy Contínuo (Após Setup)

**Opção 1: Manual (Mais Simples)**
```bash
cd /var/www/wm3
git pull origin main
./scripts/quick-deploy.sh
```

**Opção 2: Automático com Git Hook**
```bash
# Configure uma vez
# Depois, apenas faça: git push origin main
# O servidor fará deploy automaticamente
```

**Opção 3: GitHub Actions**
```bash
# Configure secrets no GitHub
# Depois, apenas faça: git push origin main
# GitHub Actions fará deploy automaticamente
```

## 📝 Variáveis de Ambiente Configuradas

As seguintes variáveis estão configuradas no `env.production.example`:

```env
DB_HOST=localhost
DB_USER=wm3_user
DB_PASSWORD=sup@2026UP
DB_PASS=sup@2026UP
DB_NAME=wm3_db
PROJECT_PATH=/var/www/wm3
```

## 🔧 Configuração de CI/CD

### GitHub Actions

Arquivo: `.github/workflows/deploy.yml`

**Secrets necessários no GitHub**:
- `SSH_HOST`: wm3digital.com.br
- `SSH_USER`: seu_usuario_ssh
- `SSH_PRIVATE_KEY`: sua chave SSH privada
- `PROJECT_PATH`: /var/www/wm3

**Como configurar**:
1. Vá em Settings → Secrets and variables → Actions
2. Adicione os secrets acima
3. Faça push para `main` ou `production`
4. Deploy automático! 🎉

## 📊 Comparação dos Métodos

| Método | Complexidade | Velocidade | Recomendado Para |
|--------|-------------|------------|------------------|
| `quick-deploy.sh` | ⭐ Fácil | ⚡ Rápido | Uso diário |
| `deploy-git.sh` | ⭐⭐ Médio | ⚡⚡ Muito rápido | Deploy completo |
| `deploy-ftp.sh` | ⭐⭐ Médio | 🐌 Lento | Servidores sem Git |
| GitHub Actions | ⭐⭐⭐ Avançado | ⚡⚡⚡ Automático | Equipes/Produção |

## 🎯 Recomendação

**Para uso diário**: Use `quick-deploy.sh`
```bash
git pull && ./scripts/quick-deploy.sh
```

**Para produção**: Configure GitHub Actions ou Git Hook para deploy automático.

## 📚 Documentação Completa

- `DEPLOY.md` - Guia completo de deploy
- `README_DEPLOY.md` - Guia rápido
- `SETUP_AUTENTICACAO_MYSQL.md` - Configuração inicial

---

**Todos os scripts estão prontos e com permissões de execução!** ✅


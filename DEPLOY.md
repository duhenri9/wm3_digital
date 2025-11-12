# 🚀 Guia de Deploy - WM3 Digital

## 📋 Informações do Servidor

- **Host**: wm3digital.com.br
- **Caminho do Projeto**: `/var/www/wm3`
- **Banco de Dados**: MySQL
  - Host: `localhost`
  - Database: `wm3_db`
  - User: `wm3_user`
  - Password: `sup@2026UP`

## 🔧 Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` no servidor:

```bash
cd /var/www/wm3
cp .env.example .env.local
nano .env.local
```

Configure com:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=wm3_user
DB_PASSWORD=sup@2026UP
DB_NAME=wm3_db
JWT_SECRET=sua-string-secreta-aqui
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://wm3digital.com.br
PROJECT_PATH=/var/www/wm3
```

### 2. Configurar Banco de Dados

Execute o schema SQL:
```bash
mysql -u wm3_user -p wm3_db < database/schema.sql
```

### 3. Criar Usuário Admin

```bash
node scripts/create-admin-user.js admin sua_senha_segura admin@wm3digital.com.br
```

## 📦 Métodos de Deploy

### Método 1: Deploy Manual (Recomendado para início)

#### Passo a Passo:

1. **No seu computador local:**
```bash
# Construir aplicação
npm run build

# Criar arquivo compactado
tar -czf deploy.tar.gz .next public package.json package-lock.json next.config.ts tsconfig.json tailwind.config.js postcss.config.mjs .env.local
```

2. **Enviar para servidor:**
```bash
scp deploy.tar.gz usuario@wm3digital.com.br:/tmp/
```

3. **No servidor:**
```bash
cd /var/www/wm3
tar -xzf /tmp/deploy.tar.gz
npm ci --production
pm2 restart wm3-digital
# ou
systemctl restart wm3-digital
```

### Método 2: Deploy via Git (Recomendado)

#### Configuração Inicial:

1. **No servidor, clone o repositório:**
```bash
cd /var/www
git clone seu-repositorio.git wm3
cd wm3
npm install
npm run build
```

2. **Configure PM2 ou systemd:**
```bash
# PM2
chmod +x scripts/setup-pm2.sh
./scripts/setup-pm2.sh

# Ou systemd
sudo chmod +x scripts/setup-systemd.sh
sudo ./scripts/setup-systemd.sh
```

#### Deploy Contínuo:

**No servidor, crie um webhook ou execute manualmente:**
```bash
cd /var/www/wm3
chmod +x scripts/deploy-git.sh
./scripts/deploy-git.sh main
```

### Método 3: Deploy via Scripts Automatizados

#### Script de Deploy Local:
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh production
```

#### Script de Deploy Remoto (execute no servidor):
```bash
chmod +x scripts/deploy-remote.sh
./scripts/deploy-remote.sh
```

### Método 4: Deploy via FTP

```bash
chmod +x scripts/deploy-ftp.sh
# Configure FTP_HOST, FTP_USER, FTP_PASS no .env.local
./scripts/deploy-ftp.sh
```

### Método 5: CI/CD com GitHub Actions

1. **Configure secrets no GitHub:**
   - `SSH_HOST`: wm3digital.com.br
   - `SSH_USER`: seu_usuario_ssh
   - `SSH_PRIVATE_KEY`: sua chave SSH privada
   - `PROJECT_PATH`: /var/www/wm3

2. **Push para main:**
```bash
git push origin main
```

3. **GitHub Actions fará o deploy automaticamente**

## 🔄 Processo de Deploy Recomendado

### Desenvolvimento → Produção

1. **Desenvolver localmente:**
```bash
npm run dev
```

2. **Testar build:**
```bash
npm run build
npm start
```

3. **Commit e push:**
```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

4. **No servidor (se usando Git):**
```bash
cd /var/www/wm3
git pull origin main
npm ci --production
npm run build
pm2 restart wm3-digital
```

## 🛠️ Gerenciamento de Processos

### Usando PM2 (Recomendado)

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs wm3-digital

# Reiniciar
pm2 restart wm3-digital

# Parar
pm2 stop wm3-digital

# Iniciar
pm2 start wm3-digital

# Monitorar
pm2 monit
```

### Usando systemd

```bash
# Ver status
systemctl status wm3-digital

# Ver logs
journalctl -u wm3-digital -f

# Reiniciar
systemctl restart wm3-digital

# Parar
systemctl stop wm3-digital

# Iniciar
systemctl start wm3-digital
```

## 🔍 Verificação Pós-Deploy

### Checklist:

- [ ] Aplicação está rodando (`pm2 status` ou `systemctl status`)
- [ ] Site está acessível (https://wm3digital.com.br)
- [ ] API está respondendo (`curl https://wm3digital.com.br/api/projects`)
- [ ] Login funciona (`/login`)
- [ ] Admin funciona (`/admin`)
- [ ] Banco de dados conectado
- [ ] Logs sem erros críticos

### Comandos de Verificação:

```bash
# Verificar se aplicação está rodando
curl http://localhost:3000/api/projects

# Verificar logs
pm2 logs wm3-digital --lines 50
# ou
journalctl -u wm3-digital -n 50

# Verificar conexão MySQL
mysql -u wm3_user -p wm3_db -e "SELECT COUNT(*) FROM projects;"
```

## 🔐 Segurança

### Checklist de Segurança:

- [ ] `.env.local` não está no Git (já no .gitignore)
- [ ] `JWT_SECRET` é uma string aleatória segura
- [ ] Senha do admin foi alterada
- [ ] MySQL só aceita conexões locais
- [ ] Firewall configurado
- [ ] HTTPS habilitado (certificado SSL)
- [ ] Permissões de arquivos corretas (755 para diretórios, 644 para arquivos)

### Configurar SSL (HTTPS):

```bash
# Com certbot (Let's Encrypt)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d wm3digital.com.br -d www.wm3digital.com.br
```

## 📊 Monitoramento

### Logs Importantes:

- **Aplicação**: `/var/log/pm2/wm3-digital-*.log` (PM2) ou `journalctl -u wm3-digital`
- **Nginx/Apache**: `/var/log/nginx/` ou `/var/log/apache2/`
- **MySQL**: `/var/log/mysql/`

### Monitoramento Recomendado:

1. **PM2 Plus** (gratuito): `pm2 plus`
2. **Uptime Robot**: Monitorar URL
3. **Logs centralizados**: Considerar Sentry ou similar

## 🐛 Troubleshooting

### Aplicação não inicia:

```bash
# Verificar logs
pm2 logs wm3-digital
# ou
journalctl -u wm3-digital -f

# Verificar se porta está em uso
netstat -tulpn | grep 3000

# Verificar permissões
ls -la /var/www/wm3
```

### Erro de conexão MySQL:

```bash
# Testar conexão
mysql -u wm3_user -p wm3_db

# Verificar se MySQL está rodando
systemctl status mysql

# Verificar configuração
cat .env.local | grep DB_
```

### Build falha:

```bash
# Limpar cache
rm -rf .next node_modules
npm install
npm run build
```

## 📝 Scripts Disponíveis

Todos os scripts estão em `scripts/`:

- `deploy.sh` - Deploy manual (local)
- `deploy-remote.sh` - Deploy remoto (servidor)
- `deploy-git.sh` - Deploy via Git
- `deploy-ftp.sh` - Deploy via FTP
- `setup-pm2.sh` - Configurar PM2
- `setup-systemd.sh` - Configurar systemd
- `create-admin-user.js` - Criar usuário admin

## 🚀 Deploy Rápido (One-liner)

```bash
# No servidor
cd /var/www/wm3 && git pull && npm ci --production && npm run build && pm2 restart wm3-digital
```

## 📞 Suporte

Para problemas:
1. Verifique os logs
2. Verifique variáveis de ambiente
3. Verifique conexão MySQL
4. Verifique permissões de arquivos
5. Consulte `SETUP_AUTENTICACAO_MYSQL.md`

---

**Última atualização**: Dezembro 2024


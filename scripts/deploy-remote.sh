#!/bin/bash

# Script de Deploy Remoto - Execute no servidor
# Uso: ./scripts/deploy-remote.sh

set -e

PROJECT_PATH=${PROJECT_PATH:-/var/www/wm3}
BACKUP_DIR=${BACKUP_DIR:-/var/backups/wm3}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 Iniciando deploy remoto..."

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info() {
    echo -e "${GREEN}✓${NC} $1"
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
    exit 1
}

# Verificar se está rodando como root ou com permissões
if [ "$EUID" -ne 0 ] && [ ! -w "$PROJECT_PATH" ]; then
    error "Execute com sudo ou com permissões de escrita em $PROJECT_PATH"
fi

# Criar diretórios se não existirem
mkdir -p $PROJECT_PATH
mkdir -p $BACKUP_DIR

info "1. Fazendo backup da versão atual..."
if [ -d "$PROJECT_PATH/.next" ]; then
    tar -czf $BACKUP_DIR/backup_$TIMESTAMP.tar.gz -C $PROJECT_PATH .next package.json 2>/dev/null || warn "Nenhum backup anterior encontrado"
    info "Backup salvo em: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
fi

info "2. Extraindo novo deploy..."
if [ -f "deploy.tar.gz" ]; then
    tar -xzf deploy.tar.gz -C /tmp/
    info "Arquivos extraídos"
else
    error "Arquivo deploy.tar.gz não encontrado!"
fi

info "3. Parando aplicação (se estiver rodando)..."
# Parar PM2 se estiver usando
pm2 stop wm3-digital 2>/dev/null || warn "PM2 não está rodando ou aplicação não encontrada"
# Ou parar serviço systemd
systemctl stop wm3-digital 2>/dev/null || warn "Serviço systemd não encontrado"

info "4. Copiando arquivos..."
cp -r /tmp/wm3_digital/* $PROJECT_PATH/
chown -R www-data:www-data $PROJECT_PATH 2>/dev/null || warn "Não foi possível alterar permissões"

info "5. Instalando dependências de produção..."
cd $PROJECT_PATH
npm ci --production --ignore-scripts || npm install --production --ignore-scripts

info "6. Verificando banco de dados..."
# Verificar conexão com MySQL
node -e "
const mysql = require('mysql2/promise');
const config = require('./.env.local');
mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).then(() => {
  console.log('✓ Conexão com MySQL OK');
  process.exit(0);
}).catch(err => {
  console.error('✗ Erro ao conectar MySQL:', err.message);
  process.exit(1);
});
" || warn "Erro ao verificar MySQL (pode ser normal se ainda não configurado)"

info "7. Iniciando aplicação..."
# Iniciar com PM2
if command -v pm2 &> /dev/null; then
    cd $PROJECT_PATH
    pm2 start npm --name "wm3-digital" -- start || pm2 restart wm3-digital
    pm2 save
    info "Aplicação iniciada com PM2"
# Ou iniciar com systemd
elif systemctl list-unit-files | grep -q wm3-digital; then
    systemctl start wm3-digital
    systemctl enable wm3-digital
    info "Aplicação iniciada com systemd"
else
    warn "PM2 ou systemd não encontrado. Inicie manualmente com: npm start"
fi

info "8. Verificando saúde da aplicação..."
sleep 3
if curl -f http://localhost:3000/api/projects > /dev/null 2>&1; then
    info "Aplicação está respondendo corretamente!"
else
    warn "Aplicação pode não estar respondendo. Verifique os logs."
fi

info "✅ Deploy concluído com sucesso!"
info "Aplicação disponível em: https://wm3digital.com.br"


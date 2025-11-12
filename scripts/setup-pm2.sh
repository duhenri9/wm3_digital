#!/bin/bash

# Script para configurar PM2 no servidor
# Execute este script uma vez no servidor para configurar PM2

set -e

PROJECT_PATH=${PROJECT_PATH:-/var/www/wm3}
APP_NAME="wm3-digital"

echo "🔧 Configurando PM2 para WM3 Digital..."

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

# Verificar se PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    info "Instalando PM2..."
    npm install -g pm2
fi

cd $PROJECT_PATH

# Criar arquivo de configuração do PM2
info "Criando arquivo de configuração do PM2..."
cat > ecosystem.config.js <<EOF
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$PROJECT_PATH',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/$APP_NAME-error.log',
    out_file: '/var/log/pm2/$APP_NAME-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G',
    watch: false
  }]
};
EOF

# Criar diretório de logs
mkdir -p /var/log/pm2
chmod 755 /var/log/pm2

# Iniciar aplicação com PM2
info "Iniciando aplicação com PM2..."
pm2 start ecosystem.config.js

# Salvar configuração do PM2
pm2 save

# Configurar PM2 para iniciar no boot
info "Configurando PM2 para iniciar no boot..."
pm2 startup

info "✅ PM2 configurado com sucesso!"
info "Comandos úteis:"
echo "  - Ver status: pm2 status"
echo "  - Ver logs: pm2 logs $APP_NAME"
echo "  - Reiniciar: pm2 restart $APP_NAME"
echo "  - Parar: pm2 stop $APP_NAME"


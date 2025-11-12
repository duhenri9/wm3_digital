#!/bin/bash

# Script para configurar systemd service
# Execute este script com sudo no servidor

set -e

PROJECT_PATH=${PROJECT_PATH:-/var/www/wm3}
SERVICE_NAME="wm3-digital"
USER=${USER:-www-data}

echo "🔧 Configurando systemd service para WM3 Digital..."

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

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    error "Execute este script com sudo"
fi

# Encontrar Node.js
NODE_PATH=$(which node)
if [ -z "$NODE_PATH" ]; then
    error "Node.js não encontrado. Instale Node.js primeiro."
fi

info "Criando arquivo de serviço systemd..."
cat > /etc/systemd/system/$SERVICE_NAME.service <<EOF
[Unit]
Description=WM3 Digital Landing Page
After=network.target mysql.service

[Service]
Type=simple
User=$USER
WorkingDirectory=$PROJECT_PATH
Environment="NODE_ENV=production"
Environment="PORT=3000"
ExecStart=$NODE_PATH $PROJECT_PATH/node_modules/.bin/next start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

# Segurança
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$PROJECT_PATH

[Install]
WantedBy=multi-user.target
EOF

info "Recarregando systemd..."
systemctl daemon-reload

info "Habilitando serviço para iniciar no boot..."
systemctl enable $SERVICE_NAME

info "Iniciando serviço..."
systemctl start $SERVICE_NAME

sleep 2

if systemctl is-active --quiet $SERVICE_NAME; then
    info "✅ Serviço iniciado com sucesso!"
else
    error "Falha ao iniciar serviço. Verifique os logs com: journalctl -u $SERVICE_NAME"
fi

info "Comandos úteis:"
echo "  - Ver status: systemctl status $SERVICE_NAME"
echo "  - Ver logs: journalctl -u $SERVICE_NAME -f"
echo "  - Reiniciar: systemctl restart $SERVICE_NAME"
echo "  - Parar: systemctl stop $SERVICE_NAME"


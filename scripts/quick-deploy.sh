#!/bin/bash

# Deploy Rápido - WM3 Digital
# Execute este script no servidor após fazer git pull
# Uso: ./scripts/quick-deploy.sh

set -e

PROJECT_PATH=${PROJECT_PATH:-/var/www/wm3}

echo "🚀 Deploy Rápido - WM3 Digital"

cd $PROJECT_PATH

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script a partir do diretório do projeto"
    exit 1
fi

echo "📦 Instalando dependências..."
npm ci --production

echo "🔨 Construindo aplicação..."
npm run build

echo "🔄 Reiniciando aplicação..."

# Tentar PM2 primeiro
if command -v pm2 &> /dev/null && pm2 list | grep -q wm3-digital; then
    pm2 restart wm3-digital
    echo "✅ Aplicação reiniciada com PM2"
# Tentar systemd
elif systemctl is-active --quiet wm3-digital 2>/dev/null; then
    systemctl restart wm3-digital
    echo "✅ Aplicação reiniciada com systemd"
else
    echo "⚠️  Nenhum gerenciador encontrado. Execute manualmente: npm start"
fi

echo "✅ Deploy concluído!"
echo "🌐 Acesse: https://wm3digital.com.br"


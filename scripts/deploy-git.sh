#!/bin/bash

# Script de Deploy via Git
# Este script faz pull do repositório e atualiza a aplicação
# Uso: ./scripts/deploy-git.sh [branch]
# Exemplo: ./scripts/deploy-git.sh main

set -e

BRANCH=${1:-main}
PROJECT_PATH=${PROJECT_PATH:-/var/www/wm3}
REMOTE_REPO=${REMOTE_REPO:-origin}

echo "🚀 Deploy via Git - Branch: $BRANCH"

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

# Verificar se está no diretório do projeto
if [ ! -d ".git" ]; then
    error "Este script deve ser executado no diretório do repositório Git"
fi

info "1. Verificando status do Git..."
git fetch $REMOTE_REPO

# Verificar se há mudanças
if [ "$(git rev-parse HEAD)" = "$(git rev-parse $REMOTE_REPO/$BRANCH)" ]; then
    info "Já está na versão mais recente!"
    exit 0
fi

info "2. Fazendo backup do estado atual..."
BACKUP_BRANCH="backup-$(date +%Y%m%d-%H%M%S)"
git branch $BACKUP_BRANCH
info "Backup criado na branch: $BACKUP_BRANCH"

info "3. Atualizando código..."
git checkout $BRANCH
git pull $REMOTE_REPO $BRANCH

info "4. Instalando dependências..."
npm ci --production=false

info "5. Construindo aplicação..."
npm run build

info "6. Verificando build..."
if [ ! -d ".next" ]; then
    error "Build falhou! Diretório .next não encontrado."
fi

info "7. Reiniciando aplicação..."
# PM2
if command -v pm2 &> /dev/null && pm2 list | grep -q wm3-digital; then
    pm2 restart wm3-digital
    info "Aplicação reiniciada com PM2"
# Systemd
elif systemctl is-active --quiet wm3-digital; then
    systemctl restart wm3-digital
    info "Aplicação reiniciada com systemd"
else
    warn "Nenhum gerenciador de processo encontrado. Reinicie manualmente."
fi

info "✅ Deploy via Git concluído!"


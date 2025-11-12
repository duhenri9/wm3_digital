#!/bin/bash

# Script de Deploy para WM3 Digital
# Uso: ./scripts/deploy.sh [ambiente]
# Exemplo: ./scripts/deploy.sh production

set -e  # Parar em caso de erro

ENVIRONMENT=${1:-production}
PROJECT_PATH=${PROJECT_PATH:-/var/www/wm3}
REMOTE_HOST=${REMOTE_HOST:-wm3digital.com.br}
REMOTE_USER=${REMOTE_USER:-root}

echo "🚀 Iniciando deploy para $ENVIRONMENT..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens
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

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    error "Execute este script a partir da raiz do projeto"
fi

# Verificar se .env.local existe
if [ ! -f ".env.local" ]; then
    warn ".env.local não encontrado. Criando a partir de .env.example..."
    cp .env.example .env.local
    warn "Por favor, configure .env.local antes de continuar"
    exit 1
fi

info "1. Instalando dependências..."
npm ci --production=false

info "2. Executando lint..."
npm run lint || warn "Lint encontrou problemas, mas continuando..."

info "3. Construindo aplicação..."
npm run build

info "4. Preparando arquivos para deploy..."
# Criar diretório temporário
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Copiar arquivos necessários
mkdir -p $TEMP_DIR/wm3_digital
cp -r .next $TEMP_DIR/wm3_digital/
cp -r public $TEMP_DIR/wm3_digital/
cp -r src $TEMP_DIR/wm3_digital/
cp package.json $TEMP_DIR/wm3_digital/
cp package-lock.json $TEMP_DIR/wm3_digital/
cp next.config.ts $TEMP_DIR/wm3_digital/
cp tsconfig.json $TEMP_DIR/wm3_digital/
cp tailwind.config.js $TEMP_DIR/wm3_digital/
cp postcss.config.mjs $TEMP_DIR/wm3_digital/
cp .env.local $TEMP_DIR/wm3_digital/.env.local

info "5. Criando arquivo de deploy..."
cat > $TEMP_DIR/deploy.tar.gz <<EOF
# Arquivo criado pelo script de deploy
EOF

cd $TEMP_DIR
tar -czf deploy.tar.gz wm3_digital/

info "6. Deploy concluído! Arquivo criado em: $TEMP_DIR/deploy.tar.gz"
info "Próximos passos:"
echo "  - Envie o arquivo deploy.tar.gz para o servidor"
echo "  - Execute: ./scripts/deploy-remote.sh no servidor"
echo "  - Ou use: scp $TEMP_DIR/deploy.tar.gz $REMOTE_USER@$REMOTE_HOST:$PROJECT_PATH/"


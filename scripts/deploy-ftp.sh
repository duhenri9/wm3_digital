#!/bin/bash

# Script de Deploy via FTP
# Requer: lftp instalado (apt-get install lftp ou brew install lftp)
# Uso: ./scripts/deploy-ftp.sh

set -e

# Configurações FTP (configure no .env.local ou aqui)
FTP_HOST=${FTP_HOST:-ftp.wm3digital.com.br}
FTP_USER=${FTP_USER:-seu_usuario_ftp}
FTP_PASS=${FTP_PASS:-sua_senha_ftp}
FTP_PATH=${FTP_PATH:-/public_html}
PROJECT_PATH=${PROJECT_PATH:-/var/www/wm3}

echo "🚀 Deploy via FTP..."

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

# Verificar se lftp está instalado
if ! command -v lftp &> /dev/null; then
    error "lftp não está instalado. Instale com: apt-get install lftp ou brew install lftp"
fi

info "1. Construindo aplicação..."
npm run build

info "2. Preparando arquivos para upload..."
# Criar lista de arquivos para upload
cat > /tmp/ftp_upload_list.txt <<EOF
mirror -R --delete --verbose --exclude-glob=.git* --exclude-glob=node_modules --exclude-glob=.next/cache .next $FTP_PATH/.next
mirror -R --delete --verbose --exclude-glob=.git* public $FTP_PATH/public
put package.json $FTP_PATH/package.json
put package-lock.json $FTP_PATH/package-lock.json
put next.config.ts $FTP_PATH/next.config.ts
put tsconfig.json $FTP_PATH/tsconfig.json
put tailwind.config.js $FTP_PATH/tailwind.config.js
put postcss.config.mjs $FTP_PATH/postcss.config.mjs
EOF

info "3. Conectando e fazendo upload via FTP..."
lftp -c "
set ftp:ssl-allow no
set ftp:passive-mode yes
open -u $FTP_USER,$FTP_PASS $FTP_HOST
$(cat /tmp/ftp_upload_list.txt)
bye
"

info "4. Limpando arquivos temporários..."
rm /tmp/ftp_upload_list.txt

info "✅ Deploy via FTP concluído!"
warn "Nota: Você precisará executar 'npm install' e 'npm start' no servidor remoto"


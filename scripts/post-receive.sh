#!/bin/bash

# Git Hook - post-receive
# Coloque este arquivo em: /var/www/wm3.git/hooks/post-receive
# E configure: chmod +x /var/www/wm3.git/hooks/post-receive
# 
# No servidor, configure o repositório bare:
# git clone --bare seu-repositorio.git /var/www/wm3.git
# 
# No cliente, adicione remote:
# git remote add production usuario@wm3digital.com.br:/var/www/wm3.git

PROJECT_PATH=/var/www/wm3
GIT_DIR=/var/www/wm3.git

echo "🚀 Recebendo deploy via Git..."

# Checkout para diretório de trabalho
cd $PROJECT_PATH || exit
unset GIT_DIR
git --git-dir=$GIT_DIR --work-tree=$PROJECT_PATH checkout -f

# Executar deploy rápido
cd $PROJECT_PATH
chmod +x scripts/quick-deploy.sh
./scripts/quick-deploy.sh

echo "✅ Deploy via Git concluído!"


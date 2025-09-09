# 🚀 Guia de Setup - WM3 Digital Landing Page

Este guia irá te ajudar a configurar o projeto WM3 Digital Landing Page do zero em sua máquina local.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatórios
- **Node.js** (versão 18.17 ou superior)
- **npm** (vem com Node.js) ou **yarn**
- **Git** (para clonar o repositório)

### Recomendados
- **VS Code** (editor recomendado)
- **Terminal** (iTerm2 no macOS, Windows Terminal no Windows)

## 🔧 Verificação dos Pré-requisitos

Execute os comandos abaixo para verificar se tudo está instalado corretamente:

```bash
# Verificar versão do Node.js
node --version
# Deve retornar v18.17.0 ou superior

# Verificar versão do npm
npm --version
# Deve retornar 9.0.0 ou superior

# Verificar se o Git está instalado
git --version
# Deve retornar a versão do Git
```

## 📥 Clonagem do Repositório

```bash
# 1. Clonar o repositório
git clone https://github.com/duhenri9/wm3_digital.git

# 2. Navegar para o diretório do projeto
cd wm3_digital/wm3-landing

# 3. Verificar se está no diretório correto
pwd
# Deve mostrar: .../wm3_digital/wm3-landing
```

## 📦 Instalação das Dependências

```bash
# Instalar todas as dependências
npm install

# Aguardar a instalação (pode levar alguns minutos)
# Você verá uma mensagem similar a:
# "added XXX packages in XXs"
```

## 🏃‍♂️ Executando o Projeto

```bash
# Iniciar o servidor de desenvolvimento
npm run dev

# O servidor será iniciado em:
# http://localhost:3000
```

### ✅ Verificação

1. Abra seu navegador
2. Acesse `http://localhost:3000`
3. Você deve ver a landing page da WM3 Digital
4. Teste a navegação entre as páginas

## 🛠️ Configuração do VS Code (Recomendado)

### Extensões Essenciais

Instale as seguintes extensões no VS Code:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **TypeScript Importer**
4. **Auto Rename Tag**
5. **Prettier - Code formatter**
6. **ESLint**

### Configuração Automática

Se o projeto já possui `.vscode/extensions.json`, o VS Code irá sugerir automaticamente as extensões quando você abrir o projeto.

## 🔍 Verificação da Instalação

Execute os comandos abaixo para verificar se tudo está funcionando:

```bash
# Verificar se o TypeScript está funcionando
npx tsc --noEmit
# Não deve retornar erros

# Verificar linting
npm run lint
# Não deve retornar erros críticos

# Testar build de produção
npm run build
# Deve criar a pasta .next com sucesso
```

## 📁 Estrutura do Projeto

Após a instalação, sua estrutura deve ficar assim:

```
wm3-landing/
├── .next/                    # Build output (criado após npm run build)
├── node_modules/             # Dependências (criado após npm install)
├── public/                   # Arquivos estáticos
├── src/
│   ├── app/                 # Páginas (App Router)
│   ├── components/          # Componentes React
│   └── lib/                 # Utilitários
├── package.json             # Configurações e dependências
├── README.md                # Documentação principal
└── tsconfig.json            # Configuração TypeScript
```

## 🚨 Problemas Comuns

### Erro: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 is already in use"
```bash
# Matar processo na porta 3000
npx kill-port 3000

# Ou usar outra porta
npm run dev -- -p 3001
```

### Erro de TypeScript
```bash
# Verificar configuração do TypeScript
npx tsc --showConfig

# Reinstalar tipos
npm install --save-dev @types/node @types/react @types/react-dom
```

### Erro de ESLint
```bash
# Corrigir automaticamente problemas de linting
npm run lint -- --fix
```

## 🎯 Próximos Passos

Após configurar o projeto com sucesso:

1. 📖 Leia o [README.md](./README.md) para entender a estrutura
2. 📚 Consulte o [detalhamento.landingpage.md](./detalhamento.landingpage.md) para documentação técnica
3. 🔧 Leia o [CONTRIBUTING.md](./CONTRIBUTING.md) para padrões de desenvolvimento
4. 🚀 Comece a desenvolver!

## 📞 Suporte

Se encontrar problemas:

1. Verifique se seguiu todos os passos corretamente
2. Consulte a seção "Troubleshooting" no README.md
3. Verifique as issues no GitHub do projeto
4. Entre em contato com a equipe WM3 Digital

---

**Desenvolvido com ❤️ pela WM3 Digital**
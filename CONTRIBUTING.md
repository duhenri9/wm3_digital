# Guia de Contribuição - WM3 Digital

> Obrigado por considerar contribuir com o projeto WM3 Digital! Este guia irá ajudá-lo a entender como contribuir de forma efetiva.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 🤝 Código de Conduta

Este projeto segue um código de conduta para garantir um ambiente acolhedor e inclusivo para todos os contribuidores.

### Nossos Compromissos

- Usar linguagem acolhedora e inclusiva
- Respeitar diferentes pontos de vista e experiências
- Aceitar críticas construtivas com elegância
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

## 🚀 Como Contribuir

### Tipos de Contribuição

1. **🐛 Correção de Bugs** - Identifique e corrija problemas
2. **✨ Novas Funcionalidades** - Implemente recursos solicitados
3. **📚 Documentação** - Melhore ou adicione documentação
4. **🎨 Design/UX** - Aprimore a interface e experiência do usuário
5. **⚡ Performance** - Otimize velocidade e eficiência
6. **🧪 Testes** - Adicione ou melhore testes

### Antes de Começar

1. Verifique se já existe uma issue relacionada
2. Se não existir, crie uma issue descrevendo o problema/melhoria
3. Aguarde feedback da equipe antes de iniciar o desenvolvimento
4. Faça fork do repositório
5. Crie uma branch específica para sua contribuição

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- **Node.js 18.17+** (Recomendado: 20.x LTS)
- **npm 9+** ou **yarn 1.22+**
- **Git 2.30+**
- **VS Code** (editor recomendado)

### Setup Rápido

```bash
# 1. Fork e clone o repositório
git clone https://github.com/SEU_USERNAME/wm3_digital.git
cd wm3_digital/wm3-landing

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Abrir http://localhost:3000
```

### Extensões VS Code Recomendadas

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter
- ESLint
- GitLens

### Verificação da Instalação

```bash
# Verificar TypeScript
npx tsc --noEmit

# Verificar linting
npm run lint

# Testar build
npm run build
```

### Configuração Inicial

```bash
# 1. Fork o repositório no GitHub

# 2. Clone seu fork
git clone https://github.com/SEU_USERNAME/wm3_digital.git
cd wm3_digital/wm3-landing

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/duhenri9/wm3_digital.git

# 4. Instale as dependências
npm install

# 5. Inicie o servidor de desenvolvimento
npm run dev

# 6. Verificar se está funcionando
# Abra http://localhost:3000
```

## 📝 Padrões de Código

### Estrutura de Arquivos

```
src/
├── app/                 # App Router (Next.js 15)
│   ├── layout.tsx       # Layout raiz
│   ├── page.tsx         # Homepage
│   ├── globals.css      # Estilos globais
│   ├── servicos/        # Páginas de serviços
│   ├── sobre/           # Página sobre
│   └── suporte/         # Página de suporte
├── components/          # Componentes reutilizáveis
│   ├── layout/          # header.tsx
│   ├── navigation/      # main-nav.tsx
│   ├── sections/        # hero, about, features, cta
│   └── ui/              # navigation-menu, floating-elements
├── lib/                 # utils.ts
└── styles/              # Estilos adicionais (se necessário)
```

### Convenções de Nomenclatura

- **Arquivos**: `kebab-case.tsx` ou `camelCase.tsx`
- **Componentes**: `PascalCase`
- **Props/Interfaces**: `PascalCase` + `Props`
- **Variáveis/Funções**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **CSS Classes**: Tailwind CSS (kebab-case)

### Padrões TypeScript

```typescript
// ✅ Estrutura recomendada para componentes
import React from 'react';
import { cn } from '@/lib/utils';

// Interface para props
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

// Componente funcional
export const Component: React.FC<ComponentProps> = ({ 
  className,
  children,
  variant = 'primary',
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'base-classes',
        {
          'variant-primary': variant === 'primary',
          'variant-secondary': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Export default
export default Component;
```

### Padrões CSS/Tailwind

```tsx
// ✅ Use cn() para combinar classes condicionais
import { cn } from '@/lib/utils';

// ✅ Responsividade mobile-first
const ResponsiveComponent = () => (
  <div className="
    grid grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-3 
    gap-4 md:gap-6 lg:gap-8
    p-4 md:p-6 lg:p-8
  ">
    {/* Conteúdo */}
  </div>
);

// ✅ Classes condicionais
const ConditionalComponent = ({ isActive }: { isActive: boolean }) => (
  <div className={cn(
    'base-classes transition-colors',
    {
      'bg-blue-500 text-white': isActive,
      'bg-gray-100 text-gray-700': !isActive,
    }
  )}>
    {/* Conteúdo */}
  </div>
);
```

### Padrões de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para padronizar mensagens:

```bash
# Formato: tipo(escopo): descrição

# Tipos principais:
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação, espaços em branco
refactor: refatoração de código
test: adição ou correção de testes
chore: tarefas de manutenção

# Exemplos:
git commit -m "feat(header): adicionar menu mobile responsivo"
git commit -m "fix(navigation): corrigir link quebrado na página sobre"
git commit -m "docs(readme): atualizar instruções de instalação"
git commit -m "style(components): aplicar formatação prettier"
```

### Padrões de Branch

```bash
# Nomenclatura de branches:
feature/nome-da-funcionalidade
fix/nome-do-bug
docs/nome-da-documentacao
refactor/nome-da-refatoracao

# Exemplos:
feature/mobile-navigation
fix/broken-contact-form
docs/setup-guide
refactor/component-structure
  )}>
    Content
  </div>
);

// ✅ Organize classes por categoria
<div className="
  // Layout
  flex items-center justify-between
  // Spacing
  p-4 mx-auto
  // Appearance
  bg-white rounded-lg shadow-md
  // States
  hover:shadow-lg transition-shadow
">
```

### Padrões de Componentes

```tsx
// ✅ Estrutura padrão de componente
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  // outras props...
}

const Component: React.FC<ComponentProps> = ({ 
  className,
  ...props 
}) => {
  return (
    <motion.div
      className={cn('default-classes', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      {...props}
    >
      {/* conteúdo */}
    </motion.div>
  );
};

export default Component;
```

## 🔄 Processo de Pull Request

### 1. Preparação

```bash
# Atualize sua branch main
git checkout main
git pull upstream main

# Crie uma nova branch
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 2. Desenvolvimento

- Faça commits pequenos e frequentes
- Use mensagens de commit descritivas
- Teste suas alterações localmente
- Execute o linter antes de commitar

### 3. Convenção de Commits

```bash
# Formato: tipo(escopo): descrição

# Tipos:
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação, espaços em branco
refactor: refatoração de código
test: adição de testes
chore: tarefas de manutenção

# Exemplos:
git commit -m "feat(components): adicionar componente Button"
git commit -m "fix(navigation): corrigir menu mobile"
git commit -m "docs(readme): atualizar instruções de instalação"
```

### 4. Antes do Pull Request

```bash
# Execute os testes
npm run lint
npx tsc --noEmit

# Teste o build
npm run build

# Push da branch
git push origin feature/nome-da-feature
```

### 5. Criando o Pull Request

1. Acesse o GitHub e crie um Pull Request
2. Use o template fornecido
3. Descreva claramente as mudanças
4. Adicione screenshots se aplicável
5. Marque reviewers relevantes

### Template de Pull Request

```markdown
## 📝 Descrição

Descreva brevemente as mudanças implementadas.

## 🔗 Issue Relacionada

Fixes #(número da issue)

## 🧪 Como Testar

1. Passo 1
2. Passo 2
3. Passo 3

## 📷 Screenshots

<!-- Adicione screenshots se aplicável -->

## ✅ Checklist

- [ ] Código testado localmente
- [ ] Lint passou sem erros
- [ ] Build executado com sucesso
- [ ] Documentação atualizada (se necessário)
- [ ] Screenshots adicionados (se aplicável)
```

## 🐛 Reportando Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Teste na versão mais recente
3. Reproduza o bug consistentemente

### Template de Bug Report

```markdown
## 🐛 Descrição do Bug

Descrição clara e concisa do problema.

## 🔄 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado

O que deveria acontecer.

## 🖼️ Screenshots

Se aplicável, adicione screenshots.

## 🖥️ Ambiente

- OS: [ex: macOS 14.0]
- Browser: [ex: Chrome 120.0]
- Versão: [ex: v3.0.0]
```

## 💡 Sugerindo Melhorias

### Template de Feature Request

```markdown
## 🚀 Descrição da Funcionalidade

Descrição clara da funcionalidade desejada.

## 🎯 Problema que Resolve

Que problema esta funcionalidade resolveria?

## 💭 Solução Proposta

Descreva como você imagina que funcionaria.

## 🔄 Alternativas Consideradas

Outras soluções que você considerou.

## 📋 Contexto Adicional

Qualquer outra informação relevante.
```

## 🏷️ Labels e Milestones

### Labels Principais

- `bug` - Problemas que precisam ser corrigidos
- `enhancement` - Novas funcionalidades
- `documentation` - Melhorias na documentação
- `good first issue` - Bom para iniciantes
- `help wanted` - Ajuda externa bem-vinda
- `priority: high` - Alta prioridade
- `priority: low` - Baixa prioridade

## 📞 Suporte

Se você tiver dúvidas sobre como contribuir:

- **Email**: info@wm3digital.com.br
- **Telefone**: +55 (11) 9 5037-7457
- **Issues**: Para discussões técnicas
- **GitHub**: https://github.com/duhenri9/wm3_digital

## 🙏 Reconhecimento

Todos os contribuidores serão reconhecidos no arquivo CONTRIBUTORS.md e nos releases do projeto.

---

**Obrigado por contribuir com a WM3 Digital! 🚀**
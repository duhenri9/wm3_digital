# WM3 Digital - Landing Page

> Plataforma digital inovadora especializada em soluções SaaS, automação, marketing digital e desenvolvimento de websites e landing pages modernas.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-orange?style=flat-square)](https://turbo.build/pack)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)]()

## 🚀 Quick Start

```bash
# Clone o repositório
git clone https://github.com/duhenri9/wm3_digital.git
cd wm3_digital/wm3-landing

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 📋 Sobre o Projeto

A WM3 Digital é uma landing page moderna e responsiva desenvolvida em Next.js 15, focada em apresentar soluções digitais inovadoras para empresas que buscam transformação tecnológica. O projeto utiliza tecnologias de ponta para garantir performance, acessibilidade e uma experiência de usuário excepcional.

### 🎯 Principais Serviços
- **Design SaaS** - Soluções de design, desenvolvimento web, identidade visual, websites e landing pages (R$ 652,00)
- **SocialFlux** - Automação inteligente para redes sociais
- **SubHub** - Plataforma de gestão de assinaturas
- **HumanTic** - Soluções avançadas de IA e automação

## 🚀 Tecnologias Utilizadas

### Core Technologies
- **Next.js 15.5.2** - Framework React com App Router e Turbopack
- **React 19.1.0** - Biblioteca JavaScript para interfaces
- **TypeScript 5.x** - Tipagem estática para JavaScript
- **Tailwind CSS 3.4.0** - Framework CSS utilitário

### UI & Animations
- **Framer Motion 12.23.12** - Biblioteca de animações avançadas
- **Lucide React 0.542.0** - Ícones modernos e escaláveis
- **Radix UI** - Componentes acessíveis e customizáveis
  - Dialog 1.1.15
  - Navigation Menu 1.2.14
  - Slot 1.2.3

### Development Tools
- **ESLint 9.x** - Linting e qualidade de código
- **Autoprefixer 10.4.21** - Prefixos CSS automáticos
- **Class Variance Authority** - Gerenciamento de variantes CSS
- **clsx & tailwind-merge** - Utilitários para classes CSS

## 🎨 Design System

### Cores Principais
- **Primary**: Gradiente azul-roxo (#3B82F6 → #8B5CF6)
- **Secondary**: Tons complementares
- **Background**: Sistema de cores adaptável (light/dark)
- **Accent**: Cores de destaque para CTAs

### Tipografia
- **Font Family**: Sistema de fontes otimizado
- **Hierarquia**: H1-H6 com escalas responsivas
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

### Componentes
- **Cards**: Bordas arredondadas, sombras suaves
- **Buttons**: Estados hover, focus e active
- **Animations**: Transições suaves com Framer Motion
- **Icons**: Lucide React para consistência visual

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Estilos globais
│   ├── em-breve/          # Página "Em Breve"
│   ├── projetos/          # Portfólio de projetos
│   └── servicos/          # Páginas de serviços
│       ├── page.tsx       # Lista de serviços
│       ├── design-saas/   # Design SaaS
│       ├── humantic/      # HumanTic
│       ├── socialflux/    # SocialFlux
│       └── subhub/        # SubHub
├── components/            # Componentes reutilizáveis
│   ├── layout/           # Componentes de layout
│   ├── navigation/       # Navegação e menus
│   ├── sections/         # Seções da homepage
│   └── ui/              # Componentes de interface
├── lib/                  # Utilitários e configurações
└── styles/              # Estilos adicionais
```

## 🌐 Rotas e Páginas

### Páginas Principais
- **/** - Homepage com hero, serviços e CTAs
- **/servicos** - Visão geral dos serviços
- **/projetos** - Portfólio de projetos realizados
- **/em-breve** - Funcionalidades em desenvolvimento

### Serviços Específicos
- **/servicos/design-saas** - Página de diferenciais do Design SaaS
- **/servicos/socialflux** - Automação de redes sociais
- **/servicos/subhub** - Gestão de assinaturas
- **/servicos/humantic** - Soluções de IA e automação
- **/servicos/funil-que-vende** - Funil que Vende+

## 🎯 Funcionalidades Principais

### Homepage
- **Hero Section**: Apresentação principal com CTA
- **Serviços**: Grid responsivo com cards animados
- **Projetos**: Showcase de trabalhos realizados
- **Depoimentos**: Feedback de clientes
- **CTA Final**: Conversão para contato/vendas

### Design SaaS (Página de Diferenciais)
- **Hero**: Título principal e subtítulo persuasivo
- **Diferenciais**: 5 pontos únicos da WM3
- **Entregáveis**: 4 itens do que o cliente recebe
- **CTA**: Redirecionamento pós-pagamento Stripe
- **Footer**: Informações de contato e suporte

### Funil que Vende+ (Nova Página)
- **Hero**: Título principal com destaque "Como Funciona o Funil que Vende+"
- **Planos**: B2C Funil Express, B2B Funil Profissional, B2B Growth e B2B Scale
- **Benefícios**: Lista personalizada de recursos por plano
- **Formulário**: Captação de leads com análise do funil atual
- **CTA**: Botões de ação para cada plano

### Navegação
- **Header**: Logo, menu principal e mobile
- **Menu Serviços**: Dropdown com ícones modernos
- **Mobile**: Menu hambúrguer responsivo
- **Footer**: Links úteis e informações de contato

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos
- **Node.js 18+** (Recomendado: 20.x LTS)
- **npm**, **yarn**, **pnpm** ou **bun**
- **Git** para controle de versão
- **VS Code** (recomendado) com extensões:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter

### Instalação Completa
```bash
# 1. Clone o repositório
git clone https://github.com/duhenri9/wm3_digital.git

# 2. Entre no diretório do projeto
cd wm3_digital/wm3-landing

# 3. Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install

# 4. Verifique se tudo está funcionando
npm run dev
```

### Verificação da Instalação
```bash
# Verificar versões
node --version    # Deve ser 18+ 
npm --version     # Deve ser 8+
git --version     # Deve ser 2+

# Verificar dependências
npm list --depth=0

# Verificar tipos TypeScript
npx tsc --noEmit
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento com Turbopack
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev

# Acesse http://localhost:3000
```

> 🚀 **Turbopack**: O projeto utiliza Turbopack para builds mais rápidas em desenvolvimento

### Build e Deploy
```bash
# Build para produção (com Turbopack)
npm run build

# Inicie o servidor de produção
npm start

# Lint do código
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento com Turbopack
npm run build        # Build de produção com Turbopack
npm start            # Servidor de produção

# Qualidade de Código
npm run lint         # Verificação de código com ESLint
npx tsc --noEmit     # Verificação de tipos TypeScript

# Utilitários
npm list --depth=0   # Listar dependências instaladas
npm outdated         # Verificar dependências desatualizadas
npm audit            # Verificar vulnerabilidades de segurança
```

### Comandos de Desenvolvimento
```bash
# Limpar cache e reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Atualizar dependências (cuidado em produção)
npm update

# Verificar problemas de lint e corrigir automaticamente
npm run lint -- --fix
```

## 🎨 Customização

### Cores e Temas
As cores podem ser customizadas no arquivo `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Suas cores primárias
        },
        secondary: {
          // Suas cores secundárias
        }
      }
    }
  }
}
```

### Componentes
Todos os componentes estão em `src/components/` e podem ser facilmente customizados mantendo a consistência do design system.

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Características Responsivas
- Grid layouts adaptativos
- Tipografia escalável
- Navegação mobile otimizada
- Imagens responsivas
- Touch-friendly em dispositivos móveis

## ⚡ Performance

### Otimizações Implementadas
- **Next.js 14**: App Router para performance superior
- **Image Optimization**: Componente Image do Next.js
- **Code Splitting**: Carregamento sob demanda
- **CSS-in-JS**: Tailwind CSS para bundle otimizado
- **Lazy Loading**: Componentes carregados quando necessário

## 🔒 Segurança

- **HTTPS**: Sempre em produção
- **Headers de Segurança**: Configurados no Next.js
- **Sanitização**: Inputs tratados adequadamente
- **Dependencies**: Atualizações regulares de segurança

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# 1. Instale a CLI do Vercel
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy do projeto
vercel

# 4. Deploy de produção
vercel --prod
```

### Configuração de Ambiente
```bash
# Variáveis de ambiente necessárias (se aplicável)
NEXT_PUBLIC_SITE_URL=https://wm3digital.com
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Outras Plataformas
- **Netlify**: Suporte completo ao Next.js
- **AWS**: Amplify ou EC2
- **Digital Ocean**: App Platform
- **Railway**: Deploy simples com Git

## 🛠️ Troubleshooting

### Problemas Comuns

#### Erro de Hydration
```bash
# Se encontrar erros de hidratação:
# 1. Limpe o cache
rm -rf .next
npm run dev

# 2. Verifique componentes client-side
# Certifique-se de usar 'use client' quando necessário
```

#### Problemas com Turbopack
```bash
# Se o Turbopack não funcionar:
# Use o bundler padrão temporariamente
npm run dev -- --no-turbo
```

#### Erros de TypeScript
```bash
# Verificar e corrigir tipos
npx tsc --noEmit

# Reinstalar tipos se necessário
npm install -D @types/node @types/react @types/react-dom
```

#### Problemas de Dependências
```bash
# Limpar tudo e reinstalar
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Logs e Debug
```bash
# Executar com logs detalhados
DEBUG=* npm run dev

# Verificar build de produção localmente
npm run build
npm start
```

## 📊 Analytics e Monitoramento

- **Vercel Analytics**: Performance e Core Web Vitals
- **Google Analytics**: Comportamento do usuário
- **Error Tracking**: Monitoramento de erros

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Changelog

### v3.0.0 - 2025-01-XX (Atual)
- 🚀 **MAJOR**: Atualização para Next.js 15.5.2 com Turbopack
- ⚛️ **MAJOR**: Migração para React 19.1.0
- 💰 **FEATURE**: Atualização do preço Design SaaS para R$ 652,00
- 🌐 **FEATURE**: Expansão da comunicação incluindo websites e landing pages
- 📄 **FEATURE**: Páginas completas de suporte e documentação
- 🎨 **IMPROVEMENT**: Melhorias no design system e UX
- 🔧 **IMPROVEMENT**: Otimizações de performance com Turbopack
- 📱 **IMPROVEMENT**: Aprimoramentos na responsividade
- 🛠️ **TECH**: Atualização de todas as dependências

### v2.0.0 - 2024-12-XX
- ✨ Nova página de diferenciais do Design SaaS
- 🎨 Substituição de emojis por ícones Lucide React
- 📱 Melhorias na responsividade mobile
- ⚡ Otimizações de performance
- 🔧 Atualização para Next.js 14
- 🎯 Implementação de CTAs otimizados
- 🏗️ Reestruturação da arquitetura de componentes

### v1.0.0 - 2024-11-XX
- 🎉 Lançamento inicial da landing page
- 🏗️ Estrutura base com Next.js e Tailwind
- 🎨 Design system implementado
- 📱 Responsividade completa
- 🔗 Sistema de navegação e roteamento
- 🎭 Animações com Framer Motion

## 📞 Suporte

- **Email**: contato@wm3digital.com
- **Telefone**: +55 (11) 99999-9999
- **Website**: [wm3digital.com](https://wm3digital.com)

## 📄 Licença

© 2024 WM3 Digital. Todos os direitos reservados.

---

**Desenvolvido com ❤️ pela equipe WM3 Digital**

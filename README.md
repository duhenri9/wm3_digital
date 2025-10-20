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

Este é o projeto da landing page oficial da **WM3 Digital**, uma agência especializada em soluções digitais inovadoras. A landing page foi desenvolvida em Next.js 15 com foco em apresentar os serviços da agência para empresas que buscam transformação tecnológica. O projeto utiliza tecnologias de ponta para garantir performance, acessibilidade e uma experiência de usuário excepcional.

### 🎯 Principais Serviços
- **Funil que Vende+** – Automação completa de vendas com IA e jornadas omnichannel (a partir de R$ 1.500,00) — **Disponível**
- **SocialFlux∞** – Automação inteligente para redes sociais com orquestração via n8n — **Disponível**
- **SubHub** – Gestão de assinaturas e billing recorrente — **Early Adopters**
- **HumanTic** – Plataforma de agentes digitais, RPA e copilotos operacionais — **Early Adopters**
- **Metrify** – Monitoramento contínuo de métricas SaaS com alertas inteligentes — **Em Beta**
- **Eryon Core** – Atendimento omnichannel com roteamento inteligente e templates CX — **Early Adopters**
- **Aurion by Veridex** – Motor de verificação e compliance orientado a dados — **Em Beta**

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

### Identidade Visual WM3
- **Primary**: #0066FF (Azul principal da marca)
- **Secondary**: #00D1FF (Azul claro complementar)
- **Accent**: #FF3D00 (Laranja de destaque)
- **Background**: Sistema de cores adaptável (light/dark)
- **Gradientes**: Combinações harmoniosas das cores da marca

### Tipografia
- **Font Family**: Sistema de fontes otimizado
- **Hierarquia**: H1-H6 com escalas responsivas
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

### Componentes
- **Cards**: Bordas arredondadas, sombras suaves
- **Buttons**: Estados hover, focus e active
- **Animations**: Transições suaves com Framer Motion
- **Icons**: Lucide React para consistência visual
- **Footer**: Design moderno com identidade visual WM3
- **Gradientes**: Aplicação consistente das cores da marca

## 🎯 Melhorias Recentes

### Identidade Visual Implementada
- ✅ **Footer Moderno**: Novo componente com design profissional e informações atualizadas
- ✅ **Cores da Marca**: Aplicação consistente da identidade WM3 em todos os componentes
- ✅ **Gradientes Personalizados**: Uso das cores oficiais (#0066FF → #00D1FF)
- ✅ **Hover Effects**: Efeitos visuais com cores da marca
- ✅ **Status Badges**: Indicadores com cor accent (#FF3D00)
- ✅ **Informações de Contato**: Email atualizado para info@wm3digital.com.br
- ✅ **Telefone Atualizado**: Novo número +55 (11) 9 5037-7457

### Componentes Atualizados
- **Features Section**: Gradientes e cores alinhadas à marca
- **Footer Component**: Design moderno com animações e contatos atualizados
- **Button Components**: Hover effects com cores WM3
- **Social Icons**: Consistência visual mantida
- **CTA Section**: Textos otimizados e preços atualizados
- **Product Status**: Design SaaS alterado para Early Adopters

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Estilos globais
│   ├── api/               # Route handlers tipados
│   │   └── leads/
│   │       └── route.ts   # Gateway de leads com CORS restrito
│   ├── em-breve/          # Página "Em Breve"
│   ├── projetos/          # Portfólio de projetos
│   └── servicos/          # Páginas de serviços
│       ├── page.tsx       # Lista de serviços
│       ├── funil-que-vende/ # Funil que Vende+
│       ├── design-saas/   # Design SaaS
│       ├── socialflux/    # SocialFlux
│       ├── subhub/        # SubHub
│       └── humantic/      # HumanTic
├── components/            # Componentes reutilizáveis
│   ├── layout/           # Componentes de layout
│   ├── navigation/       # Navegação e menus
│   ├── sections/         # Seções da homepage (hero, about, features, benefits, CTA)
│   └── ui/              # Componentes de interface
├── data/                 # Conteúdo estruturado e tipagens
│   ├── benefits.ts       # Benefícios estratégicos (versao_bubble)
│   ├── index.ts          # Barrel de exports
│   └── services.ts       # Portfólio WM3 completo
├── lib/                  # Camada de integrações e utilitários
│   ├── cors.ts           # Helper para CORS seletivo
│   ├── leads.ts          # Tipagem e gateway de leads
│   ├── observability.ts  # Logs Supabase / n8n / console
│   └── utils.ts          # Helpers compartilhados
└── styles/              # Estilos adicionais
```

## 🌐 Rotas e Páginas

### Páginas Principais
- **/** - Homepage com hero, serviços e CTAs
- **/servicos** - Visão geral dos serviços
- **/projetos** - Portfólio de projetos realizados
- **/em-breve** - Funcionalidades em desenvolvimento

### Serviços Específicos
- **/servicos/funil-que-vende** - Funil que Vende+ (sistema completo de automação)
- **/servicos/design-saas** - Página de diferenciais do Design SaaS
- **/servicos/socialflux** - Automação de redes sociais
- **/servicos/subhub** - Gestão de assinaturas
- **/servicos/humantic** - Soluções de IA e automação

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

## 🧭 Checklist de Migração `versao_bubble`

| Status | Bloco do `versao_bubble` | Componente/Seção destino | Observações de implementação |
| :----: | ------------------------ | ------------------------- | ---------------------------- |
| ✅ | “Transformação Digital com Automação Inteligente...” + CTAs “Conheça HumanTic / Eryon” | `src/components/sections/hero.tsx` | Headline e sub-hero preferida aplicadas com layout minimalista, contraste AA e métricas-chave. |
| ✅ | “WM3 Digital: Duas Frentes, Uma Visão” + parágrafo | `src/components/sections/about.tsx` | Duas colunas enxutas destacando HumanTic e Eryon, cards minimalistas com âncoras e visão integrada. |
| ✅ | Cards “HumanTic”, “Eryon”, “Integração Perfeita” | `src/components/sections/features.tsx` | Portfólio reorganizado: destaque Funil que Vende+ + grid de serviços WM3, animações sutis e CTA por card. |
| ✅ | Lista “Por Que Escolher WM3 Digital?” (ROI, Expertise, Suporte, Escalabilidade, Integração Fácil, Analytics Avançado) | `src/components/sections/benefits.tsx` | Layout dark minimal com contraste AA, duas colunas apenas no desktop e métricas enxutas. |
| ✅ | CTA final “Pronto Para Transformar Sua Operação?” | `src/components/sections/cta.tsx` | Copy concisa e formulário de lead destacado; CTAs secundárias apontam para HumanTic/Eryon. |

**Conteúdos preservados da versão anterior**
- Sub-hero preferida: “Transforme seu negócio com soluções digitais inovadoras...”.
- Estrutura de animações Framer Motion já validada (fade/slide/pulse) a ser mantida ao reaproveitar componentes.

**Componentes com revisão de contraste/layout**
- ✅ Hero — fundo `#0B1220`, cards translúcidos e CTAs com sombra suave.
- ✅ About — cartões minimalistas com bordas claras e estatísticas em destaque.
- ✅ Features & Benefits — contraste AA garantido em cards neutros/escuros alternados.
- ✅ CTA — formulário claro com botões em destaque e layout de duas colunas minimalista.

## 🔌 Integrações Vercel ↔ VPS WM3

- **Gateway de Leads**: `POST /api/leads` valida payload, aplica CORS restrito (`https://wm3digital.com`, `https://app.wm3digital.com`, `NEXT_PUBLIC_SITE_URL`) e encaminha dados para o VPS Hostinger quando configurado.
- **Gateway de Leads**: `POST /api/leads` valida payload, aplica CORS restrito (`https://wm3digital.com`, `https://app.wm3digital.com`, `NEXT_PUBLIC_SITE_URL`) e encaminha dados para o VPS Hostinger quando configurado.
- **Gateway de Conteúdo**: `GET/POST /api/wm3/services` centraliza sincronização de serviços entre SaaS e landing. Webhooks autenticados atualizam o snapshot em memória e disparam `revalidatePath('/')` e `/servicos`.
- **Env vars necessárias**:
  - `VPS_GATEWAY_URL` – endpoint no VPS (MySQL/API) que receberá os leads.
  - `VPS_GATEWAY_KEY` – chave privada enviada no header `X-WM3-API-KEY`.
  - `SUPABASE_METRICS_WEBHOOK` – registro de eventos de observabilidade.
  - `N8N_WEBHOOK_URL` – automações de nurture / alertas.
  - `NEXT_PUBLIC_SITE_URL` – usada localmente para liberar origem nos testes.
  - `WM3_API_SECRET` – assinatura compartilhada para webhooks dos SaaS WM3 (`X-WM3-SIGNATURE`).
- **Observabilidade**: `recordLeadLifecycle` e `recordSyncEvent` enviam logs/telemetria para console, Supabase e n8n, mantendo histórico dos fluxos de leads e sincronizações SaaS.
- **CTA Form**: `CTASection` envia dados via `fetch` para `/api/leads`, exibindo retorno contextual (stored/pending) e mantendo feedback ao usuário.
- **Configuração**: copie `.env.example` para `.env.local` (e `.env.production`) e atualize cada variável antes de publicar na Vercel. Sem esses valores, o gateway de leads fica em modo `pending`.
- **CORS aplicado**:
  - `/api/leads` — origens `https://wm3digital.com`, `https://app.wm3digital.com`, `NEXT_PUBLIC_SITE_URL`; métodos `POST/OPTIONS`.
  - `/api/wm3/services` — origens `https://wm3digital.com`, `https://app.wm3digital.com`; métodos `POST/OPTIONS`; headers `Content-Type`, `X-WM3-SIGNATURE`, `X-WM3-API-KEY`.

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

# 4. Configure as variáveis de ambiente
cp .env.example .env.local
# edite cada valor antes de iniciar o projeto

# 5. Verifique se tudo está funcionando
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

### v3.1.0 - 2025-01-XX (Atual)
- 📧 **FEATURE**: Atualização do email de contato para info@wm3digital.com.br
- 📞 **FEATURE**: Novo telefone de contato +55 (11) 9 5037-7457
- 💰 **FEATURE**: Atualização do preço Early Adopters para R$ 2.652,00
- 🏷️ **FEATURE**: Design SaaS alterado para status Early Adopters
- 📝 **FEATURE**: Textos otimizados na seção CTA
- 🎨 **IMPROVEMENT**: Ajustes de fonte e espaçamento
- 📄 **IMPROVEMENT**: Documentação atualizada com todas as mudanças

### v3.0.0 - 2025-01-XX
- 🚀 **MAJOR**: Atualização para Next.js 15.5.2 com Turbopack
- ⚛️ **MAJOR**: Migração para React 19.1.0
- 💰 **FEATURE**: Atualização do preço Design SaaS para R$ 652,00
- 🌐 **FEATURE**: Expansão da comunicação incluindo websites e landing pages
- 📄 **FEATURE**: Páginas completas de suporte e documentação
- 🎨 **FEATURE**: Implementação da identidade visual WM3 (#0066FF, #00D1FF, #FF3D00)
- 🦶 **FEATURE**: Footer moderno com design profissional e animações
- 🎨 **IMPROVEMENT**: Melhorias no design system e UX
- 🔧 **IMPROVEMENT**: Otimizações de performance com Turbopack
- 📱 **IMPROVEMENT**: Aprimoramentos na responsividade
- 🌈 **IMPROVEMENT**: Gradientes personalizados com cores da marca
- ✨ **IMPROVEMENT**: Hover effects consistentes com identidade visual
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

- **Email**: info@wm3digital.com.br
- **Telefone**: +55 (11) 9 5037-7457
- **Website**: [wm3digital.com](https://wm3digital.com)

## 📄 Licença

© 2024 WM3 Digital. Todos os direitos reservados.

---

**Desenvolvido com ❤️ pela equipe WM3 Digital**
# WM3 Digital - Atualização Sat Sep 13 12:03:25 BST 2025

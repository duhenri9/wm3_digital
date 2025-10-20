# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não Lançado]

### Em Desenvolvimento
- Novas funcionalidades em planejamento
- Melhorias contínuas de performance
- Higienização de código: remoção de ativos legados não utilizados (fonts, estilos, configs duplicadas)
- Redesign minimalista da landing (Hero, About, Features, Benefits, CTA) com copy migrada do `versao_bubble` e contraste AA.
- Novo gateway `/api/wm3/services` com cache tipado, CORS seletivo e integração com observabilidade Supabase/n8n.
- Atualização do footer com novo logo (`brand/wm3-footer-logo.svg`) e portfólio WM3 completo.

## [3.1.0] - 2025-01-XX

### ✨ Adicionado
- **Contato**: Novo email info@wm3digital.com.br
- **Contato**: Novo telefone +55 (11) 9 5037-7457
- **Footer**: Informações de contato atualizadas no footer
- **Documentação**: Atualização completa de README.md e detalhamento.landingpage.md
- **Identidade Visual**: Implementação completa das cores da marca WM3 (#0066FF, #00D1FF, #FF3D00)
- **Footer**: Design moderno com animações e gradientes da marca

### 🔧 Alterado
- **Design SaaS**: Status alterado de "Em Desenvolvimento" para "Early Adopters"
- **Design SaaS**: Preço atualizado para R$ 2.652,00 (Early Adopters)
- **SocialFlux**: Descrição atualizada para "Solução para geração automática de anúncios e campanhas no Instagram e Redes Sociais com recursos de IA avançada"
- **SubHub**: Status alterado para "Early Adopters"
- **HumanTic**: Status alterado para "Early Adopters"
- **Funil que Vende+**: Status confirmado como "Disponível"
- **SocialFlux**: Status confirmado como "Disponível"
- **CTA Section**: Textos otimizados e preços atualizados
- **Features Section**: Status badges atualizados com novas informações
- **Documentação**: Informações de contato atualizadas em todos os arquivos

### 🐛 Corrigido
- **Footer**: Correção das informações de contato desatualizadas
- **Features**: Atualização dos status dos produtos
- **Documentação**: Sincronização de todas as informações entre arquivos

## [3.0.1] - 2025-01-15

### Adicionado
- Documentação completa do projeto
- Guia de contribuição (CONTRIBUTING.md)
- Este arquivo de changelog

## [3.0.0] - 2025-01-15

### 🚀 Mudanças Importantes (BREAKING CHANGES)

- **MAJOR**: Atualização para Next.js 15.5.2 com suporte completo ao Turbopack
- **MAJOR**: Migração para React 19.1.0 com novas funcionalidades
- **MAJOR**: Reestruturação completa do sistema de tipos TypeScript

### ✨ Adicionado

- **Design SaaS**: Atualização do preço para R$ 652,00 (anteriormente R$ 300,00)
- **Comunicação**: Expansão para incluir desenvolvimento de websites e landing pages
- **Páginas**: Sistema completo de suporte (/suporte)
- **Páginas**: Documentação técnica (/documentacao)
- **Páginas**: Página sobre a empresa (/sobre)
- **Performance**: Implementação do Turbopack para builds mais rápidas
- **UI**: Novos componentes com Radix UI (Dialog, Navigation Menu)
- **Animações**: Melhorias nas animações com Framer Motion 12.23.12
- **Ícones**: Atualização para Lucide React 0.542.0

### 🔧 Alterado

- **Dependencies**: Atualização de todas as dependências para versões mais recentes
- **Build System**: Migração completa para Turbopack
- **TypeScript**: Atualização para TypeScript 5.x
- **Tailwind CSS**: Atualização para versão 3.4.0
- **ESLint**: Migração para ESLint 9.x
- **Design System**: Refinamento das cores e tipografia
- **Responsividade**: Melhorias significativas na experiência mobile

### 🐛 Corrigido

- **Navigation**: Problemas de navegação em dispositivos móveis
- **Performance**: Otimizações de carregamento de imagens
- **Accessibility**: Melhorias na acessibilidade dos componentes
- **SEO**: Otimizações de meta tags e estrutura HTML
- **Build**: Correção de warnings durante o processo de build

### 🗑️ Removido

- **Legacy Code**: Remoção de código legado do Next.js 14
- **Unused Dependencies**: Limpeza de dependências não utilizadas
- **Deprecated APIs**: Remoção de APIs descontinuadas do React

## [2.0.0] - 2024-12-20

### ✨ Adicionado

- **Design SaaS**: Nova página de diferenciais (/servicos/design-saas)
- **Icons**: Substituição completa de emojis por ícones Lucide React
- **CTA**: Sistema de CTAs otimizados para conversão
- **Architecture**: Reestruturação da arquitetura de componentes
- **Performance**: Otimizações significativas de performance
- **Mobile**: Melhorias substanciais na responsividade mobile

### 🔧 Alterado

- **Next.js**: Atualização para Next.js 14
- **Design System**: Refinamento do sistema de design
- **Components**: Modularização melhorada dos componentes
- **Routing**: Otimização do sistema de roteamento

### 🐛 Corrigido

- **Mobile Navigation**: Problemas no menu mobile
- **Performance**: Gargalos de performance identificados
- **Cross-browser**: Compatibilidade entre navegadores

## [1.5.0] - 2024-11-30

### ✨ Adicionado

- **Services**: Páginas individuais para cada serviço
  - SocialFlux (/servicos/socialflux)
  - SubHub (/servicos/subhub)
  - HumanTic (/servicos/humantic)
- **Projects**: Página de portfólio (/projetos)
- **Navigation**: Sistema de navegação aprimorado
- **Animations**: Implementação de animações com Framer Motion

### 🔧 Alterado

- **UI/UX**: Melhorias na experiência do usuário
- **Content**: Atualização de conteúdos e textos
- **Performance**: Otimizações de carregamento

## [1.0.0] - 2024-11-15

### 🎉 Lançamento Inicial

- **Framework**: Implementação base com Next.js 14 e App Router
- **Styling**: Sistema de design com Tailwind CSS
- **TypeScript**: Configuração completa de tipagem
- **Components**: Biblioteca de componentes base
- **Responsive**: Design totalmente responsivo
- **Navigation**: Sistema de navegação e roteamento
- **Animations**: Animações básicas com Framer Motion
- **Performance**: Otimizações iniciais de performance
- **SEO**: Configuração básica de SEO
- **Accessibility**: Implementação de práticas de acessibilidade

### 📄 Páginas Iniciais

- **Homepage**: Página principal com hero, serviços e CTAs
- **Services**: Visão geral dos serviços oferecidos
- **Coming Soon**: Página para funcionalidades em desenvolvimento

### 🛠️ Configuração Técnica

- **Build System**: Configuração de build e deploy
- **Linting**: ESLint e Prettier configurados
- **Git**: Configuração de hooks e workflows
- **Dependencies**: Gerenciamento de dependências

---

## Tipos de Mudanças

- `✨ Adicionado` para novas funcionalidades
- `🔧 Alterado` para mudanças em funcionalidades existentes
- `🗑️ Descontinuado` para funcionalidades que serão removidas
- `🗑️ Removido` para funcionalidades removidas
- `🐛 Corrigido` para correções de bugs
- `🔒 Segurança` para vulnerabilidades corrigidas
- `🚀 Mudanças Importantes` para breaking changes

## Links de Comparação

- [Não Lançado]: https://github.com/duhenri9/wm3_digital/compare/v3.1.0...HEAD
- [3.1.0]: https://github.com/duhenri9/wm3_digital/compare/v3.0.0...v3.1.0
- [3.0.0]: https://github.com/duhenri9/wm3_digital/compare/v2.0.0...v3.0.0
- [2.0.0]: https://github.com/duhenri9/wm3_digital/compare/v1.5.0...v2.0.0
- [1.5.0]: https://github.com/duhenri9/wm3_digital/compare/v1.0.0...v1.5.0
- [1.0.0]: https://github.com/duhenri9/wm3_digital/releases/tag/v1.0.0

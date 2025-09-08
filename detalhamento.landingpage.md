# Documentação Técnica Detalhada - WM3 Digital Landing Page

> Guia completo para recriação do projeto WM3 Digital Landing Page do zero

## 📋 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
3. [Configuração Inicial](#configuração-inicial)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Configurações de Projeto](#configurações-de-projeto)
6. [Design System](#design-system)
7. [Componentes Base](#componentes-base)
8. [Páginas e Roteamento](#páginas-e-roteamento)
9. [Funcionalidades Específicas](#funcionalidades-específicas)
10. [Deploy e Produção](#deploy-e-produção)
11. [Troubleshooting](#troubleshooting)

---

## 1. Visão Geral do Projeto

### 1.1 Descrição
A WM3 Digital Landing Page é uma aplicação web moderna desenvolvida para apresentar os serviços da empresa de forma profissional e converter visitantes em clientes. O projeto foca em:

- **Performance**: Carregamento rápido e otimizado
- **Responsividade**: Funciona perfeitamente em todos os dispositivos
- **Conversão**: CTAs estratégicos e jornada do usuário otimizada
- **SEO**: Otimizado para motores de busca
- **Acessibilidade**: Seguindo padrões WCAG
- **Funil de Vendas**: Integração com Funil que Vende+

### 1.2 Objetivos de Negócio
- Apresentar os 5 serviços principais da WM3 Digital
- Converter visitantes em leads qualificados
- Estabelecer autoridade no mercado digital
- Facilitar o contato e vendas
- Otimizar funis de venda

### 1.3 Público-Alvo
- Empresários que buscam transformação digital
- Gestores de marketing
- Startups e PMEs
- Profissionais de tecnologia

---

## 2. Arquitetura e Tecnologias

### 2.1 Stack Tecnológico

```json
{
  "frontend": {
    "framework": "Next.js 15.5.2",
    "runtime": "React 19.1.0",
    "language": "TypeScript 5.x",
    "styling": "Tailwind CSS 3.4.0",
    "animations": "Framer Motion 12.23.12",
    "icons": "Lucide React 0.542.0",
    "components": "Radix UI"
  },
  "development": {
    "bundler": "Turbopack",
    "linting": "ESLint 9.x",
    "formatting": "Prettier",
    "package_manager": "npm/yarn/pnpm/bun"
  },
  "deployment": {
    "platform": "Vercel",
    "domain": "wm3digital.com",
    "ssl": "Automático"
  }
}
```

### 2.2 Arquitetura de Componentes

```
App Router (Next.js 15)
├── Layout Principal
├── Páginas (app/)
├── Componentes Reutilizáveis
├── Hooks Customizados
├── Utilitários
└── Estilos Globais
```

### 2.3 Padrões de Design
- **Atomic Design**: Componentes organizados hierarquicamente
- **Mobile First**: Design responsivo começando pelo mobile
- **Progressive Enhancement**: Funcionalidades básicas primeiro
- **Component Composition**: Componentes compostos e reutilizáveis

---

## 3. Configuração Inicial

### 3.1 Pré-requisitos

```bash
# Versões mínimas necessárias
node --version  # v18.0.0 ou superior (recomendado: v20.x LTS)
npm --version   # v8.0.0 ou superior
git --version   # v2.0.0 ou superior
```

### 3.2 Criação do Projeto

```bash
# 1. Criar projeto Next.js
npx create-next-app@latest wm3-landing --typescript --tailwind --eslint --app --src-dir

# 2. Entrar no diretório
cd wm3-landing

# 3. Instalar dependências específicas
npm install framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-navigation-menu @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# 4. Instalar dependências de desenvolvimento
npm install -D @types/node @types/react @types/react-dom autoprefixer
```

### 3.3 Configuração de Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 4. Estrutura de Pastas

### 4.1 Estrutura Completa

```
wm3-landing/
├── .next/                    # Build output (auto-gerado)
├── .vscode/                  # Configurações VS Code
│   ├── extensions.json       # Extensões recomendadas
│   └── settings.json         # Configurações do projeto
├── public/                   # Arquivos estáticos
│   ├── Ativo 1.svg          # Logo WM3 (variação 1)
│   ├── Ativo 2.svg          # Logo WM3 (variação 2)
│   ├── Ativo 3.svg          # Logo WM3 (variação 3)
│   ├── Ativo 4.svg          # Logo WM3 (variação 4)
│   ├── Ativo 5.svg          # Logo WM3 (variação 5)
│   ├── Ativo 6.svg          # Logo WM3 (variação 6)
│   ├── ICONE_BRANCO.png     # Ícone branco
│   ├── LOGO_COMPLETA_BRANCA.png # Logo completa branca
│   ├── wm3-icon.png         # Favicon
│   └── wm3-logo.png         # Logo principal
├── src/
│   ├── app/                 # App Router (Next.js 15)
│   │   ├── layout.tsx       # Layout raiz
│   │   ├── page.tsx         # Homepage
│   │   ├── globals.css      # Estilos globais
│   │   ├── em-breve/        # Página "Em Breve"
│   │   │   └── page.tsx
│   │   ├── projetos/        # Página de Projetos
│   │   │   └── page.tsx
│   │   ├── servicos/        # Páginas de Serviços
│   │   │   ├── page.tsx     # Lista de serviços
│   │   │   ├── design-saas/ # Design SaaS
│   │   │   │   └── page.tsx
│   │   │   ├── socialflux/  # SocialFlux
│   │   │   │   └── page.tsx
│   │   │   ├── subhub/      # SubHub
│   │   │   │   └── page.tsx
│   │   │   └── humantic/    # HumanTic
│   │   │       └── page.tsx
│   │   ├── sobre/           # Página Sobre
│   │   │   └── page.tsx
│   │   ├── suporte/         # Página de Suporte
│   │   │   └── page.tsx
│   │   └── documentacao/    # Página de Documentação
│   │       └── page.tsx
│   ├── components/          # Componentes reutilizáveis
│   │   ├── layout/          # Componentes de layout
│   │   │   ├── header.tsx   # Cabeçalho
│   │   │   └── footer.tsx   # Rodapé
│   │   ├── navigation/      # Componentes de navegação
│   │   │   ├── navbar.tsx   # Barra de navegação
│   │   │   └── mobile-menu.tsx # Menu mobile
│   │   ├── sections/        # Seções da homepage
│   │   │   ├── hero.tsx     # Seção hero
│   │   │   ├── services.tsx # Seção de serviços
│   │   │   ├── projects.tsx # Seção de projetos
│   │   │   ├── testimonials.tsx # Depoimentos
│   │   │   └── cta.tsx      # Call-to-action
│   │   └── ui/              # Componentes base
│   │       ├── button.tsx   # Botão
│   │       ├── card.tsx     # Card
│   │       └── dialog.tsx   # Modal
│   ├── lib/                 # Utilitários
│   │   └── utils.ts         # Funções utilitárias
│   └── styles/              # Estilos adicionais
├── .gitignore               # Arquivos ignorados pelo Git
├── CHANGELOG.md             # Histórico de mudanças
├── CONTRIBUTING.md          # Guia de contribuição
├── LICENSE                  # Licença do projeto
├── README.md                # Documentação principal
├── detalhamento.landingpage.md # Esta documentação
├── eslint.config.mjs        # Configuração ESLint
├── next.config.js           # Configuração Next.js
├── package.json             # Dependências e scripts
├── postcss.config.js        # Configuração PostCSS
├── tailwind.config.js       # Configuração Tailwind
└── tsconfig.json            # Configuração TypeScript
```

### 4.2 Convenções de Nomenclatura

- **Arquivos**: `kebab-case.tsx` (ex: `mobile-menu.tsx`)
- **Componentes**: `PascalCase` (ex: `MobileMenu`)
- **Variáveis**: `camelCase` (ex: `isMenuOpen`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `API_BASE_URL`)
- **CSS Classes**: `kebab-case` (ex: `bg-blue-500`)

---

## 5. Configurações de Projeto

### 5.1 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
```

### 5.2 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### 5.3 tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5.4 eslint.config.mjs

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

---

## 6. Design System

### 6.1 Paleta de Cores

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 6.2 Tipografia

```css
/* Hierarquia de títulos */
.h1 {
  @apply text-4xl font-bold tracking-tight lg:text-5xl;
}

.h2 {
  @apply text-3xl font-semibold tracking-tight lg:text-4xl;
}

.h3 {
  @apply text-2xl font-semibold tracking-tight lg:text-3xl;
}

.h4 {
  @apply text-xl font-semibold tracking-tight lg:text-2xl;
}

/* Texto corpo */
.body-large {
  @apply text-lg leading-7;
}

.body {
  @apply text-base leading-6;
}

.body-small {
  @apply text-sm leading-5;
}

/* Texto utilitário */
.caption {
  @apply text-xs leading-4 text-muted-foreground;
}
```

### 6.3 Componentes Base

#### 6.3.1 Button Component

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

#### 6.3.2 Utils Library

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
```

---

## 7. Componentes Base

### 7.1 Layout Principal

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WM3 Digital - Soluções SaaS e Automação",
    template: "%s | WM3 Digital"
  },
  description: "Plataforma digital inovadora especializada em soluções SaaS, automação, marketing digital e desenvolvimento de websites e landing pages modernas.",
  keywords: ["SaaS", "automação", "marketing digital", "websites", "landing pages", "WM3 Digital"],
  authors: [{ name: "WM3 Digital" }],
  creator: "WM3 Digital",
  publisher: "WM3 Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://wm3digital.com",
    siteName: "WM3 Digital",
    title: "WM3 Digital - Soluções SaaS e Automação",
    description: "Transforme seu negócio com nossas soluções digitais inovadoras.",
    images: [
      {
        url: "/wm3-logo.png",
        width: 1200,
        height: 630,
        alt: "WM3 Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WM3 Digital - Soluções SaaS e Automação",
    description: "Transforme seu negócio com nossas soluções digitais inovadoras.",
    images: ["/wm3-logo.png"],
  },
  icons: {
    icon: "/wm3-icon.png",
    shortcut: "/wm3-icon.png",
    apple: "/wm3-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-background font-sans antialiased">
          {children}
        </div>
      </body>
    </html>
  );
}
```

### 7.2 Header Component

```typescript
// src/components/layout/header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    {
      name: "Design SaaS",
      href: "/servicos/design-saas",
      description: "Soluções de design e desenvolvimento web",
      price: "R$ 652,00"
    },
    {
      name: "SocialFlux",
      href: "/servicos/socialflux",
      description: "Automação inteligente para redes sociais"
    },
    {
      name: "SubHub",
      href: "/servicos/subhub",
      description: "Plataforma de gestão de assinaturas"
    },
    {
      name: "HumanTic",
      href: "/servicos/humantic",
      description: "Soluções avançadas de IA e automação"
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/wm3-logo.png"
            alt="WM3 Digital"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Início
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              <span>Serviços</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-md border bg-popover p-4 shadow-md"
                >
                  <div className="grid gap-3">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium leading-none">
                            {service.name}
                          </div>
                          {service.price && (
                            <div className="text-xs text-muted-foreground">
                              {service.price}
                            </div>
                          )}
                        </div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          {service.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/projetos"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Projetos
          </Link>
          
          <Link
            href="/sobre"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Sobre
          </Link>
          
          <Link
            href="/suporte"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Suporte
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container py-4 space-y-4">
              <Link
                href="/"
                className="block text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Serviços
                </div>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block pl-4 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              
              <Link
                href="/projetos"
                className="block text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projetos
              </Link>
              
              <Link
                href="/sobre"
                className="block text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              
              <Link
                href="/suporte"
                className="block text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Suporte
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
```

---

## 8. Páginas e Roteamento

### 8.1 Homepage

```typescript
// src/app/page.tsx
import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import ProjectsSection from "@/components/sections/projects";
import TestimonialsSection from "@/components/sections/testimonials";
import CTASection from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
```

### 8.2 Hero Section

```typescript
// src/components/sections/hero.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const texts = [
    "IA & Automação",
    "Design SaaS",
    "Marketing Digital",
    "Websites Modernos"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[40rem] w-[40rem] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            Transformação Digital Inovadora
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Soluções em{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {texts[currentText]}
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Transformamos ideias em soluções digitais que impulsionam seu negócio.
            Design SaaS, automação inteligente, websites modernos e landing pages que convertem.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg" className="group">
              <Link href="/servicos">
                Nossos Serviços
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/projetos">
                Ver Projetos
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/20"
            style={
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }
            }
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
```

---

## 9. Funcionalidades Específicas

### 9.1 Serviços da WM3 Digital

#### Design SaaS (R$ 652,00)
- **Descrição**: Soluções completas de design, desenvolvimento web, identidade visual, websites e landing pages
- **Diferenciais**: 5 pontos únicos da WM3
- **Entregáveis**: 4 itens principais
- **CTA**: Link para pagamento Stripe

#### SocialFlux
- **Descrição**: Automação inteligente para redes sociais
- **Funcionalidades**: Agendamento, análise, engajamento automático

#### SubHub
- **Descrição**: Plataforma de gestão de assinaturas
- **Funcionalidades**: Billing, analytics, customer management

#### HumanTic
- **Descrição**: Soluções avançadas de IA e automação
- **Funcionalidades**: Chatbots, processamento de linguagem natural

### 9.2 Estrutura de Dados dos Serviços

```typescript
// src/lib/services.ts
export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  features: string[];
  benefits: string[];
  cta: {
    text: string;
    href: string;
    external?: boolean;
  };
  icon: string;
  color: string;
}

export const services: Service[] = [
  {
    id: "design-saas",
    name: "Design SaaS",
    description: "Soluções completas de design, desenvolvimento web, identidade visual, websites e landing pages modernas que convertem visitantes em clientes.",
    price: "R$ 652,00",
    features: [
      "Design de interfaces modernas",
      "Desenvolvimento web responsivo",
      "Identidade visual completa",
      "Landing pages otimizadas",
      "Websites institucionais"
    ],
    benefits: [
      "Aumento de 300% na conversão",
      "Design profissional e moderno",
      "Responsivo para todos dispositivos",
      "SEO otimizado",
      "Suporte técnico incluído"
    ],
    cta: {
      text: "Contratar Agora",
      href: "https://buy.stripe.com/design-saas",
      external: true
    },
    icon: "Palette",
    color: "from-blue-500 to-purple-600"
  },
  // ... outros serviços
];
```

### 9.3 Animações com Framer Motion

```typescript
// src/lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};
```

---

## 10. Deploy e Produção

### 10.1 Preparação para Deploy

```bash
# 1. Verificar build local
npm run build
npm start

# 2. Verificar tipos TypeScript
npm run type-check

# 3. Executar linting
npm run lint

# 4. Testar em diferentes dispositivos
# Usar DevTools para simular mobile/tablet
```

### 10.2 Deploy na Vercel

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login na Vercel
vercel login

# 3. Deploy
vercel

# 4. Deploy para produção
vercel --prod
```

### 10.3 Configurações de Produção

```javascript
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### 10.4 Variáveis de Ambiente

```bash
# .env.local (desenvolvimento)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# .env.production (produção)
NEXT_PUBLIC_SITE_URL=https://wm3digital.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

---

## 11. Troubleshooting

### 11.1 Problemas Comuns

#### Build Errors
```bash
# Limpar cache e reinstalar
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### TypeScript Errors
```bash
# Verificar tipos
npx tsc --noEmit

# Regenerar tipos do Next.js
rm -rf .next
npm run dev
```

#### Tailwind não funcionando
```bash
# Verificar configuração
npx tailwindcss -i ./src/app/globals.css -o ./dist/output.css --watch
```

### 11.2 Performance Issues

#### Otimização de Imagens
```typescript
// Usar Next.js Image component
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // Para imagens above-the-fold
  placeholder="blur" // Para melhor UX
/>
```

#### Code Splitting
```typescript
// Lazy loading de componentes
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false // Se não precisar de SSR
});
```

### 11.3 Debugging

```typescript
// Debug de animações Framer Motion
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  onAnimationComplete={() => console.log("Animation completed")}
>
  Content
</motion.div>
```

---

## 📞 Suporte Técnico

Para dúvidas sobre esta documentação ou problemas técnicos:

- **Email**: dev@wm3digital.com
- **Documentação**: /documentacao
- **Suporte**: /suporte
- **GitHub**: https://github.com/wm3digital/wm3-landing

---

**© 2025 WM3 Digital - Documentação Técnica Completa**

*Esta documentação foi criada para garantir que qualquer desenvolvedor possa recriar e manter o projeto WM3 Digital Landing Page seguindo as melhores práticas de desenvolvimento web moderno.*
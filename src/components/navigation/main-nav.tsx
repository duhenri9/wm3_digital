'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { aiServices, formatPriceBRL } from '@/data/ai-services';

interface MainNavProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export function MainNav({ mobile = false, onItemClick }: MainNavProps = {}) {
  const pathname = usePathname();
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const primaryLinks = [
    { title: 'Portfólio', href: '/portfolio', description: 'Soluções WM3 em produção' },
    { title: 'Documentação', href: '/documentacao#apis', description: 'Preview, APIs e integrações' },
    { title: 'Sobre', href: '/sobre', description: 'Cultura e forma de trabalhar' },
    { title: 'Suporte', href: '/suporte', description: 'Atendimento e help desk' },
    { title: 'SEO Blog', href: '/em-breve', description: 'Blog com conteúdo orientado a conversão' },
    { title: 'DevYear Recap', href: '/projetos#dev-year-recap', description: 'Lançamento 05-06 Dez' },
  ];

  const featuredProjects = [
    {
      id: 'design-saas-pro',
      name: 'Design SaaS Pro',
      description: 'Base SaaS em produção para customizar e lançar rápido.',
      href: 'https://designsaaspro.vercel.app',
      status: 'Fase Final',
      external: true,
    },
    {
      id: 'metricaas',
      name: 'Metricaas.ai',
      description: 'Métricas SaaS com visão de investidor.',
      href: 'https://metricaas.ai',
      status: 'Fase Final',
      external: true,
    },
    {
      id: 'vett-report',
      name: 'Vett Report',
      description: 'Relatórios inteligentes de análise de dados.',
      href: '/projetos#vett-report',
      status: 'Beta Teste',
    },
    {
      id: 'dev-year-recap',
      name: 'DevYear Recap',
      description: 'Retrospectiva anual do seu código (launch 05-06 Dez).',
      href: '/projetos#dev-year-recap',
      status: 'Lançamento',
    },
  ];
  const projectLinks = featuredProjects;

  const statusTone = (status: string) => {
    const map: Record<string, string> = {
      'Ativo': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Em desenvolvimento': 'bg-slate-900 text-white border-slate-800',
      'Beta Teste': 'bg-sky-100 text-sky-800 border-sky-200',
      'Early Adopters': 'bg-amber-100 text-amber-800 border-amber-200',
      'Fase Final': 'bg-primary/15 text-primary border-primary/30',
      'Lançamento': 'bg-secondary/20 text-secondary border-secondary/50',
    };

    return map[status] ?? 'bg-border text-foreground border-border';
  };

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-2 py-2">
        <Link
          href="/"
          onClick={onItemClick}
          className={cn(
            'block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:scale-95',
            pathname === '/' && 'bg-accent text-accent-foreground'
          )}
        >
          Home
        </Link>

        <Link
          href="/projetos#dev-year-recap"
          onClick={onItemClick}
          className="flex items-center justify-between rounded-lg border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary transition-all duration-200 hover:bg-secondary/20 active:scale-95"
        >
          <span>DevYear Recap • Lançamento</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-slate-900">
            05-06 Dez
          </span>
        </Link>

        <div className="rounded-xl border border-border/60 bg-muted/40">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-t-xl px-4 py-3 text-left text-base font-semibold transition-all duration-200 hover:bg-accent/10"
            onClick={() => setOpenSection(openSection === 'solutions' ? null : 'solutions')}
            aria-expanded={openSection === 'solutions'}
          >
            <span>Ferramentas com preview</span>
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                openSection === 'solutions' && 'rotate-90 text-primary'
              )}
            />
          </button>
          {openSection === 'solutions' && (
            <div className="border-t border-border/60">
              {aiServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/servicos#${service.id}`}
                  onClick={onItemClick}
                  className="flex items-start justify-between gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-accent/10 active:scale-[0.99]"
                >
                  <div>
                    <p className="font-semibold text-foreground">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.shortDescription}</p>
                  </div>
                  <span className="mt-1 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    Preview
                  </span>
                </Link>
              ))}
              <Link
                href="/servicos"
                onClick={onItemClick}
                className="block px-4 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/80"
              >
                Ver visão geral de serviços
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border/60 bg-muted/40">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-t-xl px-4 py-3 text-left text-base font-semibold transition-all duration-200 hover:bg-accent/10"
            onClick={() => setOpenSection(openSection === 'projects' ? null : 'projects')}
            aria-expanded={openSection === 'projects'}
          >
            <span>Projetos WM3 em destaque</span>
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                openSection === 'projects' && 'rotate-90 text-primary'
              )}
            />
          </button>
          {openSection === 'projects' && (
            <div className="border-t border-border/60">
              <div className="px-4 py-3 border-b border-border/60 bg-primary/5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                      Lançamento 05-06 Dez
                    </p>
                    <p className="text-sm font-semibold text-foreground">DevYear Recap</p>
                    <p className="text-xs text-slate-700">
                      Retrospectiva anual do seu código com destaque de lançamento.
                    </p>
                  </div>
                  <Link
                    href="/projetos#dev-year-recap"
                    onClick={onItemClick}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm"
                  >
                    Ver lançamento
                  </Link>
                </div>
              </div>
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={project.href}
                  onClick={onItemClick}
                  className="flex items-start justify-between gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-accent/10 active:scale-[0.99]"
                >
                  <div>
                    <p className="font-semibold text-foreground">{project.name}</p>
                    <p className="text-xs text-slate-700">{project.description}</p>
                  </div>
                  <span
                    className={cn(
                      'mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      statusTone(project.status)
                    )}
                    style={{ minWidth: 82 }}
                  >
                    {project.status}
                  </span>
                </Link>
              ))}
              <Link
                href="/projetos"
                onClick={onItemClick}
                className="block px-4 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/80"
              >
                Ver todos os projetos
              </Link>
            </div>
          )}
        </div>

        {primaryLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              'block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 active:scale-95',
              item.title === 'DevYear Recap'
                ? 'border border-secondary/50 bg-secondary/10 text-secondary hover:bg-secondary/20'
                : 'hover:bg-accent hover:text-accent-foreground',
              pathname.startsWith(item.href) && 'bg-accent text-accent-foreground'
            )}
          >
            <span className="flex items-center gap-2">
              {item.title}
              {item.title === 'DevYear Recap' && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-slate-900">
                  Lançamento
                </span>
              )}
            </span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={cn(
                'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                pathname === '/' && 'bg-accent text-accent-foreground'
              )}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-semibold">Soluções</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-4 p-4 md:w-[520px] lg:w-[760px] lg:grid-cols-[0.75fr,1.25fr]">
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-900 shadow-inner">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Ferramentas AI-First
                </p>
                <p className="mt-2 font-semibold leading-tight text-slate-900">
                  Preview rápido e APIs prontas para integrar.
                </p>
                <p className="mt-2 text-xs text-slate-700">
                  Escolha uma solução, veja o preview e contrate em minutos.
                </p>
                <Link
                  href="/servicos"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Ver visão geral
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {aiServices.map((service) => (
                  <NavigationMenuLink asChild key={service.id}>
                    <Link
                      href={`/servicos#${service.id}`}
                      className="group flex h-full flex-col justify-between rounded-xl border border-border/70 bg-background px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                          Ver Preview
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs text-slate-700">
                        {service.shortDescription}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-primary">
                        {formatPriceBRL(service.priceBRL)}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-semibold">Projetos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-4 p-4 md:w-[520px] lg:w-[760px] lg:grid-cols-[0.75fr,1.25fr]">
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-900 shadow-inner">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Projetos WM3
                </p>
                <p className="mt-2 font-semibold leading-tight text-slate-900">
                  Projetos em produção que mostram nossa entrega.
                </p>
                <p className="mt-2 text-xs text-slate-700">
                  Explore cada case, veja status e vá direto para o detalhamento.
                </p>
                <Link
                  href="/projetos"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Ver todos
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="group h-full rounded-xl border border-secondary/30 bg-secondary/5 px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-md sm:col-span-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
                        Lançamento 05-06 Dez
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">DevYear Recap</p>
                      <p className="mt-1 text-xs text-slate-700">
                        Retrospectiva anual do seu código para fechar 2025 com insights acionáveis.
                      </p>
                    </div>
                    <Link
                      href="/projetos#dev-year-recap"
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      Ver lançamento
                    </Link>
                  </div>
                  <div
                    className={cn(
                      'mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      statusTone('Lançamento')
                    )}
                  >
                    Lançamento
                  </div>
                </div>
                {projectLinks.map((project) => (
                  <NavigationMenuLink asChild key={project.id}>
                    <Link
                      href={project.href}
                      className="group flex h-full flex-col justify-between rounded-xl border border-border/70 bg-background px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900">{project.name}</p>
                        <span
                          className={cn(
                            'inline-flex items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                            statusTone(project.status)
                          )}
                          style={{ minWidth: 82 }}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs text-slate-700">
                        {project.headline}
                      </p>
                      {project.price && (
                        <p className="mt-3 text-sm font-semibold text-primary">{project.price}</p>
                      )}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {primaryLinks.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
              className={cn(
                'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                item.title === 'DevYear Recap'
                    ? 'border border-secondary/40 bg-secondary/10 text-foreground hover:border-secondary/60 focus:bg-secondary/20'
                    : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  pathname.startsWith(item.href) && 'bg-accent text-accent-foreground'
                )}
              >
                <span className="flex items-center gap-2">
                  {item.title}
                  {item.title === 'DevYear Recap' && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-slate-900">
                      Lançamento
                    </span>
                  )}
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

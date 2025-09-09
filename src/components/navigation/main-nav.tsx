'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rocket, BarChart3, Bot, Palette, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const items = [
  {
    title: 'Serviços',
    href: '/servicos',
    description: 'Conheça nossas soluções digitais',
    items: [
      {
        title: 'Funil que Vende+',
        href: '/servicos/funil-que-vende',
        description: 'Sistema completo de automação de vendas com IA',
        icon: Sparkles,
        status: 'A partir de R$ 1.500',
        highlight: true
      },
      {
        title: 'Design SaaS',
        href: '/servicos/design-saas',
        description: 'Soluções de Design para SaaS e Startups (R$ 652,00)',
        icon: Palette,
        status: 'Disponível',
        highlight: true
      },
      {
        title: 'SocialFlux',
        href: '/servicos/socialflux',
        description: 'Automação inteligente para redes sociais',
        icon: Rocket,
        status: 'Disponível',
        highlight: false
      },
      {
        title: 'SubHub',
        href: '/servicos/subhub',
        description: 'Plataforma de gestão de assinaturas',
        icon: BarChart3,
        status: 'Early Adopters',
        highlight: false
      },
      {
        title: 'HumanTic',
        href: '/servicos/humantic',
        description: 'Soluções avançadas de IA e automação',
        icon: Bot,
        status: 'Em Desenvolvimento',
        highlight: false
      },
    ],
  },
  {
    title: 'Projetos',
    href: '/projetos',
    description: 'Conheça nossos cases de sucesso',
  },
  {
    title: 'Prepare-se para o novo',
    href: '/em-breve',
    description: 'Novidades que estão por vir',
  },
];

interface MainNavProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export function MainNav({ mobile = false, onItemClick }: MainNavProps = {}) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-1 py-2">
        <Link
          href="/"
          onClick={onItemClick}
          className={cn(
            'block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:scale-95',
            pathname === '/' && 'bg-accent text-accent-foreground'
          )}
        >
          Home
        </Link>
        {items.map((item) => (
          <div key={item.href} className="space-y-1">
            <Link
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:scale-95',
                pathname === item.href && 'bg-accent text-accent-foreground'
              )}
            >
              {item.title}
            </Link>
            {item.items && (
              <div className="ml-2 pl-4 border-l-2 border-primary/30 space-y-2">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={onItemClick}
                    className={cn(
                      'group block p-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 active:scale-95 border border-transparent hover:border-primary/20',
                      pathname === subItem.href && 'bg-accent text-accent-foreground border-primary/30',
                      subItem.highlight && 'bg-gradient-to-r from-secondary/5 to-primary/5 border-secondary/20'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <subItem.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {subItem.title}
                          </span>
                          {subItem.highlight && (
                            <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full font-medium">
                              Novo!
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                          {subItem.description}
                        </p>
                        <span className={cn(
                          "inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1",
                          subItem.highlight 
                            ? "bg-secondary/20 text-secondary" 
                            : "bg-primary/20 text-primary"
                        )}>
                          {subItem.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
        {items.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.items ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[520px] p-6 md:w-[620px] lg:w-[720px]">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-primary mb-2">Nossos Serviços</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Soluções digitais inovadoras para impulsionar seu negócio</p>
                    </div>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "group block select-none space-y-3 rounded-xl p-5 leading-none no-underline outline-none transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 focus:bg-accent focus:text-accent-foreground hover:shadow-lg border-2 border-transparent hover:border-primary/20 relative overflow-hidden",
                                pathname === subItem.href && 'bg-accent text-accent-foreground border-primary/30',
                                subItem.highlight && 'ring-2 ring-secondary/30 bg-gradient-to-br from-secondary/5 to-primary/5'
                              )}
                            >
                              {subItem.highlight && (
                                <div className="absolute top-2 right-2 bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                                  Novo!
                                </div>
                              )}
                              <div className="flex items-start space-x-3">
                                <subItem.icon className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="text-sm font-bold leading-none group-hover:text-primary transition-colors">
                                      {subItem.title}
                                    </div>
                                  </div>
                                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300 mb-2">
                                    {subItem.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className={cn(
                                      "text-xs px-2 py-1 rounded-full font-medium",
                                      subItem.highlight 
                                        ? "bg-secondary/20 text-secondary" 
                                        : "bg-primary/20 text-primary"
                                    )}>
                                      {subItem.status}
                                    </span>
                                    <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                                      Saiba mais →
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    pathname === item.href && 'bg-accent text-accent-foreground'
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
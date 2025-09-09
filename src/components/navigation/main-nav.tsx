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
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
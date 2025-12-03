'use client';

import Image from "next/image";
import Link from "next/link";
import { MainNav } from "@/components/navigation/main-nav";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/wm3-icon.png"
            alt="WM3 Digital"
            width={40}
            height={40}
            className="h-10 w-10 animate-emerge"
          />
          <span className="font-bold text-lg tracking-tight gradient-text">
            WM3 Digital
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <MainNav />
          <Link
            href="/documentacao#apis"
            className="inline-flex items-center justify-center rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Preview & APIs
          </Link>
        </div>
        
        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/documentacao#apis"
            className="rounded-lg border border-primary/40 px-3 py-2 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/10"
          >
            Preview & APIs
          </Link>
          <button
            className="p-3 rounded-lg hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/98 backdrop-blur-md shadow-lg">
          <div className="container py-3 space-y-3">
            <MainNav mobile onItemClick={() => setIsMenuOpen(false)} />
            <Link
              href="/documentacao#apis"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform duration-200 active:scale-95"
            >
              Preview & APIs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

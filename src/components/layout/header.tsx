'use client';

import Image from "next/image";
import Link from "next/link";
import { MainNav } from "@/components/navigation/main-nav";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/wm3-icon.png"
            alt="WM3 Digital"
            width={40}
            height={40}
            className="h-10 w-10 animate-emerge"
          />
          <span className="font-bold text-lg tracking-tight animate-digitalprint text-primary">
            WM3 Digital
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <MainNav />
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 rounded-lg hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/98 backdrop-blur-md shadow-lg">
          <div className="container py-2">
            <MainNav mobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
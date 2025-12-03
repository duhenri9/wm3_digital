'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-accent/5 pt-4 md:pt-8">
      {/* Subtle background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center py-20 md:py-32"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
          >
            Agência AI-First • Preview antes de pagar
          </motion.span>

          {/* Main heading */}
          <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            WM3 Digital: Sua agência de conversão{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              AI-First
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-slate-800 max-w-3xl mx-auto leading-relaxed font-normal">
            Soluções criadas com modelos de IA avançados, com preço fechado e
            entrega imediata após aprovação do preview.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#services"
              onClick={handleScrollToServices}
              className="btn btn-primary group"
            >
              Conhecer as ferramentas
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
            <Link
              href="/servicos"
              className="btn btn-outline"
            >
              Ver serviços e preços
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

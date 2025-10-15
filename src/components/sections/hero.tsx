'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const metrics = [
  {
    title: '+35% satisfação',
    description: 'ROI comprovado em até 6 meses*',
    highlightClass: 'text-[#F9A688]',
  },
  {
    title: '-40% custos',
    description: 'Eficiência operacional média',
    highlightClass: 'text-[#F9A688]',
  },
  {
    title: 'Governança contínua',
    description: 'Monitorando dados, integrações e performance',
    highlightClass: 'text-[#F9A688]',
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0B1220] py-24 text-slate-100 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-secondary/20 blur-[150px]" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-secondary/90">
            WM3 Digital
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Automação Inteligente e Geração de Valor Orientadas por Resultados
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Transforme seu negócio com soluções digitais inovadoras. Descubra como a WM3 pode
            impulsionar sua presença online com tecnologias de ponta.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#humanTic"
              prefetch={false}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 text-sm font-semibold text-primary-foreground shadow-[0_20px_40px_-20px_rgba(0,102,255,0.6)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
            >
              Conheça HumanTic
            </Link>
            <Link
              href="#eryon"
              prefetch={false}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-500/40 px-8 text-sm font-semibold text-slate-100 transition-all duration-200 hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
            >
              Conheça Eryon
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3"
        >
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_60px_-24px_rgba(11,18,32,0.6)] backdrop-blur"
            >
              <p className={`text-2xl font-semibold ${metric.highlightClass}`}>{metric.title}</p>
              <p className="mt-2 text-sm text-white">{metric.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

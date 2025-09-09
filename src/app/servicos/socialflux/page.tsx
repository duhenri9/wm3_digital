'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Bot, Zap, Target } from 'lucide-react';

const features = [
  {
    title: 'Automação Inteligente',
    description:
      'Crie e agende campanhas automaticamente com nossa IA avançada.',
    icon: Bot,
  },
  {
    title: 'Otimização em Tempo Real',
    description:
      'Ajustes automáticos baseados em performance para maximizar resultados.',
    icon: Zap,
  },
  {
    title: 'Segmentação Precisa',
    description:
      'Alcance o público certo com targeting baseado em dados e IA.',
    icon: Target,
  },
];

export default function SocialFluxPage() {
  return (
    <div className="container py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Social
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Flux<span className="text-primary">∞</span>
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Revolucione suas campanhas de marketing com automação inteligente
            powered by AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <feature.icon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white sm:p-12 shadow-2xl border border-white/10"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold mb-3">Pronto para começar?</h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  Experimente o SocialFlux∞ gratuitamente por 14 dias.
                </p>
                <p className="text-sm text-white/70 mt-2">
                  Sem compromisso • Cancele quando quiser
                </p>
              </div>
              <div className="flex flex-col gap-3 min-w-fit">
                <button className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary ring-offset-background transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group">
                  Experimentar SocialFlux∞
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs text-white/60 text-center">Teste gratuito por 14 dias</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
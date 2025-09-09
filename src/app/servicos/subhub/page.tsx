'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Users, LineChart, CreditCard } from 'lucide-react';

const features = [
  {
    title: 'Gestão Centralizada',
    description:
      'Gerencie todas as suas assinaturas em um único lugar com interface intuitiva.',
    icon: Users,
  },
  {
    title: 'Análise Avançada',
    description:
      'Acompanhe métricas importantes e tome decisões baseadas em dados.',
    icon: LineChart,
  },
  {
    title: 'Pagamentos Simplificados',
    description:
      'Processe pagamentos de forma segura e automatizada.',
    icon: CreditCard,
  },
];

export default function SubHubPage() {
  return (
    <div className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Sub
          <span className="text-primary">Hub</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
          Simplifique a gestão de assinaturas com nossa plataforma inteligente.
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
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3">Junte-se aos Early Adopters</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-2">
              Seja um dos primeiros a experimentar o SubHub e ajude a moldar o futuro da gestão de assinaturas.
            </p>
            <p className="text-sm text-white/70 mb-8">
              Acesso antecipado • Feedback direto com nossa equipe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://subhub.wm3.digital"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary ring-offset-background transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group"
              >
                Acesse o SubHub
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs text-white/60">Programa Early Adopters</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';

const stackItems = [
  {
    id: 'design-saas-pro',
    badge: 'SOLUÇÃO NO CODE OFICIAL WM3',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
    title: 'Design SaaS Pro',
    description:
      'Base SaaS em produção para CUSTOMIZAR e lançar projetos em dias.',
    link: 'https://designsaaspro.vercel.app',
    linkText: 'Ver Design SaaS Pro',
    secondaryLink: 'https://designsaas.wm3digital.com.br',
    secondaryLinkText: 'Ver Design SaaS Template Oficial',
    secondaryBadge: 'Disponível',
  },
  {
    id: 'metricaas',
    badge: 'PARCEIRO OFICIAL WM3',
    badgeColor: 'bg-secondary/10 text-secondary border-secondary/20',
    title: 'Metricaas.ai',
    description:
      'Painel de métricas SaaS com visão de investidor.',
    link: 'https://metricaas.ai', // Replace with actual link (with affiliate code)
    linkText: 'Conhecer Metricaas.ai',
  },
];

export function StackMetricsSection() {
  return (
    <section className="bg-gradient-to-b from-accent/5 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Nossa Stack
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
          >
            Stack e métricas que usamos na própria WM3
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-800 max-w-3xl mx-auto leading-relaxed"
          >
            Stack em produção que usamos todos os dias: mesmas ferramentas, integrações e métricas que
            sustentam nossas entregas rápidas, observáveis e com governança de ponta a ponta.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {stackItems.map((item, index) => {
            const primaryHref = item.link ?? '#';
            const secondaryHref = item.secondaryLink;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="card p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1.5 text-primary hover:text-primary/80 font-semibold group-hover:gap-3 transition-all"
                  >
                    <span>{item.linkText}</span>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                      Fase Final
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  {secondaryHref && item.secondaryLinkText && (
                    <Link
                      href={secondaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-800 hover:text-emerald-700 font-semibold group-hover:gap-3 transition-all"
                    >
                      <span>{item.secondaryLinkText}</span>
                      <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                        Disponível
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

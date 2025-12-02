'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';

const stackItems = [
  {
    id: 'design-saas-pro',
    badge: 'TEMPLATE OFICIAL WM3',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
    title: 'Design SaaS Pro',
    description:
      'Base SaaS em produção para lançar projetos em dias.',
    link: 'https://designsaas.pro', // Replace with actual link
    linkText: 'Ver Design SaaS Pro',
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
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
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
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {stackItems.map((item, index) => (
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
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group-hover:gap-3 transition-all"
                  >
                    <span>{item.linkText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

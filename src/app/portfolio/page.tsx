'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { serviceOfferings } from '@/data';

const portfolioIds = ['subhub', 'metrify', 'humantic', 'eryon-core', 'aurion-veridex'];
const upcomingServices = new Set(['aurion-veridex']);

const portfolio = serviceOfferings.filter((service) => portfolioIds.includes(service.id));

export default function PortfolioPage() {
  return (
    <div className="container py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Portfólio WM3
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Suite de soluções WM3 disponíveis para acelerar operações, dados e atendimento com governança contínua.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {portfolio.map((service, index) => {
          const isUpcoming = upcomingServices.has(service.id);
          return (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group h-full rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.15)] backdrop-blur transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">{service.name}</h2>
                {isUpcoming ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.45em] bg-slate-900/80 text-white/90 shadow-[0_12px_36px_-24px_rgba(2,6,23,0.7)]">
                    UPCOMING
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                      service.status === 'Disponível'
                        ? 'border-green-500/40 text-green-500'
                        : service.status === 'Early Adopters'
                        ? 'border-yellow-500/40 text-yellow-500'
                        : 'border-slate-400 text-slate-500'
                    }`}
                  >
                    {service.status}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{service.price ?? 'Sob consulta'}</span>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1"
                >
                  Ver solução
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

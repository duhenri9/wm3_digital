'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  BrainCircuit,
  CreditCard,
  Headset,
  LineChart,
  LucideIcon,
  Palette,
  Share2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { flagshipService, serviceOfferings } from '@/data';

const iconMap: Record<string, LucideIcon> = {
  'funil-que-vende': Sparkles,
  'design-saas': Palette,
  socialflux: Share2,
  subhub: CreditCard,
  humantic: BrainCircuit,
  metrify: LineChart,
  'eryon-core': Headset,
  'aurion-veridex': ShieldCheck,
};

const serviceHighlights = [
  'UX, UI e desenvolvimento full-stack entregues por squads dedicadas',
  'Fluxos de aprovação e entrega integrados ao MCP e Abacate Pay',
  'Relatórios Metrify para medir impacto e evolução de cada release',
];

const upcomingIds = new Set(['funil-que-vende', 'socialflux', 'aurion-veridex']);

export function FeaturesSection() {
  const primary =
    serviceOfferings.find((service) => service.id === 'design-saas') ??
    flagshipService ??
    serviceOfferings[0];
  const secondaryServices = serviceOfferings.filter((service) => service.id !== primary.id);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Portfólio WM3 para resultados mensuráveis
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Cada produto WM3 nasceu para acelerar a transformação digital de ponta a ponta. Da
            captura de leads ao atendimento omnichannel, tudo opera em sincronia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-5xl gap-10 rounded-3xl border border-slate-200 bg-slate-50/80 p-10 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] md:grid-cols-[1.1fr,0.9fr]"
        >
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Sparkles className="h-4 w-4" />
              Destaque WM3
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-slate-900">{primary.name}</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-primary">
                {primary.headline}
              </p>
            </div>
            <p className="text-base text-slate-600">{primary.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1">
                {primary.status}
              </span>
              {primary.price && (
                <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1">
                  {primary.price}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={primary.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-slate-100 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.45)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                Conhecer o Design SaaS
              </Link>
              <Link
                href="https://designsaas.wm3digital.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition-transform duration-200 hover:-translate-y-1"
              >
                Abrir site
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Como entregamos valor
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {serviceHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {secondaryServices.map((service, index) => {
            const Icon = iconMap[service.id] ?? Brain;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.15)] backdrop-blur transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="inline-flex items-center rounded-full bg-slate-100 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  {upcomingIds.has(service.id) && (
                    <span className="mt-4 inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/90 shadow-[0_12px_36px_-24px_rgba(2,6,23,0.7)]">
                      UPCOMING
                    </span>
                  )}
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.name}</h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-primary">
                    {service.headline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="rounded-full border border-slate-200 px-3 py-1">
                    {service.status}
                  </span>
                  {service.price && <span>{service.price}</span>}
                </div>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1"
                >
                  Ver solução
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

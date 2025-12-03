'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { AIServiceDefinition, formatPriceBRL } from '@/data/ai-services';

interface ServiceDetailCardProps {
  service: AIServiceDefinition;
  index: number;
}

export function ServiceDetailCard({ service, index }: ServiceDetailCardProps) {
  return (
    <motion.div
      id={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="scroll-mt-24"
    >
      <div className="card p-8 md:p-10 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-semibold">{service.name}</h3>
              {service.supportsRounds && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  Até {service.maxRounds} rodadas
                </span>
              )}
            </div>
            <p className="text-slate-700">{service.fullDescription}</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="text-4xl font-bold text-primary">
              {formatPriceBRL(service.priceBRL)}
            </div>
            <div className="text-sm text-slate-700">Preço fixo</div>
          </div>
        </div>

        {/* Grid with input, preview, and deliverables */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* What we need */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                1
              </div>
              O que precisamos
            </h4>
            <ul className="space-y-2">
              {service.inputFields.map((field) => (
                <li
                  key={field.name}
                  className="text-sm flex items-start gap-2"
                >
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-xs font-bold text-secondary">
                2
              </div>
              Preview (antes de pagar)
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.previewDescription}
            </p>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-xs font-medium text-accent">
              <Zap className="w-3 h-3" />
              Gerado por IA em segundos
            </div>
          </div>

          {/* Final delivery */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                3
              </div>
              Entrega final
            </h4>
            <ul className="space-y-2">
              {service.finalDeliverables.map((deliverable, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6 border-t border-border/30">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/suporte?servico=${service.id}&fluxo=preview`}
              className="btn btn-primary group inline-flex"
            >
              Iniciar preview
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/documentacao#apis"
              className="btn btn-outline inline-flex items-center gap-2 text-sm font-semibold"
            >
              Ver APIs & integrações
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

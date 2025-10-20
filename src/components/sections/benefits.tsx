'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { strategicBenefits } from '@/data';

export function BenefitsSection() {
  return (
    <section className="bg-[#0D1B2A] py-24 text-slate-100 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Nossos diferenciais
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-white md:text-4xl">
            Por que escolher a WM3 Digital?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Estratégia, tecnologia e pessoas colaborando para criar operações resilientes,
            escaláveis e centradas no cliente — com dados acionáveis guiando cada decisão.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {strategicBenefits.map((benefit, index) => (
            <motion.article
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex h-full flex-col gap-4 rounded-3xl border border-white/12 bg-white/10 p-6 shadow-[0_20px_60px_-24px_rgba(8,15,28,0.55)] backdrop-blur transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-slate-200">{benefit.description}</p>
              {benefit.metricHighlight && (
                <span className="inline-flex w-fit rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  {benefit.metricHighlight}
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

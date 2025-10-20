'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

import { serviceOfferings, type ServiceOffering } from '@/data';

const duoSolutionsIds = ['humantic', 'eryon-core'] as const;

export function AboutSection() {
  const duoSolutions = useMemo(
    () =>
      duoSolutionsIds
        .map((id) => serviceOfferings.find((service) => service.id === id))
        .filter(Boolean) as ServiceOffering[],
    [],
  );

  return (
    <section className="bg-[#F8FAFF] py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center"
        >
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Sparkles className="h-4 w-4" />
              WM3 Digital
            </span>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              WM3 Digital: Inteligência Operacional em Duas Soluções Complementares
            </h2>
            <p className="text-base text-slate-600 md:text-lg">
              Somos uma empresa de transformação digital que conecta automação inteligente e agentes
              multimodais para resolver gargalos de atendimento, dados e operações críticas.
              HumanTic reduz filas e gera relacionamento contínuo com automação empática, enquanto
              Eryon Core executa rotinas pré-definidas com agentes multimodais para manter sistemas
              sincronizados e governados.
            </p>
          </div>

          <div className="flex-1 space-y-4">
            {duoSolutions.map((solution) => (
              <motion.article
                key={solution.id}
                id={solution.id === 'humantic' ? 'humanTic' : 'eryon'}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{solution.name}</h3>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                    {solution.status}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {solution.headline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{solution.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {solution.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={solution.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-200 hover:translate-x-1"
                >
                  Ver detalhes
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl rounded-3xl border border-primary/15 bg-white/90 p-10 shadow-[0_20px_60px_-24px_rgba(5,30,77,0.25)]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h3 className="text-2xl font-semibold text-slate-900">Integração Perfeita</h3>
              <p className="text-base text-slate-600">
                HumanTic automatiza jornadas complexas, Eryon Core garante atendimento omnichannel
                assistido por IA e Metrify monitora a operação em tempo real. O ecossistema WM3 foi
                concebido para compartilhar dados e acelerar upsell com governança total.
              </p>
            </div>
            <div className="grid w-full max-w-xs gap-3 rounded-3xl bg-slate-900 p-6 text-slate-100 md:w-auto">
              <div>
                <p className="text-2xl font-semibold text-secondary">Squads WM3</p>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Especialistas multidisciplinares
                </span>
              </div>
              <div>
                <p className="text-2xl font-semibold text-secondary">+200</p>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Fluxos automatizados
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

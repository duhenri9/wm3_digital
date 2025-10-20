'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Database, Fingerprint, ShieldCheck, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';

const assurances = [
  {
    icon: ShieldCheck,
    title: 'Compliance contínuo',
    description:
      'Concilie dados internos, bureaus externos e políticas WM3 para garantir decisões auditáveis em segundos.',
  },
  {
    icon: Fingerprint,
    title: 'Identidade validada',
    description:
      'Verificação biométrica, análise documental e deduplicação automática para evitar fraudes de origem.',
  },
  {
    icon: Database,
    title: 'Governança de dados',
    description:
      'Trilhas de auditoria completas e armazenamento seguro, com mascaramento e retenção conforme LGPD.',
  },
];

const workflow = [
  'Coleta segura via APIs WM3',
  'Enriquecimento com fontes públicas e privadas',
  'Scoring proprietário Aurion',
  'Decisão automatizada ou envio para analista',
];

export default function AurionPage() {
  return (
    <div className="container py-20 space-y-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Aurion by Veridex
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Decisões confiáveis com inteligência de risco WM3
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          A camada de verificação e compliance que conecta dados internos e externos para validar
          identidade, prevenir fraudes e sustentar auditorias exigentes.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#lead-form"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Iniciar validação com Aurion
          </Link>
          <Link
            href="/servicos"
            className="inline-flex items-center justify-center rounded-xl border border-input px-8 py-3 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-1 hover:bg-accent/60 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Ver demais soluções
          </Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-3"
      >
        {assurances.map((item) => (
          <div
            key={item.title}
            className="group h-full rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <item.icon className="h-10 w-10 text-primary" />
            <h3 className="mt-5 text-xl font-semibold text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="grid gap-8 lg:grid-cols-[0.65fr,1.35fr]"
      >
        <div className="rounded-3xl border border-primary/15 bg-primary/5 p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground">Resultados tangíveis</h2>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li>
              <span className="text-3xl font-bold text-primary">-48%</span> em falsos positivos de
              fraude
            </li>
            <li>
              <span className="text-3xl font-bold text-primary">+62%</span> de agilidade na aprovação
              de cadastros
            </li>
            <li>
              <span className="text-3xl font-bold text-primary">100%</span> de aderência a auditorias
              internas
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-primary/15 bg-card p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground">Workflow de validação WM3</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Conectamos sistemas WM3, APIs parceiras e o seu stack legado para validar pessoas e
            empresas mantendo transparência e rastreabilidade.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {workflow.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-primary/10 bg-background p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{step}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Logs são armazenados com carimbo temporal e assinaturas digitais para facilitar
            auditorias e revisões de compliance.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-primary/10 bg-card p-10 shadow-lg"
      >
        <div className="grid gap-8 md:grid-cols-[1fr,1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Cobertura ampliada</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Aurion integra bases WM3, bureaus privados, SERPRO, Cartório Digital e fontes
              internacionais através de rotas autenticadas.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>• Políticas customizadas por produto ou segmento</li>
              <li>• Explicabilidade do scoring para revisões humanas</li>
              <li>• Exportação dos registros para data warehouse</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/15 bg-background p-6">
            <h3 className="text-lg font-semibold text-foreground">Governança WM3</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Cada decisão é acompanhada de um JSON detalhado contendo origem dos dados, versão do
              modelo e recomendações de ação, facilitando compliance e auditorias externas.
            </p>
            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldQuestion className="h-4 w-4 text-primary" />
                Revisão manual com 4 olhos opcional
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Logs assinados digitalmente e armazenados em região brasileira
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Garanta decisões consistentes e auditáveis
            </h3>
            <p className="text-sm text-muted-foreground">
              Implementamos o gateway Aurion em até 45 dias, com integrações prontas para Supabase
              e Hostinger VPS.
            </p>
          </div>
          <Link
            href="#lead-form"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Conversar com o time WM3
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

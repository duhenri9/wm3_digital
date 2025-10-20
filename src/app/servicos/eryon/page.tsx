'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Headset, MessageSquare, Workflow } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    icon: Headset,
    title: 'Atendimento omnichannel',
    description:
      'Centralize e-mails, WhatsApp, voz e live chat com roteamento inteligente e visão 360° do cliente.',
  },
  {
    icon: Workflow,
    title: 'Playbooks inteligentes',
    description:
      'Padronize fluxos de atendimento com automações que sugerem próximas ações e respostas ricas em contexto.',
  },
  {
    icon: MessageSquare,
    title: 'Agentes humanizados',
    description:
      'Copilotos WM3 acompanham o atendente, resumem interações e classificam tickets automaticamente.',
  },
];

const serviceLevels = [
  {
    tier: 'Start',
    focus: 'Operações emergentes',
    includes: ['Integração omnichannel básica', 'Roteamento por skill', 'Relatórios diários'],
  },
  {
    tier: 'Scale',
    focus: 'Centrais em crescimento',
    includes: [
      'Playbooks adaptativos',
      'Automação de follow-up por IA',
      'Dashboard executivo em tempo real',
    ],
  },
  {
    tier: 'Prime',
    focus: 'Operações enterprise',
    includes: [
      'Modelos de linguagem customizados',
      'Quality assurance automatizado',
      'Squad dedicado WM3',
    ],
  },
];

const ctaItems = [
  'Mapeamento de jornada omnichannel',
  'Integrações com CRM e billing',
  'Treinamento focado em experiência do cliente',
];

export default function EryonPage() {
  return (
    <div className="container py-20 space-y-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Eryon Core
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Atendimento excepcional em cada ponto de contato
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          A solução WM3 que conecta canais, pessoas e IA para transformar suporte em fidelização e
          crescimento de receita, mantendo governança total da operação.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#lead-form"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Montar operação com Eryon
          </Link>
          <Link
            href="/servicos"
            className="inline-flex items-center justify-center rounded-xl border border-input px-8 py-3 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-1 hover:bg-accent/60 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Portfólio completo WM3
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
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="group h-full rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <pillar.icon className="h-10 w-10 text-primary" />
            <h3 className="mt-5 text-xl font-semibold text-foreground">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
          </div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-10 shadow-lg"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-foreground">Programas sob medida</h2>
            <p className="text-base text-muted-foreground">
              Selecionamos o nível de engajamento ideal para o estágio da operação e implantamos
              uma cadência de evolução contínua com indicadores claros.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {serviceLevels.map((level) => (
                <div
                  key={level.tier}
                  className="rounded-2xl border border-white/30 bg-white/70 p-5 text-left shadow-md backdrop-blur"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {level.tier}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-foreground">{level.focus}</p>
                  <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                    {level.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-3.5 w-3.5 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-primary/15 bg-background p-8 shadow-inner">
            <h3 className="text-xl font-semibold text-foreground">Indicadores monitorados</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>🎯 CSAT, NPS e FCR em tempo real</li>
              <li>⚡ SLAs, backlog e ocupação de equipes</li>
              <li>🤝 Health score por segmento e canal</li>
              <li>📈 Impacto em MRR via integrações com SubHub/Metrify</li>
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Todos os dados são consolidados em dashboards WM3 com possibilidade de replicação em
              BI externo.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-primary/10 bg-card p-10 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-foreground">
          Quem usa Eryon Core sente o impacto no D+1
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { metric: '+35%', label: 'de satisfação do cliente nos 3 primeiros meses' },
            { metric: '-40%', label: 'de custos operacionais com automações WM3' },
            { metric: '24/7', label: 'monitoramento e squad de especialistas de prontidão' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <p className="text-3xl font-bold text-primary">{item.metric}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Vamos arquitetar sua operação de atendimento?
            </h3>
            <ul className="mt-2 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground sm:justify-start">
              {ctaItems.map((item) => (
                <li key={item} className="rounded-full border border-primary/20 px-3 py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="#lead-form"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Agendar discovery call
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

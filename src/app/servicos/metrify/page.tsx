'use client';

import { motion } from 'framer-motion';
import { Activity, BellRing, LineChart, Radar } from 'lucide-react';
import Link from 'next/link';

const highlights = [
  {
    icon: LineChart,
    title: 'Dashboards em tempo real',
    description:
      'Visualize métricas críticas do seu SaaS com latência mínima e indicadores customizados por squad.',
  },
  {
    icon: BellRing,
    title: 'Alertas inteligentes',
    description:
      'Configure limites dinâmicos e receba alertas automáticos por e-mail, Slack ou n8n quando algo sair do normal.',
  },
  {
    icon: Radar,
    title: 'Análise preditiva',
    description:
      'Combine dados históricos e variáveis externas para antecipar churn, quedas de conversão e gargalos operacionais.',
  },
];

const telemetry = [
  {
    label: 'Tempo médio para detectar incidentes',
    value: '-63%',
  },
  {
    label: 'Satisfação de times de produto',
    value: '92%',
  },
  {
    label: 'Integrações prontas',
    value: '15+',
  },
];

const dataSources = [
  'Supabase e bancos relacionais',
  'n8n, Make e Zapier',
  'APIs proprietárias WM3',
  'Ferramentas de billing e CRM',
];

export default function MetrifyPage() {
  return (
    <div className="container py-20 space-y-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Metrify
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Observabilidade que acelera decisões de produto
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          A plataforma de métricas da WM3 reúne monitoramento, alertas e insights preditivos em um
          só lugar para que times SaaS atuem com velocidade, autonomia e foco em crescimento.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#lead-form"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Solicitar demonstração
          </Link>
          <Link
            href="/servicos"
            className="inline-flex items-center justify-center rounded-xl border border-input px-8 py-3 text-sm font-semibold text-foreground transition-transform duration-200 hover:-translate-y-1 hover:bg-accent/60 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Ver outros serviços
          </Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {highlights.map((item) => (
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
        className="rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-10 shadow-lg"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-foreground">Stack de Telemetria Moderno</h2>
            <p className="text-base text-muted-foreground">
              Instrumente seus produtos com coletores leves, normalize eventos via n8n e mantenha
              uma visão unificada de clientes, assinaturas e performance técnica.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {dataSources.map((source) => (
                <li key={source} className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-primary" />
                  {source}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-xl backdrop-blur">
            <h3 className="text-lg font-semibold text-foreground">Impacto nos times</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {telemetry.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-primary/15 bg-primary/5 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
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
        <h2 className="text-2xl font-semibold text-foreground">Fluxo WM3 para dados confiáveis</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Coleta',
              description:
                'SDK leve e conectores serverless para capturar métricas de uso, billing e suporte.',
            },
            {
              title: 'Orquestração',
              description:
                'Pipelines versionados no n8n com validação, enriquecimento e roteamento inteligente.',
            },
            {
              title: 'Ação',
              description:
                'Playbooks automáticos de alerta, abertura de tickets e atualização de dashboards executivos.',
            },
          ].map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-primary/10 bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Pronto para medir o que importa?
            </h3>
            <p className="text-sm text-muted-foreground">
              Configuramos a instrumentação, pipelines e alertas em até 30 dias úteis.
            </p>
          </div>
          <Link
            href="#lead-form"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Falar com especialista
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

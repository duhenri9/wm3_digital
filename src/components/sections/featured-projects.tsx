'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Rocket, BarChart } from 'lucide-react';

const projects = [
  {
    id: 'design-saas-pro',
    badge: 'SOLUÇÃO NO CODE OFICIAL WM3',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
    title: 'Design SaaS Pro',
    description: 'Base SaaS em produção para CUSTOMIZAR e lançar projetos em dias.',
    links: {
      primary: 'https://designsaaspro.vercel.app',
      secondary: 'https://designsaas.wm3digital.com.br',
    },
    linkText: 'Ver Design SaaS Pro',
    isExternal: true,
    status: 'active',
  },
  {
    id: 'metricaas',
    badge: 'PARCEIRO OFICIAL WM3',
    badgeColor: 'bg-secondary/10 text-secondary border-secondary/20',
    title: 'Metricaas.ai',
    description: 'Métricas SaaS com visão de investidor.',
    link: 'https://metricaas.ai',
    linkText: 'Conhecer Metricaas',
    isExternal: true,
    status: 'active',
  },
  {
    id: 'vett-report',
    badge: 'Em desenvolvimento',
    badgeColor: 'bg-slate-900/80 text-white border-slate-800',
    title: 'Vett Report',
    description: 'Relatórios inteligentes de análise de dados.',
    link: '/projetos#vett-report',
    linkText: 'Entrar na lista de espera',
    isExternal: false,
    status: 'development',
    icon: BarChart,
  },
  {
    id: 'dev-year-recap',
    badge: 'Lançamento 05-06 Dez',
    badgeColor: 'bg-secondary/20 text-secondary border-secondary/40',
    title: 'DevYear Recap',
    description: 'Retrospectiva anual do seu código.',
    link: '/projetos#dev-year-recap',
    linkText: 'Entrar na lista de espera',
    isExternal: false,
    status: 'launch',
    icon: Rocket,
  },
];

export function FeaturedProjectsSection() {
  return (
    <section className="bg-gradient-to-b from-accent/5 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
          >
            Projetos WM3 em destaque
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const primaryHref = project.links?.primary ?? project.link ?? '#';
            const secondaryHref = project.links?.secondary;

            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                {/* Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${project.badgeColor}`}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Icon for development projects */}
                {project.icon && (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <project.icon className="w-6 h-6 text-accent" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.id === 'dev-year-recap' && (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                      Lançamento • 05-06 Dez
                    </div>
                  )}
                  <p className="text-slate-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.id === 'design-saas-pro' && (
                    <Link
                      href={primaryHref}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      Ver Design SaaS Pro
                      <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                        Early Adopters
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  {project.id === 'dev-year-recap' && (
                    <Link
                      href={primaryHref}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-primary px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-secondary/30 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Pré-reservar vaga
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  <Link
                    href={primaryHref}
                    {...(project.isExternal && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group-hover:gap-3 transition-all"
                  >
                    <span>{project.linkText}</span>
                    {project.id === 'metricaas' && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                        Fase Final
                      </span>
                    )}
                    {project.isExternal ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Link>
                  {secondaryHref && (
                    <Link
                      href={secondaryHref}
                      {...(project.isExternal && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group-hover:gap-3 transition-all"
                    >
                      <span>Ver Design SaaS Template Oficial</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          )})}
        </div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/projetos" className="btn btn-outline group">
            Ver todos os projetos
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

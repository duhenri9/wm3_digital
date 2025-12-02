'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Rocket, BarChart } from 'lucide-react';

const projects = [
  {
    id: 'design-saas-pro',
    badge: 'TEMPLATE OFICIAL WM3',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
    title: 'Design SaaS Pro',
    description: 'Template profissional para lançar SaaS em dias.',
    link: 'https://designsaas.pro',
    linkText: 'Ver template',
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
    badgeColor: 'bg-muted/20 text-muted-foreground border-muted/20',
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
    badge: 'MVP em desenvolvimento',
    badgeColor: 'bg-accent/10 text-accent border-accent/20',
    title: 'DevYear Recap',
    description: 'Retrospectiva anual do seu código.',
    link: '/projetos#dev-year-recap',
    linkText: 'Entrar na lista de espera',
    isExternal: false,
    status: 'development',
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
          {projects.map((project, index) => (
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
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href={project.link}
                    {...(project.isExternal && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group-hover:gap-3 transition-all"
                  >
                    <span>{project.linkText}</span>
                    {project.isExternal ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Link>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
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

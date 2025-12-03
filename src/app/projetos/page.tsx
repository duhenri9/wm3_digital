'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Clock, Users, Sparkles, AlertCircle } from 'lucide-react';

const projects = [
  {
    id: 'design-saas-pro',
    title: 'Design SaaS Pro',
    tagline: 'Sistema profissional de design para produtos SaaS',
    description: 'Plataforma completa de design para SaaS, micro-SaaS, startups e produtos digitais. Sistema de componentes reutilizáveis, templates prontos e biblioteca de padrões UI/UX otimizados para conversão.',
    fullDescription: 'Design SaaS Pro é nossa solução premium para times de produto que precisam de design profissional e escalável. Com mais de 200 componentes prontos, 50+ templates de páginas e documentação completa, você acelera o desenvolvimento e garante consistência visual em todo o produto.',
    features: [
      'Biblioteca com 200+ componentes UI profissionais',
      'Templates prontos para landing pages, dashboards e flows',
      'Sistema de design tokens com suporte a temas',
      'Componentes otimizados para acessibilidade (WCAG 2.1)',
      'Figma + React/Next.js code export',
      'Documentação completa de uso e guidelines'
    ],
    technologies: ['Figma', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    metrics: {
      components: '200+',
      templates: '50+',
      clients: '12'
    },
    status: 'Disponível',
    statusColor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    links: {
      live: 'https://design.wm3digital.com.br',
      demo: 'https://demo.design.wm3digital.com.br',
      docs: 'https://docs.design.wm3digital.com.br'
    }
  },
  {
    id: 'metricaas',
    title: 'Metricaas.ai',
    tagline: 'Analytics inteligente para SaaS e produtos digitais',
    description: 'Plataforma de métricas e analytics com IA para produtos SaaS, micro-SaaS e startups. Dashboards personalizáveis, alertas inteligentes, previsões de churn e insights automáticos sobre comportamento do usuário.',
    fullDescription: 'Metricaas.ai transforma dados brutos em decisões estratégicas. Nossa IA analisa padrões de uso, identifica oportunidades de growth e alerta sobre riscos de churn antes que aconteçam. Ideal para founders, product managers e times de growth que precisam tomar decisões baseadas em dados reais.',
    features: [
      'Dashboards personalizáveis com métricas de SaaS (MRR, CAC, LTV, Churn)',
      'IA para detecção de padrões e previsão de churn',
      'Alertas inteligentes em tempo real',
      'Segmentação avançada de usuários e cohorts',
      'Integrações com Stripe, analytics, CRM e databases',
      'Relatórios automáticos e insights acionáveis'
    ],
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Redis', 'TailwindCSS'],
    metrics: {
      accuracy: '94%',
      integrations: '15+',
      users: '1.2k'
    },
    status: 'Disponível',
    statusColor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    links: {
      live: 'https://metricaas.ai',
      demo: 'https://app.metricaas.ai/demo',
      waitlist: 'https://metricaas.ai/early-access'
    }
  },
  {
    id: 'vett-report',
    title: 'Vett Report',
    tagline: 'Análise técnica e auditoria de código com IA',
    description: 'Ferramenta de code review e auditoria técnica automatizada para projetos de software. Análise de qualidade, segurança, performance, débito técnico e melhores práticas usando IA avançada.',
    fullDescription: 'Vett Report é o assistente técnico inteligente para CTOs, tech leads e desenvolvedores. Conecte seu repositório e receba uma análise completa: vulnerabilidades de segurança, code smells, problemas de performance, débito técnico e sugestões de refatoração priorizadas por impacto.',
    features: [
      'Análise automática de código-fonte (multiple languages)',
      'Detecção de vulnerabilidades e issues de segurança',
      'Avaliação de performance e otimizações sugeridas',
      'Cálculo de débito técnico e priorização',
      'Sugestões de refatoração com exemplos de código',
      'Relatórios executivos e técnicos detalhados'
    ],
    technologies: ['Python', 'OpenAI GPT-4', 'GitHub API', 'Docker', 'PostgreSQL', 'React'],
    metrics: {
      languages: '12+',
      accuracy: '89%',
      reports: '340+'
    },
    status: 'Early Adopters',
    statusColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
    links: {
      waitlist: 'https://vettreport.com/early-access',
      docs: 'https://docs.vettreport.com'
    }
  },
  {
    id: 'devyear-recap',
    title: 'DevYear Recap',
    tagline: 'Seu ano de desenvolvimento em um recap visual',
    description: 'Plataforma que gera recaps visuais personalizados do seu ano como desenvolvedor. Conecte seu GitHub, GitLab ou Bitbucket e receba estatísticas incríveis, insights sobre seu código e conquistas do ano.',
    fullDescription: 'Inspirado no Spotify Wrapped, DevYear Recap transforma seus dados de desenvolvimento em uma experiência visual compartilhável. Descubra suas linguagens favoritas, maiores contribuições, padrões de commit, colaborações e muito mais. Perfeito para compartilhar nas redes e celebrar suas conquistas como dev.',
    features: [
      'Integração com GitHub, GitLab e Bitbucket',
      'Análise de commits, PRs, issues e code reviews',
      'Identificação de linguagens, frameworks e tecnologias mais usadas',
      'Visualizações interativas e animadas',
      'Gráficos de produtividade e padrões de trabalho',
      'Cards compartilháveis para redes sociais'
    ],
    technologies: ['Next.js', 'TypeScript', 'D3.js', 'Framer Motion', 'GitHub API', 'Vercel'],
    metrics: {
      eta: 'Q2 2025',
      features: '15+',
      integrations: '3'
    },
    status: 'Em Desenvolvimento',
    statusColor: 'bg-sky-500/20 text-sky-700 dark:text-sky-300',
    links: {
      waitlist: 'https://devyearrecap.com/waitlist'
    }
  }
];

const stats = [
  { value: '4', label: 'Produtos Ativos', icon: Sparkles },
  { value: '2', label: 'Disponíveis Agora', icon: ExternalLink },
  { value: '1.2k+', label: 'Usuários Ativos', icon: Users },
  { value: '94%', label: 'Satisfação', icon: ArrowRight }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Disponível':
      return <ExternalLink className="w-4 h-4" />;
    case 'Early Adopters':
      return <Users className="w-4 h-4" />;
    case 'Em Desenvolvimento':
      return <Clock className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

export default function ProjetosPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <div className="container max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
              Projetos WM3 Digital
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Produtos SaaS, ferramentas AI-powered e soluções profissionais que
              transformam ideias em negócios escaláveis
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="card p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-semibold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Projects */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                id={project.id}
                className="card p-8 md:p-12 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                          {project.title}
                        </h2>
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${project.statusColor}`}
                        >
                          {getStatusIcon(project.status)}
                          {project.status}
                        </span>
                      </div>
                      <p className="text-lg text-primary font-medium">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <p className="text-base text-foreground/80 leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Principais Funcionalidades
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                      Stack Tecnológico
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-accent/50 text-foreground rounded-lg text-xs font-medium border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-6 bg-accent/30 rounded-xl border border-border/50">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-semibold text-primary mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Links/Actions */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.links.live && (
                      <Link
                        href={project.links.live}
                        target="_blank"
                        className="btn btn-primary inline-flex items-center gap-2"
                      >
                        Acessar Produto
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    {project.links.demo && (
                      <Link
                        href={project.links.demo}
                        target="_blank"
                        className="btn btn-outline inline-flex items-center gap-2"
                      >
                        Ver Demo
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    {project.links.waitlist && (
                      <Link
                        href={project.links.waitlist}
                        className="btn btn-outline inline-flex items-center gap-2"
                      >
                        Entrar na Lista de Espera
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                    {project.links.docs && (
                      <Link
                        href={project.links.docs}
                        target="_blank"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        Documentação
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 card p-8 md:p-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20"
          >
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Quer construir o próximo produto SaaS de sucesso?
              </h2>
              <p className="text-lg text-foreground/70">
                A WM3 Digital combina expertise em produto, design e desenvolvimento
                para transformar sua ideia em um SaaS escalável e rentável.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contato" className="btn btn-primary">
                  Falar com Especialista
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link href="/servicos" className="btn btn-outline">
                  Ver Serviços e Preços
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

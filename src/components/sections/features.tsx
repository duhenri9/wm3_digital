'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket, Shield, Clock, Zap, BarChart3, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/projects';
import { getLandingPageProjects } from '@/lib/projects-api';

// Função para obter ícone do projeto
function getProjectIcon(title: string) {
  if (title.includes('SocialFlux')) return Sparkles;
  if (title.includes('SubHub')) return Shield;
  if (title.includes('HumanTic')) return Rocket;
  if (title.includes('Design')) return Clock;
  if (title.includes('Funil')) return Zap;
  if (title.includes('Metrify')) return BarChart3;
  if (title.includes('SEO')) return Search;
  return Sparkles;
}

// Função para obter cor do projeto
function getProjectColor(title: string): string {
  if (title.includes('SocialFlux')) return 'from-blue-500 to-cyan-500';
  if (title.includes('SubHub')) return 'from-green-500 to-emerald-500';
  if (title.includes('HumanTic')) return 'from-purple-500 to-violet-500';
  if (title.includes('Design')) return 'from-orange-500 to-red-500';
  if (title.includes('Funil')) return 'from-[#0066FF] to-[#00D1FF]';
  if (title.includes('Metrify')) return 'from-indigo-500 to-purple-500';
  if (title.includes('SEO')) return 'from-green-500 to-teal-500';
  return 'from-gray-500 to-gray-600';
}

export function FeaturesSection() {
  const [landingProjects, setLandingProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Usar getLandingPageProjects que filtra por showInLanding
        const projects = await getLandingPageProjects();
        setLandingProjects(projects);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="py-24">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Nossas <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Soluções</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Soluções inovadoras desenvolvidas com as mais avançadas tecnologias de IA e automação.
          </p>
        </motion.div>

        {/* Serviços Disponíveis */}
        {landingProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landingProjects.map((project, index) => {
              const Icon = getProjectIcon(project.title);
              const color = getProjectColor(project.title);
              const href = project.links.live || project.links.demo || '#';
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={href}>
                    <div className="relative overflow-hidden rounded-2xl bg-card border p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Disponível' 
                              ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                              : project.status === 'Making & Beta'
                              ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                              : 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                          }`}>
                            {project.status}
                          </span>
                          <div className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-1 transition-all duration-300">
                            Ver mais
                            <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/servicos"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
          >
            Ver Todos os Serviços
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
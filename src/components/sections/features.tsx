'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Clock,
    title: 'Design SaaS',
    description: 'Design para Micro-SaaS / SaaS / Landing Page e Startups.',
    href: '/servicos/design-saas',
    color: 'from-orange-500 to-red-500',
    status: 'Disponível'
  },
  {
    icon: Sparkles,
    title: 'SocialFlux∞',
    description: '(Micro-SaaS) de Geração automática de anúncios para Instagram e Redes Sociais.',
    href: '/servicos/socialflux',
    color: 'from-blue-500 to-cyan-500',
    status: 'Disponível'
  }
];

export function FeaturesSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="relative overflow-hidden rounded-2xl bg-card border p-8 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      
                      <div className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all duration-300">
                        Saiba mais
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

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
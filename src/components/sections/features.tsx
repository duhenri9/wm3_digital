'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Sparkles,
    title: 'SocialFlux',
    description: 'Automação inteligente para redes sociais',
    href: '/servicos/socialflux',
    color: 'from-blue-500 to-cyan-500',
    status: 'Disponível'
  },
  {
    icon: Shield,
    title: 'SubHub',
    description: 'Plataforma de gestão de assinaturas',
    href: '/servicos/subhub',
    color: 'from-green-500 to-emerald-500',
    status: 'Early Adopters'
  },
  {
    icon: Rocket,
    title: 'HumanTic',
    description: 'Soluções avançadas de IA e automação',
    href: '/servicos/humantic',
    color: 'from-purple-500 to-violet-500',
    status: 'Early Adopters'
  },
  {
    icon: Clock,
    title: 'Design SaaS',
    description: 'Soluções de Design, Desenvolvimento Web, Identidade Visual, WebSites, Landing Pages e muito mais (Implementações e projetos a partir de R$ 652,00)',
    href: '/servicos/design-saas',
    color: 'from-orange-500 to-red-500',
    status: 'Early Adopters'
  }
];

const funilQueVende = {
  icon: Sparkles,
  title: 'Funil que Vende+',
  description: 'Sistema completo de automação de vendas - do lead à conversão com IA avançada',
  href: '/servicos/funil-que-vende',
  color: 'from-[#0066FF] to-[#00D1FF]',
  status: 'Disponível',
  price: 'Soluções a partir de R$ 1.500,00'
};

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

        {/* Funil que Vende+ - Destaque Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0066FF] to-[#00D1FF] p-1">
            <div className="bg-card rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D1FF] text-white mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#0066FF] to-[#00D1FF] bg-clip-text text-transparent">
                    {funilQueVende.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {funilQueVende.description}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-700 dark:text-green-300">
                      {funilQueVende.status}
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {funilQueVende.price}
                    </span>
                  </div>
                  <Link href={funilQueVende.href}>
                    <button className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D1FF] text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#0066FF]/25 hover:scale-105">
                      Conhecer o Funil que Vende+
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-[#00D1FF]/20 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                    <h4 className="font-bold text-lg mb-4">Principais Benefícios:</h4>
                    <ul className="space-y-3 list-none">
                      <li className="flex items-center gap-3 before:content-[''] before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:flex-shrink-0">
                        Automação completa de vendas
                      </li>
                      <li className="flex items-center gap-3 before:content-[''] before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:flex-shrink-0">
                        IA para qualificação de leads
                      </li>
                      <li className="flex items-center gap-3 before:content-[''] before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:flex-shrink-0">
                        Integração WhatsApp e e-mail
                      </li>
                      <li className="flex items-center gap-3 before:content-[''] before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:flex-shrink-0">
                        ROI superior a 200%
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Outros Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="relative overflow-hidden rounded-2xl bg-card border p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          feature.status === 'Disponível' ? 'bg-green-500/20 text-green-700 dark:text-green-300' :
                          feature.status === 'Early Adopters' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                          'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                        }`}>
                          {feature.status}
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
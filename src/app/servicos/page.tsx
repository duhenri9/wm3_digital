'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { serviceOfferings } from '@/data';

const serviceIds = ['design-saas', 'funil-que-vende', 'socialflux'];
const upcomingServices = new Set(['funil-que-vende', 'socialflux']);

const services = serviceOfferings.filter((service) => serviceIds.includes(service.id));

const testimonials = [
  {
    name: 'Carlos Silva',
    company: 'TechStart',
    role: 'CEO',
    content: 'A WM3 Digital transformou completamente nossa presença digital. O aumento de conversões foi impressionante.',
    avatar: '/avatars/rafael-costa.jpg'
  },
  {
    name: 'Ana Costa',
    company: 'InnovaSaaS',
    role: 'Founder',
    content: 'Profissionais excepcionais! Entregaram exatamente o que precisávamos para validar nosso MVP.',
    avatar: '/avatars/maria-santos.jpg'
  },
  {
    name: 'Roberto Lima',
    company: 'AutoFlow',
    role: 'CTO',
    content: 'A automação implementada pela WM3 nos economiza 20 horas por semana. ROI fantástico!',
    avatar: '/avatars/andre-silva.jpg'
  }
];

export default function ServicosPage() {
  return (
    <div className="container py-16 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Serviços WM3
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Soluções completas para transformar suas ideias em produtos digitais de sucesso
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
      >
        <div className="p-6 rounded-lg border bg-card">
          <div className="text-3xl font-bold text-primary mb-2">3</div>
          <div className="text-sm text-foreground">Serviços Especializados</div>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <div className="text-3xl font-bold text-primary mb-2">+5x</div>
          <div className="text-sm text-foreground">ROI Médio dos Clientes</div>
        </div>
        <div className="p-6 rounded-lg border bg-card">
           <div className="text-3xl font-bold text-primary mb-2">91%</div>
           <div className="text-sm text-foreground">Taxa de Satisfação</div>
         </div>
        <div className="p-6 rounded-lg border bg-card">
          <div className="text-3xl font-bold text-primary mb-2">24/7</div>
          <div className="text-sm text-foreground">Suporte Especializado</div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-8"
      >
        <h2 className="text-2xl font-bold text-center">Serviços WM3</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const isUpcoming = upcomingServices.has(service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      {isUpcoming ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.45em] bg-slate-900/80 text-white/90 shadow-[0_12px_36px_-24px_rgba(2,6,23,0.7)]">
                          UPCOMING
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            service.status === 'Disponível'
                              ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                              : service.status === 'Early Adopters'
                              ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                              : 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                          }`}
                        >
                          {service.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags?.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-primary">
                      {service.price ?? 'Sob consulta'}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link
                      href={service.href}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Ver Serviço
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-8"
      >
        <h2 className="text-2xl font-bold text-center">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center space-x-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-2xl border border-white/10"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Pronto para transformar sua ideia em realidade?</h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Escolha o serviço ideal para seu negócio e comece a ver resultados reais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary ring-offset-background transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Começar Projeto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <span className="text-xs text-white/60">Consultoria gratuita • Proposta personalizada</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

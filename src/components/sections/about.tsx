'use client';

import { motion, useInView } from 'framer-motion';
import { Brain, Zap, Target, Users } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const features = [
  {
    icon: Brain,
    title: 'Inteligência Artificial',
    description: 'Soluções powered by IA para automatizar e otimizar seus processos de negócio.'
  },
  {
    icon: Zap,
    title: 'Automação Avançada',
    description: 'Workflows inteligentes que economizam tempo e aumentam a produtividade.'
  },
  {
    icon: Target,
    title: 'Resultados Mensuráveis',
    description: 'Estratégias baseadas em dados para maximizar seu ROI e crescimento.'
  },
  {
    icon: Users,
    title: 'Experiência do Cliente',
    description: 'Interfaces modernas e intuitivas que encantam seus usuários.'
  }
];

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isInView && isClient) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, isClient, end, duration]);

  return (
    <span ref={ref} className="text-3xl font-bold text-primary mb-2">
      {isClient ? count : end}{suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Liderando a <span className="text-primary">Transformação Digital</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Somos uma agência digital especializada em IA e automação, 
            criando soluções inovadoras que impulsionam o crescimento dos nossos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Mais de <span className="text-primary">17+ projetos</span> entregues
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Transformamos ideias em soluções digitais que geram resultados reais para nossos clientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-2">
                  <AnimatedCounter end={91} suffix="%" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Satisfação dos Clientes</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="mb-2">
                  <AnimatedCounter end={3} suffix="x" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Aumento Médio de Conversão</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Suporte Especializado</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
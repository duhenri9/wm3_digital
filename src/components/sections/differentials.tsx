'use client';

import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp } from 'lucide-react';

const differentials = [
  {
    id: 'speed',
    icon: Zap,
    title: 'Velocidade AI-First',
    description:
      'Você preenche um formulário, a IA gera o preview, você aprova e recebe a entrega final em minutos.',
    gradient: 'from-primary/10 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    id: 'clarity',
    icon: Target,
    title: 'Clareza de escopo',
    description:
      'Cada ferramenta tem preço fixo e entregáveis definidos. Nada de orçamento infinito.',
    gradient: 'from-secondary/10 to-secondary/5',
    iconColor: 'text-secondary',
  },
  {
    id: 'mindset',
    icon: TrendingUp,
    title: 'Mentalidade SaaS',
    description:
      'Somos obcecados por recorrência, métricas e conversão – não só por estética.',
    gradient: 'from-accent/10 to-accent/5',
    iconColor: 'text-accent',
  },
];

export function DifferentialsSection() {
  return (
    <section className="bg-gradient-to-b from-background to-accent/5">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
          >
            Por que a WM3?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {differentials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="card p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 pt-6 border-t border-border/30">
                  <div
                    className={`h-1 w-12 rounded-full bg-gradient-to-r ${item.gradient} group-hover:w-20 transition-all duration-300`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

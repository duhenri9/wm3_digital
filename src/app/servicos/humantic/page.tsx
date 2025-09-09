'use client';

import { motion } from 'framer-motion';

export default function HumanTicPage() {
  return (
    <div className="container py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          HumanTic
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transforme seus relacionamentos com clientes através de automação inteligente e personalizada
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Personalização Avançada</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Utilize IA para criar experiências únicas e personalizadas para cada cliente
          </p>
        </div>

        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Engajamento Inteligente</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Automatize interações mantendo um toque humano e relevante
          </p>
        </div>

        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Análise Comportamental</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Compreenda padrões e preferências para melhorar relacionamentos
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white sm:p-12 shadow-2xl border border-white/10"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3">Em Desenvolvimento</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-2">
              O HumanTic está sendo construído com as mais avançadas tecnologias de IA para criar agentes verdadeiramente humanizados.
            </p>
            <p className="text-sm text-white/70 mb-8">
              Seja notificado quando estivermos prontos para o lançamento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary ring-offset-background transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group"
              >
                Quero ser notificado
              </a>
              <span className="text-xs text-white/60">Lançamento em breve</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
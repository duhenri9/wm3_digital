'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const comparisons = [
  {
    id: 'pricing',
    label: 'Modelo de preço',
    tokenBased: 'Preço variável conforme uso',
    solutionBased: 'Preço fixo por entrega',
    tokenIcon: X,
    solutionIcon: Check,
  },
  {
    id: 'complexity',
    label: 'Complexidade',
    tokenBased: 'Precisa entender modelos e APIs',
    solutionBased: 'Preenche form, recebe resultado',
    tokenIcon: X,
    solutionIcon: Check,
  },
  {
    id: 'preview',
    label: 'Preview antes de pagar',
    tokenBased: 'Paga para testar',
    solutionBased: 'Vê preview grátis antes de pagar',
    tokenIcon: X,
    solutionIcon: Check,
  },
  {
    id: 'delivery',
    label: 'Entrega',
    tokenBased: 'Precisa processar a resposta',
    solutionBased: 'Recebe entrega final formatada',
    tokenIcon: X,
    solutionIcon: Check,
  },
];

export function ComparisonTable() {
  return (
    <section className="bg-gradient-to-b from-accent/5 to-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold mb-4"
          >
            Por que não cobramos por tokens de IA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Tokens e modelos são infraestrutura. Você não compra
            infraestrutura, compra resultados prontos.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="p-6 text-left text-sm font-semibold text-muted-foreground">
                    Aspecto
                  </th>
                  <th className="p-6 text-center text-base font-semibold">
                    <div className="inline-flex flex-col items-center gap-1">
                      <X className="w-5 h-5 text-destructive" />
                      <span>Pagar por tokens</span>
                    </div>
                  </th>
                  <th className="p-6 text-center text-base font-semibold bg-primary/5">
                    <div className="inline-flex flex-col items-center gap-1">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-primary">
                        Ferramentas prontas WM3
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border-b border-border/30 last:border-0 hover:bg-accent/5 transition-colors"
                  >
                    <td className="p-6 font-medium">{item.label}</td>
                    <td className="p-6 text-center text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <item.tokenIcon className="w-4 h-4 text-destructive shrink-0" />
                        <span className="text-sm">{item.tokenBased}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center bg-primary/5">
                      <div className="flex items-center justify-center gap-2">
                        <item.solutionIcon className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm font-medium">
                          {item.solutionBased}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

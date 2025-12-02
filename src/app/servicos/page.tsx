'use client';

import { motion } from 'framer-motion';
import { aiServices } from '@/data/ai-services';
import { ServiceDetailCard } from '@/components/services/service-detail-card';
import { ComparisonTable } from '@/components/ui/comparison-table';
import { Sparkles } from 'lucide-react';

export default function ServicosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background via-accent/5 to-background py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Ferramentas AI-First
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
            >
              Serviços: ferramentas de IA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Impulsione sua presença on-line com estas ferramentas de IA
              inovadoras.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6 max-w-3xl mx-auto"
            >
              <p className="text-base text-muted-foreground">
                <strong className="text-foreground">Como funciona:</strong>{' '}
                Ferramentas com preço fechado, preview gerado por IA antes de
                pagar, entrega final em minutos, 100% automatizada.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          <div className="space-y-10">
            {aiServices.map((service, index) => (
              <ServiceDetailCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Escolha a ferramenta ideal para o seu desafio e veja o preview
              gerado por IA antes de pagar.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Preview grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Preço fixo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Entrega em minutos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

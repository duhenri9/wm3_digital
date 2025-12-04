'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="bg-gradient-to-t from-accent/5 to-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card p-8 md:p-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20 shadow-xl">
            <div className="text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                Quer ajuda para escolher a ferramenta certa?
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-slate-800 max-w-2xl mx-auto mb-8 leading-relaxed">
                Conte em poucas linhas seu desafio atual. Respondemos com um
                caminho direto e honesto.
              </p>

              {/* CTA Button */}
              <Link
                href="/suporte"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Falar com nosso suporte
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust elements */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Resposta em até 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>Sem compromisso</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>Consultoria gratuita</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

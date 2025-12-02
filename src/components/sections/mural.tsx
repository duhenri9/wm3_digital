'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { muralEntries, type MuralEntry } from '@/data/mural';

interface MuralProps {
  language?: 'pt' | 'en' | 'es';
  autoRotate?: boolean;
  rotationInterval?: number; // in milliseconds
}

export function Mural({
  language = 'pt',
  autoRotate = true,
  rotationInterval = 10000, // 10 seconds
}: MuralProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter entries by language
  const filteredEntries = muralEntries.filter(
    (entry) => !entry.language || entry.language === language
  );

  const currentEntry: MuralEntry = filteredEntries[currentIndex];

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredEntries.length - 1 : prev - 1
    );
  }, [filteredEntries.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === filteredEntries.length - 1 ? 0 : prev + 1
    );
  }, [filteredEntries.length]);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      goToNext();
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval, goToNext]);

  return (
    <section className="bg-gradient-to-b from-background to-accent/5">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-semibold mb-4"
          >
            Mural WM3
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Ideias de quem vive SaaS, IA e recorrência todos os dias – curadas
            pela WM3.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main quote card */}
          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-lg min-h-[280px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEntry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1"
              >
                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl font-medium leading-tight mb-8 text-foreground">
                  &ldquo;{currentEntry.quote}&rdquo;
                </blockquote>

                {/* Author info */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-semibold text-lg text-foreground">
                      {currentEntry.authorName}
                    </div>
                    <div className="text-muted-foreground text-base">
                      {currentEntry.authorTagline}
                    </div>
                  </div>

                  {currentEntry.sourceUrl && (
                    <a
                      href={currentEntry.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <span>Ver fonte</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
              <button
                onClick={goToPrevious}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {/* Indicator dots */}
              <div className="flex items-center gap-2">
                {filteredEntries.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-border/50 hover:bg-border'
                    }`}
                    aria-label={`Ir para insight ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all"
                aria-label="Próximo"
              >
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress bar (optional visual feedback for auto-rotation) */}
          {autoRotate && (
            <div className="mt-4 h-1 bg-border/30 rounded-full overflow-hidden">
              <motion.div
                key={currentIndex}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: rotationInterval / 1000, ease: 'linear' }}
                className="h-full bg-primary/30"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

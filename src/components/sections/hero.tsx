'use client';

import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [text, setText] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'IA & Automação';
  const controls = useAnimation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    let currentIndex = 0;
    setText('');
    setShowCursor(true);
    
    const typeText = () => {
       if (currentIndex < fullText.length) {
         setText(fullText.substring(0, currentIndex + 1));
         currentIndex++;
         setTimeout(typeText, 100);
       }
       // Cursor continues blinking indefinitely after typing is complete
     };
    
    // Start typing after a small delay
    const startDelay = setTimeout(typeText, 500);
    
    return () => {
      clearTimeout(startDelay);
    };
  }, [isClient, fullText]);

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 2 }
        }}
        className="absolute top-40 right-20 w-6 h-6 bg-secondary/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 4 }
        }}
        className="absolute bottom-20 left-1/4 w-3 h-3 bg-accent/30 rounded-full blur-sm"
      />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className="text-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Inovação Digital
            </motion.span> com{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {isClient ? text : fullText}
              {isClient && showCursor && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-primary ml-1"
                >
                  |
                </motion.span>
              )}
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Transforme seu negócio com soluções digitais inovadoras. Descubra como
            a WM3 pode impulsionar sua presença online com tecnologias de ponta.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/servicos"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
              >
                <span className="group-hover:mr-1 transition-all duration-200">Conheça nossos Serviços</span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/projetos"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
              >
                <span className="group-hover:mr-1 transition-all duration-200">Veja nossos Projetos</span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
          

        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <motion.div 
        animate={pulseAnimation}
        className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"
      />
      <motion.div 
        animate={{
          ...pulseAnimation,
          transition: { ...pulseAnimation.transition, delay: 1.5 }
        }}
        className="absolute left-1/4 right-0 bottom-0 -z-10 m-auto h-[200px] w-[200px] rounded-full bg-secondary/15 opacity-30 blur-[80px]"
      />
    </section>
  );
}
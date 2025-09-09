'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Transformar</span> seu Negócio?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Junte-se ao nosso seleto rol de empresas que já transformaram seus resultados com nossas soluções de IA e automação.
          </p>
          
          {/* Design SaaS Payment CTA */}
          <motion.div 
            className="mt-8 flex flex-col items-center justify-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 4px 20px rgba(249, 166, 136, 0.3)",
                  "0 8px 30px rgba(249, 166, 136, 0.4)",
                  "0 4px 20px rgba(249, 166, 136, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <div className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse z-10">
                🔥 Oferta Especial
              </div>
              <Link
                 href="#"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-secondary via-secondary to-primary px-10 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary group relative overflow-hidden"
               >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center gap-2">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                   </svg>
                   <span className="group-hover:mr-1 transition-all duration-200">Design SaaS da WM3: Transforme sua ideia em websites, landing pages e presença digital que conquista.</span>
                   <motion.span
                     initial={{ x: 0 }}
                     whileHover={{ x: 3 }}
                     transition={{ type: "spring", stiffness: 400, damping: 17 }}
                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                   >
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                     </svg>
                   </motion.span>
                </span>
              </Link>
             </motion.div>
             
             {/* Segundo botão CTA */}
             <motion.div
               whileHover={{ scale: 1.05, y: -2 }}
               whileTap={{ scale: 0.98 }}
               transition={{ type: "spring", stiffness: 400, damping: 17 }}
               className="mt-4"
             >
               <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-lg px-8 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 group"
                  style={{ backgroundColor: '#024458' }}
                >
                 <span className="group-hover:mr-1 transition-all duration-200">Quero meu projeto agora!</span>
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
             
             <motion.p 
               className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center max-w-md"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 1.4 }}
             >
               <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
                </svg>
                <strong>Condições especiais para Early-adopters:</strong> De R$ 6,000.00 por R$ 2,300.00 com sinal de R$ 652,00.
             </motion.p>
             
             <motion.p 
               className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center max-w-md"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 1.6 }}
             >
               <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <strong>Pagamento facilitado:</strong> Sinal de R$ 652,00 (pagamento único) + R$ 2.000,00 na entrega final do projeto.
             </motion.p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Consultoria Gratuita</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Converse com nossos especialistas e descubra como nossas soluções de IA e automação podem transformar seu negócio.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                Análise das suas necessidades
              </li>
              <li className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                Demonstração das soluções
              </li>
              <li className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                Proposta personalizada
              </li>
            </ul>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center w-full rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 group"
              >
                <Calendar className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Falar com Especialista
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold mb-6">Nossas Soluções</h3>
            <p className="mb-6 leading-relaxed">
              Conheça nossos produtos especializados em automação, IA e design para impulsionar seu negócio.
            </p>
            <div className="space-y-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="font-semibold text-lg">Design SaaS</h4>
                    <p className="text-sm text-white/95">Design para Micro-SaaS / SaaS / Landing Page e Startups</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-100 border border-green-400/30">✓ Disponível</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="font-semibold text-lg">SocialFlux ∞</h4>
                    <p className="text-sm text-white/95">(Micro-SaaS) de Geração automática de anúncios para Instagram e Redes Sociais</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-100 border border-green-400/30">✓ Disponível</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="font-semibold text-lg">SubHub</h4>
                    <p className="text-sm text-white/95">(SaaS) - Gestão de subscrições e Assinaturas com controle financeiro integrado</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-100 border border-yellow-400/30">✓ Fase Early-adopters</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="font-semibold text-lg">HumanTic</h4>
                    <p className="text-sm text-white/95">(AaaS) - Criação e Gerenciamento de Agentes Humanizados Inteligentes</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-100 border border-blue-400/30">✓ Em Desenvolvimento</span>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/servicos"
                className="inline-flex items-center justify-center w-full rounded-lg bg-white text-primary px-6 py-3 font-medium transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 group"
              >
                Ver Detalhes
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <ArrowRight className="w-4 h-4 group-hover:animate-bounce" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              Sem compromisso
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
              Resposta em 24h
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
              Consultoria especializada
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
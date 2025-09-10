'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FunilQueVendePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.h1 
              className="relative inline-flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 drop-shadow-sm inline-flex items-center">
                Funil que Vende<span style={{color: '#FF3D00'}}>+</span>
              </span>
              <span className="text-base sm:text-lg md:text-xl font-light tracking-widest uppercase text-gray-600 dark:text-gray-400 mt-4 letter-spacing-[0.2em]">by WM3</span>
            </motion.h1>
            <motion.p 
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Do lead à venda, com escala e resultado real.
            </motion.p>
            <motion.button
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Saiba como seu funil pode vender mais
            </motion.button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/10">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            O Desafio das Vendas Online
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Dificuldades Comuns</h3>
              <ul className="space-y-2">
                <li className="flex items-center">✗ Leads que não se convertem em vendas</li>
                <li className="flex items-center">✗ Falta de automação e processos manuais</li>
                <li className="flex items-center">✗ Custos altos com ferramentas</li>
                <li className="flex items-center">✗ Resultados inconsistentes</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Impacto no Negócio</h3>
              <ul className="space-y-2">
                <li className="flex items-center">✗ Crescimento estagnado</li>
                <li className="flex items-center">✗ Perda de oportunidades</li>
                <li className="flex items-center">✗ ROI negativo em marketing</li>
                <li className="flex items-center">✗ Equipe sobrecarregada</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Lead Version */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Como Funciona o Funil que <span className="text-primary">Vende</span><span style={{color: '#FF3D00'}}>+</span>
          </h2>
          <div className="grid gap-8 lg:grid-cols-7">
            {/* Lead Version */}
            <div className="lg:col-span-4 space-y-8">
              <h3 className="text-2xl font-bold text-primary">Para seu Negócio</h3>
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">1. Atração</h4>
                  <p>Conteúdo relevante e anúncios segmentados que atraem seu público ideal.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">2. Captura</h4>
                  <p>Formulário inteligente e chat interativo para qualificar leads.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">3. Qualificação</h4>
                  <p>IA analisa o perfil e sugere o pacote ideal para cada lead.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">4. Nutrição</h4>
                  <p>Sequência personalizada de e-mails, WhatsApp e áudios.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">5. Conversão</h4>
                  <p>Checkout simples e seguro com confirmação automática.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">6. Entrega & Onboarding</h4>
                  <p>Passo a passo claro, templates prontos e suporte dedicado para seu sucesso.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">7. Pós-venda</h4>
                  <p>Acompanhamento contínuo com dicas, relatórios de performance e oportunidades de crescimento.</p>
                </div>
              </div>
            </div>
            {/* Internal Version */}
            <div className="lg:col-span-3 space-y-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400">Tecnologia WM3</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Stack Tecnológico</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Next.js + Supabase (Backend)</li>
                    <li>• n8n (Automação)</li>
                    <li>• unni.chat (Chat/WhatsApp)</li>
                    <li>• sndflw (Áudios)</li>
                    <li>• OpenAI (IA/Copy)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Fluxos de Automação</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Captura → Supabase → n8n</li>
                    <li>• IA Análise → Segmentação</li>
                    <li>• Disparo Multi-canal</li>
                    <li>• Checkout → Confirmação</li>
                    <li>• Onboarding Automático</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Regras de Negócio</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Segmentação B2C/B2B</li>
                    <li>• Score de Qualificação</li>
                    <li>• Gatilhos de Nutrição</li>
                    <li>• Critérios de Upgrade</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Métricas & KPIs</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Taxa de Conversão: &gt;3%</li>
                    <li>• CAC: R$ 150-300</li>
                    <li>• LTV: 3x CAC</li>
                    <li>• ROI: &gt;200%</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Integrações</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• API Gateway</li>
                    <li>• Webhooks</li>
                    <li>• OAuth2</li>
                    <li>• WebSocket</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/5">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Pacotes e Preços
          </h2>
          <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
            {/* B2C Funil Express */}
            <motion.div 
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4">Funil Express</h3>
              <div className="text-4xl font-bold mb-6">R$ 1.500</div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-center">• 1 funil completo</li>
                <li className="flex items-center">• Automação inteligente</li>
                <li className="flex items-center">• Integração WhatsApp</li>
                <li className="flex items-center">• Suporte via chamados</li>
              </ul>
              <button className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Começar agora
              </button>
            </motion.div>

            {/* B2B Funil Profissional */}
            <motion.div 
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4">B2B Funil Profissional</h3>
              <div className="text-4xl font-bold mb-6">R$ 3.000</div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-center">• Funis integrados</li>
                <li className="flex items-center">• Automação avançada</li>
                <li className="flex items-center gap-1">• IA para copywriting (Acesso parcial ao <h4 className="font-semibold text-lg inline text-primary">SocialFlux∞</h4>)</li>
                <li className="flex items-center">• Analytics completo</li>
                <li className="flex items-center">• Suporte Híbrido (IA + Humano)</li>
              </ul>
              <button className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Escolher plano
              </button>
            </motion.div>

            {/* B2B Growth */}
            <motion.div 
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4">B2B Growth</h3>
              <div className="text-4xl font-bold mb-6">R$ 6.000</div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-center">• Funis integrados</li>
                <li className="flex items-center gap-1">• Áudio personalizado (Integração nativa sndflw para Áudios)</li>
                <li className="flex items-center">• Automações Estratégicas + Inteligência para Conversão</li>
                <li className="flex items-center">• Suporte Dedicado</li>
              </ul>
              <button className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Saiba mais
              </button>
            </motion.div>

            {/* B2B Scale */}
            <motion.div 
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4">B2B Scale</h3>
              <div className="text-4xl font-bold mb-6">R$ 9.000</div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-center">• Funis integrados</li>
                <li className="flex items-center">• Automações Estratégicas + Inteligência para Conversão</li>
                <li className="flex items-center gap-1">• IA para anúncios (Acesso completo e ilimitado ao <h4 className="font-semibold text-lg inline text-primary">SocialFlux∞</h4>)</li>
                <li className="flex items-center">• Gestão de tráfego (Orquestração + Inteligência com Insights)</li>
                <li className="flex items-center">• Suporte Prioritário</li>
              </ul>
              <button className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Falar com especialista
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Identifique seu funil atual
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-8">
              Preencha o formulário abaixo para receber uma análise personalizada do seu funil de vendas.
            </p>
            <form className="w-full max-w-[600px] space-y-4">
              <div className="grid gap-4">
                <select className="w-full p-3 border rounded-lg bg-background" required>
                  <option value="">Selecione o tipo de funil atual</option>
                  <option value="nenhum">Não tenho funil estruturado</option>
                  <option value="basico">Funil básico (landing + email)</option>
                  <option value="intermediario">Funil intermediário (automação parcial)</option>
                  <option value="avancado">Funil avançado (multi-canal)</option>
                </select>
                <textarea 
                  className="w-full p-3 border rounded-lg bg-background min-h-[100px]" 
                  placeholder="Descreva suas principais dificuldades ou pontos de melhoria..."
                  required
                />
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg bg-background" 
                  placeholder="Nome completo"
                  required
                />
                <input 
                  type="email" 
                  className="w-full p-3 border rounded-lg bg-background" 
                  placeholder="E-mail profissional"
                  required
                />
                <input 
                  type="tel" 
                  className="w-full p-3 border rounded-lg bg-background" 
                  placeholder="WhatsApp com DDD"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full h-12 bg-primary text-white rounded-lg font-medium shadow hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar análise gratuita
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
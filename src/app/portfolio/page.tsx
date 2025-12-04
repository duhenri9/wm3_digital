'use client';

import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { useState } from 'react';

import { serviceOfferings } from '@/data';

const portfolioIds = ['subhub', 'metrify', 'humantic', 'eryon-core', 'aurion-veridex'];
const portfolio = serviceOfferings.filter((service) => portfolioIds.includes(service.id));

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectName = portfolio.find(p => p.id === selectedProject)?.name || 'Projeto';

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject,
          projectName,
          name: formData.name,
          email: formData.email,
        }),
      });

      let data: { success?: boolean; error?: string } = {};
      try {
        data = await response.json();
      } catch {
        // fallback if server respondeu HTML/erro genérico
        data = { success: false, error: 'Não foi possível ler a resposta do servidor.' };
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao cadastrar');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '' });

      // Fechar modal após 2 segundos
      setTimeout(() => {
        setSelectedProject(null);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Portfólio WM3
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Suite de soluções WM3 disponíveis para acelerar operações, dados e atendimento com governança contínua.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {portfolio.map((service, index) => (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="group h-full rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.15)] backdrop-blur transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">{service.name}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {service.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>{service.price ?? 'Sob consulta'}</span>
              <button
                onClick={() => setSelectedProject(service.id)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1 hover:text-primary/80"
              >
                Entrar na Lista
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Waiting List Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Lista de Espera
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  {portfolio.find(p => p.id === selectedProject)?.name}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Notificaremos você quando houver novidades sobre este projeto.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <div className="py-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    Cadastro realizado!
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    Você receberá atualizações em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                      Erro ao cadastrar. Tente novamente.
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 px-4 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Entrar na Lista
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

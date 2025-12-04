'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio (implementar com API real depois)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aqui você pode adicionar a integração com a API
      console.log('Form data:', formData);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem de contato', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'E-mail',
      value: 'financeiro@wm3digital.com.br',
      href: 'mailto:financeiro@wm3digital.com.br',
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (11) 9 5037-7457',
      href: 'tel:+5511950377457',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'São Paulo • Brasil',
      href: 'https://maps.google.com/?q=São+Paulo',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
            >
              Fale com a WM3
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
            >
              Conte seu desafio e vamos encontrar a solução certa juntos.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="card p-8">
                <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-accent/10"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                        <p className="font-semibold text-foreground">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="card p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <h3 className="text-xl font-semibold mb-4">Horário de Atendimento</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <p><strong className="text-foreground">Segunda a Sexta:</strong> 9h às 18h</p>
                  <p><strong className="text-foreground">Resposta:</strong> Em até 24h</p>
                  <p className="mt-4 text-xs">
                    Para questões urgentes, entre em contato via WhatsApp.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Envie sua Mensagem</h2>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Empresa (opcional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Conte-nos sobre seu desafio ou projeto..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
                    ✓ Mensagem enviada com sucesso! Retornaremos em breve.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                    ✗ Erro ao enviar mensagem. Tente novamente ou entre em contato via e-mail.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  Resposta garantida em até 24 horas úteis
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

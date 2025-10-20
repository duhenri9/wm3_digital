'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, Mail, PhoneCall } from 'lucide-react';

import { serviceOfferings } from '@/data';
import { cn } from '@/lib/utils';

interface LeadFormState {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

const defaultFormState: LeadFormState = {
  name: '',
  email: '',
  company: '',
  interest:
    serviceOfferings.find((service) => service.id === 'humantic')?.name ??
    serviceOfferings[0]?.name ??
    'HumanTic',
  message: '',
};

const contactHighlights = [
  'Arquitetura cocriada entre squads WM3 e equipe do cliente.',
  'Gateway Abacate Pay ↔ MCP e APIs com governança e observabilidade contínuas.',
  'Onboarding em até 30 dias úteis com rotas guiadas.',
];

export function CTASection() {
  const [formState, setFormState] = useState<LeadFormState>(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  );

  const interestOptions = useMemo(
    () => Array.from(new Set(serviceOfferings.map((service) => service.name))),
    [],
  );

  const isSubmitDisabled = useMemo(() => {
    return (
      !formState.name ||
      !formState.email ||
      !formState.interest ||
      !/^\S+@\S+\.\S+$/.test(formState.email) ||
      isSubmitting
    );
  }, [formState, isSubmitting]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const errorMessage =
          (errorBody && typeof errorBody.error === 'string' && errorBody.error) ||
          'Não foi possível enviar seu contato. Tente novamente em instantes.';
        throw new Error(errorMessage);
      }

      const result = await response.json().catch(() => null);
      setFeedback({
        type: 'success',
        message:
          (result && typeof result.message === 'string' && result.message) ||
          'Recebemos seu contato! Um especialista retornará em breve.',
      });
      setFormState(defaultFormState);
    } catch (error) {
      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Erro inesperado ao enviar seu contato. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="container">
        <div className="grid items-start gap-16 lg:grid-cols-[0.95fr,1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Pronto para transformar?
            </span>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Pronto para transformar sua operação?
            </h2>
            <p className="max-w-xl text-lg text-slate-600">
              Fale com nossos especialistas e descubra como HumanTic e Eryon Core geram resultados
              mensuráveis com automação inteligente, atendimento excepcional e monitoramento em
              tempo real.
            </p>

            <ul className="space-y-3 text-sm text-slate-600">
              {contactHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 text-sm text-slate-600">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                <PhoneCall className="h-5 w-5 text-primary" />
                +55 (11) 9 5037-7457
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                <Mail className="h-5 w-5 text-primary" />
                info@wm3digital.com.br
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#humanTic"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition-transform duration-200 hover:-translate-y-1"
              >
                Explorar HumanTic
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#eryon"
                className="inline-flex h-11 items-center justify-center rounded-full border border-transparent bg-slate-900 px-6 text-sm font-semibold text-slate-100 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.6)] transition-transform duration-200 hover:-translate-y-1"
              >
                Ver Eryon Core em ação
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            id="lead-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)]"
          >
            <h3 className="text-2xl font-semibold text-slate-900">
              Vamos desenhar seu próximo ciclo de crescimento
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Preencha o formulário e receba um plano com próximos passos, integrações sugeridas e
              métricas de acompanhamento.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-800">
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Como devemos te chamar?"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-800">
                  E-mail corporativo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="nome@empresa.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-slate-800">
                  Empresa
                </label>
                <input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, company: event.target.value }))
                  }
                  placeholder="Qual empresa você representa?"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-sm font-medium text-slate-800">
                  Solução de interesse
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formState.interest}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, interest: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                >
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-800">
                  Contexto atual
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, message: event.target.value }))
                  }
                  placeholder="Compartilhe desafios ou integrações prioritárias..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {feedback && (
                <div
                  role="status"
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm font-medium',
                    feedback.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-700'
                      : 'bg-red-500/10 text-red-600',
                  )}
                >
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_20px_60px_-24px_rgba(0,102,255,0.55)] transition-transform duration-200 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Enviando...' : 'Quero falar com um especialista'}
                <Calendar className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

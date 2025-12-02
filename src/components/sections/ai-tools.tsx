'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Wand2,
  Eraser,
  ImagePlus,
  Flame,
  QrCode,
  PenLine,
  Palette,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type AiTool = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: 'Disponível' | 'Em breve';
  external?: boolean;
  icon: LucideIcon;
};

const aiTools: AiTool[] = [
  {
    id: 'image-generator',
    title: 'Gerador de imagens',
    description: 'Crie gráficos exclusivos adaptados às necessidades da sua marca.',
    href: '/em-breve?tool=image-generator',
    status: 'Em breve',
    icon: Wand2,
  },
  {
    id: 'bg-remover',
    title: 'Removedor de fundo de imagem',
    description: 'Remova o fundo de qualquer imagem para uma aparência profissional.',
    href: '/em-breve?tool=background-remover',
    status: 'Em breve',
    icon: Eraser,
  },
  {
    id: 'upscaler',
    title: 'Amplificador de imagem',
    description: 'Carregue uma imagem que você deseja melhorar.',
    href: '/em-breve?tool=image-upscaler',
    status: 'Em breve',
    icon: ImagePlus,
  },
  {
    id: 'attention-heatmap',
    title: 'Mapa de calor de atenção',
    description:
      'Visualize o comportamento do usuário para otimizar engajamento e conversões.',
    href: '/servicos/metrify',
    status: 'Disponível',
    icon: Flame,
  },
  {
    id: 'qr-generator',
    title: 'Gerador de código QR',
    description: 'Gere códigos QR instantaneamente a partir de URL, texto e muito mais.',
    href: '/em-breve?tool=qr',
    status: 'Em breve',
    icon: QrCode,
  },
  {
    id: 'content-generator',
    title: 'Gerador de conteúdo',
    description:
      'Crie posts de blog, e-mails ou conteúdo para redes sociais com IA.',
    href: '/servicos/socialflux',
    status: 'Disponível',
    icon: PenLine,
  },
  {
    id: 'logo-creator',
    title: 'Criador de logo',
    description: 'Crie um logo profissional para sua marca em apenas alguns cliques.',
    href: 'https://designsaas.wm3digital.com.br',
    status: 'Disponível',
    external: true,
    icon: Palette,
  },
];

export function AiToolsSection() {
  return (
    <section id="ferramentas-ia" className="bg-[#F8FAFF] py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <Sparkles className="h-4 w-4" />
            Ferramentas de IA da WM3
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 md:text-4xl">
            Impulsione sua presença on-line com IA
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Acesse utilitários inteligentes para acelerar conteúdos, design e análises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {aiTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.article
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.15)] backdrop-blur transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="inline-flex items-center rounded-full bg-slate-100 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-slate-900">{tool.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.45em] ${
                        tool.status === 'Disponível'
                          ? 'bg-slate-900/80 text-white/90 shadow-[0_12px_36px_-24px_rgba(2,6,23,0.7)]'
                          : 'border border-slate-300 text-slate-600'
                      }`}
                    >
                      {tool.status === 'Disponível' ? 'DISPONÍVEL' : 'EM BREVE'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{tool.description}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={tool.href}
                    target={tool.external ? '_blank' : undefined}
                    rel={tool.external ? 'noopener noreferrer' : undefined}
                    aria-label={`Experimentar agora: ${tool.title}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1"
                  >
                    Experimentar agora
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

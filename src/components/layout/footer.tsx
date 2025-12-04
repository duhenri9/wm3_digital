"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { aiServices } from "@/data/ai-services";

const contactDetails = [
  {
    icon: Mail,
    label: "info@wm3digital.com.br",
    href: "mailto:info@wm3digital.com.br",
  },
  {
    icon: Phone,
    label: "+55 (11) 9 5037-7457",
    href: "tel:+5511950377457",
  },
  {
    icon: MapPin,
    label: "São Paulo • Brasil",
    href: "https://maps.google.com/?q=São+Paulo",
  },
];

const companyLinks = [
  { name: "Portfólio", href: "/portfolio" },
  { name: "Projetos", href: "/projetos" },
  { name: "Sobre", href: "/sobre" },
  { name: "Documentação", href: "/documentacao#apis" },
  { name: "Suporte", href: "/suporte" },
  { name: "Em breve", href: "/em-breve" },
];

const legalLinks = [
  { name: "Política de Privacidade", href: "/privacidade" },
  { name: "Termos de Uso", href: "/termos" },
  { name: "Cookies", href: "/cookies" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const solutions = aiServices;
  const getSolutionHref = (solutionId: string) => `/servicos#${solutionId}`;

  return (
    <footer className="relative overflow-hidden bg-[#050C1F] text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr,1fr,1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/wm3-footer-logo.svg"
                alt="WM3 Digital"
                width={180}
                height={64}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-200/80">
              WM3 Digital combina automação inteligente, agentes multimodais e governança de dados
              para acelerar crescimento sustentável em ecossistemas SaaS, B2B e B2C.
            </p>

            <div className="space-y-3 text-sm text-slate-200/80">
              {contactDetails.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 rounded-lg transition-colors duration-200 hover:bg-white/5 hover:text-secondary"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 text-secondary" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/documentacao#apis"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 shadow-inner transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Preview & APIs
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-200 transition-all duration-200 hover:scale-105 hover:border-secondary hover:text-secondary"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
              Ferramentas com preview
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-slate-200/80 sm:grid-cols-2">
              {solutions.map((solution) => (
                <li key={solution.id}>
                  <Link
                    href={getSolutionHref(solution.id)}
                    className="group inline-flex w-full items-start justify-between gap-2 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-white/5 hover:text-secondary"
                  >
                    <span className="inline-flex items-start gap-2">
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                      <span className="font-semibold leading-tight">{solution.name}</span>
                    </span>
                    <span className="inline-flex items-center rounded-full border border-secondary/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                      Preview
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/servicos"
              className="inline-flex items-center text-sm font-semibold text-secondary transition-colors duration-200 hover:text-secondary/80"
            >
              Ver visão geral de serviços
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                Navegação
              </h3>
              <ul className="grid grid-cols-1 gap-2 text-sm text-slate-200/80 sm:grid-cols-2">
                {companyLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="transition-colors duration-200 hover:text-secondary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                Legal & Governança
              </h3>
              <div className="flex flex-wrap gap-3 text-sm text-slate-200/80">
                {legalLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-full border border-white/10 px-3 py-1 transition-colors duration-200 hover:border-secondary hover:text-secondary"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-400">
          <p className="text-center">© {currentYear} WM3 Digital. Todos os direitos reservados.</p>
          <p className="text-center text-slate-400">
            WM3 DIGITAL LTDA - CNPJ: 55.060.419/0001-20.
          </p>
        </div>
      </div>
    </footer>
  );
}

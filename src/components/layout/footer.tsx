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

const serviceLinks = [
  { name: "Design SaaS", href: "/servicos/design-saas" },
  { name: "Funil que Vende+", href: "/servicos/funil-que-vende" },
  { name: "SocialFlux∞", href: "/servicos/socialflux" },
];

const companyLinks = [
  { name: "Sobre", href: "/sobre" },
  { name: "Serviços", href: "/servicos" },
  { name: "Portfólio", href: "/portfolio" },
  { name: "Documentação", href: "/documentacao" },
  { name: "Suporte", href: "/suporte" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

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

// Define a type for the `service` object
interface ServiceLink {
  name: string;
  href: string;
}

const portfolioLinks = [
  { name: "Metrify", href: "/portfolio#metrify" },
  { name: "SubHub", href: "/portfolio#subhub" },
  { name: "HumanTic", href: "/portfolio#humantic" },
  { name: "Eryon Core", href: "/portfolio#eryon-core" },
  { name: "Aurion by Veridex", href: "/portfolio#aurion-veridex" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050C1F] text-slate-200">
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr,1fr] lg:grid-cols-[1.2fr,0.9fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
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
            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              WM3 Digital combina automação inteligente, agentes multimodais e governança de dados para acelerar crescimento sustentável em ecossistemas SaaS, B2B e B2C.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              {contactDetails.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-secondary"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 text-secondary" />
                  <span>{label}</span>
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
              Serviços
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-slate-300">
              {serviceLinks.map((service: ServiceLink) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-secondary"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
              Portfólio WM3
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-slate-300">
              {portfolioLinks.map((portfolio) => (
                <li key={portfolio.name}>
                  <Link
                    href={portfolio.href}
                    className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-secondary"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                    {portfolio.name}
                  </Link>
                </li>
              ))}
            </ul>
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
                Empresa
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
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
                Redes
              </h3>
              <div className="flex gap-3">
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
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} WM3 Digital. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacidade" className="transition-colors duration-200 hover:text-secondary">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="transition-colors duration-200 hover:text-secondary">
              Termos de Uso
            </Link>
            <Link href="/cookies" className="transition-colors duration-200 hover:text-secondary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

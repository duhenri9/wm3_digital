"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Funil que Vende+", href: "/servicos/funil-que-vende" },
    { name: "Design SaaS", href: "/servicos/design-saas" },
    { name: "SocialFlux∞", href: "/servicos/socialflux" },
    { name: "SubHub", href: "/servicos/subhub" },
    { name: "HumanTic", href: "/servicos/humantic" },
  ];

  const company = [
    { name: "Sobre", href: "/sobre" },
    { name: "Projetos", href: "/projetos" },
    { name: "Documentação", href: "/documentacao" },
    { name: "Suporte", href: "/suporte" },
    { name: "Contato", href: "/contato" },
  ];

  const legal = [
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "Termos de Uso", href: "/termos" },
    { name: "Cookies", href: "/cookies" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-t border-slate-200/50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Image
                  src="/wm3-logo.png"
                  alt="WM3 Digital"
                  width={140}
                  height={45}
                  className="h-10 w-auto"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#0066FF] to-[#00D1FF] rounded-full animate-pulse" />
              </div>
            </Link>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Transformamos ideias em soluções digitais inovadoras. 
              Especialistas em SaaS, automação e marketing digital.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600 hover:text-[#0066FF] transition-colors">
                <Mail className="w-4 h-4 text-[#FF3D00]" />
                <span className="text-sm">info@wm3digital.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 hover:text-[#0066FF] transition-colors">
                <Phone className="w-4 h-4 text-[#FF3D00]" />
                <span className="text-sm">+55 (11) 9 5037-7457</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 hover:text-[#0066FF] transition-colors">
                <MapPin className="w-4 h-4 text-[#FF3D00]" />
                <span className="text-sm">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-lg font-bold text-slate-900">Serviços</h3>
            </div>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href}
                    className="group flex items-center gap-2 text-slate-600 hover:text-[#0066FF] transition-all duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-[#00D1FF] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-lg font-bold text-slate-900">Empresa</h3>
            </div>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href}
                    className="group flex items-center gap-2 text-slate-600 hover:text-[#0066FF] transition-all duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-[#00D1FF] group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-lg font-bold text-slate-900">Conecte-se</h3>
            </div>
            
            <p className="text-slate-600 text-sm mb-4">
              Receba novidades sobre tecnologia e inovação digital.
            </p>
            
            {/* Newsletter Form */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D1FF] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#0066FF]/25 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#00D1FF] hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[#0066FF]/25"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#00D1FF] hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[#0066FF]/25"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#00D1FF] hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[#0066FF]/25"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-600">
            <p>&copy; {currentYear} WM3 Digital. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              {legal.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Feito com</span>
            <span className="text-[#FF3D00] animate-pulse">♥</span>
            <span>em São Paulo</span>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#0066FF]/5 to-[#00D1FF]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FF3D00]/5 to-[#0066FF]/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;
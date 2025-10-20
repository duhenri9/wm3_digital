'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Github, Package, Shield, Users, Code, FileText, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DesignSaaSPage() {
  const differentials = [
    {
      icon: <Package className="h-8 w-8" />,
      title: "Entrega 100% do projeto com código-fonte completo e documentação",
      description: "Você recebe tudo: código, assets, websites, landing pages, documentação técnica e guias de implementação."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Projeto totalmente seu, sem dependência da agência",
      description: "Propriedade total do código e design. Você pode modificar, escalar ou migrar quando quiser."
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Pacote pronto para editar, escalar ou integrar",
      description: "Código limpo, modular e bem documentado, pronto para ser expandido pela sua equipe."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Transparência total no processo e entregáveis",
      description: "Acompanhe cada etapa do desenvolvimento com relatórios detalhados e acesso ao repositório."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Garantia de autonomia total sobre o projeto entregue",
      description: "Sem vendor lock-in. Você tem controle completo para evoluir o projeto independentemente."
    }
  ];

  const deliverables = [
    {
      icon: <Github className="h-8 w-8" />,
      title: "Projeto entregue em repositório GitHub com código-fonte completo",
      description: "Acesso total ao repositório privado com histórico de commits e documentação técnica."
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Pacote completo de design + desenvolvimento entregue em formato open",
      description: "Arquivos de design, componentes, websites, landing pages, assets e código-fonte sem restrições de uso."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Você mantém a propriedade total do projeto entregue",
      description: "Licença completa para uso comercial, modificação e distribuição do projeto."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Entrega final garante autonomia total de uso e edição",
      description: "Sua equipe pode assumir o desenvolvimento sem dependência externa."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container py-16 md:py-24 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            Seu projeto, seu controle:
            <br />
            Design SaaS completo
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Eleve seu projeto para o próximo nível com autonomia total, incluindo websites modernos e landing pages de alta conversão
          </p>
        </motion.div>
      </section>

      {/* Nossos Diferenciais Section */}
      <section className="container py-16 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Nossos Diferenciais
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            O que nos torna únicos no mercado de desenvolvimento SaaS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((differential, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/20"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {differential.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground leading-tight">
                    {differential.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {differential.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* O que você recebe Section */}
      <section className="bg-accent/20 py-16">
        <div className="container space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              O que você recebe
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Entrega completa e transparente para sua total autonomia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group p-8 rounded-xl border bg-card hover:shadow-xl transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {deliverable.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground leading-tight">
                      {deliverable.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {deliverable.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 text-white shadow-2xl border border-white/10">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Pronto para ter controle total do seu projeto?
                </h2>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  Transforme sua ideia em um SaaS profissional com entrega completa e autonomia garantida.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <a
                    href="https://pay.hotmart.com/V85229177Y?checkoutMode=10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-lg font-semibold text-primary ring-offset-background transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Quero meu projeto agora!
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    href="#contact"
                    className="inline-flex h-14 items-center justify-center rounded-xl border border-white/30 px-8 text-lg font-semibold text-white ring-offset-background transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Começar agora
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-sm text-white/70">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Pagamento seguro via Stripe</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Início imediato do projeto</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Garantia de autonomia total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="bg-muted/30 border-t">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
          >
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Contato</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>financeiro@wm3digital.com.br</p>
                <p>+55 11 95037-7457</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Suporte</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <Link href="/suporte" className="block hover:text-primary transition-colors">
                  Central de Ajuda
                </Link>
                <Link href="/documentacao" className="block hover:text-primary transition-colors">
                  Documentação
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">WM3 Digital</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/sobre" className="block hover:text-primary transition-colors">
                  Sobre nós
                </Link>
                <Link href="/servicos" className="block hover:text-primary transition-colors">
                  Portfólio WM3
                </Link>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 WM3 Digital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Target, Users, Zap, Award, Heart, Code } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const values = [
  {
    icon: Target,
    title: 'Foco no Cliente',
    description: 'Cada projeto é desenvolvido pensando nas necessidades específicas do cliente e seus usuários finais.'
  },
  {
    icon: Zap,
    title: 'Inovação Constante',
    description: 'Utilizamos as tecnologias mais modernas e práticas inovadoras para entregar soluções de ponta.'
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Código limpo, design impecável e performance otimizada em cada entrega.'
  },
  {
    icon: Heart,
    title: 'Transparência Total',
    description: 'Processo transparente com acompanhamento em tempo real e comunicação clara.'
  }
]

const team = [
  {
    name: 'Eduardo Silva',
    role: 'CEO & Founder',
    description: 'Especialista em desenvolvimento full-stack com mais de 8 anos de experiência em projetos SaaS.',
    image: '/team/eduardo.jpg'
  },
  {
    name: 'Maria Santos',
    role: 'Head of Design',
    description: 'Designer UX/UI com foco em experiências digitais que convertem e encantam usuários.',
    image: '/team/maria.jpg'
  },
  {
    name: 'Carlos Oliveira',
    role: 'Tech Lead',
    description: 'Arquiteto de software especializado em soluções escaláveis e performance otimizada.',
    image: '/team/carlos.jpg'
  }
]

const stats = [
  { number: '17+', label: 'Projetos Entregues' },
  { number: '100%', label: 'Clientes Satisfeitos' },
  { number: '3 anos', label: 'No Mercado' },
  { number: '24h', label: 'Suporte Médio' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Sobre a WM3 Digital
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Transformamos ideias em soluções digitais inovadoras que impulsionam o crescimento dos nossos clientes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Democratizar o acesso a tecnologias de ponta, oferecendo soluções SaaS completas e personalizadas 
                que permitem aos nossos clientes ter total autonomia sobre seus projetos digitais. Acreditamos que 
                cada empresa merece ter controle total sobre sua tecnologia, sem dependências ou limitações.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">Por que existimos?</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Nascemos da frustração de ver empresas presas a soluções limitadas e caras. 
                  Decidimos criar uma alternativa: desenvolvimento SaaS completo com entrega 
                  total do código e propriedade intelectual.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nosso diferencial está na transparência total e na entrega de autonomia 
                  completa aos nossos clientes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-background rounded-2xl p-8 shadow-sm border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  Tecnologia com Propósito
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Cada linha de código é escrita pensando na escalabilidade, 
                  manutenibilidade e na facilidade de evolução do seu projeto.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Os princípios que guiam cada decisão e projeto que desenvolvemos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Números
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Resultados que comprovam nossa dedicação e qualidade
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossa Equipe
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Profissionais apaixonados por tecnologia e inovação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar sua ideia em realidade?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Vamos conversar sobre como podemos ajudar você a criar a solução SaaS dos seus sonhos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/servicos/design-saas"
                className="inline-flex items-center justify-center h-12 px-8 bg-white text-primary rounded-xl font-medium hover:bg-white/90 transition-colors"
              >
                Ver Nossos Serviços
              </Link>
              <Link 
                href="/suporte"
                className="inline-flex items-center justify-center h-12 px-8 border border-white/20 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Falar Conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
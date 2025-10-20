'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const supportOptions = [
  {
    icon: Mail,
    title: 'Email Suporte',
    description: 'Envie sua dúvida por email e receba resposta em até 24h',
    contact: 'suporte@wm3digital.com.br',
    action: 'Enviar Email'
  },
  {
    icon: Phone,
    title: 'Telefone',
    description: 'Fale diretamente com nossa equipe de suporte',
    contact: '+55 11 95037-7457',
    action: 'Ligar Agora'
  },
  {
    icon: MessageCircle,
    title: 'Chat Online',
    description: 'Converse em tempo real com nossos especialistas',
    contact: 'Disponível das 9h às 18h',
    action: 'Iniciar Chat'
  }
]

const faqItems = [
  {
    question: 'Como funciona o processo de desenvolvimento?',
    answer: 'Nosso processo é dividido em etapas claras: análise de requisitos, prototipagem, desenvolvimento, testes e entrega. Você acompanha cada fase através de relatórios detalhados.'
  },
  {
    question: 'Quanto tempo leva para desenvolver um projeto?',
    answer: 'O prazo varia conforme a complexidade do projeto. Projetos simples levam de 2-4 semanas, enquanto projetos complexos podem levar de 6-12 semanas.'
  },
  {
    question: 'Vocês oferecem suporte pós-entrega?',
    answer: 'Sim! Oferecemos 30 dias de suporte gratuito pós-entrega para correções e ajustes. Também temos planos de manutenção mensal disponíveis.'
  },
  {
    question: 'Posso modificar o projeto após a entrega?',
    answer: 'Absolutamente! Você recebe o código-fonte completo e pode modificar, expandir ou migrar o projeto quando quiser. Não há vendor lock-in.'
  },
  {
    question: 'Quais tecnologias vocês utilizam?',
    answer: 'Trabalhamos com tecnologias modernas como React, Next.js, Node.js, TypeScript, Tailwind CSS, e bancos de dados como PostgreSQL e MongoDB.'
  }
]

export default function SupportePage() {
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
              Central de Ajuda
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Estamos aqui para ajudar você em cada etapa do seu projeto
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como podemos ajudar?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Escolha a melhor forma de entrar em contato conosco
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {option.description}
                  </p>
                  <p className="text-sm font-medium text-primary mb-6">
                    {option.contact}
                  </p>
                  <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                    {option.action}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-8 shadow-sm border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ainda precisa de ajuda?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Nossa equipe está sempre disponível para esclarecer suas dúvidas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>financeiro@wm3digital.com.br</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>+55 11 95037-7457</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Code, Zap, Shield, Globe, Database } from 'lucide-react'
import Link from 'next/link'

const documentationSections = [
  {
    icon: Code,
    title: 'Guias de Desenvolvimento',
    description: 'Documentação técnica completa para desenvolvedores',
    items: [
      'Setup e configuração do ambiente',
      'Estrutura de arquivos e pastas',
      'Padrões de código e boas práticas',
      'Guia de componentes reutilizáveis'
    ]
  },
  {
    icon: Zap,
    title: 'APIs e Integrações',
    description: 'Documentação de APIs e serviços externos',
    items: [
      'Endpoints e métodos disponíveis',
      'Autenticação e autorização',
      'Exemplos de requisições',
      'Tratamento de erros'
    ]
  },
  {
    icon: Database,
    title: 'Banco de Dados',
    description: 'Estrutura e modelagem de dados',
    items: [
      'Schema e relacionamentos',
      'Migrations e seeds',
      'Queries otimizadas',
      'Backup e recuperação'
    ]
  },
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Práticas de segurança implementadas',
    items: [
      'Autenticação JWT',
      'Validação de dados',
      'Proteção CSRF',
      'Rate limiting'
    ]
  },
  {
    icon: Globe,
    title: 'Deploy e Produção',
    description: 'Guias para deploy e manutenção',
    items: [
      'Configuração de servidores',
      'CI/CD pipelines',
      'Monitoramento e logs',
      'Escalabilidade'
    ]
  },
  {
    icon: FileText,
    title: 'Documentação do Usuário',
    description: 'Manuais para usuários finais',
    items: [
      'Como usar o sistema',
      'Funcionalidades principais',
      'Troubleshooting',
      'FAQ técnico'
    ]
  }
]

const techStack = [
  { name: 'Next.js', description: 'Framework React para produção' },
  { name: 'TypeScript', description: 'JavaScript tipado para maior segurança' },
  { name: 'Tailwind CSS', description: 'Framework CSS utilitário' },
  { name: 'Framer Motion', description: 'Biblioteca de animações' },
  { name: 'Prisma', description: 'ORM moderno para banco de dados' },
  { name: 'NextAuth.js', description: 'Autenticação completa' }
]

export default function DocumentationPage() {
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
              Documentação Técnica
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Tudo que você precisa saber para desenvolver, manter e escalar seus projetos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Seções da Documentação
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore nossa documentação completa organizada por categorias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documentationSections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {section.description}
                  </p>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stack Tecnológico
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Tecnologias modernas que utilizamos em nossos projetos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-sm border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Como Começar
              </h2>
              <p className="text-lg text-gray-700">
                Passos básicos para configurar e executar seu projeto
              </p>
            </motion.div>

            <div className="bg-background rounded-2xl p-8 shadow-sm border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">1. Instalação</h3>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <div className="text-gray-600"># Clone o repositório</div>
                    <div>git clone [repository-url]</div>
                    <div className="text-gray-600 mt-2"># Instale as dependências</div>
                    <div>npm install</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">2. Configuração</h3>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <div className="text-gray-600"># Configure as variáveis de ambiente</div>
                    <div>cp .env.example .env.local</div>
                    <div className="text-gray-600 mt-2"># Configure o banco de dados</div>
                    <div>npx prisma migrate dev</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">3. Execução</h3>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <div className="text-gray-600"># Inicie o servidor de desenvolvimento</div>
                    <div>npm run dev</div>
                    <div className="text-gray-600 mt-2"># Acesse em http://localhost:3000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Precisa de Ajuda?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Nossa equipe técnica está disponível para esclarecer dúvidas sobre a documentação
            </p>
            <Link 
              href="/suporte"
              className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Falar com Suporte Técnico
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
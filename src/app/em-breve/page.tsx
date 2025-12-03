'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bell, Calendar, Rocket, Sparkles, Zap, Brain, Target } from 'lucide-react';

const upcomingFeatures = [
  {
    icon: Brain,
    title: 'HumanTic 2.0',
    description: 'Nova versão da nossa plataforma de agentes humanizados com IA ainda mais avançada.',
    status: 'Em Desenvolvimento',
    timeline: 'Q2 2024',
    features: [
      'Processamento de linguagem natural aprimorado',
      'Integração com múltiplas plataformas',
      'Dashboard analytics avançado',
      'API completa para desenvolvedores'
    ],
    color: 'from-[#0066FF] to-[#00D1FF]'
  },
  {
    icon: Zap,
    title: 'AutoFlow Pro',
    description: 'Plataforma completa de automação de workflows empresariais com IA.',
    status: 'Planejamento',
    timeline: 'Q3 2024',
    features: [
      'Automação de processos complexos',
      'Integração com ERPs populares',
      'Machine Learning para otimização',
      'Relatórios em tempo real'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    title: 'ConvertMax',
    description: 'Suite de ferramentas para otimização de conversão com A/B testing automático.',
    status: 'Conceito',
    timeline: 'Q4 2024',
    features: [
      'A/B testing automatizado',
      'Heatmaps e analytics',
      'Otimização por IA',
      'Integração com CRMs'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Sparkles,
    title: 'DesignAI Studio',
    description: 'Ferramenta de design automatizado para criação de materiais visuais com IA.',
    status: 'Pesquisa',
    timeline: 'Q1 2025',
    features: [
      'Geração automática de designs',
      'Templates inteligentes',
      'Branding consistente',
      'Exportação multi-formato'
    ],
    color: 'from-orange-500 to-red-500'
  }
];

const roadmapItems = [
  {
    quarter: 'Q2 2024',
    title: 'Lançamento HumanTic',
    description: 'Primeira versão pública da plataforma de agentes humanizados',
    status: 'active'
  },
  {
    quarter: 'Q3 2024',
    title: 'AutoFlow Pro Beta',
    description: 'Versão beta da plataforma de automação empresarial',
    status: 'upcoming'
  },
  {
    quarter: 'Q4 2024',
    title: 'ConvertMax MVP',
    description: 'Lançamento do MVP da suite de otimização de conversão',
    status: 'upcoming'
  },
  {
    quarter: 'Q1 2025',
    title: 'DesignAI Studio',
    description: 'Ferramenta de design automatizado com IA',
    status: 'planned'
  }
];

const notifications = [
  {
    title: 'Early Access Program',
    description: 'Seja um dos primeiros a testar nossas novas funcionalidades',
    benefit: 'Acesso antecipado + 50% desconto'
  },
  {
    title: 'Beta Testing',
    description: 'Participe dos testes beta e ajude a moldar o futuro dos produtos',
    benefit: 'Feedback direto + Licença gratuita'
  },
  {
    title: 'Launch Updates',
    description: 'Receba notificações sobre lançamentos e novidades',
    benefit: 'Primeira chance de compra'
  }
];

export default function EmBreve() {
  return (
    <div className="container py-16 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Prepare-se para o Novo
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Descubra as inovações que estão por vir e seja o primeiro a experimentar o futuro da tecnologia
        </p>
      </motion.div>

      {/* Coming Soon Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Próximos Lançamentos</h2>
          <p className="text-slate-800">Inovações que vão revolucionar seu negócio</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <div className="relative p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          feature.status === 'Em Desenvolvimento' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' :
                          feature.status === 'Planejamento' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                          feature.status === 'Conceito' ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300' :
                          'bg-gray-500/20 text-gray-700 dark:text-gray-300'
                        }`}>
                          {feature.status}
                        </span>
                        <span className="text-xs text-slate-700 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {feature.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Principais funcionalidades:</h4>
                  <ul className="space-y-1">
                    {feature.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Quero ser notificado
                    <Bell className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Roadmap 2024-2025</h2>
          <p className="text-slate-800">Nossa jornada de inovação</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative flex items-start space-x-6"
              >
                <div className={`relative z-10 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${
                  item.status === 'active' ? 'bg-primary' :
                  item.status === 'upcoming' ? 'bg-yellow-500' :
                  'bg-gray-400'
                }`}>
                  {item.status === 'active' && <Rocket className="w-4 h-4 text-white" />}
                  {item.status === 'upcoming' && <Calendar className="w-4 h-4 text-white" />}
                  {item.status === 'planned' && <Sparkles className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-primary">{item.quarter}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'active' ? 'bg-primary/20 text-primary' :
                      item.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                      'bg-gray-500/20 text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.status === 'active' ? 'Em Andamento' :
                       item.status === 'upcoming' ? 'Próximo' : 'Planejado'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-700">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Notification Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Seja o Primeiro a Saber</h2>
          <p className="text-slate-800">Cadastre-se para receber atualizações exclusivas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{notification.title}</h3>
                </div>
                <p className="text-sm text-slate-700">
                  {notification.description}
                </p>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    {notification.benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-2xl border border-white/10"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Não Perca Nenhuma Novidade</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Seja notificado sobre lançamentos, atualizações e oportunidades exclusivas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <button className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-base font-semibold text-primary ring-offset-background transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">
                Quero ser notificado
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/60">
              <span>• Sem spam</span>
                <span>• Apenas conteúdo relevante</span>
                <span>• Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

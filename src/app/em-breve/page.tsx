import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bell, Calendar, Rocket, Sparkles, Zap, Shield, Clock } from 'lucide-react';
import { getUpcomingProjects } from '@/lib/projects-api';

// Função para obter ícone do projeto
function getProjectIcon(title: string) {
  if (title.includes('SocialFlux')) return Sparkles;
  if (title.includes('SubHub')) return Shield;
  if (title.includes('HumanTic')) return Rocket;
  if (title.includes('Design')) return Clock;
  if (title.includes('Funil')) return Zap;
  return Rocket;
}

// Função para obter cor do projeto
function getProjectColor(title: string): string {
  if (title.includes('SocialFlux')) return 'from-blue-500 to-cyan-500';
  if (title.includes('SubHub')) return 'from-green-500 to-emerald-500';
  if (title.includes('HumanTic')) return 'from-purple-500 to-violet-500';
  if (title.includes('Design')) return 'from-orange-500 to-red-500';
  if (title.includes('Funil')) return 'from-[#0066FF] to-[#00D1FF]';
  return 'from-gray-500 to-gray-600';
}

// Roadmap pode ser mantido ou removido dependendo da necessidade
const roadmapItems: any[] = [];

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

export default async function EmBreve() {
  const upcomingProjects = await getUpcomingProjects();
  
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
          <h2 className="text-2xl font-bold">Projetos em Desenvolvimento</h2>
          <p className="text-muted-foreground">Inovações que estão sendo desenvolvidas e em breve estarão disponíveis</p>
        </div>
        
        {upcomingProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Todos os projetos estão disponíveis!</p>
            <Link
              href="/projetos"
              className="inline-flex items-center text-primary hover:underline"
            >
              Ver projetos disponíveis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingProjects.map((project, index) => {
              const Icon = getProjectIcon(project.title);
              const color = getProjectColor(project.title);
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              project.status === 'Em Desenvolvimento' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' :
                              project.status === 'Early Adopters' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                              project.status === 'Beta' ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300' :
                              project.status === 'Upcoming' ? 'bg-pink-500/20 text-pink-700 dark:text-pink-300' :
                              'bg-gray-500/20 text-gray-700 dark:text-gray-300'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                    
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {project.price && (
                      <div className="pt-2">
                        <span className="text-sm font-semibold text-primary">
                          {project.price}
                        </span>
                      </div>
                    )}
                    
                    {project.links.live && (
                      <div className="pt-4 border-t">
                        <Link
                          href={project.links.live}
                          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Ver detalhes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
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
          <p className="text-muted-foreground">Nossa jornada de inovação</p>
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
                  <p className="text-muted-foreground">{item.description}</p>
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
          <p className="text-muted-foreground">Cadastre-se para receber atualizações exclusivas</p>
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
                <p className="text-sm text-muted-foreground">
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
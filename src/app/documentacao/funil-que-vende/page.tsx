'use client';

import { motion } from 'framer-motion';

export default function FunilQueVendeDocsPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-8 md:p-12 lg:p-24 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <h1 className="text-4xl font-bold mb-8">Documentação Técnica: Funil que Vende+</h1>
        
        {/* Stack Tecnológico */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Stack Tecnológico</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Core</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Hub Central:</span> n8n
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">CRM/Base de Leads:</span> Supabase
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Landing Pages:</span> Next.js
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Integrações</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="font-medium">E-mail Marketing:</span> SMTP/Postmark via n8n
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Chat/WhatsApp:</span> unni.chat + n8n
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Áudio/Voz:</span> sndflw.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Analytics:</span> Supabase + Metabase
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fluxo de Automação */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Fluxo de Automação</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">1. Captura</h3>
              <ul className="space-y-2">
                <li>• Form na landing page envia dados para n8n</li>
                <li>• n8n processa e armazena no Supabase</li>
                <li>• Trigger de classificação automática</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">2. Classificação/Segmentação</h3>
              <ul className="space-y-2">
                <li>• Análise do tipo de funil atual</li>
                <li>• Definição da jornada (B2C/B2B)</li>
                <li>• Score baseado em respostas do form</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">3. Nutrição</h3>
              <ul className="space-y-2">
                <li>• E-mails automáticos com conteúdo via IA</li>
                <li>• Mensagens WhatsApp via unni.chat</li>
                <li>• Áudio personalizado via sndflw (premium)</li>
                <li>• Gatilhos baseados em comportamento</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">4. Conversão</h3>
              <ul className="space-y-2">
                <li>• Página de checkout por pacote</li>
                <li>• Integração com gateway de pagamento</li>
                <li>• Trigger de ativação pós-pagamento</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">5. Entrega</h3>
              <ul className="space-y-2">
                <li>• Onboarding automatizado</li>
                <li>• Envio de templates e docs</li>
                <li>• Agendamento de call inicial</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">6. Fidelização/Upsell</h3>
              <ul className="space-y-2">
                <li>• Monitoramento de uso/resultados</li>
                <li>• Mensagens personalizadas</li>
                <li>• Convites para upgrade de plano</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Regras de Negócio */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Regras de Negócio</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Pacotes e Entregas</h3>
              <ul className="space-y-2">
                <li>• Serviços vendidos como produto pronto</li>
                <li>• Entregas claras e mensuráveis por pacote</li>
                <li>• Upgrades disponíveis após 3 meses</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Automação e IA</h3>
              <ul className="space-y-2">
                <li>• n8n como centro de orquestração</li>
                <li>• IA para copywriting e análise</li>
                <li>• Priorizar ferramentas open-source</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Canais e Comunicação</h3>
              <ul className="space-y-2">
                <li>• WhatsApp como canal principal</li>
                <li>• E-mail para conteúdo extenso</li>
                <li>• Áudio para diferenciação premium</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Métricas Obrigatórias</h3>
              <ul className="space-y-2">
                <li>• CAC por canal e pacote</li>
                <li>• LTV e taxa de retenção</li>
                <li>• ROI por campanha</li>
                <li>• Taxa de conversão por etapa</li>
                <li>• NPS e satisfação</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Procedimentos Internos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Procedimentos Internos</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Documentação</h3>
              <ul className="space-y-2">
                <li>• Manter fluxos n8n versionados</li>
                <li>• Documentar triggers e webhooks</li>
                <li>• Atualizar templates mensalmente</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Testes e QA</h3>
              <ul className="space-y-2">
                <li>• Testar fluxos em ambiente staging</li>
                <li>• Validar integrações semanalmente</li>
                <li>• Simular jornadas completas</li>
              </ul>
            </div>

            <div className="p-6 bg-accent/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Relatórios</h3>
              <ul className="space-y-2">
                <li>• Dashboard automatizado via IA</li>
                <li>• Alertas de performance</li>
                <li>• Relatórios semanais por cliente</li>
              </ul>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
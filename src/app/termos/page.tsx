'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Termos de Uso</h1>
                <p className="text-muted-foreground mt-2">Última atualização: 16 de Outubro de 2025</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ao acessar e usar os serviços da WM3 Digital, você concorda em cumprir e estar vinculado aos
                  seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá
                  utilizar nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descrição dos Serviços</h2>
                <p className="text-gray-600 leading-relaxed">
                  A WM3 Digital oferece soluções digitais incluindo, mas não se limitando a:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Design SaaS e desenvolvimento de aplicações web</li>
                  <li>Automação de marketing e vendas (Funil que Vende+)</li>
                  <li>Plataformas SaaS (SocialFlux, SubHub, HumanTic, Metrify, Eryon, Aurion)</li>
                  <li>Consultoria em transformação digital</li>
                  <li>Desenvolvimento de websites e landing pages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cadastro e Conta</h2>
                <p className="text-gray-600 leading-relaxed">
                  Para utilizar certos serviços, você pode precisar criar uma conta. Você é responsável por:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Fornecer informações precisas e atualizadas</li>
                  <li>Manter a confidencialidade de suas credenciais de acesso</li>
                  <li>Todas as atividades realizadas em sua conta</li>
                  <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Uso Aceitável</h2>
                <p className="text-gray-600 leading-relaxed">
                  Você concorda em NÃO utilizar nossos serviços para:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Violar leis ou regulamentos aplicáveis</li>
                  <li>Infringir direitos de propriedade intelectual</li>
                  <li>Transmitir conteúdo ilegal, ofensivo ou prejudicial</li>
                  <li>Realizar ataques, tentativas de invasão ou comprometer a segurança</li>
                  <li>Usar de forma que interfira com outros usuários</li>
                  <li>Fazer engenharia reversa de nossos serviços</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Propriedade Intelectual</h2>
                <p className="text-gray-600 leading-relaxed">
                  Todo o conteúdo, recursos e funcionalidades disponibilizados pela WM3 Digital são de nossa propriedade
                  ou licenciados para nós, e são protegidos por leis de propriedade intelectual. Você não pode:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Copiar, modificar ou distribuir nosso conteúdo sem autorização</li>
                  <li>Usar nossos logos, marcas ou design sem permissão expressa</li>
                  <li>Remover avisos de direitos autorais ou marcas registradas</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  <strong>Código sob titularidade do cliente:</strong> Conforme acordado contratualmente, você mantém
                  propriedade total sobre o código, documentação e arquitetura desenvolvidos especificamente para seu
                  projeto (política &ldquo;sem lock-in&rdquo;).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Pagamentos e Reembolsos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Para serviços pagos:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Os preços estão sujeitos a alterações mediante aviso prévio</li>
                  <li>Pagamentos são processados através de plataformas seguras (Stripe, Hotmart)</li>
                  <li>Política de reembolso específica será informada no momento da contratação</li>
                  <li>Cancelamento de serviços recorrentes pode ser feito a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Garantias e Limitações</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nossos serviços são fornecidos &ldquo;como estão&rdquo;. Embora nos esforcemos para fornecer serviços de alta
                  qualidade, não garantimos que:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Os serviços estarão sempre disponíveis, ininterruptos ou livres de erros</li>
                  <li>Defeitos serão corrigidos imediatamente</li>
                  <li>Os serviços atenderão a todas as suas expectativas</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  A WM3 Digital não será responsável por danos indiretos, incidentais, especiais ou consequenciais
                  decorrentes do uso ou incapacidade de uso de nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. SLA e Uptime</h2>
                <p className="text-gray-600 leading-relaxed">
                  Para serviços SaaS, nos comprometemos com:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Uptime de 99.9% (excluindo manutenções programadas)</li>
                  <li>Suporte técnico em horário comercial (horário de Brasília)</li>
                  <li>Notificação prévia de manutenções programadas</li>
                  <li>Backups regulares de dados</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Rescisão</h2>
                <p className="text-gray-600 leading-relaxed">
                  Podemos suspender ou encerrar seu acesso aos serviços se:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Você violar estes Termos de Uso</li>
                  <li>Houver suspeita de atividade fraudulenta</li>
                  <li>Você não efetuar pagamentos devidos</li>
                  <li>Por motivos legais ou regulatórios</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Alterações nos Termos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão
                  notificadas por e-mail ou através de aviso em nosso site. O uso contínuo dos serviços após as
                  alterações constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Lei Aplicável</h2>
                <p className="text-gray-600 leading-relaxed">
                  Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas
                  serão resolvidas nos tribunais de São Paulo, SP.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contato</h2>
                <p className="text-gray-600 leading-relaxed">
                  Para questões sobre estes Termos de Uso, entre em contato:
                </p>
                <div className="mt-4 p-6 bg-muted rounded-lg">
                  <p className="text-gray-600">
                    <strong>WM3 Digital</strong><br />
                    Email: info@wm3digital.com.br<br />
                    Telefone: +55 (11) 9 5037-7457<br />
                    Endereço: São Paulo, SP - Brasil
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

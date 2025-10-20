'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacidadePage() {
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
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Política de Privacidade</h1>
                <p className="text-muted-foreground mt-2">Última atualização: 16 de Outubro de 2025</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Informações que Coletamos</h2>
                <p className="text-gray-600 leading-relaxed">
                  Na WM3 Digital, respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais.
                  Coletamos informações quando você:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Preenche formulários de contato em nosso site</li>
                  <li>Solicita demonstrações de nossos produtos</li>
                  <li>Assina nossa newsletter ou materiais informativos</li>
                  <li>Utiliza nossos serviços e plataformas SaaS</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Como Usamos suas Informações</h2>
                <p className="text-gray-600 leading-relaxed">
                  Utilizamos as informações coletadas para:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Responder às suas solicitações e dúvidas</li>
                  <li>Enviar comunicações sobre nossos produtos e serviços</li>
                  <li>Personalizar sua experiência em nossas plataformas</li>
                  <li>Analisar o uso de nossos serviços para melhorias contínuas</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Compartilhamento de Dados</h2>
                <p className="text-gray-600 leading-relaxed">
                  A WM3 Digital não vende, aluga ou compartilha seus dados pessoais com terceiros para fins de marketing.
                  Podemos compartilhar informações apenas:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Com provedores de serviços que nos auxiliam nas operações (ex: hospedagem, analytics)</li>
                  <li>Quando exigido por lei ou processo legal</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Segurança dos Dados</h2>
                <p className="text-gray-600 leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso
                  não autorizado, alteração, divulgação ou destruição, incluindo:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Criptografia SSL/TLS para transmissão de dados</li>
                  <li>Armazenamento seguro em servidores protegidos</li>
                  <li>Controles de acesso rigorosos</li>
                  <li>Monitoramento contínuo de segurança</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Seus Direitos (LGPD)</h2>
                <p className="text-gray-600 leading-relaxed">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Confirmar a existência de tratamento de seus dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                  <li>Revogar seu consentimento</li>
                  <li>Obter informações sobre o compartilhamento de dados</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies e Tecnologias Similares</h2>
                <p className="text-gray-600 leading-relaxed">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e
                  personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do
                  seu navegador. Para mais detalhes, consulte nossa{' '}
                  <Link href="/cookies" className="text-primary hover:underline">
                    Política de Cookies
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Retenção de Dados</h2>
                <p className="text-gray-600 leading-relaxed">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta
                  política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Alterações nesta Política</h2>
                <p className="text-gray-600 leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças
                  significativas através do e-mail cadastrado ou através de aviso em nosso site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contato</h2>
                <p className="text-gray-600 leading-relaxed">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
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

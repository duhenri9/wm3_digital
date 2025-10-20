'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiesPage() {
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
                <Cookie className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Política de Cookies</h1>
                <p className="text-muted-foreground mt-2">Última atualização: 16 de Outubro de 2025</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">O que são Cookies?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site.
                  Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, melhorar a
                  experiência do usuário e fornecer informações aos proprietários do site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Como Usamos Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  A WM3 Digital utiliza cookies para:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                  <li>Manter você conectado enquanto navega pelo site</li>
                  <li>Lembrar suas preferências e configurações</li>
                  <li>Entender como você usa nosso site para melhorá-lo</li>
                  <li>Personalizar conteúdo e anúncios</li>
                  <li>Analisar o tráfego e comportamento dos usuários</li>
                  <li>Fornecer recursos de redes sociais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Tipos de Cookies que Utilizamos</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">1. Cookies Essenciais</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Necessários para o funcionamento básico do site. Sem estes cookies, o site não pode funcionar
                      adequadamente.
                    </p>
                    <div className="mt-3 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Exemplos:</strong> Cookies de sessão, cookies de autenticação
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">2. Cookies de Funcionalidade</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Permitem que o site lembre suas escolhas (como idioma, região) e forneça recursos aprimorados.
                    </p>
                    <div className="mt-3 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Exemplos:</strong> Preferências de idioma, tema escuro/claro
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">3. Cookies de Desempenho e Analytics</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Coletam informações sobre como você usa nosso site, ajudando-nos a melhorar sua funcionalidade
                      e desempenho.
                    </p>
                    <div className="mt-3 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Exemplos:</strong> Google Analytics, métricas de performance
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">4. Cookies de Marketing</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Usados para rastrear visitantes em diferentes sites e exibir anúncios relevantes e envolventes.
                    </p>
                    <div className="mt-3 p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Exemplos:</strong> Pixels de conversão, remarketing
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies de Terceiros</h2>
                <p className="text-gray-600 leading-relaxed">
                  Utilizamos serviços de terceiros que podem definir cookies em seu dispositivo:
                </p>
                <div className="mt-4 space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-semibold text-foreground">Google Analytics</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Para análise de tráfego e comportamento de usuários.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-semibold text-foreground">Vercel Analytics</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Para métricas de performance e experiência do usuário.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-semibold text-foreground">Hotmart / Stripe</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Para processar pagamentos de forma segura.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Gerenciar suas Preferências de Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Você pode controlar e gerenciar cookies de várias maneiras:
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Configurações do Navegador</h3>
                    <p className="text-gray-600 leading-relaxed">
                      A maioria dos navegadores permite que você:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                      <li>Veja quais cookies estão armazenados</li>
                      <li>Delete cookies individuais ou todos</li>
                      <li>Bloqueie cookies de terceiros</li>
                      <li>Bloqueie cookies de sites específicos</li>
                      <li>Bloqueie todos os cookies</li>
                      <li>Delete todos os cookies ao fechar o navegador</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="font-semibold text-amber-900 mb-2">⚠️ Importante</p>
                    <p className="text-sm text-amber-800">
                      Bloquear todos os cookies pode afetar a funcionalidade do site. Alguns recursos podem não
                      funcionar corretamente se você desabilitar cookies essenciais.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Como Gerenciar por Navegador</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <strong>Chrome:</strong>{' '}
                        <a
                          href="https://support.google.com/chrome/answer/95647"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Instruções do Google
                        </a>
                      </li>
                      <li>
                        <strong>Firefox:</strong>{' '}
                        <a
                          href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Instruções da Mozilla
                        </a>
                      </li>
                      <li>
                        <strong>Safari:</strong>{' '}
                        <a
                          href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Instruções da Apple
                        </a>
                      </li>
                      <li>
                        <strong>Edge:</strong>{' '}
                        <a
                          href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Instruções da Microsoft
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Duração dos Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Os cookies que utilizamos têm diferentes durações:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <strong>Cookies de Sessão:</strong> Temporários, deletados quando você fecha o navegador
                  </li>
                  <li>
                    <strong>Cookies Persistentes:</strong> Permanecem no dispositivo por um período determinado
                    (geralmente de 30 dias a 2 anos)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Atualizações desta Política</h2>
                <p className="text-gray-600 leading-relaxed">
                  Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas
                  práticas ou por outros motivos operacionais, legais ou regulatórios. Recomendamos que você
                  revise esta página regularmente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Mais Informações</h2>
                <p className="text-gray-600 leading-relaxed">
                  Para saber mais sobre como tratamos seus dados pessoais, consulte nossa{' '}
                  <Link href="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contato</h2>
                <p className="text-gray-600 leading-relaxed">
                  Se você tiver dúvidas sobre nossa Política de Cookies:
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

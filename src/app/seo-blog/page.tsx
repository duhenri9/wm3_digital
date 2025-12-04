'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Feature {
  title: string;
  what: string;
  why: string;
}

const features: Feature[] = [
  {
    title: 'Resumo direto no topo de cada artigo',
    what: 'Bloco de abertura que resume, em poucas frases, a resposta mais importante do artigo – antes de qualquer enrolação.',
    why: 'IAs e buscadores favorecem respostas claras e objetivas. Quando você deixa a resposta principal bem sinalizada, aumenta a chance de ser citado como referência ou snippet.',
  },
  {
    title: 'Estrutura de conteúdo amigável para humanos e algoritmos',
    what: 'Modelo de artigo com seções bem definidas: contexto, passo a passo, exemplos, FAQ, referências e próximos passos.',
    why: 'Leitores entendem melhor e ficam mais tempo na página. Algoritmos conseguem identificar com precisão o que cada parte do texto está fazendo, o que melhora a compreensão do seu conteúdo.',
  },
  {
    title: 'Blocos de FAQ integrados ao artigo',
    what: 'Espaço dedicado para perguntas e respostas frequentes dentro de cada post, organizado de forma clara.',
    why: 'Perguntas em formato direto aumentam as chances de o seu conteúdo aparecer quando alguém faz exatamente essas mesmas perguntas para buscadores ou IAs.',
  },
  {
    title: 'Destaque de dados e estatísticas importantes',
    what: 'Sessão para números-chave e dados relevantes do artigo, em um formato fácil de ler.',
    why: 'Tanto pessoas quanto IAs adoram dados concretos. Quando você reúne os principais números em um bloco, facilita a citação do seu conteúdo como fonte confiável.',
  },
  {
    title: 'Referências e fontes bem organizadas',
    what: 'Área dedicada a citar de onde vieram dados, estudos ou pesquisas que você utiliza nos artigos.',
    why: 'Isso aumenta a credibilidade do seu conteúdo para o leitor e ajuda buscadores e IAs a identificar que você está se apoiando em fontes confiáveis, não em achismo.',
  },
  {
    title: 'Captura de leads integrada ao seu SaaS',
    what: 'Formulários, CTAs e convites estratégicos para teste, demo ou contato comercial, embutidos no contexto certo dentro do artigo.',
    why: 'SEO sem captura é só visita. O SEO Blog ajuda a transformar tráfego em pipeline: quem gostou do seu conteúdo tem caminhos claros para virar lead.',
  },
  {
    title: 'Atualização simples e contínua do conteúdo',
    what: 'Mecanismos para revisar e marcar quando um artigo foi atualizado, mantendo os temas principais sempre em dia.',
    why: 'Conteúdo antigo e desatualizado perde relevância para leitores, buscadores e IAs. Manter seus materiais vivos é parte essencial da estratégia.',
  },
  {
    title: 'Integração visual com o seu produto',
    what: 'O blog segue o mesmo padrão de design do seu SaaS: tipografia, cores, componentes e estilo.',
    why: 'Passa sensação de produto sólido, profissional e bem cuidado. Quem chega via busca não sente que caiu em um blog genérico; sente que entrou no universo da sua solução.',
  },
];

export default function SeoBlogWaitingListPage() {
  const [name, setName] = useState('');
  const [segment, setSegment] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSuccess(false);

    if (!name.trim() || !segment.trim() || !email.trim()) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/seo-blog/waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          segment: segment.trim(),
          email: email.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao enviar. Tente novamente.');
      }

      setIsSuccess(true);
      setName('');
      setSegment('');
      setEmail('');
    } catch (err) {
      console.error('Erro ao enviar waitlist:', err);
      setErrorMessage('Não foi possível enviar agora. Tente novamente em instantes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-accent/5 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]" />
        </div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center space-y-6"
          >
            <span className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              SEO Blog – seu conteúdo preparado para o Google e para as IAs
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
              Um blog profissional e um hub de conteúdo projetado para aparecer bem no Google, ser
              entendido pelas principais IAs do mercado e transformar visitas em leads qualificados
              para o seu SaaS.
            </h1>
            <div className="flex flex-col items-center gap-4">
              <Link href="#waitlist-form" className="btn btn-primary">
                Entrar na lista de espera
              </Link>
              <p className="text-sm text-muted-foreground max-w-xl">
                Vagas limitadas para a fase inicial. Sem compromisso, sem cartão de crédito. Apenas
                prioridade na fila.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container grid gap-10 md:grid-cols-[1.1fr,1fr] items-start">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">Não é mais só sobre rankear no Google</h2>
            <p className="text-lg text-muted-foreground">
              Durante anos, otimizar conteúdo significava basicamente agradar o algoritmo do Google.
              Isso ainda importa – e muito – mas já não é suficiente.
            </p>
            <p className="text-lg text-muted-foreground">
              Hoje, quando alguém pesquisa sobre um problema, muitas vezes a primeira resposta não
              vem diretamente do Google, e sim de uma IA:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>ChatGPT, Copilot e MetaAI se apoiam em Bing e outras fontes</li>
              <li>Gemini usa dados do próprio Google</li>
              <li>Perplexity combina múltiplos motores e fontes próprias</li>
              <li>Outras IAs fazem o mesmo, cada uma com sua forma de ler e entender conteúdo</li>
            </ul>
            <p className="text-lg text-muted-foreground">
              Ou seja: o jogo não é apenas aparecer na página de resultados. É ser compreendido como
              a melhor resposta pelos sistemas que estão por trás dessas IAs.
            </p>
            <p className="text-lg text-muted-foreground">
              O SEO Blog nasce justamente para isso: organizar o seu conteúdo de forma clara,
              confiável e estruturada, pensando em Google, Bing e nas IAs que se alimentam desses
              ecossistemas.
            </p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-primary/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">O que é o SEO Blog, na prática</h3>
            <p className="text-muted-foreground mb-4">
              O SEO Blog é um módulo de blog e conteúdo profissional para o seu SaaS, criado para:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>organizar seus artigos, guias e materiais de forma clara;</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>aplicar boas práticas de SEO técnico sem você precisar virar especialista;</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>estruturar o conteúdo de um jeito que facilita o trabalho das IAs e dos buscadores;</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>transformar leitores em leads com CTAs e captação integrados ao seu produto.</span>
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Você continua escrevendo para pessoas. Nós ajudamos a entregar isso no formato que os
              algoritmos adoram consumir.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-accent/5">
        <div className="container space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Recursos pensados para SEO real e para a era das IAs
            </h2>
            <p className="text-lg text-muted-foreground">
              Cada entrega foi desenhada para responder bem aos buscadores e às IAs, sem perder foco
              em quem realmente importa: seus leitores e futuros clientes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card h-full p-6 border border-border/60 bg-background shadow-sm"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      O que é
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.what}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                      Por que isso importa
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">Para quem o SEO Blog foi pensado</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>
                  Founders de SaaS que querem construir tráfego orgânico recorrente, sem depender só de
                  anúncios ou lançamentos.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>
                  Times de marketing que precisam de uma base de conteúdo organizada e mensurável.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>
                  Agências que desejam entregar blogs profissionais e prontos para SEO para seus clientes
                  SaaS.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>
                  Negócios digitais que estão migrando de infoprodutos para modelos mais próximos de
                  produto e assinatura.
                </span>
              </li>
            </ul>
            <p className="text-lg text-muted-foreground">
              Se o seu objetivo é ser encontrado por quem já está buscando o que você faz, o SEO Blog
              foi desenhado para você.
            </p>
          </div>
          <div className="card p-6 bg-gradient-to-br from-secondary/5 via-background to-primary/5 border border-secondary/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Por que entrar agora na lista de espera</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                <span>Prioridade no acesso às primeiras vagas e condições especiais de lançamento.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                <span>
                  Oportunidade de influenciar os primeiros ajustes do produto, com feedback direto.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                <span>
                  Conteúdos exclusivos sobre SEO multiplataforma e presença em IAs, enviados apenas para
                  a waiting list.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                <span>
                  Vantagem competitiva: sair na frente enquanto a maioria ainda pensa apenas em SEO
                  tradicional.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="waitlist-form" className="py-16 md:py-20 bg-accent/5">
        <div className="container max-w-4xl">
          <div className="card p-8 md:p-10 border border-border/60 bg-background shadow-xl">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Entre na lista de espera do SEO Blog
              </h2>
              <p className="text-lg text-muted-foreground">
                Preencha seus dados e receba em primeira mão as novidades, a data de lançamento e
                condições especiais para early adopters.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="name">
                    Nome completo <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="segment">
                    Segmento ou ramo de atuação <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="segment"
                    type="text"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    placeholder="Ex.: SaaS B2B para logística, Plataforma de assinatura de cursos, Agência de marketing para SaaS"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="email">
                  E-mail <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              {errorMessage && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorMessage}
                </div>
              )}
              {isSuccess && (
                <div className="rounded-lg border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800">
                  Inscrição enviada! Você receberá as novidades do SEO Blog assim que forem liberadas.
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full md:w-auto"
              >
                {isLoading ? 'Enviando...' : 'Entrar na lista de espera'}
              </button>

              <p className="text-xs text-muted-foreground">
                Usaremos seus dados apenas para comunicar novidades sobre o SEO Blog e conteúdos
                relacionados. Nada de spam.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

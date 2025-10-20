'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Target, Zap, Award, Heart, Code, Users } from 'lucide-react'
import Link from 'next/link'

const values = [
	{
		icon: Target,
		title: 'Foco no Cliente',
		description:
			'Cada projeto é desenvolvido pensando nas necessidades específicas do cliente e seus usuários finais.',
	},
	{
		icon: Zap,
		title: 'Inovação Constante',
		description:
			'Utilizamos as tecnologias mais modernas e práticas inovadoras para entregar soluções de ponta.',
	},
	{
		icon: Award,
		title: 'Qualidade Premium',
		description:
			'Código limpo, design impecável e performance otimizada em cada entrega.',
	},
	{
		icon: Heart,
		title: 'Transparência Total',
		description:
			'Processo transparente com acompanhamento em tempo real e comunicação clara.',
	},
]

const stats = [
	{ number: '17+', label: 'Projetos Entregues' },
	{ number: '100%', label: 'Clientes Satisfeitos' },
	{ number: '3 anos', label: 'No Mercado' },
	{ number: '24h', label: 'Suporte Médio' },
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
							Transformamos ideias em soluções digitais inovadoras que impulsionam o
							crescimento dos nossos clientes
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
								Democratizar o acesso a tecnologias de ponta, oferecendo soluções SaaS
								completas e personalizadas que permitem aos nossos clientes ter total
								autonomia sobre seus projetos digitais. Acreditamos que cada empresa
								merece ter controle total sobre sua tecnologia, sem dependências ou
								limitações.
							</p>
						</motion.div>

						<div className="grid md:grid-cols-2 gap-12 items-center">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<h3 className="text-2xl font-bold text-foreground mb-4">
									Por que existimos?
								</h3>
								<p className="text-gray-600 leading-relaxed mb-6">
									Porque empresas crescem melhor quando dados são confiáveis, processos
									são automatizados e IA trabalha a favor da conversão. Criamos a WM3
									Digital para unir agentes multimodais, automação inteligente e
									governança de dados numa só prática — do SEO ao pós-venda —
									entregando crescimento sustentável com transparência e autonomia para
									o cliente.
								</p>

								<h4 className="text-xl font-semibold text-foreground mb-3">
									Nosso diferencial
								</h4>
								<ul className="list-disc list-inside text-gray-600 mb-6">
									<li className="flex items-start gap-2">
										<Code className="h-5 w-5 text-primary mt-1" />
										Sem lock-in: código, documentação e arquitetura sob sua
										titularidade.
									</li>
									<li className="flex items-start gap-2">
										<Code className="h-5 w-5 text-primary mt-1" />
										Orgânico com performance: SEO orientado a receita (BOFU), não
										‘postagem por postar’.
									</li>
									<li className="flex items-start gap-2">
										<Code className="h-5 w-5 text-primary mt-1" />
										Dados com governança: métricas auditáveis, privacidade e
										rastreabilidade.
									</li>
									<li className="flex items-start gap-2">
										<Code className="h-5 w-5 text-primary mt-1" />
										Execução como squad externo: estratégia → implementação →
										operação.
									</li>
								</ul>

								<h4 className="text-xl font-semibold text-foreground mb-3">
									Proposta de valor
								</h4>
								<ul className="list-disc list-inside text-gray-600">
									<li className="flex items-start gap-2">
										<Code className="h-5 w-5 text-primary mt-1" />
										Automação inteligente: menos tarefas repetitivas, mais rapidez do
										lead ao cliente.
									</li>
									<li className="flex items-start gap-2">
										<Code className="h-5 w-5 text-primary mt-1" />
										Agentes multimodais: IA que entende e opera no seu stack.
									</li>
									<li className="flex items-start gap-2">
										<Code className="h-5 w-5 text-primary mt-1" />
										Governança de dados: decisões confiáveis, compliance e
										mensuração que fecha o ciclo (do clique à receita).
									</li>
								</ul>
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
								<div className="text-gray-600 font-medium">{stat.label}</div>
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
					</div>

					<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-center"
						>
							<div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
								<Users className="h-16 w-16 text-muted-foreground" />
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Ed Henriques
							</h3>
							<p className="text-primary font-medium mb-4">CEO & Co-Founder</p>
							<p className="text-gray-600 leading-relaxed">
								Especialista em desenvolvimento full-stack com mais de 8 anos de
								experiência em projetos WEB.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-center"
						>
							<div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
								<Users className="h-16 w-16 text-muted-foreground" />
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">
								Wai Tak
							</h3>
							<p className="text-primary font-medium mb-4">CFO & Co-Founder</p>
							<p className="text-gray-600 leading-relaxed">
								Engenheiro com experiência internacional em projetos de ponta da Google
								e da Amazon com foco em infraestrutura e serviços a nível global.
							</p>
						</motion.div>
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
							Vamos conversar sobre como podemos ajudar você a criar a solução SaaS
							dos seus sonhos
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/servicos/design-saas"
								className="inline-flex items-center justify-center h-12 px-8 bg-white text-primary rounded-xl font-medium hover:bg-white/90 transition-colors"
							>
								Ver Portfólio WM3
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

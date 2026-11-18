/*
 * All page copy, in both languages.
 *
 * Rules, carried over from the Verbalt copy pass and applied to each language
 * independently:
 *   - one claim in one place;
 *   - a number belongs inside the accomplishment that earned it, never in a
 *     table of its own;
 *   - three roles, no more — the fourth would dilute the first;
 *   - bullets are one sentence.
 *
 * The grafismo leads, the text supports.
 */

import amfinanceShot from '../Assets/previews/amfinance.webp';
import hubsShot from '../Assets/previews/hubs.webp';
import kagebanaShot from '../Assets/previews/kagebana.webp';
import kagebanaTrailerPoster from '../Assets/previews/kagebana-trailer.webp';
import verbaltShot from '../Assets/previews/verbalt.webp';

export const LOCALES = ['en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

/** Not translated: names, addresses and URLs are the same in both languages. */
export const contact = {
	name: 'Marcelo Távora',
	email: 'marcelovtneves@gmail.com',
	linkedin: 'https://www.linkedin.com/in/marcelovtn/',
	// TODO(marcelo): this is the CR3WDev org, carried over from the old site.
	// Point it at your personal profile if you would rather show that.
	github: 'https://github.com/CR3WDev',
} as const;

/*
 * TODO(marcelo): confirm these date ranges before this goes live.
 * Hubs is derived from your own one-year anniversary in May 2026, so it is
 * solid. Verbalt and AM Finance are my best inference and may well be wrong.
 */
export const PERIODS = {
	kagebana: '2026 — present',
	hubs: '2025 — present',
	verbalt: '2024 — present',
	amFinance: '2022 — present',
} as const;

export type Preview = {
	/** Imported WebP, captured from the live site. */
	src: string;
	/** Real encoded pixels of `src`; defaults to 760 × 475. */
	width?: number;
	height?: number;
	alt: string;
	href: string;
	domain: string;
};

/** The trailer is on YouTube; the page only ever loads the player on click. */
export const KAGEBANA_TRAILER = {
	youtubeId: '0lb6eTXIz20',
	poster: kagebanaTrailerPoster,
} as const;

export type Role = {
	company: string;
	role: string;
	context: string;
	period: string;
	bullets: string[];
	stack: string;
	preview: Preview;
};

/** Screens are shared; only the alt text is translated. */
const SHOTS = {
	kagebana: {
		src: kagebanaShot,
		width: 760,
		height: 616,
		href: 'https://kagebana.app/',
		domain: 'kagebana.app',
	},
	hubs: { src: hubsShot, href: 'https://hubs.is/', domain: 'hubs.is' },
	verbalt: { src: verbaltShot, href: 'https://verbalt.com.br/', domain: 'verbalt.com.br' },
	amFinance: {
		src: amfinanceShot,
		href: 'https://www.amfinance.com.br/',
		domain: 'amfinance.com.br',
	},
} as const;

export type Copy = {
	label: string;
	nav: { experience: string; projects: string; about: string; resume: string };
	theme: { toLight: string; toDark: string };
	profile: {
		eyebrow: string;
		headline: string;
		lead: string;
		now: { term: string; value: string }[];
	};
	experience: { label: string; stackLabel: string; roles: Role[] };
	projects: { label: string; items: Role[]; trailer: { play: string; title: string } };
	about: { label: string; lead: string; paragraphs: string[] };
	stack: { label: string; groups: { group: string; items: string }[] };
	closing: {
		label: string;
		headline: string;
		email: string;
		resume: string;
		builtWith: string;
	};
	playfield: { idle: string; cue: string; lines: string; controls: string };
};

/* --- English --------------------------------------------------------------- */

const en: Copy = {
	label: 'English',
	nav: { experience: 'Experience', projects: 'Projects', about: 'About', resume: 'Résumé' },
	theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
	profile: {
		eyebrow: 'Full-stack engineer · Fortaleza, Brazil',
		headline: 'I build products end to end, and keep them fast as they grow.',
		lead: 'Senior engineer at a Silicon Valley startup, leading the front end and working across the stack. I measure before I change anything.',
		now: [
			{ term: 'Now', value: 'Hubs — Silicon Valley, remote' },
			{ term: 'Focus', value: 'Full-stack product work, front-end architecture' },
			{ term: 'Building', value: 'Kagebana — an idle RPG, top 2 on IdleHub.io' },
			{ term: 'Studying', value: 'AI engineering — RAG, agents, evals' },
		],
	},
	experience: {
		label: 'Experience',
		stackLabel: 'Stack',
		roles: [
			{
				company: 'Hubs',
				role: 'Senior full-stack engineer · front-end lead',
				context: 'Silicon Valley startup · remote from Brazil',
				period: PERIODS.hubs,
				bullets: [
					'Own front-end architecture: technical decisions, code review, and the escalation path when production breaks.',
					'Rebuilt the product interface, which had shipped in a state customers could not work with.',
					'Cut the worst render on the heaviest view from 5.3 seconds to 213 milliseconds, by measuring the render path instead of trusting the obvious suspect.',
					'Proved a slow first load was CPU-bound rather than bandwidth-bound, then split routes lazily and took two megabytes out of the eager bundle.',
					'Work across the Node API — endpoints, data modelling and queries — and delivered a full backend improvement plan end to end.',
				],
				stack: 'React · TypeScript · Node.js · NestJS · PostgreSQL · Redis · Playwright',
				preview: { ...SHOTS.hubs, alt: 'The Hubs landing page' },
			},
			{
				company: 'Verbalt',
				role: 'Co-founder · technical lead',
				context: 'Internal systems for technical operations · born in wind energy',
				period: PERIODS.verbalt,
				bullets: [
					'Co-founded a consultancy that builds internal systems for technical operations. We read the operation — its people, processes and data — before writing a line of code.',
					'Lead Mercury, our field-operations platform for a wind-energy service provider: a turbine repair procedure that used to live in an eighteen-section Word document now runs as a guided flow. It is in production, with a second procedure three times larger going in on the same foundation.',
					'Built its API and data model — Hono and Prisma over PostgreSQL, presigned S3 uploads so a technician can attach photos inside a step from the field, and the finished report generated server-side as a PDF.',
					'Set the technical standard the three partners work to, and review what ships.',
					'Designed and built the company site, pulling the brand vectors out of print PDFs and bringing 20 MB of animation under 750 KB.',
				],
				stack: 'Hono · Prisma · PostgreSQL · React · TypeScript · AWS S3 · Puppeteer',
				preview: { ...SHOTS.verbalt, alt: 'The Verbalt site I designed and built' },
			},
			{
				company: 'AM Finance',
				role: 'Founder · full-stack',
				context: 'Personal-finance SaaS · still live',
				period: PERIODS.amFinance,
				bullets: [
					'Built the product front to back: authentication, data model, recurring transactions, reports and deploy.',
					'Ran paid acquisition for six months and converted paying subscribers.',
					'Still running, and still the app I use to manage my own money every day.',
				],
				stack: 'Next.js · TypeScript · Node.js · PostgreSQL',
				preview: { ...SHOTS.amFinance, alt: 'The AM Finance landing page' },
			},
		],
	},
	projects: {
		label: 'Projects',
		trailer: { play: 'Watch the trailer', title: 'Kagebana — trailer' },
		items: [
			{
				company: 'Kagebana',
				role: 'Creator · full-stack',
				context: 'Idle RPG for the browser · live, top 2 on IdleHub.io',
				period: PERIODS.kagebana,
				bullets: [
					'A samurai idle RPG: fights resolve themselves while you build the character, the loot and the talisman tree that win the next one. It ranks top 2 among idle RPGs on IdleHub.io (Nov 2026).',
					'The server is authoritative — every save and trade is validated there, with accounts on Better Auth, a minimum-clear-time anti-cheat floor and Stripe for payments.',
					'Balance is measured, not guessed: I run the combat engine headless against real player builds before shipping a change to damage or the economy, and audit pacing against production data.',
					'Clans, friends, trading and chat between players, in English, Portuguese and Spanish.',
					'Run it in production on Railway, with structured logs shipped to Loki and automated, encrypted database backups.',
				],
				stack: 'React · TypeScript · PixiJS · Hono · Prisma · PostgreSQL · Stripe · Loki',
				preview: { ...SHOTS.kagebana, alt: 'A fight in Kagebana' },
			},
		],
	},
	about: {
		label: 'About',
		lead: 'I am Marcelo. I live in Fortaleza, on the north-east coast of Brazil, and I work remotely with a team in California.',
		paragraphs: [
			'I came up building whole products rather than one layer of them — my own SaaS, a field-operations platform for the wind-energy sector, an idle RPG ranked top 2 on IdleHub.io, and now a product used by paying customers. That is why I work across the stack: I would rather understand the query behind a slow screen than hand the problem to someone else.',
			'What I have specialised in along the way is making things that stay fast once they are big. Measure first, then fix the cause you found rather than the one you assumed.',
			'Off the keyboard I train jiu-jitsu, which is where I learned how to study anything: one system at a time, mapped out, until it stops being technique and becomes instinct.',
		],
	},
	stack: {
		label: 'Toolkit',
		groups: [
			{ group: 'Languages', items: 'TypeScript · JavaScript · Java' },
			{ group: 'Front end', items: 'React · Next.js · Vite · Canvas / SVG · CSS architecture' },
			{ group: 'Back end', items: 'Node.js · NestJS · Hono · Prisma · Spring Boot' },
			{ group: 'Data', items: 'PostgreSQL · Redis · MongoDB' },
			{ group: 'Infra & testing', items: 'AWS S3 · Terraform · Playwright · Jest · Git' },
			{ group: 'AI', items: 'RAG · agents and tool use · evaluations · MCP' },
		],
	},
	closing: {
		label: 'Contact',
		headline: 'Got a hard problem? I would like to hear about it.',
		email: 'Email',
		resume: 'Résumé',
		builtWith: 'Two runtime dependencies. No framework, no webfonts, 59 KB gzipped.',
	},
	playfield: {
		idle: 'Tetris · plays itself',
		cue: 'take over',
		lines: 'Lines',
		controls: '← → ↑ ↓ space · esc',
	},
};

/* --- Português ------------------------------------------------------------- */

const pt: Copy = {
	label: 'Português',
	nav: { experience: 'Experiência', projects: 'Projetos', about: 'Sobre', resume: 'Currículo' },
	theme: { toLight: 'Mudar para tema claro', toDark: 'Mudar para tema escuro' },
	profile: {
		eyebrow: 'Engenheiro full-stack · Fortaleza, Brasil',
		headline: 'Construo produtos de ponta a ponta, e faço eles continuarem rápidos.',
		lead: 'Engenheiro sênior numa startup do Vale do Silício, liderando o front-end e trabalhando em toda a stack. Eu meço antes de mudar qualquer coisa.',
		now: [
			{ term: 'Hoje', value: 'Hubs — Vale do Silício, remoto' },
			{ term: 'Foco', value: 'Produto full-stack, arquitetura de front-end' },
			{ term: 'Construindo', value: 'Kagebana — um RPG idle, top 2 no IdleHub.io' },
			{ term: 'Estudando', value: 'Engenharia de IA — RAG, agents, evals' },
		],
	},
	experience: {
		label: 'Experiência',
		stackLabel: 'Stack',
		roles: [
			{
				company: 'Hubs',
				role: 'Engenheiro full-stack sênior · líder de front-end',
				context: 'Startup do Vale do Silício · remoto do Brasil',
				period: PERIODS.hubs,
				bullets: [
					'Sou dono da arquitetura do front-end: decisões técnicas, code review, e o caminho de escalonamento quando a produção quebra.',
					'Refiz a interface do produto, que estava num estado em que o cliente não conseguia trabalhar.',
					'Reduzi o pior render da tela mais pesada de 5,3 segundos para 213 milissegundos, medindo o caminho de render em vez de confiar no suspeito óbvio.',
					'Provei que a lentidão no primeiro carregamento era de CPU e não de banda, separei as rotas em lazy e tirei dois megabytes do bundle eager.',
					'Trabalho na API em Node — endpoints, modelagem de dados e queries — e entreguei um plano completo de melhorias de backend do início ao fim.',
				],
				stack: 'React · TypeScript · Node.js · NestJS · PostgreSQL · Redis · Playwright',
				preview: { ...SHOTS.hubs, alt: 'A landing page do Hubs' },
			},
			{
				company: 'Verbalt',
				role: 'Sócio-fundador · líder técnico',
				context: 'Sistemas internos para operação técnica · nascida no setor eólico',
				period: PERIODS.verbalt,
				bullets: [
					'Cofundei uma consultoria que constrói sistemas internos para operação técnica. A gente lê a operação — pessoas, processos e dados — antes de escrever a primeira linha.',
					'Lidero o Mercury, nossa plataforma de operação em campo para uma prestadora do setor eólico: um procedimento de reparo de turbina que morava num Word de dezoito seções hoje roda como fluxo guiado. Está no ar, e um segundo procedimento três vezes maior entra agora sobre a mesma base.',
					'Construí a API e o modelo de dados — Hono e Prisma sobre PostgreSQL, upload no S3 com URL pré-assinada pro técnico anexar foto dentro da etapa direto do campo, e o relatório final gerado em PDF no servidor.',
					'Defino o padrão técnico que os três sócios seguem, e reviso o que entra.',
					'Desenhei e construí o site da empresa, tirando os vetores da marca de PDFs de impressão e levando 20 MB de animação para menos de 750 KB.',
				],
				stack: 'Hono · Prisma · PostgreSQL · React · TypeScript · AWS S3 · Puppeteer',
				preview: { ...SHOTS.verbalt, alt: 'O site da Verbalt, que eu desenhei e construí' },
			},
			{
				company: 'AM Finance',
				role: 'Fundador · full-stack',
				context: 'SaaS de finanças pessoais · ainda no ar',
				period: PERIODS.amFinance,
				bullets: [
					'Construí o produto do banco à tela: autenticação, modelo de dados, transações recorrentes, relatórios e deploy.',
					'Rodei tráfego pago por seis meses e converti assinantes pagantes.',
					'Continua no ar, e continua sendo o app em que eu controlo o meu próprio dinheiro todo dia.',
				],
				stack: 'Next.js · TypeScript · Node.js · PostgreSQL',
				preview: { ...SHOTS.amFinance, alt: 'A landing page do AM Finance' },
			},
		],
	},
	projects: {
		label: 'Projetos',
		trailer: { play: 'Assistir ao trailer', title: 'Kagebana — trailer' },
		items: [
			{
				company: 'Kagebana',
				role: 'Criador · full-stack',
				context: 'RPG idle para o navegador · no ar, top 2 no IdleHub.io',
				period: PERIODS.kagebana,
				bullets: [
					'Um RPG idle de samurai: as lutas se resolvem sozinhas enquanto você monta o personagem, o loot e a árvore de talismãs que vencem a próxima. Ele está no top 2 dos RPGs idle do IdleHub.io (nov/2026).',
					'O servidor é a autoridade — todo save e toda troca é validado lá, com contas no Better Auth, um piso anti-cheat de tempo mínimo por fase e Stripe para pagamentos.',
					'Balanceamento medido, não chutado: rodo o motor de combate sem interface contra builds reais de jogadores antes de soltar qualquer mudança de dano ou de economia, e audito o ritmo com dados de produção.',
					'Clãs, amigos, trocas e chat entre jogadores, em inglês, português e espanhol.',
					'Opero em produção no Railway, com logs estruturados no Loki e backups automáticos e criptografados do banco.',
				],
				stack: 'React · TypeScript · PixiJS · Hono · Prisma · PostgreSQL · Stripe · Loki',
				preview: { ...SHOTS.kagebana, alt: 'Uma luta no Kagebana' },
			},
		],
	},
	about: {
		label: 'Sobre',
		lead: 'Sou o Marcelo. Moro em Fortaleza, no litoral do Nordeste, e trabalho remoto com um time na Califórnia.',
		paragraphs: [
			'Eu cresci construindo produtos inteiros, não uma camada deles — meu próprio SaaS, uma plataforma de operação em campo para o setor eólico, um RPG idle no top 2 do IdleHub.io, e hoje um produto usado por quem paga por ele. É por isso que trabalho em toda a stack: prefiro entender a query atrás de uma tela lenta do que passar o problema pra frente.',
			'O que eu acabei especializando no caminho foi fazer coisa que continua rápida depois de ficar grande. Medir primeiro, e depois consertar a causa que apareceu em vez da que eu supus.',
			'Fora do teclado eu treino jiu-jitsu, que é onde aprendi a estudar qualquer coisa: um sistema por vez, mapeado, até deixar de ser técnica e virar instinto.',
		],
	},
	stack: {
		label: 'Ferramentas',
		groups: [
			{ group: 'Linguagens', items: 'TypeScript · JavaScript · Java' },
			{ group: 'Front-end', items: 'React · Next.js · Vite · Canvas / SVG · arquitetura de CSS' },
			{ group: 'Back-end', items: 'Node.js · NestJS · Hono · Prisma · Spring Boot' },
			{ group: 'Dados', items: 'PostgreSQL · Redis · MongoDB' },
			{ group: 'Infra e testes', items: 'AWS S3 · Terraform · Playwright · Jest · Git' },
			{ group: 'IA', items: 'RAG · agents e uso de tools · evals · MCP' },
		],
	},
	closing: {
		label: 'Contato',
		headline: 'Tem um problema difícil? Eu quero saber dele.',
		email: 'E-mail',
		resume: 'Currículo',
		builtWith: 'Duas dependências de runtime. Sem framework, sem webfont, 59 KB gzip.',
	},
	playfield: {
		idle: 'Tetris · joga sozinho',
		cue: 'assuma',
		lines: 'Linhas',
		controls: '← → ↑ ↓ espaço · esc',
	},
};

export const copy: Record<Locale, Copy> = { en, pt };

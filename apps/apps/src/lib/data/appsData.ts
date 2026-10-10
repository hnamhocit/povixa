export type AppType = 'template' | 'showcase';

export type UseCase =
	| 'SaaS & Dashboards'
	| 'E-Commerce & Retail'
	| 'AI & Automation'
	| 'Developer Tools'
	| 'Community & Social';

export type TechStack =
	| 'Next.js'
	| 'SvelteKit'
	| 'NestJS'
	| 'Nuxt'
	| 'Flutter'
	| 'Go Fiber'
	| 'React Native';

export interface AppItem {
	id: string;
	title: string;
	type: AppType;
	useCase: UseCase;
	framework: TechStack;
	author: {
		name: string;
		username: string;
		avatar?: string;
		isOfficial?: boolean;
	};
	description: string;
	tags: string[];
	previewGradient: string;
	demoUrl: string;
	repoUrl?: string;
	isOpenSource?: boolean;
	clonesCount?: number;
	likesCount: number;
	isLiked?: boolean;
	featured?: boolean;
	spotlight?: boolean;
	createdAt: string;
}

export const initialApps: AppItem[] = [
	// 1. Templates / Starters
	{
		id: 'tpl-saas-cloud',
		title: 'Povixa SaaS Cloud Starter',
		type: 'template',
		useCase: 'SaaS & Dashboards',
		framework: 'Next.js',
		author: {
			name: 'Povixa Core Team',
			username: 'povixa_team',
			isOfficial: true
		},
		description: 'Bộ khung khởi tạo SaaS hoàn chỉnh tích hợp sẵn Povixa Auth SSO, phân quyền tổ chức RBAC và thanh toán Stripe.',
		tags: ['Next.js 15', 'Povixa Auth', 'Stripe Billing', 'Tailwind CSS'],
		previewGradient: 'from-blue-600 via-indigo-600 to-violet-700',
		demoUrl: 'https://saas-starter.povixa.dev',
		repoUrl: 'https://github.com/povixa/saas-starter-nextjs',
		isOpenSource: true,
		clonesCount: 2840,
		likesCount: 890,
		isLiked: false,
		featured: true,
		spotlight: true,
		createdAt: '2026-03-15'
	},
	{
		id: 'tpl-storefront-svelte',
		title: 'SvelteKit High-Speed Storefront',
		type: 'template',
		useCase: 'E-Commerce & Retail',
		framework: 'SvelteKit',
		author: {
			name: 'Povixa Core Team',
			username: 'povixa_team',
			isOfficial: true
		},
		description: 'Mẫu sàn thương mại điện tử siêu tốc độ chuẩn bị sẵn giỏ hàng Edge, SSR kết hợp Redis caching và Povixa DB.',
		tags: ['SvelteKit 2', 'Svelte 5 Runes', 'Cart Edge API', 'Povixa DB'],
		previewGradient: 'from-orange-500 via-amber-500 to-rose-600',
		demoUrl: 'https://storefront.povixa.dev',
		repoUrl: 'https://github.com/povixa/sveltekit-ecommerce-starter',
		isOpenSource: true,
		clonesCount: 1920,
		likesCount: 640,
		isLiked: false,
		featured: true,
		spotlight: true,
		createdAt: '2026-03-20'
	},
	{
		id: 'tpl-nest-microservices',
		title: 'NestJS Distributed Microservices',
		type: 'template',
		useCase: 'Developer Tools',
		framework: 'NestJS',
		author: {
			name: 'Povixa Core Team',
			username: 'povixa_team',
			isOfficial: true
		},
		description: 'Kiến trúc Microservices phân tán với BullMQ queues, gRPC liên cụm dịch vụ và OpenTelemetry tracing.',
		tags: ['NestJS 11', 'Bun Runtime', 'BullMQ Redis', 'Observability'],
		previewGradient: 'from-red-600 via-rose-600 to-pink-700',
		demoUrl: 'https://nest-api.povixa.dev',
		repoUrl: 'https://github.com/povixa/nest-distributed-boilerplate',
		isOpenSource: true,
		clonesCount: 3450,
		likesCount: 1120,
		isLiked: false,
		featured: true,
		spotlight: true,
		createdAt: '2026-02-28'
	},
	{
		id: 'tpl-ai-agent-workflow',
		title: 'AI Agent Streaming Chatbot',
		type: 'template',
		useCase: 'AI & Automation',
		framework: 'Next.js',
		author: {
			name: 'Alex Rivera',
			username: 'alex_rivera',
			isOfficial: false
		},
		description: 'Template ứng dụng trợ lý AI tương tác thời gian thực với streaming SSE, function calling và lưu trữ lịch sử.',
		tags: ['Next.js 15', 'LangChain', 'OpenAI SDK', 'Povixa Storage'],
		previewGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
		demoUrl: 'https://ai-agent.myapp.dev',
		repoUrl: 'https://github.com/alexrivera/ai-agent-starter',
		isOpenSource: true,
		clonesCount: 1230,
		likesCount: 410,
		isLiked: false,
		featured: true,
		spotlight: false,
		createdAt: '2026-04-01'
	},
	{
		id: 'tpl-dev-docs-blog',
		title: 'Developer Tech Notes & Docs Hub',
		type: 'template',
		useCase: 'Community & Social',
		framework: 'SvelteKit',
		author: {
			name: 'Hoàng Nam',
			username: 'hnamhocit',
			isOfficial: false
		},
		description: 'Nền tảng tài liệu kỹ thuật tĩnh cao cấp với full-text search, dark/light mode và tối ưu hóa SEO tối đa.',
		tags: ['SvelteKit 5', 'Tailwind v4', 'MDX Parser', 'Fast Search'],
		previewGradient: 'from-violet-600 via-purple-600 to-indigo-800',
		demoUrl: 'https://docs-hub.povixa.dev',
		repoUrl: 'https://github.com/hnamhocit/sveltekit-tech-docs-template',
		isOpenSource: true,
		clonesCount: 850,
		likesCount: 290,
		isLiked: false,
		featured: false,
		spotlight: false,
		createdAt: '2026-03-25'
	},
	{
		id: 'tpl-go-fiber-api',
		title: 'Go Fiber Ultra-Low Latency API Gateway',
		type: 'template',
		useCase: 'Developer Tools',
		framework: 'Go Fiber',
		author: {
			name: 'Marcus Chen',
			username: 'marcus_chen',
			isOfficial: false
		},
		description: 'API gateway siêu nhẹ đạt độ trễ < 2ms, hỗ trợ phân tán rate limit và JWT Token verification tại Anycast edge.',
		tags: ['Go 1.23', 'Fiber v2', 'PostgreSQL 18', 'Redis 8'],
		previewGradient: 'from-cyan-600 via-blue-600 to-sky-700',
		demoUrl: 'https://fiber-gateway.povixa.dev',
		repoUrl: 'https://github.com/marcuschen/go-fiber-starter',
		isOpenSource: true,
		clonesCount: 1100,
		likesCount: 380,
		isLiked: false,
		featured: false,
		spotlight: false,
		createdAt: '2026-03-10'
	},
	{
		id: 'tpl-flutter-bff',
		title: 'Flutter Cross-Platform Mobile Starter',
		type: 'template',
		useCase: 'Community & Social',
		framework: 'Flutter',
		author: {
			name: 'Sarah Connor',
			username: 'sarah_c',
			isOfficial: false
		},
		description: 'Bộ khung ứng dụng di động iOS/Android tích hợp đẩy thông báo APNs/FCM và SSO token exchange mượt mà.',
		tags: ['Flutter 3.29', 'Dart FFI', 'FCM Push', 'Povixa Auth'],
		previewGradient: 'from-sky-500 via-indigo-500 to-blue-700',
		demoUrl: 'https://mobile-starter.povixa.dev',
		repoUrl: 'https://github.com/sarahc/flutter-povixa-starter',
		isOpenSource: true,
		clonesCount: 970,
		likesCount: 310,
		isLiked: false,
		featured: false,
		spotlight: false,
		createdAt: '2026-04-05'
	},

	// 2. Showcase / Made with Povixa
	{
		id: 'showcase-cyberpulse',
		title: 'CyberPulse Security Audit SaaS',
		type: 'showcase',
		useCase: 'SaaS & Dashboards',
		framework: 'Next.js',
		author: {
			name: 'Cyberdyne Labs',
			username: 'cyberdyne_labs',
			isOfficial: false
		},
		description: 'Nền tảng kiểm toán an ninh mạng tự động giám sát hơn 50 triệu sự kiện mỗi ngày trên hạ tầng Povixa Cloud.',
		tags: ['Next.js 15', 'SOC2 Compliance', 'Audit Logs', 'PostgreSQL'],
		previewGradient: 'from-neutral-900 via-indigo-950 to-slate-900',
		demoUrl: 'https://cyberpulse.io',
		isOpenSource: false,
		likesCount: 1420,
		isLiked: false,
		featured: true,
		spotlight: true,
		createdAt: '2026-03-01'
	},
	{
		id: 'showcase-zenith-fashion',
		title: 'Zenith Fashion High-End Retail Store',
		type: 'showcase',
		useCase: 'E-Commerce & Retail',
		framework: 'SvelteKit',
		author: {
			name: 'Zenith Retail Studio',
			username: 'zenith_brands',
			isOfficial: false
		},
		description: 'Thương hiệu thời trang cao cấp phục vụ hơn 80,000 đơn hàng/tháng với tốc độ tải trang dưới 300ms tại Đông Nam Á.',
		tags: ['SvelteKit', 'Shopify Storefront API', 'Edge Cache', 'Povixa CDN'],
		previewGradient: 'from-amber-700 via-orange-800 to-stone-900',
		demoUrl: 'https://zenithfashion.vn',
		repoUrl: 'https://github.com/zenithbrands/storefront-headless',
		isOpenSource: true,
		likesCount: 980,
		isLiked: false,
		featured: true,
		spotlight: false,
		createdAt: '2026-03-18'
	},
	{
		id: 'showcase-neurovoice-ai',
		title: 'NeuroVoice AI Multilingual Podcasting',
		type: 'showcase',
		useCase: 'AI & Automation',
		framework: 'Next.js',
		author: {
			name: 'NeuroVoice Studio',
			username: 'neurovoice_ai',
			isOfficial: false
		},
		description: 'Công cụ tự động chuyển đổi văn bản thành podcast đa giọng đọc sinh động, hỗ trợ hơn 40 ngôn ngữ toàn cầu.',
		tags: ['Next.js 15', 'Voice Synthesis', 'Web Audio API', 'Povixa Storage'],
		previewGradient: 'from-purple-800 via-pink-700 to-rose-900',
		demoUrl: 'https://neurovoice.ai',
		isOpenSource: false,
		likesCount: 1890,
		isLiked: false,
		featured: true,
		spotlight: false,
		createdAt: '2026-03-29'
	},
	{
		id: 'showcase-kubelens',
		title: 'KubeLens Cluster Terminal GUI',
		type: 'showcase',
		useCase: 'Developer Tools',
		framework: 'Go Fiber',
		author: {
			name: 'KubeDevs Open Collective',
			username: 'kubedevs',
			isOfficial: false
		},
		description: 'Giao diện quản lý Kubernetes cluster trực quan nhẹ dưới 15MB RAM, phát hành nguồn mở cho cộng đồng DevOps.',
		tags: ['Go Fiber', 'Kubernetes API', 'Wasm Terminal', 'WebSockets'],
		previewGradient: 'from-blue-700 via-sky-800 to-indigo-900',
		demoUrl: 'https://kubelens.dev',
		repoUrl: 'https://github.com/kubedevs/kubelens-gui',
		isOpenSource: true,
		likesCount: 750,
		isLiked: false,
		featured: false,
		spotlight: false,
		createdAt: '2026-03-05'
	},
	{
		id: 'showcase-indievibe',
		title: 'IndieVibe Creator Community & Forum',
		type: 'showcase',
		useCase: 'Community & Social',
		framework: 'SvelteKit',
		author: {
			name: 'IndieVibe Network',
			username: 'indievibe',
			isOfficial: false
		},
		description: 'Diễn đàn chia sẻ sản phẩm dành cho lập trình viên độc lập với hệ thống bình luận thời gian thực qua WebSockets.',
		tags: ['SvelteKit', 'Povixa Auth', 'Real-time Chat', 'Redis Pub/Sub'],
		previewGradient: 'from-teal-700 via-emerald-800 to-cyan-900',
		demoUrl: 'https://indievibe.community',
		repoUrl: 'https://github.com/indievibe/community-platform',
		isOpenSource: true,
		likesCount: 620,
		isLiked: false,
		featured: false,
		spotlight: false,
		createdAt: '2026-04-02'
	},
	{
		id: 'showcase-autoinvoice',
		title: 'AutoInvoice SME Finance Automation',
		type: 'showcase',
		useCase: 'SaaS & Dashboards',
		framework: 'Next.js',
		author: {
			name: 'FinTech Pro Team',
			username: 'fintech_pro',
			isOfficial: false
		},
		description: 'Phần mềm tự động phát hành hóa đơn điện tử và đối soát thanh toán ngân hàng cho 1,200 doanh nghiệp vừa và nhỏ.',
		tags: ['Next.js', 'PostgreSQL', 'Banking Webhook', 'PDF Edge Gen'],
		previewGradient: 'from-emerald-800 via-teal-900 to-slate-900',
		demoUrl: 'https://autoinvoice.app',
		isOpenSource: false,
		likesCount: 830,
		isLiked: false,
		featured: false,
		spotlight: false,
		createdAt: '2026-03-22'
	}
];

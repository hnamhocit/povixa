<script lang="ts">
	import {
		IconSearch,
		IconStar,
		IconRocket,
		IconBrandGithub,
		IconBrandSvelte,
		IconBrandNextjs,
		IconServer,
		IconBolt,
		IconRobot,
		IconDeviceMobile,
		IconCheck,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
	import DeployModal from '#lib/components/DeployModal.svelte';
	import * as m from '#lib/paraglide/messages.js';

	let category = $state<'all' | 'fullstack' | 'api' | 'ai'>('all');
	let search = $state('');
	let deployModalOpen = $state(false);
	let selectedTemplate = $state<string | null>(null);

	const allTemplates = [
		{
			id: 'tpl-1',
			title: 'SvelteKit 2 + Svelte 5 Fullstack',
			category: 'fullstack',
			desc: 'Modern fullstack application with Svelte 5 runes, Povixa ID OAuth authentication, and Remote Config feature flags.',
			stars: '1.4k',
			framework: 'SvelteKit 2',
			tags: ['Svelte 5', 'Tailwind CSS 4', 'Auth', 'Remote Config'],
			icon: IconBrandSvelte,
			color: 'text-orange-500'
		},
		{
			id: 'tpl-2',
			title: 'NestJS REST & Microservices Gateway',
			category: 'api',
			desc: 'Production-ready NestJS 11 backend server with OpenTelemetry tracing, request ID middleware, and response wrappers.',
			stars: '2.8k',
			framework: 'NestJS 11',
			tags: ['NestJS', 'Bun', 'Distributed Tracing', 'REST'],
			icon: IconServer,
			color: 'text-red-500'
		},
		{
			id: 'tpl-3',
			title: 'Next.js 15 Modern Dashboard Starter',
			category: 'fullstack',
			desc: 'Server Components architecture with dynamic edge rendering, Povixa S3 object uploads, and usage analytics integration.',
			stars: '3.1k',
			framework: 'Next.js 15',
			tags: ['React 19', 'Next.js', 'App Router', 'S3 Storage'],
			icon: IconBrandNextjs,
			color: 'text-blue-500'
		},
		{
			id: 'tpl-4',
			title: 'Go Fiber High-Throughput REST API',
			category: 'api',
			desc: 'Sub-millisecond latency Go service utilizing Povixa telemetry and push notifications.',
			stars: '1.9k',
			framework: 'Go 1.23',
			tags: ['Go', 'Fiber', 'High Concurrency', 'Telemetry'],
			icon: IconBolt,
			color: 'text-cyan-500'
		},
		{
			id: 'tpl-5',
			title: 'Autonomous AI Agent Server',
			category: 'ai',
			desc: 'Self-hosted AI worker supporting tool calling, real-time streaming, and Povixa S3 document embeddings.',
			stars: '4.5k',
			framework: 'Python / FastAPI',
			tags: ['Python', 'FastAPI', 'LLM Agents', 'Vector Embeddings'],
			icon: IconRobot,
			color: 'text-emerald-500'
		},
		{
			id: 'tpl-6',
			title: 'Flutter Cross-Platform Mobile Backend',
			category: 'api',
			desc: 'Complete backend and API spec tailored for iOS & Android Flutter applications with push notifications and session management.',
			stars: '2.2k',
			framework: 'Dart / Shelf',
			tags: ['Flutter', 'APNs', 'FCM', 'Passkeys'],
			icon: IconDeviceMobile,
			color: 'text-indigo-500'
		}
	];

	const filteredTemplates = $derived(
		allTemplates.filter((t) => {
			const matchesCategory = category === 'all' || t.category === category;
			const matchesSearch =
				search.trim() === '' ||
				t.title.toLowerCase().includes(search.toLowerCase()) ||
				t.desc.toLowerCase().includes(search.toLowerCase()) ||
				t.framework.toLowerCase().includes(search.toLowerCase());
			return matchesCategory && matchesSearch;
		})
	);

	function triggerDeploy(tplTitle: string) {
		selectedTemplate = tplTitle;
		deployModalOpen = true;
	}
</script>

<div class="space-y-10 lg:space-y-12">
	<!-- Page Header -->
	<div class="space-y-2 max-w-3xl border-b border-border/50 pb-8">
		<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
			<IconSparkles size={14} />
			<span>Kho Mẫu Dự Án Sẵn Sàng Triển Khai</span>
		</div>
		<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-sans">
			{m.nav_templates()}
		</h1>
		<p class="text-sm text-muted-foreground leading-relaxed">
			Production-tested open-source blueprints with pre-configured Povixa SDK integration. Deploy in seconds on your own infrastructure or Povixa Edge.
		</p>
	</div>

	<!-- Search & Category Filters -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="relative flex-1 max-w-md">
			<IconSearch size={16} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<input
				type="text"
				bind:value={search}
				placeholder="Tìm kiếm mẫu theo công nghệ, stack hoặc từ khóa..."
				class="w-full rounded-xl border border-border/60 bg-secondary/30 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none transition-colors"
			/>
		</div>

		<!-- Category Chips -->
		<div class="flex items-center gap-1 rounded-xl border border-border/50 bg-secondary/30 p-1 text-xs">
			<button
				type="button"
				onclick={() => (category = 'all')}
				class="rounded-lg px-3 py-1.5 font-medium transition-all {category === 'all'
					? 'bg-background text-foreground font-semibold shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				Tất cả
			</button>
			<button
				type="button"
				onclick={() => (category = 'fullstack')}
				class="rounded-lg px-3 py-1.5 font-medium transition-all {category === 'fullstack'
					? 'bg-background text-foreground font-semibold shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				Fullstack
			</button>
			<button
				type="button"
				onclick={() => (category = 'api')}
				class="rounded-lg px-3 py-1.5 font-medium transition-all {category === 'api'
					? 'bg-background text-foreground font-semibold shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				Backend & APIs
			</button>
			<button
				type="button"
				onclick={() => (category = 'ai')}
				class="rounded-lg px-3 py-1.5 font-medium transition-all {category === 'ai'
					? 'bg-background text-foreground font-semibold shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				AI & Agents
			</button>
		</div>
	</div>

	<!-- Templates Grid -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredTemplates as tpl (tpl.id)}
			<div
				class="group relative flex flex-col justify-between rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5"
			>
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/80 {tpl.color}">
							<tpl.icon size={24} stroke={2} />
						</div>
						<div class="flex items-center gap-1.5 rounded-full bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
							<IconStar size={13} class="text-amber-500 fill-amber-500" />
							<span>{tpl.stars}</span>
						</div>
					</div>

					<div>
						<h3 class="font-bold text-base text-foreground group-hover:text-primary transition-colors">
							{tpl.title}
						</h3>
						<p class="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
							{tpl.desc}
						</p>
					</div>

					<!-- Tags -->
					<div class="flex flex-wrap gap-1.5 pt-2">
						{#each tpl.tags as tag}
							<span class="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-foreground">
								{tag}
							</span>
						{/each}
					</div>
				</div>

				<div class="mt-6 pt-4 border-t border-border/40">
					<button
						type="button"
						onclick={() => triggerDeploy(tpl.title)}
						class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
					>
						<IconRocket size={14} />
						<span>Triển khai Mẫu này</span>
					</button>
				</div>
			</div>
		{/each}
	</div>

	<DeployModal bind:open={deployModalOpen} />
</div>

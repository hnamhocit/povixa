<script lang="ts">
	import {
		IconSearch,
		IconFilter,
		IconPlus,
		IconBrandGithub,
		IconRocket,
		IconServer,
		IconRoute,
		IconShieldCheck,
		IconTrendingUp,
		IconActivity
	} from '@tabler/icons-svelte-runes';
	import AppCard, { type AppItem } from '#lib/components/AppCard.svelte';
	import TemplatesShowcase from '#lib/components/TemplatesShowcase.svelte';
	import DeployModal from '#lib/components/DeployModal.svelte';
	import * as m from '#lib/paraglide/messages.js';

	let searchQuery = $state('');
	let envFilter = $state<'All' | 'Production' | 'Staging' | 'Preview'>('All');
	let deployModalOpen = $state(false);

	let apps = $state<AppItem[]>([
		{
			id: 'app-1',
			name: 'storefront-web',
			framework: 'SvelteKit',
			url: 'https://storefront.povixa.app',
			gitRepo: 'povixa/ecommerce-storefront',
			branch: 'main',
			commit: 'f5569c7',
			commitMsg: 'optimize edge caching & SSR bundles',
			status: 'Healthy',
			environment: 'Production',
			region: 'sin1 (Singapore)',
			deployedTime: '12m ago',
			reqCount: '1.4M req/mo'
		},
		{
			id: 'app-2',
			name: 'nest-api-gateway',
			framework: 'NestJS',
			url: 'https://api-gateway.povixa.app',
			gitRepo: 'povixa/backend-nest-api',
			branch: 'main',
			commit: '9cc357e',
			commitMsg: 'prepare backend distributed tracing',
			status: 'Healthy',
			environment: 'Production',
			region: 'iad1 (US-East)',
			deployedTime: '1h ago',
			reqCount: '8.2M req/mo'
		},
		{
			id: 'app-3',
			name: 'developer-portal',
			framework: 'Next.js',
			url: 'https://portal.povixa.app',
			gitRepo: 'povixa/developer-portal',
			branch: 'feat/v2-theme',
			commit: 'bca9cb8',
			commitMsg: 'implement modern dark/light mode',
			status: 'Healthy',
			environment: 'Preview',
			region: 'fra1 (Frankfurt)',
			deployedTime: '4h ago',
			reqCount: '420k req/mo'
		},
		{
			id: 'app-4',
			name: 'telemetry-stream-worker',
			framework: 'Go Service',
			url: 'https://stream.povixa.app',
			gitRepo: 'povixa/telemetry-go-worker',
			branch: 'main',
			commit: '6a96402',
			commitMsg: 'sub-ms ingestion pipeline optimization',
			status: 'Building',
			environment: 'Production',
			region: 'iad1 (US-East)',
			deployedTime: 'Just now',
			reqCount: '18.9M req/mo'
		},
		{
			id: 'app-5',
			name: 'mobile-bff-service',
			framework: 'NestJS',
			url: 'https://mobile-bff.povixa.app',
			gitRepo: 'povixa/mobile-backend',
			branch: 'staging',
			commit: 'd460f9f',
			commitMsg: 'initial commit from create-turbo',
			status: 'Healthy',
			environment: 'Staging',
			region: 'sin1 (Singapore)',
			deployedTime: '1d ago',
			reqCount: '920k req/mo'
		},
		{
			id: 'app-6',
			name: 'documentation-hub',
			framework: 'SvelteKit',
			url: 'https://docs.povixa.app',
			gitRepo: 'povixa/docs-portal',
			branch: 'main',
			commit: 'c1893de',
			commitMsg: 'add interactive api references',
			status: 'Healthy',
			environment: 'Production',
			region: 'iad1 (US-East)',
			deployedTime: '2d ago',
			reqCount: '650k req/mo'
		}
	]);

	const filteredApps = $derived(
		apps.filter((app) => {
			const matchesEnv = envFilter === 'All' || app.environment === envFilter;
			const matchesSearch =
				searchQuery.trim() === '' ||
				app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				app.gitRepo.toLowerCase().includes(searchQuery.toLowerCase()) ||
				app.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
				app.framework.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesEnv && matchesSearch;
		})
	);

	function handleNewDeploy(appData: any) {
		apps.unshift({
			id: `app-${Date.now()}`,
			name: appData.name,
			framework: 'SvelteKit',
			url: `https://${appData.name}.povixa.app`,
			gitRepo: appData.repoUrl,
			branch: appData.branch,
			commit: 'a1b2c3d',
			commitMsg: 'initial deployment triggered',
			status: 'Deploying',
			environment: appData.environment,
			region: 'iad1 (US-East)',
			deployedTime: 'Just now',
			reqCount: '0 req/mo'
		});
	}

	function handleTemplateDeploy(tplTitle: string) {
		const slug = tplTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 20);
		apps.unshift({
			id: `app-${Date.now()}`,
			name: slug,
			framework: tplTitle.includes('Nest') ? 'NestJS' : tplTitle.includes('Next') ? 'Next.js' : tplTitle.includes('Go') ? 'Go Service' : 'SvelteKit',
			url: `https://${slug}.povixa.app`,
			gitRepo: `povixa-templates/${slug}`,
			branch: 'main',
			commit: '88e910a',
			commitMsg: `blueprint deployed from ${tplTitle}`,
			status: 'Deploying',
			environment: 'Production',
			region: 'iad1 (US-East)',
			deployedTime: 'Just now',
			reqCount: '0 req/mo'
		});
	}
</script>

<div class="space-y-10 lg:space-y-12">
	<!-- Spacious Page Header with Live Metric Chips -->
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border/50 pb-8">
		<div class="space-y-2 max-w-2xl">
			<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
				<IconActivity size={14} class="animate-pulse" />
				<span>Mạng Lưới Anycast Edge Toàn Cầu</span>
			</div>
			<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-sans">
				{m.section_apps_title()}
			</h1>
			<p class="text-sm text-muted-foreground leading-relaxed">
				{m.section_apps_desc()}
			</p>
		</div>

		<!-- Action & Lightweight Metric Summary -->
		<div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
			<div class="flex flex-wrap items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 p-1.5 text-xs text-muted-foreground">
				<span class="inline-flex items-center gap-1.5 px-2 py-0.5 font-medium text-foreground">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					<strong>6</strong> Đang chạy
				</span>
				<span>•</span>
				<span class="px-1.5"><strong>142</strong> Deploys</span>
				<span>•</span>
				<span class="px-1.5"><strong>428.5 GB</strong> Bandwidth</span>
			</div>

			<button
				type="button"
				onclick={() => (deployModalOpen = true)}
				class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02]"
			>
				<IconPlus size={16} stroke={2.5} />
				<span>{m.btn_deploy_app()}</span>
			</button>
		</div>
	</div>

	<!-- Applications Management Section -->
	<div class="space-y-6">
		<!-- Search & Filter Controls -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<!-- Search Input -->
			<div class="relative flex-1 max-w-md">
				<IconSearch size={16} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder={m.search_placeholder()}
					class="w-full rounded-xl border border-border/60 bg-secondary/30 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none transition-colors"
				/>
			</div>

			<!-- Environment Tabs -->
			<div class="flex items-center gap-1 rounded-xl border border-border/50 bg-secondary/30 p-1 text-xs">
				<button
					type="button"
					onclick={() => (envFilter = 'All')}
					class="rounded-lg px-3 py-1.5 font-medium transition-all {envFilter === 'All'
						? 'bg-background text-foreground font-semibold shadow-xs'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.filter_all()}
				</button>
				<button
					type="button"
					onclick={() => (envFilter = 'Production')}
					class="rounded-lg px-3 py-1.5 font-medium transition-all {envFilter === 'Production'
						? 'bg-background text-foreground font-semibold shadow-xs'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.filter_prod()}
				</button>
				<button
					type="button"
					onclick={() => (envFilter = 'Staging')}
					class="rounded-lg px-3 py-1.5 font-medium transition-all {envFilter === 'Staging'
						? 'bg-background text-foreground font-semibold shadow-xs'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.filter_staging()}
				</button>
				<button
					type="button"
					onclick={() => (envFilter = 'Preview')}
					class="rounded-lg px-3 py-1.5 font-medium transition-all {envFilter === 'Preview'
						? 'bg-background text-foreground font-semibold shadow-xs'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.filter_preview()}
				</button>
			</div>
		</div>

		<!-- Application Cards Grid -->
		{#if filteredApps.length === 0}
			<div class="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
				<p class="text-sm">Không tìm thấy ứng dụng nào khớp với bộ lọc.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredApps as app (app.id)}
					<AppCard {app} />
				{/each}
			</div>
		{/if}
	</div>

	<!-- 1-Click Blueprints Showcase -->
	<div class="pt-6 border-t border-border/50">
		<TemplatesShowcase onDeployTemplate={handleTemplateDeploy} />
	</div>

	<!-- Local Deploy Modal -->
	<DeployModal bind:open={deployModalOpen} onDeploy={handleNewDeploy} />
</div>

<script lang="ts">
	import {
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconDatabase,
		IconEye,
		IconMessageCircle,
		IconFileText,
		IconCoin,
		IconRoute,
		IconWebhook,
		IconArrowRight,
		IconCheck
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const modules = [
		{
			id: 'auth',
			name: 'Povixa Auth',
			tag: 'Identity & OIDC 2.1 Single Sign-On',
			metric: '18,420 Active Users',
			status: 'Operational',
			uptime: '99.99%',
			icon: IconFingerprint,
			href: '/auth',
			color: 'text-blue-500',
			border: 'border-blue-500/20 hover:border-blue-500/40'
		},
		{
			id: 'config',
			name: 'Remote Config',
			tag: 'Dynamic Feature Flags & Rollouts',
			metric: '14 Active Flags • 0.8ms eval',
			status: 'Operational',
			uptime: '100%',
			icon: IconAdjustments,
			href: '/config',
			color: 'text-violet-500',
			border: 'border-violet-500/20 hover:border-violet-500/40'
		},
		{
			id: 'notifications',
			name: 'Notifications & Push',
			tag: 'Multi-Channel Push & Event Dispatch',
			metric: '99.8% Delivered • 4.2k today',
			status: 'Operational',
			uptime: '99.98%',
			icon: IconBell,
			href: '/notifications',
			color: 'text-amber-500',
			border: 'border-amber-500/20 hover:border-amber-500/40'
		},
		{
			id: 'analytics',
			name: 'Telemetry & Analytics',
			tag: 'Privacy-First Funnels & Aggregations',
			metric: '1,420 events/sec',
			status: 'Operational',
			uptime: '100%',
			icon: IconChartHistogram,
			href: '/analytics',
			color: 'text-emerald-500',
			border: 'border-emerald-500/20 hover:border-emerald-500/40'
		},
		{
			id: 'storage',
			name: 'Object Storage (S3)',
			tag: 'S3 Buckets & Global CDN Acceleration',
			metric: '48.2 GB • 4 Buckets',
			status: 'Operational',
			uptime: '99.99%',
			icon: IconDatabase,
			href: '/storage',
			color: 'text-cyan-500',
			border: 'border-cyan-500/20 hover:border-cyan-500/40'
		},
		{
			id: 'observability',
			name: 'Observability & Traces',
			tag: 'Distributed Tracing & Logs Waterfall',
			metric: 'p95 18ms • 0 critical alerts',
			status: 'Operational',
			uptime: '99.99%',
			icon: IconEye,
			href: '/observability',
			color: 'text-rose-500',
			border: 'border-rose-500/20 hover:border-rose-500/40'
		},
		{
			id: 'support',
			name: 'Customer Support',
			tag: 'Helpdesk Tickets & In-App Chat',
			metric: '18m avg resolution • 98% CSAT',
			status: 'Operational',
			uptime: '99.99%',
			icon: IconMessageCircle,
			href: '/support',
			color: 'text-indigo-500',
			border: 'border-indigo-500/20 hover:border-indigo-500/40'
		},
		{
			id: 'legal',
			name: 'Legal & Privacy',
			tag: 'GDPR / DPA Compliance & Policies',
			metric: '100% Compliant • Audit Ready',
			status: 'Operational',
			uptime: '100%',
			icon: IconFileText,
			href: '/legal',
			color: 'text-pink-500',
			border: 'border-pink-500/20 hover:border-pink-500/40'
		},
		{
			id: 'billing',
			name: 'Billing & Freedom Pact',
			tag: 'Free $0 with Badge Guarantee',
			metric: 'Verified $0 • Cost Ceiling Active',
			status: 'Operational',
			uptime: '100%',
			icon: IconCoin,
			href: '/billing',
			color: 'text-purple-500',
			border: 'border-purple-500/20 hover:border-purple-500/40'
		}
	];
</script>

<div class="space-y-5">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-xl font-bold tracking-tight text-foreground">{m.section_modules_title()}</h2>
			<p class="text-xs text-muted-foreground mt-0.5">{m.section_modules_desc()}</p>
		</div>
		<span class="rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
			9/9 Modules Hoạt Động Ổn Định
		</span>
	</div>

	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each modules as mod}
			<a
				href={mod.href}
				class="group relative flex flex-col justify-between rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 {mod.border}"
			>
				<div>
					<div class="flex items-start justify-between">
						<div class="flex items-center gap-3.5">
							<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/80 {mod.color}">
								<mod.icon size={22} stroke={2.2} />
							</div>
							<div>
								<h3 class="font-bold text-base text-foreground group-hover:text-primary transition-colors">
									{mod.name}
								</h3>
								<p class="text-xs text-muted-foreground mt-0.5">{mod.tag}</p>
							</div>
						</div>
						<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
							<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
							{mod.status}
						</span>
					</div>

					<div class="mt-5 flex items-center justify-between rounded-xl bg-secondary/40 px-3.5 py-2 text-xs">
						<span class="text-muted-foreground font-medium">{mod.metric}</span>
						<span class="font-mono text-xs font-semibold text-foreground/80">{mod.uptime}</span>
					</div>
				</div>

				<div class="mt-4 flex items-center justify-end text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
					<span>Quản lý Module</span>
					<IconArrowRight size={15} class="ml-1 transition-transform group-hover:translate-x-1" />
				</div>
			</a>
		{/each}
	</div>
</div>

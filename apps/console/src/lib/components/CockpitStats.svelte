<script lang="ts">
	import {
		IconTrendingUp,
		IconUsers,
		IconBolt,
		IconShieldCheck,
		IconArrowUpRight
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const stats = $derived([
		{
			title: m.stat_requests_title(),
			value: '34,289,104',
			sub: m.stat_requests_change(),
			icon: IconBolt,
			color: 'text-indigo-500',
			bg: 'bg-indigo-500/10 border-indigo-500/20',
			trendUp: true
		},
		{
			title: m.stat_users_title(),
			value: '18,420',
			sub: m.stat_users_change(),
			icon: IconUsers,
			color: 'text-cyan-500',
			bg: 'bg-cyan-500/10 border-cyan-500/20',
			trendUp: true
		},
		{
			title: m.stat_latency_title(),
			value: '18.4 ms',
			sub: m.stat_latency_status(),
			icon: IconTrendingUp,
			color: 'text-emerald-500',
			bg: 'bg-emerald-500/10 border-emerald-500/20',
			trendUp: true
		},
		{
			title: m.stat_cost_title(),
			value: '$0.00',
			sub: m.stat_cost_badge(),
			icon: IconShieldCheck,
			color: 'text-purple-500',
			bg: 'bg-purple-500/10 border-purple-500/20',
			trendUp: true,
			badge: true
		}
	]);
</script>

<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
	{#each stats as item}
		<div
			class="relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5"
		>
			<div class="flex items-center justify-between">
				<span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.title}</span>
				<div class="flex h-10 w-10 items-center justify-center rounded-xl border {item.bg} {item.color}">
					<item.icon size={20} stroke={2.5} />
				</div>
			</div>

			<div class="mt-4">
				<p class="font-sans text-3xl font-extrabold tracking-tight text-foreground">{item.value}</p>
				<div class="mt-2 flex items-center gap-1.5">
					{#if item.badge}
						<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500 border border-emerald-500/20">
							<IconShieldCheck size={13} stroke={2.5} />
							{item.sub}
						</span>
					{:else}
						<IconArrowUpRight size={14} class="text-emerald-500" stroke={2.5} />
						<span class="text-xs font-semibold text-emerald-500">{item.sub}</span>
					{/if}
				</div>
			</div>

			<!-- Background Decorative Glow -->
			<div class="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-15 {item.color}"></div>
		</div>
	{/each}
</div>

<script lang="ts">
	import {
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconDatabase,
		IconEye,
		IconFileText,
		IconMessageCircle,
		IconArrowRight,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const modules = [
		{
			id: 'id',
			name: m.module_id_name(),
			desc: m.module_id_desc(),
			tag: m.module_id_tag(),
			icon: IconFingerprint,
			href: '/auth',
			status: 'Sẵn sàng',
			badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
		},
		{
			id: 'config',
			name: m.module_config_name(),
			desc: m.module_config_desc(),
			tag: m.module_config_tag(),
			icon: IconAdjustments,
			href: '/config',
			status: 'Đang phát triển',
			badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
		},
		{
			id: 'notifications',
			name: m.module_notify_name(),
			desc: m.module_notify_desc(),
			tag: m.module_notify_tag(),
			icon: IconBell,
			href: '/notifications',
			status: 'Đang phát triển',
			badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
		},
		{
			id: 'analytics',
			name: m.module_analytics_name(),
			desc: m.module_analytics_desc(),
			tag: m.module_analytics_tag(),
			icon: IconChartHistogram,
			href: '/analytics',
			status: 'Đang phát triển',
			badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
		},
		{
			id: 'storage',
			name: m.module_storage_name(),
			desc: m.module_storage_desc(),
			tag: m.module_storage_tag(),
			icon: IconDatabase,
			href: '/storage',
			status: 'Đang phát triển',
			badgeColor: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
		},
		{
			id: 'observability',
			name: m.module_obs_name(),
			desc: m.module_obs_desc(),
			tag: m.module_obs_tag(),
			icon: IconEye,
			href: '/observability',
			status: 'Kế hoạch',
			badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-500'
		},
		{
			id: 'legal',
			name: m.module_legal_name(),
			desc: m.module_legal_desc(),
			tag: m.module_legal_tag(),
			icon: IconFileText,
			href: '/legal',
			status: 'Sẵn sàng',
			badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
		},
		{
			id: 'support',
			name: m.module_support_name(),
			desc: m.module_support_desc(),
			tag: m.module_support_tag(),
			icon: IconMessageCircle,
			href: '/support',
			status: 'Sẵn sàng',
			badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
		}
	];
</script>

<svelte:head>
	<title>{m.nav_modules()} — Povixa Platform</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconSparkles size={14} />
			<span>Hệ thống Mô-đun Thống nhất</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.modules_title()}
		</h1>
		<p class="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
			{m.modules_desc()}
		</p>
	</div>

	<div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each modules as mod (mod.id)}
			{@const Icon = mod.icon}
			<a
				href={mod.href}
				class="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg"
			>
				<div>
					<div class="flex items-center justify-between">
						<div
							class="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110"
						>
							<Icon size={24} stroke={1.75} />
						</div>
						<span
							class="rounded-full border px-2.5 py-0.5 text-[11px] font-semibold {mod.badgeColor}"
						>
							{mod.status}
						</span>
					</div>
					<h3
						class="mt-5 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary"
					>
						{mod.name}
					</h3>
					<p class="mt-1 font-mono text-xs text-primary/80">
						{mod.tag}
					</p>
					<p class="mt-3 text-sm leading-relaxed text-muted-foreground">
						{mod.desc}
					</p>
				</div>

				<div
					class="mt-6 flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors group-hover:text-primary"
				>
					<span>Khám phá chi tiết</span>
					<IconArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
				</div>
			</a>
		{/each}
	</div>
</section>

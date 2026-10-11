<script lang="ts">
	import {
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconDatabase,
		IconFileText,
		IconMessageCircle,
		IconEye,
		IconCoin,
		IconArrowUpRight
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	// Svelte 5 runes for interactive hover & periodic random running border beam
	let hoveredIndex = $state<number | null>(null);
	let activeBeamIndex = $state<number | null>(0);

	$effect(() => {
		// Periodically activate a random module card to run the border beam
		const interval = setInterval(() => {
			if (hoveredIndex === null) {
				const nextIdx = Math.floor(Math.random() * 9);
				activeBeamIndex = nextIdx;

				// Keep beam active for ~2.6s (1 full rotation) then turn off briefly
				setTimeout(() => {
					if (hoveredIndex === null) {
						activeBeamIndex = null;
					}
				}, 2600);
			}
		}, 3800);

		return () => clearInterval(interval);
	});

	const modules = [
		{
			id: 'auth',
			icon: IconFingerprint,
			name: () => m.module_id_name(),
			desc: () => m.module_id_desc(),
			categoryLabel: 'Identity & Auth',
			specBadge: 'OIDC 2.1 · Passkeys',
			href: '/auth',
			accentColor: 'text-blue-500 bg-blue-500/10',
			dotColor: 'bg-blue-500',
			glowColor: '#3b82f6',
			glowColorEnd: '#06b6d4',
			microWidget: {
				label: 'Passkey',
				value: 'Touch ID · secp256r1',
				status: 'Active',
				statusColor: 'text-emerald-500'
			}
		},
		{
			id: 'observability',
			icon: IconEye,
			name: () => m.module_obs_name(),
			desc: () => m.module_obs_desc(),
			categoryLabel: 'Observability',
			specBadge: 'OpenTelemetry',
			href: '/observability',
			accentColor: 'text-teal-500 bg-teal-500/10',
			dotColor: 'bg-teal-500',
			glowColor: '#14b8a6',
			glowColorEnd: '#10b981',
			microWidget: {
				label: 'Probe',
				value: '99.99% SLA · p99 12ms',
				status: 'Healthy',
				statusColor: 'text-emerald-500'
			}
		},
		{
			id: 'legal',
			icon: IconFileText,
			name: () => m.module_legal_name(),
			desc: () => m.module_legal_desc(),
			categoryLabel: 'Governance',
			specBadge: 'GDPR · SOC2',
			href: 'https://legal.povixa.cloud',
			external: true,
			accentColor: 'text-rose-500 bg-rose-500/10',
			dotColor: 'bg-rose-500',
			glowColor: '#f43f5e',
			glowColorEnd: '#8b5cf6',
			microWidget: {
				label: 'Audit Trail',
				value: 'Zero Unconsented Telemetry',
				status: 'Sealed',
				statusColor: 'text-blue-500'
			}
		},
		{
			id: 'config',
			icon: IconAdjustments,
			name: () => m.module_config_name(),
			desc: () => m.module_config_desc(),
			categoryLabel: 'Edge Flags',
			specBadge: 'Sub-ms Realtime',
			href: '/config',
			accentColor: 'text-emerald-500 bg-emerald-500/10',
			dotColor: 'bg-emerald-500',
			glowColor: '#10b981',
			glowColorEnd: '#06b6d4',
			microWidget: {
				label: 'Canary Flag',
				value: 'ai_copilot: 75% traffic',
				status: 'Live',
				statusColor: 'text-emerald-500'
			}
		},
		{
			id: 'notifications',
			icon: IconBell,
			name: () => m.module_notify_name(),
			desc: () => m.module_notify_desc(),
			categoryLabel: 'Dispatch',
			specBadge: 'Push · Email · SMS',
			href: '/notifications',
			accentColor: 'text-amber-500 bg-amber-500/10',
			dotColor: 'bg-amber-500',
			glowColor: '#f59e0b',
			glowColorEnd: '#ef4444',
			microWidget: {
				label: 'Dispatch Queue',
				value: 'APNs · FCM · WebPush',
				status: 'Synced',
				statusColor: 'text-amber-500'
			}
		},
		{
			id: 'storage',
			icon: IconDatabase,
			name: () => m.module_storage_name(),
			desc: () => m.module_storage_desc(),
			categoryLabel: 'Object Storage',
			specBadge: 'S3 API · 0đ Egress',
			href: '/storage',
			accentColor: 'text-cyan-500 bg-cyan-500/10',
			dotColor: 'bg-cyan-500',
			glowColor: '#06b6d4',
			glowColorEnd: '#3b82f6',
			microWidget: {
				label: 'Multipart S3',
				value: 'R2 / S3 Zero-Egress',
				status: 'Ready',
				statusColor: 'text-cyan-500'
			}
		},
		{
			id: 'analytics',
			icon: IconChartHistogram,
			name: () => m.module_analytics_name(),
			desc: () => m.module_analytics_desc(),
			categoryLabel: 'Analytics',
			specBadge: 'ClickHouse · No Cookie',
			href: '/analytics',
			accentColor: 'text-violet-500 bg-violet-500/10',
			dotColor: 'bg-violet-500',
			glowColor: '#8b5cf6',
			glowColorEnd: '#d946ef',
			microWidget: {
				label: 'Conversion',
				value: '+142% Conv · 0 Cookies',
				status: 'Realtime',
				statusColor: 'text-violet-500'
			}
		},
		{
			id: 'billing',
			icon: IconCoin,
			name: () => m.module_billing_name(),
			desc: () => m.module_billing_desc(),
			categoryLabel: 'Monetization',
			specBadge: 'Capped Billing',
			href: '/billing',
			accentColor: 'text-purple-500 bg-purple-500/10',
			dotColor: 'bg-purple-500',
			glowColor: '#a855f7',
			glowColorEnd: '#6366f1',
			microWidget: {
				label: 'Revenue Cap',
				value: 'Capped at $499 · No Shock',
				status: 'Protected',
				statusColor: 'text-purple-500'
			}
		},
		{
			id: 'support',
			icon: IconMessageCircle,
			name: () => m.module_support_name(),
			desc: () => m.module_support_desc(),
			categoryLabel: 'Helpdesk',
			specBadge: 'In-app SLA 2m',
			href: '/support',
			accentColor: 'text-indigo-500 bg-indigo-500/10',
			dotColor: 'bg-indigo-500',
			glowColor: '#6366f1',
			glowColorEnd: '#3b82f6',
			microWidget: {
				label: 'Ticket Resolver',
				value: '2m avg SLA · 100% CSAT',
				status: 'Online',
				statusColor: 'text-indigo-500'
			}
		}
	];
</script>

<!-- ═══════════ UNIFIED 9-MODULE CONTIGUOUS BLOCK ═══════════ -->
<div class="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
	<!-- Top Cockpit Control Header -->
	<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/40 px-5 py-3.5 sm:px-6">
		<div class="flex items-center gap-2.5">
			<span class="relative flex h-2.5 w-2.5">
				<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
				<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
			</span>
			<span class="font-mono text-xs font-bold tracking-wider text-foreground uppercase">
				Unified Infrastructure Matrix · 9 Core Subsystems
			</span>
		</div>
		<div class="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
			<span class="hidden sm:inline">1 Single Lean SDK</span>
			<span class="hidden sm:inline">·</span>
			<span class="font-semibold text-primary">All Systems Operational</span>
		</div>
	</div>

	<!-- 3x3 Contiguous Grid Matrix (Cells touch seamlessly with 1px border lines) -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
		{#each modules as mod, i (mod.id)}
			<a
				href={mod.href}
				onmouseenter={() => (hoveredIndex = i)}
				onmouseleave={() => (hoveredIndex = null)}
				class="group relative flex flex-col justify-between overflow-hidden bg-card p-5 sm:p-6 transition-colors hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			>
				<!-- ✦ Running Glowing Border Light Beam (Active on Hover or Periodic Random Sweep) ✦ -->
				<div
					class="pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-300 {activeBeamIndex === i || hoveredIndex === i ? 'opacity-100' : 'opacity-0'}"
				>
					<!-- Spinning conic gradient laser beam -->
					<div
						class="absolute -inset-[200%] animate-beam-spin"
						style="background: conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, {mod.glowColor} 320deg, {mod.glowColorEnd} 360deg);"
					></div>
					<!-- Inner mask leaving 1.5px border glow around the card -->
					<div class="absolute inset-[1.5px] bg-card"></div>
					<!-- Soft ambient corner glow -->
					<div
						class="absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl opacity-20"
						style="background: {mod.glowColor};"
					></div>
				</div>

				<!-- Card Content (z-20 to stay perfectly crisp above the border mask) -->
				<div class="relative z-20">
					<!-- Top Row: Icon + Module Name + Category + Tag + Arrow -->
					<div class="flex items-start justify-between gap-3">
						<div class="flex items-center gap-3 min-w-0">
							<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl {mod.accentColor} transition-transform group-hover:scale-105">
								<mod.icon size={19} stroke={2} />
							</div>
							<div class="min-w-0">
								<h4 class="truncate font-sans text-sm sm:text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
									{mod.name()}
								</h4>
								<p class="truncate font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
									{mod.categoryLabel}
								</p>
							</div>
						</div>

						<div class="flex items-center gap-1.5 shrink-0">
							<span class="rounded bg-muted/60 px-2 py-0.5 font-mono text-[9px] font-bold text-muted-foreground uppercase">
								{mod.specBadge}
							</span>
							<IconArrowUpRight
								size={14}
								class="text-muted-foreground transition-transform group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</div>
					</div>

					<!-- Description (Compact 2 lines) -->
					<p class="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
						{mod.desc()}
					</p>
				</div>

				<!-- Bottom Micro Status Bar (Clean & Compact) -->
				<div class="relative z-20 mt-4 flex items-center justify-between rounded-lg bg-muted/30 px-3 py-1.5 font-mono text-[10px]">
					<div class="flex items-center gap-2 min-w-0">
						<span class="h-1.5 w-1.5 shrink-0 rounded-full {mod.dotColor}"></span>
						<span class="truncate text-muted-foreground">{mod.microWidget.label}:</span>
						<span class="truncate font-semibold text-foreground">{mod.microWidget.value}</span>
					</div>
					<span class="ml-2 shrink-0 font-bold {mod.microWidget.statusColor}">
						{mod.microWidget.status}
					</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	@keyframes beam-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.animate-beam-spin {
		animation: beam-spin 3s linear infinite;
		will-change: transform;
	}
</style>

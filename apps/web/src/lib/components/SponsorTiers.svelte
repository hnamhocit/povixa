<script lang="ts">
	import {
		IconBrandGithub,
		IconArrowUpRight,
		IconCrown,
		IconMedal,
		IconHeartHandshake
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const platinumSponsors = [
		{
			name: 'CloudNine Global Edge',
			tier: 'PLATINUM',
			amount: '$5,000/mo',
			tagline: '180+ Global PoPs & Zero-latency Edge Routing',
			description:
				'Tài trợ toàn bộ cụm hạ tầng Edge CDN và băng thông toàn cầu cho người dùng Povixa.',
			logoText: 'CLOUDNINE',
			href: 'https://cloudnine.example.com',
			accent: 'from-amber-500/20 via-primary/20 to-violet-500/10'
		},
		{
			name: 'Voxel Systems Foundation',
			tier: 'PLATINUM',
			amount: '$5,000/mo',
			tagline: 'Open Infrastructure & Data Sovereignty Fund',
			description:
				'Đồng hành nghiên cứu và phát triển chuẩn giao thức hạ tầng độc lập, chống độc quyền cloud.',
			logoText: 'VOXEL SYS',
			href: 'https://voxel.example.com',
			accent: 'from-violet-500/20 via-indigo-500/20 to-sky-500/10'
		}
	];

	const goldSponsors = [
		{
			name: 'Framewrk Labs',
			tier: 'GOLD',
			tagline: 'Modern Web Engineering Toolchain',
			logoText: 'FRAMEWRK',
			href: 'https://framewrk.example.com'
		},
		{
			name: 'Orbit Database',
			tier: 'GOLD',
			tagline: 'Distributed Distributed Datastores',
			logoText: 'ORBIT DB',
			href: 'https://orbit.example.com'
		},
		{
			name: 'Photon AI',
			tier: 'GOLD',
			tagline: 'Low-latency Realtime Inference',
			logoText: 'PHOTON AI',
			href: 'https://photon.example.com'
		},
		{
			name: 'NextWave Capital',
			tier: 'GOLD',
			tagline: 'Developer-First Seed Syndicate',
			logoText: 'NEXTWAVE',
			href: 'https://nextwave.example.com'
		}
	];

	const silverBackers = [
		{ name: 'Danilo Silva', handle: '@danilosilva', role: 'Staff Systems Eng' },
		{ name: 'Kasper Jensen', handle: '@kasper_j', role: 'Indie Bootstrapper' },
		{ name: 'Yuki Takahashi', handle: '@yuki_t', role: 'OSS Maintainer' },
		{ name: 'Thành Long', handle: '@long_dev', role: 'DevOps Architect' },
		{ name: 'Mateo Rossi', handle: '@mateo_r', role: 'Founder, QuickAPI' },
		{ name: 'Hanna Berg', handle: '@hanna_b', role: 'Fullstack Builder' }
	];
</script>

<div class="space-y-12">
	<!-- ═══════════ PLATINUM TIER ═══════════ -->
	<div>
		<div class="mb-4 flex items-center gap-2">
			<IconCrown size={18} class="text-amber-400" stroke={2.5} />
			<h3 class="font-mono text-xs font-bold tracking-wider text-amber-500 uppercase">
				{m.sponsor_tier_platinum()}
			</h3>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			{#each platinumSponsors as s (s.name)}
				<a
					href={s.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br {s.accent} p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-xl"
				>
					<div class="flex items-start justify-between gap-4">
						<div>
							<div
								class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-500"
							>
								<span>★</span>
								<span>{s.tier} BACKER</span>
							</div>
							<h4
								class="mt-3 font-sans text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
							>
								{s.name}
							</h4>
							<p class="font-mono text-xs font-semibold text-primary">{s.tagline}</p>
						</div>

						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-background/80 text-foreground transition-transform group-hover:scale-110"
						>
							<IconArrowUpRight
								size={18}
								stroke={2.5}
								class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</div>
					</div>

					<p class="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
						{s.description}
					</p>

					<div
						class="mt-6 flex items-center justify-between border-t border-border/60 pt-4 font-mono text-xs text-muted-foreground"
					>
						<span class="font-bold tracking-wider text-foreground">{s.logoText}</span>
						<span class="font-semibold text-amber-500">{s.amount}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- ═══════════ GOLD TIER ═══════════ -->
	<div>
		<div class="mb-4 flex items-center gap-2">
			<IconMedal size={18} class="text-amber-300" stroke={2.5} />
			<h3 class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
				{m.sponsor_tier_gold()}
			</h3>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each goldSponsors as s (s.name)}
				<a
					href={s.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex flex-col justify-between rounded-xl border border-border/80 bg-card/70 p-4 shadow-xs transition-all duration-200 hover:border-primary/50 hover:bg-card"
				>
					<div>
						<div class="flex items-center justify-between">
							<span
								class="rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground"
							>
								GOLD
							</span>
							<IconArrowUpRight
								size={14}
								class="text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100"
							/>
						</div>
						<h4 class="mt-3 font-sans text-sm font-bold text-foreground">{s.name}</h4>
						<p class="mt-1 text-[11px] text-muted-foreground">{s.tagline}</p>
					</div>

					<div
						class="mt-4 border-t border-border/60 pt-2 font-mono text-[11px] font-bold tracking-wider text-muted-foreground group-hover:text-foreground"
					>
						{s.logoText}
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- ═══════════ SILVER & INDIVIDUAL BACKERS ═══════════ -->
	<div class="rounded-xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
		<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
			<div class="flex items-center gap-2">
				<IconHeartHandshake size={18} class="text-primary" stroke={2} />
				<h3 class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
					{m.sponsor_tier_silver()}
				</h3>
			</div>
			<span class="text-xs text-muted-foreground">40+ Independent Builders & Angels</span>
		</div>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
			{#each silverBackers as b (b.handle)}
				<div class="rounded-lg border border-border/60 bg-background/60 p-2.5 text-center">
					<p class="truncate font-sans text-xs font-bold text-foreground">{b.name}</p>
					<p class="truncate font-mono text-[10px] text-primary">{b.handle}</p>
					<p class="truncate text-[9px] text-muted-foreground">{b.role}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════ CTA / BECOME A SPONSOR ═══════════ -->
	<div
		class="flex flex-col items-center justify-between gap-6 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-background p-6 sm:flex-row sm:p-8"
	>
		<div>
			<h4 class="font-sans text-lg font-bold text-foreground">
				{m.sponsors_cta_box_title()}
			</h4>
			<p class="mt-1 text-xs text-muted-foreground sm:text-sm">
				{m.sponsors_cta_box_desc()}
			</p>
		</div>

		<div class="flex flex-wrap items-center gap-3">
			<a
				href="/sponsor"
				class="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 font-mono text-xs font-bold text-background shadow-sm transition-opacity hover:opacity-90"
			>
				<IconBrandGithub size={16} stroke={2} />
				<span>GitHub Sponsors</span>
			</a>
			<a
				href="https://opencollective.com/povixa"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-mono text-xs font-semibold text-foreground transition-colors hover:bg-muted"
			>
				<span>Open Collective</span>
			</a>
		</div>
	</div>
</div>

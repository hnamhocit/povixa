<script lang="ts">
	import {
		IconBrandGithub,
		IconArrowUpRight,
		IconHeartHandshake,
		IconStarFilled,
		IconPlus
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const platinumSponsors = [
		{
			name: 'CloudNine',
			tagline: 'Hạ tầng Mạng biên Toàn cầu',
			subtext: 'Tài trợ 120+ PoPs & Anycast Routing',
			logoText: 'CLOUDNINE',
			href: 'https://cloudnine.example.com'
		},
		{
			name: 'Voxel Systems',
			tagline: 'Tiêu chuẩn & Dữ liệu Mở',
			subtext: 'Tài trợ Quỹ R&D và Chuẩn hoá SDK',
			logoText: 'VOXEL SYS',
			href: 'https://voxel.example.com'
		}
	];

	const goldSponsors = [
		{
			name: 'Framewrk Labs',
			role: 'Web Toolchain & Developer DX',
			logoText: 'FRAMEWRK',
			href: 'https://framewrk.example.com'
		},
		{
			name: 'Orbit Database',
			role: 'Distributed Datastores & Sync',
			logoText: 'ORBIT DB',
			href: 'https://orbit.example.com'
		},
		{
			name: 'Photon AI',
			role: 'Edge Inference Engine & Copilot',
			logoText: 'PHOTON AI',
			href: 'https://photon.example.com'
		},
		{
			name: 'NextWave Capital',
			role: 'Developer Syndicate Fund & Grants',
			logoText: 'NEXTWAVE',
			href: 'https://nextwave.example.com'
		}
	];

	const communityBackers = [
		{ handle: '@danilosilva', name: 'Danilo Silva', initials: 'DS', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
		{ handle: '@kasper_j', name: 'Kasper Jensen', initials: 'KJ', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
		{ handle: '@yuki_t', name: 'Yuki Takahashi', initials: 'YT', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
		{ handle: '@long_dev', name: 'Thành Long', initials: 'TL', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
		{ handle: '@mateo_r', name: 'Mateo Rossi', initials: 'MR', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
		{ handle: '@hanna_b', name: 'Hanna Berg', initials: 'HB', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
		{ handle: '@elena_r', name: 'Elena Rostova', initials: 'ER', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
		{ handle: '@marcus_c', name: 'Marcus Chen', initials: 'MC', color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400' },
		{ handle: '@s_jenkins', name: 'Sarah Jenkins', initials: 'SJ', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
		{ handle: '@quang_cloud', name: 'Minh Quang', initials: 'MQ', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
		{ handle: '@lars_l', name: 'Lars Lindqvist', initials: 'LL', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
		{ handle: '@chiara_b', name: 'Chiara Bianchi', initials: 'CB', color: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400' }
	];
</script>

<div class="space-y-8">
	<!-- ═══════════ PLATINUM TIER ═══════════ -->
	<div>
		<div class="mb-3 flex items-center justify-between">
			<span class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
				{m.sponsor_tier_platinum()}
			</span>
			<span class="font-mono text-[11px] text-muted-foreground">
				2 Đối tác Chiến lược
			</span>
		</div>

		<div class="grid gap-3 sm:grid-cols-2">
			{#each platinumSponsors as s (s.name)}
				<a
					href={s.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border/60 bg-card p-4 sm:p-5 shadow-2xs transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5"
				>
					<!-- Top Metallic Sheen -->
					<div class="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>

					<!-- Partner Logo & Subtitle Context (Fills the empty void gracefully) -->
					<div class="flex items-center gap-4 min-w-0">
						<div class="h-8 shrink-0 flex items-center">
							{#if s.logoText === 'CLOUDNINE'}
								<svg viewBox="0 0 220 40" class="h-8 sm:h-8.5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="cn-logo-grad" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
											<stop stop-color="#0284C7" />
											<stop offset="1" stop-color="#6366F1" />
										</linearGradient>
									</defs>
									<path d="M12 26h18c4.4 0 8-3.6 8-8s-3.6-8-8-8c-.5 0-1 .05-1.5.15C27 5.8 22.8 2 17.5 2 11.2 2 6 7.2 6 13.5c0 .8.1 1.6.3 2.3C3.5 17 1.5 19.8 1.5 23c0 3.9 3.1 7 7 7h3.5" stroke="url(#cn-logo-grad)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
									<circle cx="17.5" cy="15" r="2.5" fill="#0284C7" />
									<circle cx="28" cy="17" r="2" fill="#6366F1" />
									<path d="M17.5 15L28 17" stroke="url(#cn-logo-grad)" stroke-width="1.5" stroke-dasharray="2 2" />
									<text x="46" y="22" class="fill-foreground font-sans text-[17px] font-extrabold tracking-tight">CloudNine</text>
									<text x="46" y="34" class="fill-cyan-600 dark:fill-cyan-400 font-mono text-[8.5px] font-bold tracking-[0.22em] uppercase">GLOBAL EDGE NETWORK</text>
								</svg>
							{:else}
								<svg viewBox="0 0 240 40" class="h-8 sm:h-8.5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="voxel-logo-grad" x1="4" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
											<stop stop-color="#059669" />
											<stop offset="1" stop-color="#0284C7" />
										</linearGradient>
									</defs>
									<g transform="translate(2, 2)">
										<path d="M16 2L30 10V26L16 34L2 26V10L16 2Z" stroke="url(#voxel-logo-grad)" stroke-width="2.4" stroke-linejoin="round" />
										<path d="M16 2V18M30 10L16 18M2 10L16 18" stroke="url(#voxel-logo-grad)" stroke-width="1.8" stroke-linejoin="round" />
										<path d="M16 18V34" stroke="url(#voxel-logo-grad)" stroke-width="1.8" stroke-linejoin="round" />
										<circle cx="16" cy="18" r="2.8" fill="#10B981" />
									</g>
									<text x="46" y="22" class="fill-foreground font-sans text-[17px] font-extrabold tracking-tight">Voxel Systems</text>
									<text x="46" y="34" class="fill-emerald-600 dark:fill-emerald-400 font-mono text-[8.5px] font-bold tracking-[0.22em] uppercase">FOUNDATION · OPEN DATA</text>
								</svg>
							{/if}
						</div>

						<div class="hidden sm:block min-w-0 border-l border-border/60 pl-4 py-0.5">
							<p class="truncate font-sans text-xs font-bold text-foreground">{s.tagline}</p>
							<p class="truncate font-mono text-[10px] text-muted-foreground">{s.subtext}</p>
						</div>
					</div>

					<!-- Tier Badge & Link -->
					<div class="flex items-center gap-2 shrink-0">
						<span class="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 px-2.5 py-0.5 font-mono text-[9px] font-bold text-slate-700 dark:text-slate-300">
							<IconStarFilled size={9} class="text-amber-500" />
							<span>PLATINUM</span>
						</span>
						<IconArrowUpRight size={14} class="text-muted-foreground transition-transform group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- ═══════════ GOLD TIER (STRUCTURED CARDS WITH ROLE LABELS) ═══════════ -->
	<div>
		<div class="mb-3 flex items-center justify-between">
			<span class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
				{m.sponsor_tier_gold()}
			</span>
			<span class="font-mono text-[11px] text-muted-foreground">
				4 Đối tác Chuyên sâu
			</span>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
			{#each goldSponsors as s (s.name)}
				<a
					href={s.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:border-amber-400/60 dark:hover:border-amber-500/40 hover:shadow-md hover:-translate-y-0.5"
				>
					<!-- Top Gold Specular Line -->
					<div class="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>

					<!-- Top Row: Logo + Gold Badge -->
					<div class="flex items-center justify-between gap-2">
						<div class="h-7 shrink-0 flex items-center">
							{#if s.logoText === 'FRAMEWRK'}
								<svg viewBox="0 0 170 34" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="fw-gold-grad" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
											<stop stop-color="#F59E0B" />
											<stop offset="1" stop-color="#D97706" />
										</linearGradient>
									</defs>
									<path d="M12 2L2 7l10 5 10-5-10-5zM2 13l10 5 10-5M2 19l10 5 10-5" stroke="url(#fw-gold-grad)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
									<text x="32" y="19" class="fill-foreground font-sans text-[15px] font-extrabold tracking-tight">FRAMEWRK</text>
									<text x="32" y="29" class="fill-amber-600 dark:fill-amber-400 font-mono text-[7.5px] font-bold tracking-[0.2em] uppercase">LABS</text>
								</svg>
							{:else if s.logoText === 'ORBIT DB'}
								<svg viewBox="0 0 165 34" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="orb-gold-grad" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
											<stop stop-color="#F59E0B" />
											<stop offset="1" stop-color="#B45309" />
										</linearGradient>
									</defs>
									<g transform="translate(1, 1)">
										<ellipse cx="13" cy="13" rx="11" ry="4.5" stroke="url(#orb-gold-grad)" stroke-width="1.8" transform="rotate(-30 13 13)" />
										<ellipse cx="13" cy="13" rx="11" ry="4.5" stroke="url(#orb-gold-grad)" stroke-width="1.8" transform="rotate(30 13 13)" />
										<circle cx="13" cy="13" r="2.8" fill="#F59E0B" />
									</g>
									<text x="34" y="19" class="fill-foreground font-sans text-[15px] font-extrabold tracking-tight">Orbit</text>
									<text x="34" y="29" class="fill-amber-600 dark:fill-amber-400 font-mono text-[7.5px] font-bold tracking-[0.2em] uppercase">DATABASE</text>
								</svg>
							{:else if s.logoText === 'PHOTON AI'}
								<svg viewBox="0 0 155 34" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="ph-gold-grad" x1="0" y1="0" x2="24" y2="26" gradientUnits="userSpaceOnUse">
											<stop stop-color="#FBBF24" />
											<stop offset="1" stop-color="#D97706" />
										</linearGradient>
									</defs>
									<path d="M14 1L3 15h10l-2 13 13-16h-10l3-12z" fill="url(#ph-gold-grad)" />
									<text x="32" y="19" class="fill-foreground font-sans text-[15px] font-extrabold tracking-tight">Photon</text>
									<text x="32" y="29" class="fill-amber-600 dark:fill-amber-400 font-mono text-[7.5px] font-bold tracking-[0.2em] uppercase">AI ENGINE</text>
								</svg>
							{:else}
								<svg viewBox="0 0 175 34" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="nw-gold-grad" x1="0" y1="0" x2="24" y2="26" gradientUnits="userSpaceOnUse">
											<stop stop-color="#F59E0B" />
											<stop offset="1" stop-color="#B45309" />
										</linearGradient>
									</defs>
									<g transform="translate(1, 3)">
										<path d="M2 19C5 19 7 5 13 5c5 0 7 13 11 13" stroke="url(#nw-gold-grad)" stroke-width="2.4" stroke-linecap="round" />
										<circle cx="24" cy="18" r="2.2" fill="#F59E0B" />
									</g>
									<text x="34" y="19" class="fill-foreground font-sans text-[15px] font-extrabold tracking-tight">NextWave</text>
									<text x="34" y="29" class="fill-amber-600 dark:fill-amber-400 font-mono text-[7.5px] font-bold tracking-[0.2em] uppercase">CAPITAL</text>
								</svg>
							{/if}
						</div>

						<div class="flex items-center gap-1 shrink-0">
							<span class="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-amber-700 dark:text-amber-400 uppercase">
								GOLD
							</span>
							<IconArrowUpRight size={13} class="text-muted-foreground transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400" />
						</div>
					</div>

					<!-- Bottom Row: Subtitle role (Gives domain clarity, eliminates emptiness) -->
					<div class="mt-3 border-t border-border/40 pt-2">
						<p class="truncate font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
							{s.role}
						</p>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- ═══════════ COMMUNITY BACKERS (FLAT, VIBRANT WITH MINI-AVATARS) ═══════════ -->
	<div>
		<div class="mb-3 flex flex-wrap items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				<IconHeartHandshake size={15} class="text-rose-500" />
				<span class="font-mono text-xs font-bold tracking-wider text-foreground uppercase">
					{m.sponsor_tier_silver()}
				</span>
			</div>
			<span class="font-mono text-[11px] text-muted-foreground">
				40+ Cá nhân ủng hộ qua GitHub Sponsors
			</span>
		</div>

		<!-- Flat Wrap of Developer Chips with colorful mini avatars + invite chip -->
		<div class="flex flex-wrap items-center gap-2">
			{#each communityBackers as b (b.handle)}
				<span class="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-border hover:bg-card hover:text-foreground hover:shadow-2xs">
					<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold {b.color}">
						{b.initials}
					</span>
					<span class="font-medium text-foreground">{b.name}</span>
					<span class="font-mono text-[10px] text-muted-foreground">{b.handle}</span>
				</span>
			{/each}

			<!-- Interactive "+ Become a Sponsor" chip -->
			<a
				href="https://github.com/sponsors/hnamhocit"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-full border border-dashed border-primary/50 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary"
			>
				<IconPlus size={12} stroke={2.5} />
				<span>Ủng hộ dự án</span>
			</a>
		</div>
	</div>

	<!-- ═══════════ STREAMLINED CTA BAR ═══════════ -->
	<div class="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-xs">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<div>
				<div class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-primary uppercase">
					100% Nguồn mở & Minh bạch
				</div>
				<h4 class="mt-2 font-sans text-base sm:text-lg font-bold text-foreground">
					{m.sponsors_cta_box_title()}
				</h4>
				<p class="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
					{m.sponsors_cta_box_desc()}
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3 shrink-0">
				<a
					href="https://github.com/sponsors/hnamhocit"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-4 text-xs font-bold text-background shadow-xs transition-opacity hover:opacity-90"
				>
					<IconBrandGithub size={15} stroke={2} />
					<span>Tài trợ qua GitHub</span>
				</a>
				<a
					href="mailto:enterprise@povixa.cloud"
					class="inline-flex h-9 items-center gap-1 rounded-lg border border-border/60 bg-muted/40 px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
				>
					<span>Gói Doanh nghiệp</span>
					<IconArrowUpRight size={13} />
				</a>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import {
		IconCode,
		IconLayoutGrid,
		IconDatabase,
		IconCloud,
		IconSend,
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconEye,
		IconCoin,
		IconMessageCircle,
		IconFileText
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const modules = [
		{ name: 'Auth & Passkeys', icon: IconFingerprint, color: 'text-blue-500 bg-blue-500/10' },
		{ name: 'Remote Config', icon: IconAdjustments, color: 'text-emerald-500 bg-emerald-500/10' },
		{ name: 'Notifications', icon: IconBell, color: 'text-amber-500 bg-amber-500/10' },
		{ name: 'Object Storage', icon: IconDatabase, color: 'text-cyan-500 bg-cyan-500/10' },
		{ name: 'Privacy Analytics', icon: IconChartHistogram, color: 'text-violet-500 bg-violet-500/10' },
		{ name: 'Observability', icon: IconEye, color: 'text-teal-500 bg-teal-500/10' },
		{ name: 'Capped Billing', icon: IconCoin, color: 'text-purple-500 bg-purple-500/10' },
		{ name: 'In-App Support', icon: IconMessageCircle, color: 'text-indigo-500 bg-indigo-500/10' },
		{ name: 'Legal & Privacy', icon: IconFileText, color: 'text-rose-500 bg-rose-500/10' }
	];
</script>

<div class="space-y-10">
	<!-- ═══════════ SECTION HEADER ═══════════ -->
	<div class="mx-auto max-w-3xl text-center">
		<span class="inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
			WORKS WITH YOUR STACK
		</span>
		<h2 class="mt-4 font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
			Vận hành xuyên suốt toàn bộ stack của bạn.
		</h2>
		<p class="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
			Povixa kết nối ứng dụng client của bạn, điều phối 9 phân hệ hạ tầng cốt lõi, và lưu trữ trực tiếp trên database & cloud của bạn mà không có vendor lock-in.
		</p>
	</div>

	<!-- ═══════════ DUCKDB-STYLE FLAT ARCHITECTURAL FLOW DIAGRAM ═══════════ -->
	<div class="relative py-2 sm:py-4">
		<div class="relative flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
			<!-- ─────────── COLUMN 1: CLIENTS & APPLICATIONS (Inputs) ─────────── -->
			<div class="w-full lg:w-[31%] flex flex-col gap-4">
				<!-- Box 1: Clients & SDKs -->
				<div class="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm hover:border-border">
					<div class="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
						<div class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
							<IconCode size={15} class="text-blue-500" />
							<span>Clients & SDKs</span>
						</div>
						<span class="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
							8 SDKs
						</span>
					</div>

					<div class="grid grid-cols-4 gap-2">
						<!-- TypeScript -->
						<div title="TypeScript" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-blue-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6">
								<rect width="24" height="24" rx="4" fill="#3178C6" />
								<text x="5" y="17" fill="#fff" font-family="monospace" font-weight="bold" font-size="10.5">TS</text>
							</svg>
						</div>

						<!-- JavaScript -->
						<div title="JavaScript" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-yellow-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6">
								<rect width="24" height="24" rx="4" fill="#F7DF1E" />
								<text x="6" y="17" fill="#000" font-family="monospace" font-weight="bold" font-size="10.5">JS</text>
							</svg>
						</div>

						<!-- Go -->
						<div title="Go" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-cyan-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6">
								<rect width="24" height="24" rx="4" fill="#00ADD8" />
								<text x="4" y="17" fill="#fff" font-family="sans-serif" font-weight="extrabold" font-size="11">GO</text>
							</svg>
						</div>

						<!-- Python -->
						<div title="Python" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-amber-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="none">
								<path d="M11.9 2c-3.1 0-4.9.8-4.9 2.5v1.8h5v.8H5.6C3.9 7.1 2 8.6 2 11.4c0 2.8 1.5 4.3 3.6 4.3h1.4v-2c0-2.4 2-4.4 4.4-4.4h4.4v-.8c0-2.4-2-4.5-3.9-4.5z" fill="#3776AB"/>
								<path d="M12.1 22c3.1 0 4.9-.8 4.9-2.5v-1.8h-5v-.8h6.4c1.7 0 3.6-1.5 3.6-4.3 0-2.8-1.5-4.3-3.6-4.3h-1.4v2c0 2.4-2 4.4-4.4 4.4H8.2v.8c0 2.4 2 4.5 3.9 4.5z" fill="#FFD43B"/>
								<circle cx="9" cy="4.5" r=".7" fill="#fff"/>
								<circle cx="15" cy="19.5" r=".7" fill="#fff"/>
							</svg>
						</div>

						<!-- Flutter -->
						<div title="Flutter" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-sky-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="none">
								<path d="M14.2 2L3 13.2l3.5 3.5L17.7 2h-3.5z" fill="#02569B"/>
								<path d="M14.2 13.5L8.5 19.2l3.5 3.5 9.2-9.2h-7z" fill="#0175C2"/>
								<path d="M10.8 16.9l3.4-3.4 3.5 3.4-3.5 3.5-3.4-3.5z" fill="#29B6F6"/>
							</svg>
						</div>

						<!-- Swift -->
						<div title="Swift" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-orange-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="none">
								<rect width="24" height="24" rx="4" fill="#F05138" />
								<path d="M17.5 17.5c-4-1-6.5-4.5-7.5-6.5 1.5 1 4 2 5.5 1.5-2.5-2.5-4-6-4-6s1.5 2 3.5 3c-1.5-3-1-5.5-1-5.5s3.5 4 6 8.5c1.5 2.5 1 4.5-.5 5.5" fill="#fff" />
							</svg>
						</div>

						<!-- Rust -->
						<div title="Rust" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-stone-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6">
								<rect width="24" height="24" rx="4" fill="#E43716" />
								<text x="5" y="17" fill="#fff" font-family="monospace" font-weight="bold" font-size="9.5">RUST</text>
							</svg>
						</div>

						<!-- CLI -->
						<div title="CLI" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 font-mono text-xs font-bold text-foreground transition-all hover:scale-105 hover:bg-muted/80 hover:border-emerald-500/50 shadow-2xs">
							&gt;_
						</div>
					</div>
				</div>

				<!-- Box 2: Frameworks & Runtimes -->
				<div class="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm hover:border-border">
					<div class="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
						<div class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
							<IconLayoutGrid size={15} class="text-orange-500" />
							<span>Frameworks & Edge</span>
						</div>
						<span class="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
							8 Runtimes
						</span>
					</div>

					<div class="grid grid-cols-4 gap-2">
						<!-- Svelte -->
						<div title="Svelte" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-orange-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6">
								<rect width="24" height="24" rx="4" fill="#FF3E00" />
								<path d="M15 7c-1.5-1.5-4-1-5 .5-.5.8-.3 1.8.5 2.5l2 1.5c1 .8 1.5 2 .8 3-1 1.5-3 1.5-4.5.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" />
							</svg>
						</div>

						<!-- React -->
						<div title="React" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-cyan-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="none" stroke="#087EA4" stroke-width="1.8">
								<ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" />
								<ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-30 12 12)" />
								<ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(90 12 12)" />
								<circle cx="12" cy="12" r="1.5" fill="#087EA4" />
							</svg>
						</div>

						<!-- Next.js -->
						<div title="Next.js" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-foreground/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6">
								<circle cx="12" cy="12" r="10" class="fill-foreground" />
								<path d="M9 8v8M15 8l-6 8M15 8v8" stroke="#fff" stroke-width="1.6" class="dark:stroke-black" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</div>

						<!-- Node.js -->
						<div title="Node.js" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-emerald-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="#5FA04E">
								<path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
								<path d="M12 5.5l5.5 3.2v6.6L12 18.5l-5.5-3.2V8.7L12 5.5z" fill="#fff" />
							</svg>
						</div>

						<!-- Bun -->
						<div title="Bun" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-amber-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6">
								<rect width="24" height="24" rx="4" fill="#FBF0DF" />
								<path d="M6 14c0 3 2.7 5 6 5s6-2 6-5c0-3.5-3-5.5-6-7-3 1.5-6 3.5-6 7z" fill="#E89F4C" />
								<circle cx="10" cy="13" r="1" fill="#000" />
								<circle cx="14" cy="13" r="1" fill="#000" />
							</svg>
						</div>

						<!-- Cloudflare Workers -->
						<div title="Cloudflare Workers" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-orange-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="#F38020">
								<path d="M17.5 10c-.3-2.5-2.4-4.5-5-4.5-2.2 0-4.1 1.5-4.7 3.5C5.8 9.3 4 11 4 13c0 2.2 1.8 4 4 4h9.5c2 0 3.5-1.5 3.5-3.5 0-1.8-1.4-3.3-3.5-3.5z"/>
							</svg>
						</div>

						<!-- Vue -->
						<div title="Vue.js" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-emerald-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="none">
								<polygon points="12,18 2,4 6,4 12,13 18,4 22,4" fill="#42B883" />
								<polygon points="12,13 7,4 10,4 12,8 14,4 17,4" fill="#35495E" />
							</svg>
						</div>

						<!-- Docker -->
						<div title="Docker" class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-blue-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5.5 w-5.5 sm:h-6 sm:w-6" fill="#2496ED">
								<path d="M2 13c1 0 2 .5 3 0s1.5-1 3-1 2 1 3.5 1 2.5-1 4-1 2.5 1 3.5 1c1.5 0 2.5-.5 3-1 0 5-3.5 8-10 8-5.5 0-9.5-3.5-10-7z"/>
								<rect x="5" y="8" width="2" height="2" rx=".3" fill="#2496ED"/>
								<rect x="8" y="8" width="2" height="2" rx=".3" fill="#2496ED"/>
								<rect x="8" y="5.5" width="2" height="2" rx=".3" fill="#2496ED"/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<!-- ─────────── MOBILE CONNECTOR 1 (Vertical) ─────────── -->
			<div class="flex lg:hidden items-center justify-center py-2 text-muted-foreground/50">
				<svg viewBox="0 0 24 32" class="h-8 w-6 stroke-current fill-none">
					<path d="M 12,2 L 12,22 M 7,17 L 12,23 L 17,17" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
					<circle cx="12" cy="10" r="3" class="fill-primary stroke-none" />
				</svg>
			</div>

			<!-- ─────────── DESKTOP CONNECTOR 1: Left to Center (Bold Conduit Lines) ─────────── -->
			<div class="hidden lg:flex w-16 xl:w-20 shrink-0 h-[360px] items-center justify-center -mx-1 z-0">
				<svg viewBox="0 0 60 360" class="h-full w-full overflow-visible" aria-hidden="true">
					<!-- Top card conduit (Clients & SDKs) -->
					<path
						d="M 0,90 C 35,90 25,180 60,180"
						class="stroke-muted-foreground/35 dark:stroke-border"
						stroke-width="2.5"
						stroke-linecap="round"
						fill="none"
					/>
					<!-- Bottom card conduit (Frameworks & Edge) -->
					<path
						d="M 0,270 C 35,270 25,180 60,180"
						class="stroke-muted-foreground/35 dark:stroke-border"
						stroke-width="2.5"
						stroke-linecap="round"
						fill="none"
					/>
					<!-- Convergence Hub Node -->
					<circle cx="35" cy="180" r="4.5" class="fill-primary" />
					<circle cx="35" cy="180" r="9" class="fill-primary/20 animate-ping" />
				</svg>
			</div>

			<!-- ─────────── COLUMN 2: POVIXA CONTROL PLANE (Center) ─────────── -->
			<div class="w-full lg:w-[32%] flex flex-col z-10">
				<!-- Flagship Povixa Core Architecture Card -->
				<div class="rounded-2xl border-2 border-primary/50 bg-card p-4 sm:p-5 shadow-sm ring-4 ring-primary/5 dark:ring-primary/10 transition-all hover:border-primary hover:shadow-md">
					<!-- Header: Povixa Unified Brand & Live Subsystem Badge -->
					<div class="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
						<div class="flex items-center gap-2.5">
							<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background shadow-xs">
								<svg viewBox="0 0 24 24" class="h-4.5 w-4.5 fill-none stroke-current" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
								</svg>
							</div>
							<div>
								<span class="block font-sans text-xs font-extrabold tracking-tight text-foreground">Povixa Core</span>
								<span class="block font-mono text-[9px] font-bold text-primary uppercase tracking-wider">Control Plane</span>
							</div>
						</div>
						<div class="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
							<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
							<span class="font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400">9 Core Subsystems</span>
						</div>
					</div>

					<!-- 3x3 Subsystems Grid -->
					<div class="grid grid-cols-3 gap-2">
						{#each modules as mod (mod.name)}
							<div
								title={mod.name}
								class="group/mod flex flex-col items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/40 p-2.5 text-center transition-all hover:bg-primary/5 hover:border-primary/40 hover:scale-105"
							>
								<div class="flex h-7.5 w-7.5 items-center justify-center rounded-lg {mod.color}">
									<mod.icon size={16} stroke={2.2} />
								</div>
								<span class="mt-1.5 truncate w-full font-mono text-[9.5px] font-semibold text-muted-foreground group-hover/mod:text-foreground">
									{mod.name.split(' ')[0]}
								</span>
							</div>
						{/each}
					</div>

					<!-- Bottom Capability Pill Footer -->
					<div class="mt-3.5 pt-3 border-t border-border/40 flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-muted-foreground">
						<span class="font-medium text-foreground/80">Unified SDK</span>
						<span class="text-border">•</span>
						<span>Self-Hosted / Cloud</span>
						<span class="text-border">•</span>
						<span>Zero Lock-in</span>
					</div>
				</div>
			</div>

			<!-- ─────────── MOBILE CONNECTOR 2 (Vertical) ─────────── -->
			<div class="flex lg:hidden items-center justify-center py-2 text-muted-foreground/50">
				<svg viewBox="0 0 24 32" class="h-8 w-6 stroke-current fill-none">
					<path d="M 12,2 L 12,22 M 7,17 L 12,23 L 17,17" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
					<circle cx="12" cy="10" r="3" class="fill-emerald-500 stroke-none" />
				</svg>
			</div>

			<!-- ─────────── DESKTOP CONNECTOR 2: Center to Right (Bold Conduit Lines) ─────────── -->
			<div class="hidden lg:flex w-16 xl:w-20 shrink-0 h-[360px] items-center justify-center -mx-1 z-0">
				<svg viewBox="0 0 60 360" class="h-full w-full overflow-visible" aria-hidden="true">
					<!-- Divergence to Databases (Top) -->
					<path
						d="M 0,180 C 35,180 25,55 60,55"
						class="stroke-muted-foreground/35 dark:stroke-border"
						stroke-width="2.5"
						stroke-linecap="round"
						fill="none"
					/>
					<!-- Straight to Storage & Clouds (Middle) -->
					<path
						d="M 0,180 L 60,180"
						class="stroke-muted-foreground/35 dark:stroke-border"
						stroke-width="2.5"
						stroke-linecap="round"
						fill="none"
					/>
					<!-- Divergence to Delivery & Gateways (Bottom) -->
					<path
						d="M 0,180 C 35,180 25,305 60,305"
						class="stroke-muted-foreground/35 dark:stroke-border"
						stroke-width="2.5"
						stroke-linecap="round"
						fill="none"
					/>
					<!-- Distribution Node Dot -->
					<circle cx="25" cy="180" r="4.5" class="fill-emerald-500" />
					<circle cx="25" cy="180" r="9" class="fill-emerald-500/20 animate-ping" />
				</svg>
			</div>

			<!-- ─────────── COLUMN 3: YOUR INFRASTRUCTURE & CLOUDS (Outputs) ─────────── -->
			<div class="w-full lg:w-[31%] flex flex-col gap-3">
				<!-- Box 1: Databases -->
				<div class="rounded-2xl border border-border/80 bg-card p-3.5 shadow-xs transition-all hover:shadow-sm hover:border-border">
					<div class="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/50">
						<div class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
							<IconDatabase size={15} class="text-blue-500" />
							<span>Databases</span>
						</div>
						<span class="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
							4 Engines
						</span>
					</div>

					<div class="grid grid-cols-4 gap-2">
						<!-- PostgreSQL -->
						<div title="PostgreSQL" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-blue-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5">
								<rect width="24" height="24" rx="4" fill="#336791" />
								<text x="4" y="16" fill="#fff" font-family="monospace" font-weight="bold" font-size="10">PG</text>
							</svg>
						</div>

						<!-- ClickHouse -->
						<div title="ClickHouse" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-yellow-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5" fill="#FFCC01">
								<rect x="2" y="8" width="3" height="8" rx="1" />
								<rect x="7" y="4" width="3" height="16" rx="1" />
								<rect x="12" y="7" width="3" height="10" rx="1" />
								<rect x="17" y="9" width="3" height="6" rx="1" />
							</svg>
						</div>

						<!-- SQLite -->
						<div title="SQLite" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-sky-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5">
								<rect width="24" height="24" rx="4" fill="#003B57" />
								<text x="3" y="16" fill="#fff" font-family="monospace" font-weight="bold" font-size="8.5">SQL</text>
							</svg>
						</div>

						<!-- Redis -->
						<div title="Redis" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-red-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5">
								<rect width="24" height="24" rx="4" fill="#DC382D" />
								<text x="2" y="16" fill="#fff" font-family="monospace" font-weight="bold" font-size="8">RDS</text>
							</svg>
						</div>
					</div>
				</div>

				<!-- Box 2: Object Storage & Clouds -->
				<div class="rounded-2xl border border-border/80 bg-card p-3.5 shadow-xs transition-all hover:shadow-sm hover:border-border">
					<div class="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/50">
						<div class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
							<IconCloud size={15} class="text-cyan-500" />
							<span>Storage & Clouds</span>
						</div>
						<span class="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
							4 Providers
						</span>
					</div>

					<div class="grid grid-cols-4 gap-2">
						<!-- Cloudflare R2 -->
						<div title="Cloudflare R2" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-orange-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5" fill="#F38020">
								<path d="M16 11c-.3-2-2-3.5-4-3.5-1.8 0-3.3 1.2-3.8 2.8C6.5 10.5 5 12 5 13.5c0 1.8 1.5 3.2 3.3 3.2h7.8c1.6 0 2.9-1.2 2.9-2.8 0-1.5-1.1-2.7-3-2.9z"/>
							</svg>
						</div>

						<!-- AWS S3 -->
						<div title="AWS S3" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:border-amber-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5">
								<rect width="24" height="24" rx="4" fill="#FF9900" />
								<text x="4" y="16" fill="#fff" font-family="monospace" font-weight="bold" font-size="10">S3</text>
							</svg>
						</div>

						<!-- MinIO -->
						<div title="MinIO" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-rose-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5">
								<rect width="24" height="24" rx="4" fill="#C72C48" />
								<text x="3" y="16" fill="#fff" font-family="monospace" font-weight="bold" font-size="8.5">MIN</text>
							</svg>
						</div>

						<!-- Bare-metal -->
						<div title="Bare-metal Server" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 font-mono text-[10px] font-bold text-foreground transition-all hover:scale-105 hover:bg-muted/80 hover:border-emerald-500/50 shadow-2xs">
							METAL
						</div>
					</div>
				</div>

				<!-- Box 3: Delivery & Gateways -->
				<div class="rounded-2xl border border-border/80 bg-card p-3.5 shadow-xs transition-all hover:shadow-sm hover:border-border">
					<div class="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/50">
						<div class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
							<IconSend size={15} class="text-emerald-500" />
							<span>Delivery & Gateways</span>
						</div>
						<span class="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
							4 Gateways
						</span>
					</div>

					<div class="grid grid-cols-4 gap-2">
						<!-- Apple APNs -->
						<div title="Apple APNs" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-foreground/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5 fill-foreground">
								<path d="M15.2 12.9c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3 0 1.8-.8 3.4-.8 1.5 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.5 1.4-2.9 1.4-3-.1 0-3.2-1.2-3.2-4.1zM13.6 5.8c.7-.8 1.1-2 1-3.1-1 .1-2.2.7-2.8 1.5-.6.7-1.1 1.9-1 3 1.1.1 2.2-.6 2.8-1.4z"/>
							</svg>
						</div>

						<!-- Google FCM -->
						<div title="Google FCM" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-amber-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5" fill="#FFCA28">
								<path d="M4.5 17.5L8 4l4.5 7.5L4.5 17.5z" />
								<path d="M19.5 17.5l-3.5-13.5-3.5 6 7 7.5z" fill="#FFA000" />
								<path d="M12.5 11.5L8 4 4.5 17.5 12 21l7.5-3.5-7-6z" fill="#F57C00" opacity=".6" />
							</svg>
						</div>

						<!-- Kubernetes -->
						<div title="Kubernetes" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 transition-all hover:scale-105 hover:bg-muted/80 hover:border-blue-500/50 shadow-2xs">
							<svg viewBox="0 0 24 24" class="h-5 w-5">
								<rect width="24" height="24" rx="4" fill="#326CE5" />
								<text x="3" y="16" fill="#fff" font-family="monospace" font-weight="bold" font-size="9">K8S</text>
							</svg>
						</div>

						<!-- Self-Host -->
						<div title="100% Self-Hostable" class="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 dark:bg-muted/30 border border-border/50 font-mono text-[9px] font-bold text-emerald-500 transition-all hover:scale-105 hover:bg-muted/80 hover:border-emerald-500/50 shadow-2xs">
							HOST
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

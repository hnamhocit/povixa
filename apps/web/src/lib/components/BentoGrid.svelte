<script lang="ts">
	import {
		IconServer,
		IconFingerprint,
		IconAdjustments,
		IconCode,
		IconDatabase,
		IconBolt,
		IconArrowRight,
		IconCheck,
		IconKey,
		IconShieldCheck
	} from '@tabler/icons-svelte-runes';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
	<!-- ═══════════════ CARD 1: Wide (Span 2) — Deploy anywhere ═══════════════ -->
	<div
		class="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 sm:p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-border/80 lg:col-span-2"
	>
		<div class="grid gap-6 md:grid-cols-2 items-center">
			<!-- Left Column: Content & Checkmarks -->
			<div class="flex flex-col justify-between">
				<div>
					<div class="flex items-center gap-2.5 text-foreground font-semibold">
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<IconServer size={18} stroke={2.5} />
						</div>
						<span class="font-sans text-base font-bold">Deploy anywhere</span>
					</div>

					<p class="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
						Run on your own metal, Docker, Kubernetes, or our globally distributed Anycast edge fleet with sub-20ms latency.
					</p>

					<!-- Supabase-style Technical Checklist -->
					<ul class="mt-5 space-y-2 font-sans text-xs font-medium text-foreground/85">
						<li class="flex items-center gap-2">
							<IconCheck size={14} class="shrink-0 text-emerald-500" stroke={3} />
							<span>100% portable on Docker & Bare-metal</span>
						</li>
						<li class="flex items-center gap-2">
							<IconCheck size={14} class="shrink-0 text-emerald-500" stroke={3} />
							<span>Zero cloud vendor lock-in</span>
						</li>
						<li class="flex items-center gap-2">
							<IconCheck size={14} class="shrink-0 text-emerald-500" stroke={3} />
							<span>Sub-20ms Anycast routing worldwide</span>
						</li>
					</ul>
				</div>

				<a
					href="https://docs.povixa.cloud"
					target="_blank"
					rel="noreferrer"
					class="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
				>
					<span>Explore deployment architecture</span>
					<IconArrowRight size={13} stroke={2.5} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>

			<!-- Right Column: Precision Technical Anycast Mesh Schematic (Soft background, NO inner borders) -->
			<div class="relative flex flex-col items-center justify-center rounded-xl bg-muted/30 p-4">
				<!-- Terminal CLI Badge -->
				<div class="w-full flex items-center justify-between pb-2 mb-2 font-mono text-[10px]">
					<div class="flex items-center gap-1.5 text-muted-foreground">
						<span class="h-2 w-2 rounded-full bg-rose-500/80"></span>
						<span class="h-2 w-2 rounded-full bg-amber-500/80"></span>
						<span class="h-2 w-2 rounded-full bg-emerald-500/80"></span>
						<span class="ml-1 text-foreground font-semibold">povixa-fleet</span>
					</div>
					<span class="text-emerald-500 font-bold">$ edge serve</span>
				</div>

				<!-- Geodesic Anycast Globe Wireframe (CAD Blueprint) -->
				<div class="relative h-44 w-full">
					<svg viewBox="0 0 240 160" class="h-full w-full stroke-foreground/40 dark:stroke-foreground/30 fill-none" aria-hidden="true">
						<!-- Geodesic Latitude & Longitude Circles -->
						<ellipse cx="120" cy="80" rx="76" ry="76" stroke-width="1.2" stroke-opacity="0.3" class="stroke-foreground" />
						<ellipse cx="120" cy="80" rx="76" ry="32" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="3 3" />
						<ellipse cx="120" cy="80" rx="36" ry="76" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="3 3" />
						<line x1="44" y1="80" x2="196" y2="80" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="4 3" />

						<!-- Geodesic Signal Arcs -->
						<path d="M80 60 Q120 40 165 65" stroke-width="1.5" stroke-dasharray="3 2" class="stroke-primary/70" />
						<path d="M90 105 Q125 125 160 95" stroke-width="1.5" stroke-dasharray="3 2" class="stroke-emerald-500/70" />
						<path d="M80 60 Q105 90 90 105" stroke-width="1.2" stroke-dasharray="3 2" class="stroke-primary/50" />

						<!-- Anycast Nodes -->
						<!-- Node 1: Frankfurt (FRA) -->
						<circle cx="80" cy="60" r="3.5" class="fill-primary" />
						<circle cx="80" cy="60" r="7" stroke-width="1" class="stroke-primary/60 animate-ping" />

						<!-- Node 2: Singapore (SIN) -->
						<circle cx="165" cy="65" r="3.5" class="fill-emerald-500" />

						<!-- Node 3: Tokyo (TYO) -->
						<circle cx="160" cy="95" r="3.5" class="fill-primary" />

						<!-- Node 4: San Jose (SJC) -->
						<circle cx="90" cy="105" r="3.5" class="fill-primary" />
					</svg>

					<!-- Floating Latency Badges (Shadow elevation, no harsh border) -->
					<div class="absolute top-2 left-2 rounded-md bg-background/90 px-2 py-0.5 font-mono text-[9px] font-bold text-foreground shadow-2xs">
						<span class="text-emerald-500">FRA</span> 12ms
					</div>
					<div class="absolute top-3 right-2 rounded-md bg-background/90 px-2 py-0.5 font-mono text-[9px] font-bold text-foreground shadow-2xs">
						<span class="text-emerald-500">SIN</span> 18ms
					</div>
					<div class="absolute bottom-2 left-3 rounded-md bg-background/90 px-2 py-0.5 font-mono text-[9px] font-bold text-foreground shadow-2xs">
						<span class="text-emerald-500">SJC</span> 14ms
					</div>
					<div class="absolute bottom-2 right-2 rounded-md bg-background/90 px-2 py-0.5 font-mono text-[9px] font-bold text-foreground shadow-2xs">
						<span class="text-emerald-500">TYO</span> 16ms
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════ CARD 2: Normal (Span 1) — Biometric passkeys ═══════════════ -->
	<div
		class="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-border/80 lg:col-span-1"
	>
		<div>
			<div class="flex items-center gap-2.5 text-foreground font-semibold">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<IconFingerprint size={18} stroke={2.5} />
				</div>
				<span class="font-sans text-base font-bold">Biometric passkeys</span>
			</div>
			<p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
				Native WebAuthn and OIDC 2.1 authentication with zero stored plaintext passwords.
			</p>
		</div>

		<!-- Supabase-style Auth Session Pills Widget (Soft background, NO harsh borders) -->
		<div class="my-auto py-3 space-y-2">
			<div class="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
				<div class="flex items-center gap-2 min-w-0">
					<span class="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
					<span class="truncate font-mono text-[11px] text-foreground font-medium">hnam@povixa.cloud</span>
				</div>
				<span class="font-mono text-[10px] text-muted-foreground shrink-0">Touch ID</span>
			</div>

			<div class="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
				<div class="flex items-center gap-2 min-w-0">
					<IconKey size={13} class="text-amber-500 shrink-0" />
					<span class="truncate font-mono text-[11px] text-foreground font-medium">alex.dev@corp.io</span>
				</div>
				<span class="font-mono text-[10px] text-muted-foreground shrink-0">YubiKey 5C</span>
			</div>

			<div class="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
				<div class="flex items-center gap-2 min-w-0">
					<IconShieldCheck size={13} class="text-emerald-500 shrink-0" />
					<span class="truncate font-mono text-[11px] text-foreground font-medium">secp256r1 · FIDO2</span>
				</div>
				<span class="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">Active</span>
			</div>
		</div>

		<a
			href="/auth"
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary"
		>
			<span>Auth docs</span>
			<IconArrowRight size={13} stroke={2.5} class="transition-transform group-hover:translate-x-1" />
		</a>
	</div>

	<!-- ═══════════════ CARD 3: Normal (Span 1) — Remote config ═══════════════ -->
	<div
		class="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-border/80 lg:col-span-1"
	>
		<div>
			<div class="flex items-center gap-2.5 text-foreground font-semibold">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
					<IconAdjustments size={18} stroke={2.5} />
				</div>
				<span class="font-sans text-base font-bold">Remote config</span>
			</div>
			<p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
				Evaluate real-time feature flags and canary rollouts at the edge in sub-millisecond.
			</p>
		</div>

		<!-- Control Plane Feature Flags Widget (Soft background, NO inner borders) -->
		<div class="my-auto space-y-2.5 rounded-xl bg-muted/30 p-3.5">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<span class="h-4 w-7 rounded-full bg-emerald-500 p-0.5 flex items-center justify-end">
						<span class="h-3 w-3 rounded-full bg-white shadow-2xs"></span>
					</span>
					<span class="font-mono text-xs font-semibold text-foreground">ai_inference_v2</span>
				</div>
				<span class="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400">75% rollout</span>
			</div>

			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<span class="h-4 w-7 rounded-full bg-emerald-500 p-0.5 flex items-center justify-end">
						<span class="h-3 w-3 rounded-full bg-white shadow-2xs"></span>
					</span>
					<span class="font-mono text-xs font-semibold text-foreground">http3_quic_edge</span>
				</div>
				<span class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">100% live</span>
			</div>

			<div class="flex items-center justify-between opacity-60">
				<div class="flex items-center gap-2">
					<span class="h-4 w-7 rounded-full bg-muted p-0.5 flex items-center justify-start">
						<span class="h-3 w-3 rounded-full bg-muted-foreground/60 shadow-2xs"></span>
					</span>
					<span class="font-mono text-xs font-semibold text-foreground">canary_billing</span>
				</div>
				<span class="rounded bg-muted/70 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">10% canary</span>
			</div>
		</div>

		<a
			href="/config"
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary"
		>
			<span>Config docs</span>
			<IconArrowRight size={13} stroke={2.5} class="transition-transform group-hover:translate-x-1" />
		</a>
	</div>

	<!-- ═══════════════ CARD 4: Normal (Span 1) — Native clients ═══════════════ -->
	<div
		class="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-border/80 lg:col-span-1"
	>
		<div>
			<div class="flex items-center gap-2.5 text-foreground font-semibold">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
					<IconCode size={18} stroke={2.5} />
				</div>
				<span class="font-sans text-base font-bold">Native clients</span>
			</div>
			<p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
				Idiomatic, type-safe SDKs for TypeScript, Go, Python, and Flutter with zero boilerplate.
			</p>
		</div>

		<!-- Abstract Native Polyglot Architecture Blueprint (CAD/Circuit style) -->
		<div class="my-auto relative flex flex-col items-center justify-center rounded-xl bg-muted/30 p-3.5">
			<!-- Terminal Header -->
			<div class="w-full flex items-center justify-between pb-1.5 mb-1 font-mono text-[10px]">
				<div class="flex items-center gap-1.5 text-muted-foreground">
					<span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
					<span class="text-foreground font-semibold">polyglot-ast-bridge</span>
				</div>
				<span class="text-emerald-500 font-bold">100% typed</span>
			</div>

			<!-- Abstract Architectural SVG Schematic -->
			<div class="relative h-28 w-full">
				<svg viewBox="0 0 200 110" class="h-full w-full stroke-foreground/40 dark:stroke-foreground/30 fill-none" aria-hidden="true">
					<!-- Concentric Orbit Ring -->
					<circle cx="100" cy="55" r="42" stroke-width="1" stroke-dasharray="2 3" stroke-opacity="0.3" class="stroke-foreground" />
					<circle cx="100" cy="55" r="26" stroke-width="1" stroke-opacity="0.15" class="stroke-foreground" />

					<!-- Circuit Bus Lines connecting Core to 4 Language Nodes -->
					<path d="M48 24 Q75 32 82 45" stroke-width="1.2" stroke-dasharray="2 2" class="stroke-blue-500/70" />
					<path d="M152 24 Q125 32 118 45" stroke-width="1.2" stroke-dasharray="2 2" class="stroke-cyan-500/70" />
					<path d="M48 86 Q75 78 82 65" stroke-width="1.2" stroke-dasharray="2 2" class="stroke-amber-500/70" />
					<path d="M152 86 Q125 78 118 65" stroke-width="1.2" stroke-dasharray="2 2" class="stroke-sky-500/70" />

					<!-- Center Hub: Type Engine Core -->
					<polygon points="100,38 117,55 100,72 83,55" class="stroke-primary fill-primary/10" stroke-width="1.4" />
					<circle cx="100" cy="55" r="3.5" class="fill-primary" />
					<circle cx="100" cy="55" r="8" stroke-width="1" class="stroke-primary/50 animate-ping" />
					<text x="100" y="58" class="fill-foreground font-mono text-[7px] font-bold" text-anchor="middle">CORE</text>

					<!-- Node 1: TypeScript (Top Left) -->
					<g transform="translate(18, 12)">
						<rect x="0" y="0" width="30" height="20" rx="5" class="stroke-blue-500/80 fill-blue-500/10" stroke-width="1.2" />
						<text x="15" y="13" class="fill-blue-500 font-mono text-[8.5px] font-bold" text-anchor="middle">TS</text>
						<circle cx="30" cy="10" r="2" class="fill-blue-500" />
					</g>

					<!-- Node 2: Go (Top Right) -->
					<g transform="translate(152, 12)">
						<rect x="0" y="0" width="30" height="20" rx="5" class="stroke-cyan-500/80 fill-cyan-500/10" stroke-width="1.2" />
						<text x="15" y="13" class="fill-cyan-500 font-mono text-[8.5px] font-bold" text-anchor="middle">GO</text>
						<circle cx="0" cy="10" r="2" class="fill-cyan-500" />
					</g>

					<!-- Node 3: Python (Bottom Left) -->
					<g transform="translate(18, 76)">
						<rect x="0" y="0" width="30" height="20" rx="5" class="stroke-amber-500/80 fill-amber-500/10" stroke-width="1.2" />
						<text x="15" y="13" class="fill-amber-500 font-mono text-[8.5px] font-bold" text-anchor="middle">PY</text>
						<circle cx="30" cy="10" r="2" class="fill-amber-500" />
					</g>

					<!-- Node 4: Dart / Flutter (Bottom Right) -->
					<g transform="translate(152, 76)">
						<rect x="0" y="0" width="30" height="20" rx="5" class="stroke-sky-500/80 fill-sky-500/10" stroke-width="1.2" />
						<text x="15" y="13" class="fill-sky-500 font-mono text-[8px] font-bold" text-anchor="middle">DART</text>
						<circle cx="0" cy="10" r="2" class="fill-sky-500" />
					</g>
				</svg>

				<!-- Floating Micro Tags -->
				<div class="absolute bottom-0 left-1 font-mono text-[8.5px] text-muted-foreground font-semibold">
					Zero Egress FFI
				</div>
				<div class="absolute bottom-0 right-1 font-mono text-[8.5px] text-emerald-500 font-bold">
					Sync Schemas
				</div>
			</div>
		</div>

		<a
			href="/sdks"
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary"
		>
			<span>Client APIs</span>
			<IconArrowRight size={13} stroke={2.5} class="transition-transform group-hover:translate-x-1" />
		</a>
	</div>

	<!-- ═══════════════ CARD 5: Wide (Span 2) — Speaks your storage ═══════════════ -->
	<div
		class="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 sm:p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-border/80 lg:col-span-2"
	>
		<div class="grid gap-6 md:grid-cols-2 items-center">
			<!-- Left Column: Content & Checkmarks -->
			<div class="flex flex-col justify-between">
				<div>
					<div class="flex items-center gap-2.5 text-foreground font-semibold">
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
							<IconDatabase size={18} stroke={2.5} />
						</div>
						<span class="font-sans text-base font-bold">Speaks your storage</span>
					</div>

					<p class="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
						Direct multipart uploads to S3, Cloudflare R2, MinIO, or local disks with zero egress markup.
					</p>

					<!-- Supabase-style Technical Checklist -->
					<ul class="mt-5 space-y-2 font-sans text-xs font-medium text-foreground/85">
						<li class="flex items-center gap-2">
							<IconCheck size={14} class="shrink-0 text-emerald-500" stroke={3} />
							<span>S3-compatible API & presigned URLs</span>
						</li>
						<li class="flex items-center gap-2">
							<IconCheck size={14} class="shrink-0 text-emerald-500" stroke={3} />
							<span>Zero egress markup or bandwidth penalties</span>
						</li>
						<li class="flex items-center gap-2">
							<IconCheck size={14} class="shrink-0 text-emerald-500" stroke={3} />
							<span>Direct multipart upload to R2, S3, MinIO</span>
						</li>
					</ul>
				</div>

				<a
					href="/storage"
					class="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
				>
					<span>Explore storage engine</span>
					<IconArrowRight size={13} stroke={2.5} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>

			<!-- Right Column: Abstract Storage Multiplexer & Zero-Egress Pipeline Schematic (CAD Blueprint) -->
			<div class="relative flex flex-col items-center justify-center rounded-xl bg-muted/30 p-4">
				<!-- Terminal CLI Badge -->
				<div class="w-full flex items-center justify-between pb-2 mb-2 font-mono text-[10px]">
					<div class="flex items-center gap-1.5 text-muted-foreground">
						<span class="h-2 w-2 rounded-full bg-cyan-500/80"></span>
						<span class="text-foreground font-semibold">storage-multiplexer</span>
					</div>
					<span class="text-emerald-500 font-bold">$ put --zero-egress</span>
				</div>

				<!-- Abstract Multipart Stream Schematic (Wireframe SVG) -->
				<div class="relative h-44 w-full">
					<svg viewBox="0 0 250 160" class="h-full w-full stroke-foreground/40 dark:stroke-foreground/30 fill-none" aria-hidden="true">
						<!-- Stream Grid Lines / Isometric guides -->
						<line x1="20" y1="80" x2="230" y2="80" stroke-width="1" stroke-opacity="0.15" stroke-dasharray="4 4" />
						
						<!-- Client Stream Chunks (Left Column) -->
						<g transform="translate(14, 28)">
							<rect x="0" y="0" width="38" height="22" rx="5" class="stroke-cyan-500/70 fill-cyan-500/10" stroke-width="1.2" />
							<text x="19" y="14" class="fill-cyan-600 dark:fill-cyan-400 font-mono text-[8px] font-bold" text-anchor="middle">chunk.01</text>
							<circle cx="38" cy="11" r="2" class="fill-cyan-500" />
						</g>
						<g transform="translate(14, 69)">
							<rect x="0" y="0" width="38" height="22" rx="5" class="stroke-cyan-500/70 fill-cyan-500/10" stroke-width="1.2" />
							<text x="19" y="14" class="fill-cyan-600 dark:fill-cyan-400 font-mono text-[8px] font-bold" text-anchor="middle">chunk.02</text>
							<circle cx="38" cy="11" r="2" class="fill-cyan-500" />
						</g>
						<g transform="translate(14, 110)">
							<rect x="0" y="0" width="38" height="22" rx="5" class="stroke-cyan-500/70 fill-cyan-500/10" stroke-width="1.2" />
							<text x="19" y="14" class="fill-cyan-600 dark:fill-cyan-400 font-mono text-[8px] font-bold" text-anchor="middle">chunk.03</text>
							<circle cx="38" cy="11" r="2" class="fill-cyan-500" />
						</g>

						<!-- Dynamic Pipeline Arcs connecting Chunks to Core -->
						<path d="M52 39 C80 39, 90 60, 105 70" stroke-width="1.3" stroke-dasharray="3 2" class="stroke-cyan-500/60" />
						<path d="M52 80 L105 80" stroke-width="1.3" stroke-dasharray="3 2" class="stroke-cyan-500/80" />
						<path d="M52 121 C80 121, 90 100, 105 90" stroke-width="1.3" stroke-dasharray="3 2" class="stroke-cyan-500/60" />

						<!-- Isometric Storage Routing Core (Center) -->
						<g transform="translate(125, 80)">
							<ellipse cx="0" cy="-18" rx="22" ry="9" stroke-width="1.2" class="stroke-cyan-500 fill-cyan-500/15" />
							<ellipse cx="0" cy="0" rx="22" ry="9" stroke-width="1.2" class="stroke-cyan-500 fill-cyan-500/10" />
							<ellipse cx="0" cy="18" rx="22" ry="9" stroke-width="1.2" class="stroke-cyan-500 fill-cyan-500/15" />
							<line x1="-22" y1="-18" x2="-22" y2="18" stroke-width="1.2" class="stroke-cyan-500/80" />
							<line x1="22" y1="-18" x2="22" y2="18" stroke-width="1.2" class="stroke-cyan-500/80" />
							<circle cx="0" cy="0" r="3.5" class="fill-cyan-500" />
							<circle cx="0" cy="0" r="7" stroke-width="1" class="stroke-cyan-400/60 animate-ping" />
						</g>

						<!-- Routing Conduit Arcs to Targets -->
						<path d="M147 68 C160 55, 168 40, 185 40" stroke-width="1.3" stroke-dasharray="3 2" class="stroke-emerald-500/70" />
						<path d="M147 80 L185 80" stroke-width="1.3" stroke-dasharray="3 2" class="stroke-amber-500/70" />
						<path d="M147 92 C160 105, 168 120, 185 120" stroke-width="1.3" stroke-dasharray="3 2" class="stroke-blue-500/70" />

						<!-- Destination Target 1: Cloudflare R2 -->
						<g transform="translate(185, 29)">
							<rect x="0" y="0" width="52" height="22" rx="5" class="stroke-emerald-500/80 fill-emerald-500/10" stroke-width="1.2" />
							<text x="26" y="14" class="fill-emerald-600 dark:fill-emerald-400 font-mono text-[8px] font-bold" text-anchor="middle">R2 Direct</text>
						</g>

						<!-- Destination Target 2: AWS S3 -->
						<g transform="translate(185, 69)">
							<rect x="0" y="0" width="52" height="22" rx="5" class="stroke-amber-500/80 fill-amber-500/10" stroke-width="1.2" />
							<text x="26" y="14" class="fill-amber-600 dark:fill-amber-400 font-mono text-[8px] font-bold" text-anchor="middle">S3 Standard</text>
						</g>

						<!-- Destination Target 3: MinIO / Local -->
						<g transform="translate(185, 109)">
							<rect x="0" y="0" width="52" height="22" rx="5" class="stroke-blue-500/80 fill-blue-500/10" stroke-width="1.2" />
							<text x="26" y="14" class="fill-blue-600 dark:fill-blue-400 font-mono text-[8px] font-bold" text-anchor="middle">MinIO Bare</text>
						</g>
					</svg>

					<!-- Floating Blueprint Badges -->
					<div class="absolute top-1 left-2 rounded-md bg-background/90 px-2 py-0.5 font-mono text-[9px] font-bold text-foreground shadow-2xs">
						<span class="text-cyan-500">PARALLEL</span> 64MB Chunks
					</div>
					<div class="absolute bottom-1 right-2 rounded-md bg-background/90 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-500 shadow-2xs">
						0đ Egress Penalty
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════ CARD 6: Normal (Span 1) — Real-time sync & events ═══════════════ -->
	<div
		class="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-border/80 lg:col-span-1"
	>
		<div>
			<div class="flex items-center gap-2.5 text-foreground font-semibold">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
					<IconBolt size={18} stroke={2.5} />
				</div>
				<span class="font-sans text-base font-bold">Real-time sync</span>
			</div>
			<p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
				Sub-millisecond WebSocket channels, state broadcast, and multiplayer presence tracking.
			</p>
		</div>

		<!-- Supabase-style Multiplayer Canvas with Cursors & Chat Bubble (Soft background, NO inner border) -->
		<div
			class="my-auto relative h-28 w-full rounded-xl bg-muted/30 overflow-hidden"
			style="background-image: radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px); background-size: 14px 14px;"
		>
			<!-- Cursor 1: @hnam with chat bubble -->
			<div class="absolute top-3 left-4 flex flex-col items-start">
				<div class="flex items-center gap-1.5">
					<svg viewBox="0 0 16 16" class="h-4 w-4 fill-violet-500 text-violet-500 drop-shadow-sm -rotate-45" aria-hidden="true">
						<path d="M1 1l6 14 2-6 6-2z" />
					</svg>
					<span class="rounded bg-violet-500 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-2xs">@hnam</span>
				</div>
				<!-- Chat typing bubble -->
				<div class="ml-4 mt-1 rounded-lg bg-background px-2 py-0.5 shadow-2xs flex items-center gap-1">
					<span class="h-1 w-1 rounded-full bg-foreground/60 animate-bounce"></span>
					<span class="h-1 w-1 rounded-full bg-foreground/60 animate-bounce [animation-delay:0.2s]"></span>
					<span class="h-1 w-1 rounded-full bg-foreground/60 animate-bounce [animation-delay:0.4s]"></span>
				</div>
			</div>

			<!-- Cursor 2: @alex online -->
			<div class="absolute bottom-3 right-5 flex items-center gap-1.5">
				<svg viewBox="0 0 16 16" class="h-4 w-4 fill-emerald-500 text-emerald-500 drop-shadow-sm -rotate-45" aria-hidden="true">
					<path d="M1 1l6 14 2-6 6-2z" />
				</svg>
				<span class="rounded bg-emerald-500 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white shadow-2xs">@alex</span>
			</div>

			<!-- Latency Ping Tag -->
			<div class="absolute bottom-1.5 left-2 rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
				⚡ 3ms latency
			</div>
		</div>

		<a
			href="/notifications"
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary"
		>
			<span>Real-time engine</span>
			<IconArrowRight size={13} stroke={2.5} class="transition-transform group-hover:translate-x-1" />
		</a>
	</div>
</div>

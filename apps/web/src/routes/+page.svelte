<script lang="ts">
	import {
		IconArrowRight,
		IconBook
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { page } from '$app/state';
	import AuroraBackground from '#lib/components/AuroraBackground.svelte';
	import PartnerLogos from '#lib/components/PartnerLogos.svelte';
	import BentoGrid from '#lib/components/BentoGrid.svelte';
	import ModulesGrid from '#lib/components/ModulesGrid.svelte';
	import PlatformArchitecture from '#lib/components/PlatformArchitecture.svelte';
	import OpenSourceProof from '#lib/components/OpenSourceProof.svelte';
	import WallOfLove from '#lib/components/WallOfLove.svelte';
	import SponsorTiers from '#lib/components/SponsorTiers.svelte';

	const pageTitle = $derived(`${m.hero_title_1()} ${m.hero_title_highlight()} — Povixa`);
	const pageDesc = $derived(m.hero_desc());
	const currentLocale = $derived(getLocale());
	const origin = $derived(
		page.url.origin && page.url.origin !== 'null' && !page.url.origin.includes('undefined')
			? page.url.origin
			: 'https://povixa.cloud'
	);
	const ogImageUrl = $derived(`${origin}/og-image.png`);
	const currentUrl = $derived(page.url.href || `${origin}/`);

	const softwareSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Povixa',
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Linux, macOS, Windows, Docker, Kubernetes',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		},
		image: ogImageUrl,
		downloadUrl: 'https://github.com/hnamhocit/povixa',
		description: pageDesc,
		featureList: [
			'Authentication & Identity (OIDC, Passkeys)',
			'Edge Remote Config & Feature Flags',
			'Multi-channel Push Notifications',
			'Observability & Real-time Metrics',
			'S3-compatible Object Storage',
			'Fair-share Capped Billing'
		]
	});

	const softwareScript = $derived(
		`<script type="application/ld+json">${JSON.stringify(softwareSchema)}<` + '/script>'
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDesc} />
	<meta
		name="keywords"
		content="open source backend, self-hosted saas, developer platform, sveltekit, docker compose, auth sdk, remote config, push notifications, open analytics, capped revenue sharing, povixa, mã nguồn mở, tự host"
	/>
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>

	<!-- Canonical & Alternates -->
	<link rel="canonical" href={currentUrl} />
	<link rel="alternate" hreflang="vi" href="{origin}/?lang=vi" />
	<link rel="alternate" hreflang="en" href="{origin}/?lang=en" />
	<link rel="alternate" hreflang="x-default" href="{origin}/" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Povixa" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:secure_url" content={ogImageUrl} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1146" />
	<meta property="og:image:height" content="850" />
	<meta property="og:image:alt" content="Povixa — {pageTitle}" />
	<meta property="og:locale" content={currentLocale === 'vi' ? 'vi_VN' : 'en_US'} />
	<meta property="og:locale:alternate" content={currentLocale === 'vi' ? 'en_US' : 'vi_VN'} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@povixa" />
	<meta name="twitter:creator" content="@povixa" />
	<meta name="twitter:url" content={currentUrl} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta name="twitter:image" content={ogImageUrl} />
	<meta name="twitter:image:alt" content="Povixa — {pageTitle}" />

	<!-- Rich Snippets JSON-LD -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html softwareScript}
</svelte:head>

<!-- ═══════════════ HERO (FULL-SCREEN VIEWPORT) ═══════════════ -->
<section
	class="relative isolate flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden bg-background pt-14 pb-10 sm:pt-20 sm:pb-14"
>
	<!-- Aurora Borealis Animated Background -->
	<AuroraBackground class="opacity-100" />

	<!-- Hero Main Core (Centered) -->
	<div class="relative z-10 mx-auto my-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-4xl text-center">
			<!-- Hero Title -->
			<h1
				class="font-sans text-4xl font-extrabold tracking-[-0.035em] text-foreground sm:text-6xl md:text-7xl lg:text-7xl"
			>
				{m.hero_title_1()}<br />
				<span
					class="bg-gradient-to-r from-primary via-indigo-500 to-violet-500 bg-clip-text text-transparent"
				>
					{m.hero_title_highlight()}
				</span>
			</h1>

			<!-- Hero Subtitle -->
			<p
				class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
			>
				{m.hero_desc()}
			</p>

			<!-- Hero CTA Buttons -->
			<div class="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
				<a
					href="https://id.povixa.cloud"
					target="_blank"
					rel="noreferrer"
					class="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
				>
					{m.hero_cta_primary()}
					<IconArrowRight
						size={16}
						stroke={2.5}
						class="transition-transform group-hover:translate-x-1"
					/>
				</a>
				<a
					href="https://docs.povixa.cloud"
					target="_blank"
					rel="noreferrer"
					class="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-card/80 px-6 text-sm font-semibold text-foreground backdrop-blur-sm shadow-xs transition-all hover:border-primary/50 hover:bg-muted"
				>
					<IconBook size={18} stroke={2} />
					<span>{m.nav_docs()}</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Enterprise Partners -->
	<div class="relative z-10 mx-auto mt-10 w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<div class="pt-4 sm:pt-6">
			<p
				class="text-center font-mono text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase"
			>
				{m.proof_heading()}
			</p>

			<!-- Real Enterprise SVG Logos -->
			<div class="mt-6 sm:mt-8">
				<PartnerLogos />
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════ PLATFORM CAPABILITIES (DUCKDB-STYLE BENTO GRID) ═══════════════ -->
<section id="capabilities" class="py-24 md:py-32">
	<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center mb-16">
			<span
				class="inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.bento_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
				{m.bento_title()}
			</h2>
		</div>

		<!-- 6 Bento Cards with high-density technical widgets -->
		<BentoGrid />
	</div>
</section>

<!-- ═══════════════ UNIFIED ARCHITECTURE & FLOW (WORKS WITH YOUR STACK) ═══════════════ -->
<section id="architecture" class="py-24 md:py-32">
	<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<PlatformArchitecture />
	</div>
</section>

<!-- ═══════════════ 9 CORE MODULES SHOWCASE ═══════════════ -->
<section id="modules" class="py-24 md:py-32">
	<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center mb-16">
			<span
				class="inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.modules_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
				{m.modules_title()}
			</h2>
			<p class="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
				{m.modules_desc()}
			</p>
		</div>

		<!-- 3-Layer Architectural Stack Matrix with Live Micro-Widgets & Unified SDK Bridge -->
		<ModulesGrid />
	</div>
</section>

<!-- ═══════════════ TESTIMONIALS (WALL OF LOVE) ═══════════════ -->
<section id="testimonials" class="py-24 md:py-32">
	<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<div class="mx-auto mb-16 max-w-2xl text-center">
			<span
				class="inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.testimonials_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				{m.testimonials_title()}
			</h2>
		</div>

		<WallOfLove />
	</div>
</section>

<!-- ═══════════════ SPONSORS & BACKERS (TIERED) ═══════════════ -->
<section id="sponsors" class="py-24 md:py-32">
	<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<span
				class="inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.sponsors_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				{m.sponsors_title()}
			</h2>
			<p class="mt-4 text-base leading-relaxed text-muted-foreground">
				{m.sponsors_desc()}
			</p>
		</div>

		<SponsorTiers />
	</div>
</section>

<!-- ═══════════════ TRUE OPEN SOURCE & SELF-HOST SHOWCASE ═══════════════ -->
<section id="self-host" class="py-24 md:py-32">
	<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<OpenSourceProof />
	</div>
</section>

<!-- ═══════════════ FINAL CLOSING CTA ("Build in a weekend, scale to millions") ═══════════════ -->
<section class="border-t border-border/60 bg-white dark:bg-card py-24 md:py-32 text-center">
	<div class="mx-auto max-w-4xl px-6 sm:px-8">
		<h2
			class="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
		>
			{m.oss_banner_title()}
		</h2>

		<div class="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
			<a
				href="https://id.povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#3ECF8E] px-7 text-sm font-bold text-black shadow-md shadow-emerald-500/20 transition-all hover:bg-[#34B27B] hover:shadow-lg hover:shadow-emerald-500/30"
			>
				<span>{m.oss_banner_cta_start()}</span>
				<IconArrowRight
					size={16}
					stroke={2.5}
					class="transition-transform group-hover:translate-x-1"
				/>
			</a>

			<a
				href="mailto:enterprise@povixa.cloud"
				class="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-7 text-sm font-semibold text-foreground shadow-xs transition-all hover:border-primary/50 hover:bg-muted"
			>
				<span>{m.oss_banner_cta_demo()}</span>
			</a>
		</div>
	</div>
</section>

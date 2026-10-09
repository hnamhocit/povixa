<script lang="ts">
	import {
		IconArrowRight,
		IconArrowUpRight,
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconDatabase,
		IconFileText,
		IconCheck,
		IconX,
		IconBuildingSkyscraper,
		IconUser,
		IconBriefcase,
		IconPlus,
		IconMinus,
		IconHeart,
		IconShieldCheck,
		IconUsers,
		IconMessageCircle,
		IconUsersGroup,
		IconCoin,
		IconEye,
		IconServer,
		IconBolt,
		IconBrandGithub,
		IconCopy
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { page } from '$app/state';
	import CodeEditor from '#lib/components/CodeEditor.svelte';
	import PartnerLogos from '#lib/components/PartnerLogos.svelte';
	import OpenSourceProof from '#lib/components/OpenSourceProof.svelte';
	import PoweredByBadge from '#lib/components/PoweredByBadge.svelte';
	import WallOfLove from '#lib/components/WallOfLove.svelte';
	import SponsorTiers from '#lib/components/SponsorTiers.svelte';
	import ContributorPolicy from '#lib/components/ContributorPolicy.svelte';

	// ═══════════ Hero Quickstart Copy ═══════════
	let heroCommandCopied = $state(false);

	async function copyHeroQuickstart() {
		try {
			await navigator.clipboard.writeText('curl -fsSL https://get.povixa.cloud | bash');
			heroCommandCopied = true;
			setTimeout(() => {
				heroCommandCopied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy', err);
		}
	}

	// ═══════════ State for Interactive Cockpit ═══════════
	let cockpitTab = $state<'sdk' | 'console' | 'arch'>('sdk');
	let sdkLang = $state<'ts' | 'go' | 'py' | 'curl'>('ts');

	// ═══════════ State for Fair-Share Calculator ═══════════
	let monthlyRevenue = $state(15000);

	let povixaCost = $derived.by(() => {
		if (monthlyRevenue <= 1000) return 0;
		if (monthlyRevenue <= 10000) return Math.round(monthlyRevenue * 0.02);
		const calculated = 200 + Math.round((monthlyRevenue - 10000) * 0.015);
		return Math.min(499, calculated);
	});

	let traditionalCost = $derived.by(() => {
		if (monthlyRevenue <= 1000) return 240;
		if (monthlyRevenue <= 10000) return Math.round(350 + monthlyRevenue * 0.07);
		if (monthlyRevenue <= 50000) return Math.round(750 + monthlyRevenue * 0.05);
		return Math.round(1800 + monthlyRevenue * 0.038);
	});

	let savingsAmount = $derived(Math.max(0, traditionalCost - povixaCost));
	let savingsPercent = $derived(
		traditionalCost > 0 ? Math.round((savingsAmount / traditionalCost) * 100) : 0
	);
	let isCapReached = $derived(povixaCost >= 499);

	// ═══════════ 9 modules ═══════════
	const modules = [
		{
			icon: IconFingerprint,
			get name() {
				return m.module_id_name();
			},
			get tag() {
				return m.module_id_tag();
			},
			get desc() {
				return m.module_id_desc();
			},
			href: '/id',
			accent: 'from-blue-500/20 to-indigo-500/10'
		},
		{
			icon: IconAdjustments,
			get name() {
				return m.module_config_name();
			},
			get tag() {
				return m.module_config_tag();
			},
			get desc() {
				return m.module_config_desc();
			},
			href: '/config',
			accent: 'from-violet-500/20 to-purple-500/10'
		},
		{
			icon: IconBell,
			get name() {
				return m.module_notify_name();
			},
			get tag() {
				return m.module_notify_tag();
			},
			get desc() {
				return m.module_notify_desc();
			},
			href: '/notifications',
			accent: 'from-amber-500/20 to-orange-500/10'
		},
		{
			icon: IconChartHistogram,
			get name() {
				return m.module_analytics_name();
			},
			get tag() {
				return m.module_analytics_tag();
			},
			get desc() {
				return m.module_analytics_desc();
			},
			href: '/analytics',
			accent: 'from-emerald-500/20 to-teal-500/10'
		},
		{
			icon: IconDatabase,
			get name() {
				return m.module_storage_name();
			},
			get tag() {
				return m.module_storage_tag();
			},
			get desc() {
				return m.module_storage_desc();
			},
			href: '/storage',
			accent: 'from-cyan-500/20 to-blue-500/10'
		},
		{
			icon: IconFileText,
			get name() {
				return m.module_legal_name();
			},
			get tag() {
				return m.module_legal_tag();
			},
			get desc() {
				return m.module_legal_desc();
			},
			href: '/legal',
			accent: 'from-rose-500/20 to-pink-500/10'
		},
		{
			icon: IconMessageCircle,
			get name() {
				return m.module_support_name();
			},
			get tag() {
				return m.module_support_tag();
			},
			get desc() {
				return m.module_support_desc();
			},
			href: '/support',
			accent: 'from-indigo-500/20 to-sky-500/10'
		},
		{
			icon: IconEye,
			get name() {
				return m.module_obs_name();
			},
			get tag() {
				return m.module_obs_tag();
			},
			get desc() {
				return m.module_obs_desc();
			},
			href: '/observability',
			accent: 'from-teal-500/20 to-emerald-500/10'
		},
		{
			icon: IconCoin,
			get name() {
				return m.module_billing_name();
			},
			get tag() {
				return m.module_billing_tag();
			},
			get desc() {
				return m.module_billing_desc();
			},
			href: '/billing',
			accent: 'from-purple-500/20 to-violet-500/10'
		}
	];

	// ═══════════ Problem / Solution ═══════════
	const problems = [
		{
			get before() {
				return m.problem_1_before();
			},
			get after() {
				return m.problem_1_after();
			}
		},
		{
			get before() {
				return m.problem_2_before();
			},
			get after() {
				return m.problem_2_after();
			}
		},
		{
			get before() {
				return m.problem_3_before();
			},
			get after() {
				return m.problem_3_after();
			}
		},
		{
			get before() {
				return m.problem_4_before();
			},
			get after() {
				return m.problem_4_after();
			}
		},
		{
			get before() {
				return m.problem_5_before();
			},
			get after() {
				return m.problem_5_after();
			}
		},
		{
			get before() {
				return m.problem_6_before();
			},
			get after() {
				return m.problem_6_after();
			}
		}
	];

	// ═══════════ Personas / Use Cases ═══════════
	const personas = [
		{
			icon: IconUser,
			get name() {
				return m.persona_1_name();
			},
			get title() {
				return m.persona_1_title();
			},
			get bullets() {
				return [m.persona_1_b1(), m.persona_1_b2(), m.persona_1_b3()];
			}
		},
		{
			icon: IconUsers,
			get name() {
				return m.persona_2_name();
			},
			get title() {
				return m.persona_2_title();
			},
			get bullets() {
				return [m.persona_2_b1(), m.persona_2_b2(), m.persona_2_b3()];
			}
		},
		{
			icon: IconBriefcase,
			get name() {
				return m.persona_3_name();
			},
			get title() {
				return m.persona_3_title();
			},
			get bullets() {
				return [m.persona_3_b1(), m.persona_3_b2(), m.persona_3_b3()];
			}
		},
		{
			icon: IconBuildingSkyscraper,
			get name() {
				return m.persona_4_name();
			},
			get title() {
				return m.persona_4_title();
			},
			get bullets() {
				return [m.persona_4_b1(), m.persona_4_b2(), m.persona_4_b3()];
			}
		}
	];

	// ═══════════ Pricing Plans ═══════════
	const pricingPlans = [
		{
			get name() {
				return m.plan_free_name();
			},
			get price() {
				return m.plan_free_price();
			},
			get period() {
				return m.plan_free_period();
			},
			get desc() {
				return m.plan_free_desc();
			},
			get features() {
				return [m.plan_free_f1(), m.plan_free_f2(), m.plan_free_f3(), m.plan_free_f4()];
			},
			get cta() {
				return m.plan_free_cta();
			},
			highlight: false
		},
		{
			get name() {
				return m.plan_pro_name();
			},
			get price() {
				return m.plan_pro_price();
			},
			get period() {
				return m.plan_pro_period();
			},
			get desc() {
				return m.plan_pro_desc();
			},
			get tag() {
				return m.plan_pro_tag();
			},
			get features() {
				return [
					m.plan_pro_f1(),
					m.plan_pro_f2(),
					m.plan_pro_f3(),
					m.plan_pro_f4(),
					m.plan_pro_f5()
				];
			},
			get cta() {
				return m.plan_pro_cta();
			},
			highlight: true
		},
		{
			get name() {
				return m.plan_partner_name();
			},
			get price() {
				return m.plan_partner_price();
			},
			get period() {
				return m.plan_partner_period();
			},
			get desc() {
				return m.plan_partner_desc();
			},
			get features() {
				return [m.plan_partner_f1(), m.plan_partner_f2(), m.plan_partner_f3(), m.plan_partner_f4()];
			},
			get cta() {
				return m.plan_partner_cta();
			},
			highlight: false
		}
	];

	// ═══════════ FAQ ═══════════
	const faqs = [
		{
			get q() {
				return m.faq_q1();
			},
			get a() {
				return m.faq_a1();
			}
		},
		{
			get q() {
				return m.faq_q2();
			},
			get a() {
				return m.faq_a2();
			}
		},
		{
			get q() {
				return m.faq_q3();
			},
			get a() {
				return m.faq_a3();
			}
		},
		{
			get q() {
				return m.faq_q4();
			},
			get a() {
				return m.faq_a4();
			}
		},
		{
			get q() {
				return m.faq_q5();
			},
			get a() {
				return m.faq_a5();
			}
		},
		{
			get q() {
				return m.faq_q6();
			},
			get a() {
				return m.faq_a6();
			}
		}
	];

	let openFaq = $state<number | null>(0);

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
			'@type': 'AggregateOffer',
			priceCurrency: 'USD',
			lowPrice: '0',
			highPrice: '499',
			offerCount: '3'
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

	const faqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: m.faq_q1(),
				acceptedAnswer: {
					'@type': 'Answer',
					text: m.faq_a1()
				}
			},
			{
				'@type': 'Question',
				name: m.faq_q2(),
				acceptedAnswer: {
					'@type': 'Answer',
					text: m.faq_a2()
				}
			},
			{
				'@type': 'Question',
				name: m.faq_q3(),
				acceptedAnswer: {
					'@type': 'Answer',
					text: m.faq_a3()
				}
			},
			{
				'@type': 'Question',
				name: m.faq_q4(),
				acceptedAnswer: {
					'@type': 'Answer',
					text: m.faq_a4()
				}
			},
			{
				'@type': 'Question',
				name: m.faq_q5(),
				acceptedAnswer: {
					'@type': 'Answer',
					text: m.faq_a5()
				}
			},
			{
				'@type': 'Question',
				name: m.faq_q6(),
				acceptedAnswer: {
					'@type': 'Answer',
					text: m.faq_a6()
				}
			}
		]
	});

	const softwareScript = $derived(
		`<script type="application/ld+json">${JSON.stringify(softwareSchema)}<` + '/script>'
	);
	const faqScript = $derived(
		`<script type="application/ld+json">${JSON.stringify(faqSchema)}<` + '/script>'
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
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html faqScript}
</svelte:head>

<!-- ═══════════════ HERO ═══════════════ -->
<section class="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-36">
	<!-- Atmospheric Multi-layered Tech Background -->
	<div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[850px] overflow-hidden">
		<!-- Top Horizon Glow Beams -->
		<div
			class="absolute top-0 left-1/2 h-[1px] w-full max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
		></div>
		<div
			class="absolute top-0 left-1/2 h-[2px] w-2/3 max-w-3xl -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-[1px]"
		></div>

		<!-- Central Radiant Spotlight Mesh -->
		<div
			class="absolute -top-[160px] left-1/2 h-[650px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.22_265/0.25)_0%,oklch(0.62_0.22_295/0.12)_40%,transparent_70%)] opacity-90 blur-3xl dark:opacity-100"
		></div>

		<!-- Flanking Ambient Light Cones -->
		<div
			class="absolute top-[80px] -left-[100px] h-[500px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.18_220/0.12)_0%,transparent_70%)] blur-3xl"
		></div>
		<div
			class="absolute top-[100px] -right-[100px] h-[500px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.25_320/0.12)_0%,transparent_70%)] blur-3xl"
		></div>

		<!-- Concentric Orbit / Radar Depth Rings -->
		<div
			class="absolute -top-[250px] left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full border border-primary/10 opacity-70"
		></div>
		<div
			class="absolute -top-[120px] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full border border-primary/15 opacity-60"
		></div>
		<div
			class="absolute top-[20px] left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full border border-dashed border-primary/20 opacity-50"
		></div>

		<!-- Blueprint Developer Grid (Vignetted center mask) -->
		<div
			class="absolute inset-0 opacity-[0.35] dark:opacity-[0.55]"
			style="background-image: linear-gradient(to right, oklch(0.55 0.2 265 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.55 0.2 265 / 0.12) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse 85% 70% at 50% 30%, black 20%, transparent 85%); -webkit-mask-image: radial-gradient(ellipse 85% 70% at 50% 30%, black 20%, transparent 85%);"
		></div>
	</div>

	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto max-w-4xl text-center">
			<!-- Announcement Badge -->
			<a
				href="/changelog"
				class="group mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:text-foreground"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
				</span>
				<span>{m.hero_announcement()}</span>
				<IconArrowUpRight
					size={13}
					stroke={2}
					class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				/>
			</a>

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
			<div class="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
				<a
					href="https://id.povixa.cloud/register"
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
					href="https://github.com/hnamhocit/povixa"
					target="_blank"
					rel="noopener noreferrer"
					class="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-card/80 px-6 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-muted"
				>
					<IconBrandGithub size={18} stroke={2} />
					<span>{m.hero_cta_github()}</span>
				</a>
			</div>

			<!-- Hero Quickstart Command Runner -->
			<div
				class="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-muted-foreground"
			>
				<span class="text-[11px]">{m.hero_quickstart_label()}</span>
				<button
					type="button"
					onclick={copyHeroQuickstart}
					class="group inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card/90 px-3 py-1.5 text-[11px] text-foreground shadow-xs transition-all hover:border-primary/50"
					title="Copy install command"
				>
					<span class="font-bold text-primary">$</span>
					<span>curl -fsSL https://get.povixa.cloud | bash</span>
					{#if heroCommandCopied}
						<IconCheck size={12} class="text-emerald-500" stroke={3} />
					{:else}
						<IconCopy size={12} class="opacity-60 transition-opacity group-hover:opacity-100" />
					{/if}
				</button>
			</div>

			<!-- Sub-guarantee Pill -->
			<p class="mt-4 text-xs font-medium text-muted-foreground/80">
				{m.hero_badge_guarantee()}
			</p>

			<!-- Supported Ecosystem Framework Badges (Decor) -->
			<div class="mt-10 flex flex-wrap items-center justify-center gap-2">
				<span class="text-xs font-medium text-muted-foreground">Compatible with:</span>
				{#each ['SvelteKit', 'Next.js', 'Nuxt', 'Go', 'FastAPI', 'React Native', 'Flutter', 'Docker'] as tech (tech)}
					<span
						class="inline-flex items-center rounded-md border border-border/70 bg-card/70 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground/80 shadow-xs backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-foreground"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>

		<!-- ═══════════ INTERACTIVE DEVELOPER COCKPIT ═══════════ -->
		<div class="relative mx-auto mt-14 max-w-4xl">
			<!-- Corner Tech Crosshairs (+) -->
			<div
				class="pointer-events-none absolute -top-3 -left-3 font-mono text-sm text-primary/50 select-none"
			>
				+
			</div>
			<div
				class="pointer-events-none absolute -top-3 -right-3 font-mono text-sm text-primary/50 select-none"
			>
				+
			</div>
			<div
				class="pointer-events-none absolute -bottom-3 -left-3 font-mono text-sm text-primary/50 select-none"
			>
				+
			</div>
			<div
				class="pointer-events-none absolute -right-3 -bottom-3 font-mono text-sm text-primary/50 select-none"
			>
				+
			</div>

			<div
				class="overflow-hidden rounded-xl border border-border/80 bg-card/90 shadow-2xl backdrop-blur-md"
			>
				<!-- Window Header Bar -->
				<div
					class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3"
				>
					<div class="flex items-center gap-2">
						<div class="flex gap-1.5">
							<div class="h-3 w-3 rounded-full bg-rose-500/80"></div>
							<div class="h-3 w-3 rounded-full bg-amber-500/80"></div>
							<div class="h-3 w-3 rounded-full bg-emerald-500/80"></div>
						</div>
						<span class="ml-2 font-mono text-xs text-muted-foreground/70">
							{m.cockpit_url()}
						</span>
					</div>

					<!-- Interactive Cockpit Mode Tabs -->
					<div class="flex items-center rounded-lg border border-border/60 bg-background/60 p-0.5">
						<button
							type="button"
							onclick={() => (cockpitTab = 'sdk')}
							class="rounded-md px-3 py-1 text-xs font-medium transition-all {cockpitTab === 'sdk'
								? 'bg-primary text-primary-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							{m.cockpit_tab_sdk()}
						</button>
						<button
							type="button"
							onclick={() => (cockpitTab = 'console')}
							class="rounded-md px-3 py-1 text-xs font-medium transition-all {cockpitTab ===
							'console'
								? 'bg-primary text-primary-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							{m.cockpit_tab_console()}
						</button>
						<button
							type="button"
							onclick={() => (cockpitTab = 'arch')}
							class="rounded-md px-3 py-1 text-xs font-medium transition-all {cockpitTab === 'arch'
								? 'bg-primary text-primary-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							{m.cockpit_tab_arch()}
						</button>
					</div>

					<!-- Edge Ping Metric -->
					<div class="hidden items-center gap-1.5 font-mono text-[11px] text-emerald-500 sm:flex">
						<span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
						<span>11.4ms edge ping</span>
					</div>
				</div>

				<!-- Tab 1: Unified SDK View with Rich Syntax Highlighting -->
				{#if cockpitTab === 'sdk'}
					<div class="p-4 sm:p-6">
						<CodeEditor bind:lang={sdkLang} />
					</div>
				{/if}

				<!-- Tab 2: Live Console Telemetry -->
				{#if cockpitTab === 'console'}
					<div class="p-6">
						<div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
							<div class="rounded-lg border border-border bg-background/60 p-3.5">
								<p class="text-[11px] font-medium text-muted-foreground">
									{m.cockpit_latency()}
								</p>
								<p class="mt-1 font-mono text-lg font-bold text-foreground">11.8 ms</p>
								<span class="text-[10px] text-emerald-500">99.99% percentile</span>
							</div>

							<div class="rounded-lg border border-border bg-background/60 p-3.5">
								<p class="text-[11px] font-medium text-muted-foreground">{m.cockpit_uptime()}</p>
								<p class="mt-1 font-mono text-lg font-bold text-foreground">100.0%</p>
								<span class="text-[10px] text-emerald-500">{m.cockpit_status_operational()}</span>
							</div>

							<div class="rounded-lg border border-border bg-background/60 p-3.5">
								<p class="text-[11px] font-medium text-muted-foreground">
									{m.cockpit_active_keys()}
								</p>
								<p class="mt-1 font-mono text-lg font-bold text-foreground">18,490</p>
								<span class="text-[10px] text-primary">All tenant verified</span>
							</div>

							<div class="rounded-lg border border-border bg-background/60 p-3.5">
								<p class="text-[11px] font-medium text-muted-foreground">
									{m.cockpit_saved_stack()}
								</p>
								<p class="mt-1 font-mono text-lg font-bold text-emerald-500">85%+</p>
								<span class="text-[10px] text-muted-foreground">Guaranteed capped</span>
							</div>
						</div>

						<!-- Real-time Event Stream Simulation -->
						<div class="rounded-lg border border-border bg-background/60 p-4">
							<div class="mb-3 flex items-center justify-between">
								<span class="font-mono text-xs font-semibold text-muted-foreground">
									{m.cockpit_live_stream()}
								</span>
								<span class="flex items-center gap-1.5 text-[11px] text-emerald-500">
									<span class="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500"></span>
									Streaming
								</span>
							</div>

							<div class="space-y-2 font-mono text-xs">
								<div
									class="flex items-center justify-between rounded bg-muted/30 px-3 py-1.5 text-muted-foreground"
								>
									<span class="text-foreground">⚡ {m.cockpit_event_auth()}</span>
									<span class="text-[10px] text-muted-foreground">tenant: acme_prod • 2ms</span>
								</div>
								<div
									class="flex items-center justify-between rounded bg-muted/30 px-3 py-1.5 text-muted-foreground"
								>
									<span class="text-primary">⚙️ {m.cockpit_event_flag()}</span>
									<span class="text-[10px] text-muted-foreground">eval: true • 0.8ms</span>
								</div>
								<div
									class="flex items-center justify-between rounded bg-muted/30 px-3 py-1.5 text-muted-foreground"
								>
									<span class="text-amber-500">🔔 {m.cockpit_event_push()}</span>
									<span class="text-[10px] text-muted-foreground">channel: APNs • 14ms</span>
								</div>
								<div
									class="flex items-center justify-between rounded bg-muted/30 px-3 py-1.5 text-muted-foreground"
								>
									<span class="text-emerald-500">💳 {m.cockpit_event_bill()}</span>
									<span class="text-[10px] text-muted-foreground">tier: free • fee: $0</span>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Tab 3: Architecture Diagram -->
				{#if cockpitTab === 'arch'}
					<div class="p-6">
						<div
							class="flex flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-border bg-background/40 px-4 py-8 md:flex-row"
						>
							<div
								class="flex flex-col items-center rounded-lg border border-border bg-card p-4 text-center shadow-sm"
							>
								<div
									class="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary"
								>
									<IconServer size={20} stroke={2} />
								</div>
								<p class="mt-2 text-xs font-bold text-foreground">Your App Client</p>
								<p class="text-[10px] text-muted-foreground">Web • Mobile • Backend</p>
							</div>

							<IconArrowRight size={20} class="text-primary" stroke={2.5} />

							<div
								class="flex flex-col items-center rounded-lg border border-primary/40 bg-primary/5 p-4 text-center shadow-sm"
							>
								<div
									class="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground"
								>
									<IconBolt size={20} stroke={2} />
								</div>
								<p class="mt-2 text-xs font-bold text-foreground">Povixa Unified Engine</p>
								<p class="text-[10px] text-muted-foreground">9 Modules • Edge Gateway</p>
							</div>

							<IconArrowRight size={20} class="text-primary" stroke={2.5} />

							<div
								class="flex flex-col items-center rounded-lg border border-border bg-card p-4 text-center shadow-sm"
							>
								<div
									class="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500"
								>
									<IconShieldCheck size={20} stroke={2} />
								</div>
								<p class="mt-2 text-xs font-bold text-foreground">Your Sovereign Data</p>
								<p class="text-[10px] text-muted-foreground">Cloud or Self-Hosted Metal</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════ METRICS & PROOF BAR ═══════════════ -->
<section class="border-y border-border/70 bg-muted/20 backdrop-blur-sm">
	<div class="mx-auto max-w-6xl px-6 py-12">
		<p class="text-center font-mono text-[11px] font-semibold tracking-wider text-muted-foreground">
			{m.proof_heading()}
		</p>

		<!-- Partner / Builder Tech SVG Logos -->
		<div class="mt-8">
			<PartnerLogos />
		</div>

		<!-- 4 High Impact Stat Badges -->
		<div class="mt-12 grid grid-cols-2 gap-4 border-t border-border/50 pt-10 lg:grid-cols-4">
			<div class="text-center">
				<p class="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
					{m.metric_stat_1_val()}
				</p>
				<p class="mt-1 text-xs text-muted-foreground">{m.metric_stat_1_lbl()}</p>
			</div>
			<div class="text-center">
				<p class="font-sans text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
					{m.metric_stat_2_val()}
				</p>
				<p class="mt-1 text-xs text-muted-foreground">{m.metric_stat_2_lbl()}</p>
			</div>
			<div class="text-center">
				<p class="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
					{m.metric_stat_3_val()}
				</p>
				<p class="mt-1 text-xs text-muted-foreground">{m.metric_stat_3_lbl()}</p>
			</div>
			<div class="text-center">
				<p class="font-sans text-3xl font-extrabold tracking-tight text-emerald-500 sm:text-4xl">
					{m.metric_stat_4_val()}
				</p>
				<p class="mt-1 text-xs text-muted-foreground">{m.metric_stat_4_lbl()}</p>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════ THE PROBLEM / THE SAAS TAX ═══════════════ -->
<section class="mx-auto max-w-6xl px-6 py-24 md:py-32">
	<div class="mx-auto max-w-2xl text-center">
		<span
			class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
		>
			{m.problem_badge()}
		</span>
		<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
			{m.problem_title()}
		</h2>
		<p class="mt-4 text-base leading-relaxed text-muted-foreground">
			{m.problem_desc()}
		</p>
	</div>

	<div class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each problems as p, idx (idx)}
			<div
				class="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
			>
				<div class="flex items-start gap-3">
					<div
						class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive"
					>
						<IconX size={14} stroke={2.5} />
					</div>
					<p class="text-xs text-muted-foreground line-through decoration-destructive/40">
						{p.before}
					</p>
				</div>

				<div class="mt-4 border-t border-border/60 pt-3">
					<div class="flex items-start gap-3">
						<div
							class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
						>
							<IconCheck size={14} stroke={2.5} />
						</div>
						<p class="text-sm font-semibold text-foreground">
							{p.after}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- ═══════════════ 9 CORE MODULES SHOWCASE ═══════════════ -->
<section id="modules" class="border-t border-border/70 bg-muted/20 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<span
				class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.modules_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				{m.modules_title()}
			</h2>
			<p class="mt-4 text-base text-muted-foreground">
				{m.modules_desc()}
			</p>
		</div>

		<div class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each modules as mod (mod.href)}
				<a
					href={mod.href}
					class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
				>
					<!-- Corner ambient highlight -->
					<div
						class="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br {mod.accent} opacity-50 blur-xl transition-opacity group-hover:opacity-100"
					></div>

					<div>
						<div class="flex items-center justify-between">
							<div
								class="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
							>
								<mod.icon size={22} stroke={1.8} />
							</div>
							<span
								class="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
							>
								{mod.tag}
							</span>
						</div>

						<h3
							class="mt-4 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary"
						>
							{mod.name}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
							{mod.desc}
						</p>
					</div>

					<div class="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
						<span>Explore module</span>
						<IconArrowUpRight
							size={14}
							stroke={2.5}
							class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						/>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════ TRUE OPEN SOURCE & SELF-HOST SHOWCASE ═══════════════ -->
<section id="self-host" class="border-t border-border/70 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<OpenSourceProof />
	</div>
</section>

<!-- ═══════════════ THE COMMUNITY PACT & POWERED BY POVIXA BADGE ═══════════════ -->
<section id="community-pact" class="border-t border-border/70 bg-muted/20 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<PoweredByBadge />
	</div>
</section>

<!-- ═══════════════ PHILOSOPHY & FAIR-SHARE CALCULATOR ═══════════════ -->
<section id="pricing" class="border-t border-border/70 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto max-w-3xl text-center">
			<span
				class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.pricing_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				{m.pricing_title()}
			</h2>
			<p class="mt-4 text-base text-muted-foreground">
				{m.pricing_desc()}
			</p>
		</div>

		<!-- 3 Core Philosophy Pillars -->
		<div class="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
			<div
				class="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm"
			>
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
				>
					<IconHeart size={22} stroke={2} />
				</div>
				<h3 class="mt-4 font-sans text-base font-bold text-foreground">
					{m.principle_1_title()}
				</h3>
				<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
					{m.principle_1_desc()}
				</p>
			</div>

			<div
				class="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm"
			>
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
				>
					<IconCoin size={22} stroke={2} />
				</div>
				<h3 class="mt-4 font-sans text-base font-bold text-foreground">
					{m.principle_2_title()}
				</h3>
				<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
					{m.principle_2_desc()}
				</p>
			</div>

			<div
				class="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm"
			>
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-500"
				>
					<IconUsersGroup size={22} stroke={2} />
				</div>
				<h3 class="mt-4 font-sans text-base font-bold text-foreground">
					{m.principle_3_title()}
				</h3>
				<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
					{m.principle_3_desc()}
				</p>
			</div>
		</div>

		<!-- ═══════════ INTERACTIVE FAIR-SHARE SIMULATOR ═══════════ -->
		<div class="mx-auto mt-16 max-w-4xl">
			<div
				class="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-card via-card to-background p-6 shadow-xl sm:p-10"
			>
				<div
					class="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 bg-primary/15 blur-3xl"
				></div>

				<div class="relative text-center">
					<h3 class="font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl">
						{m.calc_title()}
					</h3>
					<p class="mx-auto mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm">
						{m.calc_desc()}
					</p>
				</div>

				<!-- Simulator Slider -->
				<div class="relative mt-10 rounded-xl border border-border bg-muted/30 p-6">
					<div class="flex items-center justify-between">
						<label for="rev-slider" class="text-xs font-semibold text-foreground sm:text-sm">
							{m.calc_revenue_label()}
						</label>
						<span class="font-mono text-xl font-black text-primary sm:text-2xl">
							${monthlyRevenue.toLocaleString()} / mo
						</span>
					</div>

					<input
						id="rev-slider"
						type="range"
						min="0"
						max="100000"
						step="1000"
						bind:value={monthlyRevenue}
						class="mt-4 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-border accent-primary"
					/>

					<div class="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
						<span>$0 (Free MVP)</span>
						<span>$25,000</span>
						<span>$50,000</span>
						<span>$100,000+ (Hyper-Scale)</span>
					</div>
				</div>

				<!-- Comparison Output Grid -->
				<div class="mt-8 grid gap-4 sm:grid-cols-2">
					<!-- Povixa Cost Card -->
					<div
						class="rounded-xl border-2 border-primary/60 bg-primary/5 p-6 shadow-sm transition-all"
					>
						<div class="flex items-center justify-between">
							<span class="text-xs font-bold text-primary uppercase">
								{m.calc_povixa_cost_label()}
							</span>
							{#if isCapReached}
								<span
									class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500"
								>
									{m.calc_povixa_capped()}
								</span>
							{/if}
						</div>
						<div class="mt-3 flex items-baseline gap-1">
							<span class="font-sans text-4xl font-extrabold text-foreground">
								${povixaCost}
							</span>
							<span class="text-xs text-muted-foreground">/ month</span>
						</div>
						<p class="mt-2 text-xs text-muted-foreground">
							{#if povixaCost === 0}
								100% Free! You pay zero until you start making money.
							{:else if isCapReached}
								Hard cap guaranteed. Even at $1M revenue, your bill never exceeds $499.
							{:else}
								Transparent percentage share. Full 9 modules included.
							{/if}
						</p>
					</div>

					<!-- Traditional SaaS Stack Cost Card -->
					<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
						<span class="text-xs font-bold text-muted-foreground uppercase">
							{m.calc_traditional_cost_label()}
						</span>
						<div class="mt-3 flex items-baseline gap-1">
							<span class="font-sans text-4xl font-extrabold text-destructive/80">
								${traditionalCost}
							</span>
							<span class="text-xs text-muted-foreground">/ month</span>
						</div>
						<p class="mt-2 text-xs text-muted-foreground">
							Stitched across Auth0, LaunchDarkly, SendGrid, Mixpanel & S3.
						</p>
					</div>
				</div>

				<!-- Net Savings Bar -->
				<div
					class="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-6 py-4 sm:flex-row"
				>
					<div class="flex items-center gap-2">
						<span
							class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white"
						>
							<IconCheck size={16} stroke={3} />
						</span>
						<span class="text-sm font-semibold text-foreground">
							{m.calc_savings_label()}
						</span>
					</div>
					<div class="text-center sm:text-right">
						<span class="font-sans text-2xl font-black text-emerald-500">
							${savingsAmount.toLocaleString()} / mo ({savingsPercent}% saved)
						</span>
					</div>
				</div>

				<p class="mt-4 text-center text-[11px] text-muted-foreground">
					{m.calc_note()}
				</p>
			</div>
		</div>

		<!-- ═══════════ PRICING CARDS ═══════════ -->
		<div class="mt-20 grid gap-6 lg:grid-cols-3">
			{#each pricingPlans as plan (plan.name)}
				<div
					class="relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm transition-all {plan.highlight
						? 'border-primary shadow-xl shadow-primary/10'
						: 'border-border'}"
				>
					{#if plan.highlight}
						<span
							class="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[10px] font-bold tracking-wider text-primary-foreground uppercase shadow-md"
						>
							{plan.tag}
						</span>
					{/if}

					<div>
						<h3 class="font-sans text-xl font-bold text-foreground">{plan.name}</h3>
						<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{plan.desc}</p>
					</div>

					<div class="mt-6 flex items-baseline gap-1.5 border-t border-border/60 pt-6">
						<span class="font-sans text-4xl font-extrabold text-foreground">{plan.price}</span>
						<span class="text-xs text-muted-foreground">/ {plan.period}</span>
					</div>

					<ul class="mt-6 flex-1 space-y-3">
						{#each plan.features as f, fIdx (fIdx)}
							<li class="flex items-start gap-2.5 text-xs text-foreground/90">
								<IconCheck size={16} class="mt-0.5 shrink-0 text-primary" stroke={2.5} />
								<span>{f}</span>
							</li>
						{/each}
					</ul>

					<a
						href="https://id.povixa.cloud/register"
						class="mt-8 inline-flex h-11 items-center justify-center rounded-lg text-xs font-bold transition-all {plan.highlight
							? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
							: 'border border-border bg-background text-foreground hover:bg-accent'}"
					>
						{plan.cta}
					</a>
				</div>
			{/each}
		</div>

		<!-- Fairness Guarantee Banner -->
		<div
			class="mx-auto mt-12 max-w-3xl rounded-xl border border-primary/20 bg-primary/5 p-6 text-center shadow-sm"
		>
			<p class="text-xs leading-relaxed text-muted-foreground sm:text-sm">
				<span class="font-bold text-foreground">⚖️ {m.pricing_guarantee()}</span>
			</p>
		</div>
	</div>
</section>

<!-- ═══════════════ PERSONAS / FOR EVERY SCALE ═══════════════ -->
<section class="border-t border-border/70 bg-muted/20 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<span
				class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.personas_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				{m.personas_title()}
			</h2>
			<p class="mt-4 text-base text-muted-foreground">
				{m.personas_desc()}
			</p>
		</div>

		<div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each personas as p (p.name)}
				<div
					class="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40"
				>
					<div
						class="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
					>
						<p.icon size={22} stroke={1.8} />
					</div>
					<p
						class="mt-4 font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
					>
						{p.name}
					</p>
					<h3 class="mt-1 font-sans text-base font-bold text-foreground">{p.title}</h3>

					<ul class="mt-5 flex-1 space-y-2.5 border-t border-border/60 pt-4">
						{#each p.bullets as b, bIdx (bIdx)}
							<li class="flex items-start gap-2 text-xs">
								<IconCheck size={14} class="mt-0.5 shrink-0 text-primary" stroke={2.5} />
								<span class="text-muted-foreground">{b}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════ TESTIMONIALS (WALL OF LOVE) ═══════════════ -->
<section class="border-t border-border/70 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto mb-16 max-w-2xl text-center">
			<span
				class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
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
<section id="sponsors" class="border-t border-border/70 bg-muted/20 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<span
				class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
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

<!-- ═══════════════ CONTRIBUTORS & OPEN FINANCIALS ═══════════════ -->
<section id="contributors" class="border-t border-border/70 py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<ContributorPolicy />
	</div>
</section>

<!-- ═══════════════ FAQ ═══════════════ -->
<section class="border-t border-border/70 py-24 md:py-32">
	<div class="mx-auto max-w-3xl px-6">
		<div class="text-center">
			<span
				class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				{m.faq_badge()}
			</span>
			<h2 class="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				{m.faq_title()}
			</h2>
		</div>

		<div class="mt-12 divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
			{#each faqs as faq, i (i)}
				<div>
					<button
						type="button"
						onclick={() => (openFaq = openFaq === i ? null : i)}
						class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-accent/30"
					>
						<span class="font-sans text-sm font-bold text-foreground">{faq.q}</span>
						<span class="shrink-0 text-muted-foreground">
							{#if openFaq === i}
								<IconMinus size={18} stroke={2.5} class="text-primary" />
							{:else}
								<IconPlus size={18} stroke={2.5} />
							{/if}
						</span>
					</button>
					{#if openFaq === i}
						<div class="px-6 pb-5">
							<p class="text-xs leading-relaxed text-muted-foreground sm:text-sm">
								{faq.a}
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════ FINAL HIGH IMPACT CTA ═══════════════ -->
<section class="border-t border-border/70 bg-muted/20 py-24 md:py-32">
	<div class="mx-auto max-w-5xl px-6">
		<div
			class="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 text-center shadow-2xl sm:p-16"
		>
			<!-- Ambient center glow -->
			<div
				class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.22_265/0.18),transparent_65%)]"
			></div>

			<div class="relative">
				<span
					class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
				>
					{m.cta_badge()}
				</span>
				<h2
					class="mt-4 font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl"
				>
					{m.cta_title()}
				</h2>
				<p class="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
					{m.cta_desc()}
				</p>

				<div class="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
					<a
						href="https://id.povixa.cloud/register"
						class="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
					>
						{m.cta_btn_primary()}
						<IconArrowRight
							size={16}
							stroke={2.5}
							class="transition-transform group-hover:translate-x-1"
						/>
					</a>
					<a
						href="/contact"
						class="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
					>
						{m.cta_btn_secondary()}
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

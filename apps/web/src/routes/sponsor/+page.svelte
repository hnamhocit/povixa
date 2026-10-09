<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/state';
	import {
		IconHeartFilled,
		IconArrowRight,
		IconArrowLeft,
		IconShieldCheck,
		IconBrandGithub,
		IconCoins,
		IconSparkles,
		IconEye,
		IconGitPullRequest,
		IconCircleCheck
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';

	const TOTAL_SECONDS = 15;

	const isCode = $derived(page.url.searchParams.get('type') === 'code');
	const targetUrl = $derived(
		isCode ? 'https://github.com/hnamhocit/povixa' : 'https://github.com/sponsors/hnamhocit'
	);
	const destinationLabel = $derived(isCode ? m.gratitude_dest_code() : m.gratitude_dest_sponsor());

	let secondsLeft = $state(TOTAL_SECONDS);
	let isRedirecting = $state(false);

	let timer: ReturnType<typeof setInterval> | null = null;

	$effect(() => {
		timer = setInterval(() => {
			if (secondsLeft > 1) {
				secondsLeft -= 1;
			} else {
				secondsLeft = 0;
				triggerRedirect();
			}
		}, 1000);

		return () => {
			if (timer) clearInterval(timer);
		};
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	function triggerRedirect() {
		if (timer) clearInterval(timer);
		isRedirecting = true;
		if (typeof window !== 'undefined') {
			window.location.href = targetUrl;
		}
	}

	let progressPercent = $derived(((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100);
	const sponsorTitle = $derived(`${m.gratitude_title()} — Povixa`);
	const sponsorDesc = $derived(m.gratitude_msg_1());
	const currentLocale = $derived(getLocale());
	const origin = $derived(
		page.url.origin && page.url.origin !== 'null' && !page.url.origin.includes('undefined')
			? page.url.origin
			: 'https://povixa.cloud'
	);
	const ogImageUrl = $derived(`${origin}/og-image.png`);
	const currentUrl = $derived(page.url.href || `${origin}/sponsor`);
</script>

<svelte:head>
	<title>{sponsorTitle}</title>
	<meta name="description" content={sponsorDesc} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

	<!-- Canonical & Alternates -->
	<link rel="canonical" href={currentUrl} />
	<link rel="alternate" hreflang="vi" href="{origin}/sponsor?lang=vi" />
	<link rel="alternate" hreflang="en" href="{origin}/sponsor?lang=en" />
	<link rel="alternate" hreflang="x-default" href="{origin}/sponsor" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Povixa" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={sponsorTitle} />
	<meta property="og:description" content={sponsorDesc} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:secure_url" content={ogImageUrl} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1146" />
	<meta property="og:image:height" content="850" />
	<meta property="og:image:alt" content="Povixa — {sponsorTitle}" />
	<meta property="og:locale" content={currentLocale === 'vi' ? 'vi_VN' : 'en_US'} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@povixa" />
	<meta name="twitter:creator" content="@povixa" />
	<meta name="twitter:url" content={currentUrl} />
	<meta name="twitter:title" content={sponsorTitle} />
	<meta name="twitter:description" content={sponsorDesc} />
	<meta name="twitter:image" content={ogImageUrl} />
	<meta name="twitter:image:alt" content="Povixa — {sponsorTitle}" />
</svelte:head>

<section class="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-20">
	<!-- Atmospheric Ambient Lighting -->
	<div class="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
		<div
			class="h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.25_15/0.15)_0%,oklch(0.65_0.22_265/0.1)_45%,transparent_70%)] blur-3xl"
		></div>
	</div>

	<div class="mx-auto max-w-3xl text-center">
		<!-- Pulsing Heart Aura -->
		<div class="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
			<span
				class="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500/30 opacity-75"
			></span>
			<span class="absolute inline-flex h-20 w-20 rounded-full bg-rose-500/20 blur-md"></span>
			<div
				class="relative flex h-20 w-20 items-center justify-center rounded-full border border-rose-500/40 bg-gradient-to-br from-rose-500/20 to-pink-500/10 text-rose-500 shadow-xl shadow-rose-500/20 backdrop-blur-md"
			>
				<IconHeartFilled size={38} class="animate-pulse" />
			</div>
		</div>

		<!-- Badge -->
		<div
			class="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-rose-500 shadow-2xs"
		>
			<IconSparkles size={14} stroke={2.5} />
			<span>{m.gratitude_badge()}</span>
		</div>

		<!-- Main Gratitude Title -->
		<h1
			class="mt-6 font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
		>
			{m.gratitude_title()}
		</h1>

		<!-- Dignified, Concise Emotional Message -->
		<div
			class="mx-auto mt-6 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg"
		>
			<p class="font-medium text-foreground/90">
				{m.gratitude_msg_1()}
			</p>
			<p class="text-sm text-muted-foreground sm:text-base">
				{m.gratitude_msg_2()}
			</p>
		</div>

		<!-- 3 Concrete Real Activity Numbers -->
		<div class="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
			<div
				class="rounded-xl border border-primary/20 bg-card/70 p-4 text-center shadow-xs backdrop-blur-sm"
			>
				<div
					class="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
				>
					<IconEye size={18} stroke={2.5} />
				</div>
				<p class="font-sans text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
					{m.gratitude_stat_1_val()}
				</p>
				<p class="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
					{m.gratitude_stat_1_lbl()}
				</p>
			</div>

			<div
				class="rounded-xl border border-emerald-500/20 bg-card/70 p-4 text-center shadow-xs backdrop-blur-sm"
			>
				<div
					class="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500"
				>
					<IconGitPullRequest size={18} stroke={2.5} />
				</div>
				<p class="font-sans text-2xl font-extrabold tracking-tight text-emerald-500 sm:text-3xl">
					{m.gratitude_stat_2_val()}
				</p>
				<p class="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
					{m.gratitude_stat_2_lbl()}
				</p>
			</div>

			<div
				class="rounded-xl border border-violet-500/20 bg-card/70 p-4 text-center shadow-xs backdrop-blur-sm"
			>
				<div
					class="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500"
				>
					<IconCircleCheck size={18} stroke={2.5} />
				</div>
				<p class="font-sans text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
					{m.gratitude_stat_3_val()}
				</p>
				<p class="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
					{m.gratitude_stat_3_lbl()}
				</p>
			</div>
		</div>

		<!-- 15-Second Animated Redirect Progress Box -->
		<div
			class="mx-auto mt-10 max-w-md rounded-2xl border border-border/80 bg-card/80 p-6 shadow-xl backdrop-blur-md"
		>
			<div class="flex items-center justify-between font-mono text-xs text-muted-foreground">
				<span class="flex items-center gap-2 font-semibold text-foreground">
					<IconBrandGithub size={16} stroke={2} />
					<span>{destinationLabel}</span>
				</span>
				<span class="font-bold text-primary">{secondsLeft}s</span>
			</div>

			<!-- Visual Progress Bar -->
			<div class="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-muted">
				<div
					class="h-full bg-gradient-to-r from-primary via-rose-500 to-indigo-500 transition-all duration-1000 ease-linear"
					style="width: {progressPercent}%;"
				></div>
			</div>

			<p class="mt-3 text-[11px] text-muted-foreground">
				{m.gratitude_timer_label({ seconds: secondsLeft })}
			</p>

			<!-- Action Buttons -->
			<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
				<button
					type="button"
					onclick={triggerRedirect}
					disabled={isRedirecting}
					class="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 disabled:opacity-75"
				>
					<span>{m.gratitude_btn_skip()}</span>
					<IconArrowRight
						size={14}
						stroke={2.5}
						class="transition-transform group-hover:translate-x-1"
					/>
				</button>

				<a
					href="/"
					class="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
				>
					<IconArrowLeft size={14} stroke={2} />
					<span>{m.gratitude_btn_back()}</span>
				</a>
			</div>
		</div>

		<!-- Transparent Financial & Profit-Sharing Pledge Grid -->
		<div class="mt-14 border-t border-border/60 pt-10 text-left">
			<h2
				class="text-center font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase"
			>
				{m.gratitude_pledge_title()}
			</h2>

			<div class="mt-6 grid gap-4 sm:grid-cols-3">
				<div class="rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500"
					>
						<IconShieldCheck size={18} stroke={2.5} />
					</div>
					<p class="mt-3 text-xs leading-snug font-semibold text-foreground">
						{m.gratitude_pledge_1()}
					</p>
				</div>

				<div class="rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500"
					>
						<IconCoins size={18} stroke={2.5} />
					</div>
					<p class="mt-3 text-xs leading-snug font-semibold text-foreground">
						{m.gratitude_pledge_2()}
					</p>
				</div>

				<div class="rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
					>
						<IconSparkles size={18} stroke={2.5} />
					</div>
					<p class="mt-3 text-xs leading-snug font-semibold text-foreground">
						{m.gratitude_pledge_3()}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import ScrollToTop from '#lib/components/ScrollToTop.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { overwriteGetLocale } from '#lib/paraglide/runtime.js';

	let { children }: LayoutProps = $props();

	overwriteGetLocale(() => {
		if (typeof document !== 'undefined') {
			return document.documentElement.lang as 'en' | 'vi';
		}
		return 'en';
	});

	const orgWebsiteSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': 'https://povixa.dev/#organization',
				name: 'Povixa',
				url: 'https://povixa.dev',
				logo: 'https://povixa.dev/favicon.svg',
				image: 'https://povixa.dev/og-image.png',
				sameAs: ['https://github.com/povixa', 'https://x.com/povixa', 'https://discord.gg/povixa'],
				description: 'Unified open-source developer control plane for modern applications.'
			},
			{
				'@type': 'WebSite',
				'@id': 'https://povixa.dev/#website',
				url: 'https://povixa.dev',
				name: 'Povixa',
				publisher: {
					'@id': 'https://povixa.dev/#organization'
				}
			}
		]
	};

	const orgScript =
		`<script type="application/ld+json">${JSON.stringify(orgWebsiteSchema)}<` + '/script>';
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="apple-touch-icon" href="/favicon.svg" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<meta name="author" content="Povixa" />
	<!-- Fallback Open Graph & Twitter -->
	<meta property="og:site_name" content="Povixa" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://povixa.dev/og-image.png" />
	<meta property="og:image:width" content="1146" />
	<meta property="og:image:height" content="850" />
	<meta property="og:image:alt" content="Povixa — Unified Developer Control Plane" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@povixa" />
	<meta name="twitter:creator" content="@povixa" />
	<meta name="twitter:image" content="https://povixa.dev/og-image.png" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html orgScript}
</svelte:head>

<ModeWatcher defaultMode="system" />

<div
	class="relative flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary"
>
	<!-- Global ambient background texture & lighting -->
	<div class="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
		<!-- Subtle ambient mesh lights -->
		<div
			class="absolute -top-[300px] left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.22_265/0.1)_0%,transparent_70%)] opacity-70 blur-3xl dark:opacity-100"
		></div>

		<!-- Global subtle tech grid pattern -->
		<div
			class="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
			style="background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 64px 64px;"
		></div>
	</div>

	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<ScrollToTop />
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>

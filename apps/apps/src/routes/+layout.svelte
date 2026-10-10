<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, overwriteGetLocale } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { ModeWatcher } from 'mode-watcher';
	import AppsHeader from '#lib/components/AppsHeader.svelte';
	import DeployModal from '#lib/components/DeployModal.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { auth } from '#lib/stores/auth.svelte.js';
	import { onMount } from 'svelte';

	let { children }: LayoutProps = $props();

	let deployModalOpen = $state(false);

	overwriteGetLocale(() => {
		if (typeof document !== 'undefined') {
			const match = document.cookie.match(/PARAGLIDE_LOCALE=(en|vi)/);
			if (match) return match[1] as 'en' | 'vi';
			return (document.documentElement.lang as 'en' | 'vi') || 'vi';
		}
		return 'vi';
	});

	onMount(() => {
		auth.init('apps');
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="icon" href="/favicon.svg" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<title>Povixa Apps — Application Hub & Instant Edge Deployments</title>
	<meta name="description" content="Discover, manage, and deploy high-performance applications and microservices across Povixa's global Anycast edge network." />
	<meta name="keywords" content="povixa, apps, edge deployments, sveltekit, nestjs, nextjs, anycast, serverless, microservices" />
	<meta property="og:title" content="Povixa Apps — Application Hub & Instant Edge Deployments" />
	<meta property="og:description" content="Discover, manage, and deploy high-performance applications and microservices across Povixa's global Anycast edge network." />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<div class="relative min-h-screen flex flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
	<!-- Top Navigation Header -->
	<AppsHeader />

	<!-- Main Page Workspace (Standard max-w-7xl container) -->
	<main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
		{@render children()}
	</main>

	<!-- Full Ecosystem Footer with White Contrast in Light Mode -->
	<Footer />

	<!-- Global Deploy Modal -->
	<DeployModal bind:open={deployModalOpen} />
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={(resolve as any)(localizeHref(page.url.pathname, { locale }))}>{locale}</a>
	{/each}
</div>

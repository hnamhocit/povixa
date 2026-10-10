<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, overwriteGetLocale } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { ModeWatcher } from 'mode-watcher';
	import ConsoleSidebar from '#lib/components/ConsoleSidebar.svelte';
	import ConsoleHeader from '#lib/components/ConsoleHeader.svelte';
	import { auth } from '#lib/stores/auth.svelte.js';
	import { onMount } from 'svelte';

	let { children }: LayoutProps = $props();

	let mobileSidebarOpen = $state(false);

	overwriteGetLocale(() => {
		if (typeof document !== 'undefined') {
			return (document.documentElement.lang as 'en' | 'vi') || 'en';
		}
		return 'en';
	});

	onMount(() => {
		auth.init('console');
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="icon" href="/favicon.svg" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<title>Povixa Console — Unified Cloud & Developer Cockpit</title>
	<meta name="description" content="Centralized management console for Povixa platform: Auth, Remote Config, Push Notifications, Storage, Telemetry and Observability." />
	<meta name="keywords" content="povixa, console, developer cockpit, cloud, auth, s3 storage, telemetry, observability" />
	<meta property="og:title" content="Povixa Console — Unified Cloud & Developer Cockpit" />
	<meta property="og:description" content="Centralized control plane for 9 core platform modules and distributed edge services." />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<div class="relative min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
	<!-- Fixed Left Navigation Sidebar -->
	<ConsoleSidebar bind:mobileOpen={mobileSidebarOpen} />

	<!-- Main Workspace Area -->
	<div class="flex min-h-screen flex-col lg:pl-72">
		<!-- Top App Header -->
		<ConsoleHeader onToggleMobile={() => (mobileSidebarOpen = !mobileSidebarOpen)} />

		<!-- Page Route Content with generous padding -->
		<main class="flex-1 w-full max-w-[1600px] mx-auto p-6 sm:p-8 lg:p-10">
			{@render children()}
		</main>
	</div>
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={(resolve as any)(localizeHref(page.url.pathname, { locale }))}>{locale}</a>
	{/each}
</div>

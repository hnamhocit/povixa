<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, overwriteGetLocale } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children }: LayoutProps = $props();

	overwriteGetLocale(() => {
		if (typeof document !== 'undefined') {
			return (document.documentElement.lang as 'en' | 'vi') || 'en';
		}
		return 'en';
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<meta name="author" content="Povixa" />
	<title>Povixa ID — Unified Identity & Single Sign-On</title>
</svelte:head>

<ModeWatcher defaultMode="light" />

<div
	class="relative flex min-h-screen flex-col overflow-x-hidden bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary"
>
	<Header />

	<main class="flex flex-1 flex-col bg-background">
		{@render children()}
	</main>

	<Footer />
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={(resolve as any)(localizeHref(page.url.pathname, { locale }))}>{locale}</a>
	{/each}
</div>

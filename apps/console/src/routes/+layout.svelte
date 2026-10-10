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
	import { IconBolt, IconLoader2 } from '@tabler/icons-svelte-runes';

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
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<title>Povixa Console — Unified Cloud & Developer Cockpit</title>
</svelte:head>

<ModeWatcher defaultMode="dark" />

{#if !auth.user && auth.loading}
	<!-- Minimalist SSO Auth Guard Loading Splash -->
	<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
		<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary via-indigo-500 to-cyan-400 p-0.5 shadow-xl shadow-primary/25 animate-pulse">
			<div class="flex h-full w-full items-center justify-center rounded-[14px] bg-background text-primary">
				<IconBolt size={24} stroke={2.5} />
			</div>
		</div>
		<div class="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
			<IconLoader2 size={15} class="animate-spin text-primary" />
			<span>Đang kiểm tra phiên xác thực SSO...</span>
		</div>
	</div>
{:else}
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
{/if}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={(resolve as any)(localizeHref(page.url.pathname, { locale }))}>{locale}</a>
	{/each}
</div>

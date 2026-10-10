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
	import { auth } from '#lib/stores/auth.svelte.js';
	import { onMount } from 'svelte';
	import { IconRocket, IconLoader2 } from '@tabler/icons-svelte-runes';

	let { children }: LayoutProps = $props();

	let deployModalOpen = $state(false);

	overwriteGetLocale(() => {
		if (typeof document !== 'undefined') {
			return (document.documentElement.lang as 'en' | 'vi') || 'en';
		}
		return 'en';
	});

	onMount(() => {
		auth.init('apps');
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<title>Povixa Apps — Application Hub & Instant Edge Deployments</title>
</svelte:head>

<ModeWatcher defaultMode="dark" />

{#if !auth.user && auth.loading}
	<!-- Minimalist SSO Auth Guard Loading Splash -->
	<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
		<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-primary p-0.5 shadow-xl shadow-primary/25 animate-pulse">
			<div class="flex h-full w-full items-center justify-center rounded-[14px] bg-background text-primary">
				<IconRocket size={24} stroke={2.5} />
			</div>
		</div>
		<div class="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
			<IconLoader2 size={15} class="animate-spin text-primary" />
			<span>Đang kiểm tra phiên xác thực SSO...</span>
		</div>
	</div>
{:else}
	<div class="relative min-h-screen flex flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
		<!-- Top Navigation Header -->
		<AppsHeader onOpenDeployModal={() => (deployModalOpen = true)} />

		<!-- Main Page Workspace -->
		<main class="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
			{@render children()}
		</main>

		<!-- Footer -->
		<footer class="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
			<div class="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<span class="font-bold text-foreground">Povixa Apps</span>
					<span>•</span>
					<span>Anycast Edge Deployments</span>
				</div>
				<div class="flex items-center gap-6">
					<a href="http://localhost:5173" target="_blank" class="hover:text-foreground transition-colors">Developer Console</a>
					<a href="http://localhost:5174" target="_blank" class="hover:text-foreground transition-colors">Central Auth</a>
					<a href="https://docs.povixa.com" target="_blank" class="hover:text-foreground transition-colors">Documentation</a>
					<a href="https://github.com/povixa" target="_blank" class="hover:text-foreground transition-colors">GitHub</a>
				</div>
			</div>
		</footer>

		<!-- Global Deploy Modal -->
		<DeployModal bind:open={deployModalOpen} />
	</div>
{/if}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={(resolve as any)(localizeHref(page.url.pathname, { locale }))}>{locale}</a>
	{/each}
</div>

<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { ModeWatcher } from 'mode-watcher';
	import LegalHeader from '#lib/components/LegalHeader.svelte';
	import LegalSidebar from '#lib/components/LegalSidebar.svelte';
	import { overwriteGetLocale } from '#lib/paraglide/runtime.js';
	import * as m from '#lib/paraglide/messages.js';

	let { children }: LayoutProps = $props();

	let mobileSidebarOpen = $state(false);

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
	<title>{m.legal_title()} — Povixa Trust &amp; Compliance</title>
	<meta name="description" content={m.legal_desc()} />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="{m.legal_title()} — Povixa" />
	<meta property="og:description" content={m.legal_desc()} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{m.legal_title()} — Povixa" />
	<meta name="twitter:description" content={m.legal_desc()} />
</svelte:head>

<ModeWatcher />

<div class="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
	<LegalHeader onToggleSidebar={() => (mobileSidebarOpen = !mobileSidebarOpen)} />
	
	<div class="flex-1 flex w-full">
		<LegalSidebar bind:mobileOpen={mobileSidebarOpen} />
		
		<main class="flex-1 min-w-0 px-6 py-8 sm:px-10 lg:px-16">
			<div class="max-w-4xl mx-auto">
				{@render children()}
			</div>
		</main>
	</div>
</div>

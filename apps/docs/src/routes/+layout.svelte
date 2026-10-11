<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { ModeWatcher } from 'mode-watcher';
	import DocsHeader from '#lib/components/DocsHeader.svelte';
	import { overwriteGetLocale } from '#lib/paraglide/runtime.js';

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
	<link rel="icon" href="/favicon.svg" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<title>Povixa Documentation — Kiến Trúc & Tài Liệu Kỹ Thuật</title>
	<meta
		name="description"
		content="Tài liệu kỹ thuật chính thức của Povixa Platform — Nền tảng điều khiển ứng dụng thống nhất, tự vận hành và mã nguồn mở."
	/>
	<meta property="og:title" content="Povixa Documentation — Kiến Trúc & Tài Liệu Kỹ Thuật" />
	<meta
		property="og:description"
		content="Tài liệu kỹ thuật chính thức của Povixa Platform — Nền tảng điều khiển ứng dụng thống nhất, tự vận hành và mã nguồn mở."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:image:width" content="1146" />
	<meta property="og:image:height" content="850" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Povixa Documentation — Kiến Trúc & Tài Liệu Kỹ Thuật" />
	<meta
		name="twitter:description"
		content="Tài liệu kỹ thuật chính thức của Povixa Platform — Nền tảng điều khiển ứng dụng thống nhất, tự vận hành và mã nguồn mở."
	/>
	<meta name="twitter:image" content="/og-image.png" />
</svelte:head>

<ModeWatcher />

<div class="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
	<DocsHeader onToggleSidebar={() => (mobileSidebarOpen = !mobileSidebarOpen)} />
	<div class="flex-1">
		{@render children()}
	</div>
</div>

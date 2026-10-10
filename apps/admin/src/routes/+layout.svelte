<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { ModeWatcher } from 'mode-watcher';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="icon" href="/favicon.svg" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<title>Povixa Super Admin — Platform Operations & Edge Fleet Control</title>
	<meta name="description" content="Trung tâm quản trị hạ tầng và vận hành siêu cấp Povixa: Giám sát Edge Fleet toàn cầu, kiểm soát Multi-tenancy, RBAC phân quyền và ngắt mạch an ninh." />
	<meta name="keywords" content="povixa, super admin, infrastructure, edge fleet, rbac, tenants, multi-tenant cloud, platform operations" />
	<meta property="og:title" content="Povixa Super Admin — Platform Operations & Edge Fleet Control" />
	<meta property="og:description" content="Trung tâm điều khiển hạ tầng cụm Cloud, điều phối tổ chức doanh nghiệp và an ninh bảo mật cấp gốc Povixa." />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Povixa Super Admin — Platform Operations" />
	<meta name="twitter:description" content="Hệ thống điều phối hạ tầng, tenant và an ninh siêu cấp Povixa." />
	<meta name="twitter:image" content="/og-image.png" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<div class="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
	{@render children()}
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={(resolve as any)(localizeHref(page.url.pathname, { locale }))}>{locale}</a>
	{/each}
</div>


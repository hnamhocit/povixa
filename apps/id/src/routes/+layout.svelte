<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, overwriteGetLocale } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import Footer from '#lib/components/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children }: LayoutProps = $props();

	overwriteGetLocale(() => {
		if (typeof document !== 'undefined') {
			const match = document.cookie.match(/PARAGLIDE_LOCALE=(en|vi)/);
			if (match) return match[1] as 'en' | 'vi';
			return (document.documentElement.lang as 'en' | 'vi') || 'vi';
		}
		return 'vi';
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="icon" href="/favicon.svg" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16" />
	<meta name="author" content="Povixa" />
	<title>Povixa Auth — Cổng Xác Thực Tập Trung & Single Sign-On</title>
	<meta name="description" content="Cổng xác thực tập trung SSO cho toàn bộ hệ sinh thái Povixa (Console, Apps Hub, Super Admin, Docs). Đăng nhập một lần với Passkeys, OAuth 2.1 và OIDC." />
	<meta name="keywords" content="povixa, auth, sso, passkeys, oauth, oidc, fido2, single sign-on" />
	<meta property="og:title" content="Povixa Auth — Cổng Xác Thực Tập Trung & Single Sign-On" />
	<meta property="og:description" content="Một phiên đăng nhập duy nhất cho toàn bộ hệ sinh thái Povixa." />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<div
	class="relative flex min-h-screen flex-col overflow-x-hidden bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary"
>
	<!-- Header removed per user request: Logo positioned absolute on main page -->

	<main class="flex flex-1 flex-col bg-transparent">
		{@render children()}
	</main>

	<!-- Footer at bottom matching web -->
	<Footer />
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={(resolve as any)(localizeHref(page.url.pathname, { locale }))}>{locale}</a>
	{/each}
</div>

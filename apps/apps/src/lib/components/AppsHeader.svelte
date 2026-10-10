<script lang="ts">
	import {
		IconRocket,
		IconDashboard,
		IconExternalLink,
		IconLogout,
		IconUser,
		IconMenu2,
		IconX
	} from '@tabler/icons-svelte-runes';
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { auth } from '#lib/stores/auth.svelte.js';

	let mobileMenuOpen = $state(false);
	let userMenuOpen = $state(false);

	const navLinks = $derived([
		{ href: '/', label: m.nav_apps() },
		{ href: '/templates', label: m.nav_templates() }
	]);
</script>

<header class="sticky top-0 z-40 w-full border-b border-border/50 bg-background/85 backdrop-blur-xl">
	<!-- Unified Container matching layout -->
	<div class="flex h-16 w-full max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Left: Brand & Primary Nav -->
		<div class="flex items-center gap-6">
			<!-- Brand Logo -->
			<a href="/" class="flex items-center gap-2.5 group shrink-0">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-primary p-0.5 shadow-md shadow-primary/20 transition-transform group-hover:scale-105"
				>
					<div class="flex h-full w-full items-center justify-center rounded-[10px] bg-background/90 text-primary">
						<IconRocket size={18} stroke={2.5} />
					</div>
				</div>
				<div class="flex items-center gap-2">
					<span class="font-bold tracking-tight text-foreground font-sans text-base">POVIXA</span>
					<span class="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-500 font-mono">
						APPS
					</span>
				</div>
			</a>

			<!-- Main Navigation Tabs -->
			<nav class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					{@const active = page.url.pathname === link.href}
					<a
						href={link.href}
						class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all {active
							? 'bg-secondary text-foreground shadow-2xs font-bold'
							: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'}"
					>
						{link.label}
					</a>
				{/each}

				<a
					href="http://localhost:5173"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-all"
				>
					<span>Console</span>
					<IconExternalLink size={12} class="opacity-60" />
				</a>
			</nav>
		</div>

		<!-- Right: Utilities & Account -->
		<div class="flex items-center gap-2.5 sm:gap-3">
			<!-- Language & Theme -->
			<LanguageSwitcher />
			<ThemeToggle />

			<!-- User Profile / Login -->
			{#if auth.user}
				<div class="relative">
					<button
						type="button"
						onclick={() => (userMenuOpen = !userMenuOpen)}
						onblur={() => setTimeout(() => (userMenuOpen = false), 200)}
						class="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-xs font-bold text-primary transition-transform hover:scale-105"
						title={auth.user.user}
					>
						{auth.user.user.slice(0, 2).toUpperCase()}
					</button>

					{#if userMenuOpen}
						<div class="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50">
							<div class="border-b border-border/50 px-3 py-2">
								<p class="font-semibold text-xs text-foreground truncate">{auth.user.user}</p>
								<p class="text-[10px] text-muted-foreground">SSO: {auth.user.provider}</p>
							</div>
							<div class="py-1">
								<a
									href="http://localhost:5173"
									target="_blank"
									class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-accent"
								>
									<IconDashboard size={14} class="text-muted-foreground" />
									<span>Developer Console</span>
								</a>
								<a
									href="http://localhost:5174"
									target="_blank"
									class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-accent"
								>
									<IconUser size={14} class="text-muted-foreground" />
									<span>{getLocale() === 'en' ? 'Central SSO Auth' : 'Cổng Xác Thực SSO'}</span>
								</a>
							</div>
							<div class="border-t border-border/50 pt-1">
								<button
									type="button"
									onclick={() => auth.signOut('apps')}
									class="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10"
								>
									<IconLogout size={14} />
									<span>{getLocale() === 'en' ? 'Sign out' : 'Đăng xuất'}</span>
								</button>
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<a
					href="http://localhost:5174?app=apps&redirect_uri=http://localhost:5175"
					class="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
				>
					<IconUser size={14} class="text-primary" />
					<span>{getLocale() === 'en' ? 'Sign In' : 'Đăng nhập'}</span>
				</a>
			{/if}

			<!-- Mobile menu toggle -->
			<button
				type="button"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground md:hidden"
				aria-label="Open mobile menu"
			>
				{#if mobileMenuOpen}
					<IconX size={18} />
				{:else}
					<IconMenu2 size={18} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Navigation Menu -->
	{#if mobileMenuOpen}
		<div class="border-t border-border/50 bg-card p-4 md:hidden space-y-2 text-xs">
			{#each navLinks as link}
				<a
					href={link.href}
					onclick={() => (mobileMenuOpen = false)}
					class="block rounded-lg px-3 py-2 font-medium text-foreground hover:bg-accent"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="http://localhost:5173"
				target="_blank"
				class="flex items-center justify-between rounded-lg px-3 py-2 font-medium text-muted-foreground hover:bg-accent"
			>
				<span>Developer Console</span>
				<IconExternalLink size={13} />
			</a>
		</div>
	{/if}
</header>

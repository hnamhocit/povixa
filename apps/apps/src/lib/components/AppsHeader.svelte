<script lang="ts">
	import {
		IconRocket,
		IconPlus,
		IconChevronDown,
		IconCheck,
		IconDashboard,
		IconExternalLink,
		IconLogout,
		IconUser,
		IconMenu2,
		IconX,
		IconFolderCode
	} from '@tabler/icons-svelte-runes';
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import { auth } from '#lib/stores/auth.svelte.js';

	let { onOpenDeployModal = () => {} } = $props<{ onOpenDeployModal?: () => void }>();

	let mobileMenuOpen = $state(false);
	let workspaceDropdown = $state(false);
	let userMenuOpen = $state(false);

	const workspaces = [
		{ id: 'team', name: 'Team Studio', active: true },
		{ id: 'personal', name: 'Personal Projects', active: false }
	];
	let currentWorkspace = $state(workspaces[0]);

	const navLinks = $derived([
		{ href: '/', label: m.nav_apps() },
		{ href: '/templates', label: m.nav_templates() },
		{ href: '/domains', label: m.nav_domains() }
	]);
</script>

<header class="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Left: Brand, Workspace & Navigation -->
		<div class="flex items-center gap-6 lg:gap-8">
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

			<div class="hidden sm:block h-4 w-px bg-border/60"></div>

			<!-- Workspace Selector -->
			<div class="relative hidden sm:block">
				<button
					type="button"
					onclick={() => (workspaceDropdown = !workspaceDropdown)}
					class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/60"
				>
					<span class="text-muted-foreground">Workspace:</span>
					<span class="font-semibold">{currentWorkspace.name}</span>
					<IconChevronDown size={13} class="text-muted-foreground transition-transform {workspaceDropdown ? 'rotate-180' : ''}" />
				</button>

				{#if workspaceDropdown}
					<div class="absolute left-0 top-full mt-1.5 z-50 w-48 rounded-xl border border-border bg-card p-1 shadow-xl">
						{#each workspaces as ws}
							<button
								type="button"
								onclick={() => {
									currentWorkspace = ws;
									workspaceDropdown = false;
								}}
								class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left {currentWorkspace.id === ws.id ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-accent'}"
							>
								<span>{ws.name}</span>
								{#if currentWorkspace.id === ws.id}
									<IconCheck size={13} class="text-primary" />
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Main Navigation Tabs -->
			<nav class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					{@const active = page.url.pathname === link.href}
					<a
						href={link.href}
						class="rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all {active
							? 'bg-secondary text-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Right: Quick Actions, Theme, Language & User Profile -->
		<div class="flex items-center gap-3">
			<!-- Link to Developer Console -->
			<a
				href="http://localhost:5173"
				target="_blank"
				class="hidden lg:inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
			>
				<IconDashboard size={15} />
				<span>Console</span>
				<IconExternalLink size={12} class="opacity-60" />
			</a>

			<!-- New Deploy Primary Action -->
			<button
				type="button"
				onclick={onOpenDeployModal}
				class="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02]"
			>
				<IconPlus size={14} stroke={2.5} />
				<span>{m.btn_deploy_app()}</span>
			</button>

			<div class="h-4 w-px bg-border/60 mx-0.5"></div>

			<!-- Locale & Theme -->
			<LanguageSwitcher />
			<ThemeToggle />

			<!-- Authenticated User Profile Menu -->
			{#if auth.user}
				<div class="relative">
					<button
						type="button"
						onclick={() => (userMenuOpen = !userMenuOpen)}
						onblur={() => setTimeout(() => (userMenuOpen = false), 200)}
						class="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-primary/25 to-cyan-500/25 text-xs font-bold text-primary border border-primary/30 transition-transform hover:scale-105"
						title={auth.user.user}
					>
						{auth.user.user.slice(0, 2).toUpperCase()}
					</button>

					{#if userMenuOpen}
						<div class="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-xl backdrop-blur-md z-50">
							<div class="border-b border-border/50 px-3 py-2">
								<p class="font-semibold text-xs text-foreground truncate">{auth.user.user}</p>
								<p class="text-[10px] text-emerald-500 font-medium">SSO: {auth.user.provider}</p>
							</div>
							<div class="py-1">
								<a
									href="http://localhost:5173"
									target="_blank"
									class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-accent"
								>
									<IconDashboard size={14} class="text-muted-foreground" />
									<span>Mở Developer Console</span>
								</a>
								<a
									href="http://localhost:5174"
									target="_blank"
									class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-accent"
								>
									<IconUser size={14} class="text-muted-foreground" />
									<span>Cổng Xác Thực SSO</span>
								</a>
							</div>
							<div class="border-t border-border/50 pt-1">
								<button
									type="button"
									onclick={() => auth.signOut('apps')}
									class="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10"
								>
									<IconLogout size={14} />
									<span>Đăng xuất</span>
								</button>
							</div>
						</div>
					{/if}
				</div>
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

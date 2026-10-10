<script lang="ts">
	import {
		IconMenu2,
		IconSearch,
		IconPlus,
		IconCheck,
		IconUser,
		IconLogout,
		IconShield,
		IconTerminal2,
		IconBolt
	} from '@tabler/icons-svelte-runes';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import { auth } from '#lib/stores/auth.svelte.js';

	let { onToggleMobile = () => {} } = $props<{ onToggleMobile?: () => void }>();

	let userMenuOpen = $state(false);
	let searchModalOpen = $state(false);
	let searchQuery = $state('');

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			searchModalOpen = !searchModalOpen;
		}
		if (e.key === 'Escape' && searchModalOpen) {
			searchModalOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl lg:px-10">
	<!-- Left Side: Mobile Menu Button & Search Trigger -->
	<div class="flex items-center gap-4">
		<button
			type="button"
			onclick={onToggleMobile}
			class="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground lg:hidden"
			aria-label="Open sidebar"
		>
			<IconMenu2 size={18} stroke={2} />
		</button>

		<!-- Command Search Bar -->
		<button
			type="button"
			onclick={() => (searchModalOpen = true)}
			class="flex h-9 items-center gap-2.5 rounded-xl border border-border/60 bg-secondary/30 px-3.5 text-xs text-muted-foreground transition-all hover:border-border hover:bg-secondary/60 sm:w-64 md:w-80"
		>
			<IconSearch size={15} class="shrink-0 text-muted-foreground" />
			<span class="flex-1 text-left truncate">{m.search_placeholder()}</span>
			<kbd class="hidden items-center gap-0.5 rounded-md border border-border/70 bg-card px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-flex">
				⌘K
			</kbd>
		</button>
	</div>

	<!-- Right Side Actions -->
	<div class="flex items-center gap-3">
		<!-- Cluster Health Indicator -->
		<div class="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500 md:inline-flex">
			<span class="relative flex h-2 w-2">
				<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
				<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
			</span>
			<span>{m.cluster_status_healthy()}</span>
		</div>

		<!-- New Key Quick Action -->
		<a
			href="/api-keys"
			class="hidden items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] sm:inline-flex"
		>
			<IconPlus size={14} stroke={2.5} />
			<span>{m.btn_new_api_key()}</span>
		</a>

		<div class="h-4 w-px bg-border/60 mx-0.5"></div>

		<!-- Theme & Language -->
		<LanguageSwitcher />
		<ThemeToggle />

		<!-- Authenticated User Avatar & Dropdown -->
		{#if auth.user}
			<div class="relative">
				<button
					type="button"
					onclick={() => (userMenuOpen = !userMenuOpen)}
					onblur={() => setTimeout(() => (userMenuOpen = false), 200)}
					class="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-tr from-primary/20 to-indigo-500/20 text-xs font-bold text-primary transition-all hover:scale-105"
					title={auth.user.user}
				>
					{auth.user.user.slice(0, 2).toUpperCase()}
				</button>

				{#if userMenuOpen}
					<div class="absolute right-0 top-full mt-2 w-60 rounded-xl border border-border bg-card p-1.5 shadow-2xl backdrop-blur-md z-50">
						<div class="border-b border-border/50 px-3 py-2.5">
							<p class="font-semibold text-xs text-foreground truncate">{auth.user.user}</p>
							<p class="text-[10px] text-emerald-500 font-medium">SSO: {auth.user.provider}</p>
							<span class="mt-1 inline-block rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
								{m.user_role()}
							</span>
						</div>
						<div class="py-1">
							<a href="/billing" class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-accent">
								<IconShield size={14} class="text-muted-foreground" />
								<span>{m.nav_billing()}</span>
							</a>
							<a href="http://localhost:5174" target="_blank" class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-accent">
								<IconUser size={14} class="text-muted-foreground" />
								<span>Povixa Central Auth</span>
							</a>
						</div>
						<div class="border-t border-border/50 pt-1">
							<button
								type="button"
								onclick={() => auth.signOut('console')}
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
	</div>
</header>

<!-- Command Palette Modal -->
{#if searchModalOpen}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-background/80 backdrop-blur-sm"
	>
		<div
			class="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
		>
			<div class="flex items-center border-b border-border px-4 py-3.5">
				<IconSearch size={18} class="text-muted-foreground mr-3" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Tìm kiếm tài nguyên, flags, API keys, modules..."
					class="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
				/>
				<button
					type="button"
					onclick={() => (searchModalOpen = false)}
					class="rounded px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent"
				>
					ESC
				</button>
			</div>
			<div class="p-3 max-h-80 overflow-y-auto space-y-1 text-xs">
				<div class="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">Điều Hướng Nhanh</div>
				<a
					href="/"
					onclick={() => (searchModalOpen = false)}
					class="flex items-center justify-between rounded-lg px-3 py-2 text-foreground hover:bg-accent"
				>
					<span>Tổng Quan Cockpit</span>
					<span class="text-muted-foreground font-mono">/</span>
				</a>
				<a
					href="/config"
					onclick={() => (searchModalOpen = false)}
					class="flex items-center justify-between rounded-lg px-3 py-2 text-foreground hover:bg-accent"
				>
					<span>Remote Config & Feature Flags</span>
					<span class="text-muted-foreground font-mono">/config</span>
				</a>
				<a
					href="/api-keys"
					onclick={() => (searchModalOpen = false)}
					class="flex items-center justify-between rounded-lg px-3 py-2 text-foreground hover:bg-accent"
				>
					<span>API Keys & Access Tokens</span>
					<span class="text-muted-foreground font-mono">/api-keys</span>
				</a>
				<a
					href="/observability"
					onclick={() => (searchModalOpen = false)}
					class="flex items-center justify-between rounded-lg px-3 py-2 text-foreground hover:bg-accent"
				>
					<span>Observability & Luồng Logs Traces</span>
					<span class="text-muted-foreground font-mono">/observability</span>
				</a>
				<a
					href="/billing"
					onclick={() => (searchModalOpen = false)}
					class="flex items-center justify-between rounded-lg px-3 py-2 text-foreground hover:bg-accent"
				>
					<span>Billing & Cam kết Miễn phí $0</span>
					<span class="text-muted-foreground font-mono">/billing</span>
				</a>
			</div>
		</div>
	</div>
{/if}

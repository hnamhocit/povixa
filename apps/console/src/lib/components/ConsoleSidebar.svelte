<script lang="ts">
	import {
		IconDashboard,
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconDatabase,
		IconEye,
		IconMessageCircle,
		IconFileText,
		IconCoin,
		IconKey,
		IconSettings,
		IconLayoutGrid,
		IconServer,
		IconBook2,
		IconExternalLink,
		IconChevronDown,
		IconCheck,
		IconBolt,
		IconShieldLock
	} from '@tabler/icons-svelte-runes';
	import { page } from '$app/state';
	import * as m from '#lib/paraglide/messages.js';

	let { mobileOpen = $bindable(false) } = $props<{ mobileOpen?: boolean }>();

	let workspaceDropdown = $state(false);
	const workspaces = [
		{ id: 'prod', name: 'Production Workspace', plan: 'Community Pact ($0)', active: true },
		{ id: 'staging', name: 'Staging Environment', plan: 'Dev Sandbox', active: false },
		{ id: 'team', name: 'Povixa Team Core', plan: 'Enterprise Cluster', active: false }
	];
	let currentWorkspace = $state(workspaces[0]);

	function selectWorkspace(ws: typeof workspaces[0]) {
		currentWorkspace = ws;
		workspaceDropdown = false;
	}

	// 9 Core Platform Modules matching apps/web
	const coreModules = $derived([
		{ href: '/auth', label: m.nav_auth(), icon: IconFingerprint, badge: 'ID' },
		{ href: '/config', label: m.nav_config(), icon: IconAdjustments, badge: 'Flags' },
		{ href: '/notifications', label: m.nav_notifications(), icon: IconBell, badge: 'Push' },
		{ href: '/analytics', label: m.nav_analytics(), icon: IconChartHistogram, badge: 'Events' },
		{ href: '/storage', label: m.nav_storage(), icon: IconDatabase, badge: 'S3' },
		{ href: '/observability', label: m.nav_observability(), icon: IconEye, badge: 'Logs' },
		{ href: '/support', label: m.nav_support(), icon: IconMessageCircle, badge: 'Desk' },
		{ href: '/legal', label: m.nav_legal(), icon: IconFileText, badge: 'GDPR' },
		{ href: '/billing', label: m.nav_billing(), icon: IconCoin, badge: 'Free $0' }
	]);

	const devTools = $derived([
		{ href: '/api-keys', label: m.nav_api_keys(), icon: IconKey },
		{ href: '/settings', label: m.nav_settings(), icon: IconSettings }
	]);

	const ecosystemPortals = [
		{ label: 'Applications Hub', href: 'http://localhost:5175', badge: 'Apps', icon: IconLayoutGrid },
		{ label: 'Central Auth SSO', href: 'http://localhost:5174', badge: 'SSO', icon: IconShieldLock },
		{ label: 'Super Admin Portal', href: 'http://localhost:5176', badge: 'Admin', icon: IconServer },
		{ label: 'Documentation', href: 'https://docs.povixa.com', badge: 'Docs', icon: IconBook2 }
	];
</script>

<!-- Mobile Overlay Backdrop -->
{#if mobileOpen}
	<div
		role="button"
		tabindex="0"
		aria-label="Close sidebar"
		onclick={() => (mobileOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (mobileOpen = false)}
		class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
	></div>
{/if}

<aside
	class="fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-border/60 bg-card/85 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 {mobileOpen
		? 'translate-x-0 shadow-2xl'
		: '-translate-x-full lg:translate-x-0'}"
>
	<!-- Brand & App Identity Header -->
	<div class="flex h-16 items-center justify-between border-b border-border/50 px-5">
		<a href="/" class="flex items-center gap-3 group">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-primary/20 transition-transform group-hover:scale-105"
			>
				<div class="flex h-full w-full items-center justify-center rounded-[10px] bg-background/90 text-primary">
					<IconBolt size={20} stroke={2.5} />
				</div>
			</div>
			<div class="flex flex-col">
				<div class="flex items-center gap-1.5">
					<span class="font-bold tracking-tight text-foreground font-sans text-base">POVIXA</span>
					<span class="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
						CONSOLE
					</span>
				</div>
				<span class="text-[11px] text-muted-foreground">{m.cluster_status_healthy()}</span>
			</div>
		</a>
	</div>

	<!-- Workspace Selector Dropdown -->
	<div class="p-3 border-b border-border/40">
		<div class="relative">
			<button
				type="button"
				onclick={() => (workspaceDropdown = !workspaceDropdown)}
				class="flex w-full items-center justify-between gap-2 rounded-xl border border-border/60 bg-secondary/50 px-3 py-2.5 text-left text-sm transition-colors hover:border-border hover:bg-secondary"
			>
				<div class="flex items-center gap-2.5 min-w-0">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<IconServer size={15} stroke={2} />
					</div>
					<div class="min-w-0">
						<p class="truncate font-medium text-foreground text-xs">{currentWorkspace.name}</p>
						<p class="truncate text-[10px] text-emerald-500 font-medium">{currentWorkspace.plan}</p>
					</div>
				</div>
				<IconChevronDown size={14} class="shrink-0 text-muted-foreground transition-transform {workspaceDropdown ? 'rotate-180' : ''}" />
			</button>

			{#if workspaceDropdown}
				<div
					class="absolute top-full left-0 right-0 z-50 mt-1.5 rounded-xl border border-border bg-card p-1.5 shadow-xl backdrop-blur-md"
				>
					<div class="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
						Select Workspace
					</div>
					{#each workspaces as ws}
						<button
							type="button"
							onclick={() => selectWorkspace(ws)}
							class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-accent {currentWorkspace.id === ws.id ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'}"
						>
							<div>
								<div class="font-medium">{ws.name}</div>
								<div class="text-[10px] text-muted-foreground">{ws.plan}</div>
							</div>
							{#if currentWorkspace.id === ws.id}
								<IconCheck size={14} class="text-primary" />
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Navigation Menu Links (Neat & Structured) -->
	<nav class="flex-1 space-y-6 overflow-y-auto px-3 py-3">
		<!-- Cockpit Overview -->
		<div>
			<a
				href="/"
				onclick={() => (mobileOpen = false)}
				class="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all {page.url.pathname === '/'
					? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-bold'
					: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
			>
				<IconDashboard size={17} stroke={page.url.pathname === '/' ? 2.5 : 2} />
				<span>{m.nav_overview()}</span>
			</a>
		</div>

		<!-- 9 Core Platform Modules -->
		<div>
			<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
				Hạ Tầng Cốt Lõi (9 Modules)
			</div>
			<div class="space-y-0.5">
				{#each coreModules as mod}
					{@const active = page.url.pathname === mod.href}
					<a
						href={mod.href}
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {active
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<mod.icon size={16} stroke={active ? 2.4 : 2} class={active ? 'text-primary-foreground' : 'text-muted-foreground'} />
							<span>{mod.label}</span>
						</div>
						<span
							class="rounded px-1.5 py-0.2 text-[9px] font-semibold {active
								? 'bg-white/20 text-white'
								: 'bg-secondary text-muted-foreground'}"
						>
							{mod.badge}
						</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Developer & Security -->
		<div>
			<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
				Bảo Mật & Cài Đặt
			</div>
			<div class="space-y-0.5">
				{#each devTools as item}
					{@const active = page.url.pathname === item.href}
					<a
						href={item.href}
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all {active
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<item.icon size={16} stroke={active ? 2.4 : 2} />
						<span>{item.label}</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Ecosystem Portals -->
		<div>
			<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
				Hệ Sinh Thái Povixa
			</div>
			<div class="space-y-0.5">
				{#each ecosystemPortals as ext}
					<a
						href={ext.href}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
					>
						<div class="flex items-center gap-2.5">
							<ext.icon size={16} stroke={2} />
							<span>{ext.label}</span>
						</div>
						<div class="flex items-center gap-1">
							<span class="rounded bg-secondary px-1.5 py-0.2 text-[9px] font-semibold text-muted-foreground">
								{ext.badge}
							</span>
							<IconExternalLink size={11} class="text-muted-foreground/60" />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</nav>

	<!-- Sidebar Footer -->
	<div class="border-t border-border/50 p-3">
		<div class="rounded-xl border border-border/50 bg-secondary/30 p-2.5">
			<div class="flex items-center justify-between">
				<span class="flex items-center gap-1.5 text-xs font-semibold text-foreground">
					<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
					{m.self_hosted_badge()}
				</span>
				<span class="text-[9px] font-mono text-muted-foreground">AGPL-3.0</span>
			</div>
			<div class="mt-2 flex items-center justify-between pt-1.5 border-t border-border/40 text-[11px]">
				<span class="text-emerald-500 font-medium">Community Pact</span>
				<a href="/billing" class="text-primary hover:underline font-semibold">$0 Active →</a>
			</div>
		</div>
	</div>
</aside>

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
		IconShieldLock,
		IconPlus,
		IconFolder,
		IconLayersLinked,
		IconWorld,
		IconBuildingSkyscraper,
		IconAlertTriangle,
		IconX
	} from '@tabler/icons-svelte-runes';
	import { page } from '$app/state';
	import * as m from '#lib/paraglide/messages.js';
	import { orgStore } from '#lib/stores/orgProject.svelte.js';

	let { mobileOpen = $bindable(false) } = $props<{ mobileOpen?: boolean }>();

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
	class="fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-border/60 bg-card/90 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 {mobileOpen
		? 'translate-x-0 shadow-2xl'
		: '-translate-x-full lg:translate-x-0'}"
>
	<!-- Brand & App Identity Header -->
	<div class="flex h-16 items-center justify-between border-b border-border/50 px-5">
		<a href="/" onclick={() => orgStore.selectProject(null)} class="flex items-center gap-3 group">
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

	<!-- Active Context Status Card (Compact & Clean) -->
	<div class="px-4 py-3 border-b border-border/50">
		{#if orgStore.currentProject}
			<div class="flex items-center gap-2.5 rounded-xl bg-secondary/40 border border-border/60 p-2.5">
				<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-500">
					<IconLayersLinked size={15} stroke={2} />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate font-bold text-foreground text-xs leading-tight">{orgStore.currentProject.name}</p>
					<p class="text-[10px] text-muted-foreground truncate">{orgStore.currentOrg?.name} • {orgStore.currentProject.framework}</p>
				</div>
			</div>
		{:else if orgStore.currentOrg}
			<div class="flex items-center gap-2.5 rounded-xl bg-secondary/40 border border-border/60 p-2.5">
				<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
					<IconServer size={15} stroke={2} />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate font-bold text-foreground text-xs leading-tight">{orgStore.currentOrg.name}</p>
					<p class="text-[10px] text-muted-foreground truncate">{orgStore.quotaUsed}/{orgStore.quotaMax} dự án</p>
				</div>
			</div>
		{:else}
			<div class="flex items-center gap-2.5 rounded-xl bg-secondary/30 border border-border/50 p-2.5">
				<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<IconBuildingSkyscraper size={15} stroke={2} />
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate font-bold text-foreground text-xs leading-tight">Tổng Quan Tổ Chức</p>
					<p class="text-[10px] text-muted-foreground truncate">{orgStore.organizations.length} tổ chức khả dụng</p>
				</div>
			</div>
		{/if}
	</div>

	<!-- Navigation Menu Links -->
	<nav class="flex-1 space-y-5 overflow-y-auto px-3 py-3">
		{#if orgStore.currentProject}
			<!-- LEVEL: PROJECT ACTIVE -->
			<!-- Project Cockpit Overview -->
			<div>
				<a
					href="/"
					onclick={() => (mobileOpen = false)}
					class="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all {page.url.pathname === '/'
						? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-bold'
						: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
				>
					<IconDashboard size={17} stroke={page.url.pathname === '/' ? 2.5 : 2} />
					<span>Bảng Điều Khiển Dự Án</span>
				</a>
			</div>

			<!-- Core Modules of Current Project -->
			<div>
				<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
					Các Module Của Dự Án
				</div>
				<div class="space-y-0.5">
					<a
						href="/auth"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/auth'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<IconFingerprint size={16} stroke={page.url.pathname === '/auth' ? 2.4 : 2} />
							<span>Povixa Auth (End-Users)</span>
						</div>
						<span class="rounded bg-blue-500/20 text-blue-500 dark:text-blue-300 px-1.5 py-0.2 text-[9px] font-bold">OAuth</span>
					</a>

					<a
						href="/notifications"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/notifications'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<IconBell size={16} stroke={page.url.pathname === '/notifications' ? 2.4 : 2} />
							<span>Module Thông Báo</span>
						</div>
						<span class="rounded bg-amber-500/20 text-amber-500 dark:text-amber-300 px-1.5 py-0.2 text-[9px] font-bold">Push</span>
					</a>

					<a
						href="/config"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/config'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<IconAdjustments size={16} stroke={page.url.pathname === '/config' ? 2.4 : 2} />
							<span>Cấu Hình & Flags</span>
						</div>
						<span class="rounded bg-secondary px-1.5 py-0.2 text-[9px] font-semibold text-muted-foreground">Flags</span>
					</a>

					<a
						href="/analytics"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/analytics'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<IconChartHistogram size={16} stroke={page.url.pathname === '/analytics' ? 2.4 : 2} />
							<span>Phân Tích Sự Kiện</span>
						</div>
						<span class="rounded bg-secondary px-1.5 py-0.2 text-[9px] font-semibold text-muted-foreground">Events</span>
					</a>

					<a
						href="/storage"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/storage'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<IconDatabase size={16} stroke={page.url.pathname === '/storage' ? 2.4 : 2} />
							<span>Lưu Trữ Đối Tượng</span>
						</div>
						<span class="rounded bg-secondary px-1.5 py-0.2 text-[9px] font-semibold text-muted-foreground">S3</span>
					</a>

					<a
						href="/observability"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/observability'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<IconEye size={16} stroke={page.url.pathname === '/observability' ? 2.4 : 2} />
							<span>Quan Sát & Edge Logs</span>
						</div>
						<span class="rounded bg-secondary px-1.5 py-0.2 text-[9px] font-semibold text-muted-foreground">Logs</span>
					</a>
				</div>
			</div>

			<!-- Developer & Security -->
			<div>
				<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
					Khóa & Cài Đặt Dự Án
				</div>
				<div class="space-y-0.5">
					<a
						href="/api-keys"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/api-keys'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<IconKey size={16} stroke={page.url.pathname === '/api-keys' ? 2.4 : 2} />
						<span>API Keys & Bí Mật</span>
					</a>

					<a
						href="/settings"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/settings'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<IconSettings size={16} stroke={page.url.pathname === '/settings' ? 2.4 : 2} />
						<span>Cài Đặt Dự Án</span>
					</a>
				</div>
			</div>
		{:else if orgStore.currentOrg}
			<!-- LEVEL 2: ORGANIZATION ACTIVE (NO PROJECT SELECTED) -->
			<div>
				<a
					href="/"
					onclick={() => (mobileOpen = false)}
					class="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all {page.url.pathname === '/'
						? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-bold'
						: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
				>
					<IconFolder size={17} stroke={2.5} />
					<span>Danh Sách Dự Án & Định Mức</span>
				</a>
			</div>

			<!-- Quick Jump to Projects in Current Org -->
			<div>
				<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
					Dự Án Thuộc Tổ Chức ({orgStore.quotaUsed}/{orgStore.quotaMax})
				</div>
				<div class="space-y-1">
					{#each orgStore.projectsInCurrentOrg as prj}
						<button
							type="button"
							onclick={() => {
								orgStore.selectProject(prj.id);
								mobileOpen = false;
							}}
							class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all text-left"
						>
							<div class="min-w-0">
								<p class="truncate font-semibold text-foreground">{prj.name}</p>
								<p class="text-[10px] text-muted-foreground">{prj.environment} • {prj.framework}</p>
							</div>
							<span class="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Organization Management -->
			<div>
				<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
					Quản Trị Tổ Chức
				</div>
				<div class="space-y-0.5">
					<a
						href="/billing"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/billing'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<IconCoin size={16} stroke={2} />
							<span>Định Mức & Gói ($0)</span>
						</div>
						<span class="rounded bg-emerald-500/20 text-emerald-500 dark:text-emerald-300 px-1.5 py-0.2 text-[9px] font-bold">Free</span>
					</a>

					<a
						href="/support"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/support'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<IconMessageCircle size={16} stroke={2} />
						<span>Hỗ Trợ Kỹ Thuật</span>
					</a>

					<a
						href="/legal"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all {page.url.pathname === '/legal'
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						<IconFileText size={16} stroke={2} />
						<span>Pháp Lý & Tuân Thủ</span>
					</a>
				</div>
			</div>
		{:else}
			<!-- LEVEL 1: ALL ORGANIZATIONS (NO ORG SELECTED) -->
			<div>
				<a
					href="/"
					onclick={() => (mobileOpen = false)}
					class="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all {page.url.pathname === '/'
						? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-bold'
						: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
				>
					<IconBuildingSkyscraper size={17} stroke={2.5} />
					<span>Danh Sách Tổ Chức</span>
				</a>
			</div>

			<!-- Quick Jump to Any Organization -->
			<div>
				<div class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
					Tổ Chức Của Bạn ({orgStore.organizations.length})
				</div>
				<div class="space-y-1">
					{#each orgStore.organizations as o}
						<button
							type="button"
							onclick={() => {
								orgStore.selectOrg(o.id);
								mobileOpen = false;
							}}
							class="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all text-left cursor-pointer"
						>
							<div class="min-w-0">
								<p class="truncate font-semibold text-foreground">{o.name}</p>
								<p class="text-[10px] text-muted-foreground">{o.plan} • {o.role}</p>
							</div>
							<span class="h-2 w-2 rounded-full bg-primary shrink-0"></span>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Ecosystem Portals -->
		<div class="pt-2 border-t border-border/50">
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
				<span class="text-emerald-500 font-medium">{orgStore.currentOrg?.plan ?? 'Community Free'}</span>
				<a href="/billing" class="text-primary hover:underline font-semibold">$0 Active →</a>
			</div>
		</div>
	</div>
</aside>

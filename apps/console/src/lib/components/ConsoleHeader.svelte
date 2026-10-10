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
		IconBolt,
		IconChevronRight,
		IconServer,
		IconLayersLinked,
		IconChevronDown,
		IconBuildingSkyscraper,
		IconFolder,
		IconX,
		IconInbox,
		IconBell
	} from '@tabler/icons-svelte-runes';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import { auth } from '#lib/stores/auth.svelte.js';
	import { orgStore } from '#lib/stores/orgProject.svelte.js';

	let { onToggleMobile = () => {} } = $props<{ onToggleMobile?: () => void }>();

	let userMenuOpen = $state(false);
	let searchModalOpen = $state(false);
	let searchQuery = $state('');

	let inboxOpen = $state(false);
	let notificationOpen = $state(false);

	let orgDropdownOpen = $state(false);
	let projectDropdownOpen = $state(false);

	let showNewOrgModal = $state(false);
	let newOrgName = $state('');

	let showNewProjectModal = $state(false);
	let newProjectName = $state('');
	let newProjectFramework = $state<'SvelteKit' | 'NestJS' | 'Next.js' | 'Go Fiber' | 'FastAPI'>('SvelteKit');
	let newProjectEnv = $state<'Production' | 'Staging' | 'Development'>('Production');

	function handleCreateOrg() {
		if (!newOrgName.trim()) return;
		orgStore.createOrganization(newOrgName.trim());
		newOrgName = '';
		showNewOrgModal = false;
	}

	function handleCreateProject() {
		if (!newProjectName.trim()) return;
		orgStore.createProject({
			name: newProjectName.trim(),
			framework: newProjectFramework,
			environment: newProjectEnv
		});
		newProjectName = '';
		showNewProjectModal = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			searchModalOpen = !searchModalOpen;
		}
		if (e.key === 'Escape') {
			if (searchModalOpen) searchModalOpen = false;
			if (orgDropdownOpen) orgDropdownOpen = false;
			if (projectDropdownOpen) projectDropdownOpen = false;
			if (inboxOpen) inboxOpen = false;
			if (notificationOpen) notificationOpen = false;
			if (userMenuOpen) userMenuOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/80 px-4 sm:px-6 backdrop-blur-xl lg:px-10">
	<!-- Left Side: Mobile Menu Button & Breadcrumbs / Search -->
	<div class="flex items-center gap-3 sm:gap-4 min-w-0">
		<button
			type="button"
			onclick={onToggleMobile}
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground lg:hidden"
			aria-label="Open sidebar"
		>
			<IconMenu2 size={18} stroke={2} />
		</button>

		<!-- Header Dropdown Selectors: Org & Project -->
		<div class="hidden sm:flex items-center gap-1.5 text-xs min-w-0">
			<!-- Organization Dropdown -->
			<div class="relative">
				<button
					type="button"
					onclick={() => {
						orgDropdownOpen = !orgDropdownOpen;
						projectDropdownOpen = false;
					}}
					class="flex h-9 items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-2.5 py-1 text-xs font-semibold text-foreground transition-all hover:bg-secondary/70 hover:border-border max-w-[160px] md:max-w-[200px]"
					title="Chọn tổ chức"
				>
					<IconBuildingSkyscraper size={14} class="text-primary shrink-0" />
					<span class="truncate">
						{orgStore.currentOrg ? orgStore.currentOrg.name : 'Tất Cả Tổ Chức'}
					</span>
					<IconChevronDown size={12} class="text-muted-foreground shrink-0 transition-transform duration-150 {orgDropdownOpen ? 'rotate-180' : ''}" />
				</button>

				{#if orgDropdownOpen}
					<!-- Overlay to close -->
					<button
						type="button"
						class="fixed inset-0 z-40 bg-transparent cursor-default"
						onclick={() => (orgDropdownOpen = false)}
						aria-label="Đóng menu"
					></button>

					<div class="absolute left-0 top-full mt-1.5 w-64 rounded-2xl border border-border/80 bg-card p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-100">
						<div class="px-2.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
							Không Gian Tổ Chức
						</div>

						<button
							type="button"
							onclick={() => {
								orgStore.selectOrg(null);
								orgDropdownOpen = false;
							}}
							class="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors hover:bg-secondary {orgStore.currentOrgId === null ? 'bg-primary/10 text-primary font-bold' : 'text-foreground font-medium'}"
						>
							<span class="flex items-center gap-2 truncate">
								<IconBuildingSkyscraper size={14} class={orgStore.currentOrgId === null ? 'text-primary' : 'text-muted-foreground'} />
								<span class="truncate">Tất Cả Tổ Chức</span>
							</span>
							{#if orgStore.currentOrgId === null}
								<IconCheck size={14} class="text-primary shrink-0" />
							{/if}
						</button>

						<div class="my-1 border-t border-border/50"></div>

						<div class="max-h-56 overflow-y-auto space-y-0.5">
							{#each orgStore.organizations as org}
								<button
									type="button"
									onclick={() => {
										orgStore.selectOrg(org.id);
										orgDropdownOpen = false;
									}}
									class="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors hover:bg-secondary {orgStore.currentOrgId === org.id ? 'bg-primary/10 text-primary font-bold' : 'text-foreground font-medium'}"
								>
									<span class="flex items-center gap-2 min-w-0 text-left">
										<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-[10px] uppercase font-bold text-muted-foreground">
											{org.name.slice(0, 2)}
										</span>
										<span class="flex flex-col min-w-0">
											<span class="truncate">{org.name}</span>
											<span class="text-[10px] text-muted-foreground font-normal truncate">{org.role} • {orgStore.projects.filter(p => p.orgId === org.id).length} dự án</span>
										</span>
									</span>
									{#if orgStore.currentOrgId === org.id}
										<IconCheck size={14} class="text-primary shrink-0" />
									{/if}
								</button>
							{/each}
						</div>

						<div class="my-1 border-t border-border/50"></div>

						<button
							type="button"
							onclick={() => {
								orgDropdownOpen = false;
								showNewOrgModal = true;
							}}
							class="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
						>
							<IconPlus size={14} stroke={2.5} />
							<span>Tạo Tổ Chức Mới...</span>
						</button>
					</div>
				{/if}
			</div>

			<!-- Divider & Project Dropdown -->
			{#if orgStore.currentOrg}
				<span class="text-muted-foreground/40 font-mono text-xs select-none">/</span>

				<div class="relative">
					<button
						type="button"
						onclick={() => {
							projectDropdownOpen = !projectDropdownOpen;
							orgDropdownOpen = false;
						}}
						class="flex h-9 items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-2.5 py-1 text-xs font-semibold text-foreground transition-all hover:bg-secondary/70 hover:border-border max-w-[160px] md:max-w-[210px]"
						title="Chọn dự án"
					>
						<IconFolder size={14} class="text-indigo-500 shrink-0" />
						<span class="truncate">
							{orgStore.currentProject ? orgStore.currentProject.name : 'Tất Cả Dự Án'}
						</span>
						<IconChevronDown size={12} class="text-muted-foreground shrink-0 transition-transform duration-150 {projectDropdownOpen ? 'rotate-180' : ''}" />
					</button>

					{#if projectDropdownOpen}
						<!-- Overlay to close -->
						<button
							type="button"
							class="fixed inset-0 z-40 bg-transparent cursor-default"
							onclick={() => (projectDropdownOpen = false)}
							aria-label="Đóng menu"
						></button>

						<div class="absolute left-0 top-full mt-1.5 w-64 rounded-2xl border border-border/80 bg-card p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-100">
							<div class="flex items-center justify-between px-2.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
								<span>Dự Án ({orgStore.currentOrg.name})</span>
								<span class="text-[10px] font-mono font-normal lowercase">{orgStore.quotaUsed}/{orgStore.quotaMax}</span>
							</div>

							<button
								type="button"
								onclick={() => {
									orgStore.selectProject(null);
									projectDropdownOpen = false;
								}}
								class="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors hover:bg-secondary {orgStore.currentProjectId === null ? 'bg-primary/10 text-primary font-bold' : 'text-foreground font-medium'}"
							>
								<span class="flex items-center gap-2 truncate">
									<IconFolder size={14} class={orgStore.currentProjectId === null ? 'text-primary' : 'text-muted-foreground'} />
									<span class="truncate">Danh Sách Dự Án</span>
								</span>
								{#if orgStore.currentProjectId === null}
									<IconCheck size={14} class="text-primary shrink-0" />
								{/if}
							</button>

							<div class="my-1 border-t border-border/50"></div>

							<div class="max-h-56 overflow-y-auto space-y-0.5">
								{#if orgStore.projectsInCurrentOrg.length === 0}
									<div class="px-3 py-3 text-center text-xs text-muted-foreground">
										Chưa có dự án nào trong tổ chức này.
									</div>
								{:else}
									{#each orgStore.projectsInCurrentOrg as project}
										<button
											type="button"
											onclick={() => {
												orgStore.selectProject(project.id);
												projectDropdownOpen = false;
											}}
											class="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors hover:bg-secondary {orgStore.currentProjectId === project.id ? 'bg-primary/10 text-primary font-bold' : 'text-foreground font-medium'}"
										>
											<span class="flex items-center gap-2 min-w-0 text-left">
												<IconFolder size={14} class={orgStore.currentProjectId === project.id ? 'text-primary' : 'text-indigo-400'} />
												<span class="flex flex-col min-w-0">
													<span class="truncate">{project.name}</span>
													<span class="text-[10px] text-muted-foreground font-normal truncate">{project.framework} • {project.environment}</span>
												</span>
											</span>
											{#if orgStore.currentProjectId === project.id}
												<IconCheck size={14} class="text-primary shrink-0" />
											{/if}
										</button>
									{/each}
								{/if}
							</div>

							<div class="my-1 border-t border-border/50"></div>

							{#if orgStore.isQuotaFull}
								<div class="px-2.5 py-1.5 text-[11px] text-amber-500 font-medium">
									Đã đạt định mức ({orgStore.quotaMax} dự án)
								</div>
							{:else}
								<button
									type="button"
									onclick={() => {
										projectDropdownOpen = false;
										showNewProjectModal = true;
									}}
									class="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
								>
									<IconPlus size={14} stroke={2.5} />
									<span>Tạo Dự Án Mới...</span>
								</button>
							{/if}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Command Search Bar Trigger -->
		<button
			type="button"
			onclick={() => (searchModalOpen = true)}
			class="flex h-9 items-center gap-2 rounded-xl border border-border/60 bg-secondary/30 px-3 text-xs text-muted-foreground transition-all hover:border-border hover:bg-secondary/60 w-36 sm:w-48 md:w-64"
		>
			<IconSearch size={14} class="shrink-0 text-muted-foreground" />
			<span class="flex-1 text-left truncate">{m.search_placeholder()}</span>
			<kbd class="hidden items-center gap-0.5 rounded-md border border-border/70 bg-card px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground md:inline-flex">
				⌘K
			</kbd>
		</button>
	</div>

	<!-- Right Side Actions -->
	<div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
		<!-- Cluster Health Indicator -->
		<div class="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500 xl:inline-flex">
			<span class="relative flex h-2 w-2">
				<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
				<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
			</span>
			<span>{m.cluster_status_healthy()}</span>
		</div>

		<!-- Inbox Icon Button & Dropdown -->
		<div class="relative">
			<button
				type="button"
				onclick={() => {
					inboxOpen = !inboxOpen;
					notificationOpen = false;
					orgDropdownOpen = false;
					projectDropdownOpen = false;
					userMenuOpen = false;
				}}
				class="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-secondary/60 hover:border-border transition-all"
				aria-label="Hộp thư hệ thống"
				title="Hộp thư hệ thống"
			>
				<IconInbox size={16} stroke={2} />
			</button>

			{#if inboxOpen}
				<button
					type="button"
					class="fixed inset-0 z-40 bg-transparent cursor-default"
					onclick={() => (inboxOpen = false)}
					aria-label="Đóng hộp thư"
				></button>

				<div class="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-border/80 bg-card p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-100">
					<div class="flex items-center justify-between px-3 py-2 border-b border-border/50">
						<span class="text-xs font-bold text-foreground">Hộp Thư (Inbox)</span>
						<span class="text-[10px] text-muted-foreground">0 tin mới</span>
					</div>
					<div class="p-4 text-center text-xs text-muted-foreground">
						<IconInbox size={26} stroke={1.5} class="mx-auto mb-2 text-muted-foreground/60" />
						<p class="font-medium text-foreground">Không có tin nhắn chưa đọc</p>
						<p class="text-[11px] mt-0.5">Tất cả thông báo từ hệ thống và nhóm sẽ hiển thị tại đây.</p>
					</div>
				</div>
			{/if}
		</div>

		<!-- Notification Icon Button & Dropdown -->
		<div class="relative">
			<button
				type="button"
				onclick={() => {
					notificationOpen = !notificationOpen;
					inboxOpen = false;
					orgDropdownOpen = false;
					projectDropdownOpen = false;
					userMenuOpen = false;
				}}
				class="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-secondary/60 hover:border-border transition-all"
				aria-label="Thông báo hệ thống"
				title="Thông báo hệ thống"
			>
				<IconBell size={16} stroke={2} />
				<span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
			</button>

			{#if notificationOpen}
				<button
					type="button"
					class="fixed inset-0 z-40 bg-transparent cursor-default"
					onclick={() => (notificationOpen = false)}
					aria-label="Đóng thông báo"
				></button>

				<div class="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-border/80 bg-card p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-100">
					<div class="flex items-center justify-between px-3 py-2 border-b border-border/50">
						<span class="text-xs font-bold text-foreground">Thông Báo Cụm & Dịch Vụ</span>
						<a href="/notifications" onclick={() => (notificationOpen = false)} class="text-[10px] text-primary hover:underline font-semibold">Xem tất cả →</a>
					</div>
					<div class="p-1 space-y-1 text-xs">
						<div class="rounded-xl p-2.5 bg-secondary/30 hover:bg-secondary/60 transition-colors">
							<div class="flex items-center justify-between">
								<span class="font-semibold text-foreground text-[11px]">Cụm Edge Sẵn Sàng</span>
								<span class="text-[9px] text-muted-foreground">5p trước</span>
							</div>
							<p class="text-[11px] text-muted-foreground mt-0.5">Node sin1 (Singapore) duy trì độ trễ p95 dưới 15ms.</p>
						</div>
						<div class="rounded-xl p-2.5 bg-secondary/30 hover:bg-secondary/60 transition-colors">
							<div class="flex items-center justify-between">
								<span class="font-semibold text-foreground text-[11px]">Định Mức Quota</span>
								<span class="text-[9px] text-muted-foreground">1h trước</span>
							</div>
							<p class="text-[11px] text-muted-foreground mt-0.5">Hạn mức $0 Community Pact hoạt động bình thường.</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="h-4 w-px bg-border/60 mx-0.5 hidden sm:block"></div>

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
		{:else}
			<a
				href="http://localhost:5174?app=console&redirect_uri=http://localhost:5173"
				class="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
			>
				<IconUser size={14} class="text-primary" />
				<span>Đăng nhập</span>
			</a>
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

<!-- Create Organization Modal -->
{#if showNewOrgModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
			<div class="flex items-center justify-between pb-4 border-b border-border/60">
				<div class="flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<IconBuildingSkyscraper size={18} />
					</div>
					<h3 class="font-bold text-base text-foreground">Tạo Tổ Chức Mới</h3>
				</div>
				<button
					type="button"
					onclick={() => (showNewOrgModal = false)}
					class="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
				>
					<IconX size={18} />
				</button>
			</div>

			<form onsubmit={(e) => { e.preventDefault(); handleCreateOrg(); }} class="space-y-4 pt-4">
				<div>
					<label for="header-new-org-name" class="block text-xs font-semibold text-foreground mb-1.5">Tên Tổ Chức</label>
					<input
						id="header-new-org-name"
						type="text"
						bind:value={newOrgName}
						placeholder="Ví dụ: Công Ty TNHH Acme"
						class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
						required
					/>
				</div>

				<div class="rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs space-y-1">
					<div class="font-semibold text-foreground flex items-center justify-between">
						<span>Gói Tài Nguyên:</span>
						<span class="text-emerald-500 font-bold">Community Pact ($0 Miễn Phí)</span>
					</div>
					<p class="text-muted-foreground text-[11px]">Bao gồm tối đa 5 dự án, phân quyền nhóm và chứng chỉ SSL tự động.</p>
				</div>

				<div class="flex justify-end gap-2 pt-2">
					<button
						type="button"
						onclick={() => (showNewOrgModal = false)}
						class="rounded-xl border border-border/80 px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
					>
						Hủy Bỏ
					</button>
					<button
						type="submit"
						class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
					>
						Tạo Tổ Chức
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Create Project Modal -->
{#if showNewProjectModal && orgStore.currentOrg}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
			<div class="flex items-center justify-between pb-4 border-b border-border/60">
				<div class="flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
						<IconFolder size={18} />
					</div>
					<div>
						<h3 class="font-bold text-base text-foreground">Tạo Dự Án Mới</h3>
						<p class="text-[11px] text-muted-foreground">Tổ chức: {orgStore.currentOrg.name}</p>
					</div>
				</div>
				<button
					type="button"
					onclick={() => (showNewProjectModal = false)}
					class="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
				>
					<IconX size={18} />
				</button>
			</div>

			<form onsubmit={(e) => { e.preventDefault(); handleCreateProject(); }} class="space-y-4 pt-4">
				<div>
					<label for="header-new-project-name" class="block text-xs font-semibold text-foreground mb-1.5">Tên Dự Án</label>
					<input
						id="header-new-project-name"
						type="text"
						bind:value={newProjectName}
						placeholder="Ví dụ: My SaaS Backend"
						class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
						required
					/>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<div>
						<label for="header-new-proj-framework" class="block text-xs font-semibold text-foreground mb-1.5">Framework</label>
						<select
							id="header-new-proj-framework"
							bind:value={newProjectFramework}
							class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
						>
							<option value="SvelteKit">SvelteKit</option>
							<option value="Next.js">Next.js</option>
							<option value="NestJS">NestJS</option>
							<option value="Go Fiber">Go Fiber</option>
							<option value="FastAPI">FastAPI</option>
						</select>
					</div>
					<div>
						<label for="header-new-proj-env" class="block text-xs font-semibold text-foreground mb-1.5">Môi Trường</label>
						<select
							id="header-new-proj-env"
							bind:value={newProjectEnv}
							class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
						>
							<option value="Production">Production</option>
							<option value="Staging">Staging</option>
							<option value="Development">Development</option>
						</select>
					</div>
				</div>

				<div class="flex justify-end gap-2 pt-2">
					<button
						type="button"
						onclick={() => (showNewProjectModal = false)}
						class="rounded-xl border border-border/80 px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
					>
						Hủy Bỏ
					</button>
					<button
						type="submit"
						class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
					>
						Tạo Dự Án
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

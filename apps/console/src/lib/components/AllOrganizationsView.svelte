<script lang="ts">
	import { orgStore, type Organization } from '#lib/stores/orgProject.svelte.js';
	import {
		IconServer,
		IconPlus,
		IconUsers,
		IconX,
		IconBuildingSkyscraper
	} from '@tabler/icons-svelte-runes';

	let showCreateModal = $state(false);
	let newOrgName = $state('');
	let newOrgPlan = $state('Community Pact ($0)');
	let newOrgMaxProjects = $state(5);
	let createError = $state<string | null>(null);

	const totalApiCalls = $derived(
		orgStore.projects.reduce((sum, p) => sum + p.apiCallsToday, 0)
	);

	const totalEndUsers = $derived(
		orgStore.projects.reduce((sum, p) => sum + p.activeEndUsers, 0)
	);

	function handleCreateOrg() {
		createError = null;
		if (!newOrgName.trim()) {
			createError = 'Vui lòng nhập tên tổ chức.';
			return;
		}

		orgStore.createOrganization(newOrgName.trim(), newOrgMaxProjects);
		newOrgName = '';
		showCreateModal = false;
	}

	function getProjectsInOrg(orgId: string) {
		return orgStore.projects.filter((p) => p.orgId === orgId);
	}
</script>

<div class="space-y-6 animate-in fade-in duration-200">
	<!-- 1. Flat Header (Clean, Space-Efficient) -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/50">
		<div class="space-y-1">
			<div class="flex items-center gap-2.5">
				<h1 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
					Tất Cả Tổ Chức
				</h1>
				<span class="rounded-full bg-secondary/80 px-2.5 py-0.5 text-xs font-mono font-medium text-muted-foreground">
					{orgStore.organizations.length} tổ chức
				</span>
			</div>
			<p class="text-xs sm:text-sm text-muted-foreground">
				Chọn một tổ chức để quản trị các dự án, định mức quota và tài nguyên đám mây.
			</p>
		</div>

		<!-- Flat Telemetry Metric Pills -->
		<div class="flex items-center flex-wrap gap-2.5 text-xs">
			<div class="flex items-center gap-2 rounded-xl bg-secondary/40 border border-border/60 px-3 py-1.5">
				<span class="text-muted-foreground">Dự án:</span>
				<span class="font-bold text-foreground font-mono">{orgStore.projects.length}</span>
			</div>
			<div class="flex items-center gap-2 rounded-xl bg-secondary/40 border border-border/60 px-3 py-1.5">
				<span class="text-muted-foreground">API Calls:</span>
				<span class="font-bold text-primary font-mono">{totalApiCalls > 1000000 ? `${(totalApiCalls / 1000000).toFixed(1)}M` : totalApiCalls.toLocaleString()}</span>
			</div>
			<div class="flex items-center gap-2 rounded-xl bg-secondary/40 border border-border/60 px-3 py-1.5">
				<span class="text-muted-foreground">End-Users:</span>
				<span class="font-bold text-emerald-500 font-mono">{totalEndUsers.toLocaleString()}</span>
			</div>
		</div>
	</div>

	<!-- 2. Grid of Organizations with Quick-Add Dashed Card (Item #1) -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		<!-- Quick Add Organization Dashed Card (Placed BEFORE all existing orgs) -->
		<button
			type="button"
			onclick={() => (showCreateModal = true)}
			class="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-card/20 hover:bg-primary/5 p-6 text-center transition-all min-h-[250px] cursor-pointer"
		>
			<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/80 group-hover:bg-primary/15 group-hover:scale-110 text-muted-foreground group-hover:text-primary transition-all mb-3 border border-border/60 group-hover:border-primary/30">
				<IconPlus size={22} stroke={2.5} />
			</div>
			<span class="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
				Tạo Tổ Chức Mới
			</span>
			<span class="text-xs text-muted-foreground mt-1.5 max-w-[210px] leading-relaxed">
				Khởi tạo không gian làm việc hoặc nhóm phát triển mới
			</span>
		</button>

		<!-- Existing Organizations Cards -->
		{#each orgStore.organizations as org (org.id)}
			{@const orgProjects = getProjectsInOrg(org.id)}
			{@const quotaUsed = orgProjects.length}
			{@const quotaMax = org.maxProjects}
			{@const percentage = Math.min(100, Math.round((quotaUsed / quotaMax) * 100))}
			{@const prodCount = orgProjects.filter((p) => p.environment === 'Production').length}
			{@const stagCount = orgProjects.filter((p) => p.environment === 'Staging').length}
			{@const devCount = orgProjects.filter((p) => p.environment === 'Development').length}
			<button
				type="button"
				onclick={() => orgStore.selectOrg(org.id)}
				class="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/60 p-5 transition-all hover:border-primary/50 hover:bg-card hover:shadow-xs text-left cursor-pointer w-full"
			>
				<div class="space-y-3.5 w-full">
					<!-- Card Top: Icon & Name -->
					<div class="flex items-center gap-3 min-w-0">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
							<IconServer size={20} stroke={2} />
						</div>
						<div class="min-w-0">
							<h3 class="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
								{org.name}
							</h3>
							<p class="text-xs font-mono text-muted-foreground truncate">
								@{org.slug}
							</p>
						</div>
					</div>

					<!-- Members, Plan & Quota Line -->
					<div class="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
						<div class="flex items-center gap-2">
							<span class="flex items-center gap-1 text-foreground font-medium">
								<IconUsers size={13} class="text-primary shrink-0" />
								<span>{org.memberCount}/{org.maxMembers}</span>
							</span>
							<span class="text-muted-foreground/40">•</span>
							<span>{org.plan.split(' (')[0]}</span>
						</div>
						<span class="font-bold text-xs {percentage >= 100 ? 'text-destructive' : 'text-foreground'}">
							{quotaUsed} / {quotaMax} dự án
						</span>
					</div>

					<!-- Thin Quota Bar -->
					<div class="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
						<div
							class="h-full rounded-full transition-all duration-500 {percentage >= 100
								? 'bg-destructive'
								: percentage >= 75
									? 'bg-amber-500'
									: 'bg-primary'}"
							style="width: {percentage}%"
						></div>
					</div>

					<!-- Environment Summary & Projects (Colored Dots Only, No Redundant PROD text!) -->
					<div class="space-y-1.5 pt-2 border-t border-border/40">
						<div class="flex items-center justify-between text-[11px]">
							<span class="text-muted-foreground">Môi trường:</span>
							<div class="flex items-center gap-2 font-mono text-[10px]">
								<span class="flex items-center gap-1 text-emerald-500"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> {prodCount} Prod</span>
								<span class="flex items-center gap-1 text-amber-500"><span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span> {stagCount} Stag</span>
								<span class="flex items-center gap-1 text-blue-500"><span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span> {devCount} Dev</span>
							</div>
						</div>

						{#if orgProjects.length > 0}
							<div class="flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
								{#each orgProjects.slice(0, 3) as proj}
									<span class="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
										<span class="h-1.5 w-1.5 shrink-0 rounded-full {proj.environment === 'Production' ? 'bg-emerald-500' : proj.environment === 'Staging' ? 'bg-amber-500' : 'bg-blue-500'}"></span>
										<span class="truncate max-w-[130px] font-medium text-foreground/90">{proj.name}</span>
									</span>
								{/each}
								{#if orgProjects.length > 3}
									<span class="text-[11px] text-muted-foreground font-mono self-center">
										+{orgProjects.length - 3} khác
									</span>
								{/if}
							</div>
						{:else}
							<p class="text-[11px] text-muted-foreground italic">Chưa có dự án nào</p>
						{/if}
					</div>
				</div>
			</button>
		{/each}
	</div>
</div>

<!-- Modal: Tạo Tổ Chức Mới -->
{#if showCreateModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
	>
		<div class="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
			<div class="flex items-center justify-between border-b border-border/60 pb-3">
				<div class="flex items-center gap-2 text-foreground font-bold text-base">
					<IconBuildingSkyscraper size={18} class="text-primary" />
					<span>Tạo Tổ Chức Mới</span>
				</div>
				<button
					type="button"
					onclick={() => (showCreateModal = false)}
					class="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
				>
					<IconX size={16} />
				</button>
			</div>

			{#if createError}
				<div class="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
					{createError}
				</div>
			{/if}

			<div class="space-y-4">
				<div class="space-y-1.5">
					<label for="new-org-name" class="text-xs font-semibold text-foreground">Tên Tổ Chức</label>
					<input
						id="new-org-name"
						type="text"
						bind:value={newOrgName}
						placeholder="VD: Acme Corporation, Nova Labs..."
						class="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div class="space-y-1.5">
					<label for="new-org-plan" class="text-xs font-semibold text-foreground">Gói Dịch Vụ</label>
					<select
						id="new-org-plan"
						bind:value={newOrgPlan}
						class="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
					>
						<option value="Community Pact ($0)">Community Pact ($0 / tháng)</option>
						<option value="Team Enterprise ($0)">Team Enterprise ($0 / tháng)</option>
						<option value="Hobby ($0)">Hobby Sandbox ($0 / tháng)</option>
					</select>
				</div>
			</div>

			<div class="flex items-center justify-end gap-2.5 pt-2 border-t border-border/50">
				<button
					type="button"
					onclick={() => (showCreateModal = false)}
					class="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary"
				>
					Hủy Bỏ
				</button>
				<button
					type="button"
					onclick={handleCreateOrg}
					class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Tạo Tổ Chức
				</button>
			</div>
		</div>
	</div>
{/if}

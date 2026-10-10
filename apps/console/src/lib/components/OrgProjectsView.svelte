<script lang="ts">
	import { orgStore } from '#lib/stores/orgProject.svelte.js';
	import {
		IconFolder,
		IconPlus,
		IconArrowLeft,
		IconUsers,
		IconAlertTriangle,
		IconCheck,
		IconX,
		IconWorld,
		IconLayersLinked
	} from '@tabler/icons-svelte-runes';

	let showCreateModal = $state(false);
	let newProjectName = $state('');
	let newProjectFramework = $state<'SvelteKit' | 'NestJS' | 'Next.js' | 'Go Fiber' | 'FastAPI'>('SvelteKit');
	let newProjectEnv = $state<'Production' | 'Staging' | 'Development'>('Production');
	let newProjectRegion = $state('sin1 (Singapore)');
	let createError = $state<string | null>(null);

	const totalApiCalls = $derived(
		orgStore.projectsInCurrentOrg.reduce((acc, p) => acc + p.apiCallsToday, 0)
	);

	const totalUsers = $derived(
		orgStore.projectsInCurrentOrg.reduce((acc, p) => acc + p.activeEndUsers, 0)
	);

	function handleCreate() {
		createError = null;
		if (!newProjectName.trim()) {
			createError = 'Vui lòng nhập tên dự án.';
			return;
		}

		const res = orgStore.createProject({
			name: newProjectName.trim(),
			framework: newProjectFramework,
			environment: newProjectEnv,
			region: newProjectRegion
		});

		if (res.success) {
			showCreateModal = false;
			newProjectName = '';
		} else {
			createError = res.message || 'Không thể tạo dự án.';
		}
	}
</script>

<div class="space-y-6 animate-in fade-in duration-200">
	<!-- Back to all organizations -->
	<div>
		<button
			type="button"
			onclick={() => orgStore.selectOrg(null)}
			class="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
		>
			<IconArrowLeft size={14} class="group-hover:-translate-x-0.5 transition-transform" />
			<span>Tất Cả Tổ Chức (Organizations)</span>
		</button>
	</div>

	<!-- 1. Flat Organization Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/50">
		<div class="space-y-1">
			<div class="flex items-center gap-2.5 flex-wrap">
				<h1 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
					{orgStore.currentOrg?.name}
				</h1>
				<span class="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
					{orgStore.currentOrg?.plan}
				</span>
				<span class="text-xs font-mono text-muted-foreground">
					@{orgStore.currentOrg?.slug}
				</span>
			</div>
			<p class="text-xs sm:text-sm text-muted-foreground">
				Quản trị các dự án trực thuộc, định mức phân vùng và tài nguyên đám mây của tổ chức.
			</p>
		</div>

		<div class="flex items-center gap-2.5 shrink-0">
			<button
				type="button"
				onclick={() => (showCreateModal = true)}
				disabled={orgStore.isQuotaFull}
				class="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<IconPlus size={15} stroke={2.5} />
				<span>Tạo Dự Án Mới</span>
			</button>
		</div>
	</div>

	<!-- 2. Flat Telemetry & Capacity Strip -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
		<div class="rounded-xl border border-border/60 bg-secondary/30 p-3">
			<span class="text-muted-foreground block text-[11px]">Hạn Mức Dự Án</span>
			<div class="mt-1 flex items-baseline gap-2">
				<span class="text-lg font-bold text-foreground font-mono">{orgStore.quotaUsed}/{orgStore.quotaMax}</span>
				<span class="text-[10px] {orgStore.isQuotaFull ? 'text-destructive font-semibold' : 'text-emerald-500'}">
					{orgStore.isQuotaFull ? 'Đạt giới hạn' : `Còn ${orgStore.quotaMax - orgStore.quotaUsed} vị trí`}
				</span>
			</div>
			<div class="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
				<div
					class="h-full rounded-full transition-all duration-500 {orgStore.isQuotaFull ? 'bg-destructive' : orgStore.quotaPercentage > 80 ? 'bg-amber-500' : 'bg-primary'}"
					style="width: {orgStore.quotaPercentage}%;"
				></div>
			</div>
		</div>

		<div class="rounded-xl border border-border/60 bg-secondary/30 p-3">
			<span class="text-muted-foreground block text-[11px]">Đội Ngũ Thành Viên</span>
			<div class="mt-1 flex items-baseline gap-1.5">
				<IconUsers size={16} class="text-primary shrink-0" />
				<span class="text-lg font-bold text-foreground font-mono">{orgStore.currentOrg?.memberCount}/{orgStore.currentOrg?.maxMembers}</span>
				<span class="text-[10px] text-muted-foreground">thành viên</span>
			</div>
			<span class="text-[10px] text-muted-foreground mt-1.5 block">Vai trò: <strong class="text-foreground">{orgStore.currentOrg?.role}</strong></span>
		</div>

		<div class="rounded-xl border border-border/60 bg-secondary/30 p-3">
			<span class="text-muted-foreground block text-[11px]">Lưu Lượng Gọi API</span>
			<div class="mt-1 text-lg font-bold text-foreground font-mono">
				{totalApiCalls > 1000000 ? `${(totalApiCalls / 1000000).toFixed(1)}M` : totalApiCalls.toLocaleString('vi-VN')}
			</div>
			<span class="text-[10px] text-primary font-medium mt-1.5 block">Toàn cụm phân tán</span>
		</div>

		<div class="rounded-xl border border-border/60 bg-secondary/30 p-3">
			<span class="text-muted-foreground block text-[11px]">Trạng Thái Toàn Cụm</span>
			<div class="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
				<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
				<span>Cụm Edge Ổn định</span>
			</div>
			<span class="text-[10px] text-muted-foreground mt-1.5 block">Sẵn sàng 99.99%</span>
		</div>
	</div>

	<!-- 3. Projects Directory Heading -->
	<div class="flex items-center justify-between pt-2">
		<div>
			<h2 class="text-base font-bold text-foreground">Danh Sách Dự Án Thuộc Tổ Chức</h2>
			<p class="text-xs text-muted-foreground">Chọn một dự án để xem bảng điều khiển chi tiết và các module tính năng.</p>
		</div>
		<span class="rounded-lg bg-secondary px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground">
			{orgStore.projectsInCurrentOrg.length} Dự Án
		</span>
	</div>

	<!-- 4. Projects Cards Grid (Full Clickable Block per Project) -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each orgStore.projectsInCurrentOrg as proj (proj.id)}
			<button
				type="button"
				onclick={() => orgStore.selectProject(proj.id)}
				class="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/50 overflow-hidden transition-all hover:border-primary/50 hover:bg-card hover:shadow-xs text-left cursor-pointer w-full"
			>
				<!-- 1. Header with distinct background & bottom border -->
				<div class="flex items-start justify-between gap-3 w-full bg-secondary/50 group-hover:bg-secondary/75 border-b border-border/60 px-4.5 py-3.5 transition-colors">
					<div class="min-w-0 flex-1">
						<h3 class="font-bold text-base text-foreground group-hover:text-primary transition-colors truncate">
							{proj.name}
						</h3>
						<p class="text-xs text-muted-foreground font-mono truncate mt-0.5">
							@{proj.slug}
						</p>
					</div>

					<!-- Environment Pill with colored dot -->
					<div class="flex items-center gap-1.5 shrink-0 pt-0.5">
						<span class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold {proj.environment === 'Production' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500' : proj.environment === 'Staging' ? 'border-amber-500/30 bg-amber-500/10 text-amber-500' : 'border-blue-500/30 bg-blue-500/10 text-blue-500'}">
							<span class="h-1.5 w-1.5 rounded-full {proj.environment === 'Production' ? 'bg-emerald-500' : proj.environment === 'Staging' ? 'bg-amber-500' : 'bg-blue-500'}"></span>
							<span>{proj.environment}</span>
						</span>
					</div>
				</div>

				<!-- 2. Middle: Metadata & Status Alerts (Separated by border) -->
				<div class="flex flex-wrap items-center justify-between gap-2 text-xs px-4.5 py-3 border-b border-border/50 w-full">
					<div class="flex items-center gap-2 text-muted-foreground">
						<span class="font-medium text-foreground/80 font-mono">{proj.region.split(' ')[0]}</span>
						<span class="text-muted-foreground/30">•</span>
						<span>Anycast Edge</span>
						<span class="text-muted-foreground/30">•</span>
						<span class="text-foreground font-medium flex items-center gap-1">
							<IconUsers size={13} class="text-primary" />
							{proj.memberCount}/{proj.maxMembers}
						</span>
					</div>

					<div class="flex items-center gap-2">
						{#if proj.limitAlert}
							<span class="inline-flex items-center gap-1 text-[10px] font-medium {proj.limitAlert.includes('95%') || proj.limitAlert.includes('Cảnh báo') ? 'text-destructive font-bold' : proj.limitAlert.includes('Sắp') || proj.limitAlert.includes('85%') ? 'text-amber-500 font-semibold' : 'text-muted-foreground'}">
								<IconAlertTriangle size={11} class="shrink-0" />
								{proj.limitAlert}
							</span>
						{/if}
					</div>
				</div>

				<!-- 3. Bottom: 3 Key Metrics Strip (Clean, Flat, Borderless) -->
				<div class="grid grid-cols-3 gap-3 px-4.5 py-3 text-xs w-full bg-card/30">
					<div>
						<span class="text-[10px] text-muted-foreground block">Calls Hôm nay</span>
						<span class="font-bold text-foreground font-mono text-xs">
							{proj.apiCallsToday > 1000000 ? `${(proj.apiCallsToday / 1000000).toFixed(1)}M` : proj.apiCallsToday > 1000 ? `${(proj.apiCallsToday / 1000).toFixed(0)}k` : proj.apiCallsToday}
						</span>
					</div>
					<div>
						<span class="text-[10px] text-muted-foreground block">End-Users</span>
						<span class="font-bold text-foreground font-mono text-xs">
							{proj.activeEndUsers > 1000 ? `${(proj.activeEndUsers / 1000).toFixed(1)}k` : proj.activeEndUsers}
						</span>
					</div>
					<div>
						<span class="text-[10px] text-muted-foreground block">p95 Latency</span>
						<span class="font-bold text-emerald-500 font-mono text-xs">
							{proj.p95LatencyMs}ms
						</span>
					</div>
				</div>
			</button>
		{/each}

		<!-- Add New Project Dashed Card (if quota available) -->
		{#if !orgStore.isQuotaFull}
			<button
				type="button"
				onclick={() => (showCreateModal = true)}
				class="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-transparent hover:bg-primary/5 p-6 text-center transition-all min-h-[190px] cursor-pointer"
			>
				<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/80 group-hover:bg-primary/15 group-hover:scale-110 text-muted-foreground group-hover:text-primary transition-all mb-2.5 border border-border/60 group-hover:border-primary/30">
					<IconPlus size={20} stroke={2.5} />
				</div>
				<h3 class="font-bold text-sm text-foreground group-hover:text-primary transition-colors">Tạo Dự Án Mới</h3>
				<p class="mt-1 text-xs text-muted-foreground max-w-xs leading-relaxed">
					Môi trường độc lập với API keys, Auth và Thông báo riêng.
				</p>
				<span class="mt-2.5 inline-block rounded-md bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-primary">
					Còn lại {orgStore.quotaMax - orgStore.quotaUsed} vị trí
				</span>
			</button>
		{/if}
	</div>
</div>

<!-- Create Project Modal -->
{#if showCreateModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
			<div class="flex items-center justify-between border-b border-border pb-3.5">
				<div class="flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<IconLayersLinked size={18} stroke={2.5} />
					</div>
					<div>
						<h3 class="font-bold text-base text-foreground">Tạo Dự Án Mới</h3>
						<p class="text-xs text-muted-foreground">Thuộc tổ chức: {orgStore.currentOrg?.name}</p>
					</div>
				</div>
				<button
					type="button"
					onclick={() => (showCreateModal = false)}
					class="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
				>
					<IconX size={18} />
				</button>
			</div>

			{#if createError}
				<div class="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive font-medium flex items-center gap-2">
					<IconAlertTriangle size={16} />
					<span>{createError}</span>
				</div>
			{/if}

			<div class="space-y-4 text-xs">
				<div>
					<label for="project-name" class="block font-semibold text-foreground mb-1.5">
						Tên Dự Án <span class="text-destructive">*</span>
					</label>
					<input
						id="project-name"
						type="text"
						bind:value={newProjectName}
						placeholder="Ví dụ: AI Customer Portal, Mobile API, Storefront..."
						class="w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<label for="project-framework" class="block font-semibold text-foreground mb-1.5">Khung Ứng Dụng (Framework)</label>
						<select
							id="project-framework"
							bind:value={newProjectFramework}
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						>
							<option value="SvelteKit">SvelteKit 5 Runes</option>
							<option value="NestJS">NestJS Distributed API</option>
							<option value="Next.js">Next.js App Router</option>
							<option value="Go Fiber">Go Fiber High-Perf</option>
							<option value="FastAPI">Python FastAPI</option>
						</select>
					</div>

					<div>
						<label for="project-env" class="block font-semibold text-foreground mb-1.5">Môi Trường Triển Khai</label>
						<select
							id="project-env"
							bind:value={newProjectEnv}
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						>
							<option value="Production">Production (Sản xuất)</option>
							<option value="Staging">Staging (Kiểm thử)</option>
							<option value="Development">Development (Phát triển)</option>
						</select>
					</div>
				</div>

				<div>
					<label for="project-region" class="block font-semibold text-foreground mb-1.5">Khu Vực Triển Khai Chính (Edge Region)</label>
					<select
						id="project-region"
						bind:value={newProjectRegion}
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					>
						<option value="sin1 (Singapore)">sin1 - Singapore (Đông Nam Á)</option>
						<option value="iad1 (US-East)">iad1 - Virginia (Bắc Mỹ)</option>
						<option value="fra1 (Frankfurt)">fra1 - Frankfurt (Châu Âu)</option>
						<option value="nrt1 (Tokyo)">nrt1 - Tokyo (Đông Á)</option>
					</select>
				</div>
			</div>

			<div class="flex justify-end gap-2.5 pt-4 border-t border-border">
				<button
					type="button"
					onclick={() => (showCreateModal = false)}
					class="rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary"
				>
					Hủy
				</button>
				<button
					type="button"
					onclick={handleCreate}
					class="rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Khởi Tạo Dự Án
				</button>
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import {
		IconSearch,
		IconFilter,
		IconPlus,
		IconRocket,
		IconSparkles,
		IconFlame,
		IconX,
		IconChevronDown,
		IconCheck
	} from '@tabler/icons-svelte-runes';
	import AppCard from '#lib/components/AppCard.svelte';
	import SpotlightRow from '#lib/components/SpotlightRow.svelte';
	import DeployModal from '#lib/components/DeployModal.svelte';
	import SubmitAppModal from '#lib/components/SubmitAppModal.svelte';
	import { initialApps, type AppItem } from '#lib/data/appsData.js';
	import { DropdownMenu } from '@povixa/ui';

	let searchQuery = $state('');
	let pillFilter = $state<'all' | 'template' | 'showcase' | 'featured'>('all');
	let useCaseFilter = $state<string>('All');
	let techStackFilter = $state<string>('All');
	let sortBy = $state<'popular' | 'recent' | 'cloned'>('popular');

	const sortLabels: Record<string, string> = {
		popular: 'Phổ biến nhất',
		recent: 'Mới cập nhật',
		cloned: 'Được clone nhiều'
	};

	let apps = $state<AppItem[]>(initialApps);

	let deployModalOpen = $state(false);
	let selectedTemplate = $state<AppItem | null>(null);
	let submitModalOpen = $state(false);

	let searchInputEl = $state<HTMLInputElement | null>(null);

	const trendingTags = [
		'#nextjs',
		'#sveltekit',
		'#saas',
		'#ai',
		'#ecommerce'
	];

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			searchInputEl?.focus();
		}
	}

	function handleDeploy(template: AppItem) {
		selectedTemplate = template;
		deployModalOpen = true;
	}

	function handleToggleLike(appId: string) {
		const target = apps.find((a) => a.id === appId);
		if (!target) return;
		if (target.isLiked) {
			target.isLiked = false;
			target.likesCount -= 1;
		} else {
			target.isLiked = true;
			target.likesCount += 1;
		}
	}

	function handleNewAppSubmitted(newApp: AppItem) {
		apps.unshift(newApp);
	}

	function clearFilters() {
		searchQuery = '';
		pillFilter = 'all';
		useCaseFilter = 'All';
		techStackFilter = 'All';
		sortBy = 'popular';
	}

	// Spotlight apps (featured starters and showcases)
	const spotlightApps = $derived(
		apps.filter((a) => a.spotlight).slice(0, 4)
	);

	// Filtered apps for main grid
	const filteredApps = $derived.by(() => {
		let result = apps.filter((app) => {
			// Pill filter
			if (pillFilter === 'template' && app.type !== 'template') return false;
			if (pillFilter === 'showcase' && app.type !== 'showcase') return false;
			if (pillFilter === 'featured' && !app.featured) return false;

			// UseCase filter
			if (useCaseFilter !== 'All' && app.useCase !== useCaseFilter) return false;

			// Tech Stack filter
			if (techStackFilter !== 'All' && app.framework !== techStackFilter) return false;

			// Search Query
			if (searchQuery.trim() !== '') {
				const q = searchQuery.toLowerCase().replace(/^#/, '');
				const inTitle = app.title.toLowerCase().includes(q);
				const inDesc = app.description.toLowerCase().includes(q);
				const inAuthor = app.author.username.toLowerCase().includes(q) || app.author.name.toLowerCase().includes(q);
				const inTags = app.tags.some((t) => t.toLowerCase().includes(q));
				const inFramework = app.framework.toLowerCase().includes(q);
				if (!inTitle && !inDesc && !inAuthor && !inTags && !inFramework) {
					return false;
				}
			}

			return true;
		});

		// Sort
		if (sortBy === 'popular') {
			result.sort((a, b) => b.likesCount - a.likesCount);
		} else if (sortBy === 'recent') {
			result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		} else if (sortBy === 'cloned') {
			result.sort((a, b) => (b.clonesCount || 0) - (a.clonesCount || 0));
		}

		return result;
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="space-y-16 lg:space-y-24 animate-in fade-in duration-200">
	<!-- 1. HERO SECTION (Refined, Balanced, Cohesive) -->
	<section class="py-2 sm:py-4 lg:py-6 text-center space-y-6">
		<div class="max-w-3xl mx-auto space-y-3">
			<!-- Top Pill -->
			<div class="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
				<IconSparkles size={13} />
				<span>Kho Ứng Dụng & Mã Nguồn Mẫu Povixa</span>
			</div>

			<!-- Main Title -->
			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-sans">
				Explore What Developers Build with Povixa
			</h1>

			<!-- Subtitle -->
			<p class="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
				Mã nguồn mẫu sẵn sàng clone (Boilerplates) và các sản phẩm SaaS, E-Commerce thực tế từ cộng đồng lập trình viên.
			</p>
		</div>

		<!-- Unified Search & Action Toolbar -->
		<div class="max-w-2xl mx-auto w-full space-y-3">
			<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
				<!-- Search Bar Input -->
				<div class="relative flex-1 flex h-12 items-center rounded-xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
					<IconSearch size={18} class="absolute left-3.5 text-muted-foreground shrink-0 pointer-events-none" />
					<input
						bind:this={searchInputEl}
						type="text"
						bind:value={searchQuery}
						placeholder="Tìm theo tên app, tech stack, tác giả (@handle)..."
						class="w-full h-full bg-transparent pl-10 pr-20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none font-medium"
					/>
					<div class="absolute right-2.5 flex items-center gap-1.5">
						{#if searchQuery}
							<button
								type="button"
								onclick={() => (searchQuery = '')}
								class="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
								title="Xóa tìm kiếm"
							>
								<IconX size={15} />
							</button>
						{/if}
						<kbd class="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-secondary/50 px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground shadow-2xs">
							⌘K
						</kbd>
					</div>
				</div>

				<!-- Submit App Action Button (Integrated Beside Search) -->
				<button
					type="button"
					onclick={() => (submitModalOpen = true)}
					class="h-12 shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-xs active:scale-[0.98]"
				>
					<IconPlus size={16} stroke={2.5} />
					<span>Gửi Ứng Dụng</span>
				</button>
			</div>

			<!-- Trending Tags (Single Row, Never Wraps) -->
			<div class="flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
				<span class="font-medium text-muted-foreground/80">Thịnh hành:</span>
				{#each trendingTags as tag}
					<button
						type="button"
						onclick={() => (searchQuery = tag.replace('#', ''))}
						class="rounded-md bg-secondary/50 hover:bg-secondary px-2 py-0.5 text-xs text-foreground/80 hover:text-primary transition-colors font-medium"
					>
						{tag}
					</button>
				{/each}
			</div>
		</div>

		<!-- Segmented Control Tabs (Unified, Never Wraps, Premium Aesthetic) -->
		<div class="pt-2 flex justify-center">
			<div class="inline-flex items-center rounded-2xl bg-secondary/40 p-1 border border-border/60 shadow-2xs gap-1">
				<button
					type="button"
					onclick={() => (pillFilter = 'all')}
					class="rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all {pillFilter === 'all'
						? 'bg-card text-foreground shadow-xs border border-border/40'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					Tất Cả <span class="text-xs opacity-60">({apps.length})</span>
				</button>

				<button
					type="button"
					onclick={() => (pillFilter = 'template')}
					class="inline-flex items-center gap-1.5 rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all {pillFilter === 'template'
						? 'bg-card text-foreground shadow-xs border border-border/40'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					<IconRocket size={14} class="text-indigo-500" />
					<span>Starters</span>
					<span class="text-xs opacity-60">({apps.filter((a) => a.type === 'template').length})</span>
				</button>

				<button
					type="button"
					onclick={() => (pillFilter = 'showcase')}
					class="inline-flex items-center gap-1.5 rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all {pillFilter === 'showcase'
						? 'bg-card text-foreground shadow-xs border border-border/40'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					<IconSparkles size={14} class="text-amber-500" />
					<span>Showcase</span>
					<span class="text-xs opacity-60">({apps.filter((a) => a.type === 'showcase').length})</span>
				</button>

				<button
					type="button"
					onclick={() => (pillFilter = 'featured')}
					class="inline-flex items-center gap-1.5 rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all {pillFilter === 'featured'
						? 'bg-card text-foreground shadow-xs border border-border/40'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					<IconFlame size={14} class="text-rose-500" />
					<span>Nổi Bật</span>
					<span class="text-xs opacity-60">({apps.filter((a) => a.featured).length})</span>
				</button>
			</div>
		</div>
	</section>

	<!-- 2. SPOTLIGHT / FEATURED ROW (Flat & Airy) -->
	{#if (pillFilter === 'all' || pillFilter === 'featured') && !searchQuery}
		<SpotlightRow
			{spotlightApps}
			onDeploy={handleDeploy}
		/>
	{/if}

	<!-- 3. MAIN FILTER BAR & GRID -->
	<section class="space-y-5">
		<!-- Use-Case Tabs & Controls Toolbar -->
		<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-border/50 pb-3">
			<!-- Horizontal Use-Case Tabs -->
			<div class="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
				{#each ['All', 'SaaS & Dashboards', 'E-Commerce & Retail', 'AI & Automation', 'Developer Tools', 'Community & Social'] as uc}
					<button
						type="button"
						onclick={() => (useCaseFilter = uc)}
						class="rounded-lg px-3 py-1.5 font-semibold whitespace-nowrap transition-colors {useCaseFilter === uc
							? 'bg-primary text-primary-foreground font-bold'
							: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
					>
						{uc === 'All' ? 'Tất Cả Danh Mục' : uc}
					</button>
				{/each}
			</div>

			<!-- Dropdowns: Tech Stack & Sort (shadcn DropdownMenu) -->
			<div class="flex items-center gap-2.5 shrink-0 text-xs">
				<!-- Tech Stack Dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/60 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
					>
						<span class="text-muted-foreground">Stack:</span>
						<span class="font-semibold text-foreground">{techStackFilter === 'All' ? 'Tất cả' : techStackFilter}</span>
						<IconChevronDown size={13} class="opacity-60 shrink-0" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-40 p-1">
						<DropdownMenu.Item
							onclick={() => (techStackFilter = 'All')}
							class="flex items-center justify-between text-xs cursor-pointer py-1.5 px-2.5 rounded-lg {techStackFilter === 'All' ? 'bg-secondary font-semibold text-primary' : ''}"
						>
							<span>Tất cả</span>
							{#if techStackFilter === 'All'}
								<IconCheck size={14} class="text-primary" />
							{/if}
						</DropdownMenu.Item>
						{#each ['Next.js', 'SvelteKit', 'NestJS', 'Go Fiber', 'Flutter'] as item}
							<DropdownMenu.Item
								onclick={() => (techStackFilter = item)}
								class="flex items-center justify-between text-xs cursor-pointer py-1.5 px-2.5 rounded-lg {techStackFilter === item ? 'bg-secondary font-semibold text-primary' : ''}"
							>
								<span>{item}</span>
								{#if techStackFilter === item}
									<IconCheck size={14} class="text-primary" />
								{/if}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<!-- Sort Dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/60 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
					>
						<span class="text-muted-foreground">Sắp xếp:</span>
						<span class="font-semibold text-foreground">{sortLabels[sortBy]}</span>
						<IconChevronDown size={13} class="opacity-60 shrink-0" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-44 p-1">
						{#each [
							{ id: 'popular', label: 'Phổ biến nhất' },
							{ id: 'recent', label: 'Mới cập nhật' },
							{ id: 'cloned', label: 'Được clone nhiều' }
						] as item}
							<DropdownMenu.Item
								onclick={() => (sortBy = item.id as any)}
								class="flex items-center justify-between text-xs cursor-pointer py-1.5 px-2.5 rounded-lg {sortBy === item.id ? 'bg-secondary font-semibold text-primary' : ''}"
							>
								<span>{item.label}</span>
								{#if sortBy === item.id}
									<IconCheck size={14} class="text-primary" />
								{/if}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<!-- Result Counter & Clear Filter -->
		<div class="flex items-center justify-between text-xs text-muted-foreground">
			<div>
				Hiển thị <strong class="text-foreground font-bold">{filteredApps.length}</strong> ứng dụng
				{#if useCaseFilter !== 'All'}
					trong <span class="text-primary font-medium">{useCaseFilter}</span>
				{/if}
				{#if techStackFilter !== 'All'}
					với <span class="text-primary font-medium">{techStackFilter}</span>
				{/if}
			</div>

			{#if searchQuery || useCaseFilter !== 'All' || techStackFilter !== 'All' || pillFilter !== 'all'}
				<button
					type="button"
					onclick={clearFilters}
					class="text-primary hover:underline font-medium inline-flex items-center gap-1"
				>
					<IconX size={12} />
					<span>Xóa bộ lọc</span>
				</button>
			{/if}
		</div>

		<!-- Clean Cards Grid (3 columns on lg/xl for optimal breathing room) -->
		{#if filteredApps.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each filteredApps as app (app.id)}
					<AppCard
						{app}
						onDeploy={handleDeploy}
						onToggleLike={handleToggleLike}
					/>
				{/each}
			</div>
		{:else}
			<!-- Flat Empty State -->
			<div class="rounded-2xl border border-dashed border-border/80 bg-secondary/10 p-10 text-center space-y-3">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary mx-auto text-muted-foreground">
					<IconSearch size={22} />
				</div>
				<div class="space-y-1">
					<h3 class="text-sm font-bold text-foreground">Không tìm thấy ứng dụng phù hợp</h3>
					<p class="text-xs text-muted-foreground max-w-sm mx-auto">
						Không có ứng dụng nào khớp với từ khóa "{searchQuery}". Hãy thử tìm kiếm bằng từ khóa khác.
					</p>
				</div>
				<button
					type="button"
					onclick={clearFilters}
					class="inline-flex items-center gap-1 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					<span>Xóa Bộ Lọc</span>
				</button>
			</div>
		{/if}
	</section>
</div>

<!-- Modal Deploy / Clone Template -->
<DeployModal
	bind:open={deployModalOpen}
	initialRepo={selectedTemplate?.repoUrl || ''}
	initialName={selectedTemplate?.title || ''}
	onDeploy={(data) => {
		alert(`Đã khởi tạo quy trình Clone & Deploy dự án "${data.name}" lên Povixa Console!`);
	}}
/>

<!-- Modal Submit App / Showcase -->
<SubmitAppModal
	bind:open={submitModalOpen}
	onSubmit={handleNewAppSubmitted}
/>

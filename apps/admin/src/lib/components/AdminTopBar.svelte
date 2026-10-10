<script lang="ts">
	import {
		IconSearch,
		IconRefresh,
		IconSun,
		IconMoon,
		IconDeviceDesktop,
		IconMenu2
	} from '@tabler/icons-svelte-runes';
	import { toggleMode, mode } from 'mode-watcher';

	interface Props {
		activeTab: string;
		onToggleMobile: () => void;
		onRefresh: () => void;
		refreshing?: boolean;
	}

	let { activeTab, onToggleMobile, onRefresh, refreshing = false }: Props = $props();

	const CurrentThemeIcon = $derived(
		mode.current === 'dark' ? IconMoon : mode.current === 'light' ? IconSun : IconDeviceDesktop
	);

	const tabTitles: Record<string, string> = {
		overview: 'Tổng Quan Hệ Thống',
		edge: 'Mạng Lưới Edge Fleet',
		tenants: 'Tổ Chức & Tenants',
		rbac: 'Quản Trị Viên & RBAC',
		audit: 'Nhật Ký Kiểm Toán',
		switches: 'Cầu Dao Khẩn Cấp'
	};

	const currentTitle = $derived(tabTitles[activeTab] || 'Tổng Quan Hệ Thống');
</script>

<header class="h-14 border-b border-border/40 bg-background/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
	<!-- Left: Clean Title Breadcrumb only (No description/subtitle) -->
	<div class="flex items-center gap-3">
		<button
			type="button"
			onclick={onToggleMobile}
			class="lg:hidden h-8 w-8 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50"
			aria-label="Mở menu điều hướng"
		>
			<IconMenu2 size={16} />
		</button>

		<div class="flex items-center gap-2 text-sm">
			<span class="text-muted-foreground">Admin</span>
			<span class="text-muted-foreground/30">/</span>
			<span class="font-semibold text-foreground tracking-tight">{currentTitle}</span>
		</div>
	</div>

	<!-- Center: Sleek, compact search bar -->
	<div class="hidden md:flex items-center flex-1 max-w-sm mx-4">
		<div class="relative w-full">
			<IconSearch size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<input
				type="text"
				placeholder="Tìm kiếm... (⌘K)"
				class="w-full bg-muted/30 hover:bg-muted/40 border border-border/40 rounded-lg pl-8 pr-10 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
			/>
			<kbd class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-background border border-border/50 text-muted-foreground px-1.5 py-0.5 rounded">
				⌘K
			</kbd>
		</div>
	</div>

	<!-- Right: Actions only (Removed 'Hoạt Động Bình Thường' badge per user request) -->
	<div class="flex items-center gap-2">
		<!-- Refresh Button -->
		<button
			type="button"
			onclick={onRefresh}
			class="h-8 w-8 flex items-center justify-center rounded-lg border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
			title="Làm mới viễn đo"
		>
			<IconRefresh size={15} class={refreshing ? 'animate-spin text-primary' : ''} />
		</button>

		<!-- Theme Toggle -->
		<button
			type="button"
			onclick={toggleMode}
			class="h-8 w-8 flex items-center justify-center rounded-lg border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
			aria-label="Chuyển chế độ giao diện"
		>
			<CurrentThemeIcon size={15} />
		</button>
	</div>
</header>

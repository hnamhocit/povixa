<script lang="ts">
	import {
		IconActivity,
		IconServer,
		IconBuilding,
		IconUsers,
		IconHistory,
		IconShieldExclamation,
		IconX
	} from '@tabler/icons-svelte-runes';

	interface Props {
		activeTab: string;
		onTabChange: (tab: string) => void;
		mobileOpen: boolean;
		onCloseMobile: () => void;
	}

	let { activeTab, onTabChange, mobileOpen, onCloseMobile }: Props = $props();

	const navSections = [
		{
			title: 'GIÁM SÁT & VẬN HÀNH',
			items: [
				{
					id: 'overview',
					label: 'Tổng Quan',
					icon: IconActivity,
					badge: null
				},
				{
					id: 'edge',
					label: 'Edge Fleet',
					icon: IconServer,
					badge: '5 PoPs',
					badgeColor: 'bg-emerald-500/10 text-emerald-500'
				}
			]
		},
		{
			title: 'QUẢN LÝ NỀN TẢNG',
			items: [
				{
					id: 'tenants',
					label: 'Tổ Chức & Tenants',
					icon: IconBuilding,
					badge: '1,842',
					badgeColor: 'bg-muted text-muted-foreground'
				},
				{
					id: 'rbac',
					label: 'Quản Trị Viên & RBAC',
					icon: IconUsers,
					badge: '8',
					badgeColor: 'bg-primary/10 text-primary'
				}
			]
		},
		{
			title: 'AN NINH & ĐIỀU HÀNH',
			items: [
				{
					id: 'audit',
					label: 'Nhật Ký Kiểm Toán',
					icon: IconHistory,
					badge: null
				},
				{
					id: 'switches',
					label: 'Cầu Dao Khẩn Cấp',
					icon: IconShieldExclamation,
					badge: 'Cảnh Báo',
					badgeColor: 'bg-rose-500/10 text-rose-500'
				}
			]
		}
	];
</script>

<!-- Mobile Overlay Backdrop -->
{#if mobileOpen}
	<div
		role="button"
		tabindex="0"
		aria-label="Đóng thanh điều hướng"
		onclick={onCloseMobile}
		onkeydown={(e) => e.key === 'Escape' && onCloseMobile()}
		class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
	></div>
{/if}

<!-- Sidebar (Clean, width 64) -->
<aside
	class="fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-border/40 bg-card/40 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 {mobileOpen
		? 'translate-x-0 shadow-2xl'
		: '-translate-x-full lg:translate-x-0'}"
>
	<!-- Brand Header -->
	<div class="h-14 px-5 flex items-center justify-between border-b border-border/40 shrink-0">
		<a href="/" class="flex items-center gap-2.5 font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity">
			<div class="h-7 w-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-black text-xs shadow-xs">
				PX
			</div>
			<div class="flex items-center gap-2">
				<span class="text-sm font-bold tracking-tight">Povixa</span>
				<span class="text-[9px] uppercase px-1.5 py-0.2 rounded font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
					Admin
				</span>
			</div>
		</a>

		<!-- Mobile Close Button -->
		<button
			type="button"
			onclick={onCloseMobile}
			class="lg:hidden h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50"
			aria-label="Đóng menu"
		>
			<IconX size={16} />
		</button>
	</div>

	<!-- Navigation Links (Spacious, clean, uncluttered) -->
	<nav class="flex-1 overflow-y-auto px-3 py-5 space-y-6">
		{#each navSections as section}
			<div class="space-y-1">
				<div class="px-2.5 mb-1.5 text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
					{section.title}
				</div>

				{#each section.items as item}
					{@const isActive = activeTab === item.id}
					{@const Icon = item.icon}
					<button
						type="button"
						onclick={() => {
							onTabChange(item.id);
							if (mobileOpen) onCloseMobile();
						}}
						class="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-all {isActive
							? 'bg-primary text-primary-foreground font-semibold shadow-xs'
							: 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5">
							<Icon size={16} class={isActive ? 'text-primary-foreground' : 'text-muted-foreground/80'} />
							<span>{item.label}</span>
						</div>

						{#if item.badge}
							<span
								class="text-[10px] px-1.5 py-0.2 rounded font-medium {isActive ? 'bg-primary-foreground/20 text-primary-foreground' : item.badgeColor}"
							>
								{item.badge}
							</span>
						{/if}
					</button>
				{/each}
			</div>
		{/each}
	</nav>

	<!-- Bottom: Clean Super Admin Profile -->
	<div class="p-3 border-t border-border/40 shrink-0">
		<div class="px-2.5 py-2 rounded-lg flex items-center justify-between hover:bg-muted/30 transition-colors">
			<div class="flex items-center gap-2.5">
				<div class="h-7 w-7 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center shrink-0">
					HN
				</div>
				<div class="text-left leading-tight">
					<div class="font-medium text-xs text-foreground">hnamhocit</div>
					<div class="text-[11px] text-muted-foreground">Root Superuser</div>
				</div>
			</div>

			<span class="h-2 w-2 rounded-full bg-emerald-500" title="Trực tuyến"></span>
		</div>
	</div>
</aside>

<script lang="ts">
	import AdminSidebar from '#lib/components/AdminSidebar.svelte';
	import AdminTopBar from '#lib/components/AdminTopBar.svelte';
	import AdminOverview from '#lib/components/AdminOverview.svelte';
	import AdminEdgeFleet from '#lib/components/AdminEdgeFleet.svelte';
	import AdminTenants from '#lib/components/AdminTenants.svelte';
	import AdminRbac from '#lib/components/AdminRbac.svelte';
	import AdminAuditLogs from '#lib/components/AdminAuditLogs.svelte';
	import AdminCircuitBreakers from '#lib/components/AdminCircuitBreakers.svelte';

	let activeTab = $state('overview');
	let mobileOpen = $state(false);
	let refreshing = $state(false);

	function handleRefresh() {
		refreshing = true;
		setTimeout(() => {
			refreshing = false;
		}, 600);
	}
</script>

<div class="relative min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
	<!-- Fixed Left App Sidebar -->
	<AdminSidebar
		{activeTab}
		onTabChange={(tab: string) => (activeTab = tab)}
		{mobileOpen}
		onCloseMobile={() => (mobileOpen = false)}
	/>

	<!-- Main App Workspace Area (Shifted right on desktop by 64 / 16rem) -->
	<div class="flex min-h-screen flex-col lg:pl-64">
		<!-- Top App Bar -->
		<AdminTopBar
			{activeTab}
			onToggleMobile={() => (mobileOpen = !mobileOpen)}
			onRefresh={handleRefresh}
			{refreshing}
		/>

		<!-- Scrollable Page Route Content -->
		<main class="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
			{#if activeTab === 'overview'}
				<AdminOverview />
			{:else if activeTab === 'edge'}
				<AdminEdgeFleet />
			{:else if activeTab === 'tenants'}
				<AdminTenants />
			{:else if activeTab === 'rbac'}
				<AdminRbac />
			{:else if activeTab === 'audit'}
				<AdminAuditLogs />
			{:else if activeTab === 'switches'}
				<AdminCircuitBreakers />
			{/if}
		</main>

		<!-- Minimal Flat App Footer -->
		<footer class="border-t border-border/30 py-5 text-xs text-muted-foreground mt-8">
			<div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
				<div class="flex items-center gap-2">
					<span class="font-semibold text-foreground">Povixa Platform Operations</span>
					<span>·</span>
					<span>Bản phát hành v2.8.4-edge (Anycast Fleet)</span>
				</div>
				<div class="flex items-center gap-4">
					<span class="flex items-center gap-1.5">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
						Core API 99.998% SLA
					</span>
					<span>·</span>
					<span>Mã hóa mTLS nội bộ</span>
				</div>
			</div>
		</footer>
	</div>
</div>

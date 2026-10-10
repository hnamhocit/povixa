<script lang="ts">
	import { orgStore } from '#lib/stores/orgProject.svelte.js';
	import ProjectTrafficChart from './charts/ProjectTrafficChart.svelte';
	import ProjectLatencyChart from './charts/ProjectLatencyChart.svelte';
	import ProjectAuthMetrics from './charts/ProjectAuthMetrics.svelte';
	import ProjectNotificationPipeline from './charts/ProjectNotificationPipeline.svelte';
	import TelemetryStream from './TelemetryStream.svelte';
	import SdkQuickstart from './SdkQuickstart.svelte';
	import {
		IconKey,
		IconTerminal2,
		IconSettings,
		IconWorld
	} from '@tabler/icons-svelte-runes';

	const proj = $derived(orgStore.currentProject!);
</script>

<div class="space-y-8 animate-in fade-in duration-200">
	<!-- 1. Flat Project Title & Actions Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/50">
		<div class="space-y-1">
			<div class="flex flex-wrap items-center gap-2.5">
				<h1 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
					{proj.name}
				</h1>
				<span class="rounded-md border border-border/70 bg-secondary/40 px-2 py-0.5 text-xs font-mono text-muted-foreground">
					{proj.slug}
				</span>
			</div>
			<p class="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-2.5">
				<span>Hạ tầng: <strong class="text-foreground">Edge Distributed POP</strong></span>
				<span>•</span>
				<span class="flex items-center gap-1 font-mono">
					<IconWorld size={14} />
					{proj.region}
				</span>
				<span>•</span>
				<span>Tạo ngày: {proj.createdAt}</span>
			</p>
		</div>

		<!-- Project Action Buttons -->
		<div class="flex flex-wrap items-center gap-2.5 shrink-0">
			<a
				href="/api-keys"
				class="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
			>
				<IconKey size={14} stroke={2.5} />
				<span>API Keys</span>
			</a>
			<a
				href="/observability"
				class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-secondary"
			>
				<IconTerminal2 size={14} />
				<span>Xem Logs Edge</span>
			</a>
			<a
				href="/settings"
				class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 p-2 text-xs font-semibold text-foreground transition-all hover:bg-secondary"
				title="Cài đặt dự án"
			>
				<IconSettings size={16} />
			</a>
		</div>
	</div>

	<!-- 2. Flat Telemetry Ribbon with Sparkline Charts -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
			<!-- 1. Yêu cầu API hôm nay + Sparkline -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-3.5 flex flex-col justify-between">
				<div>
					<span class="text-muted-foreground block text-[11px]">Yêu Cầu API Hôm Nay</span>
					<div class="mt-1 flex items-baseline justify-between">
						<span class="text-xl font-bold text-foreground font-sans">{proj.apiCallsToday.toLocaleString('vi-VN')}</span>
						<span class="text-[10px] text-emerald-500 font-semibold">+14.2%</span>
					</div>
				</div>
				<!-- Mini Sparkline (Upward requests) -->
				<div class="mt-3 pt-2 border-t border-border/30">
					<svg viewBox="0 0 100 24" class="w-full h-6 overflow-visible" preserveAspectRatio="none">
						<defs>
							<linearGradient id="reqSparkGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
								<stop offset="100%" stop-color="#10b981" stop-opacity="0" />
							</linearGradient>
						</defs>
						<path d="M 0,18 Q 20,20 35,14 T 70,8 T 100,3 L 100,24 L 0,24 Z" fill="url(#reqSparkGrad)" />
						<path d="M 0,18 Q 20,20 35,14 T 70,8 T 100,3" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" />
					</svg>
					<div class="flex justify-between text-[9px] text-muted-foreground mt-1">
						<span>00:00</span>
						<span>24h qua</span>
					</div>
				</div>
			</div>

			<!-- 2. End-Users Hoạt Động + Sparkline -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-3.5 flex flex-col justify-between">
				<div>
					<span class="text-muted-foreground block text-[11px]">End-Users Hoạt Động</span>
					<div class="mt-1 flex items-baseline justify-between">
						<span class="text-xl font-bold text-foreground font-sans">{proj.activeEndUsers.toLocaleString('vi-VN')}</span>
						<span class="text-[10px] text-primary font-semibold">Tăng trưởng</span>
					</div>
				</div>
				<!-- Mini Sparkline (User growth) -->
				<div class="mt-3 pt-2 border-t border-border/30">
					<svg viewBox="0 0 100 24" class="w-full h-6 overflow-visible" preserveAspectRatio="none">
						<defs>
							<linearGradient id="userSparkGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
								<stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
							</linearGradient>
						</defs>
						<path d="M 0,19 Q 25,16 45,13 T 80,7 T 100,4 L 100,24 L 0,24 Z" fill="url(#userSparkGrad)" />
						<path d="M 0,19 Q 25,16 45,13 T 80,7 T 100,4" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" />
					</svg>
					<div class="flex justify-between text-[9px] text-muted-foreground mt-1">
						<span>7 ngày trước</span>
						<span>Hiện tại</span>
					</div>
				</div>
			</div>

			<!-- 3. Độ Trễ p95 Latency + Sparkline -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-3.5 flex flex-col justify-between">
				<div>
					<span class="text-muted-foreground block text-[11px]">Độ Trễ p95 Latency</span>
					<div class="mt-1 flex items-baseline justify-between">
						<span class="text-xl font-bold text-emerald-500 font-sans">{proj.p95LatencyMs}ms</span>
						<span class="text-[10px] text-muted-foreground">Anycast POP</span>
					</div>
				</div>
				<!-- Mini Sparkline (Stable low latency) -->
				<div class="mt-3 pt-2 border-t border-border/30">
					<svg viewBox="0 0 100 24" class="w-full h-6 overflow-visible" preserveAspectRatio="none">
						<defs>
							<linearGradient id="latSparkGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
								<stop offset="100%" stop-color="#10b981" stop-opacity="0" />
							</linearGradient>
						</defs>
						<path d="M 0,12 Q 15,9 30,13 T 60,11 T 85,14 T 100,12 L 100,24 L 0,24 Z" fill="url(#latSparkGrad)" />
						<path d="M 0,12 Q 15,9 30,13 T 60,11 T 85,14 T 100,12" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" />
					</svg>
					<div class="flex justify-between text-[9px] text-muted-foreground mt-1">
						<span>Dao động: ±1.2ms</span>
						<span>Rất nhanh</span>
					</div>
				</div>
			</div>

			<!-- 4. Uptime SLA + Heartbeat Graph -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-3.5 flex flex-col justify-between">
				<div>
					<span class="text-muted-foreground block text-[11px]">Uptime SLA Tuân Thủ</span>
					<div class="mt-1 flex items-baseline justify-between">
						<span class="text-xl font-bold text-foreground font-sans">99.99%</span>
						<span class="text-[10px] text-emerald-500 font-semibold">Hoạt động</span>
					</div>
				</div>
				<!-- Mini Heartbeat Bar Strip (24 hours uptime) -->
				<div class="mt-3 pt-2 border-t border-border/30">
					<div class="flex items-center gap-[3px] h-6">
						{#each Array(20) as _, i}
							<div
								class="h-full flex-1 rounded-xs bg-emerald-500/80 hover:bg-emerald-400 transition-colors"
								title="Giờ {i + 1}: 100% Uptime"
							></div>
						{/each}
					</div>
					<div class="flex justify-between text-[9px] text-muted-foreground mt-1">
						<span>30 ngày qua</span>
						<span class="text-emerald-500">0 sự cố</span>
					</div>
				</div>
			</div>
		</div>

	<!-- Interactive Visual Graphs & Charts Section -->
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-lg font-bold text-foreground">Giám Sát Viễn Đo Trực Quan (Telemetry & Charts)</h2>
				<p class="text-xs text-muted-foreground">
					Biểu đồ lưu lượng, độ trễ Edge POP, phân bổ OAuth người dùng và hàng đợi thông báo của dự án.
				</p>
			</div>
		</div>

		<!-- Full-width Throughput Stream Chart -->
		<ProjectTrafficChart />

		<!-- 2-Column Visual Charts: Latency & Auth Metrics -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<ProjectLatencyChart />
			<ProjectAuthMetrics />
		</div>

		<!-- Notifications Pipeline Overview Chart -->
		<ProjectNotificationPipeline />
	</div>

	<!-- Live Telemetry Stream & Quickstart -->
	<div class="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4 border-t border-border/50">
		<TelemetryStream />
		<SdkQuickstart />
	</div>
</div>

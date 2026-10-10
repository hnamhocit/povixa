<script lang="ts">
	import {
		IconChartHistogram,
		IconTrendingUp,
		IconUsers,
		IconFilter,
		IconEye,
		IconArrowUpRight,
		IconCalendar
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const funnels = [
		{ step: '1. Truy cập Trang / App Visit', users: '142,800', percent: 100, drop: '0%' },
		{ step: '2. Xem Sản Phẩm / Feature Engagement', users: '96,500', percent: 67.5, drop: '-32.5%' },
		{ step: '3. Khởi tạo Đăng ký / Checkout', users: '48,200', percent: 33.7, drop: '-50.1%' },
		{ step: '4. Hoàn tất / Verified User', users: '26,140', percent: 18.3, drop: '-45.8%' }
	];

	const topEndpoints = [
		{ method: 'GET', path: '/v1/config/eval', count: '14.2M', latency: '0.8ms', errors: '0.001%' },
		{ method: 'POST', path: '/v1/auth/session/verify', count: '8.4M', latency: '1.2ms', errors: '0.00%' },
		{ method: 'GET', path: '/v1/storage/objects', count: '6.1M', latency: '3.4ms', errors: '0.02%' },
		{ method: 'POST', path: '/v1/notify/dispatch', count: '4.2M', latency: '14.8ms', errors: '0.05%' },
		{ method: 'POST', path: '/v1/telemetry/ingest', count: '1.3M', latency: '0.5ms', errors: '0.00%' }
	];
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
					<IconChartHistogram size={20} stroke={2.5} />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.nav_analytics()}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-1">
				Đo kiểm hành vi người dùng, phễu chuyển đổi và phân tích giữ chân với bảo mật dữ liệu tuyệt đối (Zero 3rd-party leaks).
			</p>
		</div>

		<div class="flex items-center gap-2 text-xs">
			<span class="rounded-xl border border-border bg-card px-3 py-1.5 font-medium text-foreground">
				30 ngày qua (Oct 2026)
			</span>
		</div>
	</div>

	<!-- Top Metrics -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Tổng Sự Kiện Thu Thập</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">34,289,104</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">+14.2% so với tháng trước</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Người Dùng Hoạt Động (MAU)</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">18,420</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">+8.1% tăng trưởng thuần</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Tỷ Lệ Chuyển Đổi Phễu</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">18.3%</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">Từ truy cập đến thanh toán</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Thời Gian Phiên Trung Bình</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">4m 32s</div>
			<p class="mt-1 text-xs text-muted-foreground">Mức độ tương tác cao</p>
		</div>
	</div>

	<!-- Funnel Visualization -->
	<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="font-bold text-sm text-foreground">Phễu Chuyển Đổi Thời Gian Thực (Conversion Funnel)</h3>
				<p class="text-xs text-muted-foreground mt-0.5">Theo dõi tỷ lệ rớt của người dùng qua từng giai đoạn sản phẩm.</p>
			</div>
			<span class="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">Live Ingestion</span>
		</div>

		<div class="space-y-3 pt-2">
			{#each funnels as f}
				<div class="space-y-1.5">
					<div class="flex items-center justify-between text-xs">
						<span class="font-semibold text-foreground">{f.step}</span>
						<div class="flex items-center gap-3">
							<span class="font-mono text-muted-foreground">{f.users}</span>
							<span class="font-mono font-bold text-foreground w-12 text-right">{f.percent}%</span>
						</div>
					</div>
					<div class="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
						<div
							class="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500"
							style="width: {f.percent}%"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Top API Endpoints -->
	<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="border-b border-border/50 px-5 py-3.5 flex items-center justify-between">
			<h3 class="font-bold text-xs text-foreground">Top API Endpoints & Độ Trễ</h3>
			<span class="text-xs text-muted-foreground">Real-time Telemetry</span>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
					<tr>
						<th class="px-5 py-3.5">Phương Thức</th>
						<th class="px-5 py-3.5">Đường Dẫn Endpoint</th>
						<th class="px-5 py-3.5">Lượng Yêu Cầu</th>
						<th class="px-5 py-3.5">Độ Trễ p95</th>
						<th class="px-5 py-3.5 text-right">Tỷ Lệ Lỗi</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40 font-mono">
					{#each topEndpoints as ep}
						<tr class="transition-colors hover:bg-secondary/20">
							<td class="px-5 py-3.5">
								<span class="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-foreground">
									{ep.method}
								</span>
							</td>
							<td class="px-5 py-3.5 text-foreground font-semibold">
								{ep.path}
							</td>
							<td class="px-5 py-3.5 text-muted-foreground">
								{ep.count}
							</td>
							<td class="px-5 py-3.5 text-emerald-500 font-semibold">
								{ep.latency}
							</td>
							<td class="px-5 py-3.5 text-right text-muted-foreground">
								{ep.errors}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

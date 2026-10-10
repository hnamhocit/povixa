<script lang="ts">
	import {
		IconArrowUpRight,
		IconCheck,
		IconActivity,
		IconBuilding,
		IconServer,
		IconWifi,
		IconAlertCircle
	} from '@tabler/icons-svelte-runes';

	let timeRange = $state<'1h' | '6h' | '24h' | '7d'>('24h');

	// 12 data points for 24h
	const trafficData = [
		{ hour: '00h', ok: 1420, err: 1 },
		{ hour: '02h', ok: 1100, err: 0 },
		{ hour: '04h', ok: 950, err: 0 },
		{ hour: '06h', ok: 1380, err: 2 },
		{ hour: '08h', ok: 2150, err: 3 },
		{ hour: '10h', ok: 3420, err: 5 },
		{ hour: '12h', ok: 3890, err: 4 },
		{ hour: '14h', ok: 4210, err: 6 },
		{ hour: '16h', ok: 4050, err: 3 },
		{ hour: '18h', ok: 3620, err: 4 },
		{ hour: '20h', ok: 2890, err: 2 },
		{ hour: '22h', ok: 1980, err: 1 }
	];

	const maxVal = 4600;
	const chartPoints = trafficData.map((d, i) => {
		const x = 30 + i * ((740 - 30) / (trafficData.length - 1));
		const yOk = 170 - (d.ok / maxVal) * 135;
		const yErr = 170 - (d.err * 140 / maxVal) * 135;
		return { x, yOk, yErr, ...d };
	});

	const pointsOk = chartPoints.map(p => `${p.x},${p.yOk}`).join(' ');
	const pointsErr = chartPoints.map(p => `${p.x},${p.yErr}`).join(' ');
	const polyAreaOk = `30,170 ${pointsOk} ${chartPoints[chartPoints.length - 1].x},170`;

	const edgePops = [
		{ id: 'sin1', name: 'Singapore', latency: '24ms', qps: '4.2k r/s', cpu: 34 },
		{ id: 'iad1', name: 'US Virginia', latency: '180ms', qps: '6.1k r/s', cpu: 48 },
		{ id: 'hkg1', name: 'Hong Kong', latency: '38ms', qps: '3.8k r/s', cpu: 29 },
		{ id: 'fra1', name: 'Frankfurt', latency: '165ms', qps: '4.5k r/s', cpu: 41 },
		{ id: 'nrt1', name: 'Tokyo', latency: '72ms', qps: '3.1k r/s', cpu: 26 }
	];

	const recentEvents = [
		{ node: 'sin1', time: '4 phút trước', desc: 'Đồng bộ khóa TLS tự động hoàn tất cho 120 tên miền tùy chỉnh' },
		{ node: 'iad1', time: '28 phút trước', desc: 'Snapshot WAL tự động hoàn tất định kỳ vào S3 Cold Tier' },
		{ node: 'fra1', time: '1 giờ trước', desc: 'Cập nhật bộ quy tắc phòng vệ WAF Core Rules v3.4 thành công' }
	];
</script>

<div class="space-y-6">
	<!-- 4 Clean, Calm Primary KPI Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
		<!-- Card 1: Users -->
		<div class="p-5 rounded-xl border border-border/40 bg-card/30 space-y-1">
			<div class="flex items-center justify-between text-xs text-muted-foreground">
				<span>Người Dùng Toàn Cầu</span>
				<span class="text-emerald-500 font-medium flex items-center">
					+12.4% <IconArrowUpRight size={13} />
				</span>
			</div>
			<div class="text-2xl font-bold tracking-tight text-foreground">
				142,580
			</div>
			<div class="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
				<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
				<span>18,940 đang trực tuyến</span>
			</div>
		</div>

		<!-- Card 2: Tenants -->
		<div class="p-5 rounded-xl border border-border/40 bg-card/30 space-y-1">
			<div class="flex items-center justify-between text-xs text-muted-foreground">
				<span>Tổ Chức Doanh Nghiệp</span>
				<span class="text-emerald-500 font-medium flex items-center">
					+28 mới <IconArrowUpRight size={13} />
				</span>
			</div>
			<div class="text-2xl font-bold tracking-tight text-foreground">
				1,842
			</div>
			<div class="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
				<span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
				<span>331 Enterprise · 700 Pro</span>
			</div>
		</div>

		<!-- Card 3: Edge Traffic -->
		<div class="p-5 rounded-xl border border-border/40 bg-card/30 space-y-1">
			<div class="flex items-center justify-between text-xs text-muted-foreground">
				<span>Lưu Lượng Edge (24h)</span>
				<span class="text-emerald-500 font-medium flex items-center">
					99.99% <IconCheck size={13} />
				</span>
			</div>
			<div class="text-2xl font-bold tracking-tight text-foreground">
				48.2M <span class="text-sm font-normal text-muted-foreground">req</span>
			</div>
			<div class="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
				<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
				<span>Đỉnh 1,840 req/giây</span>
			</div>
		</div>

		<!-- Card 4: MRR -->
		<div class="p-5 rounded-xl border border-border/40 bg-card/30 space-y-1">
			<div class="flex items-center justify-between text-xs text-muted-foreground">
				<span>Doanh Thu MRR</span>
				<span class="text-emerald-500 font-medium flex items-center">
					+18.9% <IconArrowUpRight size={13} />
				</span>
			</div>
			<div class="text-2xl font-bold tracking-tight text-foreground">
				$48,520
			</div>
			<div class="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
				<span class="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
				<span>ARR dự kiến $582k USD</span>
			</div>
		</div>
	</div>

	<!-- Secondary Minimalist Stats Bar -->
	<div class="px-5 py-3 rounded-xl border border-border/30 bg-muted/15 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
		<div class="flex items-center gap-2">
			<span>Băng thông 30 ngày:</span>
			<strong class="text-foreground font-semibold">142.8 TB</strong>
		</div>
		<div class="h-3 w-px bg-border/40 hidden sm:block"></div>
		<div class="flex items-center gap-2">
			<span>Lưu trữ S3 Cluster:</span>
			<strong class="text-foreground font-semibold">64.2 TB</strong>
		</div>
		<div class="h-3 w-px bg-border/40 hidden sm:block"></div>
		<div class="flex items-center gap-2">
			<span>Độ trễ P95:</span>
			<strong class="text-emerald-500 font-semibold">24.2ms</strong>
		</div>
		<div class="h-3 w-px bg-border/40 hidden sm:block"></div>
		<div class="flex items-center gap-2">
			<span>Tỷ lệ Hit Cache:</span>
			<strong class="text-foreground font-semibold">92.4%</strong>
		</div>
	</div>

	<!-- Main Telemetry Chart & Tenant Plans (2 Columns) -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Left: Telemetry Chart (2 cols) -->
		<div class="lg:col-span-2 p-5 rounded-xl border border-border/40 bg-card/25 flex flex-col justify-between">
			<div class="flex items-center justify-between mb-4">
				<div class="flex items-center gap-2">
					<IconActivity size={17} class="text-primary" />
					<h3 class="text-sm font-semibold text-foreground">Lưu Lượng Yêu Cầu & Tỷ Lệ Lỗi Biên</h3>
				</div>

				<div class="flex items-center rounded-lg border border-border/40 bg-muted/20 p-0.5 text-xs">
					{#each (['1h', '6h', '24h', '7d'] as const) as r}
						<button
							type="button"
							onclick={() => (timeRange = r)}
							class="px-2.5 py-0.5 rounded font-medium transition-colors {timeRange === r ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
						>
							{r}
						</button>
					{/each}
				</div>
			</div>

			<!-- Chart Legend -->
			<div class="flex items-center gap-5 text-xs text-muted-foreground mb-2">
				<div class="flex items-center gap-1.5">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					<span class="text-foreground font-medium">Thành công 2xx</span>
					<span>(99.85%)</span>
				</div>
				<div class="flex items-center gap-1.5">
					<span class="h-2 w-2 rounded-full bg-rose-500"></span>
					<span class="text-foreground font-medium">Lỗi máy chủ 5xx</span>
					<span>(0.01%)</span>
				</div>
			</div>

			<!-- SVG Chart -->
			<div class="w-full overflow-hidden my-1">
				<svg viewBox="0 0 760 190" class="w-full h-44 select-none">
					<defs>
						<linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
							<stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
						</linearGradient>
					</defs>

					<!-- Subtle Grid lines -->
					<line x1="30" y1="40" x2="740" y2="40" stroke="currentColor" class="text-border/20" stroke-dasharray="3 3" />
					<line x1="30" y1="95" x2="740" y2="95" stroke="currentColor" class="text-border/20" stroke-dasharray="3 3" />
					<line x1="30" y1="150" x2="740" y2="150" stroke="currentColor" class="text-border/20" stroke-dasharray="3 3" />
					<line x1="30" y1="170" x2="740" y2="170" stroke="currentColor" class="text-border/40" />

					<!-- Y-Axis Labels -->
					<text x="24" y="44" text-anchor="end" class="text-[9px] fill-muted-foreground font-mono">4.5k</text>
					<text x="24" y="99" text-anchor="end" class="text-[9px] fill-muted-foreground font-mono">2.5k</text>
					<text x="24" y="154" text-anchor="end" class="text-[9px] fill-muted-foreground font-mono">1.0k</text>

					<!-- Green Area Gradient -->
					<polygon points={polyAreaOk} fill="url(#chartAreaGrad)" />

					<!-- Polyline 2xx Success (Green) -->
					<polyline
						points={pointsOk}
						fill="none"
						stroke="#10b981"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<!-- Polyline 5xx Error (Red) -->
					<polyline
						points={pointsErr}
						fill="none"
						stroke="#ef4444"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<!-- Data Point Dots for Green -->
					{#each chartPoints as pt}
						<circle cx={pt.x} cy={pt.yOk} r="3" fill="#10b981" />
						<text x={pt.x} y="185" text-anchor="middle" class="text-[9px] fill-muted-foreground">{pt.hour}</text>
					{/each}
				</svg>
			</div>
		</div>

		<!-- Right: Plans Distribution (Donut Chart) -->
		<div class="p-5 rounded-xl border border-border/40 bg-card/25 flex flex-col justify-between">
			<div>
				<div class="flex items-center gap-2 mb-3">
					<IconBuilding size={17} class="text-primary" />
					<h3 class="text-sm font-semibold text-foreground">Cơ Cấu Gói Dịch Vụ</h3>
				</div>

				<!-- SVG Donut Chart -->
				<div class="flex items-center justify-center my-2">
					<div class="relative w-36 h-36">
						<svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
							<!-- Starter: 44% -->
							<circle
								cx="50"
								cy="50"
								r="38"
								fill="transparent"
								stroke="#3b82f6"
								stroke-width="11"
								stroke-dasharray="105.05 238.76"
								stroke-dashoffset="0"
							/>
							<!-- Pro: 38% -->
							<circle
								cx="50"
								cy="50"
								r="38"
								fill="transparent"
								stroke="#8b5cf6"
								stroke-width="11"
								stroke-dasharray="90.72 238.76"
								stroke-dashoffset="-105.05"
							/>
							<!-- Enterprise: 18% -->
							<circle
								cx="50"
								cy="50"
								r="38"
								fill="transparent"
								stroke="#10b981"
								stroke-width="11"
								stroke-dasharray="42.97 238.76"
								stroke-dashoffset="-195.77"
							/>
						</svg>

						<!-- Center Label inside Donut -->
						<div class="absolute inset-0 flex flex-col items-center justify-center text-center">
							<span class="text-xs font-bold text-foreground">1,842</span>
							<span class="text-[10px] text-muted-foreground">Tổ Chức</span>
						</div>
					</div>
				</div>

				<!-- Minimal Clean Legend (No heavy boxes) -->
				<div class="space-y-2 mt-3 text-xs">
					<div class="flex items-center justify-between py-1 border-b border-border/20">
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
							<span class="text-foreground font-medium">Enterprise</span>
						</div>
						<span class="text-foreground font-semibold">331 <span class="text-muted-foreground font-normal">(18%)</span></span>
					</div>

					<div class="flex items-center justify-between py-1 border-b border-border/20">
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-purple-500"></span>
							<span class="text-foreground font-medium">Pro Team</span>
						</div>
						<span class="text-foreground font-semibold">700 <span class="text-muted-foreground font-normal">(38%)</span></span>
					</div>

					<div class="flex items-center justify-between py-1">
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-blue-500"></span>
							<span class="text-foreground font-medium">Starter</span>
						</div>
						<span class="text-foreground font-semibold">811 <span class="text-muted-foreground font-normal">(44%)</span></span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Edge POPs Status & Recent Alerts (Clean, Minimalist Grid) -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Left: 5 Edge POPs (2 cols) -->
		<div class="lg:col-span-2 p-5 rounded-xl border border-border/40 bg-card/25">
			<div class="flex items-center justify-between mb-3">
				<div class="flex items-center gap-2">
					<IconServer size={17} class="text-primary" />
					<h3 class="text-sm font-semibold text-foreground">Cụm Edge Fleet Toàn Cầu (5 PoPs)</h3>
				</div>
				<span class="text-xs text-muted-foreground">Tất cả trực tuyến</span>
			</div>

			<!-- Clean Flat Table of 5 Nodes -->
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs border-collapse">
					<thead>
						<tr class="border-b border-border/30 text-muted-foreground">
							<th class="py-2.5 px-3 font-semibold">Node</th>
							<th class="py-2.5 px-3 font-semibold">Vùng</th>
							<th class="py-2.5 px-3 font-semibold">Độ Trễ</th>
							<th class="py-2.5 px-3 font-semibold">Lưu Lượng</th>
							<th class="py-2.5 px-3 font-semibold">Tải CPU</th>
							<th class="py-2.5 px-3 font-semibold text-right">Trạng Thái</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border/20">
						{#each edgePops as pop}
							<tr class="hover:bg-muted/20 transition-colors">
								<td class="py-2.5 px-3 font-bold text-foreground">{pop.id}</td>
								<td class="py-2.5 px-3 text-muted-foreground">{pop.name}</td>
								<td class="py-2.5 px-3 font-semibold text-emerald-500">{pop.latency}</td>
								<td class="py-2.5 px-3 text-foreground">{pop.qps}</td>
								<td class="py-2.5 px-3">
									<div class="flex items-center gap-2">
										<div class="w-16 bg-muted/40 rounded-full h-1.5 overflow-hidden">
											<div class="bg-primary h-full rounded-full" style="width: {pop.cpu}%"></div>
										</div>
										<span class="text-muted-foreground">{pop.cpu}%</span>
									</div>
								</td>
								<td class="py-2.5 px-3 text-right">
									<span class="inline-flex items-center gap-1.5 text-emerald-500 font-medium">
										<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
										Hoạt Động
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Right: Recent Events (1 col) -->
		<div class="p-5 rounded-xl border border-border/40 bg-card/25 flex flex-col justify-between">
			<div>
				<div class="flex items-center gap-2 mb-3">
					<IconAlertCircle size={17} class="text-primary" />
					<h3 class="text-sm font-semibold text-foreground">Sự Kiện Gần Nhất</h3>
				</div>

				<div class="space-y-3">
					{#each recentEvents as ev}
						<div class="space-y-0.5 text-xs pb-2 border-b border-border/20 last:border-0 last:pb-0">
							<div class="flex items-center justify-between text-muted-foreground">
								<span class="font-semibold text-foreground">{ev.node}</span>
								<span>{ev.time}</span>
							</div>
							<p class="text-muted-foreground text-xs leading-relaxed">
								{ev.desc}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

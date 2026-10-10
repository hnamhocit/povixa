<script lang="ts">
	let activeMetric = $state<'p50' | 'p95' | 'p99'>('p95');
	let hoveredIndex = $state<number | null>(null);

	const regions = [
		{ name: 'sin1 (Singapore - APAC)', ping: 14.2, status: 'Siêu tốc', max: 30 },
		{ name: 'iad1 (US-East - Virginia)', ping: 18.5, status: 'Ổn định', max: 30 },
		{ name: 'hkg1 (Hong Kong - APAC)', ping: 16.8, status: 'Siêu tốc', max: 30 },
		{ name: 'fra1 (Frankfurt - EU)', ping: 24.1, status: 'Bình thường', max: 30 },
		{ name: 'nrt1 (Tokyo - JP)', ping: 21.0, status: 'Bình thường', max: 30 }
	];

	// 12 data points representing hourly p50/p95/p99 latency
	const latencyTrend = [
		{ time: '12:00', p50: 3.8, p95: 16.2, p99: 38.4 },
		{ time: '13:00', p50: 4.1, p95: 17.5, p99: 41.2 },
		{ time: '14:00', p50: 4.5, p95: 19.8, p99: 45.0 },
		{ time: '15:00', p50: 4.8, p95: 22.1, p99: 52.3 },
		{ time: '16:00', p50: 4.2, p95: 18.4, p99: 42.0 },
		{ time: '17:00', p50: 3.9, p95: 16.9, p99: 39.5 },
		{ time: '18:00', p50: 4.3, p95: 18.8, p99: 44.1 },
		{ time: '19:00', p50: 4.6, p95: 20.2, p99: 47.8 },
		{ time: '20:00', p50: 4.2, p95: 18.0, p99: 41.5 },
		{ time: '21:00', p50: 3.7, p95: 15.6, p99: 36.2 },
		{ time: '22:00', p50: 3.5, p95: 14.8, p99: 34.0 },
		{ time: '23:00', p50: 3.6, p95: 15.2, p99: 35.1 }
	];

	const maxVal = $derived(activeMetric === 'p50' ? 8 : activeMetric === 'p95' ? 30 : 65);

	const svgWidth = 520;
	const svgHeight = 150;
	const pad = { top: 25, bottom: 25, left: 28, right: 15 };
	const plotW = svgWidth - pad.left - pad.right;
	const plotH = svgHeight - pad.top - pad.bottom;
</script>

<div class="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
	<div>
		<!-- Card Header -->
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
			<div>
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-bold text-foreground">Độ Trễ Phản Hồi (Edge Latency)</h3>
					<span class="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
						Global Anycast
					</span>
				</div>
				<p class="text-xs text-muted-foreground mt-0.5">
					Biểu đồ cột phân vị thời gian xử lý phân tán theo giờ
				</p>
			</div>

			<!-- Latency Tier Switcher -->
			<div class="inline-flex items-center rounded-xl border border-border/60 bg-secondary/40 p-1 text-xs">
				<button
					type="button"
					onclick={() => (activeMetric = 'p50')}
					class="rounded-lg px-2.5 py-1 font-semibold transition-all {activeMetric === 'p50' ? 'bg-card text-emerald-500 shadow-2xs' : 'text-muted-foreground hover:text-foreground'}"
				>
					p50 (3.6ms)
				</button>
				<button
					type="button"
					onclick={() => (activeMetric = 'p95')}
					class="rounded-lg px-2.5 py-1 font-semibold transition-all {activeMetric === 'p95' ? 'bg-card text-blue-500 shadow-2xs' : 'text-muted-foreground hover:text-foreground'}"
				>
					p95 (18.4ms)
				</button>
				<button
					type="button"
					onclick={() => (activeMetric = 'p99')}
					class="rounded-lg px-2.5 py-1 font-semibold transition-all {activeMetric === 'p99' ? 'bg-card text-amber-500 shadow-2xs' : 'text-muted-foreground hover:text-foreground'}"
				>
					p99 (42.0ms)
				</button>
			</div>
		</div>

		<!-- High-visibility SVG Column / Bar Chart -->
		<div class="relative w-full overflow-hidden mt-3">
			<svg
				viewBox="0 0 {svgWidth} {svgHeight}"
				class="w-full h-44 select-none overflow-visible"
				preserveAspectRatio="none"
			>
				<defs>
					<linearGradient id="barGradEmerald" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stop-color="#10b981" />
						<stop offset="100%" stop-color="#059669" />
					</linearGradient>
					<linearGradient id="barGradBlue" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stop-color="#3b82f6" />
						<stop offset="100%" stop-color="#1d4ed8" />
					</linearGradient>
					<linearGradient id="barGradAmber" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stop-color="#f59e0b" />
						<stop offset="100%" stop-color="#d97706" />
					</linearGradient>
				</defs>

				<!-- Horizontal Reference Gridlines -->
				{#each [0.25, 0.5, 0.75, 1.0] as ratio}
					{@const y = pad.top + plotH - ratio * plotH}
					{@const refVal = Math.round(ratio * maxVal)}
					<line
						x1={pad.left}
						y1={y}
						x2={svgWidth - pad.right}
						y2={y}
						stroke="currentColor"
						stroke-opacity="0.08"
						stroke-dasharray="2 3"
					/>
					<text
						x={pad.left - 4}
						y={y + 3}
						text-anchor="end"
						font-size="8"
						fill="currentColor"
						class="text-muted-foreground/60 font-mono"
					>
						{refVal}m
					</text>
				{/each}

				<!-- Base axis line -->
				<line
					x1={pad.left}
					y1={pad.top + plotH}
					x2={svgWidth - pad.right}
					y2={pad.top + plotH}
					stroke="currentColor"
					stroke-opacity="0.2"
				/>

				<!-- Columns (Biểu đồ cột) -->
				{#each latencyTrend as d, i}
					{@const val = d[activeMetric]}
					{@const barH = Math.max(6, (val / maxVal) * plotH)}
					{@const colW = plotW / latencyTrend.length}
					{@const barW = Math.min(22, colW * 0.72)}
					{@const x = pad.left + i * colW + (colW - barW) / 2}
					{@const y = pad.top + plotH - barH}
					{@const isHovered = hoveredIndex === i}
					{@const fillGrad = activeMetric === 'p50' ? 'url(#barGradEmerald)' : activeMetric === 'p95' ? 'url(#barGradBlue)' : 'url(#barGradAmber)'}

					<!-- Column Bar -->
					<rect
						{x}
						{y}
						width={barW}
						height={barH}
						rx="4"
						ry="4"
						fill={fillGrad}
						opacity={isHovered ? 1 : 0.88}
						class="cursor-pointer transition-all duration-150"
						role="graphics-symbol"
						tabindex="-1"
						onmouseenter={() => (hoveredIndex = i)}
						onmouseleave={() => (hoveredIndex = null)}
					/>

					<!-- Value text on top of bar -->
					<text
						x={x + barW / 2}
						y={y - 4}
						text-anchor="middle"
						font-size="8"
						font-weight="bold"
						fill="currentColor"
						class="{isHovered ? 'text-foreground' : 'text-muted-foreground/75'} font-mono"
					>
						{val}
					</text>

					<!-- Time label below bar -->
					<text
						x={x + barW / 2}
						y={pad.top + plotH + 14}
						text-anchor="middle"
						font-size="8"
						fill="currentColor"
						class="{isHovered ? 'text-primary font-bold' : 'text-muted-foreground/70'} font-mono"
					>
						{d.time.split(':')[0]}h
					</text>
				{/each}
			</svg>
		</div>
	</div>

	<!-- Regional Latency POP Breakdown with Horizontal Bar Charts -->
	<div class="mt-5 pt-4 border-t border-border/50">
		<span class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2.5">
			Điểm Hiện Diện POP Trực Tuyến (So sánh cột đo)
		</span>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
			{#each regions as r}
				{@const pct = Math.min(100, Math.round((r.ping / r.max) * 100))}
				<div class="flex flex-col gap-1.5 rounded-xl bg-secondary/30 p-2.5 border border-border/40">
					<div class="flex items-center justify-between text-xs">
						<div class="flex items-center gap-1.5 min-w-0">
							<span class="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
							<span class="font-medium text-foreground truncate">{r.name}</span>
						</div>
						<span class="font-mono font-bold {r.ping <= 17 ? 'text-emerald-500' : 'text-blue-500'} shrink-0 ml-2">
							{r.ping}ms
						</span>
					</div>

					<!-- Visual Latency Bar -->
					<div class="h-2 w-full rounded-full bg-secondary/80 overflow-hidden">
						<div
							class="h-full rounded-full transition-all duration-500 {r.ping <= 17 ? 'bg-emerald-500' : 'bg-blue-500'}"
							style="width: {pct}%;"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

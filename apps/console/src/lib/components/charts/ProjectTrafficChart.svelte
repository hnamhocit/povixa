<script lang="ts">
	import { IconTrendingUp, IconActivity, IconClock, IconCheck, IconAlertTriangle } from '@tabler/icons-svelte-runes';

	let timeframe = $state<'24h' | '7d' | '30d'>('24h');
	let hoveredIndex = $state<number | null>(null);

	// 24 points for 24h
	const data24h = [
		{ label: '00:00', value: 24000, error: 12 },
		{ label: '01:00', value: 18500, error: 8 },
		{ label: '02:00', value: 14200, error: 5 },
		{ label: '03:00', value: 11000, error: 4 },
		{ label: '04:00', value: 13500, error: 6 },
		{ label: '05:00', value: 22000, error: 10 },
		{ label: '06:00', value: 38000, error: 18 },
		{ label: '07:00', value: 58000, error: 28 },
		{ label: '08:00', value: 82000, error: 45 },
		{ label: '09:00', value: 104000, error: 62 },
		{ label: '10:00', value: 118000, error: 70 },
		{ label: '11:00', value: 124500, error: 84 },
		{ label: '12:00', value: 115000, error: 55 },
		{ label: '13:00', value: 122000, error: 68 },
		{ label: '14:00', value: 138000, error: 91 },
		{ label: '15:00', value: 142500, error: 95 },
		{ label: '16:00', value: 136000, error: 82 },
		{ label: '17:00', value: 128000, error: 74 },
		{ label: '18:00', value: 119000, error: 63 },
		{ label: '19:00', value: 112000, error: 58 },
		{ label: '20:00', value: 98000, error: 48 },
		{ label: '21:00', value: 84000, error: 39 },
		{ label: '22:00', value: 62000, error: 26 },
		{ label: '23:00', value: 41000, error: 19 }
	];

	const activeData = $derived(data24h);
	const maxValue = $derived(Math.max(...activeData.map((d) => d.value)));
	const maxError = $derived(Math.max(...activeData.map((d) => d.error)));
	const totalRequests = $derived(
		activeData.reduce((acc, curr) => acc + curr.value, 0)
	);
	const totalErrors = $derived(
		activeData.reduce((acc, curr) => acc + curr.error, 0)
	);
	const totalSuccess = $derived(totalRequests - totalErrors);

	const width = 800;
	const height = 220;
	const padding = { top: 20, right: 20, bottom: 30, left: 20 };

	const chartW = width - padding.left - padding.right;
	const chartH = height - padding.top - padding.bottom;

	// Green Success points
	const successPoints = $derived(
		activeData.map((d, i) => {
			const x = padding.left + (i / (activeData.length - 1)) * chartW;
			const successVal = d.value - d.error;
			const y = padding.top + chartH - (successVal / (maxValue * 1.1)) * chartH;
			return { x, y, data: d, successVal };
		})
	);

	// Red Error points (scaled on lower 30% of chart for clear visibility)
	const errorPoints = $derived(
		activeData.map((d, i) => {
			const x = padding.left + (i / (activeData.length - 1)) * chartW;
			const y = padding.top + chartH - (d.error / (maxError * 1.25)) * (chartH * 0.32);
			return { x, y, errorVal: d.error };
		})
	);

	// Helper for Bezier curve path
	function createSmoothPath(pts: { x: number; y: number }[]) {
		if (pts.length === 0) return '';
		return pts.reduce((acc, point, i, arr) => {
			if (i === 0) return `M ${point.x},${point.y}`;
			const prev = arr[i - 1];
			const cx1 = prev.x + (point.x - prev.x) / 2;
			const cy1 = prev.y;
			const cx2 = prev.x + (point.x - prev.x) / 2;
			const cy2 = point.y;
			return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${point.x},${point.y}`;
		}, '');
	}

	const pathSuccessD = $derived.by(() => createSmoothPath(successPoints));
	const pathErrorD = $derived.by(() => createSmoothPath(errorPoints));

	const areaSuccessD = $derived.by(() => {
		if (successPoints.length === 0) return '';
		const first = successPoints[0];
		const last = successPoints[successPoints.length - 1];
		const baseLine = height - padding.bottom;
		return `${pathSuccessD} L ${last.x},${baseLine} L ${first.x},${baseLine} Z`;
	});

	const areaErrorD = $derived.by(() => {
		if (errorPoints.length === 0) return '';
		const first = errorPoints[0];
		const last = errorPoints[errorPoints.length - 1];
		const baseLine = height - padding.bottom;
		return `${pathErrorD} L ${last.x},${baseLine} L ${first.x},${baseLine} Z`;
	});
</script>

<div class="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs">
	<!-- Chart Header & Timeframe Switcher & Legend -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
		<div>
			<div class="flex items-center gap-2">
				<h3 class="text-sm font-bold text-foreground">Lưu lượng Yêu cầu API (Throughput)</h3>
				<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
					<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
					Live Edge Stream
				</span>
			</div>
			<div class="flex flex-wrap items-center gap-3 text-xs mt-1">
				<span class="flex items-center gap-1.5 font-medium text-emerald-500">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					<span>Thành công: <strong>{totalSuccess.toLocaleString('vi-VN')}</strong> (99.98%)</span>
				</span>
				<span class="text-muted-foreground/40">•</span>
				<span class="flex items-center gap-1.5 font-medium text-rose-500">
					<span class="h-2 w-2 rounded-full bg-rose-500"></span>
					<span>Yêu cầu lỗi: <strong>{totalErrors.toLocaleString('vi-VN')}</strong> (0.02%)</span>
				</span>
			</div>
		</div>

		<!-- Timeframe tabs -->
		<div class="inline-flex items-center rounded-xl border border-border/60 bg-secondary/40 p-1 text-xs">
			<button
				type="button"
				onclick={() => (timeframe = '24h')}
				class="rounded-lg px-2.5 py-1 font-semibold transition-all {timeframe === '24h' ? 'bg-card text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'}"
			>
				24 Giờ qua
			</button>
			<button
				type="button"
				onclick={() => (timeframe = '7d')}
				class="rounded-lg px-2.5 py-1 font-semibold transition-all {timeframe === '7d' ? 'bg-card text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'}"
			>
				7 Ngày
			</button>
			<button
				type="button"
				onclick={() => (timeframe = '30d')}
				class="rounded-lg px-2.5 py-1 font-semibold transition-all {timeframe === '30d' ? 'bg-card text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'}"
			>
				30 Ngày
			</button>
		</div>
	</div>

	<!-- Interactive Chart SVG -->
	<div class="relative w-full overflow-hidden">
		<svg
			viewBox="0 0 {width} {height}"
			class="w-full h-48 sm:h-56 overflow-visible select-none"
			preserveAspectRatio="none"
		>
			<defs>
				<!-- Green gradient for success -->
				<linearGradient id="successTrafficGradient" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#10b981" stop-opacity="0.28" />
					<stop offset="70%" stop-color="#10b981" stop-opacity="0.05" />
					<stop offset="100%" stop-color="#10b981" stop-opacity="0" />
				</linearGradient>
				<!-- Red gradient for errors -->
				<linearGradient id="errorTrafficGradient" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#ef4444" stop-opacity="0.25" />
					<stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
				</linearGradient>
			</defs>

			<!-- Horizontal Grid lines -->
			{#each [0.25, 0.5, 0.75, 1.0] as ratio}
				{@const y = padding.top + chartH - ratio * chartH}
				<line
					x1={padding.left}
					y1={y}
					x2={width - padding.right}
					y2={y}
					stroke="currentColor"
					stroke-opacity="0.08"
					stroke-dasharray="3 3"
				/>
			{/each}

			<!-- Success Area & Line (Green) -->
			<path d={areaSuccessD} fill="url(#successTrafficGradient)" />
			<path
				d={pathSuccessD}
				fill="none"
				stroke="#10b981"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>

			<!-- Error Area & Line (Red) -->
			<path d={areaErrorD} fill="url(#errorTrafficGradient)" />
			<path
				d={pathErrorD}
				fill="none"
				stroke="#ef4444"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>

			<!-- Hover Target & Dots -->
			{#each successPoints as point, idx}
				{@const errPoint = errorPoints[idx]}
				{@const isHovered = hoveredIndex === idx}
				<!-- Invisible interaction hit area -->
				<rect
					x={point.x - (chartW / successPoints.length) / 2}
					y="0"
					width={chartW / successPoints.length}
					height={height}
					fill="transparent"
					class="cursor-crosshair"
					aria-hidden="true"
					tabindex="-1"
					onmouseenter={() => (hoveredIndex = idx)}
					onmouseleave={() => (hoveredIndex = null)}
				/>

				{#if isHovered}
					<!-- Vertical Crosshair line -->
					<line
						x1={point.x}
						y1={padding.top}
						x2={point.x}
						y2={height - padding.bottom}
						stroke="#10b981"
						stroke-width="1.5"
						stroke-dasharray="2 2"
					/>
					<!-- Success Glow Dot (Green) -->
					<circle cx={point.x} cy={point.y} r="5" fill="#10b981" class="animate-ping opacity-60" />
					<circle cx={point.x} cy={point.y} r="4" fill="#ffffff" stroke="#10b981" stroke-width="2.5" />

					<!-- Error Dot (Red) -->
					<circle cx={errPoint.x} cy={errPoint.y} r="4" fill="#ffffff" stroke="#ef4444" stroke-width="2.5" />
				{/if}
			{/each}
		</svg>

		<!-- Tooltip floating overlay -->
		{#if hoveredIndex !== null}
			{@const p = successPoints[hoveredIndex]}
			{@const err = errorPoints[hoveredIndex]}
			<div
				class="pointer-events-none absolute z-20 rounded-xl border border-border bg-popover/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md transition-all duration-75"
				style="left: {Math.min(85, Math.max(15, (p.x / width) * 100))}%; top: 12px; transform: translateX(-50%);"
			>
				<p class="font-semibold text-foreground">{p.data.label}</p>
				<div class="mt-1 flex flex-col gap-1">
					<div class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
						<span class="text-emerald-500 font-bold">{p.successVal.toLocaleString('vi-VN')} reqs thành công</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
						<span class="text-rose-500 font-bold">{err.errorVal} reqs lỗi</span>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Bottom Timeline Labels -->
	<div class="mt-2 flex items-center justify-between text-[11px] text-muted-foreground px-1">
		<span>00:00</span>
		<span>06:00</span>
		<span>12:00 (Trưa)</span>
		<span>18:00</span>
		<span>23:00 (Hiện tại)</span>
	</div>
</div>

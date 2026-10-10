<script lang="ts">
	import {
		IconDeviceMobile,
		IconMail,
		IconWebhook,
		IconMessage2,
		IconCheck,
		IconArrowUpRight
	} from '@tabler/icons-svelte-runes';

	let hoveredHour = $state<number | null>(null);

	const channelStats = [
		{
			name: 'APNs & FCM Push',
			count: '79,680',
			pct: 64,
			color: 'text-amber-500',
			hexColor: '#f59e0b',
			icon: IconDeviceMobile,
			successRate: '99.9%'
		},
		{
			name: 'Transactional Email',
			count: '29,880',
			pct: 24,
			color: 'text-blue-500',
			hexColor: '#3b82f6',
			icon: IconMail,
			successRate: '99.7%'
		},
		{
			name: 'Webhooks HMAC',
			count: '12,450',
			pct: 10,
			color: 'text-violet-500',
			hexColor: '#8b5cf6',
			icon: IconWebhook,
			successRate: '99.8%'
		},
		{
			name: 'SMS OTP Direct',
			count: '2,490',
			pct: 2,
			color: 'text-emerald-500',
			hexColor: '#10b981',
			icon: IconMessage2,
			successRate: '100%'
		}
	];

	// Hourly dispatch volume across 12 hours
	const hourlyDispatches = [
		{ time: '12:00', push: 5200, email: 1900, webhook: 800, sms: 160 },
		{ time: '13:00', push: 5800, email: 2100, webhook: 900, sms: 180 },
		{ time: '14:00', push: 7400, email: 2700, webhook: 1100, sms: 220 },
		{ time: '15:00', push: 8800, email: 3200, webhook: 1350, sms: 280 },
		{ time: '16:00', push: 8200, email: 3000, webhook: 1280, sms: 250 },
		{ time: '17:00', push: 7600, email: 2800, webhook: 1190, sms: 240 },
		{ time: '18:00', push: 7100, email: 2600, webhook: 1100, sms: 210 },
		{ time: '19:00', push: 6400, email: 2300, webhook: 1020, sms: 200 },
		{ time: '20:00', push: 5900, email: 2150, webhook: 920, sms: 180 },
		{ time: '21:00', push: 5300, email: 1950, webhook: 830, sms: 170 },
		{ time: '22:00', push: 4600, email: 1700, webhook: 730, sms: 150 },
		{ time: '23:00', push: 4180, email: 1480, webhook: 830, sms: 150 }
	];

	const maxHourTotal = 15000;
	const svgWidth = 520;
	const svgHeight = 150;
	const pad = { top: 25, bottom: 25, left: 32, right: 15 };
	const plotW = svgWidth - pad.left - pad.right;
	const plotH = svgHeight - pad.top - pad.bottom;
</script>

<div class="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
	<div>
		<!-- Header -->
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
			<div>
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-bold text-foreground">Đường Ống Thông Báo (Notification Pipeline)</h3>
					<span class="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-500">
						Dispatch Queue 0ms
					</span>
				</div>
				<p class="text-xs text-muted-foreground mt-0.5">
					Tổng <strong class="text-foreground">124,500</strong> tin nhắn phát trong tháng • Tỷ lệ phát thành công 99.8%
				</p>
			</div>

			<a
				href="/notifications"
				class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
			>
				<span>Chi tiết</span>
				<IconArrowUpRight size={14} />
			</a>
		</div>

		<!-- Segmented Multi-channel Distribution Pipeline Bar -->
		<div class="space-y-1.5 mb-4">
			<div class="flex h-2.5 w-full overflow-hidden rounded-full bg-secondary/80 gap-1 p-0.5">
				{#each channelStats as ch}
					<div
						class="rounded-sm transition-all duration-500"
						style="width: {ch.pct}%; background-color: {ch.hexColor};"
						title="{ch.name}: {ch.pct}%"
					></div>
				{/each}
			</div>
			<div class="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground px-0.5">
				<span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Push 64%</span>
				<span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Email 24%</span>
				<span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-violet-500"></span> Webhooks 10%</span>
				<span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SMS 2%</span>
			</div>
		</div>

		<!-- Stacked Column Chart for Hourly Dispatch Throughput -->
		<div class="relative w-full overflow-hidden">
			<svg
				viewBox="0 0 {svgWidth} {svgHeight}"
				class="w-full h-44 select-none overflow-visible"
				preserveAspectRatio="none"
			>
				<!-- Reference Gridlines -->
				{#each [0.33, 0.66, 1.0] as ratio}
					{@const y = pad.top + plotH - ratio * plotH}
					{@const refVal = `${Math.round((ratio * maxHourTotal) / 1000)}k`}
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
						{refVal}
					</text>
				{/each}

				<!-- Base Axis -->
				<line
					x1={pad.left}
					y1={pad.top + plotH}
					x2={svgWidth - pad.right}
					y2={pad.top + plotH}
					stroke="currentColor"
					stroke-opacity="0.2"
				/>

				<!-- Hourly Stacked Columns -->
				{#each hourlyDispatches as d, i}
					{@const colW = plotW / hourlyDispatches.length}
					{@const barW = Math.min(22, colW * 0.72)}
					{@const x = pad.left + i * colW + (colW - barW) / 2}
					{@const total = d.push + d.email + d.webhook + d.sms}

					{@const hPush = (d.push / maxHourTotal) * plotH}
					{@const hEmail = (d.email / maxHourTotal) * plotH}
					{@const hHook = (d.webhook / maxHourTotal) * plotH}
					{@const hSms = (d.sms / maxHourTotal) * plotH}
					{@const totalH = hPush + hEmail + hHook + hSms}

					{@const yBase = pad.top + plotH}
					{@const yPush = yBase - hPush}
					{@const yEmail = yPush - hEmail}
					{@const yHook = yEmail - hHook}
					{@const ySms = yHook - hSms}

					{@const isHovered = hoveredHour === i}

					<!-- Hitbox -->
					<rect
						x={pad.left + i * colW}
						y={pad.top}
						width={colW}
						height={plotH}
						fill="transparent"
						class="cursor-pointer"
						role="graphics-symbol"
						tabindex="-1"
						onmouseenter={() => (hoveredHour = i)}
						onmouseleave={() => (hoveredHour = null)}
					/>

					<!-- Stacked Segments -->
					<!-- Push -->
					<rect
						{x}
						y={yPush}
						width={barW}
						height={hPush}
						fill="#f59e0b"
						opacity={isHovered ? 1 : 0.85}
						class="pointer-events-none transition-all"
					/>
					<!-- Email -->
					<rect
						{x}
						y={yEmail}
						width={barW}
						height={hEmail}
						fill="#3b82f6"
						opacity={isHovered ? 1 : 0.85}
						class="pointer-events-none transition-all"
					/>
					<!-- Webhook -->
					<rect
						{x}
						y={yHook}
						width={barW}
						height={hHook}
						fill="#8b5cf6"
						opacity={isHovered ? 1 : 0.85}
						class="pointer-events-none transition-all"
					/>
					<!-- SMS (Top cap rounded) -->
					<rect
						{x}
						y={ySms}
						width={barW}
						height={hSms}
						rx="3"
						ry="3"
						fill="#10b981"
						opacity={isHovered ? 1 : 0.85}
						class="pointer-events-none transition-all"
					/>

					<!-- Number on top of column -->
					<text
						x={x + barW / 2}
						y={ySms - 4}
						text-anchor="middle"
						font-size="8"
						font-weight="bold"
						fill="currentColor"
						class="{isHovered ? 'text-foreground' : 'text-muted-foreground/75'} font-mono"
					>
						{(total / 1000).toFixed(1)}k
					</text>

					<!-- Time label -->
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

			<!-- Hover Tooltip -->
			{#each hourlyDispatches as d, i}
				{#if hoveredHour === i}
					{@const total = d.push + d.email + d.webhook + d.sms}
					<div
						class="pointer-events-none absolute z-20 rounded-xl border border-border bg-popover/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md transition-all duration-75"
						style="left: {Math.min(80, Math.max(20, (i / (hourlyDispatches.length - 1)) * 100))}%; top: 4px; transform: translateX(-50%);"
					>
						<p class="font-bold text-foreground">{d.time}: {total.toLocaleString('vi-VN')} tin</p>
						<div class="mt-1 flex flex-col gap-0.5 text-[11px] font-mono">
							<span class="text-amber-500">APNs/FCM: {d.push.toLocaleString('vi-VN')}</span>
							<span class="text-blue-500">Email: {d.email.toLocaleString('vi-VN')}</span>
							<span class="text-violet-500">Webhooks: {d.webhook.toLocaleString('vi-VN')}</span>
							<span class="text-emerald-500">SMS: {d.sms.toLocaleString('vi-VN')}</span>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Channel Comparison Cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
			{#each channelStats as ch}
				<div class="flex flex-col gap-2 rounded-xl bg-secondary/30 p-3 border border-border/40">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2.5">
							<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-card border border-border/60 {ch.color}">
								<ch.icon size={16} stroke={2} />
							</div>
							<div>
								<div class="font-semibold text-xs text-foreground">{ch.name}</div>
								<div class="text-[11px] text-muted-foreground">{ch.count} tin</div>
							</div>
						</div>
						<span class="rounded bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-foreground">
							{ch.pct}%
						</span>
					</div>

					<!-- Visual Comparison Bar -->
					<div class="h-1.5 w-full rounded-full bg-secondary/80 overflow-hidden">
						<div
							class="h-full rounded-full transition-all duration-500"
							style="width: {ch.pct}%; background-color: {ch.hexColor};"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Status Footer -->
	<div class="mt-5 pt-4 border-t border-border/50 flex items-center justify-between text-xs">
		<div class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
			<span class="text-muted-foreground">Redis BullMQ Workers: <strong class="text-foreground">8 active</strong></span>
		</div>
		<span class="text-emerald-500 font-semibold flex items-center gap-1">
			<IconCheck size={14} stroke={2.5} />
			Không có tắc nghẽn (0ms queue delay)
		</span>
	</div>
</div>

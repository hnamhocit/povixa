<script lang="ts">
	import {
		IconFingerprint,
		IconBrandGoogle,
		IconBrandFacebook,
		IconBrandGithub,
		IconBrandDiscord,
		IconShieldCheck,
		IconUsers,
		IconArrowUpRight
	} from '@tabler/icons-svelte-runes';

	let hoveredName = $state<string | null>(null);

	const oauthChannels = [
		{
			name: 'Google',
			share: 54,
			users: 9946,
			hexColor: '#ea4335',
			textColor: 'text-red-500',
			icon: IconBrandGoogle,
			iconColor: 'text-red-500'
		},
		{
			name: 'Facebook',
			share: 26,
			users: 4789,
			hexColor: '#1877f2',
			textColor: 'text-blue-500',
			icon: IconBrandFacebook,
			iconColor: 'text-blue-600'
		},
		{
			name: 'GitHub',
			share: 14,
			users: 2578,
			hexColor: '#64748b',
			textColor: 'text-slate-400',
			icon: IconBrandGithub,
			iconColor: 'text-foreground'
		},
		{
			name: 'Discord',
			share: 6,
			users: 1107,
			hexColor: '#5865f2',
			textColor: 'text-indigo-400',
			icon: IconBrandDiscord,
			iconColor: 'text-indigo-500'
		}
	];

	// Polar coordinate conversion helper
	function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: cx + radius * Math.cos(angleInRadians),
			y: cy + radius * Math.sin(angleInRadians)
		};
	}

	// SVG Donut Path helper
	function describeDonutArc(
		cx: number,
		cy: number,
		innerR: number,
		outerR: number,
		startAngle: number,
		endAngle: number
	) {
		const p1 = polarToCartesian(cx, cy, outerR, startAngle);
		const p2 = polarToCartesian(cx, cy, outerR, endAngle);
		const p3 = polarToCartesian(cx, cy, innerR, endAngle);
		const p4 = polarToCartesian(cx, cy, innerR, startAngle);

		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

		return [
			'M', p1.x, p1.y,
			'A', outerR, outerR, 0, largeArcFlag, 1, p2.x, p2.y,
			'L', p3.x, p3.y,
			'A', innerR, innerR, 0, largeArcFlag, 0, p4.x, p4.y,
			'Z'
		].join(' ');
	}

	// Calculate slice angles
	let cumulativeShare = 0;
	const slices = oauthChannels.map((ch) => {
		const startAngle = (cumulativeShare / 100) * 360;
		cumulativeShare += ch.share;
		const endAngle = (cumulativeShare / 100) * 360;
		return {
			...ch,
			startAngle,
			endAngle
		};
	});

	const activeChannel = $derived(
		oauthChannels.find((ch) => ch.name === hoveredName) || null
	);
</script>

<div class="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
	<div>
		<!-- Card Header -->
		<div class="flex items-center justify-between mb-3">
			<div>
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-bold text-foreground">Xác Thực & Người Dùng Dự Án (Auth Module)</h3>
					<span class="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-500">
						SSO Multi-channel
					</span>
				</div>
				<p class="text-xs text-muted-foreground mt-0.5">
					Tổng hợp 18,420 End-Users đã đăng nhập vào Dự án qua OAuth & WebAuthn
				</p>
			</div>

			<a
				href="/auth"
				class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
			>
				<span>Chi tiết</span>
				<IconArrowUpRight size={14} />
			</a>
		</div>

		<!-- Interactive Donut / Pie Chart & Legend Grid -->
		<div class="mt-4 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
			<!-- SVG Donut Chart -->
			<div class="relative shrink-0 flex items-center justify-center">
				<svg viewBox="0 0 200 200" class="w-40 h-40 sm:w-44 sm:h-44 select-none">
					{#each slices as slice}
						{@const isHovered = hoveredName === slice.name}
						{@const gap = 2}
						{@const sAngle = slice.startAngle + gap / 2}
						{@const eAngle = slice.endAngle - gap / 2}
						{@const innerR = 56}
						{@const outerR = isHovered ? 90 : 83}
						{@const d = describeDonutArc(100, 100, innerR, outerR, sAngle, eAngle)}

						<path
							{d}
							fill={slice.hexColor}
							class="cursor-pointer transition-all duration-200"
							opacity={hoveredName && !isHovered ? 0.45 : 1}
							onmouseenter={() => (hoveredName = slice.name)}
							onmouseleave={() => (hoveredName = null)}
							role="graphics-symbol"
							tabindex="-1"
						/>
					{/each}
				</svg>

				<!-- Center Hole Content -->
				<div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
					{#if activeChannel}
						<span class="text-xs font-bold {activeChannel.textColor}">{activeChannel.name}</span>
						<span class="text-base font-bold text-foreground font-mono">{activeChannel.share}%</span>
						<span class="text-[9px] text-muted-foreground">{activeChannel.users.toLocaleString('vi-VN')} users</span>
					{:else}
						<span class="text-base font-extrabold text-foreground font-sans tracking-tight">18.420</span>
						<span class="text-[10px] text-muted-foreground">End-Users</span>
						<span class="text-[9px] text-primary font-medium">SSO 4 Kênh</span>
					{/if}
				</div>
			</div>

			<!-- Channel Legend Grid -->
			<div class="grid grid-cols-2 gap-2.5 flex-1 w-full">
				{#each oauthChannels as ch}
					{@const isHovered = hoveredName === ch.name}
					<button
						type="button"
						onmouseenter={() => (hoveredName = ch.name)}
						onmouseleave={() => (hoveredName = null)}
						class="flex flex-col p-2.5 rounded-xl border transition-all text-left cursor-pointer {isHovered ? 'border-primary/60 bg-secondary/80 shadow-xs scale-[1.02]' : 'border-border/50 bg-secondary/25 hover:border-border hover:bg-secondary/45'}"
					>
						<div class="flex items-center justify-between mb-1">
							<div class="flex items-center gap-1.5">
								<ch.icon size={15} class={ch.iconColor} />
								<span class="text-xs font-semibold text-foreground">{ch.name}</span>
							</div>
							<span class="h-2 w-2 rounded-full" style="background-color: {ch.hexColor}"></span>
						</div>
						<div class="flex items-baseline justify-between mt-0.5">
							<span class="text-sm font-bold text-foreground font-sans">{ch.share}%</span>
							<span class="text-[10px] text-muted-foreground font-mono">{ch.users.toLocaleString('vi-VN')}</span>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom Security Highlights -->
	<div class="mt-5 pt-4 border-t border-border/50 grid grid-cols-2 gap-3 text-xs">
		<div class="flex items-center gap-2.5 rounded-xl bg-secondary/30 p-2.5 border border-border/40">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
				<IconShieldCheck size={18} stroke={2.5} />
			</div>
			<div>
				<div class="font-bold text-foreground">94.2%</div>
				<span class="text-[10px] text-muted-foreground">FIDO2 WebAuthn / Passkeys</span>
			</div>
		</div>

		<div class="flex items-center gap-2.5 rounded-xl bg-secondary/30 p-2.5 border border-border/40">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
				<IconUsers size={18} stroke={2.5} />
			</div>
			<div>
				<div class="font-bold text-foreground">420 Phiên</div>
				<span class="text-[10px] text-muted-foreground">Active JWT Refresh Tokens</span>
			</div>
		</div>
	</div>
</div>

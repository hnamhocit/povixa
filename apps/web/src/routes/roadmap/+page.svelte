<script lang="ts">
	import {
		IconCompass,
		IconCircleCheckFilled,
		IconClockHour4,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const milestones = [
		{
			quarter: 'Q1 2026',
			status: 'Đã hoàn thành',
			statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
			icon: IconCircleCheckFilled,
			title: 'Nền tảng Cốt lõi & Cổng định danh Povixa ID',
			items: [
				'Phát hành Povixa Web & kiến trúc Monorepo hiệu năng cao.',
				'Cổng định danh Povixa ID với SSO, Social Auth và Passkeys.',
				'Hệ thống quản lý chủ đề ánh sáng/bóng tối linh hoạt.'
			]
		},
		{
			quarter: 'Q2 2026',
			status: 'Đang triển khai',
			statusColor: 'text-primary bg-primary/10 border-primary/30',
			icon: IconClockHour4,
			title: 'Remote Config & Notifications Engine',
			items: [
				'Ra mắt Remote Config với cơ chế chuyển mạch cờ theo thời gian thực tại Edge.',
				'Phát hành Notifications Engine cho Web Push và ứng dụng di động.',
				'Công cụ dòng lệnh Povixa CLI cho trải nghiệm lập trình cục bộ.'
			]
		},
		{
			quarter: 'Q3 2026',
			status: 'Kế hoạch',
			statusColor: 'text-muted-foreground bg-muted border-border',
			icon: IconCompass,
			title: 'Privacy Analytics & S3 Storage Engine',
			items: [
				'Thu thập số liệu người dùng tôn trọng quyền riêng tư (Zero third-party cookie).',
				'Lưu trữ tệp S3-compatible không tính phí băng thông tải ra (Zero egress fee).',
				'Tích hợp gói phân phối thư viện cho Go, Python và Rust.'
			]
		},
		{
			quarter: 'Q4 2026',
			status: 'Tầm nhìn tương lai',
			statusColor: 'text-muted-foreground bg-muted border-border',
			icon: IconSparkles,
			title: 'Toàn diện Khả năng Quan sát & Mạng lưới Lưới phân tán',
			items: [
				'Observability APM tích hợp sẵn chuẩn OpenTelemetry Native.',
				'Triển khai cụm phân tán đa vùng (Multi-region Active-Active Mesh).',
				'Mở rộng chợ tiện ích mở rộng (Extension Ecosystem).'
			]
		}
	];
</script>

<svelte:head>
	<title>{m.footer_roadmap()} — Povixa Product Roadmap</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconCompass size={14} />
			<span>Định hướng phát triển</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_roadmap()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Chiến lược dài hạn và các cột mốc công nghệ nhằm mang lại quyền tự do tối đa cho nhà phát
			triển.
		</p>
	</div>

	<div class="mt-16 space-y-8">
		{#each milestones as mile (mile.quarter)}
			{@const Icon = mile.icon}
			<div
				class="relative rounded-3xl border border-border/80 bg-card/50 p-6 shadow-xs backdrop-blur-sm sm:p-8"
			>
				<div
					class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4"
				>
					<div class="flex items-center gap-2.5">
						<span class="font-mono text-lg font-bold text-foreground">{mile.quarter}</span>
						<span
							class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold {mile.statusColor}"
						>
							<Icon size={13} />
							<span>{mile.status}</span>
						</span>
					</div>
				</div>

				<h2 class="mt-4 text-lg font-bold text-foreground">{mile.title}</h2>

				<ul class="mt-4 space-y-2">
					{#each mile.items as item, i (i)}
						<li class="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
							<span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

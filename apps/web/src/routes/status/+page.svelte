<script lang="ts">
	import {
		IconCheck,
		IconActivity,
		IconServer,
		IconWorld,
		IconDatabase,
		IconBell
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const services = [
		{
			name: 'Povixa ID & Xác thực SSO',
			uptime: '99.99%',
			status: 'Hoạt động bình thường',
			icon: IconServer
		},
		{
			name: 'Mạng biên toàn cầu (Edge CDN)',
			uptime: '100.0%',
			status: 'Hoạt động bình thường',
			icon: IconWorld
		},
		{
			name: 'Cổng kết nối API Gateway',
			uptime: '99.98%',
			status: 'Hoạt động bình thường',
			icon: IconActivity
		},
		{
			name: 'Động cơ Lưu trữ Storage S3',
			uptime: '99.99%',
			status: 'Hoạt động bình thường',
			icon: IconDatabase
		},
		{
			name: 'Dịch vụ Thông báo & Webhooks',
			uptime: '99.97%',
			status: 'Hoạt động bình thường',
			icon: IconBell
		}
	];
</script>

<svelte:head>
	<title>{m.footer_status()} — Povixa System Status</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<!-- Hero Status Banner -->
	<div
		class="flex flex-col items-center justify-between gap-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center shadow-xs backdrop-blur-sm sm:flex-row sm:text-left"
	>
		<div class="flex items-center gap-4">
			<div
				class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
			>
				<IconCheck size={28} stroke={3} />
			</div>
			<div>
				<h1 class="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
					{m.footer_status_ok()}
				</h1>
				<p class="mt-1 text-xs text-muted-foreground sm:text-sm">
					Tất cả cụm dịch vụ và hạ tầng phụ trợ đều đang vận hành ở trạng thái tối ưu.
				</p>
			</div>
		</div>
		<div
			class="rounded-xl border border-border/80 bg-background/80 px-4 py-2 text-center backdrop-blur-sm"
		>
			<p class="font-mono text-xs text-muted-foreground">Uptime 90 ngày qua</p>
			<p class="font-mono text-lg font-bold text-emerald-500">99.99%</p>
		</div>
	</div>

	<!-- Individual Component Status -->
	<div class="mt-12 space-y-4">
		<h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
			Chi tiết từng phân hệ dịch vụ
		</h2>
		<div class="space-y-3">
			{#each services as s (s.name)}
				{@const Icon = s.icon}
				<div
					class="flex items-center justify-between rounded-2xl border border-border/70 bg-card/50 p-4.5 backdrop-blur-sm transition-colors hover:border-primary/40"
				>
					<div class="flex items-center gap-3.5">
						<div
							class="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary"
						>
							<Icon size={18} />
						</div>
						<span class="text-sm font-semibold text-foreground">{s.name}</span>
					</div>
					<div class="flex items-center gap-4">
						<span class="hidden font-mono text-xs text-muted-foreground sm:inline">
							{s.uptime}
						</span>
						<span
							class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500"
						>
							<span class="size-1.5 rounded-full bg-emerald-500"></span>
							<span>{s.status}</span>
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Incident History Section -->
	<div class="mt-16 rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
		<h3 class="text-base font-bold text-foreground">Nhật ký sự cố gần đây</h3>
		<p class="mt-1 text-xs text-muted-foreground">
			Ghi nhận sự cố minh bạch và giải trình kỹ thuật (post-mortem).
		</p>
		<div class="mt-6 border-t border-border/60 pt-6">
			<div class="flex items-center justify-between text-xs text-muted-foreground">
				<span class="font-medium text-foreground">Không có sự cố nào trong 30 ngày qua</span>
				<span class="font-mono">100% Sẵn sàng</span>
			</div>
		</div>
	</div>
</section>

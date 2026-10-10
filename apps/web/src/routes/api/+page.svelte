<script lang="ts">
	import { IconCode, IconTerminal, IconShieldCheck, IconCpu } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const endpoints = [
		{
			method: 'POST',
			path: '/v1/auth/token',
			desc: 'Xác thực và cấp phát JWT token phiên làm việc.',
			color: 'text-blue-500 bg-blue-500/10 border-blue-500/30'
		},
		{
			method: 'GET',
			path: '/v1/config/evaluate',
			desc: 'Truy vấn cờ tính năng và cấu hình động tại Edge.',
			color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
		},
		{
			method: 'POST',
			path: '/v1/notifications/dispatch',
			desc: 'Gửi thông báo đẩy đến danh sách thiết bị hoặc nhóm người dùng.',
			color: 'text-blue-500 bg-blue-500/10 border-blue-500/30'
		},
		{
			method: 'POST',
			path: '/v1/analytics/events',
			desc: 'Ghi nhận sự kiện phân tích hành vi thời gian thực.',
			color: 'text-blue-500 bg-blue-500/10 border-blue-500/30'
		},
		{
			method: 'GET',
			path: '/v1/storage/upload-url',
			desc: 'Tạo pre-signed URL để tải lên tệp tin trực tiếp lên S3.',
			color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
		}
	];
</script>

<svelte:head>
	<title>{m.footer_api()} — Povixa REST API Reference</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconCode size={14} />
			<span>REST & GraphQL</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_api()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Đặc tả các endpoint REST chuẩn, hỗ trợ xác thực Bearer token và bảo vệ tỷ lệ truy cập (rate
			limit).
		</p>
	</div>

	<!-- Endpoint List -->
	<div class="mt-14 space-y-4">
		<h2 class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
			Các Endpoint Cốt lõi
		</h2>
		<div class="space-y-3">
			{#each endpoints as ep (ep.path)}
				<div
					class="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
				>
					<div class="flex items-center gap-3">
						<span class="rounded-lg border px-2.5 py-1 font-mono text-xs font-bold {ep.color}">
							{ep.method}
						</span>
						<span class="font-mono text-sm font-semibold text-foreground">{ep.path}</span>
					</div>
					<p class="text-xs text-muted-foreground sm:text-right">{ep.desc}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Code Example -->
	<div class="mt-12 rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-sm">
		<h3 class="text-sm font-bold text-foreground">Ví dụ gọi API bằng cURL</h3>
		<pre
			class="mt-3 overflow-x-auto rounded-xl bg-background/90 p-4 font-mono text-xs text-muted-foreground"><code
				>curl -X GET "https://api.povixa.cloud/v1/config/evaluate" \
  -H "Authorization: Bearer povixa_live_sec_key" \
  -H "Content-Type: application/json"</code
			></pre>
	</div>
</section>

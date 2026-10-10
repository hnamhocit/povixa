<script lang="ts">
	import { IconTerminal, IconCheck, IconCopy } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const commands = [
		{
			cmd: 'povixa init',
			desc: 'Khởi tạo file cấu hình povixa.json và thiết lập kết nối dự án.'
		},
		{
			cmd: 'povixa dev',
			desc: 'Khởi chạy server giả lập cục bộ (Local Mock Server) không cần internet.'
		},
		{
			cmd: 'povixa config pull',
			desc: 'Tải về định nghĩa cờ tính năng và tạo TypeScript types tự động.'
		},
		{
			cmd: 'povixa deploy',
			desc: 'Đồng bộ hóa cấu hình và biến môi trường lên môi trường Production.'
		}
	];
</script>

<svelte:head>
	<title>{m.footer_cli()} — Povixa CLI Tool</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconTerminal size={14} />
			<span>Command Line Interface</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_cli()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Công cụ dòng lệnh mạnh mẽ giúp tối ưu hóa chu kỳ phát triển ứng dụng từ máy tính cục bộ.
		</p>
	</div>

	<!-- Installation -->
	<div class="mt-12 rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-sm">
		<h2 class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
			Cài đặt toàn cục
		</h2>
		<div class="mt-3 rounded-xl bg-background/90 p-4 font-mono text-sm text-primary">
			<code>npm install -g @povixa/cli</code>
		</div>
	</div>

	<!-- Command Reference -->
	<div class="mt-10 space-y-4">
		<h2 class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
			Các Lệnh Thường Dùng
		</h2>
		<div class="space-y-3">
			{#each commands as c (c.cmd)}
				<div class="rounded-2xl border border-border/70 bg-card/50 p-4.5 backdrop-blur-sm">
					<div class="font-mono text-sm font-bold text-foreground">
						<code>{c.cmd}</code>
					</div>
					<p class="mt-1.5 text-xs text-muted-foreground">{c.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

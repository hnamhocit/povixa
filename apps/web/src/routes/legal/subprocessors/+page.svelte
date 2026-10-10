<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const subprocessors = [
		{
			name: 'Cloudflare, Inc.',
			service: 'Mạng phân phối nội dung (CDN), tường lửa DDoS & Edge Caching',
			country: 'Hoa Kỳ / Toàn cầu'
		},
		{
			name: 'Hetzner Online GmbH',
			service: 'Hạ tầng máy chủ chuyên dụng & cụm cơ sở dữ liệu phân tán',
			country: 'Đức / Phần Lan (EU)'
		},
		{
			name: 'Resend / Postmark',
			service: 'Hạ tầng gửi email giao dịch và mã xác thực OTP',
			country: 'Hoa Kỳ'
		}
	];
</script>

<svelte:head>
	<title>{m.footer_subprocessors()} — Povixa Legal</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="mb-8">
		<a
			href="/legal"
			class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			<IconArrowLeft size={14} />
			<span>Quay lại trung tâm pháp lý</span>
		</a>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
			{m.footer_subprocessors()}
		</h1>
		<p class="mt-2 text-xs text-muted-foreground sm:text-sm">
			Danh sách các nhà cung cấp bên thứ ba tham gia xử lý dữ liệu hạ tầng
		</p>
	</div>

	<div class="space-y-4">
		{#each subprocessors as sub (sub.name)}
			<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm">
				<div class="flex flex-wrap items-center justify-between gap-2">
					<h2 class="text-base font-bold text-foreground">{sub.name}</h2>
					<span
						class="rounded-full border border-border bg-background/80 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
					>
						{sub.country}
					</span>
				</div>
				<p class="mt-2 text-xs text-muted-foreground">{sub.service}</p>
			</div>
		{/each}
	</div>
</section>

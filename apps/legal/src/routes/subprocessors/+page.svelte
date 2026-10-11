<script lang="ts">
	import {
		IconServer,
		IconPrinter,
		IconArrowLeft,
		IconExternalLink
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const subprocessors = [
		{
			entity: 'Hetzner Online GmbH',
			purpose: 'Hạ tầng máy chủ chuyên dụng, lưu trữ bare-metal và máy chủ cụm Châu Âu',
			location: 'Falkenstein & Nuremberg, Đức (EU)',
			certifications: 'ISO 27001'
		},
		{
			entity: 'Amazon Web Services, Inc. (AWS)',
			purpose: 'Dịch vụ lưu trữ đối tượng dự phòng S3 và chuyển phát email thông báo (Amazon SES)',
			location: 'Frankfurt (eu-central-1), Singapore (ap-southeast-1)',
			certifications: 'SOC 1/2/3, ISO 27001'
		},
		{
			entity: 'Stripe, Inc.',
			purpose: 'Xử lý thanh toán thẻ tín dụng, xuất hóa đơn tự động và quản lý chu kỳ thuê bao',
			location: 'Hoa Kỳ / Toàn cầu',
			certifications: 'PCI-DSS Level 1'
		},
		{
			entity: 'ClickHouse, Inc.',
			purpose: 'Hạ tầng cụm ClickHouse phân tán phục vụ phân tích dữ liệu telemetry quy mô lớn',
			location: 'Châu Âu & Bắc Mỹ',
			certifications: 'SOC 2 Type II'
		},
		{
			entity: 'Fly.io, Inc.',
			purpose: 'Mạng lưới Edge Routing phân tán phục vụ đánh giá cờ tính năng (Remote Config)',
			location: 'Toàn cầu (Anycast Edge)',
			certifications: 'SOC 2 Type II'
		},
		{
			entity: 'Resend, Inc.',
			purpose: 'Dịch vụ gửi email thông báo giao dịch và kích hoạt tài khoản Povixa ID',
			location: 'Hoa Kỳ (US-East)',
			certifications: 'SOC 2 Type II'
		}
	];

	function triggerPrint() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}
</script>

<svelte:head>
	<title>Danh sách Bên Xử lý Phụ (Subprocessors) — Povixa Legal</title>
	<meta name="description" content="Danh sách minh bạch các bên xử lý dữ liệu phụ, nhà cung cấp hạ tầng máy chủ của Povixa." />
</svelte:head>

<div class="mb-6 flex items-center justify-between border-b border-border/80 pb-4">
	<div class="flex items-center gap-2">
		<a href="/" class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
			<IconArrowLeft size={13} />
			<span>Về tổng quan</span>
		</a>
		<span class="text-muted-foreground">/</span>
		<span class="text-xs font-semibold text-foreground">Subprocessors</span>
	</div>

	<button
		type="button"
		onclick={triggerPrint}
		class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs"
	>
		<IconPrinter size={13} />
		<span>{m.btn_print()}</span>
	</button>
</div>

<div class="mb-8">
	<div class="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-primary mb-2">
		<IconServer size={13} />
		<span>INFRASTRUCTURE TRANSPARENCY</span>
	</div>
	<h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
		Danh sách Bên Xử lý Phụ (Subprocessors)
	</h1>
	<p class="mt-2 text-xs text-muted-foreground font-mono">
		{m.effective_date()}
	</p>
</div>

<article class="space-y-8 text-sm leading-relaxed text-muted-foreground">
	<section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4">
		<p>
			Để cung cấp dịch vụ hạ tầng đám mây Povixa Cloud với độ tin cậy và hiệu năng cao, Povixa hợp tác với một số bên thứ ba đã được kiểm toán bảo mật nghiêm ngặt. Dưới đây là danh sách đầy đủ và cập nhật nhất:
		</p>

		<div class="overflow-x-auto no-scrollbar">
			<table class="w-full text-left text-xs border border-border/80 rounded-xl overflow-hidden">
				<thead class="bg-muted text-foreground font-mono text-[11px]">
					<tr>
						<th class="p-3">Bên Xử lý Phụ</th>
						<th class="p-3">Nhiệm vụ &amp; Dịch vụ</th>
						<th class="p-3">Khu vực Dữ liệu</th>
						<th class="p-3">Chứng chỉ An ninh</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/60">
					{#each subprocessors as sub (sub.entity)}
						<tr class="hover:bg-muted/30">
							<td class="p-3 font-semibold text-foreground">{sub.entity}</td>
							<td class="p-3 text-muted-foreground">{sub.purpose}</td>
							<td class="p-3 font-mono text-[11px]">{sub.location}</td>
							<td class="p-3 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{sub.certifications}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</article>

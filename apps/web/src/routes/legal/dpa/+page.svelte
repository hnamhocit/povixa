<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.footer_dpa()} — Povixa Legal</title>
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
			{m.footer_dpa()}
		</h1>
		<p class="mt-2 text-xs text-muted-foreground sm:text-sm">
			Data Processing Addendum • Tuân thủ Quy định Bảo vệ Dữ liệu Chung Châu Âu (GDPR)
		</p>
	</div>

	<div class="space-y-6 text-sm leading-relaxed text-muted-foreground">
		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">1. Phạm vi & Mục đích</h2>
			<p class="mt-2">
				Phụ lục Xử lý Dữ liệu này áp dụng cho việc xử lý Dữ liệu Cá nhân do Khách hàng tải lên hoặc
				tạo ra thông qua việc sử dụng Dịch vụ Povixa Đám mây.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">2. Biện pháp An ninh Kỹ thuật</h2>
			<p class="mt-2">
				Povixa duy trì các biện pháp kỹ thuật và tổ chức nghiêm ngặt nhằm bảo vệ dữ liệu chống lại
				sự phá hủy bất hợp pháp, mất mát, thay đổi, tiết lộ trái phép hoặc truy cập trái phép.
			</p>
		</div>
	</div>
</section>

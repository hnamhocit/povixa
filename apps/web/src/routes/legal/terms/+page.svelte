<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.footer_terms()} — Povixa Legal</title>
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
			{m.footer_terms()}
		</h1>
		<p class="mt-2 text-xs text-muted-foreground sm:text-sm">
			Phiên bản 2.4 • Có hiệu lực từ ngày 01 Tháng 10, 2026
		</p>
	</div>

	<div class="space-y-6 text-sm leading-relaxed text-muted-foreground">
		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">1. Chấp thuận Điều khoản</h2>
			<p class="mt-2">
				Bằng cách truy cập hoặc sử dụng bất kỳ phần mềm, dịch vụ API, tài liệu hoặc nền tảng trực
				tuyến nào của Povixa, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều
				khoản dịch vụ này.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">
				2. Điều kiện Gói miễn phí (Powered by Povixa)
			</h2>
			<p class="mt-2">
				Các dự án sử dụng gói miễn phí cam kết hiển thị huy hiệu hoặc đường dẫn "Powered by Povixa"
				trên giao diện công khai của ứng dụng. Nếu bạn muốn gỡ bỏ huy hiệu, bạn có thể nâng cấp lên
				gói Pro hoặc tự lưu trữ (self-host) trên máy chủ riêng.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">3. Giới hạn Trách nhiệm</h2>
			<p class="mt-2">
				Nền tảng và các gói mã nguồn mở được cung cấp theo nguyên trạng ("AS IS"), không có bất kỳ
				sự bảo đảm nào dù được diễn đạt rõ ràng hay ngụ ý. Chúng tôi không chịu trách nhiệm đối với
				bất kỳ thiệt hại ngẫu nhiên hoặc gián tiếp nào phát sinh từ việc sử dụng phần mềm.
			</p>
		</div>
	</div>
</section>

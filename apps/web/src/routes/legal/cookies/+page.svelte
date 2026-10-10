<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.footer_cookies()} — Povixa Legal</title>
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
			{m.footer_cookies()}
		</h1>
		<p class="mt-2 text-xs text-muted-foreground sm:text-sm">
			Chính sách Cookie & Công nghệ lưu trữ trình duyệt cục bộ
		</p>
	</div>

	<div class="space-y-6 text-sm leading-relaxed text-muted-foreground">
		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">1. Triết lý Tối giản Cookie</h2>
			<p class="mt-2">
				Chúng tôi không sử dụng các cookie quảng cáo hành vi hoặc chia sẻ cookie với các sàn tiếp
				thị liên kết bên thứ ba.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">2. Cookie Thiết yếu</h2>
			<p class="mt-2">
				Các cookie duy nhất được sử dụng là cookie kỹ thuật bắt buộc để ghi nhớ trạng thái phiên
				đăng nhập (session token) và tùy chọn giao diện người dùng (chế độ sáng/tối và ngôn ngữ hiển
				thị).
			</p>
		</div>
	</div>
</section>

<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.footer_privacy()} — Povixa Legal</title>
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
			{m.footer_privacy()}
		</h1>
		<p class="mt-2 text-xs text-muted-foreground sm:text-sm">
			Phiên bản 2.4 • Cam kết bảo mật dữ liệu và quyền riêng tư cá nhân
		</p>
	</div>

	<div class="space-y-6 text-sm leading-relaxed text-muted-foreground">
		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">1. Thu thập dữ liệu</h2>
			<p class="mt-2">
				Povixa chỉ thu thập thông tin tài khoản cơ bản cần thiết cho việc vận hành dịch vụ (email,
				tên tài khoản, địa chỉ IP cho mục đích an ninh). Chúng tôi không cài đặt các pixel theo dõi
				quảng cáo của bên thứ ba.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">2. Bảo vệ & Mã hóa</h2>
			<p class="mt-2">
				Mọi dữ liệu nhạy cảm được mã hóa khi lưu trữ (AES-256) và khi truyền tải (TLS 1.3). Chúng
				tôi áp dụng kiến trúc cô lập tài nguyên cho từng tổ chức nhằm ngăn chặn rò rỉ chéo.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-base font-bold text-foreground">3. Quyền của bạn theo GDPR & CCPA</h2>
			<p class="mt-2">
				Bạn có quyền yêu cầu truy cập, sửa đổi, xuất khẩu hoặc xóa bỏ vĩnh viễn dữ liệu của bạn bất
				cứ lúc nào thông qua bảng điều khiển hoặc bằng cách gửi email tới privacy@povixa.cloud.
			</p>
		</div>
	</div>
</section>

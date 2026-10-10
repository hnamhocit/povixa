<script lang="ts">
	import { IconLock, IconArrowLeft } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.footer_privacy()} — Povixa ID</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
	<div class="mb-8">
		<a
			href="/"
			class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			<IconArrowLeft size={14} />
			<span>Quay lại trang tài khoản</span>
		</a>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
			{m.footer_privacy()}
		</h1>
		<p class="mt-2 text-sm text-muted-foreground">
			Cập nhật lần cuối: Tháng 10, 2026 • Bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn
		</p>
	</div>

	<div
		class="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground"
	>
		<div class="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm">
			<h2 class="text-base font-semibold text-foreground">1. Thu thập dữ liệu tối thiểu</h2>
			<p class="mt-2">
				Chúng tôi tuân thủ nguyên tắc thu thập tối thiểu. Povixa ID chỉ lưu trữ thông tin cần thiết
				nhất để phục vụ quá trình xác thực danh tính số (email, tên hiển thị, mã hash bảo mật).
			</p>
		</div>

		<div class="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm">
			<h2 class="text-base font-semibold text-foreground">2. Cam kết không bán dữ liệu</h2>
			<p class="mt-2">
				Dữ liệu của bạn không bao giờ được bán hoặc chuyển giao cho các mạng lưới quảng cáo của bên
				thứ ba. Bạn có quyền xuất toàn bộ dữ liệu hoặc yêu cầu xóa vĩnh viễn bất kỳ lúc nào.
			</p>
		</div>

		<div class="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm">
			<h2 class="text-base font-semibold text-foreground">3. Mã hóa & Bảo mật</h2>
			<p class="mt-2">
				Mọi thông tin phiên đăng nhập và mật khẩu được mã hóa bằng thuật toán băm thế hệ mới
				(Argon2id / bcrypt) và truyền tải hoàn toàn qua kết nối bảo mật TLS 1.3.
			</p>
		</div>
	</div>
</section>

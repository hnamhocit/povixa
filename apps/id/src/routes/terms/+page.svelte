<script lang="ts">
	import { IconShieldCheck, IconArrowLeft } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.footer_terms()} — Povixa ID</title>
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
			{m.footer_terms()}
		</h1>
		<p class="mt-2 text-sm text-muted-foreground">
			Cập nhật lần cuối: Tháng 10, 2026 • Áp dụng cho mọi tài khoản định danh Povixa ID
		</p>
	</div>

	<div
		class="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground"
	>
		<div class="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm">
			<h2 class="text-base font-semibold text-foreground">1. Giới thiệu dịch vụ</h2>
			<p class="mt-2">
				Povixa ID là dịch vụ quản lý danh tính số và đăng nhập một lần (Single Sign-On) được phát
				triển bởi Povixa. Bằng việc tạo tài khoản hoặc sử dụng dịch vụ, bạn đồng ý tuân thủ toàn bộ
				các điều khoản được quy định dưới đây.
			</p>
		</div>

		<div class="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm">
			<h2 class="text-base font-semibold text-foreground">2. Trách nhiệm người dùng</h2>
			<p class="mt-2">
				Bạn có trách nhiệm bảo mật mật khẩu, khóa xác thực hai lớp (2FA) và thông tin đăng nhập của
				mình. Bất kỳ hành động nào diễn ra dưới tài khoản của bạn sẽ thuộc về trách nhiệm pháp lý
				của bạn.
			</p>
		</div>

		<div class="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm">
			<h2 class="text-base font-semibold text-foreground">3. Quyền sở hữu và Mã nguồn mở</h2>
			<p class="mt-2">
				Nền tảng Povixa tôn trọng quyền tự do dữ liệu của người dùng. Dữ liệu của bạn thuộc về bạn.
				Bộ công cụ và SDK mã nguồn mở của chúng tôi được phát hành dưới các giấy phép mã nguồn mở
				minh bạch.
			</p>
		</div>
	</div>
</section>

<script lang="ts">
	import {
		IconCookie,
		IconPrinter,
		IconArrowLeft,
		IconCheck
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	function triggerPrint() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}
</script>

<svelte:head>
	<title>Chính sách Cookie (Cookie Policy) — Povixa Legal</title>
	<meta name="description" content="Chính sách sử dụng Cookie, LocalStorage và phiên làm việc của nền tảng Povixa." />
</svelte:head>

<div class="mb-6 flex items-center justify-between border-b border-border/80 pb-4">
	<div class="flex items-center gap-2">
		<a href="/" class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
			<IconArrowLeft size={13} />
			<span>Về tổng quan</span>
		</a>
		<span class="text-muted-foreground">/</span>
		<span class="text-xs font-semibold text-foreground">Cookie Policy</span>
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
		<IconCookie size={13} />
		<span>STORAGE AUDIT • ZERO TRACKERS</span>
	</div>
	<h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
		Chính sách Cookie &amp; Quản lý Lưu trữ Cục bộ
	</h1>
	<p class="mt-2 text-xs text-muted-foreground font-mono">
		{m.effective_date()}
	</p>
</div>

<article class="space-y-8 text-sm leading-relaxed text-muted-foreground">
	<section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4">
		<h2 class="text-base font-bold text-foreground">1. Tổng quan về Cookie tại Povixa</h2>
		<p>
			Povixa cam kết không sử dụng cookie theo dõi quảng cáo của bên thứ ba (Third-party tracking cookies) như Meta Pixel, Google Ads Remarketing hay TikTok Pixel. Chúng tôi chỉ sử dụng các cookie cần thiết phục vụ bảo mật và duy trì phiên đăng nhập của bạn.
		</p>
	</section>

	<section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4">
		<h2 class="text-base font-bold text-foreground">2. Bảng Kê Chi Tiết Các Cookie Đang Sử Dụng</h2>
		<div class="overflow-x-auto no-scrollbar">
			<table class="w-full text-left text-xs border border-border/80 rounded-xl overflow-hidden">
				<thead class="bg-muted text-foreground font-mono text-[11px]">
					<tr>
						<th class="p-3">Tên Cookie / Key</th>
						<th class="p-3">Mục đích</th>
						<th class="p-3">Loại</th>
						<th class="p-3">Thời gian lưu</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/60">
					<tr class="hover:bg-muted/30">
						<td class="p-3 font-mono text-primary font-semibold">pvx_session</td>
						<td class="p-3">Mã hóa token phiên đăng nhập (ed25519) an toàn HttpOnly</td>
						<td class="p-3"><span class="rounded bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 font-semibold">Thiết yếu</span></td>
						<td class="p-3 font-mono">30 ngày</td>
					</tr>
					<tr class="hover:bg-muted/30">
						<td class="p-3 font-mono text-primary font-semibold">pvx_csrf_token</td>
						<td class="p-3">Bảo vệ chống tấn công giả mạo yêu cầu chéo trang (CSRF)</td>
						<td class="p-3"><span class="rounded bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 font-semibold">Bảo mật</span></td>
						<td class="p-3 font-mono">Phiên duyệt web</td>
					</tr>
					<tr class="hover:bg-muted/30">
						<td class="p-3 font-mono text-primary font-semibold">mode-watcher-mode</td>
						<td class="p-3">Lưu trữ tùy chọn giao diện người dùng (Sáng / Tối) trong LocalStorage</td>
						<td class="p-3"><span class="rounded bg-muted text-muted-foreground px-1.5 py-0.5">Tùy chọn</span></td>
						<td class="p-3 font-mono">1 năm</td>
					</tr>
					<tr class="hover:bg-muted/30">
						<td class="p-3 font-mono text-primary font-semibold">paraglide_lang</td>
						<td class="p-3">Lưu trữ tùy chọn ngôn ngữ đã chọn (Tiếng Việt / English)</td>
						<td class="p-3"><span class="rounded bg-muted text-muted-foreground px-1.5 py-0.5">Tùy chọn</span></td>
						<td class="p-3 font-mono">1 năm</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</article>

<script lang="ts">
	import {
		IconCode,
		IconPrinter,
		IconArrowLeft,
		IconCheck,
		IconShieldCheck
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	function triggerPrint() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}
</script>

<svelte:head>
	<title>Giấy phép Mã nguồn Mở (Open Source Licensing) — Povixa Legal</title>
	<meta name="description" content="Chi tiết giấy phép mã nguồn mở AGPL-3.0 và MIT của nền tảng Povixa." />
</svelte:head>

<div class="mb-6 flex items-center justify-between border-b border-border/80 pb-4">
	<div class="flex items-center gap-2">
		<a href="/" class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
			<IconArrowLeft size={13} />
			<span>Về tổng quan</span>
		</a>
		<span class="text-muted-foreground">/</span>
		<span class="text-xs font-semibold text-foreground">Open Source Licenses</span>
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
		<IconCode size={13} />
		<span>OPEN SOURCE DUAL LICENSING</span>
	</div>
	<h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
		Giấy phép Mã nguồn Mở (Open Source Licenses)
	</h1>
	<p class="mt-2 text-xs text-muted-foreground font-mono">
		{m.effective_date()}
	</p>
</div>

<article class="space-y-8 text-sm leading-relaxed text-muted-foreground">
	<section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4">
		<h2 class="text-base font-bold text-foreground">1. Mô hình Cấp phép Kép của Povixa</h2>
		<p>
			Povixa được xây dựng với sứ mệnh đem lại quyền tự do toàn diện cho nhà phát triển độc lập và các đội ngũ kỹ thuật. Chúng tôi áp dụng hai giấy phép mã nguồn mở rõ ràng:
		</p>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-4">
			<div class="rounded-xl border border-border/80 bg-background/60 p-4">
				<div class="inline-flex rounded bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary mb-2">
					AGPL-3.0 LICENSE
				</div>
				<h3 class="text-sm font-bold text-foreground">Hạ Tầng Cốt Lõi (Core Engine)</h3>
				<p class="mt-1.5 leading-relaxed text-muted-foreground">
					Áp dụng cho toàn bộ mã nguồn máy chủ, Router Gateway, cơ chế tích hợp ClickHouse và dịch vụ nền tảng. Bạn được tự do chạy nội bộ, sửa đổi, kiểm tra và tự host trên máy chủ riêng.
				</p>
			</div>

			<div class="rounded-xl border border-border/80 bg-background/60 p-4">
				<div class="inline-flex rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-600 mb-2">
					MIT LICENSE
				</div>
				<h3 class="text-sm font-bold text-foreground">Thư viện Khách (Client SDKs)</h3>
				<p class="mt-1.5 leading-relaxed text-muted-foreground">
					Áp dụng cho toàn bộ các gói SDK: TypeScript (<code class="text-primary font-mono">@povixa/sdk</code>), Go, Python, Flutter, Rust. Bạn có quyền nhúng trực tiếp vào bất kỳ ứng dụng thương mại nào mà không bị ảnh hưởng bản quyền.
				</p>
			</div>
		</div>
	</section>
</article>

<script lang="ts">
	import { IconFlame, IconHeart, IconShieldCheck, IconCode } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.footer_manifesto()} — Povixa Manifesto</title>
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconFlame size={14} />
			<span>Tuyên ngôn Lập trình</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_manifesto()}
		</h1>
		<p class="mx-auto mt-4 text-base text-muted-foreground sm:text-lg">
			Ngừng nuôi dưỡng các tập đoàn SaaS độc quyền. Hãy lấy lại quyền tự do của bạn.
		</p>
	</div>

	<div class="mt-14 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-lg font-bold text-foreground">Điều 1: Mã nguồn mở là nền tảng của tự do</h2>
			<p class="mt-3">
				Các thành phần thiết yếu cấu thành một ứng dụng hiện đại — nhận diện danh tính, phân phối
				cấu hình, phân tích số liệu, gửi thông báo và lưu trữ dữ liệu — không nên là độc quyền của
				một số ít tập đoàn công nghệ khổng lồ.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-lg font-bold text-foreground">
				Điều 2: Chống lại bẫy giá và khóa chết (Vendor Lock-in)
			</h2>
			<p class="mt-3">
				Chúng tôi từ chối mô hình kinh doanh dụ dỗ lập trình viên bằng các gói free tier hạn chế rồi
				thu phí cắt cổ khi ứng dụng của họ có được thành công đầu tiên. Bất kỳ mã nguồn nào viết cho
				Povixa đều có thể tự chạy trên hạ tầng của chính bạn.
			</p>
		</div>

		<div class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
			<h2 class="text-lg font-bold text-foreground">
				Điều 3: Minh bạch tài chính & Chia sẻ lợi nhuận
			</h2>
			<p class="mt-3">
				Cộng đồng mã nguồn mở không nên bị lợi dụng cho mục đích thương mại đơn phương. Chúng tôi
				cam kết trích tới 30% doanh thu ròng phân phối trực tiếp cho các đóng góp viên dựa trên mức
				độ đóng góp thực tế.
			</p>
		</div>
	</div>

	<div class="mt-12 text-center">
		<a
			href="/#pricing"
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:bg-primary/90 active:scale-95"
		>
			<span>Xem các gói hỗ trợ & Bảng giá</span>
		</a>
	</div>
</section>

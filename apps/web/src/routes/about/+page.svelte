<script lang="ts">
	import {
		IconUsers,
		IconHeart,
		IconShieldCheck,
		IconCode,
		IconFlame,
		IconBrandGithub
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const values = [
		{
			title: 'Tự do mã nguồn mở (Open Source Freedom)',
			desc: 'Chúng tôi tin rằng các công cụ cốt lõi của nhà phát triển không nên bị giam giữ bởi các tập đoàn SaaS độc quyền.',
			icon: IconCode
		},
		{
			title: 'Chủ quyền Dữ liệu Tuyệt đối',
			desc: 'Dữ liệu và mã nguồn của bạn phải luôn nằm dưới sự kiểm soát của bạn thông qua khả năng tự lưu trữ (self-host).',
			icon: IconShieldCheck
		},
		{
			title: 'Minh bạch & Chia sẻ Doanh thu',
			desc: 'Mô hình chia sẻ lợi nhuận lên đến 30% dành cho các đóng góp viên mã nguồn mở thực thụ.',
			icon: IconHeart
		}
	];
</script>

<svelte:head>
	<title>{m.footer_about()} — Povixa Story & Mission</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconFlame size={14} />
			<span>Sứ mệnh Povixa</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_about()}
		</h1>
		<p class="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
			Povixa được xây dựng với mục tiêu duy nhất: Chấm dứt sự phụ thuộc vào các tập đoàn SaaS độc
			quyền bằng một nền tảng điều khiển thống nhất và tự do.
		</p>
	</div>

	<!-- Story Section -->
	<div
		class="mt-16 space-y-5 rounded-3xl border border-border/80 bg-card/50 p-6 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm sm:p-10"
	>
		<h2 class="text-xl font-bold tracking-tight text-foreground">
			Tại sao chúng tôi xây dựng Povixa?
		</h2>
		<p>
			Ngày nay, để xây dựng một ứng dụng web hoặc di động hoàn chỉnh, một lập trình viên hoặc nhóm
			khởi nghiệp nhỏ phải trả hàng chục, thậm chí hàng trăm USD mỗi tháng cho 6–8 công cụ SaaS
			riêng biệt: Auth0 cho đăng nhập, LaunchDarkly cho cờ tính năng, OneSignal cho thông báo,
			Mixpanel cho phân tích, AWS S3 cho lưu trữ, Datadog cho giám sát...
		</p>
		<p>
			Không chỉ tốn kém chi phí, bạn còn phải dành hàng tuần để viết code nối các SDK rời rạc lại
			với nhau bằng những đoạn mã tạm bợ. Khi lưu lượng truy cập bắt đầu tăng, bạn rơi vào bẫy giá
			(predatory pricing) với các khoản phụ phí tải dữ liệu (egress fees) cắt cổ.
		</p>
		<p class="font-medium text-foreground">
			Povixa gom toàn bộ 8 mô-đun thiết yếu vào một bộ SDK duy nhất, mở mã nguồn 100%, có thể tự
			host bất cứ nơi nào bạn muốn và hoàn toàn miễn phí cho các dự án tự do.
		</p>
	</div>

	<!-- Values Grid -->
	<div class="mt-14 space-y-4">
		<h2 class="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase">
			Giá trị cốt lõi
		</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			{#each values as v (v.title)}
				{@const Icon = v.icon}
				<div class="rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
					<div
						class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
					>
						<Icon size={20} />
					</div>
					<h3 class="mt-4 text-base font-bold text-foreground">{v.title}</h3>
					<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-14 text-center">
		<a
			href="https://github.com/hnamhocit/povixa"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:bg-primary/90 active:scale-95"
		>
			<IconBrandGithub size={16} />
			<span>Tham gia cùng chúng tôi trên GitHub</span>
		</a>
	</div>
</section>

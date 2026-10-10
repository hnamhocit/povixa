<script lang="ts">
	import { IconFileText, IconArrowRight, IconClock, IconFlame } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const guides = [
		{
			title: 'Tích hợp Xác thực Povixa ID trong 60 giây',
			time: '5 phút đọc',
			level: 'Cơ bản',
			desc: 'Hướng dẫn cài đặt nút đăng nhập xã hội, xử lý phiên JWT và lưu trữ thông tin an toàn trong SvelteKit & Next.js.'
		},
		{
			title: 'Triển khai Tự lưu trữ (Self-hosting) trên Docker & Bare Metal',
			time: '12 phút đọc',
			level: 'Nâng cao',
			desc: 'Cấu hình docker-compose.yml hoàn chỉnh, thiết lập SSL tự động qua Caddy và bảo vệ dữ liệu trên VPS cá nhân.'
		},
		{
			title: 'Quản lý Feature Flags và Kiểm thử A/B không gián đoạn',
			time: '8 phút đọc',
			level: 'Trung bình',
			desc: 'Chiến thuật triển khai Canary releases, phân nhóm người dùng và rollout tính năng tự tin mà không lo downtime.'
		},
		{
			title: 'Thiết lập Web Push Notifications và Hệ thống Dự phòng',
			time: '10 phút đọc',
			level: 'Trung bình',
			desc: 'Tích hợp Service Worker, đăng ký VAPID keys và thiết lập tự động gửi email nếu thông báo không được đọc.'
		}
	];
</script>

<svelte:head>
	<title>{m.footer_guides()} — Povixa Developer Guides</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconFlame size={14} />
			<span>Thực hành Thực chiến</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_guides()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Các bài viết hướng dẫn từng bước giúp bạn xây dựng và làm chủ sản phẩm nhanh chóng.
		</p>
	</div>

	<div class="mt-14 space-y-4">
		{#each guides as g (g.title)}
			<div
				class="group relative rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-card hover:shadow-md"
			>
				<div class="flex items-center gap-3 text-xs text-muted-foreground">
					<span class="inline-flex items-center gap-1">
						<IconClock size={13} />
						<span>{g.time}</span>
					</span>
					<span>•</span>
					<span class="rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">{g.level}</span>
				</div>
				<h2
					class="mt-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary"
				>
					{g.title}
				</h2>
				<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
					{g.desc}
				</p>
				<div class="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
					<span>Đọc hướng dẫn</span>
					<IconArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
				</div>
			</div>
		{/each}
	</div>
</section>

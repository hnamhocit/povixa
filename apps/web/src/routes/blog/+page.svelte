<script lang="ts">
	import { IconCalendar, IconUser, IconArrowRight, IconSparkles } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const posts = [
		{
			title: 'Tại sao chúng tôi quyết định mở mã nguồn 100% Povixa',
			date: '08 Tháng 10, 2026',
			author: 'Đội ngũ Kỹ thuật Povixa',
			category: 'Triết lý Công nghệ',
			excerpt:
				'Phân tích thực trạng các gói dịch vụ SaaS bẫy giá nhà phát triển và giải pháp đưa quyền tự do trở lại tay cộng đồng.'
		},
		{
			title: 'Kiến trúc Turborepo Monorepo với Svelte 5 và Tailwind CSS v4',
			date: '25 Tháng 09, 2026',
			author: 'Kỹ sư Trưởng',
			category: 'Kiến trúc Frontend',
			excerpt:
				'Bí quyết tổ chức mã nguồn giúp chia sẻ component và token màu sắc giữa nhiều ứng dụng mà vẫn giữ tốc độ build siêu tốc.'
		},
		{
			title: 'Cách tự lưu trữ Povixa trên VPS $5/tháng với Docker Compose',
			date: '12 Tháng 09, 2026',
			author: 'DevOps Lead',
			category: 'Hạ tầng & Triển khai',
			excerpt:
				'Hướng dẫn thiết lập môi trường sản phẩm thực tế với SSL tự động, sao lưu dữ liệu và giám sát tài nguyên.'
		}
	];
</script>

<svelte:head>
	<title>{m.nav_blog()} — Povixa Engineering Blog</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconSparkles size={14} />
			<span>Bài viết & Góc nhìn Kỹ thuật</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.nav_blog()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Chia sẻ kinh nghiệm xây dựng hệ thống quy mô lớn, kỹ thuật monorepo và hành trình mã nguồn mở.
		</p>
	</div>

	<div class="mt-16 space-y-6">
		{#each posts as post (post.title)}
			<article
				class="group relative rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-card hover:shadow-md sm:p-8"
			>
				<div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
					<span
						class="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-semibold text-primary"
					>
						{post.category}
					</span>
					<span class="inline-flex items-center gap-1">
						<IconCalendar size={13} />
						<span>{post.date}</span>
					</span>
					<span>•</span>
					<span class="inline-flex items-center gap-1">
						<IconUser size={13} />
						<span>{post.author}</span>
					</span>
				</div>

				<h2
					class="mt-4 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary"
				>
					{post.title}
				</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
					{post.excerpt}
				</p>

				<div class="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
					<span>Đọc toàn bộ bài viết</span>
					<IconArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
				</div>
			</article>
		{/each}
	</div>
</section>

<script lang="ts">
	import { IconTag, IconGitCommit, IconSparkles, IconCheck } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const releases = [
		{
			version: 'v2.4.0',
			date: '10 Tháng 10, 2026',
			badge: 'Phiên bản mới nhất',
			title: 'Nâng cấp Svelte 5 Runes, Tailwind CSS v4 & Kiến trúc Turborepo Monorepo',
			description:
				'Cải tiến vượt bậc về hiệu năng xây dựng, hệ thống component chia sẻ @povixa/ui và đồng bộ hóa trải nghiệm người dùng.',
			changes: [
				'Tách biệt các UI component cốt lõi (Footer, FeatureInDevelopment, NotFound) vào package dùng chung @povixa/ui.',
				'Nâng cấp toàn diện sang Svelte 5 Runes ($state, $derived, $effect) giúp phản hồi giao diện cực nhạy.',
				'Tích hợp hoàn hảo hệ thống dịch tự động Paraglide JS đa ngôn ngữ (Tiếng Việt & English).',
				'Tối ưu hóa thời gian biên dịch Turborepo & Bun lockfile giúp build chỉ dưới 2 giây.'
			]
		},
		{
			version: 'v2.3.0',
			date: '28 Tháng 09, 2026',
			badge: 'Tính năng lớn',
			title: 'Phát hành Cổng định danh Povixa ID (SSO & Passkeys)',
			description:
				'Một tài khoản duy nhất cho toàn bộ hệ sinh thái dịch vụ Povixa, loại bỏ rào cản đăng nhập phân mảnh.',
			changes: [
				'Đăng nhập xã hội tức thì qua Google, GitHub, Discord, Facebook.',
				'Hỗ trợ tiêu chuẩn bảo mật xác thực WebAuthn / Touch ID / Face ID.',
				'Mã hóa thông tin cá nhân chuẩn Argon2id và kiểm soát phiên đa thiết bị.'
			]
		},
		{
			version: 'v2.2.0',
			date: '15 Tháng 09, 2026',
			badge: 'Giao diện & Trải nghiệm',
			title: 'Hệ thống Theme Token OKLCH & Hỗ trợ Đa Ngôn Ngữ i18n',
			description:
				'Hỗ trợ chế độ màu Tối/Sáng tự động thích ứng với hệ thống và bảng màu OKLCH rực rỡ.',
			changes: [
				'Hỗ trợ chế độ Dark Mode / Light Mode mượt mà không bị hiện tượng nhấp nháy (FOUC).',
				'Cung cấp bảng màu chuẩn công nghệ @povixa/tailwind-theme.',
				'Hỗ trợ chuyển đổi nhanh Tiếng Việt và Tiếng Anh trên toàn hệ thống.'
			]
		},
		{
			version: 'v2.0.0',
			date: '01 Tháng 08, 2026',
			badge: 'Khởi đầu',
			title: 'Ra mắt Nền tảng Điều khiển Ứng dụng Povixa',
			description:
				'Đặt nền móng cho hệ thống công cụ phát triển mã nguồn mở độc lập, bảo vệ quyền tự do của lập trình viên.',
			changes: [
				'Kiến trúc Unified SDK tích hợp 8 mô-đun nền tảng.',
				'Chính sách miễn phí trọn đời cho dự án nguồn mở khi đặt huy hiệu Powered by Povixa.',
				'Hỗ trợ self-host 100% trên hạ tầng riêng của lập trình viên.'
			]
		}
	];
</script>

<svelte:head>
	<title>{m.footer_changelog()} — Povixa Releases</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconSparkles size={14} />
			<span>Cập nhật liên tục</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_changelog()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Theo dõi từng bước tiến của nền tảng Povixa và các bản cập nhật tính năng mới nhất.
		</p>
	</div>

	<div class="mt-16 space-y-12">
		{#each releases as rel (rel.version)}
			<article
				class="relative rounded-3xl border border-border/80 bg-card/50 p-6 shadow-xs backdrop-blur-sm sm:p-8"
			>
				<div
					class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4"
				>
					<div class="flex items-center gap-2.5">
						<span
							class="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary"
						>
							<IconTag size={15} />
						</span>
						<span class="font-mono text-base font-bold text-foreground">{rel.version}</span>
						<span
							class="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary"
						>
							{rel.badge}
						</span>
					</div>
					<time class="font-mono text-xs text-muted-foreground">{rel.date}</time>
				</div>

				<h2 class="mt-5 text-xl font-bold tracking-tight text-foreground">
					{rel.title}
				</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
					{rel.description}
				</p>

				<ul class="mt-6 space-y-2.5">
					{#each rel.changes as item, i (i)}
						<li class="flex items-start gap-2.5 text-xs text-foreground/90 sm:text-sm">
							<div
								class="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
							>
								<IconCheck size={12} stroke={2.5} />
							</div>
							<span class="leading-normal">{item}</span>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

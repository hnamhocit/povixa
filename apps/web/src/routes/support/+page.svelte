<script lang="ts">
	import {
		IconMessageCircle,
		IconBrandDiscord,
		IconBrandGithub,
		IconBook,
		IconHelp,
		IconArrowRight
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const faqs = [
		{
			q: 'Làm thế nào để sử dụng Povixa hoàn toàn miễn phí?',
			a: 'Chỉ cần nhúng huy hiệu Powered by Povixa trên chân trang hoặc bảng điều khiển ứng dụng của bạn, bạn sẽ được miễn phí 100% trọn đời mà không cần thẻ tín dụng.'
		},
		{
			q: 'Tôi có thể triển khai tự lưu trữ (self-host) ở đâu?',
			a: 'Bất cứ nơi nào bạn có Docker hoặc VPS Linux. Chúng tôi cung cấp file docker-compose.yml và tài liệu hướng dẫn từng bước.'
		},
		{
			q: 'Làm cách nào để nhận chia sẻ lợi nhuận 30% khi đóng góp mã nguồn?',
			a: 'Tham gia đóng góp pull request trên kho mã nguồn GitHub của chúng tôi. Các đóng góp được đánh giá trọng số công khai và trả thưởng minh bạch qua Open Collective & GitHub Sponsors.'
		}
	];
</script>

<svelte:head>
	<title>{m.module_support_name()} — Povixa Help Center</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconHelp size={14} />
			<span>Hỗ trợ Kỹ thuật & Cộng đồng</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.module_support_name()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			{m.module_support_desc()}
		</p>
	</div>

	<!-- Support Cards -->
	<div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
		<a
			href="https://discord.gg/povixa"
			target="_blank"
			rel="noreferrer"
			class="group rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
		>
			<div
				class="flex size-10 items-center justify-center rounded-xl bg-[#5865F2]/10 text-[#5865F2]"
			>
				<IconBrandDiscord size={20} />
			</div>
			<h3
				class="mt-4 text-base font-bold text-foreground transition-colors group-hover:text-primary"
			>
				Discord Chat
			</h3>
			<p class="mt-1 text-xs text-muted-foreground">
				Trao đổi trực tiếp với core team và cộng đồng lập trình viên 24/7.
			</p>
		</a>

		<a
			href="https://github.com/hnamhocit/povixa/issues"
			target="_blank"
			rel="noreferrer"
			class="group rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
		>
			<div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<IconBrandGithub size={20} />
			</div>
			<h3
				class="mt-4 text-base font-bold text-foreground transition-colors group-hover:text-primary"
			>
				GitHub Issues
			</h3>
			<p class="mt-1 text-xs text-muted-foreground">
				Báo cáo lỗi (bug report), yêu cầu tính năng mới và theo dõi PR.
			</p>
		</a>

		<a
			href="/docs"
			class="group rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
		>
			<div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<IconBook size={20} />
			</div>
			<h3
				class="mt-4 text-base font-bold text-foreground transition-colors group-hover:text-primary"
			>
				Tài liệu Trợ giúp
			</h3>
			<p class="mt-1 text-xs text-muted-foreground">
				Tìm kiếm câu trả lời nhanh qua hướng dẫn và tài liệu API.
			</p>
		</a>
	</div>

	<!-- FAQ Section -->
	<div class="mt-16 space-y-4">
		<h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
			Câu hỏi thường gặp (FAQ)
		</h2>
		<div class="space-y-4">
			{#each faqs as item (item.q)}
				<div class="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
					<h3 class="text-sm font-bold text-foreground">{item.q}</h3>
					<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{item.a}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<script lang="ts" module>
	export interface NotFoundSuggestion {
		href: string;
		label: string;
		description?: string;
	}

	export interface NotFoundProps {
		class?: string;
		code?: string;
		title?: string;
		description?: string;
		backHref?: string;
		backLabel?: string;
		homeHref?: string;
		homeLabel?: string;
		suggestions?: NotFoundSuggestion[];
	}
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		code = '404',
		title = 'Không tìm thấy trang',
		description = 'Trang hoặc tài nguyên bạn đang tìm kiếm không tồn tại, đã được chuyển hướng hoặc tạm thời chưa khả dụng.',
		backHref = 'javascript:history.back()',
		backLabel = 'Quay lại trang trước',
		homeHref = '/',
		homeLabel = 'Về trang chủ',
		suggestions = [
			{
				href: '/',
				label: 'Trang chủ Povixa',
				description: 'Khám phá tổng quan nền tảng điều khiển ứng dụng'
			},
			{
				href: '/id',
				label: 'Povixa ID',
				description: 'Đăng nhập và quản lý tài khoản định danh duy nhất'
			},
			{
				href: '/#modules',
				label: 'Hệ sinh thái Modules',
				description: 'Remote Config, Analytics, Notifications, Storage'
			},
			{
				href: '/status',
				label: 'Trạng thái hệ thống',
				description: 'Theo dõi thời gian hoạt động và sức khỏe dịch vụ'
			}
		]
	}: NotFoundProps = $props();
</script>

<div
	class={cn(
		'relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24',
		className
	)}
>
	<!-- Ambient Background Glow -->
	<div class="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
		<div
			class="h-[380px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.22_265/0.18)_0%,oklch(0.6_0.2_310/0.06)_50%,transparent_70%)] blur-3xl"
		></div>
	</div>

	<!-- Big 404 Visual -->
	<div class="relative select-none text-center">
		<span
			class="bg-gradient-to-b from-foreground/80 via-foreground/30 to-transparent bg-clip-text font-mono text-8xl font-black tracking-tighter text-transparent sm:text-9xl"
		>
			{code}
		</span>
		<div
			class="absolute inset-0 flex items-center justify-center"
		>
			<span
				class="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive backdrop-blur-sm shadow-xs"
			>
				<span class="size-1.5 rounded-full bg-destructive animate-pulse"></span>
				<span>Error {code}</span>
			</span>
		</div>
	</div>

	<!-- Error Message -->
	<div class="mt-4 text-center">
		<h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
			{title}
		</h1>
		<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
			{description}
		</p>
	</div>

	<!-- Action Buttons -->
	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		{#if homeHref}
			<a
				href={homeHref}
				class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:bg-primary/90 active:scale-95"
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
					<polyline points="9 22 9 12 15 12 15 22" />
				</svg>
				<span>{homeLabel}</span>
			</a>
		{/if}

		{#if backHref}
			<a
				href={backHref}
				class="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 px-4 py-2.5 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-accent"
			>
				<svg class="size-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="19" y1="12" x2="5" y2="12" />
					<polyline points="12 19 5 12 12 5" />
				</svg>
				<span>{backLabel}</span>
			</a>
		{/if}
	</div>

	<!-- Quick Links Suggestions -->
	{#if suggestions.length > 0}
		<div class="mt-14 w-full">
			<p class="text-center font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
				Gợi ý các trang hữu ích
			</p>
			<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each suggestions as s (s.href)}
					<a
						href={s.href}
						class="group flex items-start gap-3 rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-card/80 hover:shadow-sm"
					>
						<div
							class="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110"
						>
							<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</div>
						<div class="min-w-0 flex-1">
							<h3 class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
								{s.label}
							</h3>
							{#if s.description}
								<p class="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
									{s.description}
								</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

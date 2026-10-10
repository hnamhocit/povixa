<script lang="ts" module>
	export interface FeatureHighlight {
		title: string;
		description: string;
		icon?: string;
	}

	export interface FeatureInDevelopmentProps {
		class?: string;
		badge?: string;
		moduleName?: string;
		title?: string;
		description?: string;
		progress?: number;
		eta?: string;
		highlights?: FeatureHighlight[];
		backHref?: string;
		backLabel?: string;
		secondaryActionHref?: string;
		secondaryActionLabel?: string;
	}
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		badge = 'Đang phát triển • Work in Progress',
		moduleName = 'Povixa Module',
		title = 'Tính năng đang được phát triển',
		description = 'Đội ngũ kỹ sư Povixa đang hoàn thiện mô-đun này với kiến trúc hiệu năng cao, bảo mật chặt chẽ và trải nghiệm nhà phát triển tối ưu.',
		progress = 70,
		eta = 'Phiên bản tiếp theo',
		highlights = [
			{
				title: 'Hiệu năng cao & Tự lưu trữ',
				description: 'Kiến trúc tối ưu hóa tài nguyên, hỗ trợ self-host 100% không phụ thuộc nhà cung cấp.',
				icon: 'bolt'
			},
			{
				title: 'SDK Type-Safe',
				description: 'Tích hợp mượt mà với TypeScript, SDK đồng nhất cho mọi ngôn ngữ phổ biến.',
				icon: 'code'
			},
			{
				title: 'Bảo mật chuẩn Enterprise',
				description: 'Mã hóa đầu cuối, phân quyền theo vai trò (RBAC) và kiểm tra bảo mật nghiêm ngặt.',
				icon: 'shield'
			}
		],
		backHref = '/',
		backLabel = 'Quay lại trang chủ',
		secondaryActionHref = '/#modules',
		secondaryActionLabel = 'Xem tất cả modules'
	}: FeatureInDevelopmentProps = $props();

	let email = $state('');
	let subscribed = $state(false);

	function handleSubscribe(e: SubmitEvent) {
		e.preventDefault();
		if (email.trim()) {
			subscribed = true;
		}
	}
</script>

<div
	class={cn(
		'relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24',
		className
	)}
>
	<!-- Ambient glow behind card -->
	<div class="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
		<div
			class="h-[400px] w-[650px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.22_265/0.15)_0%,oklch(0.6_0.2_290/0.05)_50%,transparent_70%)] blur-3xl"
		></div>
	</div>

	<!-- Status Badge -->
	<div
		class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm shadow-xs"
	>
		<span class="relative flex size-2">
			<span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
			<span class="relative inline-flex size-2 rounded-full bg-primary"></span>
		</span>
		<span>{badge}</span>
	</div>

	<!-- Title Section -->
	<div class="mt-6 text-center">
		{#if moduleName}
			<p class="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
				{moduleName}
			</p>
		{/if}
		<h1
			class="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
		>
			<span>{title}</span>
		</h1>
		<p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
			{description}
		</p>
	</div>

	<!-- Progress Indicator -->
	{#if progress !== undefined}
		<div
			class="mt-8 w-full max-w-md rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm shadow-xs"
		>
			<div class="flex items-center justify-between text-xs font-medium">
				<span class="text-foreground">Tiến độ phát triển</span>
				<span class="font-mono text-primary">{progress}% • {eta}</span>
			</div>
			<div class="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-muted">
				<div
					class="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500 transition-all duration-500"
					style="width: {Math.min(Math.max(progress, 0), 100)}%"
				></div>
			</div>
		</div>
	{/if}

	<!-- Planned Highlights Grid -->
	{#if highlights.length > 0}
		<div class="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
			{#each highlights as item (item.title)}
				<div
					class="group relative rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-sm"
				>
					<div
						class="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105"
					>
						{#if item.icon === 'bolt'}
							<svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
							</svg>
						{:else if item.icon === 'shield'}
							<svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
							</svg>
						{:else}
							<svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="16 18 22 12 16 6" />
								<polyline points="8 6 2 12 8 18" />
							</svg>
						{/if}
					</div>
					<h3 class="mt-3.5 text-sm font-semibold text-foreground">{item.title}</h3>
					<p class="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Subscribe / Get Notified Box -->
	<div
		class="mt-12 w-full max-w-xl rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-sm text-center shadow-xs"
	>
		{#if subscribed}
			<div class="flex flex-col items-center gap-2 text-emerald-500">
				<div class="flex size-10 items-center justify-center rounded-full bg-emerald-500/10">
					<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</div>
				<p class="text-sm font-semibold text-foreground">Đã ghi nhận đăng ký!</p>
				<p class="text-xs text-muted-foreground">Chúng tôi sẽ gửi email thông báo ngay khi tính năng phát hành.</p>
			</div>
		{:else}
			<h4 class="text-sm font-semibold text-foreground">Nhận thông báo khi tính năng ra mắt</h4>
			<p class="mt-1 text-xs text-muted-foreground">
				Để lại email của bạn để nhận thông báo truy cập sớm (Early Access) hoàn toàn miễn phí.
			</p>
			<form onsubmit={handleSubscribe} class="mt-4 flex flex-col gap-2 sm:flex-row">
				<input
					type="email"
					required
					bind:value={email}
					placeholder="your.email@example.com"
					class="flex-1 rounded-xl border border-border/80 bg-background/80 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				/>
				<button
					type="submit"
					class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:bg-primary/90 active:scale-95"
				>
					<span>Đăng ký nhận tin</span>
					<svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</button>
			</form>
		{/if}
	</div>

	<!-- Navigation Actions -->
	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		{#if backHref}
			<a
				href={backHref}
				class="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-accent"
			>
				<svg class="size-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="19" y1="12" x2="5" y2="12" />
					<polyline points="12 19 5 12 12 5" />
				</svg>
				<span>{backLabel}</span>
			</a>
		{/if}

		{#if secondaryActionHref}
			<a
				href={secondaryActionHref}
				class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95"
			>
				<span>{secondaryActionLabel}</span>
				<svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="5" y1="12" x2="19" y2="12" />
					<polyline points="12 5 19 12 12 19" />
				</svg>
			</a>
		{/if}
	</div>
</div>

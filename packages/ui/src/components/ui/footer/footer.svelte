<script lang="ts" module>
	export interface FooterLink {
		href: string;
		label: string;
		external?: boolean;
	}

	export interface FooterColumn {
		title: string;
		links: FooterLink[];
	}

	export interface SocialLink {
		href: string;
		label: string;
		icon?: 'github' | 'x' | 'discord' | 'facebook';
	}

	export interface FooterProps {
		class?: string;
		containerClass?: string;
		brandName?: string;
		brandBadge?: string;
		brandHref?: string;
		brandDescription?: string;
		columns?: FooterColumn[];
		legalLinks?: FooterLink[];
		socials?: SocialLink[];
		statusText?: string;
		statusHref?: string;
		copyright?: string;
		madeWithText?: string;
	}
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		containerClass = '',
		brandName = 'Povixa',
		brandBadge = '',
		brandHref = '/',
		brandDescription = 'The unified control plane for modern applications.',
		columns = [
			{
				title: 'Sản phẩm',
				links: [
					{ href: '/#modules', label: 'Tất cả Modules' },
					{ href: '/#pricing', label: 'Bảng giá' },
					{ href: '/changelog', label: 'Nhật ký thay đổi' },
					{ href: '/roadmap', label: 'Lộ trình phát triển' },
					{ href: '/status', label: 'Trạng thái hệ thống' }
				]
			},
			{
				title: 'Modules',
				links: [
					{ href: '/id', label: 'Povixa ID' },
					{ href: '/config', label: 'Remote Config' },
					{ href: '/notifications', label: 'Notifications' },
					{ href: '/analytics', label: 'Analytics' },
					{ href: '/storage', label: 'Storage Engine' }
				]
			},
			{
				title: 'Nhà phát triển',
				links: [
					{ href: '/docs', label: 'Tài liệu hướng dẫn' },
					{ href: '/api', label: 'API Reference' },
					{ href: '/sdks', label: 'SDKs & Libraries' },
					{ href: '/cli', label: 'Dòng lệnh CLI' },
					{ href: '/guides', label: 'Hướng dẫn tích hợp' }
				]
			},
			{
				title: 'Povixa',
				links: [
					{ href: '/about', label: 'Về chúng tôi' },
					{ href: '/blog', label: 'Tin tức & Blog' },
					{ href: '/manifesto', label: 'Tuyên ngôn mã nguồn mở' },
					{ href: '/#sponsors', label: 'Nhà tài trợ' },
					{ href: '/contact', label: 'Liên hệ' }
				]
			}
		],
		legalLinks = [
			{ href: '/legal/terms', label: 'Điều khoản sử dụng' },
			{ href: '/legal/privacy', label: 'Chính sách bảo mật' },
			{ href: '/legal/dpa', label: 'Thỏa thuận DPA' },
			{ href: '/legal/cookies', label: 'Chính sách Cookie' },
			{ href: '/legal/subprocessors', label: 'Nhà cung cấp phụ' }
		],
		socials = [
			{ href: 'https://github.com/hnamhocit/povixa', label: 'GitHub', icon: 'github' },
			{ href: 'https://x.com/povixa', label: 'X', icon: 'x' },
			{ href: 'https://discord.gg/povixa', label: 'Discord', icon: 'discord' }
		],
		statusText = 'Hệ thống hoạt động bình thường',
		statusHref = '/status',
		copyright = `© ${new Date().getFullYear()} Povixa. Bảo lưu mọi quyền.`,
		madeWithText = 'Phát triển vì tự do của cộng đồng lập trình viên'
	}: FooterProps = $props();
</script>

<footer class={cn('border-t border-border/60 bg-background/50 backdrop-blur-xs', className)}>
	<div class={cn('mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8', containerClass)}>
		<div class="grid gap-12 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
			<!-- Brand column -->
			<div class="space-y-4">
				<a href={brandHref} class="group inline-flex items-center gap-2.5">
					<div
						class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs shadow-primary/20 transition-transform group-hover:scale-105"
					>
						<svg
							viewBox="0 0 24 24"
							class="size-4.5"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M12 2L2 7l10 5 10-5-10-5z" />
							<path d="M2 17l10 5 10-5" />
							<path d="M2 12l10 5 10-5" />
						</svg>
					</div>
					<div class="flex items-center gap-2">
						<span class="font-sans text-lg font-bold tracking-tight text-foreground">
							{brandName}
						</span>
						{#if brandBadge}
							<span
								class="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary"
							>
								{brandBadge}
							</span>
						{/if}
					</div>
				</a>

				<p class="max-w-sm text-sm leading-relaxed text-muted-foreground">
					{brandDescription}
				</p>

				<!-- Social icons -->
				<div class="flex items-center gap-2 pt-1">
					{#each socials as s (s.href)}
						<a
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={s.label}
							class="flex size-9 items-center justify-center rounded-lg border border-border/80 bg-card/60 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-accent hover:text-foreground active:scale-95"
						>
							{#if s.icon === 'github'}
								<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
								</svg>
							{:else if s.icon === 'x'}
								<svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
							{:else if s.icon === 'discord'}
								<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M18 6a18.2 18.2 0 0 0-4-1 14.5 14.5 0 0 0-.6 1.4 17 17 0 0 0-2.8 0A14.5 14.5 0 0 0 10 5a18.2 18.2 0 0 0-4 1C3.5 11 3 16 3 20a17.5 17.5 0 0 0 5.5 2.8c.4-.6.8-1.2 1.1-1.9a11.2 11.2 0 0 1-1.8-.8c.2-.1.3-.2.5-.3 3.6 1.7 7.5 1.7 11.1 0 .2.1.3.2.5.3-.6.4-1.2.6-1.8.8.3.7.7 1.3 1.1 1.9A17.5 17.5 0 0 0 21 20c0-4-.5-9-3-14zM8.5 15.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
								</svg>
							{:else}
								<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10" />
								</svg>
							{/if}
						</a>
					{/each}
				</div>

				{#if statusText}
					<div class="pt-2">
						<a
							href={statusHref}
							class="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
						>
							<span class="relative flex size-2">
								<span
									class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75"
								></span>
								<span class="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
							</span>
							<span>{statusText}</span>
						</a>
					</div>
				{/if}
			</div>

			<!-- Nav columns -->
			{#each columns as col, cIdx (cIdx)}
				<div class="space-y-3.5">
					<h3 class="text-xs font-semibold tracking-wider text-foreground uppercase">
						{col.title}
					</h3>
					<ul class="space-y-2.5">
						{#each col.links as link (link.href)}
							<li>
								<a
									href={link.href}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noopener noreferrer' : undefined}
									class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									<span>{link.label}</span>
									{#if link.external}
										<svg class="size-3 text-muted-foreground/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M7 17l9.2-9.2M17 17V7H7" />
										</svg>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Legal links row -->
		{#if legalLinks.length > 0}
			<div class="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-border/60 pt-6">
				{#each legalLinks as link (link.href)}
					<a
						href={link.href}
						class="text-xs text-muted-foreground transition-colors hover:text-foreground"
					>
						{link.label}
					</a>
				{/each}
			</div>
		{/if}

		<!-- Bottom bar -->
		<div
			class="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row"
		>
			<p>{copyright}</p>
			{#if madeWithText}
				<p class="flex items-center gap-1.5">
					<span>{madeWithText}</span>
					<span class="text-rose-500">♥</span>
				</p>
			{/if}
		</div>
	</div>
</footer>

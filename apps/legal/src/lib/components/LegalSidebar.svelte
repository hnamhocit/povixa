<script lang="ts">
	import {
		IconFileText,
		IconShieldCheck,
		IconLock,
		IconCookie,
		IconServer,
		IconClock,
		IconCode,
		IconX,
		IconPrinter
	} from '@tabler/icons-svelte-runes';
	import { page } from '$app/state';
	import * as m from '#lib/paraglide/messages.js';

	let {
		mobileOpen = $bindable(false)
	}: {
		mobileOpen?: boolean;
	} = $props();

	const currentPath = $derived(page.url.pathname);

	const legalDocs = $derived([
		{ href: '/', title: m.tab_overview(), icon: IconShieldCheck, badge: 'Hub' },
		{ href: '/terms', title: m.tab_terms(), icon: IconFileText, badge: 'v2.4' },
		{ href: '/privacy', title: m.tab_privacy(), icon: IconLock, badge: 'GDPR' },
		{ href: '/dpa', title: m.tab_dpa(), icon: IconShieldCheck, badge: 'DPA' },
		{ href: '/cookies', title: m.tab_cookies(), icon: IconCookie, badge: 'Audit' },
		{ href: '/subprocessors', title: m.tab_subprocessors(), icon: IconServer, badge: 'Hạ tầng' },
		{ href: '/sla', title: m.tab_sla(), icon: IconClock, badge: '99.99%' },
		{ href: '/licenses', title: m.tab_licenses(), icon: IconCode, badge: 'AGPL/MIT' }
	]);
</script>

<!-- Desktop Sidebar with distinct solid white / card background and hidden scrollbars -->
<aside
	class="hidden lg:block w-72 shrink-0 border-r border-border bg-white dark:bg-card p-6 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-h-[calc(100vh-4rem)] sticky top-16 shadow-xs"
>
	<div class="mb-4 flex items-center justify-between pb-2 border-b border-border/80">
		<span class="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Văn bản Pháp lý</span>
		<span class="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">7 danh mục</span>
	</div>

	<nav class="space-y-1.5">
		{#each legalDocs as doc (doc.href)}
			{@const Icon = doc.icon}
			{@const isActive = currentPath === doc.href || (doc.href !== '/' && currentPath.startsWith(doc.href))}
			<a
				href={doc.href}
				class="flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors {isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}"
			>
				<div class="flex items-center gap-2.5 truncate">
					<Icon size={16} stroke={isActive ? 2.5 : 2} class={isActive ? 'text-primary' : 'text-muted-foreground'} />
					<span class="truncate">{doc.title}</span>
				</div>
				{#if doc.badge}
					<span class="ml-2 shrink-0 rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
						{doc.badge}
					</span>
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Compliance Contact Box -->
	<div class="mt-8 rounded-xl border border-border bg-background p-3.5 text-xs shadow-2xs">
		<p class="font-semibold text-foreground">Bộ phận Pháp chế (Legal Team)</p>
		<p class="mt-1 text-[11px] text-muted-foreground leading-relaxed">
			Cần bản ký kết DPA tùy chỉnh hoặc yêu cầu xác minh bảo mật doanh nghiệp?
		</p>
		<a
			href="mailto:legal@povixa.cloud"
			class="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs transition-colors"
		>
			<span>legal@povixa.cloud</span>
		</a>
	</div>
</aside>

<!-- Mobile Drawer -->
{#if mobileOpen}
	<div class="fixed inset-0 z-50 lg:hidden">
		<div
			class="fixed inset-0 bg-background/80 backdrop-blur-sm"
			onclick={() => (mobileOpen = false)}
			role="presentation"
		></div>

		<div class="fixed inset-y-0 left-0 w-80 bg-white dark:bg-card border-r border-border p-6 shadow-xl overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<div class="flex items-center justify-between pb-4 border-b border-border/80">
				<span class="font-bold text-foreground text-sm">Văn bản Pháp lý</span>
				<button
					type="button"
					onclick={() => (mobileOpen = false)}
					class="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
				>
					<IconX size={18} />
				</button>
			</div>

			<nav class="mt-4 space-y-1.5">
				{#each legalDocs as doc (doc.href)}
					{@const Icon = doc.icon}
					{@const isActive = currentPath === doc.href || (doc.href !== '/' && currentPath.startsWith(doc.href))}
					<a
						href={doc.href}
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors {isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}"
					>
						<div class="flex items-center gap-2.5 truncate">
							<Icon size={16} stroke={isActive ? 2.5 : 2} class={isActive ? 'text-primary' : 'text-muted-foreground'} />
							<span class="truncate">{doc.title}</span>
						</div>
						{#if doc.badge}
							<span class="ml-2 shrink-0 rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
								{doc.badge}
							</span>
						{/if}
					</a>
				{/each}
			</nav>
		</div>
	</div>
{/if}

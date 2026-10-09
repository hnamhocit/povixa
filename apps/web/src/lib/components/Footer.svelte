<script lang="ts">
	import { IconBrandGithub, IconBrandX, IconBrandDiscord } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const columns = [
		{
			title: () => m.footer_product(),
			links: [
				{ href: '/#modules', label: () => m.footer_all_modules() },
				{ href: '/#pricing', label: () => m.nav_pricing() },
				{ href: '/changelog', label: () => m.footer_changelog() },
				{ href: '/roadmap', label: () => m.footer_roadmap() },
				{ href: '/status', label: () => m.footer_status() }
			]
		},
		{
			title: () => m.footer_modules(),
			links: [
				{ href: '/id', label: () => 'Povixa ID' },
				{ href: '/config', label: () => 'Remote Config' },
				{ href: '/notifications', label: () => 'Notifications' },
				{ href: '/analytics', label: () => 'Analytics' },
				{ href: '/storage', label: () => 'Storage' }
			]
		},
		{
			title: () => m.footer_developers(),
			links: [
				{ href: '/docs', label: () => m.footer_documentation() },
				{ href: '/api', label: () => m.footer_api() },
				{ href: '/sdks', label: () => m.footer_sdks() },
				{ href: '/cli', label: () => m.footer_cli() },
				{ href: '/guides', label: () => m.footer_guides() }
			]
		},
		{
			title: () => m.footer_company(),
			links: [
				{ href: '/about', label: () => m.footer_about() },
				{ href: '/blog', label: () => m.nav_blog() },
				{ href: '/manifesto', label: () => m.footer_manifesto() },
				{ href: '/#sponsors', label: () => m.nav_sponsors() },
				{ href: '/contact', label: () => m.footer_contact() }
			]
		}
	];

	const legal = [
		{ href: '/legal/terms', label: () => m.footer_terms() },
		{ href: '/legal/privacy', label: () => m.footer_privacy() },
		{ href: '/legal/dpa', label: () => m.footer_dpa() },
		{ href: '/legal/cookies', label: () => m.footer_cookies() },
		{ href: '/legal/subprocessors', label: () => m.footer_subprocessors() }
	];

	const socials = [
		{ href: 'https://github.com/povixa', label: 'GitHub', icon: IconBrandGithub },
		{ href: 'https://x.com/povixa', label: 'X', icon: IconBrandX },
		{ href: 'https://discord.gg/povixa', label: 'Discord', icon: IconBrandDiscord }
	];

	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-border/60">
	<div class="mx-auto max-w-6xl px-6 py-16">
		<div class="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
			<!-- Brand column -->
			<div>
				<a href="/" class="flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
						<svg
							viewBox="0 0 24 24"
							class="h-4 w-4 text-primary-foreground"
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
					<span class="font-serif text-lg font-medium tracking-tight">Povixa</span>
				</a>

				<p class="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
					The control plane for modern applications.
				</p>

				<div class="mt-6 flex items-center gap-2">
					{#each socials as s (s.href)}
						<a
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={s.label}
							class="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
						>
							<s.icon size={16} stroke={1.75} />
						</a>
					{/each}
				</div>

				<a
					href="/status"
					class="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40"
				>
					<span class="relative flex h-1.5 w-1.5">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"
						></span>
						<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
					</span>
					{m.footer_status_ok()}
				</a>
			</div>

			{#each columns as col, cIdx (cIdx)}
				<div>
					<h3 class="font-sans text-sm font-medium text-foreground">{col.title()}</h3>
					<ul class="mt-4 space-y-2.5">
						{#each col.links as link (link.href)}
							<li>
								<a
									href={link.href}
									class="text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									{link.label()}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/60 pt-8">
			{#each legal as link (link.href)}
				<a
					href={link.href}
					class="text-xs text-muted-foreground transition-colors hover:text-foreground"
				>
					{link.label()}
				</a>
			{/each}
		</div>

		<div class="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
			<p class="text-xs text-muted-foreground">
				{m.footer_copyright({ year: String(currentYear) })}
			</p>
			<p class="text-xs text-muted-foreground">
				{m.footer_made_with()}
			</p>
		</div>
	</div>
</footer>

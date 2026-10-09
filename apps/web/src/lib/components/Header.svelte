<script lang="ts">
	import {
		IconArrowUpRight,
		IconChevronDown,
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconDatabase,
		IconFileText,
		IconMessageCircle,
		IconEye,
		IconMenu2,
		IconX,
		IconBrandGithub
	} from '@tabler/icons-svelte-runes';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import LanguageSwitcher from '#lib/components/LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';

	const modules = [
		{
			icon: IconFingerprint,
			get name() {
				return m.module_id_name();
			},
			get desc() {
				return m.module_id_tag();
			},
			href: '/id'
		},
		{
			icon: IconAdjustments,
			get name() {
				return m.module_config_name();
			},
			get desc() {
				return m.module_config_tag();
			},
			href: '/config'
		},
		{
			icon: IconBell,
			get name() {
				return m.module_notify_name();
			},
			get desc() {
				return m.module_notify_tag();
			},
			href: '/notifications'
		},
		{
			icon: IconChartHistogram,
			get name() {
				return m.module_analytics_name();
			},
			get desc() {
				return m.module_analytics_tag();
			},
			href: '/analytics'
		},
		{
			icon: IconDatabase,
			get name() {
				return m.module_storage_name();
			},
			get desc() {
				return m.module_storage_tag();
			},
			href: '/storage'
		},
		{
			icon: IconFileText,
			get name() {
				return m.module_legal_name();
			},
			get desc() {
				return m.module_legal_tag();
			},
			href: '/legal'
		},
		{
			icon: IconMessageCircle,
			get name() {
				return m.module_support_name();
			},
			get desc() {
				return m.module_support_tag();
			},
			href: '/support'
		},
		{
			icon: IconEye,
			get name() {
				return m.module_obs_name();
			},
			get desc() {
				return m.module_obs_tag();
			},
			href: '/observability'
		}
	];

	const navItems = [
		{ href: '/#pricing', label: () => m.nav_pricing() },
		{ href: '/#sponsors', label: () => m.nav_sponsors() },
		{ href: '/#contributors', label: () => m.footer_developers() }
	];

	let modulesOpen = $state(false);
	let mobileOpen = $state(false);
</script>

<header class="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
		<!-- Logo -->
		<div class="flex items-center gap-8">
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
				<span class="font-sans text-lg font-bold tracking-tight text-foreground">Povixa</span>
			</a>

			<!-- Desktop nav -->
			<nav class="hidden items-center gap-1 lg:flex">
				<div class="relative">
					<button
						type="button"
						onclick={() => (modulesOpen = !modulesOpen)}
						onblur={() => setTimeout(() => (modulesOpen = false), 150)}
						class="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						{m.nav_modules()}
						<IconChevronDown
							size={14}
							stroke={2}
							class="transition-transform {modulesOpen ? 'rotate-180' : ''}"
						/>
					</button>

					{#if modulesOpen}
						<div
							class="absolute top-full left-0 mt-2 w-[480px] rounded-lg border border-border bg-card p-2 shadow-lg"
						>
							<div class="grid grid-cols-2 gap-1">
								{#each modules as module (module.href)}
									<a
										href={module.href}
										class="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
									>
										<div
											class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
										>
											<module.icon size={16} stroke={1.75} />
										</div>
										<div class="min-w-0">
											<div class="flex items-center gap-1.5">
												<p class="text-sm font-medium text-foreground">{module.name}</p>
												<IconArrowUpRight
													size={12}
													class="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
													stroke={2}
												/>
											</div>
											<p class="mt-0.5 text-xs text-muted-foreground">{module.desc}</p>
										</div>
									</a>
								{/each}
							</div>
							<div class="mt-2 border-t border-border pt-2">
								<a
									href="/modules"
									class="flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
								>
									{m.nav_view_all_modules()}
									<IconArrowUpRight size={14} stroke={2} />
								</a>
							</div>
						</div>
					{/if}
				</div>

				{#each navItems as item (item.href)}
					<a
						href={item.href}
						class="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						{item.label()}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Right side -->
		<div class="flex items-center gap-2">
			<LanguageSwitcher />
			<ThemeToggle />

			<div class="mx-2 hidden h-6 w-px bg-border sm:block"></div>

			<a
				href="https://github.com/povixa/povixa"
				target="_blank"
				rel="noopener noreferrer"
				class="hidden items-center gap-1.5 rounded-lg border border-border/80 bg-card/80 px-2.5 py-1.5 font-mono text-xs font-medium text-foreground/90 shadow-2xs backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-muted sm:inline-flex"
				title="Star on GitHub"
			>
				<IconBrandGithub size={15} stroke={2} />
				<span class="font-bold">4.9k</span>
				<span class="text-amber-400">★</span>
			</a>

			<a
				href="https://id.povixa.cloud/login"
				class="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
			>
				{m.nav_sign_in()}
			</a>
			<a
				href="https://id.povixa.cloud/register"
				class="hidden h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
			>
				{m.nav_get_started()}
				<IconArrowUpRight size={14} stroke={2} />
			</a>

			<button
				type="button"
				onclick={() => (mobileOpen = !mobileOpen)}
				class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
				aria-label={mobileOpen ? m.nav_close() : m.nav_menu()}
			>
				{#if mobileOpen}
					<IconX size={18} stroke={2} />
				{:else}
					<IconMenu2 size={18} stroke={2} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="border-t border-border/60 bg-background lg:hidden">
			<nav class="mx-auto max-w-6xl space-y-1 px-6 py-4">
				<p class="px-3 py-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
					{m.nav_modules()}
				</p>
				{#each modules as module (module.href)}
					<a
						href={module.href}
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
					>
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
						>
							<module.icon size={16} stroke={1.75} />
						</div>
						<div>
							<p class="font-medium">{module.name}</p>
							<p class="text-xs text-muted-foreground">{module.desc}</p>
						</div>
					</a>
				{/each}

				<p
					class="mt-4 px-3 py-2 text-xs font-medium tracking-widest text-muted-foreground uppercase"
				>
					More
				</p>
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						onclick={() => (mobileOpen = false)}
						class="block rounded-md px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
					>
						{item.label()}
					</a>
				{/each}

				<div class="mt-4 flex flex-col gap-2 border-t border-border pt-4">
					<a
						href="https://id.povixa.cloud/login"
						class="flex h-10 items-center justify-center rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:bg-accent"
					>
						{m.nav_sign_in()}
					</a>
					<a
						href="https://id.povixa.cloud/register"
						class="flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						{m.nav_get_started()}
						<IconArrowUpRight size={14} stroke={2} />
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>

<script lang="ts">
	import {
		IconSearch,
		IconBrandGithub,
		IconExternalLink,
		IconMenu2
	} from '@tabler/icons-svelte-runes';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import LanguageSwitcher from '#lib/components/LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';

	let { onToggleSidebar }: { onToggleSidebar?: () => void } = $props();
</script>

<!-- Header with distinct solid white / card background separating sharply from the canvas -->
<header class="sticky top-0 z-40 border-b border-border bg-white dark:bg-card shadow-xs">
	<div class="flex h-16 w-full items-center justify-between px-6 sm:px-8 lg:px-10">
		<!-- Left: Mobile Sidebar Trigger + Logo + Version -->
		<div class="flex items-center gap-3 sm:gap-4">
			{#if onToggleSidebar}
				<button
					type="button"
					onclick={onToggleSidebar}
					class="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground lg:hidden hover:bg-muted"
					aria-label="Toggle navigation menu"
				>
					<IconMenu2 size={18} />
				</button>
			{/if}

			<a href="/" class="flex items-center gap-2.5">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
					<svg
						viewBox="0 0 24 24"
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
					</svg>
				</div>
				<div class="flex items-center gap-1.5">
					<span class="font-bold text-foreground text-base tracking-tight">Povixa</span>
					<span class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
						Docs
					</span>
				</div>
			</a>

			<!-- Version Selector Dropdown Indicator -->
			<div class="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground shadow-2xs">
				<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
				<span>v0.9.4</span>
			</div>
		</div>

		<!-- Center: Quick Search Trigger Button -->
		<div class="hidden md:flex flex-1 max-w-md mx-6">
			<div class="relative w-full">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
					<IconSearch size={15} />
				</div>
				<input
					type="text"
					placeholder={m.search_placeholder()}
					class="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-14 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
				/>
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
					<kbd class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
				</div>
			</div>
		</div>

		<!-- Right: Quick Links + i18n LanguageSwitcher + ThemeToggle -->
		<div class="flex items-center gap-2 sm:gap-2.5">
			<a
				href="https://console.povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-2xs"
			>
				<span>Console</span>
				<IconExternalLink size={12} class="opacity-70" />
			</a>

			<a
				href="https://povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
			>
				<span>Povixa.cloud</span>
			</a>

			<a
				href="https://github.com/hnamhocit/povixa"
				target="_blank"
				rel="noopener noreferrer"
				class="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shadow-2xs"
				aria-label="GitHub Repository"
			>
				<IconBrandGithub size={17} />
			</a>

			<LanguageSwitcher />

			<ThemeToggle />
		</div>
	</div>
</header>

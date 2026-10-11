<script lang="ts">
	import {
		IconSearch,
		IconBrandGithub,
		IconExternalLink,
		IconMenu2,
		IconShieldCheck
	} from '@tabler/icons-svelte-runes';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import LanguageSwitcher from '#lib/components/LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';

	let { onToggleSidebar }: { onToggleSidebar?: () => void } = $props();
</script>

<header class="sticky top-0 z-40 border-b border-border bg-white dark:bg-card shadow-xs">
	<div class="flex h-16 w-full items-center justify-between px-6 sm:px-8 lg:px-10">
		<!-- Left: Trigger + Logo + Status Pill -->
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
					<IconShieldCheck size={18} stroke={2.5} />
				</div>
				<div class="flex items-center gap-1.5">
					<span class="font-bold text-foreground text-base tracking-tight">Povixa</span>
					<span class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
						Legal
					</span>
				</div>
			</a>

			<div class="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground shadow-2xs">
				<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
				<span>GDPR &amp; CCPA Ready</span>
			</div>
		</div>

		<!-- Center: Search Input -->
		<div class="hidden md:flex flex-1 max-w-md mx-6">
			<div class="relative w-full">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
					<IconSearch size={15} />
				</div>
				<input
					type="text"
					placeholder={m.search_legal()}
					class="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-14 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
				/>
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
					<kbd class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
				</div>
			</div>
		</div>

		<!-- Right: Quick Links + i18n + Theme -->
		<div class="flex items-center gap-2 sm:gap-2.5">
			<a
				href="https://docs.povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
			>
				<span>Docs</span>
			</a>

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

			<LanguageSwitcher />

			<ThemeToggle />
		</div>
	</div>
</header>

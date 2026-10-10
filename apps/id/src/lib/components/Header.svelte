<script lang="ts">
	import { IconArrowUpRight, IconMenu2, IconX } from '@tabler/icons-svelte-runes';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import * as m from '#lib/paraglide/messages.js';

	let mobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-40 w-full border-b border-border/70 bg-card transition-colors">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Brand Logo -->
		<div class="flex items-center gap-3">
			<a href="/" class="group flex items-center gap-2.5">
				<div
					class="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105"
				>
					<svg class="size-5" viewBox="0 0 32 32" fill="none">
						<path
							d="M16 6.5L5 12l11 5.5L27 12 16 6.5z"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M5 21l11 5.5 11-5.5"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M5 16.5l11 5.5 11-5.5"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-lg font-bold tracking-tight text-foreground">Povixa</span>
					<span
						class="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-primary"
					>
						AUTH SSO
					</span>
				</div>
			</a>
		</div>

		<!-- Desktop Navigation Links -->
		<nav class="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
			<a href="#features" class="transition-colors hover:text-foreground"> Tính năng </a>
			<a
				href="https://docs.povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="transition-colors hover:text-foreground"
			>
				{m.nav_docs()}
			</a>
			<a
				href="https://status.povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="flex items-center gap-1.5 transition-colors hover:text-foreground"
			>
				<span class="size-2 animate-pulse rounded-full bg-emerald-500"></span>
				<span>{m.nav_status()}</span>
			</a>
		</nav>

		<!-- Right Controls & CTA -->
		<div class="flex items-center gap-2.5">
			<LanguageSwitcher />
			<ThemeToggle />

			<a
				href="https://povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="hidden items-center gap-1.5 rounded-lg border border-border/80 bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-border hover:bg-accent sm:inline-flex"
			>
				<span>{m.nav_platform()}</span>
				<IconArrowUpRight size={14} class="text-muted-foreground" />
			</a>

			<!-- Mobile menu button -->
			<button
				type="button"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<IconX size={18} />
				{:else}
					<IconMenu2 size={18} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile dropdown menu -->
	{#if mobileMenuOpen}
		<div
			class="animate-in space-y-3 border-b border-border bg-card/95 px-4 py-4 backdrop-blur-lg duration-200 slide-in-from-top md:hidden"
		>
			<a
				href="#features"
				onclick={() => (mobileMenuOpen = false)}
				class="block text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				Tính năng
			</a>
			<a
				href="https://docs.povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="block text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				{m.nav_docs()}
			</a>
			<a
				href="https://status.povixa.cloud"
				target="_blank"
				rel="noreferrer"
				class="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				<span class="size-2 rounded-full bg-emerald-500"></span>
				<span>{m.nav_status()}</span>
			</a>
			<div class="border-t border-border/60 pt-2">
				<a
					href="https://povixa.cloud"
					target="_blank"
					rel="noreferrer"
					class="flex items-center justify-between rounded-lg bg-accent px-3 py-2 text-xs font-medium text-foreground"
				>
					<span>{m.nav_platform()}</span>
					<IconArrowUpRight size={14} />
				</a>
			</div>
		</div>
	{/if}
</header>

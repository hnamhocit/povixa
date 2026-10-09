<script lang="ts">
	import {
		IconBolt,
		IconCopy,
		IconCheck,
		IconHeartHandshake,
		IconShieldCheck,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let badgeVariant = $state<'dark' | 'light'>('dark');
	let snippetFormat = $state<'html' | 'markdown' | 'react'>('html');
	let copied = $state(false);

	let codeSnippets = $derived.by<Record<'html' | 'markdown' | 'react', string>>(() => ({
		html: `<a href="https://povixa.cloud" target="_blank" rel="noopener">
  <img src="https://povixa.cloud/badge-${badgeVariant === 'dark' ? 'dark' : 'light'}.svg" alt="Powered by Povixa" height="32" />
</a>`,
		markdown: `[![Powered by Povixa](https://povixa.cloud/badge-${badgeVariant === 'dark' ? 'dark' : 'light'}.svg)](https://povixa.cloud)`,
		react: `// React / Svelte / Vue
<a href="https://povixa.cloud" target="_blank" rel="noopener" className="inline-flex">
  <img src="https://povixa.cloud/badge-${badgeVariant === 'dark' ? 'dark' : 'light'}.svg" alt="Powered by Povixa" height="32" />
</a>`
	}));

	async function copyBadgeCode() {
		try {
			await navigator.clipboard.writeText(codeSnippets[snippetFormat]);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy', err);
		}
	}
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-card via-card/95 to-background p-6 shadow-2xl md:p-10 lg:p-12"
>
	<!-- Ambient atmospheric background glow -->
	<div
		class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl"
	></div>

	<!-- Top Row: Philosophy & Interactive Badge Sandbox -->
	<div class="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
		<!-- Left: Philosophy & Direct Message -->
		<div class="space-y-5">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-xs font-semibold text-primary"
			>
				<IconHeartHandshake size={15} stroke={2.5} />
				<span>{m.badge_pact_badge()}</span>
			</div>

			<h3
				class="font-sans text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl lg:leading-[1.2]"
			>
				{m.badge_pact_title()}
			</h3>

			<p class="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
				{m.badge_pact_desc()}
			</p>
		</div>

		<!-- Right: Interactive Badge Sandbox & Snippet Copier -->
		<div
			class="rounded-2xl border border-border/90 bg-card/95 p-5 shadow-xl backdrop-blur-md sm:p-6"
		>
			<div class="flex items-center justify-between border-b border-border/80 pb-3.5">
				<span class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
					{m.badge_preview_title()}
				</span>

				<!-- Variant switch -->
				<div class="flex items-center rounded-lg border border-border bg-muted/50 p-1 text-xs">
					<button
						type="button"
						onclick={() => (badgeVariant = 'dark')}
						class="rounded-md px-3 py-1 font-semibold transition-all {badgeVariant === 'dark'
							? 'bg-foreground text-background shadow-xs'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						Dark
					</button>
					<button
						type="button"
						onclick={() => (badgeVariant = 'light')}
						class="rounded-md px-3 py-1 font-semibold transition-all {badgeVariant === 'light'
							? 'bg-foreground text-background shadow-xs'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						Light
					</button>
				</div>
			</div>

			<!-- Live Badge Rendered Preview Box -->
			<div
				class="my-5 flex min-h-[100px] items-center justify-center rounded-xl border p-6 transition-all {badgeVariant ===
				'dark'
					? 'border-zinc-800 bg-[#0d1117]'
					: 'border-zinc-200 bg-white'}"
			>
				<!-- The actual Badge component preview -->
				<a
					href="https://povixa.cloud"
					target="_blank"
					rel="noopener noreferrer"
					class="group inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-xs font-semibold shadow-md transition-all hover:scale-105 {badgeVariant ===
					'dark'
						? 'border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-primary/60 hover:shadow-primary/20'
						: 'border-zinc-300 bg-zinc-50 text-zinc-900 hover:border-primary/60 hover:shadow-primary/10'}"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
					</span>
					<span class="font-bold text-primary">⚡</span>
					<span>Powered by <strong class="tracking-tight text-primary">Povixa</strong></span>
				</a>
			</div>

			<!-- Format Tabs & One-Click Copy -->
			<div class="flex items-center justify-between border-t border-border/80 pt-3.5">
				<div class="flex items-center gap-1 font-mono text-xs">
					<button
						type="button"
						onclick={() => (snippetFormat = 'html')}
						class="rounded-md px-2.5 py-1 font-medium transition-colors {snippetFormat === 'html'
							? 'bg-primary/15 font-bold text-primary'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						HTML
					</button>
					<button
						type="button"
						onclick={() => (snippetFormat = 'markdown')}
						class="rounded-md px-2.5 py-1 font-medium transition-colors {snippetFormat ===
						'markdown'
							? 'bg-primary/15 font-bold text-primary'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						Markdown
					</button>
					<button
						type="button"
						onclick={() => (snippetFormat = 'react')}
						class="rounded-md px-2.5 py-1 font-medium transition-colors {snippetFormat === 'react'
							? 'bg-primary/15 font-bold text-primary'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						React / Svelte
					</button>
				</div>

				<button
					type="button"
					onclick={copyBadgeCode}
					class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
				>
					{#if copied}
						<IconCheck size={14} stroke={3} />
						<span>{m.badge_copied()}</span>
					{:else}
						<IconCopy size={14} stroke={2} />
						<span>{m.badge_copy_snippet()}</span>
					{/if}
				</button>
			</div>

			<!-- Snippet Code Box with clear syntax styling -->
			<div
				class="mt-3 overflow-hidden rounded-xl border border-border/80 bg-background/80 p-3.5 font-mono text-xs text-foreground/90 shadow-inner"
			>
				<pre class="overflow-x-auto font-mono leading-relaxed whitespace-pre"><code
						>{codeSnippets[snippetFormat]}</code
					></pre>
			</div>
		</div>
	</div>

	<!-- Bottom Row: 3 Full-Width High-Contrast Feature Cards (Wide & Easy to Read) -->
	<div class="mt-10 grid gap-4 border-t border-border/80 pt-8 sm:grid-cols-3 sm:gap-6">
		<div
			class="flex items-start gap-4 rounded-xl border border-border/80 bg-background/70 p-5 shadow-xs transition-all hover:border-primary/40 hover:bg-background"
		>
			<div
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 shadow-xs"
			>
				<IconBolt size={22} stroke={2.2} />
			</div>
			<div>
				<h4 class="font-sans text-sm font-bold text-foreground sm:text-base">
					{m.badge_pact_point1_title()}
				</h4>
				<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
					{m.badge_pact_point1_desc()}
				</p>
			</div>
		</div>

		<div
			class="flex items-start gap-4 rounded-xl border border-border/80 bg-background/70 p-5 shadow-xs transition-all hover:border-primary/40 hover:bg-background"
		>
			<div
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs"
			>
				<IconShieldCheck size={22} stroke={2.2} />
			</div>
			<div>
				<h4 class="font-sans text-sm font-bold text-foreground sm:text-base">
					{m.badge_pact_point2_title()}
				</h4>
				<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
					{m.badge_pact_point2_desc()}
				</p>
			</div>
		</div>

		<div
			class="flex items-start gap-4 rounded-xl border border-border/80 bg-background/70 p-5 shadow-xs transition-all hover:border-primary/40 hover:bg-background"
		>
			<div
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 shadow-xs"
			>
				<IconSparkles size={22} stroke={2.2} />
			</div>
			<div>
				<h4 class="font-sans text-sm font-bold text-foreground sm:text-base">
					{m.badge_pact_point3_title()}
				</h4>
				<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
					{m.badge_pact_point3_desc()}
				</p>
			</div>
		</div>
	</div>
</div>

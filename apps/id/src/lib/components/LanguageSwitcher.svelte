<script lang="ts">
	import { IconLanguage, IconCheck } from '@tabler/icons-svelte-runes';
	import { getLocale, setLocale } from '#lib/paraglide/runtime.js';
	import * as m from '#lib/paraglide/messages.js';

	let open = $state(false);

	const languages = [
		{ code: 'en' as const, label: 'English', flag: '🇬🇧' },
		{ code: 'vi' as const, label: 'Tiếng Việt', flag: '🇻🇳' }
	];

	function selectLang(code: 'en' | 'vi') {
		setLocale(code);
		if (typeof document !== 'undefined') {
			document.cookie = `PARAGLIDE_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
			document.documentElement.lang = code;
		}
		open = false;
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	}
</script>

<div class="relative">
	<button
		type="button"
		onclick={() => (open = !open)}
		onblur={() => setTimeout(() => (open = false), 150)}
		class="flex h-9 items-center gap-1.5 rounded-lg border border-border/40 bg-card/50 px-2.5 text-sm text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:bg-accent hover:text-foreground"
		aria-label={m.lang_toggle()}
	>
		<IconLanguage size={16} stroke={2} />
		<span class="text-xs font-medium tracking-wider">{getLocale().toUpperCase()}</span>
	</button>

	{#if open}
		<div
			class="absolute top-full right-0 z-50 mt-2 w-40 rounded-xl border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur-md"
		>
			{#each languages as lang (lang.code)}
				<button
					type="button"
					onclick={() => selectLang(lang.code)}
					class="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-accent"
				>
					<span class="flex items-center gap-2">
						<span class="text-base">{lang.flag}</span>
						<span class="font-medium">{lang.label}</span>
					</span>
					{#if getLocale() === lang.code}
						<IconCheck size={14} class="text-primary" stroke={2.5} />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

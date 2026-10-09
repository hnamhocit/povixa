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
		open = false;
		// Reload để update SSR content
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
		class="flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
		aria-label={m.lang_switch()}
	>
		<IconLanguage size={16} stroke={2} />
		<span class="hidden sm:inline">{getLocale().toUpperCase()}</span>
	</button>

	{#if open}
		<div
			class="absolute top-full right-0 z-50 mt-2 w-44 rounded-lg border border-border bg-card p-1 shadow-lg"
		>
			{#each languages as lang (lang.code)}
				<button
					type="button"
					onclick={() => selectLang(lang.code)}
					class="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
				>
					<span class="flex items-center gap-2">
						<span>{lang.flag}</span>
						<span>{lang.label}</span>
					</span>
					{#if getLocale() === lang.code}
						<IconCheck size={14} class="text-primary" stroke={2.5} />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

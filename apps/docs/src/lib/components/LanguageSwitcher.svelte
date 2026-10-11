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
		class="flex h-9 items-center gap-1.5 rounded-lg border border-border/80 bg-card px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shadow-2xs"
		aria-label={m.lang_switch()}
	>
		<IconLanguage size={15} stroke={2} />
		<span class="font-mono">{getLocale().toUpperCase()}</span>
	</button>

	{#if open}
		<div
			class="absolute top-full right-0 z-50 mt-1.5 w-40 rounded-xl border border-border/80 bg-card p-1 shadow-lg"
		>
			{#each languages as lang (lang.code)}
				<button
					type="button"
					onclick={() => selectLang(lang.code)}
					class="flex w-full items-center justify-between gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
				>
					<span class="flex items-center gap-2">
						<span>{lang.flag}</span>
						<span>{lang.label}</span>
					</span>
					{#if getLocale() === lang.code}
						<IconCheck size={13} class="text-primary" stroke={2.5} />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

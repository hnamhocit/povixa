<script lang="ts">
	import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-svelte-runes';
	import { toggleMode, mode } from 'mode-watcher';

	const CurrentIcon = $derived(
		mode.current === 'dark' ? IconMoon : mode.current === 'light' ? IconSun : IconDeviceDesktop
	);
</script>

<button
	type="button"
	onclick={toggleMode}
	class="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground shadow-2xs"
	aria-label="Toggle theme"
>
	<CurrentIcon size={16} stroke={2} />
</button>

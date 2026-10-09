<script lang="ts">
	import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-svelte-runes';
	import { toggleMode, mode } from 'mode-watcher';
	import * as m from '#lib/paraglide/messages.js';

	const CurrentIcon = $derived(
		mode.current === 'dark' ? IconMoon : mode.current === 'light' ? IconSun : IconDeviceDesktop
	);
</script>

<div class="relative">
	<button
		type="button"
		onclick={toggleMode}
		class="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
		aria-label={m.theme_toggle()}
	>
		<CurrentIcon size={16} stroke={2} />
	</button>
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/auth', { replaceState: true });
	});
</script>

<div class="flex min-h-[50vh] items-center justify-center text-xs text-muted-foreground">
	Redirecting to Povixa Auth...
</div>

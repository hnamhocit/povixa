<script lang="ts">
	import AuthCard from '#lib/components/AuthCard.svelte';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.auth_tab_register()} — Povixa ID</title>
</svelte:head>

<section class="flex flex-1 items-center justify-center px-4 py-12 sm:py-20">
	<div class="w-full max-w-md">
		<AuthCard initialTab="register" />
	</div>
</section>

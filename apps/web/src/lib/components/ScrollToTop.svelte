<script lang="ts">
	import { IconArrowUp } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let visible = $state(false);

	$effect(() => {
		const handleScroll = () => {
			visible = window.scrollY > 350;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<div
	class="fixed right-6 bottom-6 z-50 transition-all duration-300 {visible
		? 'pointer-events-auto translate-y-0 opacity-100'
		: 'pointer-events-none translate-y-4 opacity-0'}"
>
	<button
		type="button"
		onclick={scrollToTop}
		class="group flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/85 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary hover:text-primary-foreground hover:shadow-primary/20"
		aria-label={m.scroll_to_top()}
		title={m.scroll_to_top()}
	>
		<IconArrowUp
			size={18}
			stroke={2.5}
			class="transition-transform duration-200 group-hover:-translate-y-0.5"
		/>
	</button>
</div>

<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div
	class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[920px] overflow-hidden select-none {className}"
	aria-hidden="true"
>
	<!-- Top Horizon Beam -->
	<div
		class="absolute top-0 left-1/2 h-[1px] w-full max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
	></div>
	<div
		class="absolute top-0 left-1/2 h-[2px] w-2/3 max-w-3xl -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent blur-[2px]"
	></div>

	<!-- Aurora Flowing Container with radial vignette mask -->
	<div class="aurora-mask absolute inset-0 overflow-hidden">
		<!-- Aurora Ribbon 1: Electric Teal & Emerald -->
		<div
			class="aurora-wave aurora-wave-1 absolute -top-40 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-[100%] opacity-50 blur-[80px] sm:blur-[105px] dark:opacity-75"
			style="background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.45) 0%, rgba(6, 182, 212, 0.4) 35%, rgba(59, 130, 246, 0.2) 65%, transparent 80%);"
		></div>

		<!-- Aurora Ribbon 2: Cosmic Violet, Indigo & Fuchsia -->
		<div
			class="aurora-wave aurora-wave-2 absolute -top-24 left-[20%] h-[500px] w-[800px] -translate-x-1/2 rounded-[100%] opacity-45 blur-[85px] sm:blur-[110px] dark:opacity-70"
			style="background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.45) 0%, rgba(236, 72, 153, 0.35) 40%, rgba(99, 102, 241, 0.15) 70%, transparent 85%);"
		></div>

		<!-- Aurora Ribbon 3: Deep Sky Blue & Radiant Cyan -->
		<div
			class="aurora-wave aurora-wave-3 absolute -top-20 right-[15%] h-[520px] w-[850px] translate-x-1/4 rounded-[100%] opacity-40 blur-[90px] sm:blur-[115px] dark:opacity-65"
			style="background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.5) 0%, rgba(16, 185, 129, 0.3) 45%, rgba(129, 140, 248, 0.15) 75%, transparent 90%);"
		></div>

		<!-- Aurora Ribbon 4: Central High-intensity Core -->
		<div
			class="aurora-wave aurora-wave-4 absolute -top-10 left-1/2 h-[380px] w-[620px] -translate-x-1/2 rounded-full opacity-35 blur-[75px] dark:opacity-60"
			style="background: radial-gradient(circle at center, rgba(52, 211, 153, 0.4) 0%, rgba(96, 165, 250, 0.25) 45%, transparent 75%);"
		></div>
	</div>

	<!-- Atmospheric Starfield / Sparkles (Subtle Developer Tech Aesthetics) -->
	<div
		class="absolute inset-0 opacity-[0.25] dark:opacity-[0.45]"
		style="background-image: radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px); background-size: 32px 32px; mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 80%); -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 80%);"
	></div>

	<!-- Subtle Tech Grid Accent -->
	<div
		class="absolute inset-0 opacity-[0.15] dark:opacity-[0.28]"
		style="background-image: linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 85% 65% at 50% 25%, black 25%, transparent 85%); -webkit-mask-image: radial-gradient(ellipse 85% 65% at 50% 25%, black 25%, transparent 85%);"
	></div>
</div>

<style>
	.aurora-mask {
		mask-image: radial-gradient(ellipse 95% 75% at 50% 20%, black 40%, transparent 95%);
		-webkit-mask-image: radial-gradient(ellipse 95% 75% at 50% 20%, black 40%, transparent 95%);
	}

	.aurora-wave {
		will-change: transform;
		transform-origin: center center;
	}

	.aurora-wave-1 {
		animation: aurora-flow-1 20s ease-in-out infinite alternate;
	}

	.aurora-wave-2 {
		animation: aurora-flow-2 24s ease-in-out infinite alternate;
	}

	.aurora-wave-3 {
		animation: aurora-flow-3 22s ease-in-out infinite alternate;
	}

	.aurora-wave-4 {
		animation: aurora-flow-4 16s ease-in-out infinite alternate;
	}

	@keyframes aurora-flow-1 {
		0% {
			transform: translate3d(-50%, 0, 0) rotate(0deg) scale(1);
		}
		50% {
			transform: translate3d(-46%, 30px, 0) rotate(4deg) scale(1.08);
		}
		100% {
			transform: translate3d(-54%, -20px, 0) rotate(-3deg) scale(0.96);
		}
	}

	@keyframes aurora-flow-2 {
		0% {
			transform: translate3d(-50%, 0, 0) rotate(0deg) scale(1);
		}
		50% {
			transform: translate3d(-42%, -25px, 0) rotate(-6deg) scale(1.12);
		}
		100% {
			transform: translate3d(-56%, 35px, 0) rotate(5deg) scale(0.92);
		}
	}

	@keyframes aurora-flow-3 {
		0% {
			transform: translate3d(25%, 0, 0) rotate(0deg) scale(1);
		}
		50% {
			transform: translate3d(20%, 30px, 0) rotate(5deg) scale(1.06);
		}
		100% {
			transform: translate3d(30%, -20px, 0) rotate(-4deg) scale(0.95);
		}
	}

	@keyframes aurora-flow-4 {
		0% {
			transform: translate3d(-50%, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(-50%, 20px, 0) scale(1.15);
		}
		100% {
			transform: translate3d(-50%, -15px, 0) scale(0.9);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.aurora-wave {
			animation: none !important;
		}
	}
</style>

<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div
	class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[880px] overflow-hidden select-none {className}"
	aria-hidden="true"
>
	<!-- ═══════════ TOP HORIZON ACCENT BEAM ═══════════ -->
	<div
		class="absolute top-0 left-1/2 h-[1px] w-full max-w-[1200px] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
	></div>
	<div
		class="absolute top-0 left-1/2 h-[2px] w-1/3 max-w-lg -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-[1px]"
	></div>

	<!-- ═══════════ CENTRAL AMBIENT LIGHT CONE (SINGLE UNIFIED ACCENT) ═══════════ -->
	<!-- Dark mode subtle radiance -->
	<div
		class="absolute top-0 left-1/2 h-[650px] w-[1100px] -translate-x-1/2 opacity-0 dark:opacity-100 transition-opacity"
		style="background: radial-gradient(ellipse 65% 50% at 50% 0%, rgba(99, 102, 241, 0.16) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%);"
	></div>

	<!-- Light mode ultra-clean soft radiance (NO messy rainbow blobs) -->
	<div
		class="absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 opacity-100 dark:opacity-0 transition-opacity"
		style="background: radial-gradient(ellipse 60% 45% at 50% 0%, rgba(99, 102, 241, 0.06) 0%, rgba(56, 189, 248, 0.03) 50%, transparent 75%);"
	></div>

	<!-- ═══════════ TECHNICAL CAD COORDINATE GRID ═══════════ -->
	<!-- Fine engineering grid with radial vignette mask -->
	<div
		class="absolute inset-0 opacity-40 dark:opacity-30"
		style="background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 48px 48px; color: var(--border); mask-image: radial-gradient(ellipse 70% 55% at 50% 25%, black 20%, transparent 85%); -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 25%, black 20%, transparent 85%);"
	></div>

	<!-- Delicate Tech Dot Matrix Layer -->
	<div
		class="absolute inset-0 opacity-30 dark:opacity-40"
		style="background-image: radial-gradient(currentColor 1px, transparent 1px); background-size: 24px 24px; color: var(--muted-foreground); mask-image: radial-gradient(ellipse 55% 45% at 50% 25%, black 15%, transparent 80%); -webkit-mask-image: radial-gradient(ellipse 55% 45% at 50% 25%, black 15%, transparent 80%);"
	></div>

	<!-- ═══════════ CONCENTRIC ANYCAST RADAR ARCS ═══════════ -->
	<div
		class="absolute -top-32 left-1/2 h-[700px] w-[1200px] -translate-x-1/2 opacity-25 dark:opacity-20"
	>
		<svg viewBox="0 0 1200 700" class="h-full w-full stroke-foreground/40 fill-none" aria-hidden="true">
			<!-- Concentric orbital coordinate arcs -->
			<circle cx="600" cy="100" r="280" stroke-width="1" stroke-dasharray="4 6" />
			<circle cx="600" cy="100" r="420" stroke-width="1" stroke-dasharray="3 8" />
			<circle cx="600" cy="100" r="560" stroke-width="0.8" stroke-dasharray="2 10" />

			<!-- Radial coordinate crosshairs -->
			<line x1="600" y1="0" x2="600" y2="600" stroke-width="0.8" stroke-dasharray="4 4" stroke-opacity="0.3" />
			<line x1="200" y1="100" x2="1000" y2="100" stroke-width="0.8" stroke-dasharray="4 4" stroke-opacity="0.3" />

			<!-- Subtle Crosshair intersection markers (+) -->
			<g stroke-width="1.2" class="stroke-foreground/60">
				<!-- Left marker -->
				<path d="M320 95v10M315 100h10" />
				<!-- Right marker -->
				<path d="M880 95v10M875 100h10" />
				<!-- Center lower marker -->
				<path d="M600 375v10M595 380h10" />
			</g>
		</svg>
	</div>
</div>

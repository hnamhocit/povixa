<script lang="ts">
	import { IconBrandGithub } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const cols = 40;
	const rows = 12;

	// Exact 1-dot thickness glyphs matching Supabase's physical LED dot matrix
	const litDots = new Set<string>();

	// Digit 4 (cols 4..9, rows 2..9)
	litDots.add('4,2');
	litDots.add('8,2');
	litDots.add('4,3');
	litDots.add('8,3');
	litDots.add('4,4');
	litDots.add('8,4');
	litDots.add('4,5');
	litDots.add('8,5');
	for (let c = 3; c <= 9; c++) litDots.add(`${c},6`);
	litDots.add('8,7');
	litDots.add('8,8');
	litDots.add('8,9');

	// Period . (col 13, row 9)
	litDots.add('13,9');

	// Digit 9 (cols 17..22, rows 2..9)
	for (let c = 18; c <= 21; c++) litDots.add(`${c},2`);
	litDots.add('17,3');
	litDots.add('22,3');
	litDots.add('17,4');
	litDots.add('22,4');
	for (let c = 17; c <= 22; c++) litDots.add(`${c},5`);
	litDots.add('22,6');
	litDots.add('22,7');
	litDots.add('17,8');
	litDots.add('22,8');
	for (let c = 18; c <= 21; c++) litDots.add(`${c},9`);

	// Letter k (cols 26..31, rows 1..9)
	for (let r = 1; r <= 9; r++) litDots.add(`26,${r}`);
	litDots.add('31,4');
	litDots.add('30,5');
	litDots.add('29,6');
	litDots.add('28,6');
	litDots.add('27,6');
	litDots.add('29,7');
	litDots.add('30,8');
	litDots.add('31,9');

	// Vibrant emerald multi-tone palette for physical LED shimmer
	const palette = ['#059669', '#10B981', '#3ECF8E', '#34D399'];

	interface Dot {
		c: number;
		r: number;
		x: number;
		y: number;
		isLit: boolean;
		opacity: number;
		color: string;
	}

	const dots: Dot[] = [];
	const cx = 19;
	const cy = 5.5;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const isLit = litDots.has(`${c},${r}`);
			// Smooth radial oval falloff from center (matching Supabase vignette)
			const dist = Math.sqrt(Math.pow((c - cx) / 20, 2) + Math.pow((r - cy) / 5.5, 2));

			if (dist > 1.15 && !isLit) continue;

			const bgOpacity = Math.max(0, (1 - Math.pow(dist, 1.4)) * 0.22);
			const colorIdx = (c * 7 + r * 13) % palette.length;

			dots.push({
				c,
				r,
				x: c * 14 + 10,
				y: r * 14 + 10,
				isLit,
				opacity: isLit ? 1 : bgOpacity,
				color: isLit ? palette[colorIdx] : 'currentColor'
			});
		}
	}
</script>

<div class="grid items-center gap-12 lg:grid-cols-[1.1fr_1.2fr] lg:gap-16">
	<!-- Left: Philosophy & CTA -->
	<div>
		<h2
			class="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
		>
			{m.oss_title()}
		</h2>

		<p class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
			{m.oss_desc()}
		</p>

		<div class="mt-8">
			<a
				href="https://github.com/hnamhocit/povixa"
				target="_blank"
				rel="noopener noreferrer"
				class="group inline-flex h-11 items-center gap-2.5 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-xs transition-all hover:border-primary/50 hover:bg-muted"
			>
				<IconBrandGithub size={18} stroke={2} />
				<span>{m.oss_cta_github()}</span>
			</a>
		</div>
	</div>

	<!-- Right: Floating Seamless Supabase-style Pixel Dot Matrix Visual (NO BOX) -->
	<div class="relative flex items-center justify-center select-none py-4">
		<svg
			viewBox="0 0 580 180"
			class="h-auto w-full max-w-xl text-emerald-950/20 dark:text-emerald-400/20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="4.9k GitHub Stars Matrix"
		>
			<defs>
				<filter id="matrix-glow" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur stdDeviation="2" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{#each dots as dot (dot.c + '_' + dot.r)}
				{#if dot.isLit}
					<rect
						x={dot.x - 4.5}
						y={dot.y - 4.5}
						width="9"
						height="9"
						rx="2.5"
						fill={dot.color}
						filter="url(#matrix-glow)"
						class="transition-opacity hover:opacity-80"
					/>
				{:else}
					<rect
						x={dot.x - 3.5}
						y={dot.y - 3.5}
						width="7"
						height="7"
						rx="2"
						fill="currentColor"
						opacity={dot.opacity}
					/>
				{/if}
			{/each}
		</svg>
	</div>
</div>

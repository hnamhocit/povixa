<script lang="ts">
	// High-fidelity, modern developer tech company SVG logos
	const partners = [
		{
			name: 'Framewrk',
			tagline: 'Modern Web Frameworks',
			svg: `
				<svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<path d="M6 4h18v4H10v8h12v4H10v8H6V4z" />
					<text x="32" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">FRAMEWRK</text>
				</svg>
			`
		},
		{
			name: 'Nimbus Cloud',
			tagline: 'Distributed Edge',
			svg: `
				<svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<path d="M14 8a6 6 0 0 0-5.8 4.5A5 5 0 0 0 5 22h16a5 5 0 0 0 1.2-9.8A6 6 0 0 0 14 8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
					<text x="32" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">NIMBUS</text>
				</svg>
			`
		},
		{
			name: 'Orbit DB',
			tagline: 'Global Database',
			svg: `
				<svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<ellipse cx="14" cy="16" rx="9" ry="5" transform="rotate(-25 14 16)" fill="none" stroke="currentColor" stroke-width="2" />
					<circle cx="14" cy="16" r="3.2" fill="currentColor" />
					<text x="32" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">ORBIT DB</text>
				</svg>
			`
		},
		{
			name: 'CloudNine',
			tagline: 'Edge CDN',
			svg: `
				<svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<polygon points="14,6 23,11 23,21 14,26 5,21 5,11" fill="none" stroke="currentColor" stroke-width="2" />
					<circle cx="14" cy="16" r="2.5" fill="currentColor" />
					<text x="32" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">CLOUDNINE</text>
				</svg>
			`
		},
		{
			name: 'Photon AI',
			tagline: 'Inference Engine',
			svg: `
				<svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<path d="M15 5L7 17h8l-2 10 10-12h-8l2-10z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
					<text x="32" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">PHOTON</text>
				</svg>
			`
		},
		{
			name: 'Kite AI',
			tagline: 'Developer Tooling',
			svg: `
				<svg viewBox="0 0 110 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<polygon points="14,5 23,16 14,27 10,16" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
					<line x1="14" y1="5" x2="14" y2="27" stroke="currentColor" stroke-width="1.5" />
					<text x="30" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">KITE</text>
				</svg>
			`
		},
		{
			name: 'Vantage Labs',
			tagline: 'Telemetry Platform',
			svg: `
				<svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<path d="M6 10l8 14 8-14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
					<circle cx="14" cy="8" r="2" fill="currentColor" />
					<text x="32" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">VANTAGE</text>
				</svg>
			`
		},
		{
			name: 'DevHub',
			tagline: 'Builder Community',
			svg: `
				<svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto fill-current">
					<path d="M7 11l5 5-5 5M15 21h7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
					<text x="32" y="21" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="-0.03em" fill="currentColor">DEVHUB</text>
				</svg>
			`
		}
	];
</script>

<div
	class="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8"
>
	{#each partners as partner (partner.name)}
		<div
			class="group flex items-center justify-center text-muted-foreground/50 transition-all duration-200 hover:text-foreground"
			title="{partner.name} - {partner.tagline}"
		>
			<div class="transition-transform duration-200 group-hover:scale-105">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html partner.svg}
			</div>
		</div>
	{/each}
</div>

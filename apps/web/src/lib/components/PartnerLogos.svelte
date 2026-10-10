<script lang="ts">
	// High-fidelity, iconic developer ecosystem partners with official brand colors
	const partners = [
		{
			name: 'TypeScript',
			tagline: 'Type-Safe JavaScript',
			svg: `
				<svg viewBox="0 0 136 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="2" y="4" width="28" height="28" rx="6" fill="#3178C6" />
					<path d="M11 14h10m-5 0v12" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
					<path d="M22 17.5c-.8-.7-1.8-1-2.8-1-1.4 0-2.2.8-2.2 1.8 0 1.2.9 1.6 2.3 2 1.7.5 3.2 1.2 3.2 3 0 1.6-1.3 2.7-3.2 2.7-1.3 0-2.6-.5-3.3-1.4" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
					<text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">TypeScript</text>
				</svg>
			`
		},
		{
			name: 'Svelte',
			tagline: 'Cybernetically Enhanced Web Apps',
			svg: `
				<svg viewBox="0 0 110 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 4)">
						<path d="M21.7 6.4c-2.4-3.6-7-4.8-10.7-3-1.4.7-2.6 1.8-3.4 3.2L3.1 14c-1.8 3.1-1.3 7.1 1.2 9.6 2.9 2.9 7.6 3.4 11 .9l4.5-3.3c.7-.5 1.7-.4 2.2.3.5.7.4 1.7-.3 2.2l-4.5 3.3c-4.8 3.5-11.4 2.7-15.3-1.7-3.5-3.8-4-9.6-1.1-14l4.5-7.4C7.7 1.8 10.6.1 13.9 0c3.7-.1 7.2 1.7 9.3 4.8 2.2 3.3 2.2 7.7 0 11l-4.5 7.4c-.6.9-1.8 1.2-2.7.6-.9-.6-1.2-1.8-.6-2.7l4.5-7.4c1.5-2.2 1.4-5.2.1-7.3z" fill="#FF3E00" />
						<path d="M7.4 14.8c-.5-.7-.4-1.7.3-2.2l4.5-3.3c4.8-3.5 11.4-2.7 15.3 1.7 3.5 3.8 4 9.6 1.1 14l-4.5 7.4c-2.3 3.8-6.6 5.8-11 5-3.7-.7-6.8-3.3-8.1-6.8-.4-1.1-.3-2.2.3-3.1.6-.9 1.8-1.2 2.7-.6.9.6 1.2 1.8.6 2.7-.1.2-.2.4-.2.6.9 2.5 3.1 4.3 5.8 4.7 3.1.5 6.2-.9 7.8-3.6l4.5-7.4c1.8-3.1 1.3-7.1-1.2-9.6-2.9-2.9-7.6-3.4-11-.9l-4.5 3.3c-.7.5-1.7.4-2.2-.3z" fill="#FF3E00" />
					</g>
					<text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">Svelte</text>
				</svg>
			`
		},
		{
			name: 'Golang',
			tagline: 'High Performance Backend',
			svg: `
				<svg viewBox="0 0 108 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 4)">
						<rect width="28" height="28" rx="6" fill="#00ADD8" />
						<path d="M12 9h-2c-2.5 0-4 1.8-4 4s1.5 4 4 4c2.2 0 3.8-1.5 3.8-3.5H10v-2h6v2c0 3.2-2.5 5.5-6 5.5-3.6 0-6-2.7-6-6s2.4-6 6-6c2.5 0 4.6 1.3 5.5 3.2L14 11l-2-2z" fill="#FFFFFF" />
						<path d="M19 9c-2.8 0-4.8 2-4.8 4.5s2 4.5 4.8 4.5 4.8-2 4.8-4.5S21.8 9 19 9zm0 7c-1.6 0-2.8-1.1-2.8-2.5s1.2-2.5 2.8-2.5 2.8 1.1 2.8 2.5-1.2 2.5-2.8 2.5z" fill="#FFFFFF" />
					</g>
					<text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">Golang</text>
				</svg>
			`
		},
		{
			name: 'PostgreSQL',
			tagline: 'Reliable Relational Database',
			svg: `
				<svg viewBox="0 0 142 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 4)">
						<rect width="28" height="28" rx="6" fill="#336791" />
						<path d="M14 6c-4.2 0-7 2.8-7 6.5 0 2.5 1.3 4.5 3.3 5.5v3.5c0 1.2 1 2.2 2.2 2.2h3c1.2 0 2.2-1 2.2-2.2v-3.5c2-1 3.3-3 3.3-5.5 0-3.7-2.8-6.5-7-6.5zm-2.5 5.5a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm5 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z" fill="#FFFFFF" />
					</g>
					<text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">PostgreSQL</text>
				</svg>
			`
		},
		{
			name: 'Redis',
			tagline: 'In-Memory Cache & Queues',
			svg: `
				<svg viewBox="0 0 108 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 4)">
						<rect width="28" height="28" rx="6" fill="#DC382D" />
						<path d="M7 11l7-4 7 4-7 4-7-4zm0 6l7 4 7-4m-14 5l7 4 7-4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</g>
					<text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">Redis</text>
				</svg>
			`
		},
		{
			name: 'Docker',
			tagline: 'Self-Host Container Standard',
			svg: `
				<svg viewBox="0 0 118 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 4)">
						<rect width="28" height="28" rx="6" fill="#2496ED" />
						<rect x="7" y="12" width="3.5" height="3" fill="#FFFFFF" rx="0.5" />
						<rect x="11.5" y="12" width="3.5" height="3" fill="#FFFFFF" rx="0.5" />
						<rect x="16" y="12" width="3.5" height="3" fill="#FFFFFF" rx="0.5" />
						<rect x="11.5" y="8" width="3.5" height="3" fill="#FFFFFF" rx="0.5" />
						<rect x="16" y="8" width="3.5" height="3" fill="#FFFFFF" rx="0.5" />
						<path d="M5 16.5c1 3.5 4.5 5.5 9 5.5 6 0 9.5-3 10-6.5-1.5-.2-3 .5-4 0-.5-.8-.5-1.5-1-2-4 0-5.5 2-8 2-2 0-4-.5-6 1z" fill="#FFFFFF" />
					</g>
					<text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">Docker</text>
				</svg>
			`
		},
		{
			name: 'Cloudflare',
			tagline: 'Edge CDN & Security',
			svg: `
				<svg viewBox="0 0 135 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 6)">
						<path d="M18.8 8.4c-.6-3.2-3.4-5.6-6.8-5.6-3 0-5.6 1.9-6.5 4.7A6.8 6.8 0 0 0 0 14.1c0 3.7 3 6.8 6.8 6.8h12.5c2.9 0 5.2-2.3 5.2-5.2 0-2.7-2.1-5-4.8-5.3-.3-.7-.6-1.4-.9-2z" fill="#F38020" />
						<path d="M19.5 14.2c-.2 0-.4 0-.6.1.1-.3.2-.7.2-1.1 0-1.7-1.4-3.1-3.1-3.1-.7 0-1.4.2-1.9.6-.5-1.3-1.8-2.2-3.3-2.2-1.9 0-3.5 1.5-3.5 3.4 0 .3 0 .5.1.8-.8-.6-1.8-.9-2.9-.9-2.7 0-4.8 2.2-4.8 4.8 0 .4.1.8.2 1.1-.8.2-1.4.9-1.4 1.8 0 1 .8 1.8 1.8 1.8h19.2c1.7 0 3-1.3 3-3 0-1.7-1.3-3.1-3-3.1z" fill="#FAAD3F" />
					</g>
					<text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">Cloudflare</text>
				</svg>
			`
		},
		{
			name: 'Supabase',
			tagline: 'Backend-as-a-Service Engine',
			svg: `
				<svg viewBox="0 0 132 36" class="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 4)">
						<rect width="28" height="28" rx="6" fill="#1E293B" />
						<path d="M15.5 5.5l-8 10.5h6.5l-2.5 7 8-10.5H13l2.5-7z" fill="#3ECF8E" />
					</g>
					<text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor" letter-spacing="-0.02em">Supabase</text>
				</svg>
			`
		}
	];
</script>

<div
	class="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-10"
>
	{#each partners as partner (partner.name)}
		<div
			class="group relative flex min-h-12 items-center justify-center py-2"
			title="{partner.name} - {partner.tagline}"
		>
			<div
				class="flex items-center justify-center opacity-80 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:opacity-100"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html partner.svg}
			</div>
		</div>
	{/each}
</div>

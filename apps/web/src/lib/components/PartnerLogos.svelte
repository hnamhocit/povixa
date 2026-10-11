<script lang="ts">
	// High-profile enterprise & fast-growing tech companies
	const partners = [
		{
			name: 'Mozilla',
			tagline: 'The Open Web Foundation',
			svg: `
				<svg viewBox="0 0 120 32" class="h-7 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(0, 2)">
						<path d="M4 6h4.5l4 8.5L16.5 6H21v16h-3.8v-9.5l-4.7 9.5h-1L6.8 12.5V22H3V6h1z" />
						<path d="M26 14c0-4.5 3.2-8 8-8s8 3.5 8 8-3.2 8-8 8-8-3.5-8-8zm12.2 0c0-2.5-1.8-4.5-4.2-4.5s-4.2 2-4.2 4.5 1.8 4.5 4.2 4.5 4.2-2 4.2-4.5z" />
						<path d="M46 22v-3l7-7.5H46V8h12v3l-7 7.5h7.5V22H46z" />
						<rect x="62" y="10" width="3" height="3" rx="0.5" />
						<rect x="62" y="17" width="3" height="3" rx="0.5" />
						<path d="M70 22l4.5-14h3L73 22h-3zm8 0l4.5-14h3L81 22h-3z" />
						<path d="M91 6h4.5l5.5 16h-4l-1.3-4.2H91L89.7 22H86L91 6zm4 8.8l-1.8-6-1.8 6h3.6z" />
					</g>
				</svg>
			`
		},
		{
			name: 'PwC',
			tagline: 'Global Enterprise Advisory',
			svg: `
				<svg viewBox="0 0 100 32" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(0, 4)">
						<rect x="0" y="8" width="7" height="7" fill="#E0301E" />
						<rect x="7" y="1" width="7" height="7" fill="#EB8C00" />
						<rect x="7" y="8" width="7" height="7" fill="#DC143C" />
						<rect x="7" y="15" width="7" height="7" fill="#FFB600" />
						<rect x="14" y="8" width="7" height="7" fill="#B30006" />
					</g>
					<text x="30" y="22" font-family="Georgia, serif" font-weight="700" font-size="20" fill="currentColor" letter-spacing="-0.03em">pwc</text>
				</svg>
			`
		},
		{
			name: 'Resend',
			tagline: 'Email for Developers',
			svg: `
				<svg viewBox="0 0 105 32" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(0, 4)">
						<rect x="1" y="2" width="20" height="20" rx="4" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="2" />
						<path d="M6 12h10M11 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</g>
					<text x="29" y="21" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor" letter-spacing="-0.03em">Resend</text>
				</svg>
			`
		},
		{
			name: 'Vercel',
			tagline: 'Frontend Cloud Infrastructure',
			svg: `
				<svg viewBox="0 0 105 32" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 5L24 25H0L12 5Z" fill="currentColor" />
					<text x="32" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor" letter-spacing="-0.03em">Vercel</text>
				</svg>
			`
		},
		{
			name: 'Shopify',
			tagline: 'Global Commerce Platform',
			svg: `
				<svg viewBox="0 0 115 32" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 4)">
						<path d="M17.5 4.5c-.1-.6-.7-.9-1.2-.7L13.5 4.8c-.3-.8-1-1.4-2-1.4h-.2C9.5 3.4 8.7 4 8.2 4.7l-2 .7c-.7.3-.9.9-.8 1.5l1.8 12.3c.1.8.8 1.2 1.4 1.2h9.5c.7 0 1.3-.6 1.4-1.3l1.4-12.5-4.4-2.1zm-6.5.2c.3-.5.8-.8 1.4-.8.6 0 1 .3 1.3.8l-2.7.8v-.8zm2 7.4c-.4.3-.8.3-1.4.3-1 0-1.4-.6-1.4-1.2 0-.9.8-1.4 2-1.6l.8-.2v2.7zm0-3.5l-1.1.3c-1.8.4-2.8 1.3-2.8 2.6 0 1.3 1 2.1 2.4 2.1.7 0 1.2-.2 1.5-.4v2.4l1.9-.5V8.6z" fill="#95BF47" />
					</g>
					<text x="29" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor" letter-spacing="-0.03em">Shopify</text>
				</svg>
			`
		},
		{
			name: 'Linear',
			tagline: 'Issue Tracking for Modern Teams',
			svg: `
				<svg viewBox="0 0 105 32" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 5)">
						<circle cx="11" cy="11" r="10" stroke="currentColor" stroke-width="2"/>
						<path d="M4 15L15 4M8 19L19 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</g>
					<text x="31" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor" letter-spacing="-0.03em">Linear</text>
				</svg>
			`
		},
		{
			name: 'Raycast',
			tagline: 'Productivity Platform',
			svg: `
				<svg viewBox="0 0 110 32" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 5)">
						<rect width="21" height="21" rx="5" fill="#FF6363" />
						<path d="M6 15l4.5-4.5 4.5 4.5M10.5 10.5v6M15 6l-9 9" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
					<text x="31" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor" letter-spacing="-0.03em">Raycast</text>
				</svg>
			`
		},
		{
			name: 'Retool',
			tagline: 'Fast Internal Tools Builder',
			svg: `
				<svg viewBox="0 0 105 32" class="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(2, 5)">
						<rect x="0" y="0" width="8.5" height="8.5" rx="2" fill="#3D5AFE"/>
						<rect x="11.5" y="0" width="8.5" height="8.5" rx="2" fill="#3D5AFE" fill-opacity="0.4"/>
						<rect x="0" y="11.5" width="8.5" height="8.5" rx="2" fill="#3D5AFE" fill-opacity="0.4"/>
						<rect x="11.5" y="11.5" width="8.5" height="8.5" rx="2" fill="#3D5AFE"/>
					</g>
					<text x="30" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor" letter-spacing="-0.02em">Retool</text>
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
				class="flex items-center justify-center text-muted-foreground/70 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-foreground group-hover:scale-105"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html partner.svg}
			</div>
		</div>
	{/each}
</div>

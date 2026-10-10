<script lang="ts">
	import { Footer, type FooterColumn, type FooterLink, type SocialLink } from '@povixa/ui';
	import * as m from '#lib/paraglide/messages.js';

	const columns: FooterColumn[] = $derived([
		{
			title: m.footer_product(),
			links: [
				{ href: '/#modules', label: m.footer_all_modules() },
				{ href: '/#pricing', label: m.nav_pricing() },
				{ href: '/changelog', label: m.footer_changelog() },
				{ href: '/roadmap', label: m.footer_roadmap() },
				{ href: '/status', label: m.footer_status() }
			]
		},
		{
			title: m.footer_modules(),
			links: [
				{ href: 'https://id.povixa.cloud', label: 'Povixa ID', external: true },
				{ href: '/config', label: 'Remote Config' },
				{ href: '/notifications', label: 'Notifications' },
				{ href: '/analytics', label: 'Analytics' },
				{ href: '/storage', label: 'Storage' }
			]
		},
		{
			title: m.footer_developers(),
			links: [
				{ href: 'https://docs.povixa.cloud', label: m.footer_documentation(), external: true },
				{ href: '/api', label: m.footer_api() },
				{ href: '/sdks', label: m.footer_sdks() },
				{ href: '/cli', label: m.footer_cli() },
				{ href: '/guides', label: m.footer_guides() }
			]
		},
		{
			title: m.footer_company(),
			links: [
				{ href: '/about', label: m.footer_about() },
				{ href: '/blog', label: m.nav_blog() },
				{ href: '/manifesto', label: m.footer_manifesto() },
				{ href: '/#sponsors', label: m.nav_sponsors() },
				{ href: '/contact', label: m.footer_contact() }
			]
		}
	]);

	const legalLinks: FooterLink[] = $derived([
		{ href: '/legal/terms', label: m.footer_terms() },
		{ href: '/legal/privacy', label: m.footer_privacy() },
		{ href: '/legal/dpa', label: m.footer_dpa() },
		{ href: '/legal/cookies', label: m.footer_cookies() },
		{ href: '/legal/subprocessors', label: m.footer_subprocessors() }
	]);

	const socials: SocialLink[] = [
		{ href: 'https://github.com/hnamhocit/povixa', label: 'GitHub', icon: 'github' },
		{ href: 'https://x.com/povixa', label: 'X', icon: 'x' },
		{ href: 'https://discord.gg/povixa', label: 'Discord', icon: 'discord' }
	];

	const currentYear = new Date().getFullYear();
</script>

<Footer
	brandName="Povixa"
	brandHref="/"
	brandDescription="The unified control plane for modern applications."
	{columns}
	{legalLinks}
	{socials}
	statusText={m.footer_status_ok()}
	statusHref="/status"
	copyright={m.footer_copyright({ year: String(currentYear) })}
	madeWithText={m.footer_made_with()}
/>

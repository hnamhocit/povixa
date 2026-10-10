<script lang="ts">
	import { Footer, type FooterColumn, type FooterLink, type SocialLink } from '@povixa/ui';
	import * as m from '#lib/paraglide/messages.js';

	const columns: FooterColumn[] = $derived([
		{
			title: 'Hệ sinh thái',
			links: [
				{ href: 'https://povixa.cloud', label: 'Povixa Cloud', external: true },
				{ href: '/#features', label: 'Tính năng tài khoản' },
				{ href: 'https://docs.povixa.cloud', label: m.nav_docs(), external: true },
				{ href: 'https://povixa.cloud/status', label: m.nav_status(), external: true }
			]
		},
		{
			title: 'Bảo mật & Trợ giúp',
			links: [
				{ href: 'https://povixa.cloud/legal/privacy', label: m.footer_privacy(), external: true },
				{ href: 'https://povixa.cloud/legal/terms', label: m.footer_terms(), external: true },
				{ href: 'https://discord.gg/povixa', label: m.footer_support(), external: true }
			]
		}
	]);

	const legalLinks: FooterLink[] = $derived([
		{ href: 'https://povixa.cloud/legal/terms', label: m.footer_terms(), external: true },
		{ href: 'https://povixa.cloud/legal/privacy', label: m.footer_privacy(), external: true }
	]);

	const socials: SocialLink[] = [
		{ href: 'https://github.com/hnamhocit/povixa', label: 'GitHub', icon: 'github' },
		{ href: 'https://discord.gg/povixa', label: 'Discord', icon: 'discord' }
	];
</script>

<Footer
	class="bg-white dark:bg-card"
	brandName="Povixa"
	brandBadge="ID"
	brandHref="/"
	brandDescription="Tài khoản định danh an toàn cho toàn bộ hệ sinh thái Povixa. Quản lý công việc, ứng dụng và dữ liệu tập trung trên một nền tảng duy nhất."
	{columns}
	{legalLinks}
	{socials}
	statusText={m.nav_status() + ' • Hoạt động bình thường'}
	statusHref="https://povixa.cloud/status"
	copyright={m.footer_copyright()}
	madeWithText="Phát triển vì cộng đồng người dùng Povixa"
/>

<script lang="ts">
	import { Footer, type FooterColumn, type FooterLink, type SocialLink } from '@povixa/ui';
	import { getLocale } from '#lib/paraglide/runtime.js';

	const isEn = $derived(getLocale() === 'en');

	const columns: FooterColumn[] = $derived([
		{
			title: isEn ? 'Products' : 'Sản phẩm',
			links: [
				{ href: 'http://localhost:5173', label: 'Developer Console', external: true },
				{ href: '/', label: 'Applications Hub' },
				{ href: 'https://povixa.cloud/#modules', label: isEn ? 'All Modules' : 'Tất cả Modules' },
				{ href: 'https://povixa.cloud/status', label: isEn ? 'System Status' : 'Trạng thái hệ thống' }
			]
		},
		{
			title: isEn ? 'Core Infrastructure' : 'Hạ tầng cốt lõi',
			links: [
				{ href: 'http://localhost:5174', label: 'Povixa Auth (SSO)', external: true },
				{ href: 'http://localhost:5173/config', label: 'Remote Config' },
				{ href: 'http://localhost:5173/notifications', label: 'Notifications' },
				{ href: 'http://localhost:5173/storage', label: 'Object Storage' },
				{ href: 'http://localhost:5173/observability', label: 'Observability' }
			]
		},
		{
			title: isEn ? 'Developers' : 'Nhà phát triển',
			links: [
				{ href: 'https://docs.povixa.com', label: isEn ? 'Documentation' : 'Tài liệu hướng dẫn', external: true },
				{ href: 'http://localhost:5173/api-keys', label: 'API Keys & SDKs' },
				{ href: 'https://github.com/povixa', label: isEn ? 'Open Source GitHub' : 'GitHub Nguồn Mở', external: true }
			]
		},
		{
			title: isEn ? 'About Povixa' : 'Về Povixa',
			links: [
				{ href: 'https://povixa.cloud/about', label: isEn ? 'About Us' : 'Giới thiệu' },
				{ href: 'https://povixa.cloud/blog', label: isEn ? 'Blog & News' : 'Blog & Tin tức' },
				{ href: 'https://povixa.cloud/manifesto', label: isEn ? '$0 Freedom Commitment' : 'Cam kết $0 Tự Do' },
				{ href: 'https://povixa.cloud/contact', label: isEn ? 'Support & Contact' : 'Liên hệ trợ giúp' }
			]
		}
	]);

	const legalLinks: FooterLink[] = $derived([
		{ href: '/terms', label: isEn ? 'Terms of Service' : 'Điều khoản dịch vụ' },
		{ href: '/privacy', label: isEn ? 'Privacy Policy' : 'Chính sách quyền riêng tư' },
		{ href: 'https://povixa.cloud/legal/dpa', label: 'DPA' },
		{ href: 'https://povixa.cloud/legal/cookies', label: isEn ? 'Cookie Policy' : 'Chính sách Cookie' }
	]);

	const socials: SocialLink[] = [
		{ href: 'https://github.com/povixa', label: 'GitHub', icon: 'github' },
		{ href: 'https://x.com/povixa', label: 'X', icon: 'x' },
		{ href: 'https://discord.gg/povixa', label: 'Discord', icon: 'discord' }
	];

	const currentYear = new Date().getFullYear();
</script>

<Footer
	class="bg-white dark:bg-card border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.02)]"
	brandName="Povixa"
	brandBadge="APPS"
	brandHref="/"
	brandDescription={isEn ? 'Instant edge application deployments and microservices hub.' : 'Cổng triển khai ứng dụng biên Anycast và kho quản lý microservices tốc độ cao.'}
	{columns}
	{legalLinks}
	{socials}
	statusText={isEn ? '100% Operational' : 'Hệ thống hoạt động 100%'}
	statusHref="https://povixa.cloud/status"
	copyright={isEn ? `© ${currentYear} Povixa Cloud Ecosystem. All rights reserved.` : `© ${currentYear} Povixa Cloud Ecosystem. Bảo lưu mọi quyền.`}
	madeWithText={isEn ? 'Built for developer freedom worldwide' : 'Phát triển vì cộng đồng lập trình viên Việt Nam & Quốc tế'}
/>

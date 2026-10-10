<script lang="ts">
	import {
		IconFileText,
		IconShieldCheck,
		IconLock,
		IconArrowRight
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const legalDocs = [
		{
			title: m.footer_terms(),
			desc: 'Quy định và điều khoản chung khi sử dụng dịch vụ và nền tảng Povixa.',
			href: '/legal/terms'
		},
		{
			title: m.footer_privacy(),
			desc: 'Chính sách bảo vệ thông tin cá nhân và cam kết quyền riêng tư dữ liệu.',
			href: '/legal/privacy'
		},
		{
			title: m.footer_dpa(),
			desc: 'Thỏa thuận xử lý dữ liệu chuẩn GDPR dành cho khách hàng doanh nghiệp.',
			href: '/legal/dpa'
		},
		{
			title: m.footer_cookies(),
			desc: 'Quy định sử dụng Cookie tối giản và công nghệ theo dõi phiên.',
			href: '/legal/cookies'
		},
		{
			title: m.footer_subprocessors(),
			desc: 'Danh sách các bên thứ ba và nhà cung cấp dịch vụ hạ tầng phụ trợ.',
			href: '/legal/subprocessors'
		}
	];
</script>

<svelte:head>
	<title>{m.module_legal_name()} — Povixa Legal Center</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconShieldCheck size={14} />
			<span>Trung tâm Pháp lý & Tuân thủ</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.module_legal_name()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			{m.module_legal_desc()}
		</p>
	</div>

	<div class="mt-14 space-y-4">
		{#each legalDocs as doc (doc.href)}
			<a
				href={doc.href}
				class="group flex items-center justify-between rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
			>
				<div>
					<h2
						class="text-base font-bold text-foreground transition-colors group-hover:text-primary"
					>
						{doc.title}
					</h2>
					<p class="mt-1 text-xs text-muted-foreground">{doc.desc}</p>
				</div>
				<div
					class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:translate-x-1"
				>
					<IconArrowRight size={16} />
				</div>
			</a>
		{/each}
	</div>
</section>

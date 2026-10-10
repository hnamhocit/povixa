<script lang="ts">
	import {
		IconBook,
		IconTerminal,
		IconCode,
		IconCpu,
		IconArrowRight,
		IconCopy,
		IconCheck
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let copied = $state(false);

	function copyCommand() {
		navigator.clipboard.writeText('npm install @povixa/sdk');
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	const sections = [
		{
			title: 'Khởi đầu nhanh (Quickstart)',
			desc: 'Cài đặt và thiết lập SDK thống nhất chỉ trong 60 giây.',
			href: '/guides',
			icon: IconTerminal
		},
		{
			title: 'API Reference',
			desc: 'Đặc tả kỹ thuật OpenAPI và toàn bộ các endpoint REST.',
			href: '/api',
			icon: IconCode
		},
		{
			title: 'Thư viện & SDKs',
			desc: 'Hỗ trợ TypeScript, Node.js, Python, Go, Rust và Flutter.',
			href: '/sdks',
			icon: IconCpu
		},
		{
			title: 'Dòng lệnh Povixa CLI',
			desc: 'Quản lý môi trường dev, migrate schema và deploy tại máy local.',
			href: '/cli',
			icon: IconBook
		}
	];
</script>

<svelte:head>
	<title>{m.footer_documentation()} — Povixa Docs</title>
</svelte:head>

<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconBook size={14} />
			<span>Tài liệu Kỹ thuật</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_documentation()}
		</h1>
		<p class="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
			Hướng dẫn toàn diện, tham chiếu API và công cụ hỗ trợ xây dựng ứng dụng với Povixa.
		</p>
	</div>

	<!-- Quick Install Snippet -->
	<div
		class="mx-auto mt-12 max-w-xl rounded-2xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm"
	>
		<div class="flex items-center justify-between">
			<span class="font-mono text-xs text-muted-foreground">Cài đặt SDK thống nhất</span>
			<button
				type="button"
				onclick={copyCommand}
				class="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent"
			>
				{#if copied}
					<IconCheck size={13} class="text-emerald-500" />
					<span class="text-emerald-500">Đã chép</span>
				{:else}
					<IconCopy size={13} />
					<span>Sao chép</span>
				{/if}
			</button>
		</div>
		<div class="mt-2.5 rounded-xl bg-background/90 p-3 font-mono text-xs text-primary">
			<code>npm install @povixa/sdk</code>
		</div>
	</div>

	<!-- Doc Sections Grid -->
	<div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
		{#each sections as sec (sec.title)}
			{@const Icon = sec.icon}
			<a
				href={sec.href}
				class="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-card hover:shadow-md"
			>
				<div>
					<div
						class="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105"
					>
						<Icon size={22} />
					</div>
					<h3
						class="mt-4 text-lg font-bold text-foreground transition-colors group-hover:text-primary"
					>
						{sec.title}
					</h3>
					<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
						{sec.desc}
					</p>
				</div>
				<div class="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
					<span>Khám phá tài liệu</span>
					<IconArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
				</div>
			</a>
		{/each}
	</div>
</section>

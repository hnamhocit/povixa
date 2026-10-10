<script lang="ts">
	import { IconCpu, IconBrandGithub, IconTerminal, IconCheck } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const sdks = [
		{
			name: 'TypeScript & JavaScript',
			install: 'npm install @povixa/sdk',
			status: 'Chính thức • v2.4.0',
			desc: 'Hỗ trợ Node.js, Bun, Deno, Next.js, SvelteKit, Nuxt và React.'
		},
		{
			name: 'Python',
			install: 'pip install povixa',
			status: 'Chính thức • v1.2.0',
			desc: 'Tích hợp mượt mà với FastAPI, Django, Flask và Celery.'
		},
		{
			name: 'Go',
			install: 'go get github.com/povixa/povixa-go',
			status: 'Chính thức • v1.1.0',
			desc: 'SDK hiệu năng cao với goroutine pooling và zero-allocation routing.'
		},
		{
			name: 'Rust',
			install: 'cargo add povixa',
			status: 'Beta • v0.9.0',
			desc: 'Async SDK dựa trên Tokio, tối ưu hóa cho hệ thống microservices.'
		},
		{
			name: 'Flutter / Dart',
			install: 'flutter pub add povixa_flutter',
			status: 'Sắp ra mắt • In Progress',
			desc: 'Dành cho ứng dụng di động iOS và Android đa nền tảng.'
		}
	];
</script>

<svelte:head>
	<title>{m.footer_sdks()} — Povixa Developer SDKs</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconCpu size={14} />
			<span>Hỗ trợ đa ngôn ngữ</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_sdks()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Thư viện mã nguồn mở chính thức với kiểu dữ liệu an toàn (type safety) và tài liệu chi tiết.
		</p>
	</div>

	<div class="mt-14 space-y-4">
		{#each sdks as sdk (sdk.name)}
			<div
				class="rounded-3xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40"
			>
				<div class="flex flex-wrap items-center justify-between gap-2">
					<h3 class="text-base font-bold text-foreground">{sdk.name}</h3>
					<span
						class="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-primary"
					>
						{sdk.status}
					</span>
				</div>
				<p class="mt-1.5 text-xs text-muted-foreground">{sdk.desc}</p>
				<div class="mt-4 rounded-xl bg-background/90 p-3 font-mono text-xs text-primary">
					<code>{sdk.install}</code>
				</div>
			</div>
		{/each}
	</div>
</section>

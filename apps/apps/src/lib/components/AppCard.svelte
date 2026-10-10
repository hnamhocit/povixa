<script lang="ts">
	import type { AppItem } from '#lib/data/appsData.js';
	import {
		IconRocket,
		IconBrandGithub,
		IconExternalLink,
		IconHeart,
		IconHeartFilled,
		IconCheck,
		IconBrandNextjs,
		IconBrandSvelte,
		IconServer,
		IconBolt,
		IconDeviceMobile,
		IconCode,
		IconFlame,
		IconSparkles
	} from '@tabler/icons-svelte-runes';

	let {
		app,
		onDeploy = (item: AppItem) => {},
		onToggleLike = (id: string) => {}
	} = $props<{
		app: AppItem;
		onDeploy?: (item: AppItem) => void;
		onToggleLike?: (id: string) => void;
	}>();

	const frameworkMeta = $derived.by(() => {
		switch (app.framework) {
			case 'SvelteKit':
				return { color: 'text-orange-500', bg: 'bg-orange-500/10' };
			case 'Next.js':
				return { color: 'text-foreground', bg: 'bg-secondary' };
			case 'NestJS':
				return { color: 'text-rose-500', bg: 'bg-rose-500/10' };
			case 'Go Fiber':
				return { color: 'text-cyan-500', bg: 'bg-cyan-500/10' };
			case 'Flutter':
				return { color: 'text-sky-500', bg: 'bg-sky-500/10' };
			default:
				return { color: 'text-primary', bg: 'bg-primary/10' };
		}
	});
</script>

{#snippet renderIcon(fw: string)}
	{#if fw === 'SvelteKit'}
		<IconBrandSvelte size={24} stroke={2} />
	{:else if fw === 'Next.js'}
		<IconBrandNextjs size={24} stroke={2} />
	{:else if fw === 'NestJS'}
		<IconServer size={24} stroke={2} />
	{:else if fw === 'Go Fiber'}
		<IconBolt size={24} stroke={2} />
	{:else if fw === 'Flutter'}
		<IconDeviceMobile size={24} stroke={2} />
	{:else}
		<IconCode size={24} stroke={2} />
	{/if}
{/snippet}

<div
	class="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-200 hover:border-border hover:shadow-md"
>
	<div>
		<!-- 1. Tall Thumbnail Preview Frame (h-44 sm:h-48) -->
		<div class="relative h-44 sm:h-48 w-full overflow-hidden bg-gradient-to-br {app.previewGradient} p-4 flex flex-col justify-between select-none">
			<!-- Subtle pattern overlay -->
			<div class="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

			<!-- Top Row inside Thumbnail: Just Single Clean Type Pill -->
			<div class="relative z-10 flex items-center justify-between gap-2">
				{#if app.type === 'template'}
					<span class="inline-flex items-center gap-1.5 rounded-full bg-black/40 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
						<IconRocket size={13} stroke={2.5} class="text-indigo-400" />
						<span>Starter Kit</span>
					</span>
				{:else}
					<span class="inline-flex items-center gap-1.5 rounded-full bg-black/40 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
						<IconSparkles size={13} stroke={2.5} class="text-amber-400" />
						<span>Showcase</span>
					</span>
				{/if}
			</div>

			<!-- Center Mockup Graphic inside Thumbnail -->
			<div class="relative z-10 flex flex-col items-center justify-center my-auto">
				<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg group-hover:scale-105 transition-transform">
					{@render renderIcon(app.framework)}
				</div>
				<span class="mt-2 text-xs font-mono font-bold text-white/90 uppercase tracking-wider drop-shadow-sm">
					{app.framework}
				</span>
			</div>
		</div>

		<!-- 2. Body Card: Readable, Clear & Spacious Typography -->
		<div class="p-5 space-y-3">
			<!-- Title & Author -->
			<div class="space-y-1">
				<p class="text-[11px] font-semibold text-primary uppercase tracking-wider">
					{app.useCase}
				</p>
				<h3 class="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
					{app.title}
				</h3>
				<div class="flex items-center gap-2 text-xs text-muted-foreground font-medium">
					<span>Bởi</span>
					<span class="font-mono text-foreground font-semibold">@{app.author.username}</span>
					{#if app.author.isOfficial}
						<span class="inline-flex items-center gap-0.5 rounded-full bg-primary/15 px-1.5 py-0.2 text-[10px] font-bold text-primary" title="Povixa Official">
							<IconCheck size={11} stroke={3} />
							<span>Official</span>
						</span>
					{/if}
				</div>
			</div>

			<!-- Description (Readable text-sm with 2 lines) -->
			<p class="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px]">
				{app.description}
			</p>

			<!-- Technology Tags (Legible & Clean) -->
			<div class="flex flex-wrap items-center gap-1.5 pt-1">
				{#each app.tags as tag}
					<span class="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/90">
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- 3. Action Footer -->
	<div class="p-5 pt-3.5 border-t border-border/50 bg-secondary/10 flex items-center justify-between gap-2 text-xs sm:text-sm">
		{#if app.type === 'template'}
			<!-- Template Action Flow -->
			<div class="flex items-center justify-between w-full gap-2">
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => onDeploy(app)}
						class="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
					>
						<IconRocket size={14} stroke={2.5} />
						<span>Use</span>
					</button>

					<a
						href={app.demoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2 font-medium text-foreground hover:bg-secondary transition-colors"
						title="Xem Demo trực tiếp"
					>
						<span>Demo</span>
						<IconExternalLink size={13} />
					</a>
				</div>

				{#if app.clonesCount}
					<span class="text-xs font-mono text-muted-foreground whitespace-nowrap" title="Số lượt fork/clone">
						{app.clonesCount > 1000 ? `${(app.clonesCount / 1000).toFixed(1)}k` : app.clonesCount} forks
					</span>
				{/if}
			</div>
		{:else}
			<!-- Showcase Action Flow -->
			<div class="flex items-center justify-between w-full gap-2">
				<div class="flex items-center gap-2">
					<a
						href={app.demoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
					>
						<span>Visit</span>
						<IconExternalLink size={14} stroke={2.5} />
					</a>

					{#if app.isOpenSource && app.repoUrl}
						<a
							href={app.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2 font-medium text-foreground hover:bg-secondary transition-colors"
							title="Mã nguồn mở trên GitHub"
						>
							<IconBrandGithub size={14} />
							<span>Code</span>
						</a>
					{/if}
				</div>

				<!-- Like Button -->
				<button
					type="button"
					onclick={() => onToggleLike(app.id)}
					class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 font-medium transition-colors hover:bg-secondary {app.isLiked ? 'text-rose-500 border-rose-500/30 bg-rose-500/10' : 'text-muted-foreground hover:text-foreground'}"
					title="Thích ứng dụng"
				>
					{#if app.isLiked}
						<IconHeartFilled size={15} class="text-rose-500" />
					{:else}
						<IconHeart size={15} />
					{/if}
					<span class="font-mono text-xs font-semibold">{app.likesCount}</span>
				</button>
			</div>
		{/if}
	</div>
</div>

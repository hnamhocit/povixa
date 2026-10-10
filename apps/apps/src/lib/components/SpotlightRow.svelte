<script lang="ts">
	import type { AppItem } from '#lib/data/appsData.js';
	import {
		IconFlame,
		IconRocket,
		IconExternalLink,
		IconBrandNextjs,
		IconBrandSvelte,
		IconServer,
		IconBolt,
		IconCode,
		IconSparkles
	} from '@tabler/icons-svelte-runes';

	let {
		spotlightApps,
		onDeploy = (item: AppItem) => {}
	} = $props<{
		spotlightApps: AppItem[];
		onDeploy?: (item: AppItem) => void;
	}>();

	// Show top 3 spotlight cards in 3 columns
	const top3Spotlight = $derived(spotlightApps.slice(0, 3));
</script>

{#snippet renderSpotlightIcon(fwName: string)}
	{#if fwName === 'SvelteKit'}
		<IconBrandSvelte size={24} stroke={2} />
	{:else if fwName === 'Next.js'}
		<IconBrandNextjs size={24} stroke={2} />
	{:else if fwName === 'NestJS'}
		<IconServer size={24} stroke={2} />
	{:else if fwName === 'Go Fiber'}
		<IconBolt size={24} stroke={2} />
	{:else}
		<IconCode size={24} stroke={2} />
	{/if}
{/snippet}

<div class="space-y-4">
	<!-- Spotlight Header -->
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2.5">
			<span class="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
				<IconFlame size={17} stroke={2.5} />
			</span>
			<div>
				<h2 class="text-base font-bold text-foreground">Tiêu Điểm Nổi Bật (Spotlight)</h2>
				<p class="text-xs text-muted-foreground">Bộ starter và sản phẩm xuất sắc nhất tuần được tuyển chọn.</p>
			</div>
		</div>
	</div>

	<!-- 3-Column Grid of Spotlight Cards with Tall Thumbnail -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each top3Spotlight as app}
			<div
				class="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-200 hover:border-border hover:shadow-md"
			>
				<div>
					<!-- Tall Thumbnail Preview (h-44 sm:h-48) -->
					<div class="relative h-44 sm:h-48 w-full overflow-hidden bg-gradient-to-br {app.previewGradient} p-4 flex flex-col justify-between select-none">
						<div class="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

						<!-- Top Row inside Thumbnail: Just Single Clean Type Pill -->
						<div class="relative z-10 flex items-center justify-between gap-2">
							<span class="inline-flex items-center gap-1.5 rounded-full bg-black/40 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
								{#if app.type === 'template'}
									<IconRocket size={13} stroke={2.5} class="text-indigo-400" />
									<span>Starter Kit</span>
								{:else}
									<IconSparkles size={13} stroke={2.5} class="text-amber-400" />
									<span>Showcase</span>
								{/if}
							</span>
						</div>

						<!-- Center Tech Icon inside Thumbnail -->
						<div class="relative z-10 flex flex-col items-center justify-center my-auto">
							<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg group-hover:scale-105 transition-transform">
								{@render renderSpotlightIcon(app.framework)}
							</div>
							<span class="mt-2 text-xs font-mono font-bold text-white/90 uppercase tracking-wider drop-shadow-sm">
								{app.framework}
							</span>
						</div>
					</div>

					<!-- Details with Readable Typography -->
					<div class="p-5 space-y-3">
						<div class="space-y-1">
							<p class="text-[11px] font-semibold text-primary uppercase tracking-wider">
								{app.useCase}
							</p>
							<h3 class="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
								{app.title}
							</h3>
							<p class="text-xs text-muted-foreground font-mono">
								@{app.author.username}
							</p>
						</div>

						<p class="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px]">
							{app.description}
						</p>

						<div class="flex flex-wrap gap-1.5 pt-1">
							{#each app.tags.slice(0, 3) as tag}
								<span class="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/90">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- Action Footer -->
				<div class="p-5 pt-3.5 border-t border-border/50 bg-secondary/10">
					{#if app.type === 'template'}
						<button
							type="button"
							onclick={() => onDeploy(app)}
							class="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
						>
							<IconRocket size={14} stroke={2.5} />
							<span>Use</span>
						</button>
					{:else}
						<a
							href={app.demoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
						>
							<span>Visit</span>
							<IconExternalLink size={14} />
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

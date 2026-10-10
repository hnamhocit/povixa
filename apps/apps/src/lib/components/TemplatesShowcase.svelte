<script lang="ts">
	import {
		IconRocket,
		IconBrandGithub,
		IconStar,
		IconArrowRight,
		IconBrandSvelte,
		IconBrandNextjs,
		IconServer,
		IconBolt
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let { onDeployTemplate = (name: string) => {} } = $props<{ onDeployTemplate?: (name: string) => void }>();

	const templates = [
		{
			id: 'tpl-svelte',
			title: m.tpl_svelte_title(),
			desc: m.tpl_svelte_desc(),
			stars: '1.4k',
			framework: 'SvelteKit 2 + Svelte 5',
			badge: 'Fullstack',
			gradient: 'from-orange-500/20 to-amber-500/10',
			icon: IconBrandSvelte,
			iconColor: 'text-orange-500'
		},
		{
			id: 'tpl-nest',
			title: m.tpl_nest_title(),
			desc: m.tpl_nest_desc(),
			stars: '2.8k',
			framework: 'NestJS 11 + Bun',
			badge: 'Microservices',
			gradient: 'from-red-500/20 to-pink-500/10',
			icon: IconServer,
			iconColor: 'text-red-500'
		},
		{
			id: 'tpl-next',
			title: m.tpl_next_title(),
			desc: m.tpl_next_desc(),
			stars: '3.1k',
			framework: 'Next.js 15 + React 19',
			badge: 'SSR / Edge',
			gradient: 'from-blue-500/20 to-cyan-500/10',
			icon: IconBrandNextjs,
			iconColor: 'text-blue-500'
		},
		{
			id: 'tpl-go',
			title: m.tpl_go_title(),
			desc: m.tpl_go_desc(),
			stars: '1.9k',
			framework: 'Go 1.23 + Fiber',
			badge: 'High Performance',
			gradient: 'from-cyan-500/20 to-teal-500/10',
			icon: IconBolt,
			iconColor: 'text-cyan-500'
		}
	];
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-base font-bold tracking-tight text-foreground">{m.section_templates_title()}</h2>
			<p class="text-xs text-muted-foreground">{m.section_templates_desc()}</p>
		</div>
		<a
			href="/templates"
			class="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
		>
			<span>{m.btn_browse_templates()}</span>
			<IconArrowRight size={13} />
		</a>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each templates as tpl}
			<div
				class="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg hover:shadow-primary/5"
			>
				<div>
					<div class="flex items-center justify-between">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80 {tpl.iconColor}">
							<tpl.icon size={22} stroke={2} />
						</div>
						<div class="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
							<IconStar size={13} class="text-amber-500 fill-amber-500" />
							<span>{tpl.stars}</span>
						</div>
					</div>

					<div class="mt-4">
						<div class="flex items-center gap-2">
							<h3 class="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
								{tpl.title}
							</h3>
						</div>
						<p class="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
							{tpl.desc}
						</p>
					</div>

					<div class="mt-3">
						<span class="rounded bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold text-foreground">
							{tpl.framework}
						</span>
					</div>
				</div>

				<div class="mt-5 pt-3 border-t border-border/40">
					<button
						type="button"
						onclick={() => onDeployTemplate(tpl.title)}
						class="flex w-full items-center justify-center gap-1.5 rounded-xl bg-secondary/80 py-2 text-xs font-semibold text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
					>
						<IconRocket size={13} />
						<span>{m.template_btn_deploy()}</span>
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

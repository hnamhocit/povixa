<script lang="ts">
	import {
		IconGitBranch,
		IconExternalLink,
		IconSettings,
		IconServer,
		IconBrandGithub,
		IconCopy,
		IconCheck,
		IconActivity
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	export type AppItem = {
		id: string;
		name: string;
		framework: 'SvelteKit' | 'NestJS' | 'Next.js' | 'Go Service' | 'Flutter Web';
		url: string;
		gitRepo: string;
		branch: string;
		commit: string;
		commitMsg: string;
		status: 'Healthy' | 'Building' | 'Deploying' | 'Standby';
		environment: 'Production' | 'Staging' | 'Preview';
		region: string;
		deployedTime: string;
		reqCount: string;
	};

	let { app } = $props<{ app: AppItem }>();

	let copiedUrl = $state(false);

	async function copyUrl() {
		try {
			await navigator.clipboard.writeText(app.url);
			copiedUrl = true;
			setTimeout(() => {
				copiedUrl = false;
			}, 2000);
		} catch (e) {
			console.error(e);
		}
	}

	const statusColors: Record<string, { bg: string; text: string; dot: string; label: string }> = {
		Healthy: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-500', dot: 'bg-emerald-500', label: 'Healthy & Live' },
		Building: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-500', dot: 'bg-amber-500 animate-pulse', label: 'Building...' },
		Deploying: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-500', dot: 'bg-blue-500 animate-ping', label: 'Deploying...' },
		Standby: { bg: 'bg-zinc-500/10 border-zinc-500/20', text: 'text-zinc-400', dot: 'bg-zinc-500', label: 'Standby' }
	};

	const st = $derived(statusColors[app.status] || statusColors.Standby);
</script>

<div
	class="group relative flex flex-col justify-between rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5"
>
	<div class="space-y-4">
		<!-- Card Top Row: Name, Status, Framework -->
		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0 space-y-1">
				<div class="flex items-center gap-2.5">
					<h3 class="truncate text-base lg:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
						{app.name}
					</h3>
					<span class="shrink-0 rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground font-mono">
						{app.framework}
					</span>
				</div>

				<!-- Live URL -->
				<div class="flex items-center gap-2 text-xs text-muted-foreground">
					<a
						href={app.url}
						target="_blank"
						rel="noopener noreferrer"
						class="truncate hover:text-foreground hover:underline font-mono text-[11px]"
					>
						{app.url.replace('https://', '')}
					</a>
					<button
						type="button"
						onclick={copyUrl}
						class="p-0.5 text-muted-foreground hover:text-foreground transition-colors"
						title="Copy URL"
					>
						{#if copiedUrl}
							<IconCheck size={13} class="text-emerald-500" />
						{:else}
							<IconCopy size={13} />
						{/if}
					</button>
				</div>
			</div>

			<!-- Status Badge -->
			<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold {st.bg} {st.text}">
				<span class="h-1.5 w-1.5 rounded-full {st.dot}"></span>
				<span>{st.label}</span>
			</span>
		</div>

		<!-- Git & Deployment Metadata -->
		<div class="space-y-2 pt-2 border-t border-border/40 text-xs">
			<div class="flex items-center justify-between text-[11px] text-muted-foreground">
				<div class="flex items-center gap-1.5 truncate">
					<IconBrandGithub size={14} class="shrink-0 text-foreground/70" />
					<span class="font-mono truncate">{app.gitRepo}</span>
				</div>
				<div class="flex items-center gap-1 shrink-0 font-mono text-primary font-semibold">
					<IconGitBranch size={13} />
					<span>{app.branch}</span>
				</div>
			</div>

			<div class="text-[11px] text-foreground/80 truncate">
				<span class="font-mono text-muted-foreground font-medium mr-1.5">[{app.commit}]</span>
				<span>{app.commitMsg}</span>
			</div>
		</div>
	</div>

	<!-- Bottom Row: Region, Requests, Actions -->
	<div class="mt-5 flex items-center justify-between pt-4 border-t border-border/40 text-xs">
		<div class="flex items-center gap-3 text-[11px] text-muted-foreground">
			<span class="flex items-center gap-1">
				<IconServer size={13} class="opacity-70" />
				<span>{app.region}</span>
			</span>
			<span>•</span>
			<span class="font-mono font-medium">{app.reqCount}</span>
		</div>

		<div class="flex items-center gap-2">
			<a
				href={app.url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors"
			>
				<span>{m.btn_visit_app()}</span>
				<IconExternalLink size={12} />
			</a>
			<button
				type="button"
				class="rounded-xl border border-border/40 p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
				title={m.btn_manage()}
			>
				<IconSettings size={15} />
			</button>
		</div>
	</div>
</div>

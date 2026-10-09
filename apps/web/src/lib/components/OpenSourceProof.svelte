<script lang="ts">
	import {
		IconBrandGithub,
		IconStarFilled,
		IconCopy,
		IconCheck,
		IconServer,
		IconShieldCheck,
		IconExternalLink
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let activeDeployTab = $state<'curl' | 'docker' | 'helm'>('curl');
	let copied = $state(false);

	const snippets: Record<'curl' | 'docker' | 'helm', string> = {
		curl: `# 1. Download & run automated self-host stack in 15 seconds
curl -fsSL https://get.povixa.cloud | bash

# 2. Open dashboard locally
open http://localhost:8080/setup`,
		docker: `# docker-compose.yml
services:
  povixa-core:
    image: ghcr.io/hnamhocit/povixa-core:v2.4.0
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - POVIXA_MODE=self-hosted
      - DATABASE_URL=postgres://povixa:secret@db:5432/povixa
    volumes:
      - povixa_data:/var/lib/povixa

volumes:
  povixa_data:`,
		helm: `# Kubernetes Helm Quickstart
helm repo add povixa https://charts.povixa.cloud
helm repo update
helm install povixa hnamhocit/povixa-stack \\
  --namespace povixa \\
  --create-namespace \\
  --set ingress.enabled=true`
	};

	async function copySnippet() {
		try {
			await navigator.clipboard.writeText(snippets[activeDeployTab]);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy', err);
		}
	}
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-md md:p-10"
>
	<!-- Ambient glow behind the block -->
	<div
		class="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
	></div>

	<div class="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
		<!-- Left: GitHub Live Proof & Philosophy -->
		<div>
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
			>
				<IconShieldCheck size={14} stroke={2.5} />
				<span>{m.oss_badge()}</span>
			</div>

			<h3
				class="mt-4 font-sans text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl"
			>
				{m.oss_title()}
			</h3>

			<p class="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
				{m.oss_desc()}
			</p>

			<!-- Live GitHub Repository Stats Card -->
			<div class="mt-6 rounded-xl border border-border/80 bg-background/80 p-4 shadow-sm">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<div class="flex items-center gap-2.5">
						<div
							class="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background"
						>
							<IconBrandGithub size={20} stroke={2} />
						</div>
						<div>
							<a
								href="https://github.com/hnamhocit/povixa"
								target="_blank"
								rel="noopener noreferrer"
								class="group inline-flex items-center gap-1 font-mono text-sm font-bold text-foreground hover:text-primary"
							>
								<span>hnamhocit/povixa</span>
								<IconExternalLink
									size={12}
									class="opacity-60 transition-opacity group-hover:opacity-100"
								/>
							</a>
							<p class="text-[11px] text-muted-foreground">Public • AGPL-3.0 & MIT Client SDKs</p>
						</div>
					</div>

					<a
						href="https://github.com/hnamhocit/povixa"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-muted"
					>
						<IconStarFilled size={13} class="text-amber-400" />
						<span>Star</span>
						<span class="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-primary"
							>4,920</span
						>
					</a>
				</div>

				<!-- Stats bar -->
				<div
					class="mt-4 grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 pt-3 text-center"
				>
					<div>
						<p class="font-mono text-xs font-bold text-foreground">4,920 ★</p>
						<p class="text-[10px] text-muted-foreground">GitHub Stars</p>
					</div>
					<div>
						<p class="font-mono text-xs font-bold text-foreground">418 🍴</p>
						<p class="text-[10px] text-muted-foreground">Forks</p>
					</div>
					<div>
						<p class="font-mono text-xs font-bold text-emerald-500">v2.4.0 🚀</p>
						<p class="text-[10px] text-muted-foreground">Latest Release</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Self-Host Quick Terminal -->
		<div class="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1117] shadow-2xl">
			<!-- Terminal Header -->
			<div
				class="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-2.5"
			>
				<!-- Window buttons -->
				<div class="flex items-center gap-1.5">
					<div class="h-2.5 w-2.5 rounded-full bg-rose-500/80"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
				</div>

				<!-- Tabs -->
				<div class="flex items-center rounded-md bg-zinc-900 p-0.5 font-mono text-[11px]">
					<button
						type="button"
						onclick={() => (activeDeployTab = 'curl')}
						class="rounded px-2.5 py-1 font-medium transition-all {activeDeployTab === 'curl'
							? 'bg-zinc-800 text-zinc-100 shadow-xs'
							: 'text-zinc-400 hover:text-zinc-200'}"
					>
						curl | bash
					</button>
					<button
						type="button"
						onclick={() => (activeDeployTab = 'docker')}
						class="rounded px-2.5 py-1 font-medium transition-all {activeDeployTab === 'docker'
							? 'bg-zinc-800 text-zinc-100 shadow-xs'
							: 'text-zinc-400 hover:text-zinc-200'}"
					>
						Docker Compose
					</button>
					<button
						type="button"
						onclick={() => (activeDeployTab = 'helm')}
						class="rounded px-2.5 py-1 font-medium transition-all {activeDeployTab === 'helm'
							? 'bg-zinc-800 text-zinc-100 shadow-xs'
							: 'text-zinc-400 hover:text-zinc-200'}"
					>
						Helm / K8s
					</button>
				</div>

				<!-- Copy button -->
				<button
					type="button"
					onclick={copySnippet}
					class="inline-flex items-center gap-1 rounded bg-zinc-900 px-2 py-1 font-mono text-[10px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
					title="Copy command"
				>
					{#if copied}
						<IconCheck size={12} class="text-emerald-400" />
						<span class="text-emerald-400">Copied</span>
					{:else}
						<IconCopy size={12} />
						<span>Copy</span>
					{/if}
				</button>
			</div>

			<!-- Terminal Body -->
			<div class="p-4">
				<pre
					class="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300 selection:bg-primary/30"><code
						>{snippets[activeDeployTab]}</code
					></pre>
			</div>

			<!-- Terminal Footer -->
			<div
				class="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-950/60 px-4 py-2 font-mono text-[11px] text-zinc-500"
			>
				<div class="flex items-center gap-1.5">
					<IconServer size={13} class="text-emerald-400" />
					<span>Zero telemetry phone-home</span>
				</div>
				<span>Bare-metal ready</span>
			</div>
		</div>
	</div>
</div>

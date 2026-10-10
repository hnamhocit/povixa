<script lang="ts">
	import {
		IconCoins,
		IconBrandGithub,
		IconArrowUpRight,
		IconGitPullRequest
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const sampleContributors = [
		{
			name: 'Alexandre Chen',
			handle: '@alexchen',
			role: 'Core Engine & S3 Driver',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
			prs: 42
		},
		{
			name: 'Elena Rostova',
			handle: '@elena_r',
			role: 'Hetzner & Docker Driver',
			avatar:
				'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
			prs: 28
		},
		{
			name: 'Minh Nguyễn',
			handle: '@minh_dev',
			role: 'Push & Webhook Bus',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
			prs: 35
		},
		{
			name: 'Sarah Lindqvist',
			handle: '@sarah_l',
			role: 'Passkeys & OIDC Module',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
			prs: 19
		},
		{
			name: 'Khoa Đặng',
			handle: '@khoa_d',
			role: 'Analytics & Cohort Engine',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
			prs: 24
		},
		{
			name: 'Marcus Vance',
			handle: '@marcus_v',
			role: 'SDK Docs & Quickstarts',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
			prs: 31
		}
	];
</script>

<div class="relative overflow-hidden border-y border-border/70 py-14 md:py-24">
	<div
		class="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,hsl(var(--border)/.22)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/.22)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [background-size:32px_32px] opacity-60"
	></div>

	<div class="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
		<div>
			<div
				class="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-emerald-500 uppercase"
			>
				<IconCoins size={15} stroke={2.5} />
				<span>{m.contributor_badge()}</span>
			</div>

			<h3
				class="mt-6 max-w-3xl font-sans text-5xl leading-[.94] font-extrabold tracking-[-0.055em] text-foreground sm:text-6xl md:text-7xl"
			>
				{m.contributor_title()}
			</h3>
			<p class="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
				{m.contributor_desc()}
			</p>
			<div class="mt-8 flex flex-wrap items-center gap-5">
				<a
					href="/sponsor?type=code"
					class="inline-flex items-center gap-2 bg-foreground px-5 py-3 font-mono text-xs font-bold text-background transition-opacity hover:opacity-85"
				>
					<IconBrandGithub size={16} stroke={2} />
					<span>{m.contributor_cta_code()}</span>
				</a>
				<a
					href="#contributors-wall"
					class="font-mono text-xs font-bold text-primary hover:underline"
				>
					{m.contributor_cta_wall()}
				</a>
			</div>
		</div>

		<div class="relative border-l-2 border-emerald-500 pl-6 sm:pl-10 lg:pb-3">
			<p class="font-mono text-[11px] font-bold tracking-[0.18em] text-muted-foreground uppercase">
				{m.contributor_badge()}
			</p>
			<p
				class="mt-2 font-sans text-[6.5rem] leading-[.78] font-extrabold tracking-[-0.09em] text-emerald-500 sm:text-[9rem]"
			>
				30%
			</p>
			<p class="mt-7 max-w-xs text-base leading-relaxed text-foreground/80">
				{m.contributor_stat_1_lbl()}
			</p>
			<a
				href="/sponsor?type=code"
				class="mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold text-primary hover:underline"
			>
				<span>{m.contributor_cta_github()}</span>
				<IconArrowUpRight size={14} stroke={2.5} />
			</a>
		</div>
	</div>

	<!-- Hall of Gratitude & Contributors Grid -->
	<div id="contributors-wall" class="mt-20 border-t border-border/60 pt-10">
		<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
			<div>
				<h4 class="font-sans text-base font-bold text-foreground">
					{m.contributor_cta_wall()}
				</h4>
				<p class="text-xs text-muted-foreground">
					Những người tiên phong viết code, bảo mật và tài liệu cho Povixa
				</p>
			</div>

			<a
				href="/sponsor?type=code"
				class="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary hover:underline"
			>
				<span>{m.contributor_cta_github()}</span>
				<IconArrowUpRight size={13} stroke={2.5} />
			</a>
		</div>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
			{#each sampleContributors as c (c.handle)}
				<a
					href="https://github.com/{c.handle.replace('@', '')}"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex flex-col items-center rounded-xl border border-border/70 bg-card/70 p-3.5 text-center shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-card"
				>
					<img
						src={c.avatar}
						alt={c.name}
						class="h-12 w-12 rounded-full border border-border object-cover transition-transform group-hover:scale-105"
						loading="lazy"
					/>
					<p class="mt-2.5 w-full truncate font-sans text-xs font-bold text-foreground">
						{c.name}
					</p>
					<p class="w-full truncate font-mono text-[10px] text-primary">
						{c.handle}
					</p>
					<p class="mt-1 w-full truncate text-[9px] text-muted-foreground">
						{c.role}
					</p>
					<div
						class="mt-2 inline-flex items-center gap-1 rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground"
					>
						<IconGitPullRequest size={10} stroke={2.5} />
						<span>{c.prs} PRs</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

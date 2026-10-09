<script lang="ts">
	import {
		IconCoins,
		IconBrandGithub,
		IconArrowUpRight,
		IconHeartHandshake,
		IconGitPullRequest,
		IconHeart,
		IconGitBranch,
		IconCircleCheck
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

<div
	class="relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-md md:p-10"
>
	<!-- Ambient atmospheric background glow -->
	<div
		class="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
	></div>

	<!-- Section Header -->
	<div class="mx-auto max-w-3xl text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-emerald-500"
		>
			<IconCoins size={15} stroke={2.5} />
			<span>{m.contributor_badge()}</span>
		</div>

		<h3
			class="mt-4 font-sans text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl"
		>
			{m.contributor_title()}
		</h3>

		<p class="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
			{m.contributor_desc()}
		</p>
	</div>

	<!-- 3 Real Impact & Activity Stat Cards -->
	<div class="mt-10 grid gap-4 sm:grid-cols-3">
		<div class="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-center shadow-xs">
			<div
				class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500"
			>
				<IconHeartHandshake size={20} stroke={2.5} />
			</div>
			<p class="font-sans text-3xl font-extrabold tracking-tight text-emerald-500 sm:text-4xl">
				{m.contributor_stat_1_val()}
			</p>
			<p class="mt-2 text-xs font-semibold text-foreground/90 sm:text-sm">
				{m.contributor_stat_1_lbl()}
			</p>
		</div>

		<div class="rounded-xl border border-border/80 bg-background/80 p-5 text-center shadow-xs">
			<div
				class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
			>
				<IconGitBranch size={20} stroke={2.5} />
			</div>
			<p class="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
				{m.contributor_stat_2_val()}
			</p>
			<p class="mt-2 text-xs font-semibold text-foreground/90 sm:text-sm">
				{m.contributor_stat_2_lbl()}
			</p>
		</div>

		<div class="rounded-xl border border-border/80 bg-background/80 p-5 text-center shadow-xs">
			<div
				class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"
			>
				<IconCircleCheck size={20} stroke={2.5} />
			</div>
			<p class="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
				{m.contributor_stat_3_val()}
			</p>
			<p class="mt-2 text-xs font-semibold text-foreground/90 sm:text-sm">
				{m.contributor_stat_3_lbl()}
			</p>
		</div>
	</div>

	<!-- 3 Weighted Impact Rules -->
	<div class="mt-6 grid gap-3.5 sm:grid-cols-3">
		<div class="rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
			<h4 class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
				<span
					class="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary"
					>1</span
				>
				<span>{m.contributor_rule_1_title()}</span>
			</h4>
			<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
				{m.contributor_rule_1_desc()}
			</p>
		</div>

		<div class="rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
			<h4 class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
				<span
					class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 font-mono text-[10px] font-bold text-emerald-500"
					>2</span
				>
				<span>{m.contributor_rule_2_title()}</span>
			</h4>
			<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
				{m.contributor_rule_2_desc()}
			</p>
		</div>

		<div class="rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
			<h4 class="flex items-center gap-2 font-sans text-xs font-bold text-foreground">
				<span
					class="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15 font-mono text-[10px] font-bold text-amber-500"
					>3</span
				>
				<span>{m.contributor_rule_3_title()}</span>
			</h4>
			<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
				{m.contributor_rule_3_desc()}
			</p>
		</div>
	</div>

	<!-- Hall of Gratitude & Contributors Grid -->
	<div class="mt-12 border-t border-border/60 pt-8">
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

	<!-- Bottom Action CTA: Cả đóng góp mã nguồn lẫn tài trợ đều qua trang cảm ơn! -->
	<div
		class="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-border/60 pt-6"
	>
		<a
			href="/sponsor?type=code"
			class="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 font-mono text-xs font-bold text-background shadow-sm transition-opacity hover:opacity-90"
		>
			<IconBrandGithub size={16} stroke={2} />
			<span>{m.contributor_cta_code()}</span>
		</a>

		<a
			href="/sponsor?type=sponsor"
			class="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-5 py-2.5 font-mono text-xs font-bold text-rose-500 transition-colors hover:bg-rose-500/20"
		>
			<IconHeart size={16} stroke={2.5} />
			<span>{m.contributor_cta_sponsor()}</span>
		</a>
	</div>
</div>

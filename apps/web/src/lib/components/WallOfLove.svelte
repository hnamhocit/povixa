<script lang="ts">
	import {
		IconBrandX,
		IconBrandGithub,
		IconHeartFilled,
		IconMessageCircle,
		IconCheck
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const reviews = [
		{
			author: 'Alexandre Chen',
			handle: '@alexchen_dev',
			role: 'CTO @ Framewrk',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
			platform: 'x',
			badge: 'Migrated from Auth0 + Stripe',
			badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-500',
			get text() {
				return m.review_1_text();
			},
			likes: 284,
			replies: 31,
			time: '2h ago'
		},
		{
			author: 'Minh Nguyễn',
			handle: '@minh_saas',
			role: 'Indie Hacker • $18k MRR',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
			platform: 'x',
			badge: 'Community Badge + Pro',
			badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
			get text() {
				return m.review_2_text();
			},
			likes: 412,
			replies: 56,
			time: 'Yesterday'
		},
		{
			author: 'Elena Rostova',
			handle: '@elena_orbit',
			role: 'Lead Platform @ Orbit Labs',
			avatar:
				'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
			platform: 'github',
			badge: 'Self-Hosted on Hetzner VPC',
			badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-500',
			get text() {
				return m.review_3_text();
			},
			likes: 198,
			replies: 24,
			time: '3d ago'
		},
		{
			author: 'Sarah Lindqvist',
			handle: '@sarah_codes',
			role: 'Fullstack Systems Hacker',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
			platform: 'x',
			badge: 'Zero Vendor Lock-in',
			badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
			get text() {
				return m.review_4_text();
			},
			likes: 345,
			replies: 42,
			time: '4d ago'
		},
		{
			author: 'Khoa Đặng',
			handle: '@khoa_tech',
			role: 'Founder @ DevHub Global',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
			platform: 'hn',
			badge: 'No SaaS Bill Surprises',
			badgeColor: 'border-rose-500/30 bg-rose-500/10 text-rose-500',
			get text() {
				return m.review_5_text();
			},
			likes: 521,
			replies: 89,
			time: 'Oct 8'
		},
		{
			author: 'Marcus Vance',
			handle: '@marcus_sys',
			role: 'Core OSS Contributor',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
			platform: 'github',
			badge: 'True Open-Source Stack',
			badgeColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-500',
			get text() {
				return m.review_6_text();
			},
			likes: 276,
			replies: 19,
			time: 'Oct 6'
		}
	];
</script>

<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
	{#each reviews as review (review.handle)}
		<div
			class="group flex flex-col justify-between rounded-xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
		>
			<div>
				<!-- Author Header -->
				<div class="flex items-start justify-between gap-3">
					<div class="flex items-center gap-3">
						<img
							src={review.avatar}
							alt={review.author}
							class="h-10 w-10 rounded-full border border-border object-cover"
							loading="lazy"
						/>
						<div>
							<div class="flex items-center gap-1.5">
								<span class="font-sans text-sm font-bold text-foreground">{review.author}</span>
								<span
									class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
									title="Verified Builder"
								>
									✓
								</span>
							</div>
							<p class="font-mono text-xs text-muted-foreground">{review.handle}</p>
						</div>
					</div>

					<!-- Platform Icon -->
					<div class="text-muted-foreground/60 transition-colors group-hover:text-foreground">
						{#if review.platform === 'x'}
							<IconBrandX size={16} stroke={2} />
						{:else if review.platform === 'github'}
							<IconBrandGithub size={16} stroke={2} />
						{:else}
							<span
								class="rounded bg-amber-500/20 px-1 py-0.5 font-mono text-[9px] font-bold text-amber-500"
								>HN</span
							>
						{/if}
					</div>
				</div>

				<!-- Verified Deployment Tag -->
				<div class="mt-3">
					<span
						class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium {review.badgeColor}"
					>
						<IconCheck size={11} stroke={3} />
						{review.badge}
					</span>
				</div>

				<!-- Review Body -->
				<p class="mt-3.5 font-sans text-xs leading-relaxed text-foreground/90 sm:text-sm">
					"{review.text}"
				</p>
			</div>

			<!-- Interaction / Metric Footer -->
			<div
				class="mt-5 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-[11px] text-muted-foreground"
			>
				<div class="flex items-center gap-4">
					<span
						class="flex cursor-pointer items-center gap-1 transition-colors hover:text-rose-500"
					>
						<IconHeartFilled size={12} class="text-rose-500/70" />
						<span>{review.likes}</span>
					</span>
					<span
						class="flex cursor-pointer items-center gap-1 transition-colors hover:text-foreground"
					>
						<IconMessageCircle size={12} />
						<span>{review.replies}</span>
					</span>
				</div>
				<span>{review.time}</span>
			</div>
		</div>
	{/each}
</div>

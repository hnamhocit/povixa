<script lang="ts">
	import {
		IconFingerprint,
		IconShieldCheck,
		IconDeviceMobile,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const benefits = [
		{
			icon: IconFingerprint,
			get title() {
				return m.feature_sso_title();
			},
			get desc() {
				return m.feature_sso_desc();
			},
			badge: 'Tiện lợi',
			accent: 'from-blue-500/10 to-indigo-500/10'
		},
		{
			icon: IconShieldCheck,
			get title() {
				return m.feature_sec_title();
			},
			get desc() {
				return m.feature_sec_desc();
			},
			badge: 'An tâm',
			accent: 'from-emerald-500/10 to-teal-500/10'
		},
		{
			icon: IconDeviceMobile,
			get title() {
				return m.feature_speed_title();
			},
			get desc() {
				return m.feature_speed_desc();
			},
			badge: 'Nhanh chóng',
			accent: 'from-purple-500/10 to-pink-500/10'
		}
	];
</script>

<section
	id="features"
	class="mx-auto max-w-7xl border-t border-border/40 px-4 py-16 sm:px-6 lg:px-8"
>
	<div class="mx-auto mb-12 max-w-2xl text-center">
		<div
			class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
		>
			<IconSparkles size={14} />
			<span>Trải nghiệm đơn giản & an toàn</span>
		</div>
		<h2 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
			Tại sao nên dùng tài khoản Povixa?
		</h2>
		<p class="mt-3 text-sm text-muted-foreground sm:text-base">
			Được thiết kế để giúp bạn đăng nhập nhanh hơn, bảo vệ an toàn thông tin cá nhân và làm việc
			liền mạch trên mọi nền tảng.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each benefits as b (b.badge)}
			{@const Icon = b.icon}
			<div
				class="group relative rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card/90 hover:shadow-lg sm:p-7"
			>
				<div
					class="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br {b.accent} -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>

				<div class="mb-4 flex items-center justify-between">
					<div
						class="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105"
					>
						<Icon size={22} stroke={2} />
					</div>
					<span
						class="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
					>
						{b.badge}
					</span>
				</div>

				<h3 class="text-base font-bold tracking-tight text-foreground sm:text-lg">
					{b.title}
				</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
					{b.desc}
				</p>
			</div>
		{/each}
	</div>
</section>

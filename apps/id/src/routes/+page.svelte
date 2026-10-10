<script lang="ts">
	import AuthCard from '#lib/components/AuthCard.svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import LanguageSwitcher from '#lib/components/LanguageSwitcher.svelte';
	import { IconArrowRight } from '@tabler/icons-svelte-runes';
	import { getLocale } from '#lib/paraglide/runtime.js';
</script>

<svelte:head>
	<title>{getLocale() === 'en' ? 'Povixa Auth — Unified Ecosystem Authentication' : 'Povixa Auth — Cổng Xác Thực Tập Trung Hệ Sinh Thái'}</title>
</svelte:head>

<!-- Main Screen Section with Split Layout -->
<section class="relative min-h-screen flex flex-col justify-center bg-background text-foreground overflow-hidden">
	<!-- Top Left: Authentic Povixa 3-Layer Brand Mark -->
	<div class="absolute top-6 left-6 sm:top-8 sm:left-10 z-30">
		<a href="https://povixa.cloud" class="flex items-center gap-2.5 group">
			<!-- Official Povixa Isometric 3-Layer Logo -->
			<div
				class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 transition-transform group-hover:scale-105"
			>
				<svg
					viewBox="0 0 24 24"
					class="size-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2.3"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 2L2 7l10 5 10-5-10-5z" />
					<path d="M2 17l10 5 10-5" />
					<path d="M2 12l10 5 10-5" />
				</svg>
			</div>
			<div class="flex items-center gap-2">
				<span class="font-bold text-xl tracking-tight text-foreground font-sans">POVIXA</span>
				<span class="rounded-md bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">
					AUTH
				</span>
			</div>
		</a>
	</div>

	<!-- Top Right: Language & Theme Switcher -->
	<div class="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 flex items-center gap-2.5">
		<LanguageSwitcher />
		<ThemeToggle />
	</div>

	<!-- Main Two-Column Viewport -->
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-16 min-h-screen flex items-center">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 w-full items-center">
			<!-- LEFT COLUMN: Headline + Auth Card + Secondary Action -->
			<div class="lg:col-span-6 xl:col-span-5 flex flex-col items-center justify-center text-center">
				<!-- Povixa Headline (Font Sans) -->
				<h1 class="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.15]">
					{getLocale() === 'en' ? 'Build without boundaries' : 'Vận hành không giới hạn'}
				</h1>
				<p class="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal max-w-md">
					{getLocale() === 'en'
						? 'One single account for Developer Console, Applications Hub, and the entire Povixa cloud ecosystem.'
						: 'Một tài khoản duy nhất cho Developer Console, Applications Hub và toàn bộ hệ sinh thái đám mây Povixa.'}
				</p>

				<!-- Auth Card -->
				<div class="mt-8 w-full max-w-[400px]">
					<AuthCard />
				</div>

				<!-- Secondary Action Button -->
				<div class="mt-6 flex justify-center">
					<a
						href="http://localhost:5173"
						class="inline-flex items-center gap-2 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-card px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-2xs group"
					>
						<span>{getLocale() === 'en' ? 'Explore Developer Console' : 'Khám phá Developer Console'}</span>
						<IconArrowRight size={13} class="transition-transform group-hover:translate-x-0.5" />
					</a>
				</div>
			</div>

			<!-- RIGHT COLUMN: High-Tech Povixa Cloud Visual -->
			<div class="hidden lg:flex lg:col-span-6 xl:col-span-7 items-center justify-center pl-4">
				<div
					class="relative w-full max-w-[620px] h-[720px] max-h-[85vh] rounded-[2.25rem] overflow-hidden shadow-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 flex items-center justify-center group"
				>
					<img
						src="/povixa-auth-visual.png"
						alt="Povixa Cloud Security & Architecture"
						class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
					/>
					<!-- Subtle Dark Vignette & Gradient Overlay -->
					<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-neutral-950/20"></div>
				</div>
			</div>
		</div>
	</div>
</section>

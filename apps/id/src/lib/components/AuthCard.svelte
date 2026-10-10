<script lang="ts">
	import {
		IconMail,
		IconLock,
		IconEye,
		IconEyeOff,
		IconCheck,
		IconAlertCircle,
		IconLoader2,
		IconArrowRight
	} from '@tabler/icons-svelte-runes';
	import SocialButton from './SocialButton.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { getLocale } from '#lib/paraglide/runtime.js';

	interface Props {
		initialTab?: 'login' | 'register';
		isRegister?: boolean;
	}

	let { initialTab, isRegister = $bindable(false) }: Props = $props();

	const requestedApp = $derived(page.url.searchParams.get('app') || 'console');
	const actionParam = $derived(page.url.searchParams.get('action'));
	const redirectUri = $derived(
		page.url.searchParams.get('redirect_uri') ||
			(requestedApp === 'apps'
				? 'http://localhost:5175'
				: requestedApp === 'admin'
					? 'http://localhost:5176'
					: 'http://localhost:5173')
	);
	const appDisplayName = $derived(
		requestedApp === 'console'
			? 'Developer Console'
			: requestedApp === 'apps'
				? 'Applications Hub'
				: requestedApp === 'admin'
					? 'Super Admin Portal'
					: requestedApp === 'docs'
						? 'Documentation'
						: 'Povixa Ecosystem'
	);

	let redirectCountdown = $state(1);

	onMount(() => {
		if (actionParam === 'logout') {
			try {
				localStorage.removeItem('pvx_sso_session');
			} catch (e) {
				// ignore
			}
			return;
		}

		try {
			const raw = localStorage.getItem('pvx_sso_session');
			if (raw) {
				const session = JSON.parse(raw);
				if (session && session.user) {
					authSuccess = session;
					const target = new URL(redirectUri);
					target.searchParams.set('sso_session', encodeURIComponent(raw));
					setTimeout(() => {
						window.location.replace(target.toString());
					}, 350);
				}
			}
		} catch (e) {
			// ignore
		}
	});

	function onAuthCompleted(user: string, provider: string) {
		const sessionData = {
			user,
			provider,
			token: 'pvx_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
			time: Date.now()
		};
		const raw = JSON.stringify(sessionData);
		try {
			localStorage.setItem('pvx_sso_session', raw);
		} catch (e) {
			// ignore
		}
		authSuccess = sessionData;

		const target = new URL(redirectUri);
		target.searchParams.set('sso_session', encodeURIComponent(raw));

		const timer = setInterval(() => {
			redirectCountdown -= 1;
			if (redirectCountdown <= 0) {
				clearInterval(timer);
				window.location.replace(target.toString());
			}
		}, 400);
	}

	// Unified Auth Credentials (Only Email & Password)
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	// Interaction state
	let isSubmitting = $state(false);
	let socialLoading = $state<string | null>(null);
	let authSuccess = $state<{ user: string; provider: string } | null>(null);
	let errorMessage = $state<string | null>(null);

	async function handleSocialLogin(provider: 'google' | 'facebook' | 'github' | 'discord') {
		socialLoading = provider;
		errorMessage = null;
		await new Promise((resolve) => setTimeout(resolve, 700));
		socialLoading = null;
		onAuthCompleted(`${provider}.user@povixa.cloud`, provider.toUpperCase());
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email.trim() || !password) {
			errorMessage = 'Vui lòng nhập đầy đủ email và mật khẩu.';
			return;
		}

		isSubmitting = true;
		errorMessage = null;
		await new Promise((resolve) => setTimeout(resolve, 600));
		isSubmitting = false;
		onAuthCompleted(email.trim(), 'Email & Password');
	}
</script>

<div class="w-full">
	{#if authSuccess}
		<!-- Authentication Success State -->
		<div class="flex animate-in flex-col items-center py-6 text-center duration-300 zoom-in-95 fade-in">
			<div
				class="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5 dark:bg-emerald-500/20"
			>
				<IconCheck size={30} stroke={2.5} />
			</div>

			<h3 class="text-xl font-bold tracking-tight text-foreground">Đăng nhập thành công!</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				Xin chào <span class="font-medium text-foreground">{authSuccess.user}</span>
			</p>

			<div class="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3.5 py-2 text-xs text-primary font-medium">
				<IconLoader2 size={15} class="animate-spin" />
				<span>Đang tự động chuyển hướng về {appDisplayName}...</span>
			</div>

			<a
				href={redirectUri}
				class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
			>
				<span>Tiếp tục vào {appDisplayName}</span>
				<IconArrowRight size={16} />
			</a>
		</div>
	{:else}
		<!-- Error Message Banner -->
		{#if errorMessage}
			<div
				class="mb-4 flex animate-in items-center gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs text-destructive fade-in"
			>
				<IconAlertCircle size={15} class="shrink-0" />
				<span>{errorMessage}</span>
			</div>
		{/if}

		<!-- Clean Minimal Auth Card -->
		<div class="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/95 p-6 sm:p-7 shadow-xs">
			<!-- Primary Social Buttons: Google & Facebook (Large buttons) -->
			<div class="space-y-2.5">
				<SocialButton
					provider="google"
					label={getLocale() === 'en' ? 'Continue with Google' : 'Tiếp tục với Google'}
					loading={socialLoading === 'google'}
					size="lg"
					onclick={handleSocialLogin}
				/>
				<SocialButton
					provider="facebook"
					label={getLocale() === 'en' ? 'Continue with Facebook' : 'Tiếp tục với Facebook'}
					loading={socialLoading === 'facebook'}
					size="lg"
					onclick={handleSocialLogin}
				/>
				<!-- Secondary Social Buttons: GitHub & Discord (Small compact buttons) -->
				<div class="grid grid-cols-2 gap-2 pt-0.5">
					<SocialButton
						provider="github"
						label="GitHub"
						loading={socialLoading === 'github'}
						size="sm"
						onclick={handleSocialLogin}
					/>
					<SocialButton
						provider="discord"
						label="Discord"
						loading={socialLoading === 'discord'}
						size="sm"
						onclick={handleSocialLogin}
					/>
				</div>
			</div>

			<!-- Clean OR Divider -->
			<div class="relative my-4.5 flex items-center justify-center">
				<div class="w-full border-t border-neutral-200/90 dark:border-neutral-800"></div>
				<span class="relative bg-white dark:bg-neutral-900 px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
					{getLocale() === 'en' ? 'OR' : 'HOẶC'}
				</span>
			</div>

			<!-- Unified Email & Password Form -->
			<form onsubmit={handleSubmit} class="space-y-3">
				<div>
					<input
						type="email"
						id="auth-email"
						name="email"
						autocomplete="username"
						inputmode="email"
						required
						bind:value={email}
						placeholder={getLocale() === 'en' ? 'Enter your email' : 'Nhập địa chỉ email của bạn'}
						class="w-full rounded-xl border border-neutral-200/90 dark:border-neutral-700 bg-white dark:bg-neutral-800/60 px-4 py-2.5 sm:py-3 text-sm text-foreground placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none dark:focus:border-neutral-500 transition-colors shadow-2xs"
					/>
				</div>

				<div class="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						id="auth-password"
						name="password"
						autocomplete="current-password"
						required
						bind:value={password}
						placeholder={getLocale() === 'en' ? 'Enter your password' : 'Nhập mật khẩu'}
						class="w-full rounded-xl border border-neutral-200/90 dark:border-neutral-700 bg-white dark:bg-neutral-800/60 px-4 py-2.5 sm:py-3 pr-10 text-sm text-foreground placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none dark:focus:border-neutral-500 transition-colors shadow-2xs"
					/>
					<button
						type="button"
						onclick={() => (showPassword = !showPassword)}
						class="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-foreground transition-colors focus:outline-none"
						aria-label={showPassword ? (getLocale() === 'en' ? 'Hide password' : 'Ẩn mật khẩu') : (getLocale() === 'en' ? 'Show password' : 'Hiện mật khẩu')}
					>
						{#if showPassword}
							<IconEyeOff size={16} />
						{:else}
							<IconEye size={16} />
						{/if}
					</button>
				</div>

				<!-- Black Submit Button -->
				<button
					type="submit"
					disabled={isSubmitting}
					class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 py-3 text-sm font-medium transition-colors shadow-xs active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{#if isSubmitting}
						<IconLoader2 class="size-4 animate-spin" />
						<span>{getLocale() === 'en' ? 'Authenticating...' : 'Đang xử lý xác thực...'}</span>
					{:else}
						<span>{getLocale() === 'en' ? 'Continue with Email' : 'Tiếp tục với Email'}</span>
					{/if}
				</button>
			</form>

			<!-- Disclaimer matching Povixa Terms & Privacy -->
			<p class="mt-4 text-center text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
				{#if getLocale() === 'en'}
					By continuing, you acknowledge Povixa's <a href="/terms" class="underline hover:text-foreground">Terms of Service</a> and <a href="/privacy" class="underline hover:text-foreground">Privacy Policy</a>.
				{:else}
					Bằng việc tiếp tục, bạn đồng ý với <a href="/terms" class="underline hover:text-foreground">Điều khoản dịch vụ</a> và <a href="/privacy" class="underline hover:text-foreground">Chính sách bảo mật</a> của Povixa.
				{/if}
			</p>
		</div>
	{/if}
</div>

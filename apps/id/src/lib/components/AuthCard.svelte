<script lang="ts">
	import {
		IconMail,
		IconLock,
		IconEye,
		IconEyeOff,
		IconUser,
		IconFingerprint,
		IconCheck,
		IconAlertCircle,
		IconLoader2,
		IconArrowRight
	} from '@tabler/icons-svelte-runes';
	import SocialButton from './SocialButton.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	interface Props {
		initialTab?: Tab;
		showTabSwitcher?: boolean;
	}

	type Tab = 'login' | 'register';

	let { initialTab = 'login', showTabSwitcher = true }: Props = $props();
	let activeTab = $state<Tab>('login');

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
			? 'Povixa Developer Console'
			: requestedApp === 'apps'
				? 'Povixa Applications Hub'
				: requestedApp === 'admin'
					? 'Povixa Super Admin'
					: requestedApp === 'docs'
						? 'Povixa Documentation'
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

	$effect(() => {
		if (initialTab !== 'login') activeTab = initialTab;
	});

	// Login state
	let loginEmail = $state('');
	let loginPassword = $state('');
	let showLoginPassword = $state(false);
	let rememberMe = $state(true);

	// Register state
	let registerName = $state('');
	let registerEmail = $state('');
	let registerPassword = $state('');
	let showRegisterPassword = $state(false);
	let agreeTerms = $state(false);

	// Interaction state
	let isSubmitting = $state(false);
	let socialLoading = $state<string | null>(null);
	let authSuccess = $state<{ user: string; provider: string } | null>(null);
	let errorMessage = $state<string | null>(null);

	// Password strength calculation
	let passwordScore = $derived.by(() => {
		const pwd = registerPassword;
		if (!pwd) return 0;
		let score = 0;
		if (pwd.length >= 8) score += 1;
		if (/[A-Z]/.test(pwd)) score += 1;
		if (/[0-9]/.test(pwd)) score += 1;
		if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
		return score;
	});

	let passwordStrengthLabel = $derived.by(() => {
		if (passwordScore <= 1) return m.password_strength_weak();
		if (passwordScore <= 3) return m.password_strength_medium();
		return m.password_strength_strong();
	});

	let passwordStrengthColor = $derived.by(() => {
		if (passwordScore <= 1) return 'bg-rose-500';
		if (passwordScore <= 3) return 'bg-amber-500';
		return 'bg-emerald-500';
	});

	async function handleSocialLogin(provider: 'google' | 'facebook' | 'github' | 'discord') {
		socialLoading = provider;
		errorMessage = null;
		await new Promise((resolve) => setTimeout(resolve, 800));
		socialLoading = null;
		onAuthCompleted(`${provider}.user@povixa.cloud`, provider.toUpperCase());
	}

	async function handleLoginSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!loginEmail || !loginPassword) {
			errorMessage = 'Vui lòng nhập đầy đủ email và mật khẩu.';
			return;
		}

		isSubmitting = true;
		errorMessage = null;
		await new Promise((resolve) => setTimeout(resolve, 750));
		isSubmitting = false;
		onAuthCompleted(loginEmail, 'Email & Mật khẩu');
	}

	async function handleRegisterSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!registerName || !registerEmail || !registerPassword) {
			errorMessage = 'Vui lòng điền đầy đủ các thông tin đăng ký.';
			return;
		}
		if (!agreeTerms) {
			errorMessage = 'Vui lòng đồng ý với Điều khoản dịch vụ để tiếp tục.';
			return;
		}

		isSubmitting = true;
		errorMessage = null;
		await new Promise((resolve) => setTimeout(resolve, 850));
		isSubmitting = false;
		onAuthCompleted(registerEmail, 'Tài khoản mới');
	}

	async function handlePasskeyLogin() {
		socialLoading = 'passkey';
		errorMessage = null;
		await new Promise((resolve) => setTimeout(resolve, 700));
		socialLoading = null;
		onAuthCompleted('biometric.user@povixa.cloud', 'Face ID / Touch ID');
	}

	function resetAuth() {
		authSuccess = null;
		loginPassword = '';
		registerPassword = '';
		errorMessage = null;
	}
</script>

<div class="relative w-full max-w-md">
	<!-- Main Card Container -->
	<div
		class="relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-shadow sm:p-8 dark:border-border/60"
	>
		{#if authSuccess}
			<!-- Authentication Success State -->
			<div
				class="flex animate-in flex-col items-center py-6 text-center duration-300 zoom-in-95 fade-in"
			>
				<div
					class="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5 dark:bg-emerald-500/20"
				>
					<IconCheck size={30} stroke={2.5} />
				</div>

				<h3 class="text-xl font-bold tracking-tight text-foreground">Đăng nhập thành công!</h3>
				<p class="mt-1.5 text-sm text-muted-foreground">
					Xin chào <span class="font-medium text-foreground">{authSuccess.user}</span>
				</p>

				<div class="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3.5 py-2 text-xs text-primary font-medium">
					<IconLoader2 size={15} class="animate-spin" />
					<span>Đang tự động chuyển hướng về {appDisplayName}...</span>
				</div>

				<a
					href={redirectUri}
					class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
				>
					<span>Tiếp tục vào {appDisplayName}</span>
					<IconArrowRight size={16} />
				</a>
			</div>
		{:else}
			<!-- SSO Target App Ribbon -->
			<div class="mb-5 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs">
				<div class="flex items-center gap-2 text-primary font-medium">
					<IconFingerprint size={16} />
					<span>Đăng nhập xác thực cho: <strong class="text-foreground">{appDisplayName}</strong></span>
				</div>
				<span class="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase font-mono">
					{requestedApp}
				</span>
			</div>

			<!-- Card Header -->
			<div class="mb-6 text-center sm:text-left">
				<h2 class="text-2xl font-bold tracking-tight text-foreground">
					{activeTab === 'login' ? m.auth_card_title_login() : m.auth_card_title_register()}
				</h2>
				<p class="mt-1 text-sm text-muted-foreground">
					{activeTab === 'login' ? m.auth_card_desc_login() : m.auth_card_desc_register()}
				</p>
			</div>

			<!-- Optional tab switcher for embedded consumers -->
			{#if showTabSwitcher}
				<div class="mb-6 flex rounded-xl border border-border/60 bg-muted/50 p-1">
					<button
						type="button"
						onclick={() => {
							activeTab = 'login';
							errorMessage = null;
						}}
						class="flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200 sm:text-sm {activeTab ===
						'login'
							? 'bg-background text-foreground shadow-xs'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						{m.auth_tab_login()}
					</button>
					<button
						type="button"
						onclick={() => {
							activeTab = 'register';
							errorMessage = null;
						}}
						class="flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200 sm:text-sm {activeTab ===
						'register'
							? 'bg-background text-foreground shadow-xs'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						{m.auth_tab_register()}
					</button>
				</div>
			{/if}

			<!-- Error Message Banner -->
			{#if errorMessage}
				<div
					class="mb-4 flex animate-in items-center gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-xs text-destructive fade-in"
				>
					<IconAlertCircle size={16} class="shrink-0" />
					<span>{errorMessage}</span>
				</div>
			{/if}

			<!-- Social Logins Grid -->
			<div class="space-y-2.5">
				<div class="grid grid-cols-2 gap-2.5">
					<SocialButton
						provider="google"
						label={m.auth_social_google()}
						loading={socialLoading === 'google'}
						onclick={handleSocialLogin}
					/>
					<SocialButton
						provider="github"
						label={m.auth_social_github()}
						loading={socialLoading === 'github'}
						onclick={handleSocialLogin}
					/>
					<SocialButton
						provider="discord"
						label={m.auth_social_discord()}
						loading={socialLoading === 'discord'}
						onclick={handleSocialLogin}
					/>
					<SocialButton
						provider="facebook"
						label={m.auth_social_facebook()}
						loading={socialLoading === 'facebook'}
						onclick={handleSocialLogin}
					/>
				</div>
			</div>

			<!-- Divider -->
			<div class="relative my-5 flex items-center justify-center">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-border/60"></div>
				</div>
				<div class="relative bg-card px-3 text-xs text-muted-foreground">
					{m.auth_or_email()}
				</div>
			</div>

			<!-- LOGIN FORM -->
			{#if activeTab === 'login'}
				<form onsubmit={handleLoginSubmit} class="space-y-4" novalidate={false}>
					<div>
						<label for="login-email" class="mb-1.5 block text-xs font-medium text-foreground">
							{m.field_email()}
						</label>
						<div class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground"
							>
								<IconMail size={16} />
							</div>
							<input
								type="email"
								id="login-email"
								name="email"
								autocomplete="username"
								inputmode="email"
								required
								bind:value={loginEmail}
								placeholder={m.field_email_placeholder()}
								class="w-full rounded-xl border border-border/80 bg-background/50 py-2.5 pr-3.5 pl-9 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
							/>
						</div>
					</div>

					<div>
						<div class="mb-1.5 flex items-center justify-between">
							<label for="login-password" class="block text-xs font-medium text-foreground">
								{m.field_password()}
							</label>
							<a href="/forgot-password" class="text-xs font-medium text-primary hover:underline">
								{m.field_forgot_password()}
							</a>
						</div>
						<div class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground"
							>
								<IconLock size={16} />
							</div>
							<input
								type={showLoginPassword ? 'text' : 'password'}
								id="login-password"
								name="password"
								autocomplete="current-password"
								required
								bind:value={loginPassword}
								placeholder={m.field_password_placeholder()}
								class="w-full rounded-xl border border-border/80 bg-background/50 py-2.5 pr-10 pl-9 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
							/>
							<button
								type="button"
								onclick={() => (showLoginPassword = !showLoginPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
								aria-label={showLoginPassword ? m.field_hide_password() : m.field_show_password()}
							>
								{#if showLoginPassword}
									<IconEyeOff size={16} />
								{:else}
									<IconEye size={16} />
								{/if}
							</button>
						</div>
					</div>

					<div class="flex items-center justify-between pt-0.5">
						<label class="flex cursor-pointer items-center gap-2 select-none">
							<input
								type="checkbox"
								id="remember-me"
								name="remember-me"
								bind:checked={rememberMe}
								class="size-4 cursor-pointer rounded border-border text-primary focus:ring-primary/40"
							/>
							<span class="text-xs text-muted-foreground">{m.field_remember_me()}</span>
						</label>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
					>
						{#if isSubmitting}
							<IconLoader2 class="size-4 animate-spin" />
							<span>{m.btn_submitting()}</span>
						{:else}
							<span>{m.btn_submit_login()}</span>
							<IconArrowRight size={16} />
						{/if}
					</button>

					<!-- Passkey Action -->
					<button
						type="button"
						onclick={handlePasskeyLogin}
						disabled={socialLoading === 'passkey'}
						class="flex w-full items-center justify-center gap-2 rounded-xl border border-border/70 bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-[0.99]"
					>
						{#if socialLoading === 'passkey'}
							<IconLoader2 class="size-3.5 animate-spin" />
						{:else}
							<IconFingerprint size={15} class="text-primary" />
						{/if}
						<span>{m.btn_passkey()}</span>
					</button>
				</form>
			{:else}
				<!-- REGISTER FORM -->
				<form onsubmit={handleRegisterSubmit} class="space-y-4" novalidate={false}>
					<div>
						<label for="register-name" class="mb-1.5 block text-xs font-medium text-foreground">
							{m.field_name()}
						</label>
						<div class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground"
							>
								<IconUser size={16} />
							</div>
							<input
								type="text"
								id="register-name"
								name="name"
								autocomplete="name"
								required
								bind:value={registerName}
								placeholder={m.field_name_placeholder()}
								class="w-full rounded-xl border border-border/80 bg-background/50 py-2.5 pr-3.5 pl-9 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
							/>
						</div>
					</div>

					<div>
						<label for="register-email" class="mb-1.5 block text-xs font-medium text-foreground">
							{m.field_email()}
						</label>
						<div class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground"
							>
								<IconMail size={16} />
							</div>
							<input
								type="email"
								id="register-email"
								name="email"
								autocomplete="email"
								inputmode="email"
								required
								bind:value={registerEmail}
								placeholder={m.field_email_placeholder()}
								class="w-full rounded-xl border border-border/80 bg-background/50 py-2.5 pr-3.5 pl-9 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
							/>
						</div>
					</div>

					<div>
						<label for="register-password" class="mb-1.5 block text-xs font-medium text-foreground">
							{m.field_password()}
						</label>
						<div class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground"
							>
								<IconLock size={16} />
							</div>
							<input
								type={showRegisterPassword ? 'text' : 'password'}
								id="register-password"
								name="new-password"
								autocomplete="new-password"
								required
								bind:value={registerPassword}
								placeholder={m.field_password_placeholder()}
								class="w-full rounded-xl border border-border/80 bg-background/50 py-2.5 pr-10 pl-9 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
							/>
							<button
								type="button"
								onclick={() => (showRegisterPassword = !showRegisterPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
								aria-label={showRegisterPassword
									? m.field_hide_password()
									: m.field_show_password()}
							>
								{#if showRegisterPassword}
									<IconEyeOff size={16} />
								{:else}
									<IconEye size={16} />
								{/if}
							</button>
						</div>

						<!-- Password Strength Indicator -->
						{#if registerPassword}
							<div class="mt-2 animate-in space-y-1 fade-in">
								<div class="flex items-center justify-between text-[11px]">
									<span class="text-muted-foreground">{m.field_password()}:</span>
									<span class="font-semibold">{passwordStrengthLabel}</span>
								</div>
								<div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
									<div
										class="h-full {passwordStrengthColor} transition-all duration-300"
										style="width: {(passwordScore / 4) * 100}%"
									></div>
								</div>
								<p class="text-[10px] leading-tight text-muted-foreground">
									{m.password_strength_hint()}
								</p>
							</div>
						{/if}
					</div>

					<div>
						<label class="flex cursor-pointer items-start gap-2 select-none">
							<input
								type="checkbox"
								id="agree-terms"
								bind:checked={agreeTerms}
								class="mt-0.5 size-4 cursor-pointer rounded border-border text-primary focus:ring-primary/40"
							/>
							<span class="text-xs leading-normal text-muted-foreground">
								{m.field_terms_agree()}
							</span>
						</label>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
					>
						{#if isSubmitting}
							<IconLoader2 class="size-4 animate-spin" />
							<span>{m.btn_submitting()}</span>
						{:else}
							<span>{m.btn_submit_register()}</span>
							<IconArrowRight size={16} />
						{/if}
					</button>
				</form>
			{/if}

			<!-- Bottom Switcher -->
			<div class="mt-6 border-t border-border/40 pt-4 text-center text-xs text-muted-foreground">
				{#if activeTab === 'login'}
					<span>{m.auth_no_account()}</span>
					<a href="/register" class="ml-1 font-semibold text-primary hover:underline">
						{m.auth_switch_register()}
					</a>
				{:else}
					<span>{m.auth_have_account()}</span>
					<a href="/" class="ml-1 font-semibold text-primary hover:underline">
						{m.auth_switch_login()}
					</a>
				{/if}
			</div>
		{/if}
	</div>
</div>

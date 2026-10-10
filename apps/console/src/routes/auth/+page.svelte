<script lang="ts">
	import {
		IconFingerprint,
		IconUsers,
		IconShieldCheck,
		IconKey,
		IconSearch,
		IconPlus,
		IconBrandGithub,
		IconBrandGoogle,
		IconBrandFacebook,
		IconBrandDiscord,
		IconDotsVertical,
		IconDeviceMobile,
		IconLogout,
		IconExternalLink,
		IconCheck,
		IconSettings,
		IconLock
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
	import { orgStore } from '#lib/stores/orgProject.svelte.js';

	type EndUserItem = {
		id: string;
		name: string;
		email: string;
		role: 'End-User' | 'VIP Customer' | 'Beta Tester';
		provider: 'Google' | 'Facebook' | 'GitHub' | 'Discord' | 'Passkey';
		mfaEnabled: boolean;
		lastActive: string;
		status: 'Active' | 'Suspended';
	};

	let activeAuthTab = $state<'users' | 'providers' | 'session_security'>('users');
	let search = $state('');
	let providerFilter = $state<string>('All');

	let endUsers = $state<EndUserItem[]>([
		{
			id: 'usr_88f91',
			name: 'Hoang Nam',
			email: 'hnamhocit@gmail.com',
			role: 'VIP Customer',
			provider: 'Google',
			mfaEnabled: true,
			lastActive: '1m ago',
			status: 'Active'
		},
		{
			id: 'usr_77a23',
			name: 'Sarah Connor',
			email: 'sarah.c@cyberdyne.io',
			role: 'End-User',
			provider: 'Facebook',
			mfaEnabled: true,
			lastActive: '12m ago',
			status: 'Active'
		},
		{
			id: 'usr_66c10',
			name: 'Alex Rivera',
			email: 'alex@startup.dev',
			role: 'Beta Tester',
			provider: 'GitHub',
			mfaEnabled: false,
			lastActive: '2h ago',
			status: 'Active'
		},
		{
			id: 'usr_55d44',
			name: 'Elena Rostova',
			email: 'elena@solarpunk.org',
			role: 'End-User',
			provider: 'Discord',
			mfaEnabled: true,
			lastActive: '1d ago',
			status: 'Active'
		},
		{
			id: 'usr_44e99',
			name: 'Marcus Chen',
			email: 'marcus@indiehack.co',
			role: 'End-User',
			provider: 'Google',
			mfaEnabled: false,
			lastActive: '3d ago',
			status: 'Active'
		}
	]);

	const oauthProviders = [
		{
			id: 'google',
			name: 'Google Identity',
			icon: IconBrandGoogle,
			color: 'text-red-500',
			enabled: true,
			clientId: '9841204812-***.apps.googleusercontent.com',
			redirectUri: 'https://api.povixa.com/auth/callback/google'
		},
		{
			id: 'facebook',
			name: 'Facebook Login',
			icon: IconBrandFacebook,
			color: 'text-blue-600',
			enabled: true,
			clientId: 'fb_app_99210481920',
			redirectUri: 'https://api.povixa.com/auth/callback/facebook'
		},
		{
			id: 'github',
			name: 'GitHub OAuth',
			icon: IconBrandGithub,
			color: 'text-foreground',
			enabled: true,
			clientId: 'gh_client_8819024',
			redirectUri: 'https://api.povixa.com/auth/callback/github'
		},
		{
			id: 'discord',
			name: 'Discord OAuth2',
			icon: IconBrandDiscord,
			color: 'text-indigo-500',
			enabled: true,
			clientId: '12094819204819',
			redirectUri: 'https://api.povixa.com/auth/callback/discord'
		}
	];

	const filteredUsers = $derived(
		endUsers.filter((u) => {
			const matchesProvider = providerFilter === 'All' || u.provider === providerFilter;
			const matchesSearch =
				search.trim() === '' ||
				u.name.toLowerCase().includes(search.toLowerCase()) ||
				u.email.toLowerCase().includes(search.toLowerCase()) ||
				u.id.toLowerCase().includes(search.toLowerCase());
			return matchesProvider && matchesSearch;
		})
	);

	function revokeSession(userId: string) {
		const target = endUsers.find((u) => u.id === userId);
		if (target) {
			alert(`Đã thu hồi token phiên của người dùng ${target.email} khỏi Redis whitelist.`);
		}
	}
</script>

<div class="space-y-8 animate-in fade-in duration-200">
	<!-- Module Header -->
	<div class="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
						<IconFingerprint size={20} stroke={2.5} />
					</div>
					<h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
						Module Xác Thực (Povixa Auth - End-User Identity)
					</h1>
					{#if orgStore.currentProject}
						<span class="rounded-md border border-border/70 bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
							Dự án: {orgStore.currentProject.name}
						</span>
					{/if}
				</div>
				<p class="text-xs sm:text-sm text-muted-foreground max-w-2xl">
					Quản lý người dùng cuối (End-Users) của dự án, thiết lập OAuth đa kênh (Google, Facebook, GitHub, Discord), bảo mật phần cứng FIDO2 Passkeys và chính sách JWT Refresh Token an toàn.
				</p>
			</div>

			<div class="flex items-center gap-2 shrink-0">
				<a
					href="http://localhost:5174"
					target="_blank"
					class="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/50 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
				>
					<span>Mở Trang Đăng Nhập SSO</span>
					<IconExternalLink size={13} />
				</a>
			</div>
		</div>

		<!-- Stats Ribbon for Project End-Users -->
		<div class="mt-6 pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4">
				<div class="flex items-center justify-between text-muted-foreground text-xs">
					<span>End-Users Đăng Ký</span>
					<IconUsers size={16} class="text-blue-500" />
				</div>
				<div class="mt-2 text-2xl font-bold text-foreground font-sans">18,420</div>
				<p class="mt-1 text-xs text-emerald-500 font-medium">+8.1% so với tuần trước</p>
			</div>

			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4">
				<div class="flex items-center justify-between text-muted-foreground text-xs">
					<span>Kênh OAuth Đã Bật</span>
					<IconBrandGoogle size={16} class="text-red-500" />
				</div>
				<div class="mt-2 text-2xl font-bold text-foreground font-sans">4 Kênh</div>
				<p class="mt-1 text-xs text-muted-foreground">Google, FB, GitHub, Discord</p>
			</div>

			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4">
				<div class="flex items-center justify-between text-muted-foreground text-xs">
					<span>Phiên JWT Đang Mở</span>
					<IconShieldCheck size={16} class="text-emerald-500" />
				</div>
				<div class="mt-2 text-2xl font-bold text-foreground font-sans">420 Phiên</div>
				<p class="mt-1 text-xs text-muted-foreground">Redis In-Memory Whitelist</p>
			</div>

			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4">
				<div class="flex items-center justify-between text-muted-foreground text-xs">
					<span>FIDO2 Passkeys / 2FA</span>
					<IconKey size={16} class="text-amber-500" />
				</div>
				<div class="mt-2 text-2xl font-bold text-foreground font-sans">94.2%</div>
				<p class="mt-1 text-xs text-emerald-500 font-medium">Bảo vệ chống phishing</p>
			</div>
		</div>
	</div>

	<!-- Navigation Tabs: Users / OAuth Providers / Security Policy -->
	<div class="flex items-center gap-2 border-b border-border/60 pb-1">
		<button
			type="button"
			onclick={() => (activeAuthTab = 'users')}
			class="rounded-xl px-4 py-2 text-xs font-semibold transition-all {activeAuthTab === 'users'
				? 'bg-primary text-primary-foreground shadow-xs'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			Người Dùng Cuối (End-Users) ({endUsers.length})
		</button>
		<button
			type="button"
			onclick={() => (activeAuthTab = 'providers')}
			class="rounded-xl px-4 py-2 text-xs font-semibold transition-all {activeAuthTab === 'providers'
				? 'bg-primary text-primary-foreground shadow-xs'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			Cấu Hình OAuth Providers (4 Kênh)
		</button>
		<button
			type="button"
			onclick={() => (activeAuthTab = 'session_security')}
			class="rounded-xl px-4 py-2 text-xs font-semibold transition-all {activeAuthTab === 'session_security'
				? 'bg-primary text-primary-foreground shadow-xs'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			Chính Sách Phiên & JWT Cookie
		</button>
	</div>

	<!-- TAB 1: END USERS LIST -->
	{#if activeAuthTab === 'users'}
		<div class="space-y-4">
			<!-- Toolbar -->
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border/70 bg-card p-3 shadow-xs">
				<div class="relative flex-1">
					<IconSearch size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						bind:value={search}
						placeholder="Tìm người dùng theo tên, email hoặc UID..."
						class="w-full rounded-xl border border-border bg-secondary/50 pl-9 pr-4 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div class="flex items-center gap-1.5 text-xs overflow-x-auto">
					{#each ['All', 'Google', 'Facebook', 'GitHub', 'Discord'] as p}
						<button
							type="button"
							onclick={() => (providerFilter = p)}
							class="rounded-lg px-2.5 py-1 font-semibold transition-colors {providerFilter === p
								? 'bg-primary text-primary-foreground shadow-2xs'
								: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
						>
							{p}
						</button>
					{/each}
				</div>
			</div>

			<!-- Users Table -->
			<div class="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs">
				<div class="overflow-x-auto">
					<table class="w-full text-left text-xs">
						<thead class="border-b border-border bg-secondary/30 text-muted-foreground font-semibold">
							<tr>
								<th class="px-5 py-3.5">Người Dùng Cuối</th>
								<th class="px-5 py-3.5">Phân Nhóm</th>
								<th class="px-5 py-3.5">Kênh OAuth</th>
								<th class="px-5 py-3.5">Passkeys / MFA</th>
								<th class="px-5 py-3.5">Hoạt Động Gần Nhất</th>
								<th class="px-5 py-3.5 text-right">Thao Tác</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-border/40">
							{#each filteredUsers as u (u.id)}
								<tr class="transition-colors hover:bg-secondary/20">
									<td class="px-5 py-4">
										<div class="flex items-center gap-3">
											<div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs">
												{u.name.slice(0, 2).toUpperCase()}
											</div>
											<div>
												<p class="font-semibold text-foreground">{u.name}</p>
												<p class="text-[11px] text-muted-foreground font-mono">{u.email}</p>
											</div>
										</div>
									</td>

									<td class="px-5 py-4">
										<span class="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
											{u.role}
										</span>
									</td>

									<td class="px-5 py-4 text-foreground/90 font-medium">
										{u.provider}
									</td>

									<td class="px-5 py-4">
										{#if u.mfaEnabled}
											<span class="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500">
												<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
												Bật (FIDO2)
											</span>
										{:else}
											<span class="text-[11px] text-muted-foreground">Tắt</span>
										{/if}
									</td>

									<td class="px-5 py-4 text-muted-foreground">
										{u.lastActive}
									</td>

									<td class="px-5 py-4 text-right">
										<button
											type="button"
											onclick={() => revokeSession(u.id)}
											class="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-card px-2.5 py-1 text-[11px] font-semibold text-destructive hover:bg-destructive/10 transition-colors"
											title="Thu hồi toàn bộ phiên đăng nhập của người dùng"
										>
											<IconLogout size={12} />
											<span>Thu hồi phiên</span>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	{/if}

	<!-- TAB 2: OAUTH PROVIDERS CONFIG -->
	{#if activeAuthTab === 'providers'}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
			{#each oauthProviders as prov}
				<div class="rounded-2xl border border-border/70 bg-card p-5 shadow-xs space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2.5">
							<prov.icon size={22} class={prov.color} />
							<div>
								<h3 class="font-bold text-sm text-foreground">{prov.name}</h3>
								<span class="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
									<IconCheck size={12} stroke={2.5} /> Đang bật cho dự án
								</span>
							</div>
						</div>
						<span class="rounded-full bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5">
							OAuth 2.0
						</span>
					</div>

					<div class="space-y-2 text-xs">
						<div>
							<span class="text-[10px] font-bold text-muted-foreground block mb-0.5">Client ID</span>
							<code class="block w-full rounded-lg bg-secondary/50 border border-border/60 p-2 font-mono text-[11px] text-foreground truncate">
								{prov.clientId}
							</code>
						</div>
						<div>
							<span class="text-[10px] font-bold text-muted-foreground block mb-0.5">Redirect Callback URI</span>
							<code class="block w-full rounded-lg bg-secondary/50 border border-border/60 p-2 font-mono text-[11px] text-primary truncate">
								{prov.redirectUri}
							</code>
						</div>
					</div>

					<div class="pt-3 border-t border-border/40 flex items-center justify-between text-xs">
						<span class="text-muted-foreground">Bảo vệ PKCE SHA-256</span>
						<button type="button" class="text-primary font-semibold hover:underline">
							Chỉnh Sửa Khóa →
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- TAB 3: SESSION SECURITY POLICY -->
	{#if activeAuthTab === 'session_security'}
		<div class="rounded-2xl border border-border/70 bg-card p-6 shadow-xs space-y-5">
			<div class="flex items-center gap-2.5 border-b border-border/50 pb-4">
				<IconLock size={20} class="text-emerald-500" />
				<div>
					<h3 class="font-bold text-base text-foreground">Chính Sách Bảo Mật Phiên & Token Của Dự Án</h3>
					<p class="text-xs text-muted-foreground">Tuân thủ nghiêm ngặt tiêu chuẩn OWASP ASVS và RFC 6749</p>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
				<div class="rounded-xl border border-border bg-secondary/20 p-4 space-y-1.5">
					<h4 class="font-bold text-foreground">Access Token (In-Memory RAM)</h4>
					<p class="text-muted-foreground text-[11px]">
						Chỉ trả về payload JSON và lưu trữ tạm trong RAM bộ nhớ client (Zustand / Svelte Rune), thời hạn sống 15 phút, không bao giờ lưu trong LocalStorage để ngăn chặn XSS token theft.
					</p>
					<span class="inline-block rounded bg-emerald-500/10 text-emerald-500 font-mono text-[10px] px-2 py-0.5 font-bold">
						TTL: 900 giây (15 phút)
					</span>
				</div>

				<div class="rounded-xl border border-border bg-secondary/20 p-4 space-y-1.5">
					<h4 class="font-bold text-foreground">Refresh Token (HttpOnly Cookie)</h4>
					<p class="text-muted-foreground text-[11px]">
						Đính kèm qua cookie tiêu chuẩn với cờ <code>HttpOnly=true</code>, <code>Secure=true</code>, <code>SameSite=Strict</code> và tiền tố <code>__Host-</code>. Trình duyệt không cho phép JavaScript truy cập.
					</p>
					<span class="inline-block rounded bg-primary/10 text-primary font-mono text-[10px] px-2 py-0.5 font-bold">
						Cờ: HttpOnly + Secure + SameSite=Strict
					</span>
				</div>

				<div class="rounded-xl border border-border bg-secondary/20 p-4 space-y-1.5">
					<h4 class="font-bold text-foreground">Redis Whitelist & Revocation List</h4>
					<p class="text-muted-foreground text-[11px]">
						Mỗi refresh token được định danh với JTI duy nhất trong Redis Cluster. Thu hồi tức thì khi người dùng bấm đăng xuất hoặc phát hiện xâm nhập.
					</p>
					<span class="inline-block rounded bg-violet-500/10 text-violet-500 font-mono text-[10px] px-2 py-0.5 font-bold">
						Redis v8-Alpine Key-Value
					</span>
				</div>

				<div class="rounded-xl border border-border bg-secondary/20 p-4 space-y-1.5">
					<h4 class="font-bold text-foreground">Xác Thực Sinh Trắc / FIDO2 WebAuthn</h4>
					<p class="text-muted-foreground text-[11px]">
						Hỗ trợ Touch ID, Face ID, Windows Hello và khóa bảo mật phần cứng YubiKey không cần nhớ mật khẩu.
					</p>
					<span class="inline-block rounded bg-amber-500/10 text-amber-500 font-mono text-[10px] px-2 py-0.5 font-bold">
						FIDO2 / Passkeys Ready
					</span>
				</div>
			</div>
		</div>
	{/if}
</div>

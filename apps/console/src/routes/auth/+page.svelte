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
		IconBrandDiscord,
		IconDotsVertical,
		IconDeviceMobile,
		IconLogout,
		IconExternalLink
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type UserItem = {
		id: string;
		name: string;
		email: string;
		role: 'Owner' | 'Admin' | 'Developer' | 'Viewer';
		provider: 'GitHub' | 'Google' | 'Passkey' | 'Email';
		mfaEnabled: boolean;
		lastActive: string;
		status: 'Active' | 'Suspended';
	};

	let search = $state('');
	let roleFilter = $state<string>('All');

	let users = $state<UserItem[]>([
		{
			id: 'usr_88f91',
			name: 'Hoang Nam',
			email: 'hnamhocit@gmail.com',
			role: 'Owner',
			provider: 'GitHub',
			mfaEnabled: true,
			lastActive: 'Just now',
			status: 'Active'
		},
		{
			id: 'usr_77a23',
			name: 'Sarah Connor',
			email: 'sarah.c@cyberdyne.io',
			role: 'Admin',
			provider: 'Passkey',
			mfaEnabled: true,
			lastActive: '12m ago',
			status: 'Active'
		},
		{
			id: 'usr_66c10',
			name: 'Alex Rivera',
			email: 'alex@startup.dev',
			role: 'Developer',
			provider: 'Google',
			mfaEnabled: false,
			lastActive: '2h ago',
			status: 'Active'
		},
		{
			id: 'usr_55d44',
			name: 'Elena Rostova',
			email: 'elena@solarpunk.org',
			role: 'Developer',
			provider: 'GitHub',
			mfaEnabled: true,
			lastActive: '1d ago',
			status: 'Active'
		},
		{
			id: 'usr_44e99',
			name: 'Marcus Chen',
			email: 'marcus@indiehack.co',
			role: 'Viewer',
			provider: 'Email',
			mfaEnabled: false,
			lastActive: '3d ago',
			status: 'Active'
		}
	]);

	const filteredUsers = $derived(
		users.filter((u) => {
			const matchesRole = roleFilter === 'All' || u.role === roleFilter;
			const matchesSearch =
				search.trim() === '' ||
				u.name.toLowerCase().includes(search.toLowerCase()) ||
				u.email.toLowerCase().includes(search.toLowerCase()) ||
				u.id.toLowerCase().includes(search.toLowerCase());
			return matchesRole && matchesSearch;
		})
	);

	function revokeSession(userId: string) {
		const target = users.find((u) => u.id === userId);
		if (target) {
			alert(`Đã thu hồi toàn bộ token phiên đăng nhập của người dùng ${target.email}`);
		}
	}
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
					<IconFingerprint size={20} stroke={2.5} />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">Povixa Auth & SSO</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-1">
				Quản lý người dùng, phân quyền RBAC, phiên đăng nhập SSO đa dịch vụ và bảo mật phần cứng WebAuthn.
			</p>
		</div>

		<div class="flex items-center gap-2">
			<a
				href="http://localhost:5174"
				target="_blank"
				class="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-accent"
			>
				<span>Mở Cổng SSO Gateway</span>
				<IconExternalLink size={13} />
			</a>
		</div>
	</div>

	<!-- Stats Ribbon -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Người dùng Hoạt động</span>
				<IconUsers size={18} class="text-blue-500" />
			</div>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">18,420</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">+8.1% so với tuần trước</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Phiên Đăng Nhập SSO</span>
				<IconShieldCheck size={18} class="text-emerald-500" />
			</div>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">420 Đang kết nối</div>
			<p class="mt-1 text-xs text-muted-foreground">Console, Apps & Admin</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Nhà Cung Cấp OAuth</span>
				<IconBrandGithub size={18} class="text-violet-500" />
			</div>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">3 Đang Bật</div>
			<p class="mt-1 text-xs text-muted-foreground">Google, GitHub, Discord</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<div class="flex items-center justify-between text-muted-foreground text-xs">
				<span>Bảo mật Passkeys / MFA</span>
				<IconKey size={18} class="text-amber-500" />
			</div>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">94.2%</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">FIDO2 WebAuthn tuân thủ</p>
		</div>
	</div>

	<!-- Users Table Section -->
	<div class="space-y-3">
		<!-- Toolbar -->
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur-sm">
			<div class="relative flex-1">
				<IconSearch size={16} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					bind:value={search}
					placeholder="Tìm người dùng theo tên, email hoặc UID..."
					class="w-full rounded-xl border border-border/60 bg-secondary/40 pl-9 pr-4 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
				/>
			</div>

			<div class="flex items-center gap-1 text-xs">
				{#each ['All', 'Owner', 'Admin', 'Developer', 'Viewer'] as r}
					<button
						type="button"
						onclick={() => (roleFilter = r)}
						class="rounded-lg px-2.5 py-1 font-medium transition-colors {roleFilter === r
							? 'bg-primary text-primary-foreground font-semibold'
							: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
					>
						{r}
					</button>
				{/each}
			</div>
		</div>

		<!-- Table -->
		<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs">
					<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
						<tr>
							<th class="px-5 py-3.5">Người Dùng</th>
							<th class="px-5 py-3.5">Vai Trò RBAC</th>
							<th class="px-5 py-3.5">Xác Thực Qua</th>
							<th class="px-5 py-3.5">MFA / Passkey</th>
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

								<td class="px-5 py-4 text-foreground/80 font-medium">
									{u.provider}
								</td>

								<td class="px-5 py-4">
									{#if u.mfaEnabled}
										<span class="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500">
											<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
											Passkey Bật
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
										class="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-card px-2.5 py-1 text-[11px] font-medium text-destructive hover:bg-destructive/10 transition-colors"
										title="Thu hồi phiên đăng nhập"
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
</div>

<script lang="ts">
	import {
		IconUsers,
		IconKey,
		IconShieldCheck,
		IconLock,
		IconCheck,
		IconPlus,
		IconClock,
		IconDeviceDesktop,
		IconX,
		IconAlertTriangle,
		IconNetwork
	} from '@tabler/icons-svelte-runes';

	const adminUsers = [
		{
			id: 'usr_root01',
			name: 'Hoàng Nam',
			username: 'hnamhocit',
			email: 'nam.hoang@povixa.internal',
			role: 'Super Admin (Root)',
			roleBadge: 'rose',
			authMethod: 'Passkey WebAuthn (YubiKey 5C)',
			lastActive: 'Vừa xong',
			location: 'Hà Nội, VN (118.70.x.x)',
			status: 'active'
		},
		{
			id: 'usr_sec02',
			name: 'Alexandre Mercer',
			username: 'secops-lead',
			email: 'alex.mercer@povixa.internal',
			role: 'SecOps & Compliance Lead',
			roleBadge: 'purple',
			authMethod: 'Hardware Token FIDO2',
			lastActive: '2 giờ trước',
			location: 'Singapore (103.22.x.x)',
			status: 'active'
		},
		{
			id: 'usr_sre03',
			name: 'Kenji Takahashi',
			username: 'infra-sre',
			email: 'kenji.t@povixa.internal',
			role: 'Cluster & Edge SRE Lead',
			roleBadge: 'blue',
			authMethod: 'Passkey + SSH Ed25519',
			lastActive: '5 giờ trước',
			location: 'Tokyo, JP (202.89.x.x)',
			status: 'active'
		},
		{
			id: 'usr_db04',
			name: 'Daniel Chen',
			username: 'database-lead',
			email: 'daniel.chen@povixa.internal',
			role: 'Database & S3 Architect',
			roleBadge: 'blue',
			authMethod: 'YubiKey Hardware Key',
			lastActive: '3 giờ trước',
			location: 'Singapore (103.22.x.x)',
			status: 'active'
		},
		{
			id: 'usr_sup05',
			name: 'Elena Rostova',
			username: 'support-tier3',
			email: 'elena.r@povixa.internal',
			role: 'Enterprise Support Lead',
			roleBadge: 'emerald',
			authMethod: 'TOTP Authenticator MFA',
			lastActive: 'Hôm qua',
			location: 'Frankfurt, DE (88.198.x.x)',
			status: 'active'
		},
		{
			id: 'usr_bil06',
			name: 'Sarah Jenkins',
			username: 'billing-ops',
			email: 'sarah.j@povixa.internal',
			role: 'Billing & Enterprise Contracts',
			roleBadge: 'amber',
			authMethod: 'TOTP Authenticator MFA',
			lastActive: '1 ngày trước',
			location: 'San Francisco, US (64.104.x.x)',
			status: 'active'
		},
		{
			id: 'usr_soc07',
			name: 'Minh Quân',
			username: 'secops-analyst',
			email: 'quan.minh@povixa.internal',
			role: 'SOC Incident Responder',
			roleBadge: 'purple',
			authMethod: 'Touch ID WebAuthn',
			lastActive: 'Vừa xong',
			location: 'TP. Hồ Chí Minh, VN (14.241.x.x)',
			status: 'active'
		},
		{
			id: 'usr_aud08',
			name: 'Chloe Dubois',
			username: 'audit-soc2',
			email: 'chloe.d@povixa.internal',
			role: 'SOC2 Compliance Auditor (Read-Only)',
			roleBadge: 'muted',
			authMethod: 'TOTP Authenticator MFA',
			lastActive: '3 ngày trước',
			location: 'Paris, FR (195.154.x.x)',
			status: 'active'
		}
	];

	const permissionsMatrix = [
		{ feature: 'Điều Khiển Anycast Edge Fleet & BGP', root: true, secops: false, sre: true, support: false, billing: false },
		{ feature: 'Thay Đổi Hạn Ngạch Quota & Cấu Hình Tenant', root: true, secops: true, sre: false, support: 'approval', billing: true },
		{ feature: 'Giả Lập Phiên Đăng Nhập (Impersonation)', root: true, secops: true, sre: false, support: 'limited', billing: false },
		{ feature: 'Kích Hoạt Cầu Dao An Ninh Khẩn Cấp', root: true, secops: 'dual', sre: false, support: false, billing: false },
		{ feature: 'Truy Xuất Toàn Bộ Nhật Ký Kiểm Toán Audit', root: true, secops: true, sre: 'readonly', support: 'readonly', billing: false },
		{ feature: 'Quản Lý Khóa Mã Hóa CSDL & Storage Master Key', root: true, secops: true, sre: false, support: false, billing: false }
	];

	const ipWhitelist = [
		{ name: 'WireGuard Mesh Hà Nội Core', cidr: '10.88.0.0/24', location: 'Việt Nam Core Gateway', status: 'active' },
		{ name: 'WireGuard Mesh Singapore Hub', cidr: '10.88.1.0/24', location: 'Singapore Cloud VPC', status: 'active' },
		{ name: 'Văn Phòng SecOps Frankfurt', cidr: '194.12.44.0/28', location: 'Frankfurt Direct Peer', status: 'active' },
		{ name: 'Văn Phòng Điều Hành US East', cidr: '198.51.100.0/28', location: 'US Primary Operations', status: 'active' }
	];
</script>

<div class="space-y-8">
	<!-- Section Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h2 class="text-base font-semibold text-foreground flex items-center gap-2">
				<IconUsers size={18} class="text-primary" />
				Quản Trị Viên & Phân Quyền Hệ Thống (Staff RBAC & Identity Control)
			</h2>
			<p class="text-xs text-muted-foreground mt-0.5">
				Kiểm soát 8 tài khoản đặc quyền, chính sách xác thực phần cứng FIDO2 và ma trận quyền hạn tối thiểu
			</p>
		</div>

		<button
			type="button"
			class="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs"
		>
			<IconPlus size={15} />
			Cấp Quyền Admin Mới
		</button>
	</div>

	<!-- 4 Core Security Baseline Summary Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
		<div class="p-4 rounded-xl border border-border/50 bg-card/20 flex items-start gap-3.5">
			<div class="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
				<IconKey size={18} />
			</div>
			<div>
				<div class="font-semibold text-foreground text-sm">100% MFA Bắt Buộc</div>
				<div class="text-xs text-muted-foreground mt-0.5 leading-relaxed">Tất cả tài khoản kích hoạt Passkey FIDO2 hoặc TOTP</div>
			</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 flex items-start gap-3.5">
			<div class="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
				<IconClock size={18} />
			</div>
			<div>
				<div class="font-semibold text-foreground text-sm">Thời Lượng Phiên 8 Giờ</div>
				<div class="text-xs text-muted-foreground mt-0.5 leading-relaxed">Tự động hủy session token khi không có thao tác sau 30 phút</div>
			</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 flex items-start gap-3.5">
			<div class="h-9 w-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
				<IconShieldCheck size={18} />
			</div>
			<div>
				<div class="font-semibold text-foreground text-sm">VPN WireGuard Whitelist</div>
				<div class="text-xs text-muted-foreground mt-0.5 leading-relaxed">Chỉ cho phép truy cập từ 4 dải IP nội bộ được ủy quyền</div>
			</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 flex items-start gap-3.5">
			<div class="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
				<IconLock size={18} />
			</div>
			<div>
				<div class="font-semibold text-foreground text-sm">Cơ Chế Phê Duyệt 4 Mắt</div>
				<div class="text-xs text-muted-foreground mt-0.5 leading-relaxed">Thao tác cấp ngắt mạch an ninh cần xác nhận từ 2 người</div>
			</div>
		</div>
	</div>

	<!-- Admin Users Table -->
	<div class="space-y-3">
		<div class="flex items-center justify-between">
			<h3 class="text-sm font-semibold text-foreground">Danh Sách Tài Khoản Quản Trị Hệ Thống (8 Quản Trị Viên)</h3>
			<span class="text-xs text-emerald-500 font-medium">Tất cả tài khoản được bảo vệ</span>
		</div>

		<div class="border border-border/50 rounded-xl overflow-hidden bg-card/20">
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm border-collapse">
					<thead>
						<tr class="border-b border-border/40 bg-muted/20 text-muted-foreground text-xs">
							<th class="py-3 px-4 font-semibold">Quản Trị Viên & Email</th>
							<th class="py-3 px-4 font-semibold">Vai Trò Chính</th>
							<th class="py-3 px-4 font-semibold">Cơ Chế Xác Thực</th>
							<th class="py-3 px-4 font-semibold">Hoạt Động Gần Nhất</th>
							<th class="py-3 px-4 font-semibold">Vị Trí & IP</th>
							<th class="py-3 px-4 font-semibold text-right">Thao Tác</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border/20">
						{#each adminUsers as u}
							<tr class="hover:bg-muted/30 transition-colors">
								<!-- Name, Username & Email -->
								<td class="py-3 px-4">
									<div class="font-semibold text-foreground flex items-center gap-2">
										<span>{u.name}</span>
										<span class="text-xs text-muted-foreground font-normal">(@ {u.username})</span>
									</div>
									<div class="text-xs text-muted-foreground mt-0.5">
										{u.email}
									</div>
								</td>

								<!-- Role Badge -->
								<td class="py-3 px-4">
									{#if u.roleBadge === 'rose'}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
											<span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
											{u.role}
										</span>
									{:else if u.roleBadge === 'purple'}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
											<span class="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
											{u.role}
										</span>
									{:else if u.roleBadge === 'blue'}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
											<span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
											{u.role}
										</span>
									{:else if u.roleBadge === 'emerald'}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
											<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
											{u.role}
										</span>
									{:else if u.roleBadge === 'amber'}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
											<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
											{u.role}
										</span>
									{:else}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
											<span class="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"></span>
											{u.role}
										</span>
									{/if}
								</td>

								<!-- Auth Method (Plain Readable Sans) -->
								<td class="py-3 px-4 text-foreground text-xs font-medium">
									{u.authMethod}
								</td>

								<!-- Last Active (Plain Readable Sans) -->
								<td class="py-3 px-4 text-foreground text-xs">
									{u.lastActive}
								</td>

								<!-- Location & IP (Plain Readable Sans) -->
								<td class="py-3 px-4 text-xs text-muted-foreground">
									{u.location}
								</td>

								<!-- Actions -->
								<td class="py-3 px-4 text-right">
									<button
										type="button"
										class="px-2.5 py-1 rounded border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
									>
										Thu Hồi Phiên
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Permissions Matrix & IP Whitelist Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Permissions Matrix (Left 2 cols) -->
		<div class="lg:col-span-2 p-5 rounded-xl border border-border/50 bg-card/30">
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
					<IconShieldCheck size={18} class="text-primary" />
					Ma Trận Phân Quyền Vai Trò (Role & Permissions Matrix)
				</h3>
				<span class="text-xs text-muted-foreground">Nguyên tắc đặc quyền tối thiểu (Least Privilege)</span>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs border-collapse">
					<thead>
						<tr class="border-b border-border/40 text-muted-foreground">
							<th class="py-2.5 px-3 font-semibold">Tác Vụ Hệ Thống</th>
							<th class="py-2.5 px-3 font-semibold text-center">Root Admin</th>
							<th class="py-2.5 px-3 font-semibold text-center">SecOps</th>
							<th class="py-2.5 px-3 font-semibold text-center">SRE Lead</th>
							<th class="py-2.5 px-3 font-semibold text-center">Support</th>
							<th class="py-2.5 px-3 font-semibold text-center">Billing</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border/20">
						{#each permissionsMatrix as row}
							<tr class="hover:bg-muted/20 transition-colors">
								<td class="py-2.5 px-3 font-medium text-foreground">{row.feature}</td>

								<!-- Root -->
								<td class="py-2.5 px-3 text-center">
									<span class="text-emerald-500 font-bold">Toàn Quyền</span>
								</td>

								<!-- SecOps -->
								<td class="py-2.5 px-3 text-center">
									{#if row.secops === true}
										<span class="text-emerald-500 font-semibold">Có Quyền</span>
									{:else if row.secops === 'dual'}
										<span class="text-amber-500 font-medium">Cần 2 Người</span>
									{:else}
										<span class="text-muted-foreground/40">—</span>
									{/if}
								</td>

								<!-- SRE -->
								<td class="py-2.5 px-3 text-center">
									{#if row.sre === true}
										<span class="text-emerald-500 font-semibold">Có Quyền</span>
									{:else if row.sre === 'readonly'}
										<span class="text-blue-400 font-medium">Chỉ Đọc</span>
									{:else}
										<span class="text-muted-foreground/40">—</span>
									{/if}
								</td>

								<!-- Support -->
								<td class="py-2.5 px-3 text-center">
									{#if row.support === 'approval'}
										<span class="text-amber-500 font-medium">Duyệt Yêu Cầu</span>
									{:else if row.support === 'limited'}
										<span class="text-purple-400 font-medium">Có Giới Hạn</span>
									{:else if row.support === 'readonly'}
										<span class="text-blue-400 font-medium">Chỉ Đọc</span>
									{:else}
										<span class="text-muted-foreground/40">—</span>
									{/if}
								</td>

								<!-- Billing -->
								<td class="py-2.5 px-3 text-center">
									{#if row.billing === true}
										<span class="text-emerald-500 font-semibold">Có Quyền</span>
									{:else}
										<span class="text-muted-foreground/40">—</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- IP Whitelist (Right 1 col) -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between">
			<div>
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
						<IconNetwork size={18} class="text-primary" />
						Dải IP VPN WireGuard Được Ủy Quyền
					</h3>
					<span class="text-xs text-emerald-500 font-medium">Đang Khóa Chặt</span>
				</div>

				<div class="space-y-3">
					{#each ipWhitelist as ip}
						<div class="p-3 rounded-lg border border-border/30 bg-muted/10 text-xs space-y-1">
							<div class="flex items-center justify-between">
								<span class="font-semibold text-foreground text-sm">{ip.name}</span>
								<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
							</div>
							<div class="font-mono text-xs text-primary font-medium">{ip.cidr}</div>
							<div class="text-muted-foreground text-xs">{ip.location}</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-4 pt-3 border-t border-border/30 text-xs text-muted-foreground">
				Toàn bộ truy vấn ngoài 4 dải IP trên sẽ bị từ chối tự động bằng mã HTTP 403 Forbidden.
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import {
		IconHistory,
		IconSearch,
		IconFilter,
		IconDownload,
		IconCircleDot,
		IconCheck,
		IconAlertTriangle,
		IconShieldExclamation,
		IconShieldCheck,
		IconFileText
	} from '@tabler/icons-svelte-runes';

	let filterAction = $state('all');
	let searchQuery = $state('');

	const auditEntries = [
		{
			id: 'evt_99120',
			time: '14:24:18 10/10/2026',
			actor: 'hnamhocit (Super Admin)',
			action: 'CIRCUIT_BREAKER_UPDATE',
			target: 'global.rate_limit_policy',
			details: 'Cập nhật ngưỡng DDoS an toàn 1,800 req/s trên 5 cụm POP Anycast',
			diff: 'Ngưỡng cũ: 2,000 req/s → Ngưỡng mới: 1,800 req/s',
			ip: '118.70.21.90 (Hà Nội, VN)',
			status: 'success'
		},
		{
			id: 'evt_99119',
			time: '13:58:02 10/10/2026',
			actor: 'secops-lead (Alexandre M.)',
			action: 'TENANT_QUOTA_OVERRIDE',
			target: 'org_fn9284 (FinTech Vietnam)',
			details: 'Nâng hạn ngạch lưu trữ S3 từ 1.0 TB lên 2.5 TB theo hợp đồng doanh nghiệp',
			diff: 'Quota cũ: 1,024 GB → Quota mới: 2,560 GB',
			ip: '103.22.45.12 (Singapore)',
			status: 'success'
		},
		{
			id: 'evt_99118',
			time: '12:30:45 10/10/2026',
			actor: 'System Autonomous Guardian',
			action: 'TENANT_SUSPEND_AUTOMATIC',
			target: 'org_sp9921 (CryptoPulse Bot)',
			details: 'Tự động cô lập tổ chức do phát hiện hành vi botnet crawl dữ liệu trái phép',
			diff: 'Trạng thái cũ: ACTIVE → Trạng thái mới: SUSPENDED',
			ip: 'Anycast WAF Automation',
			status: 'warning'
		},
		{
			id: 'evt_99117',
			time: '11:15:33 10/10/2026',
			actor: 'infra-sre (Kenji T.)',
			action: 'EDGE_CACHE_PURGE_CLUSTER',
			target: 'pop_fra1_frankfurt',
			details: 'Xả sạch bộ đệm CDN cụm Frankfurt sau khi triển khai bản vá Edge Worker',
			diff: 'Phạm vi: Toàn bộ thẻ cache vùng Châu Âu (fra1)',
			ip: '202.89.14.77 (Tokyo, JP)',
			status: 'success'
		},
		{
			id: 'evt_99116',
			time: '09:44:12 10/10/2026',
			actor: 'Anonymous / Unauthorized IP',
			action: 'ADMIN_LOGIN_CHALLENGE_FAILED',
			target: 'portal.admin.auth',
			details: 'Sai chữ ký xác thực WebAuthn FIDO2 3 lần liên tiếp, tự động khóa IP trong 24 giờ',
			diff: 'Khóa IP: 45.142.122.9 trong 86,400 giây',
			ip: '45.142.122.9 (Frankfurt, DE)',
			status: 'denied'
		},
		{
			id: 'evt_99115',
			time: '08:12:05 10/10/2026',
			actor: 'database-lead (Daniel C.)',
			action: 'DATABASE_BACKUP_SNAPSHOT',
			target: 'postgres-primary-cluster',
			details: 'Khởi tạo bản sao lưu snapshot WAL tự động định kỳ chu kỳ hàng ngày',
			diff: 'Kích thước snapshot: 34.2 GB · Lưu vào S3 Cold Tier',
			ip: '103.22.45.18 (Singapore)',
			status: 'success'
		},
		{
			id: 'evt_99114',
			time: '07:05:40 10/10/2026',
			actor: 'hnamhocit (Super Admin)',
			action: 'ADMIN_PASSKEY_LOGIN',
			target: 'portal.admin.session',
			details: 'Đăng nhập thành công với Hardware Key YubiKey 5C qua xác thực FIDO2',
			diff: 'Tạo phiên làm việc mới: sess_981a28... (Hạn 8h)',
			ip: '118.70.21.90 (Hà Nội, VN)',
			status: 'success'
		},
		{
			id: 'evt_99113',
			time: '03:22:19 10/10/2026',
			actor: 'support-tier3 (Elena R.)',
			action: 'IMPERSONATE_SESSION_START',
			target: 'org_ed4819 (EduSphere LMS)',
			details: 'Bắt đầu phiên giả lập hỗ trợ cấu hình DNS tên miền phụ tùy chỉnh theo ticket #TK-849',
			diff: 'Thời hạn phiên giả lập: 30 phút · Chế độ chỉ cấu hình',
			ip: '88.198.42.10 (Frankfurt, DE)',
			status: 'success'
		}
	];

	const filteredEntries = $derived(
		auditEntries.filter(e => {
			const matchSearch =
				e.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
				e.details.toLowerCase().includes(searchQuery.toLowerCase());

			if (!matchSearch) return false;
			if (filterAction === 'all') return true;
			return e.status === filterAction;
		})
	);
</script>

<div class="space-y-8">
	<!-- Section Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h2 class="text-base font-semibold text-foreground flex items-center gap-2">
				<IconHistory size={18} class="text-primary" />
				Nhật Ký Kiểm Toán An Ninh Bất Biến (Security Audit Trail & Compliance)
			</h2>
			<p class="text-xs text-muted-foreground mt-0.5">
				Toàn bộ hoạt động cấu hình cấp gốc được ký số mã hóa SHA-256 và lưu trữ bất biến phục vụ tuân thủ SOC2 / ISO 27001
			</p>
		</div>

		<div class="flex items-center gap-2">
			<!-- Export Button -->
			<button
				type="button"
				class="px-3.5 py-2 rounded-lg border border-border/50 bg-card/60 text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5"
			>
				<IconDownload size={15} class="text-muted-foreground" />
				Xuất Báo Cáo JSON / CSV
			</button>
		</div>
	</div>

	<!-- 4 Audit KPIs -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Sự Kiện Hôm Nay</div>
			<div class="text-2xl font-bold text-foreground">24,180</div>
			<div class="text-xs text-muted-foreground">Bao gồm API calls nội bộ & Webhooks</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Cố Gắng Xâm Nhập Bị Chặn</div>
			<div class="text-2xl font-bold text-emerald-500">100% Chặn Đứng</div>
			<div class="text-xs text-muted-foreground">1 vụ sai chữ ký FIDO2 bị khóa IP</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Toàn Vẹn Mật Mã</div>
			<div class="text-2xl font-bold text-emerald-500">SHA-256 Chuỗi Khối</div>
			<div class="text-xs text-muted-foreground">Không thể sửa đổi hoặc xóa lén</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Thời Hạn Lưu Trữ Bắt Buộc</div>
			<div class="text-2xl font-bold text-foreground">365 Ngày</div>
			<div class="text-xs text-muted-foreground">Tự động chuyển lưu trữ S3 Cold Archive</div>
		</div>
	</div>

	<!-- Search & Filter Filter Bar -->
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="relative w-80">
			<IconSearch size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Lọc sự kiện, tác nhân, tài nguyên..."
				class="w-full bg-muted/40 border border-border/60 rounded-lg pl-9 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
			/>
		</div>

		<div class="flex items-center rounded-lg border border-border/50 bg-muted/30 p-0.5 text-xs">
			<button
				type="button"
				onclick={() => (filterAction = 'all')}
				class="px-3 py-1.5 rounded font-medium transition-colors {filterAction === 'all' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
			>
				Tất Cả
			</button>
			<button
				type="button"
				onclick={() => (filterAction = 'success')}
				class="px-3 py-1.5 rounded font-medium transition-colors {filterAction === 'success' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
			>
				Thành Công (7)
			</button>
			<button
				type="button"
				onclick={() => (filterAction = 'warning')}
				class="px-3 py-1.5 rounded font-medium transition-colors {filterAction === 'warning' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
			>
				Cảnh Báo (1)
			</button>
			<button
				type="button"
				onclick={() => (filterAction = 'denied')}
				class="px-3 py-1.5 rounded font-medium transition-colors {filterAction === 'denied' ? 'bg-rose-500/20 text-rose-400' : 'text-muted-foreground hover:text-foreground'}"
			>
				Bị Chặn / Khóa (1)
			</button>
		</div>
	</div>

	<!-- Flat Table of Audit Trail -->
	<div class="border border-border/50 rounded-xl overflow-hidden bg-card/20">
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm border-collapse">
				<thead>
					<tr class="border-b border-border/40 bg-muted/20 text-muted-foreground text-xs">
						<th class="py-3 px-4 font-semibold">Thời Điểm</th>
						<th class="py-3 px-4 font-semibold">Tác Nhân (Actor)</th>
						<th class="py-3 px-4 font-semibold">Hành Động & Mục Tiêu</th>
						<th class="py-3 px-4 font-semibold">Mô Tả & Thay Đổi (Diff)</th>
						<th class="py-3 px-4 font-semibold">Địa Chỉ IP & Vùng</th>
						<th class="py-3 px-4 font-semibold text-right">Trạng Thái</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/20">
					{#each filteredEntries as log}
						<tr class="hover:bg-muted/30 transition-colors">
							<!-- Time -->
							<td class="py-3.5 px-4 text-xs text-muted-foreground whitespace-nowrap">
								{log.time}
							</td>

							<!-- Actor -->
							<td class="py-3.5 px-4 font-semibold text-foreground whitespace-nowrap">
								{log.actor}
							</td>

							<!-- Action & Target -->
							<td class="py-3.5 px-4">
								<div class="font-semibold text-foreground text-xs">
									{log.action}
								</div>
								<div class="text-primary text-xs mt-0.5">
									{log.target}
								</div>
							</td>

							<!-- Details & Diff -->
							<td class="py-3.5 px-4 max-w-md">
								<div class="text-foreground leading-relaxed text-xs">
									{log.details}
								</div>
								<div class="text-xs text-muted-foreground mt-1 p-1 rounded bg-muted/30 border border-border/30">
									{log.diff}
								</div>
							</td>

							<!-- IP & Location -->
							<td class="py-3.5 px-4 text-xs text-muted-foreground whitespace-nowrap">
								{log.ip}
							</td>

							<!-- Status -->
							<td class="py-3.5 px-4 text-right whitespace-nowrap">
								{#if log.status === 'success'}
									<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
										<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
										SUCCESS
									</span>
								{:else if log.status === 'warning'}
									<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
										<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
										WARNING
									</span>
								{:else}
									<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
										<span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
										DENIED
									</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<script lang="ts">
	import {
		IconBuilding,
		IconSearch,
		IconFilter,
		IconExternalLink,
		IconLock,
		IconLockOpen,
		IconAdjustments,
		IconUsers,
		IconCircleDot,
		IconCheck,
		IconAlertTriangle,
		IconPlus,
		IconTrendingUp
	} from '@tabler/icons-svelte-runes';

	let searchQuery = $state('');
	let selectedPlan = $state<'all' | 'enterprise' | 'pro' | 'starter' | 'warning' | 'suspended'>('all');

	const tenants = [
		{
			id: 'org_fn9284',
			name: 'FinTech Vietnam Corp',
			slug: 'fintech-vn',
			domain: 'api.fintechvn.io',
			plan: 'enterprise',
			projects: 12,
			members: 45,
			requests30d: '18.4M',
			storage: '840 GB',
			quotaPercent: 72,
			mrr: '$4,200',
			status: 'active',
			created: '15/01/2026'
		},
		{
			id: 'org_lc7123',
			name: 'LogiChain Global Logistics',
			slug: 'logichain-intl',
			domain: 'cloud.logichain.com',
			plan: 'enterprise',
			projects: 8,
			members: 32,
			requests30d: '14.1M',
			storage: '1.2 TB',
			quotaPercent: 65,
			mrr: '$3,800',
			status: 'active',
			created: '02/02/2026'
		},
		{
			id: 'org_sb6612',
			name: 'SmartBank Asia Pacific',
			slug: 'smartbank-apac',
			domain: 'core.smartbank.asia',
			plan: 'enterprise',
			projects: 15,
			members: 68,
			requests30d: '22.8M',
			storage: '2.4 TB',
			quotaPercent: 88,
			mrr: '$6,500',
			status: 'warning',
			warningMsg: 'Đạt 88% hạn ngạch lưu lượng',
			created: '10/02/2026'
		},
		{
			id: 'org_ed4819',
			name: 'EduSphere Online Learning',
			slug: 'edusphere-lms',
			domain: 'app.edusphere.edu.vn',
			plan: 'pro',
			projects: 4,
			members: 14,
			requests30d: '6.2M',
			storage: '320 GB',
			quotaPercent: 54,
			mrr: '$290',
			status: 'active',
			created: '19/02/2026'
		},
		{
			id: 'org_gv8391',
			name: 'GameVortex Studios',
			slug: 'gamevortex-games',
			domain: 'backend.vortexgames.net',
			plan: 'pro',
			projects: 6,
			members: 22,
			requests30d: '4.8M',
			storage: '480 GB',
			quotaPercent: 86,
			mrr: '$390',
			status: 'warning',
			warningMsg: 'Đạt 86% hạn ngạch lưu lượng',
			created: '05/03/2026'
		},
		{
			id: 'org_hl5520',
			name: 'HealthPulse Telemedicine',
			slug: 'healthpulse-med',
			domain: 'telemed.healthpulse.vn',
			plan: 'pro',
			projects: 3,
			members: 18,
			requests30d: '3.4M',
			storage: '290 GB',
			quotaPercent: 42,
			mrr: '$290',
			status: 'active',
			created: '11/03/2026'
		},
		{
			id: 'org_nm1104',
			name: 'NextGen Digital Media',
			slug: 'nextgen-media',
			domain: 'cdn.nextgenmedia.vn',
			plan: 'starter',
			projects: 1,
			members: 3,
			requests30d: '890k',
			storage: '42 GB',
			quotaPercent: 38,
			mrr: '$0',
			status: 'active',
			created: '12/03/2026'
		},
		{
			id: 'org_ai2201',
			name: 'NeuralVision AI Labs',
			slug: 'neuralvision-ai',
			domain: 'inference.neuralvision.co',
			plan: 'starter',
			projects: 2,
			members: 5,
			requests30d: '1.2M',
			storage: '88 GB',
			quotaPercent: 62,
			mrr: '$0',
			status: 'active',
			created: '20/03/2026'
		},
		{
			id: 'org_sp9921',
			name: 'CryptoPulse Botnet Automation',
			slug: 'cryptopulse-bot',
			domain: 'bot.cryptopulse.cc',
			plan: 'starter',
			projects: 1,
			members: 1,
			requests30d: '2.1M',
			storage: '15 GB',
			quotaPercent: 99,
			mrr: '$0',
			status: 'suspended',
			warningMsg: 'Vi phạm điều khoản Rate Limit & Bot Spam',
			created: '08/04/2026'
		},
		{
			id: 'org_sc0019',
			name: 'ShadowClone Phishing Mirror',
			slug: 'shadowclone-mirror',
			domain: 'login.fake-verify.xyz',
			plan: 'starter',
			projects: 1,
			members: 1,
			requests30d: '450k',
			storage: '2 GB',
			quotaPercent: 20,
			mrr: '$0',
			status: 'suspended',
			warningMsg: 'Phát hiện hành vi mạo danh (Phishing)',
			created: '09/04/2026'
		}
	];

	const defaultQuotas = [
		{ plan: 'Starter (Miễn Phí)', qps: '100 req/s', requests: '1,000,000 req/tháng', storage: '50 GB', projects: '2 dự án', support: 'Community' },
		{ plan: 'Pro Team ($290/tháng)', qps: '1,000 req/s', requests: '10,000,000 req/tháng', storage: '500 GB', projects: '10 dự án', support: 'Email 8h SLA' },
		{ plan: 'Enterprise (Tùy Chỉnh)', qps: '10,000+ req/s', requests: 'Không giới hạn', storage: 'Không giới hạn', projects: 'Không giới hạn', support: 'Dedicated 24/7 Slack & Phone' }
	];

	const filteredTenants = $derived(
		tenants.filter(t => {
			const matchSearch =
				t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.id.toLowerCase().includes(searchQuery.toLowerCase());

			if (!matchSearch) return false;
			if (selectedPlan === 'all') return true;
			if (selectedPlan === 'warning') return t.status === 'warning';
			if (selectedPlan === 'suspended') return t.status === 'suspended';
			return t.plan === selectedPlan;
		})
	);
</script>

<div class="space-y-8">
	<!-- Section Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h2 class="text-base font-semibold text-foreground flex items-center gap-2">
				<IconBuilding size={18} class="text-primary" />
				Quản Lý Tổ Chức & Khách Hàng Doanh Nghiệp (Multi-Tenant Directory)
			</h2>
			<p class="text-xs text-muted-foreground mt-0.5">
				Quản trị 1,842 tổ chức doanh nghiệp, cô lập tài nguyên mật mã và điều phối quota theo thời gian thực
			</p>
		</div>

		<!-- Search & Filter Controls -->
		<div class="flex flex-wrap items-center gap-2.5">
			<!-- Search -->
			<div class="relative w-72">
				<IconSearch size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Tìm tên, slug, domain, ID..."
					class="w-full bg-muted/40 border border-border/60 rounded-lg pl-9 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
				/>
			</div>

			<!-- Plan Filter Pills -->
			<div class="flex items-center rounded-lg border border-border/50 bg-muted/30 p-0.5 text-xs">
				<button
					type="button"
					onclick={() => (selectedPlan = 'all')}
					class="px-3 py-1.5 rounded font-medium transition-colors {selectedPlan === 'all' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
				>
					Tất Cả
				</button>
				<button
					type="button"
					onclick={() => (selectedPlan = 'enterprise')}
					class="px-3 py-1.5 rounded font-medium transition-colors {selectedPlan === 'enterprise' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
				>
					Enterprise (331)
				</button>
				<button
					type="button"
					onclick={() => (selectedPlan = 'pro')}
					class="px-3 py-1.5 rounded font-medium transition-colors {selectedPlan === 'pro' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
				>
					Pro (700)
				</button>
				<button
					type="button"
					onclick={() => (selectedPlan = 'starter')}
					class="px-3 py-1.5 rounded font-medium transition-colors {selectedPlan === 'starter' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
				>
					Starter (811)
				</button>
				<button
					type="button"
					onclick={() => (selectedPlan = 'warning')}
					class="px-3 py-1.5 rounded font-medium transition-colors {selectedPlan === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'text-muted-foreground hover:text-foreground'}"
				>
					Cảnh Báo Quota (14)
				</button>
				<button
					type="button"
					onclick={() => (selectedPlan = 'suspended')}
					class="px-3 py-1.5 rounded font-medium transition-colors {selectedPlan === 'suspended' ? 'bg-rose-500/20 text-rose-400' : 'text-muted-foreground hover:text-foreground'}"
				>
					Đình Chỉ (2)
				</button>
			</div>
		</div>
	</div>

	<!-- 4 Tenant Directory KPI Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Tổng Tổ Chức Đang Hoạt Động</div>
			<div class="text-2xl font-bold text-foreground">1,840 / 1,842</div>
			<div class="text-xs text-emerald-500 font-medium">99.89% tổ chức tuân thủ chính sách</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Khách Hàng Enterprise Doanh Nghiệp</div>
			<div class="text-2xl font-bold text-emerald-500">331 Tổ Chức</div>
			<div class="text-xs text-muted-foreground">Đóng góp 79.1% tổng MRR nền tảng</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Tổ Chức Gần Ngưỡng Hạn Ngạch (>80%)</div>
			<div class="text-2xl font-bold text-amber-500">14 Tổ Chức</div>
			<div class="text-xs text-muted-foreground">Đã gửi email nhắc nâng cấp tự động</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Tổ Chức Bị Đình Chỉ An Ninh</div>
			<div class="text-2xl font-bold text-rose-500">2 Tài Khoản</div>
			<div class="text-xs text-muted-foreground">Bị WAF chặn do botnet & phishing</div>
		</div>
	</div>

	<!-- Main Tenants Table -->
	<div class="border border-border/50 rounded-xl overflow-hidden bg-card/20">
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm border-collapse">
				<thead>
					<tr class="border-b border-border/40 bg-muted/20 text-muted-foreground text-xs">
						<th class="py-3 px-4 font-semibold">Tổ Chức / Domain</th>
						<th class="py-3 px-4 font-semibold">Gói Dịch Vụ</th>
						<th class="py-3 px-4 font-semibold">Dự Án / Thành Viên</th>
						<th class="py-3 px-4 font-semibold">Lưu Lượng (30d)</th>
						<th class="py-3 px-4 font-semibold">Lưu Trữ S3</th>
						<th class="py-3 px-4 font-semibold">Mức Dùng Quota</th>
						<th class="py-3 px-4 font-semibold">Trạng Thái</th>
						<th class="py-3 px-4 font-semibold text-right">Thao Tác Quản Trị</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/20">
					{#each filteredTenants as t}
						<tr class="hover:bg-muted/30 transition-colors">
							<!-- Name, Slug & Custom Domain -->
							<td class="py-3.5 px-4">
								<div class="font-semibold text-foreground flex items-center gap-2">
									<span>{t.name}</span>
								</div>
								<div class="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
									<span class="text-primary font-medium">{t.domain}</span>
									<span>·</span>
									<span class="text-muted-foreground/70">{t.id}</span>
								</div>
							</td>

							<!-- Plan Badge -->
							<td class="py-3.5 px-4">
								{#if t.plan === 'enterprise'}
									<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
										<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
										Enterprise
									</span>
								{:else if t.plan === 'pro'}
									<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
										<span class="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
										Pro Team
									</span>
								{:else}
									<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
										<span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
										Starter
									</span>
								{/if}
							</td>

							<!-- Projects & Members -->
							<td class="py-3.5 px-4 text-foreground">
								<div class="font-medium">{t.projects} dự án</div>
								<div class="text-xs text-muted-foreground">{t.members} thành viên</div>
							</td>

							<!-- 30d Requests -->
							<td class="py-3.5 px-4 font-semibold text-foreground">
								{t.requests30d}
							</td>

							<!-- Storage -->
							<td class="py-3.5 px-4 text-foreground">
								{t.storage}
							</td>

							<!-- Quota Progress Bar -->
							<td class="py-3.5 px-4">
								<div class="w-28 space-y-1">
									<div class="flex justify-between text-xs">
										<span class="text-muted-foreground">Sử dụng:</span>
										<span class="font-semibold {t.quotaPercent > 80 ? 'text-amber-500' : 'text-foreground'}">{t.quotaPercent}%</span>
									</div>
									<div class="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
										<div
											class="h-full rounded-full {t.quotaPercent > 80 ? 'bg-amber-500' : 'bg-primary'}"
											style="width: {t.quotaPercent}%"
										></div>
									</div>
								</div>
							</td>

							<!-- Status -->
							<td class="py-3.5 px-4">
								{#if t.status === 'active'}
									<div class="flex items-center gap-1.5 text-emerald-500 font-medium text-xs">
										<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
										<span>Hoạt động</span>
									</div>
								{:else if t.status === 'warning'}
									<div class="space-y-0.5">
										<div class="flex items-center gap-1.5 text-amber-500 font-medium text-xs">
											<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
											<span>Cảnh báo</span>
										</div>
										<div class="text-[11px] text-muted-foreground">{t.warningMsg}</div>
									</div>
								{:else}
									<div class="space-y-0.5">
										<div class="flex items-center gap-1.5 text-rose-500 font-medium text-xs">
											<span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
											<span>Đình chỉ</span>
										</div>
										<div class="text-[11px] text-muted-foreground">{t.warningMsg}</div>
									</div>
								{/if}
							</td>

							<!-- Row Actions -->
							<td class="py-3.5 px-4 text-right">
								<div class="flex items-center justify-end gap-1.5">
									<!-- Impersonate Button -->
									<button
										type="button"
										class="px-2.5 py-1 rounded border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
										title="Giả lập phiên đăng nhập hỗ trợ khách hàng"
									>
										Impersonate
									</button>

									<!-- Quota Limit Button -->
									<button
										type="button"
										class="px-2.5 py-1 rounded border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
										title="Điều chỉnh giới hạn Quota"
									>
										Quota
									</button>

									<!-- Suspend/Resume Button -->
									{#if t.status === 'suspended'}
										<button
											type="button"
											class="px-2.5 py-1 rounded border border-emerald-500/30 text-xs font-semibold text-emerald-500 hover:bg-emerald-500/10 transition-colors"
										>
											Mở Khóa
										</button>
									{:else}
										<button
											type="button"
											class="px-2.5 py-1 rounded border border-rose-500/20 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
										>
											Khóa
										</button>
									{/if}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Default Quota Policies Reference Table -->
	<div class="p-5 rounded-xl border border-border/50 bg-card/30">
		<h3 class="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
			<IconAdjustments size={18} class="text-primary" />
			Chính Sách Hạn Ngạch & Quota Mặc Định Của Nền Tảng
		</h3>
		<p class="text-xs text-muted-foreground mb-4">
			Các ngưỡng tài nguyên giới hạn tự động áp dụng cho từng cấp độ tổ chức doanh nghiệp
		</p>

		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs border-collapse">
				<thead>
					<tr class="border-b border-border/40 bg-muted/20 text-muted-foreground">
						<th class="py-2.5 px-3 font-semibold text-sm">Gói Dịch Vụ</th>
						<th class="py-2.5 px-3 font-semibold text-sm">Tần Suất Tối Đa (QPS)</th>
						<th class="py-2.5 px-3 font-semibold text-sm">Lưu Lượng Tháng</th>
						<th class="py-2.5 px-3 font-semibold text-sm">Lưu Trữ S3</th>
						<th class="py-2.5 px-3 font-semibold text-sm">Số Dự Án</th>
						<th class="py-2.5 px-3 font-semibold text-sm">Hỗ Trợ Kỹ Thuật</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/20">
					{#each defaultQuotas as q}
						<tr class="hover:bg-muted/20 transition-colors">
							<td class="py-2.5 px-3 font-semibold text-foreground text-sm">{q.plan}</td>
							<td class="py-2.5 px-3 text-emerald-500 font-semibold text-sm">{q.qps}</td>
							<td class="py-2.5 px-3 text-foreground text-sm">{q.requests}</td>
							<td class="py-2.5 px-3 text-foreground text-sm">{q.storage}</td>
							<td class="py-2.5 px-3 text-foreground text-sm">{q.projects}</td>
							<td class="py-2.5 px-3 text-muted-foreground text-sm">{q.support}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

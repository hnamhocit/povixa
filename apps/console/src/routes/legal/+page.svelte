<script lang="ts">
	import {
		IconFileText,
		IconShieldCheck,
		IconCheck,
		IconExternalLink,
		IconDownload,
		IconAlertCircle
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	const legalDocuments = [
		{
			id: 'doc-terms',
			title: 'Điều Khoản Dịch Vụ (Terms of Service)',
			version: 'v2.4',
			status: 'Đã Công Bố & Hiệu Lực',
			lastUpdated: 'Oct 02, 2026',
			compliance: 'Toàn cầu / MIT & AGPL'
		},
		{
			id: 'doc-privacy',
			title: 'Chính Sách Quyền Riêng Tư (Privacy Policy)',
			version: 'v2.1',
			status: 'Đã Công Bố & Hiệu Lực',
			lastUpdated: 'Oct 04, 2026',
			compliance: 'GDPR, CCPA Tuân thủ'
		},
		{
			id: 'doc-dpa',
			title: 'Thỏa Thuận Xử Lý Dữ Liệu (Data Processing Addendum - DPA)',
			version: 'v1.8',
			status: 'Đã Ký Kết Điện Tử',
			lastUpdated: 'Oct 08, 2026',
			compliance: 'EU Standard Contractual Clauses (SCC)'
		},
		{
			id: 'doc-subprocessors',
			title: 'Danh Sách Bên Xử Lý Phụ (Subprocessors Registry)',
			version: 'v1.2',
			status: 'Minh Bạch Hoá',
			lastUpdated: 'Oct 09, 2026',
			compliance: 'Zero Ẩn Danh'
		}
	];
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
					<IconFileText size={20} stroke={2.5} />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.nav_legal()}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-1">
				Tự động hóa chính sách pháp lý, quy trình tuân thủ GDPR/DPA và nhật ký đồng thuận người dùng sẵn sàng kiểm toán.
			</p>
		</div>

		<div class="flex items-center gap-2">
			<button
				type="button"
				class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
			>
				<IconDownload size={14} />
				<span>Xuất Hồ Sơ Kiểm Toán GDPR (Zip)</span>
			</button>
		</div>
	</div>

	<!-- Compliance Cards -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Tuân Thủ GDPR / CCPA</span>
			<div class="mt-2 text-2xl font-bold text-emerald-500 font-sans flex items-center gap-2">
				<IconShieldCheck size={24} />
				<span>100% Đạt</span>
			</div>
			<p class="mt-1 text-xs text-muted-foreground">Không bán hay chia sẻ dữ liệu</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Thỏa Thuận DPA</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">Đã Kích Hoạt</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">Bảo vệ pháp lý cho doanh nghiệp</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Nhật Ký Đồng Thuận Cookie</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">18,420 Bản Ghi</div>
			<p class="mt-1 text-xs text-muted-foreground">Lưu trữ chống giả mạo</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Bên Xử Lý Phụ (Subprocessors)</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">3 Đơn Vị</div>
			<p class="mt-1 text-xs text-muted-foreground">Hetzner, Cloudflare, AWS S3</p>
		</div>
	</div>

	<!-- Documents Table -->
	<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="border-b border-border/50 px-5 py-3.5 flex items-center justify-between">
			<h3 class="font-bold text-xs text-foreground">Văn Bản Pháp Lý & Chính Sách Ứng Dụng</h3>
			<span class="text-xs text-muted-foreground">Tự động đồng bộ theo SDK</span>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
					<tr>
						<th class="px-5 py-3.5">Tên Văn Bản</th>
						<th class="px-5 py-3.5">Phiên Bản</th>
						<th class="px-5 py-3.5">Tiêu Chuẩn Tuân Thủ</th>
						<th class="px-5 py-3.5">Trạng Thái</th>
						<th class="px-5 py-3.5">Cập Nhật</th>
						<th class="px-5 py-3.5 text-right">Xem Bản Xem Trước</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40">
					{#each legalDocuments as doc}
						<tr class="transition-colors hover:bg-secondary/20">
							<td class="px-5 py-4 font-semibold text-foreground">
								<div class="flex items-center gap-2">
									<IconFileText size={16} class="text-rose-500" />
									<span>{doc.title}</span>
								</div>
							</td>
							<td class="px-5 py-4 font-mono font-bold text-foreground">
								{doc.version}
							</td>
							<td class="px-5 py-4 text-muted-foreground">
								{doc.compliance}
							</td>
							<td class="px-5 py-4">
								<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
									<IconCheck size={12} stroke={2.5} />
									<span>{doc.status}</span>
								</span>
							</td>
							<td class="px-5 py-4 text-muted-foreground">
								{doc.lastUpdated}
							</td>
							<td class="px-5 py-4 text-right">
								<button
									type="button"
									class="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-accent"
								>
									<span>Xem Văn Bản</span>
									<IconExternalLink size={12} />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

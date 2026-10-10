<script lang="ts">
	import {
		IconMessageCircle,
		IconHeadset,
		IconCheck,
		IconAlertCircle,
		IconClock,
		IconSearch,
		IconFilter,
		IconCode,
		IconCopy
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type Ticket = {
		id: string;
		title: string;
		author: string;
		priority: 'Urgent' | 'High' | 'Normal';
		status: 'Open' | 'In Progress' | 'Resolved';
		category: 'Bug Report' | 'Feature Request' | 'Billing Help';
		updated: string;
	};

	let statusFilter = $state('All');
	let copiedSnippet = $state(false);

	let tickets = $state<Ticket[]>([
		{
			id: 'TCK-1082',
			title: 'Lỗi xác thực OAuth GitHub trên trình duyệt Safari iOS',
			author: 'dev.khanh@fintech.vn',
			priority: 'High',
			status: 'In Progress',
			category: 'Bug Report',
			updated: '18m ago'
		},
		{
			id: 'TCK-1081',
			title: 'Yêu cầu hỗ trợ kết nối MinIO self-hosted vào S3 Storage module',
			author: 'alex.dev@corp.de',
			priority: 'Normal',
			status: 'Open',
			category: 'Feature Request',
			updated: '1h ago'
		},
		{
			id: 'TCK-1080',
			title: 'Xác minh huy hiệu "Powered by Povixa" cho domain store.vietnam.io',
			author: 'founder@vietnam.io',
			priority: 'Normal',
			status: 'Resolved',
			category: 'Billing Help',
			updated: '4h ago'
		},
		{
			id: 'TCK-1079',
			title: 'Gặp sự cố kết nối WebSocket khi chạy sau Nginx reverse proxy',
			author: 'sysadmin@cloud.sg',
			priority: 'Urgent',
			status: 'Resolved',
			category: 'Bug Report',
			updated: '1d ago'
		}
	]);

	const priorityColors: Record<string, string> = {
		Urgent: 'bg-destructive/15 text-destructive border-destructive/20',
		High: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
		Normal: 'bg-secondary text-foreground'
	};

	async function copyEmbedCode() {
		try {
			await navigator.clipboard.writeText(
				`<script src="https://cdn.povixa.cloud/support-widget.v2.js" data-app-id="pvx_live_99d14f828a" async><\/script>`
			);
			copiedSnippet = true;
			setTimeout(() => {
				copiedSnippet = false;
			}, 2000);
		} catch (e) {
			console.error(e);
		}
	}
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
					<IconMessageCircle size={20} stroke={2.5} />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.nav_support()}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-1">
				Trung tâm trợ giúp tích hợp, widget chat trực tiếp trong ứng dụng và thu thập báo cáo lỗi theo ngữ cảnh.
			</p>
		</div>

		<button
			type="button"
			onclick={copyEmbedCode}
			class="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-accent"
		>
			<IconCode size={15} />
			<span>{copiedSnippet ? 'Đã chép mã nhúng!' : 'Lấy Mã Nhúng Widget Chat'}</span>
		</button>
	</div>

	<!-- Stats Ribbon -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Phiếu Hỗ Trợ Đang Xử Lý</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">2 Đang Mở</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">94.8% hoàn thành trong ngày</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Điểm Hài Lòng (CSAT)</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">98.4%</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">Đánh giá 5 sao từ builders</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Thời Gian Phản Hồi TB</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">18 phút</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">Nhanh hơn 80% so với SaaS truyền thống</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Báo Cáo Lỗi Ngữ Cảnh</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">0 Critical</div>
			<p class="mt-1 text-xs text-muted-foreground">Stack traces được ghi tự động</p>
		</div>
	</div>

	<!-- Tickets Table -->
	<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="border-b border-border/50 px-5 py-3.5 flex items-center justify-between">
			<h3 class="font-bold text-xs text-foreground">Phiếu Hỗ Trợ & Yêu Cầu Của Người Dùng</h3>
			<span class="text-xs text-muted-foreground">{tickets.length} phiếu</span>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
					<tr>
						<th class="px-5 py-3.5">Mã & Tiêu Đề</th>
						<th class="px-5 py-3.5">Người Gửi</th>
						<th class="px-5 py-3.5">Phân Loại</th>
						<th class="px-5 py-3.5">Ưu Tiên</th>
						<th class="px-5 py-3.5">Trạng Thái</th>
						<th class="px-5 py-3.5 text-right">Cập Nhật</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40">
					{#each tickets as t (t.id)}
						<tr class="transition-colors hover:bg-secondary/20">
							<td class="px-5 py-4 font-semibold text-foreground">
								<div class="flex items-center gap-2">
									<span class="font-mono text-muted-foreground text-[11px]">[{t.id}]</span>
									<span>{t.title}</span>
								</div>
							</td>
							<td class="px-5 py-4 font-mono text-muted-foreground">
								{t.author}
							</td>
							<td class="px-5 py-4">
								<span class="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
									{t.category}
								</span>
							</td>
							<td class="px-5 py-4">
								<span class="rounded border px-2 py-0.5 text-[10px] font-semibold {priorityColors[t.priority]}">
									{t.priority}
								</span>
							</td>
							<td class="px-5 py-4">
								<span
									class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold {t.status === 'Resolved'
										? 'bg-emerald-500/15 text-emerald-500'
										: t.status === 'In Progress'
											? 'bg-blue-500/15 text-blue-500'
											: 'bg-amber-500/15 text-amber-500'}"
								>
									<span class="h-1.5 w-1.5 rounded-full {t.status === 'Resolved' ? 'bg-emerald-500' : 'bg-blue-500'}"></span>
									<span>{t.status}</span>
								</span>
							</td>
							<td class="px-5 py-4 text-right text-muted-foreground">
								{t.updated}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

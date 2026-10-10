<script lang="ts">
	import {
		IconBell,
		IconSend,
		IconMail,
		IconDeviceMobile,
		IconWebhook,
		IconCheck,
		IconPlus,
		IconSearch,
		IconFilter,
		IconX
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type NotificationEntry = {
		id: string;
		title: string;
		channel: 'Push (APNs/FCM)' | 'Transactional Email' | 'SMS' | 'Webhook';
		recipient: string;
		status: 'Delivered' | 'In Queue' | 'Failed';
		retries: number;
		time: string;
	};

	let showSendModal = $state(false);
	let channelFilter = $state('All');

	let notifications = $state<NotificationEntry[]>([
		{
			id: 'ntf-01',
			title: 'Xác nhận thanh toán Gói Tài Trợ Povixa #2910',
			channel: 'Transactional Email',
			recipient: 'hnamhocit@gmail.com',
			status: 'Delivered',
			retries: 0,
			time: '2m ago'
		},
		{
			id: 'ntf-02',
			title: 'Cập nhật phiên bản Povixa Core v2.4.1 đã sẵn sàng',
			channel: 'Push (APNs/FCM)',
			recipient: 'topic:all_subscribers (4.2k tokens)',
			status: 'Delivered',
			retries: 0,
			time: '14m ago'
		},
		{
			id: 'ntf-03',
			title: 'Cảnh báo bảo mật: Phát hiện đăng nhập từ IP lạ',
			channel: 'Transactional Email',
			recipient: 'security@company.com',
			status: 'Delivered',
			retries: 0,
			time: '1h ago'
		},
		{
			id: 'ntf-04',
			title: 'Webhook event dispatch: order.completed',
			channel: 'Webhook',
			recipient: 'https://storefront.myapp.dev/api/hook',
			status: 'Delivered',
			retries: 1,
			time: '2h ago'
		},
		{
			id: 'ntf-05',
			title: 'Mã xác thực OTP đăng nhập một lần (2FA)',
			channel: 'SMS',
			recipient: '+84 987***321',
			status: 'Delivered',
			retries: 0,
			time: '5h ago'
		}
	]);

	let newTitle = $state('');
	let newRecipient = $state('');
	let newChannel = $state<'Push (APNs/FCM)' | 'Transactional Email' | 'SMS' | 'Webhook'>('Push (APNs/FCM)');

	function sendDispatch() {
		if (!newTitle.trim()) return;
		notifications.unshift({
			id: `ntf-${Date.now()}`,
			title: newTitle.trim(),
			channel: newChannel,
			recipient: newRecipient.trim() || 'user@example.com',
			status: 'Delivered',
			retries: 0,
			time: 'Just now'
		});
		newTitle = '';
		newRecipient = '';
		showSendModal = false;
	}
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
					<IconBell size={20} stroke={2.5} />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.nav_notifications()}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-1">
				Phát thông báo đẩy, email giao dịch, tin nhắn SMS và webhook với cơ chế tự động thử lại tin cậy.
			</p>
		</div>

		<button
			type="button"
			onclick={() => (showSendModal = true)}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
		>
			<IconSend size={15} />
			<span>Gửi Thông Báo Mới</span>
		</button>
	</div>

	<!-- Stats -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Tỷ lệ Giao Thành Công</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">99.8%</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">Độ trễ trung bình 14ms</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Tin Nhắn Tháng Này</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">124,500</div>
			<p class="mt-1 text-xs text-muted-foreground">Hạn mức miễn phí 1,000,000</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Kênh Đang Hoạt Động</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">4 Kênh</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">APNs, FCM, Email, Webhooks</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Hàng Đợi Dispatch</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">0 Tắc Nghẽn</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">Tất cả queue thông suốt</p>
		</div>
	</div>

	<!-- Message Log Table -->
	<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="border-b border-border/50 px-5 py-3.5 flex items-center justify-between">
			<h3 class="font-bold text-xs text-foreground">Nhật Ký Phát Tin Nhắn Gần Nhất</h3>
			<span class="text-xs text-muted-foreground">{notifications.length} bản ghi</span>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
					<tr>
						<th class="px-5 py-3.5">Tiêu Đề / Nội Dung</th>
						<th class="px-5 py-3.5">Kênh Phát</th>
						<th class="px-5 py-3.5">Người Nhận</th>
						<th class="px-5 py-3.5">Trạng Thái</th>
						<th class="px-5 py-3.5">Thời Gian</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40">
					{#each notifications as item (item.id)}
						<tr class="transition-colors hover:bg-secondary/20">
							<td class="px-5 py-4 font-semibold text-foreground">
								{item.title}
							</td>
							<td class="px-5 py-4">
								<span class="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
									{item.channel}
								</span>
							</td>
							<td class="px-5 py-4 text-muted-foreground font-mono">
								{item.recipient}
							</td>
							<td class="px-5 py-4">
								<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
									<IconCheck size={12} stroke={2.5} />
									<span>{item.status}</span>
								</span>
							</td>
							<td class="px-5 py-4 text-muted-foreground">
								{item.time}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Send Modal -->
{#if showSendModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
			<div class="flex items-center justify-between border-b border-border pb-3">
				<h3 class="font-bold text-sm text-foreground">Gửi Thông Báo Thử Nghiệm</h3>
				<button type="button" onclick={() => (showSendModal = false)} class="rounded p-1 text-muted-foreground hover:bg-accent">
					<IconX size={16} />
				</button>
			</div>

			<div class="space-y-3 text-xs">
				<div>
					<label for="ntf-title" class="block font-semibold text-foreground mb-1">Tiêu Đề Thông Báo</label>
					<input
						id="ntf-title"
						type="text"
						bind:value={newTitle}
						placeholder="Nhập tiêu đề hoặc thông báo..."
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div>
					<label for="ntf-channel" class="block font-semibold text-foreground mb-1">Kênh Phát</label>
					<select
						id="ntf-channel"
						bind:value={newChannel}
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					>
						<option value="Push (APNs/FCM)">Push (APNs / FCM)</option>
						<option value="Transactional Email">Transactional Email</option>
						<option value="SMS">Tin nhắn SMS</option>
						<option value="Webhook">Webhook Dispatch</option>
					</select>
				</div>

				<div>
					<label for="ntf-target" class="block font-semibold text-foreground mb-1">Mục Tiêu Nhận (Token / Email / Webhook URL)</label>
					<input
						id="ntf-target"
						type="text"
						bind:value={newRecipient}
						placeholder="user@example.com hoặc topic:announcements"
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					/>
				</div>
			</div>

			<div class="flex justify-end gap-2 pt-3 border-t border-border">
				<button
					type="button"
					onclick={() => (showSendModal = false)}
					class="rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
				>
					Hủy
				</button>
				<button
					type="button"
					onclick={sendDispatch}
					class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Gửi Ngay
				</button>
			</div>
		</div>
	</div>
{/if}

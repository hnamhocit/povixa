<script lang="ts">
	import {
		IconBell,
		IconSend,
		IconMail,
		IconDeviceMobile,
		IconWebhook,
		IconMessage2,
		IconCheck,
		IconPlus,
		IconSearch,
		IconFilter,
		IconX,
		IconAlertCircle,
		IconKey,
		IconSettings,
		IconFileCode,
		IconClock,
		IconArrowUpRight,
		IconChevronRight,
		IconCopy
	} from '@tabler/icons-svelte-runes';
	import { orgStore } from '#lib/stores/orgProject.svelte.js';

	type NotificationEntry = {
		id: string;
		title: string;
		channel: 'Push (APNs/FCM)' | 'Transactional Email' | 'SMS' | 'Webhook';
		recipient: string;
		status: 'Delivered' | 'In Queue' | 'Failed';
		retries: number;
		latency: string;
		time: string;
		payloadSnippet: string;
	};

	type NotificationTemplate = {
		id: string;
		name: string;
		slug: string;
		channel: 'Push (APNs/FCM)' | 'Transactional Email' | 'SMS' | 'Webhook';
		variables: string[];
		updatedAt: string;
	};

	let activeTab = $state<'logs' | 'templates' | 'channels'>('logs');
	let showSendModal = $state(false);
	let channelFilter = $state('All');
	let searchFilter = $state('');

	let notifications = $state<NotificationEntry[]>([
		{
			id: 'ntf-01',
			title: 'Mã xác thực OTP đăng nhập một lần (2FA)',
			channel: 'SMS',
			recipient: '+84 987***321',
			status: 'Delivered',
			retries: 0,
			latency: '142ms',
			time: '1m ago',
			payloadSnippet: '{"code":"492018","ttl":300}'
		},
		{
			id: 'ntf-02',
			title: 'Xác nhận kích hoạt phiên dự án Ecommerce #910',
			channel: 'Transactional Email',
			recipient: 'developer@povixa.com',
			status: 'Delivered',
			retries: 0,
			latency: '24ms',
			time: '4m ago',
			payloadSnippet: '{"project_id":"proj_ecommerce","event":"session.bound"}'
		},
		{
			id: 'ntf-03',
			title: 'Thông báo đẩy: Đơn hàng mới #ORD-8821',
			channel: 'Push (APNs/FCM)',
			recipient: 'topic:storefront_staff (840 tokens)',
			status: 'Delivered',
			retries: 0,
			latency: '18ms',
			time: '12m ago',
			payloadSnippet: '{"order_id":"ORD-8821","amount_usd":249.0}'
		},
		{
			id: 'ntf-04',
			title: 'Webhook: user.oauth_connected (Google)',
			channel: 'Webhook',
			recipient: 'https://api.storefront.dev/webhooks/povixa',
			status: 'Delivered',
			retries: 0,
			latency: '32ms',
			time: '28m ago',
			payloadSnippet: '{"event":"oauth.link","provider":"google","uid":"usr_99a"}'
		},
		{
			id: 'ntf-05',
			title: 'Cảnh báo bảo mật: Thay đổi mật khẩu tài khoản',
			channel: 'Transactional Email',
			recipient: 'security@customer.io',
			status: 'Delivered',
			retries: 0,
			latency: '28ms',
			time: '1h ago',
			payloadSnippet: '{"ip":"14.232.10.4","location":"Hanoi, VN"}'
		},
		{
			id: 'ntf-06',
			title: 'Đồng bộ hóa dữ liệu lưu trữ S3 Bucket',
			channel: 'Webhook',
			recipient: 'https://backup.service.internal/hooks',
			status: 'Delivered',
			retries: 1,
			latency: '68ms',
			time: '2h ago',
			payloadSnippet: '{"bucket":"pvx-media","synced_files":142}'
		}
	]);

	const templates = $state<NotificationTemplate[]>([
		{
			id: 'tmpl-01',
			name: 'Email Chào Mừng Thành Viên Mới',
			slug: 'auth.welcome_email',
			channel: 'Transactional Email',
			variables: ['user_name', 'verify_url', 'org_name'],
			updatedAt: '2026-04-10'
		},
		{
			id: 'tmpl-02',
			name: 'OTP Xác Thực Đăng Nhập 2FA',
			slug: 'auth.otp_sms',
			channel: 'SMS',
			variables: ['otp_code', 'expire_minutes'],
			updatedAt: '2026-04-08'
		},
		{
			id: 'tmpl-03',
			name: 'Đẩy Di Động: Sự Kiện Đơn Hàng Mới',
			slug: 'store.order_push',
			channel: 'Push (APNs/FCM)',
			variables: ['order_id', 'total_amount', 'customer_name'],
			updatedAt: '2026-04-05'
		},
		{
			id: 'tmpl-04',
			name: 'Webhook Thông Báo Đổi Trạng Thái Người Dùng',
			slug: 'webhook.user_status_changed',
			channel: 'Webhook',
			variables: ['user_id', 'prev_status', 'new_status', 'timestamp'],
			updatedAt: '2026-04-01'
		}
	]);

	let newTitle = $state('');
	let newRecipient = $state('');
	let newChannel = $state<'Push (APNs/FCM)' | 'Transactional Email' | 'SMS' | 'Webhook'>('Push (APNs/FCM)');
	let newPayload = $state('{"message":"Test notification"}');

	const filteredNotifications = $derived(
		notifications.filter((n) => {
			const matchesChannel =
				channelFilter === 'All' ||
				(channelFilter === 'Push' && n.channel.includes('Push')) ||
				(channelFilter === 'Email' && n.channel.includes('Email')) ||
				(channelFilter === 'SMS' && n.channel.includes('SMS')) ||
				(channelFilter === 'Webhook' && n.channel.includes('Webhook'));
			const matchesSearch =
				searchFilter.trim() === '' ||
				n.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
				n.recipient.toLowerCase().includes(searchFilter.toLowerCase());
			return matchesChannel && matchesSearch;
		})
	);

	function sendDispatch() {
		if (!newTitle.trim()) return;
		notifications.unshift({
			id: `ntf-${Date.now().toString(36)}`,
			title: newTitle.trim(),
			channel: newChannel,
			recipient: newRecipient.trim() || 'target@example.com',
			status: 'Delivered',
			retries: 0,
			latency: '18ms',
			time: 'Vừa xong',
			payloadSnippet: newPayload
		});
		newTitle = '';
		newRecipient = '';
		showSendModal = false;
	}
</script>

<div class="space-y-8 animate-in fade-in duration-200">
	<!-- Module Header -->
	<div class="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
						<IconBell size={20} stroke={2.5} />
					</div>
					<h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
						Module Thông Báo (Notifications Engine)
					</h1>
					{#if orgStore.currentProject}
						<span class="rounded-md border border-border/70 bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
							Dự án: {orgStore.currentProject.name}
						</span>
					{/if}
				</div>
				<p class="text-xs sm:text-sm text-muted-foreground max-w-2xl">
					Đường ống phát thông báo đa kênh hiệu năng cao cho ứng dụng: APNs/FCM Mobile Push, Transactional Email, Webhook HMAC và Tin nhắn SMS OTP với cơ chế hàng đợi BullMQ tự động phân tán.
				</p>
			</div>

			<div class="flex items-center gap-2.5 shrink-0">
				<button
					type="button"
					onclick={() => (showSendModal = true)}
					class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
				>
					<IconSend size={15} />
					<span>Gửi Thông Báo Mới</span>
				</button>
			</div>
		</div>

		<!-- 4 Channels Health Ribbon -->
		<div class="mt-6 pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
			<!-- APNs / FCM -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4 space-y-2">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<IconDeviceMobile size={17} class="text-amber-500" />
						<span class="font-bold text-foreground">APNs & FCM Push</span>
					</div>
					<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
						Sẵn sàng
					</span>
				</div>
				<div class="text-xl font-bold text-foreground font-sans">79,680 tin</div>
				<p class="text-[11px] text-muted-foreground">Tỷ lệ thành công 99.8% • p95 18ms</p>
			</div>

			<!-- Email -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4 space-y-2">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<IconMail size={17} class="text-blue-500" />
						<span class="font-bold text-foreground">Transactional Email</span>
					</div>
					<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
						DKIM OK
					</span>
				</div>
				<div class="text-xl font-bold text-foreground font-sans">29,880 mail</div>
				<p class="text-[11px] text-muted-foreground">SendGrid & Resend TLS 1.3</p>
			</div>

			<!-- Webhooks -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4 space-y-2">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<IconWebhook size={17} class="text-violet-500" />
						<span class="font-bold text-foreground">Webhooks HMAC</span>
					</div>
					<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
						5 Endpoints
					</span>
				</div>
				<div class="text-xl font-bold text-foreground font-sans">12,450 events</div>
				<p class="text-[11px] text-muted-foreground">SHA-256 Signature Verify</p>
			</div>

			<!-- SMS -->
			<div class="rounded-2xl border border-border/50 bg-secondary/30 p-4 space-y-2">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<IconMessage2 size={17} class="text-emerald-500" />
						<span class="font-bold text-foreground">SMS OTP Direct</span>
					</div>
					<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
						Twilio/Telco
					</span>
				</div>
				<div class="text-xl font-bold text-foreground font-sans">2,490 SMS</div>
				<p class="text-[11px] text-muted-foreground">OTP Delivery trong &lt; 3 giây</p>
			</div>
		</div>
	</div>

	<!-- Navigation Tabs: Logs / Templates / Channel Config -->
	<div class="flex items-center gap-2 border-b border-border/60 pb-1">
		<button
			type="button"
			onclick={() => (activeTab = 'logs')}
			class="rounded-xl px-4 py-2 text-xs font-semibold transition-all {activeTab === 'logs'
				? 'bg-primary text-primary-foreground shadow-xs'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			Nhật Ký Phát & Hàng Đợi ({notifications.length})
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'templates')}
			class="rounded-xl px-4 py-2 text-xs font-semibold transition-all {activeTab === 'templates'
				? 'bg-primary text-primary-foreground shadow-xs'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			Mẫu Tin Nhắn (Templates) ({templates.length})
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'channels')}
			class="rounded-xl px-4 py-2 text-xs font-semibold transition-all {activeTab === 'channels'
				? 'bg-primary text-primary-foreground shadow-xs'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			Cấu Hình Khóa Kênh (Channels)
		</button>
	</div>

	<!-- TAB 1: LOGS & DISPATCHES -->
	{#if activeTab === 'logs'}
		<div class="space-y-4">
			<!-- Filter Toolbar -->
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-xs">
				<div class="relative flex-1">
					<IconSearch size={15} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						bind:value={searchFilter}
						placeholder="Tìm theo tiêu đề, người nhận hoặc ID dispatch..."
						class="w-full rounded-xl border border-border bg-secondary/50 pl-9 pr-4 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div class="flex items-center gap-1.5 text-xs overflow-x-auto">
					{#each ['All', 'Push', 'Email', 'Webhook', 'SMS'] as ch}
						<button
							type="button"
							onclick={() => (channelFilter = ch)}
							class="rounded-lg px-2.5 py-1 font-semibold transition-colors {channelFilter === ch
								? 'bg-primary text-primary-foreground shadow-2xs'
								: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
						>
							{ch}
						</button>
					{/each}
				</div>
			</div>

			<!-- Logs Table -->
			<div class="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs">
				<div class="overflow-x-auto">
					<table class="w-full text-left text-xs">
						<thead class="border-b border-border bg-secondary/30 text-muted-foreground font-semibold">
							<tr>
								<th class="px-5 py-3.5">Tiêu Đề / Nội Dung</th>
								<th class="px-5 py-3.5">Kênh Phát</th>
								<th class="px-5 py-3.5">Mục Tiêu Nhận</th>
								<th class="px-5 py-3.5">Độ Trễ</th>
								<th class="px-5 py-3.5">Trạng Thái</th>
								<th class="px-5 py-3.5">Thời Gian</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-border/40">
							{#each filteredNotifications as item (item.id)}
								<tr class="transition-colors hover:bg-secondary/20">
									<td class="px-5 py-3.5">
										<p class="font-bold text-foreground">{item.title}</p>
										<code class="text-[10px] text-muted-foreground font-mono">{item.payloadSnippet}</code>
									</td>
									<td class="px-5 py-3.5">
										<span class="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
											{item.channel}
										</span>
									</td>
									<td class="px-5 py-3.5 font-mono text-muted-foreground">
										{item.recipient}
									</td>
									<td class="px-5 py-3.5 font-mono text-emerald-500 font-semibold">
										{item.latency}
									</td>
									<td class="px-5 py-3.5">
										<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
											<IconCheck size={12} stroke={2.5} />
											<span>{item.status}</span>
										</span>
									</td>
									<td class="px-5 py-3.5 text-muted-foreground">
										{item.time}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	{/if}

	<!-- TAB 2: TEMPLATES -->
	{#if activeTab === 'templates'}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each templates as t}
				<div class="rounded-2xl border border-border/70 bg-card p-5 shadow-xs space-y-3 flex flex-col justify-between">
					<div>
						<div class="flex items-center justify-between mb-2">
							<span class="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
								{t.channel}
							</span>
							<span class="text-[11px] text-muted-foreground">Cập nhật: {t.updatedAt}</span>
						</div>
						<h3 class="font-bold text-sm text-foreground">{t.name}</h3>
						<p class="font-mono text-xs text-primary mt-1">{t.slug}</p>

						<div class="mt-3">
							<span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
								Biến Dữ Liệu Thay Thế (Variables):
							</span>
							<div class="flex flex-wrap gap-1.5">
								{#each t.variables as v}
									<span class="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[10px] text-foreground">
										&#123;&#123;{v}&#125;&#125;
									</span>
								{/each}
							</div>
						</div>
					</div>

					<div class="pt-3 border-t border-border/40 flex justify-between items-center text-xs">
						<button
							type="button"
							onclick={() => {
								newTitle = `Test: ${t.name}`;
								newChannel = t.channel;
								showSendModal = true;
							}}
							class="text-primary font-semibold hover:underline"
						>
							Thử Nghiệm Mẫu Này →
						</button>
						<span class="text-muted-foreground">ID: {t.id}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- TAB 3: CHANNEL CREDENTIALS -->
	{#if activeTab === 'channels'}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
			<!-- APNs/FCM Settings -->
			<div class="rounded-2xl border border-border/70 bg-card p-5 shadow-xs space-y-4">
				<div class="flex items-center gap-2.5">
					<IconDeviceMobile size={18} class="text-amber-500" />
					<h3 class="font-bold text-sm text-foreground">Apple APNs & Google FCM Service Account</h3>
				</div>
				<p class="text-xs text-muted-foreground">
					Tải lên tệp chứng chỉ Apple <code>.p8 AuthKey</code> và tệp Google <code>firebase-service-account.json</code> để kích hoạt thông báo đẩy trên iOS/Android.
				</p>
				<div class="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground bg-secondary/20">
					Đã kết nối chứng chỉ: <strong class="text-foreground">firebase-adminsdk-pvx.json</strong> (Còn hạn 2028)
				</div>
			</div>

			<!-- SendGrid / SMTP Settings -->
			<div class="rounded-2xl border border-border/70 bg-card p-5 shadow-xs space-y-4">
				<div class="flex items-center gap-2.5">
					<IconMail size={18} class="text-blue-500" />
					<h3 class="font-bold text-sm text-foreground">SendGrid / Resend Transactional Mail API</h3>
				</div>
				<p class="text-xs text-muted-foreground">
					Cấu hình khóa API phát email giao dịch và tên miền gửi đã xác thực DKIM/SPF (ví dụ: <code>noreply@povixa.com</code>).
				</p>
				<div class="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground bg-secondary/20">
					Khóa SendGrid: <code class="font-mono text-emerald-500">SG.***...98a2</code> • Domain verified
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Send Modal -->
{#if showSendModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
			<div class="flex items-center justify-between border-b border-border pb-3">
				<div class="flex items-center gap-2">
					<IconSend size={18} class="text-primary" />
					<h3 class="font-bold text-sm text-foreground">Gửi Thông Báo Mới</h3>
				</div>
				<button type="button" onclick={() => (showSendModal = false)} class="rounded p-1 text-muted-foreground hover:bg-secondary">
					<IconX size={16} />
				</button>
			</div>

			<div class="space-y-3.5 text-xs">
				<div>
					<label for="ntf-title" class="block font-semibold text-foreground mb-1">Tiêu Đề / Sự Kiện</label>
					<input
						id="ntf-title"
						type="text"
						bind:value={newTitle}
						placeholder="Ví dụ: Xác nhận đơn hàng mới, Mã OTP..."
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<label for="ntf-channel" class="block font-semibold text-foreground mb-1">Kênh Phát</label>
						<select
							id="ntf-channel"
							bind:value={newChannel}
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						>
							<option value="Push (APNs/FCM)">Push (APNs / FCM)</option>
							<option value="Transactional Email">Transactional Email</option>
							<option value="SMS">Tin nhắn SMS OTP</option>
							<option value="Webhook">Webhook Dispatch HMAC</option>
						</select>
					</div>

					<div>
						<label for="ntf-target" class="block font-semibold text-foreground mb-1">Mục Tiêu Nhận</label>
						<input
							id="ntf-target"
							type="text"
							bind:value={newRecipient}
							placeholder="user@example.com hoặc topic:store"
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						/>
					</div>
				</div>

				<div>
					<label for="ntf-payload" class="block font-semibold text-foreground mb-1">Payload JSON (Tùy chọn)</label>
					<textarea
						id="ntf-payload"
						rows="3"
						bind:value={newPayload}
						class="w-full font-mono text-[11px] rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					></textarea>
				</div>
			</div>

			<div class="flex justify-end gap-2.5 pt-4 border-t border-border">
				<button
					type="button"
					onclick={() => (showSendModal = false)}
					class="rounded-xl border border-border px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary"
				>
					Hủy
				</button>
				<button
					type="button"
					onclick={sendDispatch}
					class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Phát Lệnh Gửi Ngay
				</button>
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import {
		IconAlertTriangle,
		IconShieldExclamation,
		IconLock,
		IconLockOpen,
		IconActivity,
		IconCheck,
		IconAlertCircle,
		IconFlame,
		IconPower,
		IconUpload,
		IconBell,
		IconKey,
		IconDatabase
	} from '@tabler/icons-svelte-runes';

	// Reactive state for emergency switches
	let switches = $state({
		maintenance: false,
		ddos: false,
		signups: false,
		s3Freeze: false,
		pushPause: false,
		keyRevoke: false,
		tracing: false,
		dbReadOnly: false
	});

	let pendingConfirm = $state<{ id: keyof typeof switches; label: string } | null>(null);

	function requestToggle(id: keyof typeof switches, label: string) {
		if (!switches[id]) {
			// Turning ON a dangerous switch requires confirmation modal
			pendingConfirm = { id, label };
		} else {
			// Turning OFF
			switches[id] = false;
		}
	}

	function confirmSwitch() {
		if (pendingConfirm) {
			switches[pendingConfirm.id] = true;
			pendingConfirm = null;
		}
	}

	function cancelSwitch() {
		pendingConfirm = null;
	}
</script>

<div class="space-y-8">
	<!-- Section Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h2 class="text-base font-semibold text-rose-500 flex items-center gap-2">
				<IconShieldExclamation size={18} class="text-rose-500" />
				Cầu Dao An Ninh Khẩn Cấp (Global Platform Circuit Breakers)
			</h2>
			<p class="text-xs text-muted-foreground mt-0.5">
				Các cơ chế can thiệp tầng sâu, ngắt mạch lưu lượng hoặc cô lập cụm hạ tầng khi xảy ra sự cố nghiêm trọng
			</p>
		</div>

		<div class="flex items-center gap-2">
			<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
				<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
				Hệ Thống Hoạt Động Bình Thường (Zero Active Killswitch)
			</span>
		</div>
	</div>

	<!-- Critical Warning Banner -->
	<div class="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 flex items-start gap-3.5">
		<IconAlertTriangle size={22} class="text-rose-500 shrink-0 mt-0.5" />
		<div class="text-sm space-y-1">
			<div class="font-bold text-rose-500">Lưu Ý Cấp Độ Super Admin:</div>
			<div class="text-muted-foreground leading-relaxed text-xs">
				Mọi thay đổi trên trang này sẽ được đồng bộ ngay lập tức tới <strong>5 cụm Edge PoP</strong> trong vòng dưới <strong>500ms</strong> qua mạng BGP Anycast. Việc kích hoạt sẽ yêu cầu xác thực phê duyệt an toàn.
			</div>
		</div>
	</div>

	<!-- Confirmation Modal / Dialog -->
	{#if pendingConfirm}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
			<div class="max-w-md w-full p-6 rounded-2xl bg-card border border-rose-500/40 shadow-2xl space-y-4">
				<div class="flex items-center gap-3 text-rose-500">
					<div class="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
						<IconAlertTriangle size={22} />
					</div>
					<div>
						<h3 class="font-bold text-base text-foreground">Xác Nhận Kích Hoạt Cầu Dao?</h3>
						<p class="text-xs text-muted-foreground">Thao tác này ảnh hưởng lập tức đến toàn bộ hệ sinh thái</p>
					</div>
				</div>

				<div class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium">
					Bạn sắp bật: <strong>{pendingConfirm.label}</strong>. Mọi người dùng cuối và API clients trên toàn cầu sẽ chịu tác động ngay lập tức.
				</div>

				<div class="flex items-center justify-end gap-3 pt-2">
					<button
						type="button"
						onclick={cancelSwitch}
						class="px-4 py-2 rounded-lg border border-border/60 text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors"
					>
						Hủy Bỏ
					</button>
					<button
						type="button"
						onclick={confirmSwitch}
						class="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shadow-sm"
					>
						Xác Nhận Kích Hoạt Ngay
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- 8 Enterprise Circuit Breakers Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Switch 1: Platform Maintenance Mode -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.maintenance ? 'border-rose-500/60 bg-rose-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconPower size={18} class="text-rose-500" />
						<span>Bảo Trì Hệ Thống Toàn Cầu</span>
					</div>
					{#if switches.maintenance}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">ĐANG BẬT</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Toàn bộ API và Web Console trả về HTTP 503 kèm trang thông báo bảo trì. Chỉ IP Whitelist mới được truy cập.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: Toàn bộ người dùng</span>
				<button
					type="button"
					onclick={() => requestToggle('maintenance', 'Bảo Trì Hệ Thống Toàn Cầu')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.maintenance ? 'bg-rose-500 text-white hover:bg-rose-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.maintenance ? 'Khôi Phục Bình Thường' : 'Kích Hoạt'}
				</button>
			</div>
		</div>

		<!-- Switch 2: Aggressive Edge DDoS Mitigation -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.ddos ? 'border-amber-500/60 bg-amber-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconFlame size={18} class="text-amber-500" />
						<span>Siêu Phòng Vệ DDoS Khẩn Cấp</span>
					</div>
					{#if switches.ddos}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black">ĐANG BẬT</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Hạ ngưỡng giới hạn tần suất xuống 150 req/phút/IP trên toàn bộ 5 POP. Kích hoạt Turnstile JS Challenge bắt buộc.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: Lọc traffic biên Anycast</span>
				<button
					type="button"
					onclick={() => requestToggle('ddos', 'Siêu Phòng Vệ DDoS Khẩn Cấp')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.ddos ? 'bg-amber-500 text-black hover:bg-amber-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.ddos ? 'Hạ Về Bình Thường' : 'Kích Hoạt'}
				</button>
			</div>
		</div>

		<!-- Switch 3: Lock New Signups -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.signups ? 'border-blue-500/60 bg-blue-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconLock size={18} class="text-blue-500" />
						<span>Tạm Khóa Đăng Ký Tổ Chức Mới</span>
					</div>
					{#if switches.signups}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white">ĐANG KHÓA</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Chặn việc tạo tổ chức hoặc đăng ký tài khoản mới khi phát hiện bot spam. Khách hàng hiện hữu hoạt động bình thường.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: Cổng đăng ký ID</span>
				<button
					type="button"
					onclick={() => requestToggle('signups', 'Tạm Khóa Đăng Ký Tổ Chức Mới')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.signups ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.signups ? 'Mở Khóa Đăng Ký' : 'Kích Hoạt'}
				</button>
			</div>
		</div>

		<!-- Switch 4: S3 Upload Freeze -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.s3Freeze ? 'border-purple-500/60 bg-purple-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconUpload size={18} class="text-purple-400" />
						<span>Đóng Băng Cổng Tải Lên Tệp S3</span>
					</div>
					{#if switches.s3Freeze}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500 text-white">ĐÓNG BĂNG</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Tạm ngừng nhận file tải lên mới vào S3 Storage Cluster. Vẫn cho phép đọc và tải xuống dữ liệu hiện có bình thường.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: S3 Storage Gateway</span>
				<button
					type="button"
					onclick={() => requestToggle('s3Freeze', 'Đóng Băng Cổng Tải Lên Tệp S3')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.s3Freeze ? 'bg-purple-500 text-white hover:bg-purple-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.s3Freeze ? 'Mở Lại Tải Lên' : 'Kích Hoạt'}
				</button>
			</div>
		</div>

		<!-- Switch 5: Pause Notification Dispatcher -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.pushPause ? 'border-amber-500/60 bg-amber-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconBell size={18} class="text-amber-500" />
						<span>Tạm Dừng Hàng Đợi Push Notification</span>
					</div>
					{#if switches.pushPause}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black">TẠM DỪNG</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Giữ thông báo trong hàng đợi Redis/RabbitMQ mà không gửi ra ngoài để ngăn chặn spam hoặc sự cố gửi lặp hàng loạt.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: Push Dispatcher Pods</span>
				<button
					type="button"
					onclick={() => requestToggle('pushPause', 'Tạm Dừng Hàng Đợi Push Notification')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.pushPause ? 'bg-amber-500 text-black hover:bg-amber-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.pushPause ? 'Tiếp Tục Gửi' : 'Kích Hoạt'}
				</button>
			</div>
		</div>

		<!-- Switch 6: Revoke Suspicious API Keys -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.keyRevoke ? 'border-rose-500/60 bg-rose-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconKey size={18} class="text-rose-500" />
						<span>Khóa Các Khóa API Bị Nghi Ngờ Rò Rỉ</span>
					</div>
					{#if switches.keyRevoke}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">ĐANG KHÓA</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Tự động vô hiệu hóa các API keys có mẫu truy cập bất thường hoặc IP xuất phát từ mạng Tor/botnet đã biết.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: Cổng xác thực API</span>
				<button
					type="button"
					onclick={() => requestToggle('keyRevoke', 'Khóa Các Khóa API Bị Nghi Ngờ Rò Rỉ')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.keyRevoke ? 'bg-rose-500 text-white hover:bg-rose-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.keyRevoke ? 'Mở Lại Xác Thực' : 'Kích Hoạt'}
				</button>
			</div>
		</div>

		<!-- Switch 7: Global Full Tracing -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.tracing ? 'border-purple-500/60 bg-purple-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconActivity size={18} class="text-purple-400" />
						<span>Thu Thập 100% Trace OpenTelemetry</span>
					</div>
					{#if switches.tracing}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500 text-white">100% SAMPLING</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Nâng tỷ lệ lấy mẫu từ 5% lên 100% cho mọi truy vấn edge và database để hỗ trợ truy vết lỗi ẩn sâu.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: Jaeger / Tempo Log Pipeline</span>
				<button
					type="button"
					onclick={() => requestToggle('tracing', 'Thu Thập 100% Trace OpenTelemetry')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.tracing ? 'bg-purple-500 text-white hover:bg-purple-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.tracing ? 'Giảm Về 5%' : 'Kích Hoạt'}
				</button>
			</div>
		</div>

		<!-- Switch 8: Read-Only DB Lockdown -->
		<div class="p-5 rounded-xl border border-border/50 bg-card/30 flex flex-col justify-between gap-4 transition-colors {switches.dbReadOnly ? 'border-rose-500/60 bg-rose-500/10' : ''}">
			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
						<IconDatabase size={18} class="text-rose-500" />
						<span>Khóa Cơ Sở Dữ Liệu Chỉ Đọc (Read-Only)</span>
					</div>
					{#if switches.dbReadOnly}
						<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">READ-ONLY</span>
					{/if}
				</div>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Ngăn chặn toàn bộ thao tác INSERT, UPDATE, DELETE trên cụm PostgreSQL chính. Dùng khi di chuyển dữ liệu lớn.
				</p>
			</div>

			<div class="pt-3 border-t border-border/20 flex items-center justify-between">
				<span class="text-xs text-muted-foreground">Tác động: Postgres Core Primary</span>
				<button
					type="button"
					onclick={() => requestToggle('dbReadOnly', 'Khóa Cơ Sở Dữ Liệu Chỉ Đọc (Read-Only)')}
					class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {switches.dbReadOnly ? 'bg-rose-500 text-white hover:bg-rose-600' : 'border border-border/60 bg-muted/30 text-foreground hover:bg-muted/70'}"
				>
					{switches.dbReadOnly ? 'Mở Lại Quyền Ghi' : 'Kích Hoạt'}
				</button>
			</div>
		</div>
	</div>
</div>

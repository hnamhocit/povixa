<script lang="ts">
	import {
		IconBrandDiscord,
		IconBrandGithub,
		IconHeadset,
		IconSearch,
		IconCheck,
		IconAlertCircle,
		IconCode,
		IconTerminal2,
		IconBolt,
		IconExternalLink,
		IconHelp,
		IconShieldCheck,
		IconArrowRight,
		IconChevronDown,
		IconChevronUp,
		IconBug,
		IconMessageCircle,
		IconCopy,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	// Interactive states for Search & Diagnostics Mock
	let searchQuery = $state('');
	let selectedModule = $state('auth');
	let selectedSeverity = $state('normal');
	let selectedEnv = $state('docker');
	let errorLogInput = $state('');
	let ticketSubmitted = $state(false);
	let copiedDiag = $state(false);
	let activeFaqIndex = $state<number | null>(0);

	const quickTags = [
		'#Docker-Compose',
		'#Passkeys-OIDC',
		'#S3-MinIO',
		'#Anycast-Edge',
		'#Feature-Flags',
		'#PostgreSQL-Migration'
	];

	const supportChannels = [
		{
			title: 'Community Discord',
			badge: 'Hỗ trợ 24/7',
			badgeColor: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20',
			icon: IconBrandDiscord,
			iconColor: 'text-[#5865F2] bg-[#5865F2]/10',
			desc: 'Trao đổi kỹ thuật trực tiếp với đội ngũ core engineer Povixa và hơn 4,200 lập trình viên đang tự lưu trữ trên toàn cầu.',
			stats: '4,280 thành viên • Phản hồi trung bình ~8 phút',
			actionLabel: 'Tham gia Discord',
			href: 'https://discord.gg/povixa',
			external: true,
			channels: ['#troubleshoot', '#self-hosted', '#architecture']
		},
		{
			title: 'GitHub Issues & RFC',
			badge: '100% Mã nguồn mở',
			badgeColor: 'text-foreground bg-muted border-border',
			icon: IconBrandGithub,
			iconColor: 'text-foreground bg-muted',
			desc: 'Báo cáo lỗi kèm stack trace, đề xuất tính năng mới (RFC), thảo luận pull request và theo dõi tiến độ vá lỗi bảo mật.',
			stats: '1,200+ Stars • 100% minh bạch mã nguồn',
			actionLabel: 'Mở Issue trên GitHub',
			href: 'https://github.com/hnamhocit/povixa/issues',
			external: true,
			channels: ['bug-report', 'feature-request', 'rfc-discussion']
		},
		{
			title: 'Enterprise Dedicated SLA',
			badge: 'SLA < 15 Phút',
			badgeColor: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
			icon: IconHeadset,
			iconColor: 'text-emerald-500 bg-emerald-500/10',
			desc: 'Hỗ trợ cấp độ tổ chức qua kênh Slack Connect riêng, tư vấn tối ưu kiến trúc phân tán Anycast, hỗ trợ di trú dữ liệu không gián đoạn.',
			stats: 'Cam kết SLA 99.99% • Chuyên gia trực tiếp',
			actionLabel: 'Liên hệ Enterprise',
			href: 'mailto:enterprise@povixa.cloud',
			external: false,
			channels: ['Dedicated Slack Connect', 'Kiến trúc sư riêng', 'Bảo hiểm pháp lý']
		}
	];

	const diagnosticPresets: Record<string, { summary: string; remedy: string }> = {
		auth: {
			summary: 'WebAuthn / Passkeys: Relying Party ID (RP ID) không khớp domain hiện tại.',
			remedy: 'Đảm bảo biến môi trường `POVIXA_AUTH_RP_ID` trùng khớp chính xác với host đang chạy (không kèm port hoặc protocol https://).'
		},
		storage: {
			summary: 'S3 Multipart Upload: Lỗi CORS hoặc thiếu quyền PutObject trên bucket S3 / R2.',
			remedy: 'Thêm AllowedOrigins: ["*"] và AllowedMethods: ["PUT", "POST", "GET"] trong CORS Configuration của bucket của bạn.'
		},
		config: {
			summary: 'Remote Config: Cache Edge chưa nhận thay đổi cờ tính năng.',
			remedy: 'Sử dụng lệnh `povixa config flush --scope=global` hoặc kiểm tra kết nối WebSocket Anycast stream ở port 443.'
		},
		notifications: {
			summary: 'Push Notifications: APNs Certificate hoặc FCM Service Account key hết hạn.',
			remedy: 'Tải lại tệp p8 key của Apple hoặc google-services.json vào mục Settings > Notifications Credentials trên Console.'
		}
	};

	const faqs = [
		{
			category: 'Triển khai & Self-host',
			q: 'Làm thế nào để triển khai Povixa hoàn toàn miễn phí trọn đời?',
			a: 'Chỉ cần nhúng huy hiệu Powered by Povixa vào chân trang hoặc bảng điều khiển ứng dụng của bạn, bạn sẽ được cấp quyền sử dụng miễn phí toàn bộ dịch vụ quản lý trên Povixa Cloud hoặc tự lưu trữ 100% bằng file Docker Compose mà không mất một khoản phí nào.'
		},
		{
			category: 'Triển khai & Self-host',
			q: 'Yêu cầu phần cứng tối thiểu để tự chạy Povixa trên VPS là gì?',
			a: 'Cụm core Povixa được viết bằng Go và TypeScript tối ưu bộ nhớ cực kỳ tinh gọn. Bạn chỉ cần 1 VPS với 1 CPU Core và 1GB RAM (chạy Docker & SQLite hoặc PostgreSQL ngoài) là có thể phục vụ hàng chục ngàn yêu cầu xác thực và cấu hình mỗi ngày.'
		},
		{
			category: 'Lưu trữ & Egress',
			q: 'Povixa có tính phí băng thông tải về (egress fee) cho Object Storage không?',
			a: 'Hoàn toàn 0đ. Khi bạn kết nối với Cloudflare R2, MinIO nội bộ hoặc AWS S3 bằng khóa API của chính bạn, Povixa chỉ đóng vai trò cấp URL ký trước (Presigned URLs) để client upload/download trực tiếp. Chúng tôi không bao giờ thu phụ phí băng thông.'
		},
		{
			category: 'Xác thực & Bảo mật',
			q: 'Người dùng không có thiết bị hỗ trợ Passkeys thì đăng nhập như thế nào?',
			a: 'Povixa hỗ trợ cơ chế fallback thông minh: Tự động chuyển tiếp sang Magic Link qua Email bảo mật, mã OTP một lần hoặc xác thực mạng xã hội OAuth 2.0 (Google, GitHub, Apple) mà không ảnh hưởng đến trải nghiệm người dùng.'
		},
		{
			category: 'Mã nguồn mở & Doanh thu',
			q: 'Cơ chế chia sẻ 30% doanh thu khi đóng góp mã nguồn hoạt động ra sao?',
			a: 'Chúng tôi trích 30% tổng doanh thu ròng hàng tháng vào quỹ nhà phát triển mở. Mọi pull request được merge đều được tính điểm trọng số minh bạch dựa trên độ phức tạp và tác động tính năng, chi trả trực tiếp qua GitHub Sponsors & Open Collective.'
		}
	];

	const filteredFaqs = $derived(
		searchQuery.trim() === ''
			? faqs
			: faqs.filter(
					(f) =>
						f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
						f.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
						f.category.toLowerCase().includes(searchQuery.toLowerCase())
				)
	);

	function handleCopySnippet(text: string) {
		navigator.clipboard.writeText(text);
		copiedDiag = true;
		setTimeout(() => {
			copiedDiag = false;
		}, 2000);
	}

	function handleSubmitMockTicket() {
		ticketSubmitted = true;
		setTimeout(() => {
			ticketSubmitted = false;
			errorLogInput = '';
		}, 4000);
	}
</script>

<svelte:head>
	<title>{m.module_support_name()} — Povixa Developer Support & Help Center</title>
	<meta
		name="description"
		content="Trung tâm hỗ trợ kỹ thuật, xử lý sự cố self-host, và cam kết SLA chuyên trách từ đội ngũ phát triển Povixa."
	/>
</svelte:head>

<div class="relative min-h-screen bg-background text-foreground">
	<!-- ═══════════════ HERO: CLEAN DEVELOPER SUPPORT HEADER ═══════════════ -->
	<section class="relative pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-border/50">
		<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
			<div class="mx-auto max-w-3xl text-center">
				<div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 font-mono text-xs font-semibold text-primary">
					<IconHelp size={14} stroke={2.5} />
					<span>HELP & DEVELOPER SUPPORT</span>
				</div>

				<h1 class="mt-4 font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
					Chúng tôi đồng hành cùng hệ thống của bạn.
				</h1>

				<p class="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
					Hỗ trợ trực tiếp từ cộng đồng lập trình viên mã nguồn mở và cam kết SLA chuyên trách dưới 15 phút từ đội ngũ kỹ sư Povixa Core.
				</p>

				<!-- Real-time Status Badge Banner -->
				<div class="mt-6 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-border/80 bg-card px-4 py-1.5 shadow-2xs">
					<div class="flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground">
						<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
						<span>All Systems Operational</span>
					</div>
					<span class="text-border">•</span>
					<span class="font-mono text-xs text-muted-foreground">99.99% Uptime</span>
					<span class="text-border">•</span>
					<span class="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Phản hồi Discord &lt; 15m</span>
				</div>

				<!-- Quick Search & Diagnostic Input -->
				<div class="mt-8 relative max-w-2xl mx-auto">
					<div class="relative flex items-center">
						<div class="pointer-events-none absolute left-4 text-muted-foreground">
							<IconSearch size={18} stroke={2.2} />
						</div>
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Tìm kiếm giải pháp, mã lỗi, hướng dẫn cấu hình (VD: Passkeys, MinIO, Docker)..."
							class="h-13 w-full rounded-2xl border border-border/80 bg-card pl-11 pr-24 font-sans text-sm text-foreground shadow-xs placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
						/>
						<div class="absolute right-3.5 hidden sm:flex items-center gap-1.5">
							<kbd class="rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
								⌘K
							</kbd>
						</div>
					</div>

					<!-- Quick Tag Pills -->
					<div class="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
						<span class="font-mono text-[11px] text-muted-foreground/80 mr-1">Chủ đề hot:</span>
						{#each quickTags as tag}
							<button
								type="button"
								onclick={() => (searchQuery = tag.replace('#', ''))}
								class="rounded-lg bg-muted/50 hover:bg-muted border border-border/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
							>
								{tag}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════ CORE SUPPORT CHANNELS (3 ELEVATED PILLARS) ═══════════════ -->
	<section class="py-16 sm:py-24">
		<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
			<div class="mx-auto max-w-3xl text-center mb-12">
				<span class="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
					CHANNELS & ESCALATION
				</span>
				<h2 class="mt-2 font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
					Ba kênh hỗ trợ chính thức
				</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					Lựa chọn phương thức phản hồi phù hợp với tính chất dự án và độ khẩn cấp của bạn.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each supportChannels as ch}
					<div class="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:shadow-md hover:border-border">
						<div>
							<!-- Card Top Row: Icon + Badge -->
							<div class="flex items-center justify-between">
								<div class="flex h-11 w-11 items-center justify-center rounded-xl {ch.iconColor} shadow-2xs">
									<ch.icon size={22} stroke={2.2} />
								</div>
								<span class="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold border {ch.badgeColor}">
									{ch.badge}
								</span>
							</div>

							<!-- Title & Description -->
							<h3 class="mt-5 font-sans text-lg font-bold text-foreground">
								{ch.title}
							</h3>
							<p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
								{ch.desc}
							</p>

							<!-- Channel Highlights / Topics -->
							<div class="mt-4 flex flex-wrap gap-1.5">
								{#each ch.channels as c}
									<span class="rounded bg-muted/60 px-2 py-0.5 font-mono text-[10px] font-medium text-foreground/80">
										{c}
									</span>
								{/each}
							</div>
						</div>

						<div class="mt-6 pt-4 border-t border-border/50">
							<div class="mb-4 font-mono text-[11px] text-muted-foreground">
								{ch.stats}
							</div>
							<a
								href={ch.href}
								target={ch.external ? '_blank' : undefined}
								rel={ch.external ? 'noreferrer' : undefined}
								class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-sans text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
							>
								<span>{ch.actionLabel}</span>
								<IconArrowRight size={14} stroke={2.5} class="transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════ INTERACTIVE ERROR DIAGNOSTIC & QUICK TICKET MOCKUP ═══════════════ -->
	<section class="py-16 sm:py-24 border-y border-border/50 bg-muted/30">
		<div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
				<!-- Left Explanation Column -->
				<div class="lg:col-span-5 space-y-4">
					<div class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
						<IconSparkles size={14} />
						<span>AI QUICK DIAGNOSTIC</span>
					</div>

					<h2 class="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						Chẩn đoán sự cố tức thì & Gửi báo cáo lỗi
					</h2>

					<p class="text-sm text-muted-foreground leading-relaxed">
						Chọn phân hệ đang gặp vấn đề hoặc dán thông báo lỗi bạn nhận được. Công cụ sẽ tự động rà soát các trường hợp lỗi phổ biến nhất trong tài liệu Povixa và gợi ý giải pháp xử lý ngay lập tức.
					</p>

					<!-- Technical SLA checklist -->
					<div class="space-y-2.5 pt-2 font-sans text-xs text-foreground/85">
						<div class="flex items-center gap-2">
							<IconCheck size={15} class="text-emerald-500 shrink-0" stroke={3} />
							<span>Tự động tra cứu mã lỗi (Error codes) chuẩn OIDC & S3 API</span>
						</div>
						<div class="flex items-center gap-2">
							<IconCheck size={15} class="text-emerald-500 shrink-0" stroke={3} />
							<span>Kiểm tra biến môi trường và thiết lập CORS tự động</span>
						</div>
						<div class="flex items-center gap-2">
							<IconCheck size={15} class="text-emerald-500 shrink-0" stroke={3} />
							<span>Đồng bộ thẳng vào hàng đợi Discord #troubleshoot của core team</span>
						</div>
					</div>

					<!-- Direct Documentation Link Box -->
					<div class="rounded-xl border border-border/80 bg-card p-4 shadow-2xs mt-4">
						<div class="flex items-center gap-2 text-foreground font-semibold text-xs">
							<IconTerminal2 size={16} class="text-primary" />
							<span>Cần tài liệu API hoặc hướng dẫn SDK?</span>
						</div>
						<p class="mt-1 text-xs text-muted-foreground">
							Xem các bài hướng dẫn chi tiết từng bước cho TypeScript, Go, Python và Flutter.
						</p>
						<a
							href="https://docs.povixa.cloud"
							target="_blank"
							rel="noreferrer"
							class="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
						>
							<span>Mở cổng tài liệu docs.povixa.cloud</span>
							<IconExternalLink size={12} stroke={2.5} />
						</a>
					</div>
				</div>

				<!-- Right Interactive Diagnostic Workbench Card -->
				<div class="lg:col-span-7">
					<div class="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-sm">
						<div class="flex items-center justify-between pb-4 border-b border-border/50">
							<div class="flex items-center gap-2 font-sans text-sm font-bold text-foreground">
								<IconBug size={17} class="text-rose-500" />
								<span>Bàn Chẩn Đoán Lỗi & Tạo Ticket</span>
							</div>
							<span class="rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
								Interactive Mockup
							</span>
						</div>

						<div class="mt-5 space-y-4">
							<!-- Row 1: Subsystem & Environment Selection -->
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div>
									<label for="support-module-select" class="block font-mono text-[11px] font-semibold text-muted-foreground mb-1.5">
										Phân hệ gặp sự cố:
									</label>
									<select
										id="support-module-select"
										bind:value={selectedModule}
										class="w-full rounded-xl border border-border bg-background px-3 py-2 font-sans text-xs text-foreground focus:border-primary focus:outline-none"
									>
										<option value="auth">Auth & Passkeys (OIDC 2.1)</option>
										<option value="storage">Object Storage (S3 / R2 API)</option>
										<option value="config">Remote Config & Flags</option>
										<option value="notifications">Push & Notifications</option>
									</select>
								</div>

								<div>
									<label for="support-env-select" class="block font-mono text-[11px] font-semibold text-muted-foreground mb-1.5">
										Môi trường triển khai:
									</label>
									<select
										id="support-env-select"
										bind:value={selectedEnv}
										class="w-full rounded-xl border border-border bg-background px-3 py-2 font-sans text-xs text-foreground focus:border-primary focus:outline-none"
									>
										<option value="docker">Docker Compose (Self-hosted)</option>
										<option value="metal">Bare-metal Linux VPS</option>
										<option value="k8s">Kubernetes / Helm</option>
										<option value="cloud">Povixa Managed Cloud</option>
									</select>
								</div>
							</div>

							<!-- Severity selection -->
							<div>
								<span class="block font-mono text-[11px] font-semibold text-muted-foreground mb-1.5">
									Mức độ ảnh hưởng:
								</span>
								<div class="grid grid-cols-3 gap-2">
									<button
										type="button"
										onclick={() => (selectedSeverity = 'low')}
										class="rounded-lg border px-3 py-1.5 text-center font-mono text-xs font-semibold transition-all {selectedSeverity === 'low'
											? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
											: 'border-border bg-background text-muted-foreground hover:bg-muted'}"
									>
										Thấp (Hỏi đáp)
									</button>
									<button
										type="button"
										onclick={() => (selectedSeverity = 'normal')}
										class="rounded-lg border px-3 py-1.5 text-center font-mono text-xs font-semibold transition-all {selectedSeverity === 'normal'
											? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
											: 'border-border bg-background text-muted-foreground hover:bg-muted'}"
									>
										Vừa (Bug nhỏ)
									</button>
									<button
										type="button"
										onclick={() => (selectedSeverity = 'critical')}
										class="rounded-lg border px-3 py-1.5 text-center font-mono text-xs font-semibold transition-all {selectedSeverity === 'critical'
											? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
											: 'border-border bg-background text-muted-foreground hover:bg-muted'}"
									>
										Khẩn cấp (Sập app)
									</button>
								</div>
							</div>

							<!-- Instant Diagnostic Auto-Suggestion -->
							{#if diagnosticPresets[selectedModule]}
								<div class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3.5 space-y-1.5">
									<div class="flex items-center gap-1.5 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
										<IconAlertCircle size={14} />
										<span>Phát hiện sự cố điển hình của {selectedModule.toUpperCase()}:</span>
									</div>
									<p class="font-sans text-xs text-foreground/90 font-medium">
										{diagnosticPresets[selectedModule].summary}
									</p>
									<p class="font-sans text-xs text-muted-foreground">
										<span class="font-semibold text-foreground">Cách khắc phục:</span> {diagnosticPresets[selectedModule].remedy}
									</p>
								</div>
							{/if}

							<!-- Error log input -->
							<div>
								<label for="support-error-log" class="block font-mono text-[11px] font-semibold text-muted-foreground mb-1.5">
									Mô tả chi tiết hoặc dán Error Stack Trace:
								</label>
								<textarea
									id="support-error-log"
									bind:value={errorLogInput}
									rows="3"
									placeholder="VD: Error 401: Invalid RP ID during passkey assertion on iOS Safari..."
									class="w-full rounded-xl border border-border bg-background p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
								></textarea>
							</div>

							<!-- Action Buttons -->
							<div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
								<button
									type="button"
									onclick={() => handleCopySnippet(diagnosticPresets[selectedModule]?.remedy || '')}
									class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3.5 py-2 font-sans text-xs font-semibold text-foreground hover:bg-muted transition-colors"
								>
									<IconCopy size={14} />
									<span>{copiedDiag ? 'Đã sao chép giải pháp!' : 'Sao chép giải pháp'}</span>
								</button>

								<button
									type="button"
									onclick={handleSubmitMockTicket}
									class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 font-sans text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all"
								>
									{#if ticketSubmitted}
										<IconCheck size={14} stroke={3} class="text-emerald-300" />
										<span>Đã gửi yêu cầu thành công!</span>
									{:else}
										<span>Gửi yêu cầu tới đội kỹ sư Povixa</span>
										<IconArrowRight size={14} stroke={2.5} />
									{/if}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════ FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) ═══════════════ -->
	<section class="py-16 sm:py-24">
		<div class="mx-auto max-w-[1000px] px-6 sm:px-8">
			<div class="text-center mb-12">
				<span class="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
					KNOWLEDGE BASE & FAQ
				</span>
				<h2 class="mt-2 font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
					Câu hỏi kỹ thuật thường gặp
				</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					Tổng hợp các câu hỏi phổ biến nhất về cách vận hành, chi phí và cấu hình Povixa.
				</p>
			</div>

			<!-- FAQ List with clean borders -->
			<div class="space-y-3">
				{#each filteredFaqs as faq, idx}
					<div class="rounded-xl border border-border/80 bg-card overflow-hidden transition-all hover:border-border">
						<button
							type="button"
							onclick={() => (activeFaqIndex = activeFaqIndex === idx ? null : idx)}
							class="w-full flex items-center justify-between p-4 sm:p-5 text-left font-sans text-sm font-bold text-foreground hover:bg-muted/30 transition-colors"
						>
							<div class="flex items-center gap-3">
								<span class="rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
									{faq.category}
								</span>
								<span>{faq.q}</span>
							</div>
							<div class="text-muted-foreground shrink-0 ml-2">
								{#if activeFaqIndex === idx}
									<IconChevronUp size={16} stroke={2.5} />
								{:else}
									<IconChevronDown size={16} stroke={2.5} />
								{/if}
							</div>
						</button>

						{#if activeFaqIndex === idx}
							<div class="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/40">
								{faq.a}
							</div>
						{/if}
					</div>
				{/each}

				{#if filteredFaqs.length === 0}
					<div class="rounded-2xl border border-border/80 bg-card p-8 text-center text-muted-foreground">
						Không tìm thấy câu hỏi phù hợp với từ khóa "<strong>{searchQuery}</strong>". Bạn có thể hỏi trực tiếp trên Discord.
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- ═══════════════ PRE-FOOTER CTA FOUNDATION (WHITE BACKGROUND LIKE FOOTER) ═══════════════ -->
	<section class="border-t border-border/60 bg-white dark:bg-card py-20 sm:py-24 text-center">
		<div class="mx-auto max-w-3xl px-6 sm:px-8">
			<h2 class="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
				Vẫn chưa tìm thấy câu trả lời?
			</h2>
			<p class="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
				Tham gia Discord server của chúng tôi ngay hôm nay để nhận trợ giúp trực tiếp từ các kỹ sư cốt lõi và cộng đồng mã nguồn mở.
			</p>
			<div class="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
				<a
					href="https://discord.gg/povixa"
					target="_blank"
					rel="noreferrer"
					class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5865F2] px-6 text-xs font-bold text-white shadow-xs hover:bg-[#4752C4] transition-all"
				>
					<IconBrandDiscord size={18} />
					<span>Gia nhập Discord Server</span>
				</a>
				<a
					href="mailto:support@povixa.cloud"
					class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-xs font-semibold text-foreground shadow-xs hover:bg-muted transition-all"
				>
					<IconMessageCircle size={16} />
					<span>Gửi Email hỗ trợ</span>
				</a>
			</div>
		</div>
	</section>
</div>

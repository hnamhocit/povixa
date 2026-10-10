<script lang="ts">
	import {
		IconArrowRight,
		IconBrandDiscord,
		IconBrandFacebook,
		IconBrandGithub,
		IconBrandGoogle,
		IconChartBar,
		IconFingerprint,
		IconLanguage,
		IconSun
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.module_id_name()} — Unified Auth & Single Sign-On</title>
</svelte:head>

<section class="min-h-[calc(100vh-4rem)] bg-background text-foreground">
	<div class="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-6 sm:px-10 lg:px-12">
		<header class="flex h-16 items-center justify-between border-b border-border/80">
			<a href="/" class="flex items-center gap-2.5">
				<span
					class="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25"
				>
					<IconFingerprint size={18} stroke={2.2} />
				</span>
				<span class="text-[15px] font-bold tracking-tight">Povixa</span>
				<span
					class="rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
					>AUTH</span
				>
			</a>
			<nav class="hidden items-center gap-8 text-xs font-medium text-muted-foreground sm:flex">
				<a href="/docs" class="hover:text-primary">Tài liệu</a>
				<a href="/status" class="flex items-center gap-1.5 hover:text-primary"
					><span class="size-1.5 rounded-full bg-emerald-400"></span>Trạng thái</a
				>
			</nav>
			<div class="flex items-center gap-2 text-xs text-muted-foreground">
				<a
					href="http://localhost:5174"
					class="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
				>
					<span>Mở Cổng Xác Thực SSO</span>
					<IconArrowRight size={13} />
				</a>
			</div>
		</header>

		<div
			class="grid min-h-[calc(100vh-8rem)] items-center gap-12 py-12 lg:grid-cols-[1fr_390px] lg:gap-24 lg:py-16"
		>
			<div class="max-w-xl">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary"
				>
					<span class="size-1.5 rounded-full bg-primary"></span>
					Cổng Xác Thực Tập Trung · Single Sign-On Toàn Hệ Sinh Thái
				</div>
				<h1
					class="mt-7 text-5xl leading-[.98] font-extrabold tracking-[-0.06em] text-foreground sm:text-6xl"
				>
					Một tài khoản duy nhất.<br /><span
						class="bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 bg-clip-text text-transparent"
						>Bảo vệ toàn bộ hệ sinh thái.</span
					>
				</h1>
				<p class="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
					Povixa Auth là cổng xác thực SSO trung tâm cho tất cả ứng dụng trong hệ thống: Admin Portal, Developer Console, Applications Hub, Docs và Support.
				</p>
				<div class="mt-8 grid max-w-lg gap-4 text-sm text-foreground/80 sm:grid-cols-2">
					<span>✓ Đăng nhập một lần (SSO) dùng cho mọi app</span>
					<span>✓ Bảo mật phần cứng Passkeys & Biometrics</span>
					<span>✓ Phân quyền vai trò RBAC & Audit log</span>
					<span>✓ Tự động bảo vệ và chuyển hướng an toàn</span>
				</div>
				<div class="mt-10">
					<p class="text-xs text-muted-foreground">Ứng dụng tự động tích hợp cổng xác thực:</p>
					<div class="mt-3 flex flex-wrap gap-2">
						<span
							class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground shadow-sm"
							><IconChartBar size={13} class="text-primary" />Developer Console</span
						>
						<span
							class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground shadow-sm"
							><IconFingerprint size={13} class="text-primary" />Applications Hub</span
						>
						<span
							class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground shadow-sm"
							>Super Admin Portal</span
						>
					</div>
				</div>
			</div>

			<!-- Quick Login Card Preview -->
			<div
				class="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-7 space-y-4"
			>
				<div>
					<h2 class="text-xl font-bold tracking-tight text-foreground">Cổng Xác Thực SSO</h2>
					<p class="mt-1 text-xs text-muted-foreground">
						Mọi truy cập chưa đăng nhập từ Console, Apps hay Admin sẽ tự động được chuyển tiếp tới đây.
					</p>
				</div>

				<div class="rounded-xl border border-primary/20 bg-primary/10 p-3 text-xs text-primary font-medium">
					🔒 Single Sign-On (SSO) cho Console, Apps & Admin Portal.
				</div>

				<a
					href="http://localhost:5174"
					class="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
				>
					<span>Truy cập Cổng Đăng Nhập SSO</span>
					<IconArrowRight size={15} />
				</a>
			</div>
		</div>
	</div>
</section>

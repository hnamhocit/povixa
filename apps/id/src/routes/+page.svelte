<script lang="ts">
	import {
		IconFingerprint,
		IconShieldCheck,
		IconDashboard,
		IconRocket,
		IconServer,
		IconBook2
	} from '@tabler/icons-svelte-runes';
	import AuthCard from '#lib/components/AuthCard.svelte';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>Povixa SSO — Cổng Xác Thực Tập Trung</title>
</svelte:head>

<section class="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 bg-background">
	<div class="mx-auto w-full max-w-md space-y-6">
		<!-- SSO Branding Top -->
		<div class="text-center space-y-2">
			<div class="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
				<IconShieldCheck size={14} stroke={2.5} />
				<span>POVIXA SSO GATEWAY</span>
			</div>
			<h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-sans">
				Cổng Xác Thực Tập Trung
			</h1>
			<p class="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
				Một phiên đăng nhập duy nhất cho toàn bộ hệ sinh thái (Console, Apps, Admin, Docs).
			</p>
		</div>

		<!-- Main Auth Card -->
		<AuthCard />

		<!-- Ecosystem Apps Switcher Footer -->
		<div class="pt-4 border-t border-border/50 text-center space-y-3">
			<p class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
				Các dịch vụ trong hệ sinh thái
			</p>
			<div class="flex flex-wrap items-center justify-center gap-2 text-xs">
				<a
					href="http://localhost:5173"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border transition-colors"
				>
					<IconDashboard size={13} class="text-primary" />
					<span>Console</span>
				</a>
				<a
					href="http://localhost:5175"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border transition-colors"
				>
					<IconRocket size={13} class="text-cyan-500" />
					<span>Apps Hub</span>
				</a>
				<a
					href="http://localhost:5176"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border transition-colors"
				>
					<IconServer size={13} class="text-red-500" />
					<span>Admin Portal</span>
				</a>
				<a
					href="https://docs.povixa.com"
					target="_blank"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border transition-colors"
				>
					<IconBook2 size={13} class="text-emerald-500" />
					<span>Docs</span>
				</a>
			</div>

			<p class="text-[10px] text-muted-foreground font-mono">
				Bảo mật với OAuth 2.1 • OIDC • FIDO2 WebAuthn Passkeys
			</p>
		</div>
	</div>
</section>

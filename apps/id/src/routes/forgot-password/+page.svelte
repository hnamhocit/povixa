<script lang="ts">
	import { IconMail, IconArrowLeft, IconCheck, IconLoader2 } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let email = $state('');
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (email.trim()) {
			isSubmitting = true;
			setTimeout(() => {
				isSubmitting = false;
				isSubmitted = true;
			}, 800);
		}
	}
</script>

<svelte:head>
	<title>{m.field_forgot_password()} — Povixa ID</title>
</svelte:head>

<section class="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
	<div
		class="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8 dark:border-border/60"
	>
		<div class="mb-6 text-center">
			<div
				class="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
			>
				<IconMail size={24} />
			</div>
			<h1 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
				{m.field_forgot_password()}
			</h1>
			<p class="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
				Nhập địa chỉ email liên kết với tài khoản của bạn để nhận liên kết thiết lập lại mật khẩu an
				toàn.
			</p>
		</div>

		{#if isSubmitted}
			<div class="space-y-4 text-center">
				<div
					class="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
				>
					<IconCheck size={24} />
				</div>
				<h2 class="text-sm font-semibold text-foreground">Email khôi phục đã được gửi</h2>
				<p class="text-xs text-muted-foreground">
					Vui lòng kiểm tra hộp thư đến của <span class="font-semibold text-foreground"
						>{email}</span
					> và làm theo hướng dẫn.
				</p>
				<div class="pt-4">
					<a
						href="/"
						class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:bg-primary/90"
					>
						<IconArrowLeft size={16} />
						<span>Quay lại đăng nhập</span>
					</a>
				</div>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="recovery-email" class="mb-1.5 block text-xs font-medium text-foreground">
						{m.field_email()}
					</label>
					<div class="relative">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground"
						>
							<IconMail size={16} />
						</div>
						<input
							type="email"
							id="recovery-email"
							required
							bind:value={email}
							placeholder={m.field_email_placeholder()}
							class="w-full rounded-xl border border-border/80 bg-background/50 py-2.5 pr-3.5 pl-9 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-60"
				>
					{#if isSubmitting}
						<IconLoader2 class="size-4 animate-spin" />
						<span>Đang gửi liên kết...</span>
					{:else}
						<span>Gửi hướng dẫn khôi phục</span>
					{/if}
				</button>

				<div class="pt-2 text-center">
					<a
						href="/"
						class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
					>
						<IconArrowLeft size={14} />
						<span>Quay lại đăng nhập</span>
					</a>
				</div>
			</form>
		{/if}
	</div>
</section>

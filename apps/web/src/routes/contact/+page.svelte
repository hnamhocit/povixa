<script lang="ts">
	import {
		IconMail,
		IconBrandDiscord,
		IconBrandGithub,
		IconSend,
		IconCheck,
		IconLoader2
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let isSent = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (name && email && message) {
			isSubmitting = true;
			setTimeout(() => {
				isSubmitting = false;
				isSent = true;
			}, 700);
		}
	}
</script>

<svelte:head>
	<title>{m.footer_contact()} — Povixa Team</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-16 sm:py-24">
	<div class="text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
		>
			<IconMail size={14} />
			<span>Kết nối trực tiếp</span>
		</div>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			{m.footer_contact()}
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
			Bạn có câu hỏi, đề xuất hợp tác hoặc cần tư vấn triển khai? Hãy liên hệ với chúng tôi.
		</p>
	</div>

	<div class="mt-14 grid grid-cols-1 gap-8 md:grid-cols-12">
		<!-- Contact Form -->
		<div
			class="rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-sm sm:p-8 md:col-span-7"
		>
			{#if isSent}
				<div class="space-y-4 py-8 text-center text-emerald-500">
					<div
						class="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10"
					>
						<IconCheck size={24} />
					</div>
					<h3 class="text-base font-bold text-foreground">Tin nhắn đã được gửi thành công!</h3>
					<p class="text-xs text-muted-foreground">
						Cảm ơn bạn. Đội ngũ kỹ thuật Povixa sẽ phản hồi qua email <span
							class="font-semibold text-foreground">{email}</span
						> trong vòng 24 giờ.
					</p>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="space-y-4">
					<div>
						<label for="name" class="mb-1.5 block text-xs font-medium text-foreground">
							Họ và tên
						</label>
						<input
							type="text"
							id="name"
							required
							bind:value={name}
							placeholder="Nguyễn Văn A"
							class="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
						/>
					</div>

					<div>
						<label for="email" class="mb-1.5 block text-xs font-medium text-foreground">
							Địa chỉ email
						</label>
						<input
							type="email"
							id="email"
							required
							bind:value={email}
							placeholder="you@example.com"
							class="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
						/>
					</div>

					<div>
						<label for="message" class="mb-1.5 block text-xs font-medium text-foreground">
							Nội dung trao đổi
						</label>
						<textarea
							id="message"
							rows={4}
							required
							bind:value={message}
							placeholder="Hãy cho chúng tôi biết về yêu cầu hoặc ý kiến đóng góp của bạn..."
							class="w-full rounded-xl border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:bg-primary/90 active:scale-95 disabled:opacity-60"
					>
						{#if isSubmitting}
							<IconLoader2 class="size-4 animate-spin" />
							<span>Đang gửi...</span>
						{:else}
							<IconSend size={14} />
							<span>Gửi tin nhắn</span>
						{/if}
					</button>
				</form>
			{/if}
		</div>

		<!-- Direct Channels -->
		<div class="space-y-4 md:col-span-5">
			<div class="rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
				<h3 class="text-sm font-bold text-foreground">Kênh hỗ trợ nhanh</h3>
				<p class="mt-1 text-xs text-muted-foreground">
					Tham gia cộng đồng để nhận câu trả lời tức thì từ các lập trình viên khác:
				</p>
				<div class="mt-4 space-y-2.5">
					<a
						href="https://discord.gg/povixa"
						target="_blank"
						rel="noreferrer"
						class="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 p-3 text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent"
					>
						<IconBrandDiscord size={18} class="text-[#5865F2]" />
						<span>Kênh Discord Cộng đồng</span>
					</a>
					<a
						href="https://github.com/hnamhocit/povixa"
						target="_blank"
						rel="noreferrer"
						class="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 p-3 text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent"
					>
						<IconBrandGithub size={18} />
						<span>GitHub Issues & Discussions</span>
					</a>
				</div>
			</div>

			<div class="rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm">
				<h3 class="text-sm font-bold text-foreground">Email Trực tiếp</h3>
				<p class="mt-1 text-xs text-muted-foreground">Hợp tác doanh nghiệp và tài trợ:</p>
				<p class="mt-2 font-mono text-xs font-semibold text-primary">support@povixa.cloud</p>
			</div>
		</div>
	</div>
</section>

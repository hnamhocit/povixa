<script lang="ts">
	import type { AppItem, UseCase, TechStack, AppType } from '#lib/data/appsData.js';
	import { IconX, IconSparkles, IconBrandGithub, IconWorld, IconCheck, IconLayersLinked } from '@tabler/icons-svelte-runes';

	let {
		open = $bindable(false),
		onSubmit = (item: AppItem) => {}
	} = $props<{
		open: boolean;
		onSubmit?: (item: AppItem) => void;
	}>();

	let title = $state('');
	let description = $state('');
	let useCase = $state<UseCase>('SaaS & Dashboards');
	let framework = $state<TechStack>('Next.js');
	let demoUrl = $state('');
	let repoUrl = $state('');
	let isPublicTemplate = $state(false);
	let authorName = $state('');
	let authorUsername = $state('');
	let tagsInput = $state('Next.js 15, Tailwind, Povixa Auth');

	function handleSubmit() {
		if (!title.trim() || !demoUrl.trim()) return;

		const type: AppType = isPublicTemplate ? 'template' : 'showcase';
		const tags = tagsInput
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean);

		const gradients = [
			'from-indigo-600 via-purple-600 to-pink-600',
			'from-blue-600 via-cyan-600 to-teal-600',
			'from-amber-600 via-orange-600 to-rose-600',
			'from-emerald-600 via-teal-700 to-cyan-800'
		];
		const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

		const newApp: AppItem = {
			id: `sub-${Date.now().toString(36)}`,
			title: title.trim(),
			type,
			useCase,
			framework,
			author: {
				name: authorName.trim() || 'Cộng đồng Developer',
				username: authorUsername.trim() || 'developer',
				isOfficial: false
			},
			description: description.trim() || 'Ứng dụng xây dựng trên hạ tầng đám mây Povixa Cloud.',
			tags: tags.length > 0 ? tags : [framework, 'Povixa Cloud'],
			previewGradient: randomGradient,
			demoUrl: demoUrl.trim(),
			repoUrl: repoUrl.trim() || undefined,
			isOpenSource: Boolean(repoUrl.trim()),
			clonesCount: isPublicTemplate ? 1 : undefined,
			likesCount: 1,
			isLiked: true,
			featured: false,
			spotlight: false,
			createdAt: new Date().toISOString().split('T')[0]
		};

		onSubmit(newApp);
		open = false;
		// Reset
		title = '';
		description = '';
		demoUrl = '';
		repoUrl = '';
		isPublicTemplate = false;
	}
</script>

{#if open}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
			<!-- Header -->
			<div class="flex items-start justify-between border-b border-border/50 pb-3.5">
				<div class="flex items-center gap-2.5">
					<div class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<IconSparkles size={18} stroke={2.5} />
					</div>
					<div>
						<h3 class="font-bold text-base text-foreground">Gửi Ứng Dụng (Submit App / Template)</h3>
						<p class="text-xs text-muted-foreground">Chia sẻ sản phẩm hoặc template của bạn với cộng đồng Povixa</p>
					</div>
				</div>
				<button
					type="button"
					onclick={() => (open = false)}
					class="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
				>
					<IconX size={18} />
				</button>
			</div>

			<!-- Form Fields -->
			<div class="space-y-3.5 text-xs max-h-[70vh] overflow-y-auto pr-1">
				<div>
					<label for="sub-title" class="block font-semibold text-foreground mb-1">
						Tên Ứng Dụng / Template <span class="text-destructive">*</span>
					</label>
					<input
						id="sub-title"
						type="text"
						bind:value={title}
						placeholder="Ví dụ: DevPulse SaaS, AI Copywriter, SvelteKit Blog..."
						class="w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2 text-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div>
					<label for="sub-desc" class="block font-semibold text-foreground mb-1">
						Mô Tả Ngắn (1-2 câu tóm tắt) <span class="text-destructive">*</span>
					</label>
					<textarea
						id="sub-desc"
						rows="2"
						bind:value={description}
						placeholder="Tóm tắt ứng dụng giải quyết vấn đề gì, tính năng nổi bật..."
						class="w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2 text-foreground focus:border-primary focus:outline-none"
					></textarea>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<label for="sub-usecase" class="block font-semibold text-foreground mb-1">Mục Đích Sử Dụng (Use Case)</label>
						<select
							id="sub-usecase"
							bind:value={useCase}
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						>
							<option value="SaaS & Dashboards">SaaS & Dashboards</option>
							<option value="E-Commerce & Retail">E-Commerce & Retail</option>
							<option value="AI & Automation">AI & Automation</option>
							<option value="Developer Tools">Developer Tools</option>
							<option value="Community & Social">Community & Social</option>
						</select>
					</div>

					<div>
						<label for="sub-framework" class="block font-semibold text-foreground mb-1">Tech Stack Chính</label>
						<select
							id="sub-framework"
							bind:value={framework}
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						>
							<option value="Next.js">Next.js</option>
							<option value="SvelteKit">SvelteKit</option>
							<option value="NestJS">NestJS</option>
							<option value="Nuxt">Nuxt</option>
							<option value="Flutter">Flutter</option>
							<option value="Go Fiber">Go Fiber</option>
							<option value="React Native">React Native</option>
						</select>
					</div>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<label for="sub-demo" class="block font-semibold text-foreground mb-1">
							Live Website URL <span class="text-destructive">*</span>
						</label>
						<input
							id="sub-demo"
							type="url"
							bind:value={demoUrl}
							placeholder="https://myapp.com"
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none font-mono"
						/>
					</div>

					<div>
						<label for="sub-repo" class="block font-semibold text-foreground mb-1">GitHub Repo URL (Nếu mở mã nguồn)</label>
						<input
							id="sub-repo"
							type="url"
							bind:value={repoUrl}
							placeholder="https://github.com/user/repo"
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none font-mono"
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<label for="sub-author-name" class="block font-semibold text-foreground mb-1">Tên Tác Giả / Đội Ngũ</label>
						<input
							id="sub-author-name"
							type="text"
							bind:value={authorName}
							placeholder="Nguyễn Văn A"
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						/>
					</div>

					<div>
						<label for="sub-author-user" class="block font-semibold text-foreground mb-1">Username (@handle)</label>
						<input
							id="sub-author-user"
							type="text"
							bind:value={authorUsername}
							placeholder="nguyenvana"
							class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none font-mono"
						/>
					</div>
				</div>

				<div>
					<label for="sub-tags" class="block font-semibold text-foreground mb-1">Tags Công Nghệ (Phân cách bằng dấu phẩy)</label>
					<input
						id="sub-tags"
						type="text"
						bind:value={tagsInput}
						placeholder="Next.js 15, Tailwind, Stripe, Povixa Auth"
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<!-- Checkbox: Make this a public template -->
				<label class="flex items-start gap-2.5 rounded-xl border border-border bg-secondary/30 p-3 cursor-pointer hover:bg-secondary/50 transition-colors">
					<input
						type="checkbox"
						bind:checked={isPublicTemplate}
						class="mt-0.5 rounded border-border text-primary focus:ring-primary"
					/>
					<div class="text-xs">
						<span class="font-bold text-foreground block">Make this a public template (Cho phép cộng đồng clone mã nguồn)</span>
						<p class="text-muted-foreground text-[11px] mt-0.5">
							Ứng dụng sẽ được liệt kê trong tab "Starters & Boilerplates" với nút bấm "Use Template" / "Deploy / Clone" trực tiếp trên Povixa Console.
						</p>
					</div>
				</label>
			</div>

			<!-- Footer Actions -->
			<div class="flex items-center justify-end gap-2.5 pt-3.5 border-t border-border/50">
				<button
					type="button"
					onclick={() => (open = false)}
					class="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
				>
					Hủy
				</button>
				<button
					type="button"
					onclick={handleSubmit}
					disabled={!title.trim() || !demoUrl.trim()}
					class="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 disabled:opacity-50"
				>
					<IconCheck size={14} stroke={2.5} />
					<span>Gửi Duyệt Ngay</span>
				</button>
			</div>
		</div>
	</div>
{/if}

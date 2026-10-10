<script lang="ts">
	import { IconX, IconBrandGithub, IconRocket, IconGitBranch } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let {
		open = $bindable(false),
		initialRepo = '',
		initialName = '',
		onDeploy = (appData: any) => {}
	} = $props<{
		open: boolean;
		initialRepo?: string;
		initialName?: string;
		onDeploy?: (appData: any) => void;
	}>();

	let repoUrl = $state('');
	let appName = $state('');
	let branch = $state('main');
	let environment = $state<'Production' | 'Staging' | 'Preview'>('Production');

	$effect(() => {
		if (open) {
			if (initialRepo) repoUrl = initialRepo;
			if (initialName) appName = initialName;
		}
	});

	function handleDeploy() {
		if (!appName.trim()) {
			appName = repoUrl ? repoUrl.split('/').pop()?.replace('.git', '') || 'my-app' : 'my-new-app';
		}
		onDeploy({
			name: appName.trim(),
			repoUrl: repoUrl.trim() || 'povixa/saas-starter-nextjs',
			branch: branch.trim() || 'main',
			environment
		});
		open = false;
		appName = '';
		repoUrl = '';
	}
</script>

{#if open}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
			<!-- Header -->
			<div class="flex items-start justify-between border-b border-border/50 pb-4">
				<div class="space-y-1">
					<div class="flex items-center gap-2">
						<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<IconRocket size={16} stroke={2.5} />
						</div>
						<h3 class="font-bold text-base text-foreground">Triển Khai & Clone Mẫu Mã Nguồn</h3>
					</div>
					<p class="text-xs text-muted-foreground">Khởi tạo project độc lập trên Povixa Console và kết nối GitHub repository</p>
				</div>
				<button
					type="button"
					onclick={() => (open = false)}
					class="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
				>
					<IconX size={18} />
				</button>
			</div>

			<!-- Form Fields -->
			<div class="space-y-4 text-xs">
				<!-- Git Repo -->
				<div>
					<label for="deploy-repo" class="block font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
						<IconBrandGithub size={14} />
						<span>GitHub Repository URL</span>
					</label>
					<input
						id="deploy-repo"
						type="text"
						bind:value={repoUrl}
						placeholder="https://github.com/povixa/saas-starter-nextjs"
						class="w-full rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none font-mono"
					/>
				</div>

				<!-- App Name -->
				<div>
					<label for="deploy-app-name" class="block font-semibold text-foreground mb-1.5">
						Tên Dự Án (Project Name)
					</label>
					<input
						id="deploy-app-name"
						type="text"
						bind:value={appName}
						placeholder="Ví dụ: my-saas-portal"
						class="w-full rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<!-- Branch -->
					<div>
						<label for="deploy-branch" class="block font-semibold text-foreground mb-1.5 flex items-center gap-1">
							<IconGitBranch size={13} />
							<span>Branch</span>
						</label>
						<input
							id="deploy-branch"
							type="text"
							bind:value={branch}
							placeholder="main"
							class="w-full rounded-xl border border-border/80 bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none font-mono"
						/>
					</div>

					<!-- Environment -->
					<div>
						<label for="deploy-env" class="block font-semibold text-foreground mb-1.5">Môi Trường</label>
						<select
							id="deploy-env"
							bind:value={environment}
							class="w-full rounded-xl border border-border/80 bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
						>
							<option value="Production">Production</option>
							<option value="Staging">Staging</option>
							<option value="Preview">Preview</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Footer Actions -->
			<div class="flex items-center justify-end gap-2.5 pt-4 border-t border-border/50">
				<button
					type="button"
					onclick={() => (open = false)}
					class="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent"
				>
					Hủy
				</button>
				<button
					type="button"
					onclick={handleDeploy}
					class="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
				>
					<IconRocket size={14} />
					<span>Khởi Tạo & Deploy Ngay</span>
				</button>
			</div>
		</div>
	</div>
{/if}

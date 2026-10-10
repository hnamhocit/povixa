<script lang="ts">
	import {
		IconRoute,
		IconPlus,
		IconCheck,
		IconCopy,
		IconShieldCheck,
		IconExternalLink,
		IconTrash,
		IconAlertCircle,
		IconX,
		IconWorld
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type DomainItem = {
		id: string;
		domain: string;
		appTarget: string;
		sslStatus: 'Active' | 'Pending';
		dnsStatus: 'Verified' | 'Pending Verification';
		created: string;
	};

	let showAddModal = $state(false);
	let newDomain = $state('');
	let newAppTarget = $state('storefront-web');
	let copiedCname = $state(false);

	let domains = $state<DomainItem[]>([
		{
			id: 'dom-1',
			domain: 'storefront.myapp.dev',
			appTarget: 'storefront-web',
			sslStatus: 'Active',
			dnsStatus: 'Verified',
			created: 'Oct 02, 2026'
		},
		{
			id: 'dom-2',
			domain: 'api.myapp.dev',
			appTarget: 'nest-api-gateway',
			sslStatus: 'Active',
			dnsStatus: 'Verified',
			created: 'Oct 04, 2026'
		},
		{
			id: 'dom-3',
			domain: 'docs.myapp.dev',
			appTarget: 'documentation-hub',
			sslStatus: 'Active',
			dnsStatus: 'Verified',
			created: 'Oct 06, 2026'
		},
		{
			id: 'dom-4',
			domain: 'preview-staging.myapp.dev',
			appTarget: 'developer-portal',
			sslStatus: 'Pending',
			dnsStatus: 'Pending Verification',
			created: 'Oct 10, 2026'
		}
	]);

	async function copyCname() {
		try {
			await navigator.clipboard.writeText('cname.edge.povixa.cloud');
			copiedCname = true;
			setTimeout(() => {
				copiedCname = false;
			}, 2000);
		} catch (e) {
			console.error(e);
		}
	}

	function addDomain() {
		if (!newDomain.trim()) return;
		domains.unshift({
			id: `dom-${Date.now()}`,
			domain: newDomain.trim().toLowerCase(),
			appTarget: newAppTarget,
			sslStatus: 'Pending',
			dnsStatus: 'Pending Verification',
			created: 'Just now'
		});
		newDomain = '';
		showAddModal = false;
	}

	function removeDomain(id: string) {
		domains = domains.filter((d) => d.id !== id);
	}
</script>

<div class="space-y-10 lg:space-y-12">
	<!-- Page Header -->
	<div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-border/50 pb-8">
		<div class="space-y-2 max-w-2xl">
			<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
				<IconWorld size={14} />
				<span>Mạng Lưới Tên Miền Toàn Cầu</span>
			</div>
			<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-sans">
				{m.nav_domains()}
			</h1>
			<p class="text-sm text-muted-foreground leading-relaxed">
				Kết nối tên miền riêng của bạn với chứng chỉ SSL tự động từ Let's Encrypt, giao thức HTTP/3 và bảo vệ chống tấn công DDoS.
			</p>
		</div>

		<button
			type="button"
			onclick={() => (showAddModal = true)}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] shrink-0"
		>
			<IconPlus size={16} stroke={2.5} />
			<span>Thêm Tên Miền Mới</span>
		</button>
	</div>

	<!-- DNS Instructions Card -->
	<div class="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm space-y-4">
		<div class="flex items-center gap-2.5 text-sm font-bold text-foreground">
			<IconRoute size={18} class="text-primary" />
			<span>Hướng dẫn Cấu hình Bản ghi DNS</span>
		</div>
		<p class="text-xs text-muted-foreground leading-relaxed max-w-3xl">
			Trỏ bản ghi DNS của nhà cung cấp tên miền của bạn về mạng lưới Anycast toàn cầu của Povixa để kích hoạt cấp chứng chỉ SSL tự động và định tuyến sub-20ms.
		</p>
		<div class="flex flex-wrap items-center gap-3 pt-2 text-xs">
			<span class="rounded-lg bg-secondary/80 px-2.5 py-1 font-mono text-xs font-semibold text-foreground">
				Type: CNAME
			</span>
			<span class="rounded-lg bg-secondary/80 px-2.5 py-1 font-mono text-xs font-semibold text-foreground">
				Host: @ / sub-domain
			</span>
			<div class="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/60 px-3 py-1 font-mono text-xs">
				<span>Value: cname.edge.povixa.cloud</span>
				<button type="button" onclick={copyCname} class="text-muted-foreground hover:text-foreground transition-colors">
					{#if copiedCname}
						<IconCheck size={14} class="text-emerald-500" />
					{:else}
						<IconCopy size={14} />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Domains Table -->
	<div class="rounded-2xl border border-border/50 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/40 text-muted-foreground font-semibold">
					<tr>
						<th class="px-6 py-4">Tên miền</th>
						<th class="px-6 py-4">Ứng dụng đích</th>
						<th class="px-6 py-4">Chứng chỉ SSL</th>
						<th class="px-6 py-4">Trạng thái DNS</th>
						<th class="px-6 py-4">Ngày tạo</th>
						<th class="px-6 py-4 text-right">Thao tác</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40">
					{#each domains as item (item.id)}
						<tr class="transition-colors hover:bg-secondary/30">
							<!-- Domain -->
							<td class="px-6 py-4.5 font-mono font-bold text-foreground">
								<a
									href="https://{item.domain}"
									target="_blank"
									rel="noopener noreferrer"
									class="hover:text-primary hover:underline inline-flex items-center gap-1.5"
								>
									<span>{item.domain}</span>
									<IconExternalLink size={13} class="opacity-60" />
								</a>
							</td>

							<!-- Target App -->
							<td class="px-6 py-4.5">
								<span class="rounded-md bg-secondary/80 px-2.5 py-1 text-[11px] font-semibold text-foreground font-mono">
									{item.appTarget}
								</span>
							</td>

							<!-- SSL -->
							<td class="px-6 py-4.5">
								<span
									class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold {item.sslStatus === 'Active'
										? 'bg-emerald-500/15 text-emerald-500'
										: 'bg-amber-500/15 text-amber-500'}"
								>
									<IconShieldCheck size={13} stroke={2.5} />
									<span>{item.sslStatus === 'Active' ? 'Active SSL' : 'Pending SSL'}</span>
								</span>
							</td>

							<!-- DNS -->
							<td class="px-6 py-4.5">
								<span
									class="inline-flex items-center gap-1.5 text-xs font-medium {item.dnsStatus === 'Verified'
										? 'text-emerald-500'
										: 'text-amber-500'}"
								>
									<span class="h-2 w-2 rounded-full {item.dnsStatus === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}"></span>
									<span>{item.dnsStatus}</span>
								</span>
							</td>

							<!-- Created -->
							<td class="px-6 py-4.5 text-muted-foreground">
								{item.created}
							</td>

							<!-- Actions -->
							<td class="px-6 py-4.5 text-right">
								<button
									type="button"
									onclick={() => removeDomain(item.id)}
									class="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
									title="Xóa tên miền"
								>
									<IconTrash size={16} />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal: Add Domain -->
{#if showAddModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
			<div class="flex items-center justify-between border-b border-border pb-3">
				<h3 class="font-bold text-sm text-foreground">Kết nối Tên miền Riêng</h3>
				<button
					type="button"
					onclick={() => (showAddModal = false)}
					class="rounded p-1 text-muted-foreground hover:bg-accent"
				>
					<IconX size={16} />
				</button>
			</div>

			<div class="space-y-3 text-xs">
				<div>
					<label for="new-custom-domain" class="block font-semibold text-foreground mb-1">Tên miền của bạn</label>
					<input
						id="new-custom-domain"
						type="text"
						bind:value={newDomain}
						placeholder="ví dụ: app.congty.com"
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none font-mono"
					/>
				</div>

				<div>
					<label for="new-app-target" class="block font-semibold text-foreground mb-1">Định tuyến lưu lượng tới</label>
					<select
						id="new-app-target"
						bind:value={newAppTarget}
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					>
						<option value="storefront-web">storefront-web (SvelteKit)</option>
						<option value="nest-api-gateway">nest-api-gateway (NestJS)</option>
						<option value="developer-portal">developer-portal (Next.js)</option>
						<option value="documentation-hub">documentation-hub (SvelteKit)</option>
					</select>
				</div>
			</div>

			<div class="flex justify-end gap-2 pt-3 border-t border-border">
				<button
					type="button"
					onclick={() => (showAddModal = false)}
					class="rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
				>
					Hủy
				</button>
				<button
					type="button"
					onclick={addDomain}
					class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Xác nhận Thêm
				</button>
			</div>
		</div>
	</div>
{/if}

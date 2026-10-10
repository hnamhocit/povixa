<script lang="ts">
	import {
		IconDatabase,
		IconFolder,
		IconUpload,
		IconLock,
		IconWorld,
		IconPlus,
		IconCopy,
		IconCheck,
		IconTrash,
		IconExternalLink,
		IconX
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type BucketItem = {
		id: string;
		name: string;
		access: 'Public (CDN)' | 'Private (Signed URL)';
		size: string;
		objects: string;
		region: string;
		created: string;
	};

	let showNewBucketModal = $state(false);
	let newBucketName = $state('');
	let newBucketAccess = $state<'Public (CDN)' | 'Private (Signed URL)'>('Public (CDN)');

	let buckets = $state<BucketItem[]>([
		{
			id: 'bkt-1',
			name: 'public-assets',
			access: 'Public (CDN)',
			size: '18.4 GB',
			objects: '4,280 tệp',
			region: 'Global Edge (Anycast)',
			created: 'Oct 01, 2026'
		},
		{
			id: 'bkt-2',
			name: 'user-avatars',
			access: 'Public (CDN)',
			size: '12.1 GB',
			objects: '18,420 tệp',
			region: 'Global Edge (Anycast)',
			created: 'Oct 02, 2026'
		},
		{
			id: 'bkt-3',
			name: 'private-invoices',
			access: 'Private (Signed URL)',
			size: '14.2 GB',
			objects: '890 tệp',
			region: 'sin1 (Singapore)',
			created: 'Oct 05, 2026'
		},
		{
			id: 'bkt-4',
			name: 'system-backups',
			access: 'Private (Signed URL)',
			size: '3.5 GB',
			objects: '28 tệp',
			region: 'iad1 (US-East)',
			created: 'Oct 08, 2026'
		}
	]);

	function createBucket() {
		if (!newBucketName.trim()) return;
		buckets.unshift({
			id: `bkt-${Date.now()}`,
			name: newBucketName.trim().toLowerCase().replace(/\s+/g, '-'),
			access: newBucketAccess,
			size: '0 MB',
			objects: '0 tệp',
			region: 'Global Edge (Anycast)',
			created: 'Just now'
		});
		newBucketName = '';
		showNewBucketModal = false;
	}
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
					<IconDatabase size={20} stroke={2.5} />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.nav_storage()}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-1">
				Lưu trữ đối tượng phân tán chuẩn S3 tương thích, tăng tốc mạng CDN toàn cầu và tạo URL có chữ ký an toàn.
			</p>
		</div>

		<button
			type="button"
			onclick={() => (showNewBucketModal = true)}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
		>
			<IconPlus size={15} stroke={2.5} />
			<span>Tạo Bucket Mới</span>
		</button>
	</div>

	<!-- Stats Ribbon -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Dung Lượng Đã Dùng</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">48.2 GB</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">19% hạn mức 250 GB miễn phí</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Số Lượng Bucket</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">4 Hoạt Động</div>
			<p class="mt-1 text-xs text-muted-foreground">Không giới hạn số lượng bucket</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Băng Thông Mạng CDN</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">428.5 GB</div>
			<p class="mt-1 text-xs text-emerald-500 font-medium">Tỷ lệ cache hit 92.4%</p>
		</div>

		<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
			<span class="text-xs text-muted-foreground">Chuẩn Tương Thích</span>
			<div class="mt-2 text-2xl font-bold text-foreground font-sans">S3 API 100%</div>
			<p class="mt-1 text-xs text-muted-foreground">AWS SDK, MinIO, rclone</p>
		</div>
	</div>

	<!-- Buckets Table -->
	<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="border-b border-border/50 px-5 py-3.5 flex items-center justify-between">
			<h3 class="font-bold text-xs text-foreground">Danh Sách Buckets</h3>
			<span class="text-xs text-muted-foreground">{buckets.length} buckets</span>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
					<tr>
						<th class="px-5 py-3.5">Tên Bucket</th>
						<th class="px-5 py-3.5">Cơ Chế Quyền</th>
						<th class="px-5 py-3.5">Dung Lượng</th>
						<th class="px-5 py-3.5">Số Tệp</th>
						<th class="px-5 py-3.5">Khu Vực Phân Phối</th>
						<th class="px-5 py-3.5 text-right">Thao Tác</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40">
					{#each buckets as b (b.id)}
						<tr class="transition-colors hover:bg-secondary/20">
							<td class="px-5 py-4 font-mono font-bold text-foreground">
								<div class="flex items-center gap-2.5">
									<IconFolder size={17} class="text-cyan-500" />
									<span>{b.name}</span>
								</div>
							</td>
							<td class="px-5 py-4">
								<span
									class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold {b.access.includes(
										'Public'
									)
										? 'bg-blue-500/15 text-blue-500'
										: 'bg-secondary text-foreground'}"
								>
									{#if b.access.includes('Public')}
										<IconWorld size={12} />
									{:else}
										<IconLock size={12} />
									{/if}
									<span>{b.access}</span>
								</span>
							</td>
							<td class="px-5 py-4 font-mono text-muted-foreground">
								{b.size}
							</td>
							<td class="px-5 py-4 text-muted-foreground">
								{b.objects}
							</td>
							<td class="px-5 py-4 text-muted-foreground text-[11px]">
								{b.region}
							</td>
							<td class="px-5 py-4 text-right">
								<button
									type="button"
									class="rounded-lg border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-accent"
								>
									Khám phá tệp →
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal: New Bucket -->
{#if showNewBucketModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
			<div class="flex items-center justify-between border-b border-border pb-3">
				<h3 class="font-bold text-sm text-foreground">Tạo Bucket Lưu Trữ S3 Mới</h3>
				<button type="button" onclick={() => (showNewBucketModal = false)} class="rounded p-1 text-muted-foreground hover:bg-accent">
					<IconX size={16} />
				</button>
			</div>

			<div class="space-y-3 text-xs">
				<div>
					<label for="bkt-name" class="block font-semibold text-foreground mb-1">Tên Bucket (duy nhất, chữ thường)</label>
					<input
						id="bkt-name"
						type="text"
						bind:value={newBucketName}
						placeholder="e.g. app-user-uploads"
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none font-mono"
					/>
				</div>

				<div>
					<label for="bkt-access" class="block font-semibold text-foreground mb-1">Chế Độ Truy Cập</label>
					<select
						id="bkt-access"
						bind:value={newBucketAccess}
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					>
						<option value="Public (CDN)">Public (Tăng tốc CDN toàn cầu, đọc công khai)</option>
						<option value="Private (Signed URL)">Private (Yêu cầu URL có chữ ký bí mật, hạn chế)</option>
					</select>
				</div>
			</div>

			<div class="flex justify-end gap-2 pt-3 border-t border-border">
				<button
					type="button"
					onclick={() => (showNewBucketModal = false)}
					class="rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
				>
					Hủy
				</button>
				<button
					type="button"
					onclick={createBucket}
					class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Tạo Bucket
				</button>
			</div>
		</div>
	</div>
{/if}

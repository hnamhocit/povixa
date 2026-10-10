<script lang="ts">
	import {
		IconKey,
		IconPlus,
		IconCopy,
		IconCheck,
		IconTrash,
		IconShieldLock,
		IconAlertTriangle,
		IconX
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type ApiKey = {
		id: string;
		name: string;
		prefix: string;
		type: 'Public / Client' | 'Secret / Admin' | 'Ingest Only';
		created: string;
		lastUsed: string;
		status: 'Active' | 'Revoked';
	};

	let copiedId = $state<string | null>(null);
	let showCreateModal = $state(false);

	let keys = $state<ApiKey[]>([
		{
			id: 'k-1',
			name: 'Default Production Client Key',
			prefix: 'pvx_live_99d14f828a1c64...',
			type: 'Public / Client',
			created: 'Oct 08, 2026',
			lastUsed: 'Just now',
			status: 'Active'
		},
		{
			id: 'k-2',
			name: 'Backend Microservices Secret',
			prefix: 'pvx_sec_7fa021cb83d10a...',
			type: 'Secret / Admin',
			created: 'Oct 09, 2026',
			lastUsed: '1m ago',
			status: 'Active'
		},
		{
			id: 'k-3',
			name: 'Telemetry Ingestion Token',
			prefix: 'pvx_ing_012e8bc993e7f4...',
			type: 'Ingest Only',
			created: 'Oct 09, 2026',
			lastUsed: '5s ago',
			status: 'Active'
		},
		{
			id: 'k-4',
			name: 'Deprecated Mobile Client Key',
			prefix: 'pvx_test_448f2190ee01aa...',
			type: 'Public / Client',
			created: 'Sep 24, 2026',
			lastUsed: '12d ago',
			status: 'Revoked'
		}
	]);

	async function copyKey(key: ApiKey) {
		try {
			await navigator.clipboard.writeText(key.prefix);
			copiedId = key.id;
			setTimeout(() => {
				copiedId = null;
			}, 2000);
		} catch (e) {
			console.error(e);
		}
	}

	function revokeKey(id: string) {
		const target = keys.find((k) => k.id === id);
		if (target) {
			target.status = 'Revoked';
		}
	}

	let newKeyName = $state('');
	let newKeyType = $state<'Public / Client' | 'Secret / Admin' | 'Ingest Only'>('Public / Client');

	function createKey() {
		if (!newKeyName.trim()) return;
		const prefixTag =
			newKeyType === 'Secret / Admin'
				? 'pvx_sec_'
				: newKeyType === 'Ingest Only'
					? 'pvx_ing_'
					: 'pvx_live_';
		const randomHex = Math.random().toString(16).substring(2, 14);

		keys.unshift({
			id: `k-${Date.now()}`,
			name: newKeyName.trim(),
			prefix: `${prefixTag}${randomHex}...`,
			type: newKeyType,
			created: 'Just now',
			lastUsed: 'Never',
			status: 'Active'
		});

		newKeyName = '';
		showCreateModal = false;
	}
</script>

<div class="space-y-6">
	<!-- Top Title & Action -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.apikeys_title()}</h1>
			<p class="text-xs text-muted-foreground mt-1">{m.apikeys_subtitle()}</p>
		</div>

		<button
			type="button"
			onclick={() => (showCreateModal = true)}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
		>
			<IconPlus size={15} stroke={2.5} />
			<span>{m.apikeys_btn_create()}</span>
		</button>
	</div>

	<!-- Security Advisory Banner -->
	<div class="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-500">
		<IconAlertTriangle size={18} class="shrink-0 mt-0.5" />
		<div>
			<span class="font-bold">Security Best Practice:</span>
			Never expose <code class="font-mono bg-amber-500/20 px-1 py-0.5 rounded">pvx_sec_</code> admin keys on client-side frontends. Use <code class="font-mono bg-amber-500/20 px-1 py-0.5 rounded">pvx_live_</code> restricted public keys for browsers and mobile applications.
		</div>
	</div>

	<!-- Keys Table -->
	<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
					<tr>
						<th class="px-5 py-3.5">{m.apikeys_col_name()}</th>
						<th class="px-5 py-3.5">{m.apikeys_col_token()}</th>
						<th class="px-5 py-3.5">{m.apikeys_col_type()}</th>
						<th class="px-5 py-3.5">{m.apikeys_col_created()}</th>
						<th class="px-5 py-3.5">{m.apikeys_col_last_used()}</th>
						<th class="px-5 py-3.5">{m.apikeys_col_status()}</th>
						<th class="px-5 py-3.5 text-right">Action</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40">
					{#each keys as key (key.id)}
						<tr class="transition-colors hover:bg-secondary/20 {key.status === 'Revoked' ? 'opacity-50' : ''}">
							<!-- Name -->
							<td class="px-5 py-4 font-semibold text-foreground">
								<div class="flex items-center gap-2">
									<IconKey size={15} class="text-primary" />
									<span>{key.name}</span>
								</div>
							</td>

							<!-- Prefix & Copy -->
							<td class="px-5 py-4 font-mono text-muted-foreground">
								<div class="inline-flex items-center gap-2 rounded bg-secondary/60 px-2 py-1">
									<span>{key.prefix}</span>
									<button
										type="button"
										onclick={() => copyKey(key)}
										class="text-muted-foreground hover:text-foreground"
										title="Copy Prefix"
									>
										{#if copiedId === key.id}
											<IconCheck size={13} class="text-emerald-500" />
										{:else}
											<IconCopy size={13} />
										{/if}
									</button>
								</div>
							</td>

							<!-- Type -->
							<td class="px-5 py-4">
								<span class="rounded bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold text-foreground">
									{key.type}
								</span>
							</td>

							<!-- Created -->
							<td class="px-5 py-4 text-muted-foreground">
								{key.created}
							</td>

							<!-- Last Used -->
							<td class="px-5 py-4 text-muted-foreground">
								{key.lastUsed}
							</td>

							<!-- Status -->
							<td class="px-5 py-4">
								<span
									class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold {key.status === 'Active'
										? 'bg-emerald-500/15 text-emerald-500'
										: 'bg-destructive/15 text-destructive'}"
								>
									<span class="h-1.5 w-1.5 rounded-full {key.status === 'Active' ? 'bg-emerald-500' : 'bg-destructive'}"></span>
									{key.status}
								</span>
							</td>

							<!-- Action -->
							<td class="px-5 py-4 text-right">
								{#if key.status === 'Active'}
									<button
										type="button"
										onclick={() => revokeKey(key.id)}
										class="rounded-lg px-2 py-1 text-[11px] font-medium text-destructive hover:bg-destructive/10 transition-colors"
									>
										Revoke
									</button>
								{:else}
									<span class="text-[11px] text-muted-foreground">—</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal: Create Key -->
{#if showCreateModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
			<div class="flex items-center justify-between border-b border-border pb-3">
				<h3 class="font-bold text-sm text-foreground">Generate New API Key</h3>
				<button
					type="button"
					onclick={() => (showCreateModal = false)}
					class="rounded p-1 text-muted-foreground hover:bg-accent"
				>
					<IconX size={16} />
				</button>
			</div>

			<div class="space-y-3 text-xs">
				<div>
					<label for="new-key-name" class="block font-semibold text-foreground mb-1">Key Label</label>
					<input
						id="new-key-name"
						type="text"
						bind:value={newKeyName}
						placeholder="e.g. Next.js Web Client, Mobile App"
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div>
					<label for="new-key-type" class="block font-semibold text-foreground mb-1">Access Level</label>
					<select
						id="new-key-type"
						bind:value={newKeyType}
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					>
						<option value="Public / Client">Public / Client (Read-only, Config, Auth, Storage)</option>
						<option value="Secret / Admin">Secret / Admin (Full root cluster privileges)</option>
						<option value="Ingest Only">Ingest Only (Telemetry and Events ingest only)</option>
					</select>
				</div>
			</div>

			<div class="flex justify-end gap-2 pt-3 border-t border-border">
				<button
					type="button"
					onclick={() => (showCreateModal = false)}
					class="rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={createKey}
					class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Generate
				</button>
			</div>
		</div>
	</div>
{/if}

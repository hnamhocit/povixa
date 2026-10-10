<script lang="ts">
	import {
		IconAdjustments,
		IconPlus,
		IconSearch,
		IconCheck,
		IconX,
		IconDeviceFloppy,
		IconTrash,
		IconFilter,
		IconPercentage
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type Flag = {
		id: string;
		key: string;
		description: string;
		enabled: boolean;
		rollout: number;
		environments: string[];
		lastEvaluated: string;
	};

	let searchQuery = $state('');
	let showNewModal = $state(false);

	let flags = $state<Flag[]>([
		{
			id: 'flg-1',
			key: 'dark_mode_v2',
			description: 'Next-gen Oklch color palette and smooth theme transition engine',
			enabled: true,
			rollout: 100,
			environments: ['Production', 'Staging', 'Dev'],
			lastEvaluated: '1m ago'
		},
		{
			id: 'flg-2',
			key: 'ai_copilot_assistant',
			description: 'Autonomous coding agent inline suggestions & schema validator',
			enabled: true,
			rollout: 40,
			environments: ['Production', 'Staging'],
			lastEvaluated: '3m ago'
		},
		{
			id: 'flg-3',
			key: 'canary_billing_v3',
			description: 'Real-time usage metering with zero-latency Kafka streaming pipeline',
			enabled: false,
			rollout: 0,
			environments: ['Staging', 'Dev'],
			lastEvaluated: '14m ago'
		},
		{
			id: 'flg-4',
			key: 'passkey_webauthn_v2',
			description: 'Hardware security keys (FIDO2/WebAuthn) one-tap biometric authentication',
			enabled: true,
			rollout: 100,
			environments: ['Production', 'Staging', 'Dev'],
			lastEvaluated: '30s ago'
		},
		{
			id: 'flg-5',
			key: 'geo_edge_cdn_routing',
			description: 'Dynamic traffic steering to lowest latency regional edge node',
			enabled: true,
			rollout: 85,
			environments: ['Production'],
			lastEvaluated: '10s ago'
		}
	]);

	const filteredFlags = $derived(
		searchQuery.trim() === ''
			? flags
			: flags.filter(
					(f) =>
						f.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
						f.description.toLowerCase().includes(searchQuery.toLowerCase())
				)
	);

	function toggleFlag(flag: Flag) {
		flag.enabled = !flag.enabled;
		if (!flag.enabled) {
			flag.rollout = 0;
		} else if (flag.rollout === 0) {
			flag.rollout = 100;
		}
	}

	let newFlagKey = $state('');
	let newFlagDesc = $state('');
	let newFlagRollout = $state(100);

	function createFlag() {
		if (!newFlagKey.trim()) return;
		flags.unshift({
			id: `flg-${Date.now()}`,
			key: newFlagKey.trim().toLowerCase().replace(/\s+/g, '_'),
			description: newFlagDesc.trim() || 'Custom remote configuration variable',
			enabled: true,
			rollout: newFlagRollout,
			environments: ['Production', 'Staging'],
			lastEvaluated: 'Just now'
		});
		newFlagKey = '';
		newFlagDesc = '';
		newFlagRollout = 100;
		showNewModal = false;
	}

	function deleteFlag(id: string) {
		flags = flags.filter((f) => f.id !== id);
	}
</script>

<div class="space-y-6">
	<!-- Top Header & Action -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.config_title()}</h1>
			<p class="text-xs text-muted-foreground mt-1">{m.config_subtitle()}</p>
		</div>

		<button
			type="button"
			onclick={() => (showNewModal = true)}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
		>
			<IconPlus size={15} stroke={2.5} />
			<span>{m.config_btn_create()}</span>
		</button>
	</div>

	<!-- Search & Filter Bar -->
	<div class="flex items-center gap-3">
		<div class="relative flex-1">
			<IconSearch size={16} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder={m.config_search_placeholder()}
				class="w-full rounded-xl border border-border/60 bg-card/60 pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground backdrop-blur-sm focus:border-primary focus:outline-none"
			/>
		</div>
		<span class="text-xs text-muted-foreground">
			{filteredFlags.length} flags total
		</span>
	</div>

	<!-- Flags Table / Cards -->
	<div class="rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-sm">
		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs">
				<thead class="border-b border-border/50 bg-secondary/30 text-muted-foreground font-semibold">
					<tr>
						<th class="px-5 py-3.5">{m.config_col_key()}</th>
						<th class="px-5 py-3.5">{m.config_col_desc()}</th>
						<th class="px-5 py-3.5">{m.config_col_rollout()}</th>
						<th class="px-5 py-3.5">{m.config_col_env()}</th>
						<th class="px-5 py-3.5">{m.config_col_status()}</th>
						<th class="px-5 py-3.5 text-right">{m.config_col_actions()}</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/40">
					{#each filteredFlags as flag (flag.id)}
						<tr class="transition-colors hover:bg-secondary/20">
							<!-- Key -->
							<td class="px-5 py-4 font-mono font-bold text-foreground">
								<div class="flex items-center gap-2">
									<span class="h-2 w-2 rounded-full {flag.enabled ? 'bg-emerald-500' : 'bg-zinc-500'}"></span>
									<span>{flag.key}</span>
								</div>
							</td>

							<!-- Description -->
							<td class="px-5 py-4 text-muted-foreground max-w-xs truncate">
								{flag.description}
							</td>

							<!-- Rollout Percentage Slider -->
							<td class="px-5 py-4">
								<div class="flex items-center gap-2.5">
									<input
										type="range"
										min="0"
										max="100"
										step="5"
										bind:value={flag.rollout}
										disabled={!flag.enabled}
										class="w-24 accent-primary cursor-pointer disabled:opacity-40"
									/>
									<span class="font-mono font-semibold text-foreground w-10">
										{flag.rollout}%
									</span>
								</div>
							</td>

							<!-- Environments -->
							<td class="px-5 py-4">
								<div class="flex flex-wrap gap-1">
									{#each flag.environments as env}
										<span class="rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground">
											{env}
										</span>
									{/each}
								</div>
							</td>

							<!-- Enabled Toggle -->
							<td class="px-5 py-4">
								<button
									type="button"
									onclick={() => toggleFlag(flag)}
									aria-label="Toggle {flag.key}"
									class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none {flag.enabled ? 'bg-primary' : 'bg-secondary'}"
								>
									<span
										class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out {flag.enabled ? 'translate-x-4' : 'translate-x-0'}"
									></span>
								</button>
							</td>

							<!-- Actions -->
							<td class="px-5 py-4 text-right">
								<button
									type="button"
									onclick={() => deleteFlag(flag.id)}
									class="rounded-lg p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
									title="Delete Flag"
								>
									<IconTrash size={15} />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal: New Feature Flag -->
{#if showNewModal}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
	>
		<div class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
			<div class="flex items-center justify-between border-b border-border pb-3">
				<h3 class="font-bold text-sm text-foreground">Create Feature Flag</h3>
				<button
					type="button"
					onclick={() => (showNewModal = false)}
					class="rounded p-1 text-muted-foreground hover:bg-accent"
				>
					<IconX size={16} />
				</button>
			</div>

			<div class="space-y-3 text-xs">
				<div>
					<label for="new-flag-key" class="block font-semibold text-foreground mb-1">Flag Key (camelCase or snake_case)</label>
					<input
						id="new-flag-key"
						type="text"
						bind:value={newFlagKey}
						placeholder="e.g. enable_stripe_v2"
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none font-mono"
					/>
				</div>

				<div>
					<label for="new-flag-desc" class="block font-semibold text-foreground mb-1">Description</label>
					<input
						id="new-flag-desc"
						type="text"
						bind:value={newFlagDesc}
						placeholder="Purpose of this flag..."
						class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
					/>
				</div>

				<div>
					<div class="flex justify-between font-semibold text-foreground mb-1">
						<span>Initial Rollout Percentage</span>
						<span class="font-mono text-primary">{newFlagRollout}%</span>
					</div>
					<input
						type="range"
						min="0"
						max="100"
						step="5"
						bind:value={newFlagRollout}
						class="w-full accent-primary"
					/>
				</div>
			</div>

			<div class="flex justify-end gap-2 pt-3 border-t border-border">
				<button
					type="button"
					onclick={() => (showNewModal = false)}
					class="rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={createFlag}
					class="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Create Flag
				</button>
			</div>
		</div>
	</div>
{/if}

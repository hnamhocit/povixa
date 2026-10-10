<script lang="ts">
	import {
		IconShieldCheck,
		IconBolt,
		IconDatabase,
		IconBell,
		IconRoute,
		IconCheck,
		IconLock,
		IconReceipt,
		IconExternalLink
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let costCeilingEnabled = $state(true);

	const usageMeters = [
		{
			label: m.billing_meter_req(),
			used: '34.2M',
			total: '100M',
			percent: 34,
			icon: IconBolt,
			color: 'bg-indigo-500'
		},
		{
			label: m.billing_meter_storage(),
			used: '48.2 GB',
			total: '250 GB',
			percent: 19,
			icon: IconDatabase,
			color: 'bg-cyan-500'
		},
		{
			label: m.billing_meter_push(),
			used: '124,500',
			total: '1,000,000',
			percent: 12,
			icon: IconBell,
			color: 'bg-amber-500'
		},
		{
			label: m.billing_meter_bandwidth(),
			used: '428 GB',
			total: '1,000 GB',
			percent: 42,
			icon: IconRoute,
			color: 'bg-emerald-500'
		}
	];

	const pastInvoices = [
		{ id: 'INV-2026-10', period: 'Oct 01 - Oct 31, 2026', amount: '$0.00', status: 'Paid / Pact Free' },
		{ id: 'INV-2026-09', period: 'Sep 01 - Sep 30, 2026', amount: '$0.00', status: 'Paid / Pact Free' },
		{ id: 'INV-2026-08', period: 'Aug 01 - Aug 31, 2026', amount: '$0.00', status: 'Paid / Pact Free' }
	];
</script>

<div class="space-y-6">
	<!-- Top Title -->
	<div>
		<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.billing_title()}</h1>
		<p class="text-xs text-muted-foreground mt-1">{m.billing_subtitle()}</p>
	</div>

	<!-- Community Pact Active Card -->
	<div class="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-card to-card p-6 backdrop-blur-md">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div class="space-y-2 max-w-xl">
				<div class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-500 tracking-wider">
					<IconShieldCheck size={15} stroke={2.5} />
					<span>{m.billing_pact_badge()}</span>
				</div>
				<h2 class="text-lg font-bold text-foreground">You Pay $0 Forever</h2>
				<p class="text-xs text-muted-foreground leading-relaxed">
					{m.billing_pact_desc()}
				</p>
			</div>

			<div class="flex flex-col items-start md:items-end gap-2 shrink-0">
				<div class="flex items-center gap-2 rounded-xl bg-card border border-border px-3 py-1.5 text-xs">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					<span class="font-mono text-muted-foreground">https://myapp.dev</span>
					<span class="text-emerald-500 font-semibold">Badge Verified</span>
				</div>
				<a
					href="https://povixa.com/sponsor"
					target="_blank"
					class="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
				>
					<span>Upgrade to Sponsor Tier</span>
					<IconExternalLink size={12} />
				</a>
			</div>
		</div>
	</div>

	<!-- Hard Cost Ceiling Toggle -->
	<div class="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
		<div class="space-y-1">
			<div class="flex items-center gap-2">
				<IconLock size={16} class="text-primary" />
				<h3 class="font-bold text-sm text-foreground">{m.billing_cost_ceiling_title()}</h3>
			</div>
			<p class="text-xs text-muted-foreground max-w-xl">
				{m.billing_cost_ceiling_desc()}
			</p>
		</div>

		<div class="flex items-center gap-3">
			<span class="text-xs font-semibold {costCeilingEnabled ? 'text-emerald-500' : 'text-muted-foreground'}">
				{costCeilingEnabled ? 'Hard Cap Enforced ($0 Max)' : 'Disabled'}
			</span>
			<button
				type="button"
				onclick={() => (costCeilingEnabled = !costCeilingEnabled)}
				aria-label="Toggle Hard Cost Ceiling"
				class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none {costCeilingEnabled ? 'bg-primary' : 'bg-secondary'}"
			>
				<span
					class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out {costCeilingEnabled ? 'translate-x-5' : 'translate-x-0'}"
				></span>
			</button>
		</div>
	</div>

	<!-- Usage Progress Bars -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each usageMeters as meter}
			<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm space-y-3">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<meter.icon size={16} class="text-muted-foreground" />
						<span class="font-semibold text-xs text-foreground">{meter.label}</span>
					</div>
					<span class="text-xs font-mono font-semibold text-foreground">
						{meter.used} <span class="text-muted-foreground">/ {meter.total}</span>
					</span>
				</div>

				<div class="h-2 w-full overflow-hidden rounded-full bg-secondary">
					<div
						class="h-full rounded-full transition-all duration-500 {meter.color}"
						style="width: {meter.percent}%"
					></div>
				</div>

				<div class="flex justify-between text-[11px] text-muted-foreground">
					<span>{meter.percent}% quota utilized</span>
					<span class="text-emerald-500 font-medium">Within Free Tier</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Past Invoices -->
	<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm space-y-4">
		<div class="flex items-center gap-2">
			<IconReceipt size={17} class="text-primary" />
			<h3 class="font-bold text-sm text-foreground">Billing Receipts & Proof</h3>
		</div>

		<div class="divide-y divide-border/40 text-xs">
			{#each pastInvoices as inv}
				<div class="flex items-center justify-between py-3">
					<div>
						<div class="font-mono font-semibold text-foreground">{inv.id}</div>
						<div class="text-[11px] text-muted-foreground">{inv.period}</div>
					</div>
					<div class="flex items-center gap-4">
						<span class="font-bold text-foreground">{inv.amount}</span>
						<span class="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
							{inv.status}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

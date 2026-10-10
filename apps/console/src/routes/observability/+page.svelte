<script lang="ts">
	import {
		IconEye,
		IconSearch,
		IconDownload,
		IconPlayerPause,
		IconPlayerPlay,
		IconTrash,
		IconFilter,
		IconTerminal2
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type LogEntry = {
		id: string;
		time: string;
		level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
		service: string;
		traceId: string;
		message: string;
	};

	let levelFilter = $state<'ALL' | 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'>('ALL');
	let searchFilter = $state('');
	let autoScroll = $state(true);

	let logs = $state<LogEntry[]>([
		{
			id: 'lg-1',
			time: '13:56:12.441',
			level: 'INFO',
			service: 'api-gateway',
			traceId: 'trc_9941a8',
			message: 'HTTP 200 GET /v1/config/eval caller=client_sdk latency=0.8ms'
		},
		{
			id: 'lg-2',
			time: '13:56:10.120',
			level: 'DEBUG',
			service: 'id-auth',
			traceId: 'trc_9941a7',
			message: 'JWKS signature cache validated against ed25519 root authority'
		},
		{
			id: 'lg-3',
			time: '13:56:08.980',
			level: 'WARN',
			service: 'storage-s3',
			traceId: 'trc_9941a6',
			message: 'Rate limit approaching on bucket: public-uploads (82% threshold)'
		},
		{
			id: 'lg-4',
			time: '13:56:05.312',
			level: 'INFO',
			service: 'notifications',
			traceId: 'trc_9941a5',
			message: 'FCM push dispatched to topic: announcements count=4,200 status=success'
		},
		{
			id: 'lg-5',
			time: '13:56:01.890',
			level: 'ERROR',
			service: 'webhook-worker',
			traceId: 'trc_9941a4',
			message: 'Webhook retry 2/3 failed for endpoint https://api.partner.io/events (connection timed out)'
		},
		{
			id: 'lg-6',
			time: '13:55:58.102',
			level: 'INFO',
			service: 'id-auth',
			traceId: 'trc_9941a3',
			message: 'New user registered sub=usr_88f91 provider=github ip=203.0.113.19'
		}
	]);

	const filteredLogs = $derived(
		logs.filter((log) => {
			const matchesLevel = levelFilter === 'ALL' || log.level === levelFilter;
			const matchesSearch =
				searchFilter.trim() === '' ||
				log.message.toLowerCase().includes(searchFilter.toLowerCase()) ||
				log.service.toLowerCase().includes(searchFilter.toLowerCase()) ||
				log.traceId.toLowerCase().includes(searchFilter.toLowerCase());
			return matchesLevel && matchesSearch;
		})
	);

	const levelBadgeStyles: Record<string, string> = {
		INFO: 'bg-blue-500/15 text-blue-500 border-blue-500/25',
		WARN: 'bg-amber-500/15 text-amber-500 border-amber-500/25',
		ERROR: 'bg-destructive/15 text-destructive border-destructive/25',
		DEBUG: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25'
	};
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.obs_title()}</h1>
			<p class="text-xs text-muted-foreground mt-1">{m.obs_subtitle()}</p>
		</div>

		<div class="flex items-center gap-2">
			<button
				type="button"
				class="flex h-9 items-center gap-1.5 rounded-xl border border-border/60 bg-secondary/50 px-3 text-xs font-medium text-foreground hover:bg-accent"
			>
				<IconDownload size={14} />
				<span>{m.obs_download()}</span>
			</button>
		</div>
	</div>

	<!-- Controls & Filter Toolbar -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur-sm">
		<!-- Search -->
		<div class="relative flex-1">
			<IconSearch size={15} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<input
				type="text"
				bind:value={searchFilter}
				placeholder="Filter log output, service, or trace ID..."
				class="w-full rounded-xl border border-border/60 bg-secondary/40 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
			/>
		</div>

		<!-- Level Selector -->
		<div class="flex items-center gap-1 text-xs">
			{#each ['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'] as lvl}
				<button
					type="button"
					onclick={() => (levelFilter = lvl as any)}
					class="rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors {levelFilter === lvl
						? 'bg-primary text-primary-foreground'
						: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
				>
					{lvl}
				</button>
			{/each}
		</div>
	</div>

	<!-- Terminal Log Window -->
	<div class="rounded-2xl border border-border/60 bg-[#0b0f17] p-4 text-xs font-mono shadow-2xl overflow-hidden">
		<div class="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3 text-zinc-400">
			<div class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-red-500/80"></span>
				<span class="h-3 w-3 rounded-full bg-yellow-500/80"></span>
				<span class="h-3 w-3 rounded-full bg-green-500/80"></span>
				<span class="ml-2 text-[11px] text-zinc-400">live-event-stream.povixa.internal</span>
			</div>
			<div class="flex items-center gap-2 text-[11px]">
				<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
				<span class="text-emerald-400">Connected</span>
			</div>
		</div>

		<div class="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
			{#if filteredLogs.length === 0}
				<div class="py-12 text-center text-zinc-500 text-xs font-sans">
					No logs found matching current filters.
				</div>
			{:else}
				{#each filteredLogs as log (log.id)}
					<div class="flex flex-col gap-1 rounded p-1.5 transition-colors hover:bg-white/5 sm:flex-row sm:items-start sm:gap-3">
						<span class="shrink-0 text-zinc-500 text-[11px]">{log.time}</span>
						<span class="shrink-0 rounded border px-1.5 py-0.2 text-[9px] font-bold tracking-wider {levelBadgeStyles[log.level]}">
							{log.level}
						</span>
						<span class="shrink-0 text-cyan-400 font-semibold">{log.service}</span>
						<span class="shrink-0 text-zinc-500">[{log.traceId}]</span>
						<span class="flex-1 text-zinc-200 break-all">{log.message}</span>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

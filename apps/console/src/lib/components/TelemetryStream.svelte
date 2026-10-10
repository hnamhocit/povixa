<script lang="ts">
	import {
		IconPlayerPlay,
		IconPlayerPause,
		IconTrash,
		IconFilter,
		IconBolt,
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconDatabase,
		IconEye
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	type StreamEvent = {
		id: string;
		time: string;
		module: 'id' | 'config' | 'notify' | 'storage' | 'obs';
		name: string;
		details: string;
		latency: string;
		status: number;
	};

	let filter = $state<'all' | 'id' | 'config' | 'notify' | 'storage'>('all');
	let isPaused = $state(false);

	let events = $state<StreamEvent[]>([
		{
			id: 'ev-1',
			time: '13:54:48.102',
			module: 'id',
			name: 'user.session.verified',
			details: 'sub=usr_88f91 token_family=jwt_es256',
			latency: '1.2ms',
			status: 200
		},
		{
			id: 'ev-2',
			time: '13:54:47.890',
			module: 'config',
			name: 'flag.eval: dark_mode_v2',
			details: 'result=true target=production rollout=100%',
			latency: '0.6ms',
			status: 200
		},
		{
			id: 'ev-3',
			time: '13:54:46.320',
			module: 'notify',
			name: 'push.dispatched: marketing_blast',
			details: 'provider=apns tokens=1,240 ack=1,238',
			latency: '14.8ms',
			status: 201
		},
		{
			id: 'ev-4',
			time: '13:54:45.012',
			module: 'storage',
			name: 's3.get_object: /assets/hero_v2.webp',
			details: 'bucket=prod-public cdn_cached=true 342kb',
			latency: '3.4ms',
			status: 200
		},
		{
			id: 'ev-5',
			time: '13:54:44.750',
			module: 'id',
			name: 'auth.oauth.callback: github',
			details: 'login=hnamhocit org=povixa verified=true',
			latency: '8.1ms',
			status: 200
		},
		{
			id: 'ev-6',
			time: '13:54:43.118',
			module: 'obs',
			name: 'trace.span: GET /api/v1/metrics',
			details: 'trace_id=trc_9941 p95=12ms memory=42mb',
			latency: '11.8ms',
			status: 200
		}
	]);

	const filteredEvents = $derived(
		filter === 'all' ? events : events.filter((e) => e.module === filter)
	);

	function clearStream() {
		events = [];
	}

	const moduleStyles: Record<string, { label: string; color: string; bg: string }> = {
		id: { label: 'ID', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/30' },
		config: { label: 'CONFIG', color: 'text-violet-500', bg: 'bg-violet-500/10 border-violet-500/30' },
		notify: { label: 'PUSH', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/30' },
		storage: { label: 'S3', color: 'text-cyan-500', bg: 'bg-cyan-500/10 border-cyan-500/30' },
		obs: { label: 'OBS', color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/30' }
	};
</script>

<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-4">
		<div>
			<div class="flex items-center gap-2">
				<h2 class="text-base font-bold tracking-tight text-foreground">{m.section_stream_title()}</h2>
				<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-500 uppercase">
					<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
					{m.stream_live()}
				</span>
			</div>
			<p class="mt-0.5 text-xs text-muted-foreground">{m.section_stream_desc()}</p>
		</div>

		<!-- Action Controls -->
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => (isPaused = !isPaused)}
				class="flex h-8 items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/50 px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
			>
				{#if isPaused}
					<IconPlayerPlay size={14} class="text-emerald-500" />
					<span>Resume</span>
				{:else}
					<IconPlayerPause size={14} class="text-amber-500" />
					<span>Pause</span>
				{/if}
			</button>

			<button
				type="button"
				onclick={clearStream}
				class="flex h-8 items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/50 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
				title="Clear Stream"
			>
				<IconTrash size={14} />
				<span class="hidden sm:inline">{m.stream_clear()}</span>
			</button>
		</div>
	</div>

	<!-- Module Category Filter Tabs -->
	<div class="flex flex-wrap gap-1.5 py-3 border-b border-border/40 text-xs">
		<button
			type="button"
			onclick={() => (filter = 'all')}
			class="rounded-lg px-2.5 py-1 font-medium transition-colors {filter === 'all'
				? 'bg-primary text-primary-foreground font-semibold'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			{m.stream_filter_all()}
		</button>
		<button
			type="button"
			onclick={() => (filter = 'id')}
			class="rounded-lg px-2.5 py-1 font-medium transition-colors {filter === 'id'
				? 'bg-primary text-primary-foreground font-semibold'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			{m.stream_filter_id()}
		</button>
		<button
			type="button"
			onclick={() => (filter = 'config')}
			class="rounded-lg px-2.5 py-1 font-medium transition-colors {filter === 'config'
				? 'bg-primary text-primary-foreground font-semibold'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			{m.stream_filter_config()}
		</button>
		<button
			type="button"
			onclick={() => (filter = 'notify')}
			class="rounded-lg px-2.5 py-1 font-medium transition-colors {filter === 'notify'
				? 'bg-primary text-primary-foreground font-semibold'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			{m.stream_filter_notify()}
		</button>
		<button
			type="button"
			onclick={() => (filter = 'storage')}
			class="rounded-lg px-2.5 py-1 font-medium transition-colors {filter === 'storage'
				? 'bg-primary text-primary-foreground font-semibold'
				: 'text-muted-foreground hover:bg-secondary hover:text-foreground'}"
		>
			{m.stream_filter_storage()}
		</button>
	</div>

	<!-- Stream List -->
	<div class="mt-3 space-y-2 font-mono text-xs max-h-96 overflow-y-auto">
		{#if filteredEvents.length === 0}
			<div class="py-8 text-center text-muted-foreground text-xs font-sans">
				No events match the selected category filter.
			</div>
		{:else}
			{#each filteredEvents as item (item.id)}
				{@const st = moduleStyles[item.module] || moduleStyles.obs}
				<div
					class="flex flex-col gap-2 rounded-xl border border-border/40 bg-secondary/30 p-2.5 transition-all hover:bg-secondary/60 hover:border-border sm:flex-row sm:items-center sm:justify-between"
				>
					<div class="flex items-center gap-2.5 min-w-0">
						<span class="shrink-0 text-[11px] text-muted-foreground">{item.time}</span>
						<span class="shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold tracking-wider {st.bg} {st.color}">
							{st.label}
						</span>
						<span class="truncate font-semibold text-foreground">{item.name}</span>
						<span class="hidden md:inline truncate text-[11px] text-muted-foreground font-sans">
							{item.details}
						</span>
					</div>

					<div class="flex items-center gap-3 shrink-0 self-end sm:self-auto text-[11px]">
						<span class="text-muted-foreground">{item.latency}</span>
						<span class="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-500">
							{item.status}
						</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<script lang="ts">
	import CockpitStats from '#lib/components/CockpitStats.svelte';
	import ModulesGrid from '#lib/components/ModulesGrid.svelte';
	import TelemetryStream from '#lib/components/TelemetryStream.svelte';
	import SdkQuickstart from '#lib/components/SdkQuickstart.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import {
		IconBolt,
		IconKey,
		IconTerminal2,
		IconExternalLink,
		IconShieldCheck,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
</script>

<div class="space-y-10 lg:space-y-12">
	<!-- Spacious Cockpit Header -->
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border/50 pb-8">
		<div class="space-y-2 max-w-3xl">
			<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
				<IconBolt size={14} class="animate-bounce" />
				<span>Povixa Platform Cockpit v2.4</span>
			</div>
			<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-sans">
				{m.cockpit_title()}
			</h1>
			<p class="text-sm text-muted-foreground leading-relaxed">
				{m.cockpit_subtitle()}
			</p>
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-wrap items-center gap-3 shrink-0">
			<a
				href="/api-keys"
				class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02]"
			>
				<IconKey size={15} stroke={2.5} />
				<span>{m.btn_new_api_key()}</span>
			</a>
			<a
				href="/observability"
				class="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-4 py-2.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:border-border"
			>
				<IconTerminal2 size={15} />
				<span>{m.btn_view_logs()}</span>
			</a>
		</div>
	</div>

	<!-- Key Performance & Platform Metrics -->
	<CockpitStats />

	<!-- Core Platform Modules Grid (9 Modules) -->
	<div class="space-y-6 pt-2">
		<ModulesGrid />
	</div>

	<!-- Live Telemetry Stream & SDK Quickstart -->
	<div class="grid grid-cols-1 gap-8 xl:grid-cols-2 pt-4 border-t border-border/50">
		<TelemetryStream />
		<SdkQuickstart />
	</div>
</div>

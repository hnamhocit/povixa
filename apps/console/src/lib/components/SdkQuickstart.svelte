<script lang="ts">
	import { IconCopy, IconCheck, IconCode, IconTerminal2 } from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let activeTab = $state<'ts' | 'go' | 'py' | 'curl'>('ts');
	let copied = $state(false);

	const snippets: Record<string, string> = {
		ts: `import { createPovixaClient } from '@povixa/sdk';

// 1. Initialize client with typed config
const povixa = createPovixaClient({
  endpoint: 'https://api.povixa.cloud',
  apiKey: 'pvx_live_99d14f828a1c64e09f',
});

// 2. Evaluate remote flag with fallback
const isAiAgentEnabled = await povixa.config.getBool('ai_agent_enabled', false);

// 3. Dispatch realtime push notification
await povixa.notify.send({
  to: 'usr_88f91',
  title: 'Payment Confirmed',
  body: 'Your subscription is now active.',
});`,
		go: `package main

import (
    "context"
    "fmt"
    "github.com/povixa/povixa-go"
)

func main() {
    client := povixa.NewClient(&povixa.Config{
        Endpoint: "https://api.povixa.cloud",
        APIKey:   "pvx_live_99d14f828a1c64e09f",
    })

    // Evaluate remote config flag
    enabled, _ := client.Config.GetBool(context.Background(), "ai_agent_enabled", false)
    fmt.Printf("Flag status: %v\\n", enabled)
}`,
		py: `from povixa import PovixaClient

# Initialize unified SDK client
client = PovixaClient(
    endpoint="https://api.povixa.cloud",
    api_key="pvx_live_99d14f828a1c64e09f"
)

# Fetch dynamic configuration
flag_val = client.config.get_bool("ai_agent_enabled", default=False)
print(f"Feature Enabled: {flag_val}")`,
		curl: `curl -X POST https://api.povixa.cloud/v1/config/eval \\
  -H "Authorization: Bearer pvx_live_99d14f828a1c64e09f" \\
  -H "Content-Type: application/json" \\
  -d '{"key": "ai_agent_enabled", "context": {"env": "production"}}'`
	};

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(snippets[activeTab]);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (e) {
			console.error('Failed to copy', e);
		}
	}
</script>

<div class="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-4">
		<div>
			<h2 class="text-base font-bold tracking-tight text-foreground">{m.section_sdk_title()}</h2>
			<p class="mt-0.5 text-xs text-muted-foreground">{m.section_sdk_desc()}</p>
		</div>

		<!-- Language Tabs & Copy Button -->
		<div class="flex items-center gap-2">
			<div class="flex rounded-lg border border-border/60 bg-secondary/40 p-0.5 text-xs">
				<button
					type="button"
					onclick={() => (activeTab = 'ts')}
					class="rounded-md px-2.5 py-1 font-medium transition-colors {activeTab === 'ts'
						? 'bg-primary text-primary-foreground font-semibold'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.sdk_tab_ts()}
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'go')}
					class="rounded-md px-2.5 py-1 font-medium transition-colors {activeTab === 'go'
						? 'bg-primary text-primary-foreground font-semibold'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.sdk_tab_go()}
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'py')}
					class="rounded-md px-2.5 py-1 font-medium transition-colors {activeTab === 'py'
						? 'bg-primary text-primary-foreground font-semibold'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.sdk_tab_python()}
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'curl')}
					class="rounded-md px-2.5 py-1 font-medium transition-colors {activeTab === 'curl'
						? 'bg-primary text-primary-foreground font-semibold'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{m.sdk_tab_curl()}
				</button>
			</div>

			<button
				type="button"
				onclick={copyCode}
				class="flex h-8 items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/50 px-3 text-xs font-medium text-foreground transition-all hover:bg-accent hover:border-border"
			>
				{#if copied}
					<IconCheck size={14} class="text-emerald-500" stroke={2.5} />
					<span class="text-emerald-500 font-semibold">{m.sdk_copied()}</span>
				{:else}
					<IconCopy size={14} class="text-muted-foreground" />
					<span>{m.sdk_copy()}</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- Code Display -->
	<div class="mt-4 overflow-x-auto rounded-xl border border-border/50 bg-[#0d1117] p-4 text-xs font-mono text-zinc-100">
		<pre class="leading-relaxed whitespace-pre font-mono"><code>{snippets[activeTab]}</code></pre>
	</div>
</div>

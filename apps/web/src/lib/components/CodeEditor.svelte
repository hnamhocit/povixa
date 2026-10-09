<script lang="ts">
	import {
		IconCopy,
		IconCheck,
		IconTerminal2,
		IconBrandTypescript,
		IconBrandPython,
		IconBrandGolang,
		IconGitBranch,
		IconCpu
	} from '@tabler/icons-svelte-runes';

	let {
		lang = $bindable<'ts' | 'go' | 'py' | 'curl'>('ts')
	}: {
		lang: 'ts' | 'go' | 'py' | 'curl';
	} = $props();

	let copied = $state(false);

	const rawSnippets: Record<'ts' | 'go' | 'py' | 'curl', string> = {
		ts: `import { povixa } from '@povixa/sdk';

// 1. Initialize all infrastructure with a single typed client
const app = povixa({ appId: 'pvx_live_9482' });

// 2. Auth, Config, Messaging, Analytics - unified & typed
const user = await app.auth.getUser(session);
const flag = await app.config.get('ai_v2_model', { default: 'fast' });

await app.notify.send({ to: user.email, template: 'welcome' });
await app.analytics.track('onboarding.complete', { userId: user.id });`,

		go: `package main

import (
	"context"
	"github.com/povixa/povixa-go"
)

func main() {
	ctx := context.Background()
	client := povixa.New("pvx_live_9482")

	// Typed auth, config & messaging in one go
	user, _ := client.Auth.GetUser(ctx, sessionToken)
	flag, _ := client.Config.GetBool(ctx, "ai_v2_model", false)
	_ = client.Notify.Send(ctx, user.Email, "welcome")
}`,

		py: `from povixa import Povixa

# Unified app client - zero vendor glue code
client = Povixa(app_id="pvx_live_9482")

user = client.auth.get_user(session_token)
flag = client.config.get("ai_v2_model", default="fast")

client.notify.send(to=user.email, template="welcome")
client.analytics.track("onboarding.complete", user_id=user.id)`,

		curl: `# Verify session & fetch tenant configuration in 1 edge roundtrip
curl -X POST https://api.povixa.cloud/v1/auth/introspect \\
  -H "Authorization: Bearer pvx_sec_9918" \\
  -H "Content-Type: application/json" \\
  -d '{"sessionToken": "sess_893fa021", "fetchFlags": true}'`
	};

	const filesMeta: Record<'ts' | 'go' | 'py' | 'curl', { file: string; lines: number }> = {
		ts: {
			file: 'app.ts',
			lines: 10
		},
		go: {
			file: 'main.go',
			lines: 16
		},
		py: {
			file: 'client.py',
			lines: 10
		},
		curl: {
			file: 'terminal.sh',
			lines: 5
		}
	};

	function copyCode() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(rawSnippets[lang]);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		}
	}
</script>

<div
	class="overflow-hidden rounded-xl border border-white/10 bg-[#0a0d14] text-zinc-100 shadow-2xl transition-all"
>
	<!-- Code Editor Top Bar -->
	<div
		class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0e131f]/90 px-4 py-2.5 backdrop-blur-sm"
	>
		<!-- Left: File Tabs -->
		<div class="flex items-center gap-1.5">
			{#each [{ id: 'ts', label: 'app.ts', icon: IconBrandTypescript, color: 'text-sky-400' }, { id: 'go', label: 'main.go', icon: IconBrandGolang, color: 'text-cyan-400' }, { id: 'py', label: 'client.py', icon: IconBrandPython, color: 'text-amber-400' }, { id: 'curl', label: 'curl.sh', icon: IconTerminal2, color: 'text-emerald-400' }] as tab (tab.id)}
				<button
					type="button"
					onclick={() => (lang = tab.id as 'ts' | 'go' | 'py' | 'curl')}
					class="group flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-all {lang ===
					tab.id
						? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
						: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}"
				>
					<tab.icon size={14} class={tab.color} stroke={2} />
					<span>{tab.label}</span>
				</button>
			{/each}
		</div>

		<!-- Right: Actions -->
		<div class="flex items-center gap-2">
			<span class="hidden font-mono text-[11px] text-zinc-500 sm:inline">
				{filesMeta[lang].lines} lines • UTF-8
			</span>

			<button
				type="button"
				onclick={copyCode}
				class="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
				title="Copy snippet"
			>
				{#if copied}
					<IconCheck size={13} class="text-emerald-400" stroke={2.5} />
					<span class="text-emerald-400">Copied</span>
				{:else}
					<IconCopy size={13} stroke={2} />
					<span>Copy</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- Code Editor Content Area -->
	<div class="relative overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5">
		<div class="flex">
			<!-- Line numbers gutter -->
			<div
				class="mr-4 flex flex-col text-right font-mono text-zinc-600 select-none"
				aria-hidden="true"
			>
				{#if lang === 'ts'}
					<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span
						>7</span
					><span>8</span><span>9</span><span>10</span>
				{:else if lang === 'go'}
					<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span
						>7</span
					><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span
					><span>14</span><span>15</span><span>16</span>
				{:else if lang === 'py'}
					<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span
						>7</span
					><span>8</span><span>9</span><span>10</span>
				{:else if lang === 'curl'}
					<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
				{/if}
			</div>

			<!-- Syntax highlighted lines -->
			<div class="flex-1 whitespace-pre">
				{#if lang === 'ts'}
					<div>
						<span class="font-semibold text-purple-400">import</span>
						&#123; <span class="text-sky-300">povixa</span> &#125;
						<span class="font-semibold text-purple-400">from</span>
						<span class="text-emerald-300">'@povixa/sdk'</span>;
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div class="text-zinc-500 italic">
						// 1. Initialize all infrastructure with a single typed client
					</div>
					<div>
						<span class="font-semibold text-purple-400">const</span>
						<span class="text-amber-200">app</span> =
						<span class="text-sky-300">povixa</span>(&#123;
						<span class="text-sky-200">appId</span>:
						<span class="text-emerald-300">'pvx_live_9482'</span> &#125;);
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div class="text-zinc-500 italic">
						// 2. Auth, Config, Messaging, Analytics - unified & typed
					</div>
					<div>
						<span class="font-semibold text-purple-400">const</span>
						<span class="text-amber-200">user</span> =
						<span class="font-semibold text-purple-400">await</span>
						<span class="text-amber-200">app</span>.<span class="text-sky-300">auth</span>.<span
							class="text-blue-300">getUser</span
						>(<span class="text-amber-200">session</span>);
					</div>
					<div>
						<span class="font-semibold text-purple-400">const</span>
						<span class="text-amber-200">flag</span> =
						<span class="font-semibold text-purple-400">await</span>
						<span class="text-amber-200">app</span>.<span class="text-sky-300">config</span>.<span
							class="text-blue-300">get</span
						>(<span class="text-emerald-300">'ai_v2_model'</span>, &#123;
						<span class="text-sky-200">default</span>:
						<span class="text-emerald-300">'fast'</span> &#125;);
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div>
						<span class="font-semibold text-purple-400">await</span>
						<span class="text-amber-200">app</span>.<span class="text-sky-300">notify</span>.<span
							class="text-blue-300">send</span
						>(&#123; <span class="text-sky-200">to</span>:
						<span class="text-amber-200">user</span>.<span class="text-sky-200">email</span>,
						<span class="text-sky-200">template</span>:
						<span class="text-emerald-300">'welcome'</span> &#125;);
					</div>
					<div>
						<span class="font-semibold text-purple-400">await</span>
						<span class="text-amber-200">app</span>.<span class="text-sky-300">analytics</span
						>.<span class="text-blue-300">track</span>(<span class="text-emerald-300"
							>'onboarding.complete'</span
						>, &#123;
						<span class="text-sky-200">userId</span>: <span class="text-amber-200">user</span>.<span
							class="text-sky-200">id</span
						> &#125;);
					</div>
				{:else if lang === 'go'}
					<div>
						<span class="font-semibold text-purple-400">package</span>
						<span class="text-sky-200">main</span>
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div>
						<span class="font-semibold text-purple-400">import</span> (
					</div>
					<div class="pl-4">
						<span class="text-emerald-300">"context"</span>
					</div>
					<div class="pl-4">
						<span class="text-emerald-300">"github.com/povixa/povixa-go"</span>
					</div>
					<div>)</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div>
						<span class="font-semibold text-purple-400">func</span>
						<span class="text-blue-300">main</span>() &#123;
					</div>
					<div class="pl-4">
						<span class="text-amber-200">ctx</span> :=
						<span class="text-sky-200">context</span>.<span class="text-blue-300">Background</span
						>()
					</div>
					<div class="pl-4">
						<span class="text-amber-200">client</span> :=
						<span class="text-sky-200">povixa</span>.<span class="text-blue-300">New</span>(<span
							class="text-emerald-300">"pvx_live_9482"</span
						>)
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div class="pl-4 text-zinc-500 italic">
						// Typed auth, config &amp; messaging in one go
					</div>
					<div class="pl-4">
						<span class="text-amber-200">user</span>, <span class="text-zinc-500">_</span> :=
						<span class="text-amber-200">client</span>.<span class="text-sky-200">Auth</span>.<span
							class="text-blue-300">GetUser</span
						>(<span class="text-amber-200">ctx</span>,
						<span class="text-amber-200">sessionToken</span>)
					</div>
					<div class="pl-4">
						<span class="text-amber-200">flag</span>, <span class="text-zinc-500">_</span> :=
						<span class="text-amber-200">client</span>.<span class="text-sky-200">Config</span
						>.<span class="text-blue-300">GetBool</span>(<span class="text-amber-200">ctx</span>,
						<span class="text-emerald-300">"ai_v2_model"</span>,
						<span class="font-semibold text-purple-400">false</span>)
					</div>
					<div class="pl-4">
						<span class="text-zinc-500">_</span> = <span class="text-amber-200">client</span>.<span
							class="text-sky-200">Notify</span
						>.<span class="text-blue-300">Send</span>(<span class="text-amber-200">ctx</span>,
						<span class="text-amber-200">user</span>.<span class="text-sky-200">Email</span>,
						<span class="text-emerald-300">"welcome"</span>)
					</div>
					<div>&#125;</div>
				{:else if lang === 'py'}
					<div>
						<span class="font-semibold text-purple-400">from</span>
						<span class="text-sky-200">povixa</span>
						<span class="font-semibold text-purple-400">import</span>
						<span class="text-sky-300">Povixa</span>
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div class="text-zinc-500 italic"># Unified app client - zero vendor glue code</div>
					<div>
						<span class="text-amber-200">client</span> =
						<span class="text-sky-300">Povixa</span>(<span class="text-sky-200">app_id</span>=<span
							class="text-emerald-300">"pvx_live_9482"</span
						>)
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div>
						<span class="text-amber-200">user</span> =
						<span class="text-amber-200">client</span>.<span class="text-sky-300">auth</span>.<span
							class="text-blue-300">get_user</span
						>(<span class="text-amber-200">session_token</span>)
					</div>
					<div>
						<span class="text-amber-200">flag</span> =
						<span class="text-amber-200">client</span>.<span class="text-sky-300">config</span
						>.<span class="text-blue-300">get</span>(<span class="text-emerald-300"
							>"ai_v2_model"</span
						>, <span class="text-sky-200">default</span>=<span class="text-emerald-300">"fast"</span
						>)
					</div>
					<div class="text-zinc-600 select-none">&nbsp;</div>
					<div>
						<span class="text-amber-200">client</span>.<span class="text-sky-300">notify</span
						>.<span class="text-blue-300">send</span>(<span class="text-sky-200">to</span>=<span
							class="text-amber-200">user</span
						>.<span class="text-sky-200">email</span>,
						<span class="text-sky-200">template</span>=<span class="text-emerald-300"
							>"welcome"</span
						>)
					</div>
					<div>
						<span class="text-amber-200">client</span>.<span class="text-sky-300">analytics</span
						>.<span class="text-blue-300">track</span>(<span class="text-emerald-300"
							>"onboarding.complete"</span
						>, <span class="text-sky-200">user_id</span>=<span class="text-amber-200">user</span
						>.<span class="text-sky-200">id</span>)
					</div>
				{:else if lang === 'curl'}
					<div class="text-zinc-500 italic">
						# Verify session &amp; fetch tenant configuration in 1 edge roundtrip
					</div>
					<div>
						<span class="font-semibold text-purple-400">curl</span>
						<span class="text-amber-300">-X</span>
						<span class="text-blue-300">POST</span>
						<span class="text-emerald-300">https://api.povixa.cloud/v1/auth/introspect</span>
						<span class="text-zinc-500">\</span>
					</div>
					<div class="pl-4">
						<span class="text-amber-300">-H</span>
						<span class="text-emerald-300">"Authorization: Bearer pvx_sec_9918"</span>
						<span class="text-zinc-500">\</span>
					</div>
					<div class="pl-4">
						<span class="text-amber-300">-H</span>
						<span class="text-emerald-300">"Content-Type: application/json"</span>
						<span class="text-zinc-500">\</span>
					</div>
					<div class="pl-4">
						<span class="text-amber-300">-d</span>
						<span class="text-emerald-300"
							>'&#123;"sessionToken": "sess_893fa021", "fetchFlags": true&#125;'</span
						>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Code Editor Bottom Status Bar -->
	<div
		class="flex items-center justify-between border-t border-white/10 bg-[#080b11] px-4 py-1.5 font-mono text-[10px] text-zinc-500"
	>
		<div class="flex items-center gap-3">
			<span class="flex items-center gap-1 text-zinc-400">
				<IconGitBranch size={12} stroke={2} />
				main
			</span>
			<span class="flex items-center gap-1 text-emerald-400">
				<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
				SDK Connected
			</span>
		</div>
		<div class="flex items-center gap-3">
			<span class="flex items-center gap-1 text-zinc-400">
				<IconCpu size={12} stroke={2} />
				Edge Latency: 11.4ms
			</span>
			<span>{filesMeta[lang].file}</span>
		</div>
	</div>
</div>

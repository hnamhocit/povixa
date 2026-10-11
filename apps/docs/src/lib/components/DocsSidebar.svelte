<script lang="ts">
	import {
		IconFingerprint,
		IconAdjustments,
		IconBell,
		IconChartHistogram,
		IconDatabase,
		IconFileText,
		IconMessageCircle,
		IconEye,
		IconCode,
		IconTerminal2,
		IconSparkles,
		IconBrandDocker,
		IconShieldCheck,
		IconX,
		IconCpu
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let {
		activeSection = $bindable('quickstart'),
		mobileOpen = $bindable(false)
	}: {
		activeSection?: string;
		mobileOpen?: boolean;
	} = $props();

	const sections = $derived([
		{
			title: m.cat_getting_started(),
			items: [
				{ id: 'overview', title: m.topic_overview(), badge: 'v0.9.4' },
				{ id: 'quickstart', title: m.topic_quickstart(), badge: m.badge_new() },
				{ id: 'docker', title: m.topic_docker(), badge: m.badge_sovereign() },
				{ id: 'env-config', title: m.topic_env_config(), badge: null }
			]
		},
		{
			title: m.cat_modules(),
			items: [
				{ id: 'mod-id', title: m.topic_id(), icon: IconFingerprint, badge: 'Auth' },
				{ id: 'mod-config', title: m.topic_config(), icon: IconAdjustments, badge: '<2ms' },
				{ id: 'mod-storage', title: m.topic_storage(), icon: IconDatabase, badge: 'S3 API' },
				{ id: 'mod-notify', title: m.topic_notify(), icon: IconBell, badge: 'FCM/SES' },
				{ id: 'mod-analytics', title: m.topic_analytics(), icon: IconChartHistogram, badge: 'ClickHouse' },
				{ id: 'mod-billing', title: m.topic_billing(), icon: IconCpu, badge: 'Stripe' },
				{ id: 'mod-support', title: m.topic_support(), icon: IconMessageCircle, badge: 'Helpdesk' },
				{ id: 'mod-legal', title: m.topic_legal(), icon: IconFileText, badge: 'GDPR' },
				{ id: 'mod-observability', title: m.topic_observability(), icon: IconEye, badge: 'OTel' }
			]
		},
		{
			title: m.cat_sdks(),
			items: [
				{ id: 'sdk-ts', title: 'TypeScript / Node.js', badge: m.badge_official() },
				{ id: 'sdk-go', title: 'Go (Golang)', badge: m.badge_official() },
				{ id: 'sdk-py', title: 'Python Client', badge: m.badge_official() },
				{ id: 'sdk-flutter', title: 'Flutter & Dart', badge: m.badge_official() },
				{ id: 'sdk-rust', title: 'Rust SDK', badge: m.badge_community() }
			]
		},
		{
			title: m.cat_tools(),
			items: [
				{ id: 'tool-cli', title: m.topic_cli(), badge: 'CLI' },
				{ id: 'api-openapi', title: m.topic_openapi(), badge: 'REST' },
				{ id: 'security-model', title: m.topic_security(), badge: 'ed25519' }
			]
		}
	]);

	function selectItem(id: string) {
		activeSection = id;
		mobileOpen = false;
	}
</script>

<!-- Desktop Sidebar with distinct solid white / card background and hidden scrollbars -->
<aside
	class="hidden lg:block w-72 shrink-0 border-r border-border bg-white dark:bg-card p-6 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-h-[calc(100vh-4rem)] sticky top-16 shadow-xs"
>
	<div class="mb-4 flex items-center justify-between pb-2 border-b border-border/80">
		<span class="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{m.nav_docs_title()}</span>
		<span class="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{m.nav_topics_count()}</span>
	</div>

	<nav class="space-y-6">
		{#each sections as sec (sec.title)}
			<div>
				<div class="mb-2 px-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
					{sec.title}
				</div>
				<div class="space-y-1">
					{#each sec.items as item (item.id)}
						<button
							type="button"
							onclick={() => selectItem(item.id)}
							class="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors {activeSection === item.id ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}"
						>
							<span class="truncate">{item.title}</span>
							{#if item.badge}
								<span class="ml-2 shrink-0 rounded border border-border/70 bg-background/80 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
									{item.badge}
								</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</nav>

	<!-- Sidebar Help Box -->
	<div class="mt-8 rounded-xl border border-border bg-background p-3.5 text-xs shadow-2xs">
		<p class="font-semibold text-foreground">Discord Community 24/7</p>
		<p class="mt-1 text-[11px] text-muted-foreground leading-relaxed">
			Tham gia cộng đồng kỹ sư Povixa hoặc gửi issue kỹ thuật trên GitHub.
		</p>
		<a
			href="https://discord.gg/povixa"
			target="_blank"
			rel="noreferrer"
			class="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs transition-colors"
		>
			<span>Cộng đồng Discord</span>
		</a>
	</div>
</aside>

<!-- Mobile Drawer -->
{#if mobileOpen}
	<div class="fixed inset-0 z-50 lg:hidden">
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-background/80 backdrop-blur-sm"
			onclick={() => (mobileOpen = false)}
			role="presentation"
		></div>

		<!-- Drawer Content with solid background and hidden scrollbars -->
		<div class="fixed inset-y-0 left-0 w-80 bg-white dark:bg-card border-r border-border p-6 shadow-xl overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<div class="flex items-center justify-between pb-4 border-b border-border/80">
				<span class="font-bold text-foreground text-sm">{m.nav_docs_title()}</span>
				<button
					type="button"
					onclick={() => (mobileOpen = false)}
					class="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
				>
					<IconX size={18} />
				</button>
			</div>

			<nav class="mt-4 space-y-6">
				{#each sections as sec (sec.title)}
					<div>
						<div class="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
							{sec.title}
						</div>
						<div class="space-y-1">
							{#each sec.items as item (item.id)}
								<button
									type="button"
									onclick={() => selectItem(item.id)}
									class="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors {activeSection === item.id ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}"
								>
									<span class="truncate">{item.title}</span>
									{#if item.badge}
										<span class="ml-2 shrink-0 rounded border border-border/70 bg-background/80 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
											{item.badge}
										</span>
									{/if}
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</nav>
		</div>
	</div>
{/if}

<script lang="ts">
	import {
		IconBook,
		IconTerminal2,
		IconCode,
		IconCpu,
		IconArrowRight,
		IconCopy,
		IconCheck,
		IconShieldCheck,
		IconServer,
		IconBrandDocker,
		IconSparkles
	} from '@tabler/icons-svelte-runes';
	import DocsSidebar from '#lib/components/DocsSidebar.svelte';
	import * as m from '#lib/paraglide/messages.js';

	// Sidebar active state
	let activeSection = $state('quickstart');
	let mobileSidebarOpen = $state(false);

	// Package managers
	const packageManagers = [
		{ id: 'bun', label: 'Bun', cmd: 'bun add @povixa/sdk' },
		{ id: 'pnpm', label: 'pnpm', cmd: 'pnpm add @povixa/sdk' },
		{ id: 'npm', label: 'npm', cmd: 'npm install @povixa/sdk' },
		{ id: 'go', label: 'Go', cmd: 'go get github.com/povixa/povixa-go' },
		{ id: 'python', label: 'Python', cmd: 'pip install povixa-sdk' },
		{ id: 'flutter', label: 'Flutter', cmd: 'flutter pub add povixa_flutter' }
	];
	let activePkg = $state('bun');
	let copiedPkg = $state(false);

	function copyInstallCmd() {
		const target = packageManagers.find((p) => p.id === activePkg);
		if (target) {
			navigator.clipboard.writeText(target.cmd);
			copiedPkg = true;
			setTimeout(() => (copiedPkg = false), 2000);
		}
	}

	// Polyglot SDK tabs
	const sdkTabs = [
		{ id: 'typescript', label: 'TypeScript', ext: '.ts' },
		{ id: 'go', label: 'Go', ext: '.go' },
		{ id: 'python', label: 'Python', ext: '.py' },
		{ id: 'flutter', label: 'Flutter / Dart', ext: '.dart' },
		{ id: 'curl', label: 'Shell cURL', ext: '.sh' }
	];
	let activeSdk = $state('typescript');
	let copiedSdk = $state(false);

	const sdkSnippets: Record<string, string> = {
		typescript: `import { PovixaClient } from '@povixa/sdk';

// 1. Initialize client (auto-detects local docker or Povixa Cloud)
export const povixa = new PovixaClient({
  endpoint: process.env.POVIXA_ENDPOINT ?? 'http://localhost:8080',
  apiKey: process.env.POVIXA_API_KEY!
});

// 2. Auth & Session verification (sub-millisecond ed25519 validation)
const { user, session } = await povixa.auth.verifySession(authToken);

// 3. Realtime Feature Flag evaluation (<2ms edge cache hit)
const isNextEngine = await povixa.config.getBool('features.next_pipeline', {
  userId: user.id,
  tenantId: user.organizationId,
  fallback: false
});

// 4. S3 Object Storage with automatic presigned direct upload URL
const presigned = await povixa.storage.createPresignedUpload({
  bucket: 'datasets',
  key: \`users/\${user.id}/export-model.parquet\`,
  expiresInSeconds: 900
});`,
		go: `package main

import (
	"context"
	"fmt"
	"github.com/povixa/povixa-go"
)

func main() {
	ctx := context.Background()

	// 1. Initialize client
	client, err := povixa.NewClient(povixa.Config{
		Endpoint: "http://localhost:8080",
		APIKey:   "pvx_sec_991823abf1092",
	})
	if err != nil {
		panic(err)
	}

	// 2. Evaluate feature flag with targeting context
	enabled, err := client.Config.GetBool(ctx, "features.next_pipeline", povixa.EvalContext{
		UserID:   "usr_9410",
		TenantID: "org_alpha",
	})

	// 3. Ingest telemetry record directly into ClickHouse
	_ = client.Analytics.Track(ctx, povixa.Event{
		Name:     "model_inference_invoked",
		EntityID: "usr_9410",
		Data:     map[string]any{"latency_ms": 14.2, "status": "ok"},
	})
}`,
		python: `import os
from povixa import PovixaClient

# 1. Initialize unified client
client = PovixaClient(
    endpoint=os.getenv("POVIXA_ENDPOINT", "http://localhost:8080"),
    api_key=os.getenv("POVIXA_API_KEY")
)

# 2. Verify incoming user session token
session = client.auth.verify_session(token)
print(f"User {session.user_id} authenticated with roles: {session.roles}")

# 3. Query dynamic config with fallback
is_enabled = client.config.get_bool(
    "features.next_pipeline",
    entity_id=session.user_id,
    fallback=False
)

# 4. Create customer support ticket with error context
ticket = client.support.create_ticket(
    user_id=session.user_id,
    subject="Query memory boundary warning",
    severity="warning"
)`,
		flutter: `import 'package:povixa_flutter/povixa.dart';

final povixa = PovixaClient(
  endpoint: 'https://api.povixa.cloud',
  publishableKey: 'pvx_pub_840192',
);

// 1. Native WebAuthn / Passkey Biometric Login
final authResult = await povixa.auth.signInWithPasskey();

// 2. Real-time dynamic config listener
povixa.config.watchBool('theme.dark_neon').listen((isEnabled) {
  applyAppTheme(isEnabled);
});

// 3. Register native push notification token
await povixa.notifications.registerDevice(
  token: fcmToken,
  channels: ['announcements', 'security_alerts'],
);`,
		curl: `# 1. Health check local Docker engine
curl -s http://localhost:8080/v1/health | jq .

# 2. Evaluate feature flag with real-time targeting
curl -s -X POST http://localhost:8080/v1/config/evaluate \\
  -H "Authorization: Bearer pvx_sec_991823abf1092" \\
  -H "Content-Type: application/json" \\
  -d '{
    "flag_key": "features.next_pipeline",
    "entity_id": "usr_9410",
    "attributes": { "tier": "enterprise", "region": "ap-southeast-1" }
  }'

# 3. Create S3 presigned upload voucher
curl -s -X POST http://localhost:8080/v1/storage/presign \\
  -H "Authorization: Bearer pvx_sec_991823abf1092" \\
  -H "Content-Type: application/json" \\
  -d '{"bucket": "datasets", "key": "benchmark.json", "op": "PUT"}'`
	};

	function copySdkCode() {
		const code = sdkSnippets[activeSdk];
		if (code) {
			navigator.clipboard.writeText(code);
			copiedSdk = true;
			setTimeout(() => (copiedSdk = false), 2000);
		}
	}

	// Interactive Live Module Cockpit Inspector
	const interactiveModules = [
		{
			id: 'auth',
			name: 'Povixa ID',
			tag: 'Auth & Passkeys',
			endpoint: 'POST /v1/auth/session/verify',
			badge: 'ed25519 • 0.8ms',
			response: {
				valid: true,
				session_id: 'ses_9401abf8812c',
				user: {
					id: 'usr_9410',
					email: 'alex@acme.dev',
					roles: ['admin', 'billing_lead'],
					mfa: 'webauthn_passkey'
				},
				organization: {
					id: 'org_8109',
					tier: 'growth_pro',
					sso_enforced: false
				},
				expires_at: 1789123000
			}
		},
		{
			id: 'config',
			name: 'Remote Config',
			tag: 'Flags & Rules',
			endpoint: 'POST /v1/config/evaluate',
			badge: 'Edge Cache • 1.2ms',
			response: {
				flag_key: 'features.next_pipeline',
				value: true,
				variant: 'rollout_50',
				reason: 'PERCENTAGE_TARGETING_MATCH',
				cache_hit: true,
				evaluated_at: '2026-10-11T11:40:00Z',
				environment: 'production'
			}
		},
		{
			id: 'storage',
			name: 'Object Storage',
			tag: 'S3 & Presign',
			endpoint: 'POST /v1/storage/presign',
			badge: 'Direct S3 • 2.1ms',
			response: {
				bucket: 'datasets',
				key: 'users/usr_9410/export-model.parquet',
				upload_url: 'https://s3.local.povixa/datasets/export-model.parquet?X-Amz-Signature=...',
				method: 'PUT',
				headers: {
					'Content-Type': 'application/octet-stream',
					'x-amz-server-side-encryption': 'AES256'
				},
				expires_in_seconds: 900
			}
		},
		{
			id: 'notify',
			name: 'Notifications',
			tag: 'Push & Dispatch',
			endpoint: 'POST /v1/notify/dispatch',
			badge: 'Multi-Channel • 3.4ms',
			response: {
				dispatch_id: 'ntf_88190ab7',
				channels: ['fcm_push', 'email_ses', 'webhook'],
				recipient: 'usr_9410',
				status: 'dispatched_all_channels',
				fcm_ticket_id: 'fcm_receipt_9921',
				queue_latency_ms: 1.8
			}
		},
		{
			id: 'analytics',
			name: 'Telemetry',
			tag: 'ClickHouse Ingestion',
			endpoint: 'POST /v1/telemetry/ingest',
			badge: 'ClickHouse • 4.1ms',
			response: {
				ingested_events: 1,
				partition: '2026_10',
				table: 'events_raw',
				schema_version: 'v2',
				query_ready: true,
				compression: 'zstd_level_3'
			}
		}
	];
	let activeInteractiveModule = $state('config');

	// Docker Compose snippet
	const dockerSnippet = `version: '3.8'

services:
  povixa-core:
    image: ghcr.io/povixa/core:latest
    container_name: povixa_engine
    restart: always
    ports:
      - "8080:8080" # Unified API Gateway & Management
      - "9090:9090" # High-speed Telemetry & gRPC
    environment:
      - POVIXA_MODE=standalone
      - DB_URL=postgres://povixa:secret@postgres:5432/povixa_db
      - CLICKHOUSE_URL=http://clickhouse:8123
      - S3_ENDPOINT=http://minio:9000
      - S3_ACCESS_KEY=povixa_admin
      - S3_SECRET_KEY=povixa_supersecret
      - JWT_PRIVATE_KEY=\${POVIXA_ED25519_KEY}
    depends_on:
      - postgres
      - clickhouse
      - minio

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: povixa_db
      POSTGRES_USER: povixa
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

  clickhouse:
    image: clickhouse/clickhouse-server:latest
    volumes:
      - chdata:/var/lib/clickhouse

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: povixa_admin
      MINIO_ROOT_PASSWORD: povixa_supersecret
    volumes:
      - miniodata:/data

volumes:
  pgdata:
  chdata:
  miniodata:`;

	let copiedDocker = $state(false);
	function copyDocker() {
		navigator.clipboard.writeText(dockerSnippet);
		copiedDocker = true;
		setTimeout(() => (copiedDocker = false), 2000);
	}

	// Feedback state
	let feedbackGiven = $state<'yes' | 'no' | null>(null);

	// Track Cards with i18n
	const trackCards = $derived([
		{
			title: m.card_quickstart_title(),
			desc: m.card_quickstart_desc(),
			icon: IconSparkles,
			badge: m.badge_start(),
			linkId: 'quickstart'
		},
		{
			title: m.card_docker_title(),
			desc: m.card_docker_desc(),
			icon: IconBrandDocker,
			badge: m.badge_sovereign(),
			linkId: 'docker'
		},
		{
			title: m.card_sdks_title(),
			desc: m.card_sdks_desc(),
			icon: IconCode,
			badge: m.badge_polyglot(),
			linkId: 'sdks'
		},
		{
			title: m.card_security_title(),
			desc: m.card_security_desc(),
			icon: IconShieldCheck,
			badge: m.badge_enterprise(),
			linkId: 'security'
		}
	]);
</script>

<svelte:head>
	<title>{m.doc_title()}</title>
	<meta name="description" content={m.doc_meta_desc()} />
</svelte:head>

<div class="flex w-full">
	<!-- Left Dedicated Navigation Sidebar with distinct solid white / card background -->
	<DocsSidebar bind:activeSection bind:mobileOpen={mobileSidebarOpen} />

	<!-- Main Documentation Content Flow -->
	<div class="flex-1 min-w-0 px-6 py-8 sm:px-10 lg:px-16">
		<div class="max-w-5xl mx-auto">
		<!-- Top Breadcrumb & Status Indicator -->
		<div class="flex items-center gap-2 text-xs text-muted-foreground mb-6">
			<a href="https://povixa.cloud" class="hover:text-foreground transition-colors">Povixa</a>
			<span>/</span>
			<span class="text-foreground font-medium">Docs</span>
			<span>/</span>
			<span class="text-primary font-mono font-medium">v0.9.4 Latest</span>
		</div>

		<!-- Main Hero Headline -->
		<div class="mb-10">
			<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary mb-3">
				<IconBook size={14} />
				<span>{m.doc_tag()}</span>
			</div>
			<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
				{m.doc_hero_title()}
			</h1>
			<p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
				{m.doc_hero_desc()}
			</p>
		</div>

		<!-- 4 Quickstart Track Cards -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
			{#each trackCards as track (track.title)}
				{@const Icon = track.icon}
				<div
					class="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition-all hover:border-primary/50 hover:shadow-xs"
				>
					<div>
						<div class="flex items-center justify-between">
							<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
								<Icon size={18} stroke={2} />
							</div>
							<span class="rounded-full border border-border/80 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
								{track.badge}
							</span>
						</div>
						<h3 class="mt-3.5 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
							{track.title}
						</h3>
						<p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">
							{track.desc}
						</p>
					</div>
					<div class="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
						<span>{m.btn_view_details()}</span>
						<IconArrowRight size={13} class="transition-transform group-hover:translate-x-1" />
					</div>
				</div>
			{/each}
		</div>

		<!-- Section 1: Quick Install Terminal Box -->
		<section id="quickstart" class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs mb-10">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<div class="flex items-center gap-2">
						<span class="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
							<IconTerminal2 size={14} />
						</span>
						<h2 class="text-lg font-bold text-foreground">{m.sec_1_title()}</h2>
					</div>
					<p class="mt-1 text-xs text-muted-foreground">
						{m.sec_1_desc()}
					</p>
				</div>

				<!-- Package Manager Selector Tabs -->
				<div class="flex flex-wrap items-center gap-1 rounded-lg border border-border/80 bg-muted/50 p-1">
					{#each packageManagers as pkg (pkg.id)}
						<button
							type="button"
							onclick={() => (activePkg = pkg.id)}
							class="rounded-md px-2.5 py-1 text-xs font-medium transition-all {activePkg === pkg.id ? 'bg-card text-foreground shadow-2xs font-semibold' : 'text-muted-foreground hover:text-foreground'}"
						>
							{pkg.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Terminal Command Code Bar -->
			<div class="mt-4 flex items-center justify-between rounded-xl border border-border/80 bg-zinc-950 p-3.5 text-zinc-100 shadow-inner">
				<div class="flex items-center gap-2.5 font-mono text-xs overflow-x-auto no-scrollbar">
					<span class="text-emerald-400 select-none">$</span>
					<code class="text-zinc-200">
						{packageManagers.find((p) => p.id === activePkg)?.cmd}
					</code>
				</div>
				<button
					type="button"
					onclick={copyInstallCmd}
					class="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
				>
					{#if copiedPkg}
						<IconCheck size={13} class="text-emerald-400" />
						<span class="text-emerald-400 font-mono text-[11px]">{m.btn_copied()}</span>
					{:else}
						<IconCopy size={13} />
						<span class="font-mono text-[11px]">{m.btn_copy()}</span>
					{/if}
				</button>
			</div>

			<!-- Quick Callout Note -->
			<div class="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-muted-foreground">
				<p class="leading-relaxed">
					<strong class="font-semibold text-foreground">💡 {m.sec_1_tip()}</strong>
				</p>
			</div>
		</section>

		<!-- Section 2: Polyglot SDK Implementation Playground -->
		<section id="sdks" class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs mb-10">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<div class="flex items-center gap-2">
						<span class="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
							<IconCode size={14} />
						</span>
						<h2 class="text-lg font-bold text-foreground">{m.sec_2_title()}</h2>
					</div>
					<p class="mt-1 text-xs text-muted-foreground">
						{m.sec_2_desc()}
					</p>
				</div>

				<!-- SDK Tab Selector -->
				<div class="flex flex-wrap items-center gap-1 rounded-lg border border-border/80 bg-muted/50 p-1">
					{#each sdkTabs as tab (tab.id)}
						<button
							type="button"
							onclick={() => (activeSdk = tab.id)}
							class="rounded-md px-2.5 py-1 text-xs font-medium transition-all {activeSdk === tab.id ? 'bg-card text-foreground shadow-2xs font-semibold' : 'text-muted-foreground hover:text-foreground'}"
						>
							{tab.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Polyglot Code Window -->
			<div class="mt-4 overflow-hidden rounded-xl border border-border/80 bg-zinc-950 shadow-inner">
				<div class="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2.5 text-xs text-zinc-400">
					<div class="flex items-center gap-2 font-mono">
						<span class="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
						<span class="ml-2 text-zinc-400">povixa-client{sdkTabs.find((s) => s.id === activeSdk)?.ext}</span>
					</div>

					<button
						type="button"
						onclick={copySdkCode}
						class="inline-flex items-center gap-1.5 rounded border border-zinc-700/80 bg-zinc-800/80 px-2.5 py-1 text-[11px] font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
					>
						{#if copiedSdk}
							<IconCheck size={12} class="text-emerald-400" />
							<span class="text-emerald-400 font-mono">{m.btn_copied()}</span>
						{:else}
							<IconCopy size={12} />
							<span class="font-mono">{m.btn_copy_code()}</span>
						{/if}
					</button>
				</div>

				<div class="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-zinc-200 no-scrollbar">
					<pre><code>{sdkSnippets[activeSdk]}</code></pre>
				</div>
			</div>
		</section>

		<!-- Section 3: Live Interactive Module Inspector -->
		<section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs mb-10">
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<div class="flex items-center gap-2">
						<span class="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600">
							<IconSparkles size={14} />
						</span>
						<h2 class="text-lg font-bold text-foreground">{m.sec_3_title()}</h2>
					</div>
					<p class="mt-1 text-xs text-muted-foreground">
						{m.sec_3_desc()}
					</p>
				</div>

				<div class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
					<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
					<span>LIVE MOCK EMULATOR</span>
				</div>
			</div>

			<!-- Module Selector Grid -->
			<div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
				{#each interactiveModules as mod (mod.id)}
					<button
						type="button"
						onclick={() => (activeInteractiveModule = mod.id)}
						class="flex flex-col items-start rounded-xl border p-3 text-left transition-all {activeInteractiveModule === mod.id ? 'border-primary bg-primary/5 shadow-2xs ring-1 ring-primary/40' : 'border-border/80 bg-card/60 hover:border-primary/40 hover:bg-muted/40'}"
					>
						<span class="text-xs font-bold text-foreground">{mod.name}</span>
						<span class="mt-0.5 text-[10px] text-muted-foreground">{mod.tag}</span>
						<span class="mt-2 rounded bg-muted/80 px-1.5 py-0.5 font-mono text-[9px] text-primary">
							{mod.badge}
						</span>
					</button>
				{/each}
			</div>

			<!-- Active Module Payload Preview -->
			{#each interactiveModules as mod (mod.id)}
				{#if activeInteractiveModule === mod.id}
					<div class="mt-4 rounded-xl border border-border/80 bg-zinc-950 p-4 text-xs font-mono shadow-inner">
						<div class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2.5 text-zinc-400">
							<div class="flex items-center gap-2">
								<span class="rounded bg-emerald-950 border border-emerald-800/80 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">200 OK</span>
								<span class="text-zinc-200">{mod.endpoint}</span>
							</div>
							<span class="text-[11px] text-zinc-400">Latency: {mod.badge}</span>
						</div>
						<div class="mt-3 overflow-x-auto text-emerald-400 no-scrollbar">
							<pre><code>{JSON.stringify(mod.response, null, 2)}</code></pre>
						</div>
					</div>
				{/if}
			{/each}
		</section>

		<!-- Section 4: Self-Hosting Docker Stack -->
		<section id="docker" class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs mb-10">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<div class="flex items-center gap-2">
						<span class="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
							<IconBrandDocker size={14} />
						</span>
						<h2 class="text-lg font-bold text-foreground">{m.sec_4_title()}</h2>
					</div>
					<p class="mt-1 text-xs text-muted-foreground">
						{m.sec_4_desc()}
					</p>
				</div>

				<button
					type="button"
					onclick={copyDocker}
					class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs"
				>
					{#if copiedDocker}
						<IconCheck size={13} class="text-emerald-500" />
						<span class="text-emerald-500 font-mono">{m.btn_copied()}</span>
					{:else}
						<IconCopy size={13} />
						<span class="font-mono">{m.btn_copy_docker()}</span>
					{/if}
				</button>
			</div>

			<!-- Architecture Specs -->
			<div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
				<div class="rounded-xl border border-border/70 bg-background/60 p-3">
					<span class="font-mono text-[10px] text-muted-foreground uppercase">Gateway</span>
					<p class="mt-1 font-mono text-xs font-semibold text-foreground">Port :8080</p>
				</div>
				<div class="rounded-xl border border-border/70 bg-background/60 p-3">
					<span class="font-mono text-[10px] text-muted-foreground uppercase">gRPC Telemetry</span>
					<p class="mt-1 font-mono text-xs font-semibold text-foreground">Port :9090</p>
				</div>
				<div class="rounded-xl border border-border/70 bg-background/60 p-3">
					<span class="font-mono text-[10px] text-muted-foreground uppercase">Relational DB</span>
					<p class="mt-1 font-mono text-xs font-semibold text-foreground">PostgreSQL 16</p>
				</div>
				<div class="rounded-xl border border-border/70 bg-background/60 p-3">
					<span class="font-mono text-[10px] text-muted-foreground uppercase">OLAP Engine</span>
					<p class="mt-1 font-mono text-xs font-semibold text-foreground">ClickHouse Server</p>
				</div>
			</div>

			<!-- Docker YAML Code -->
			<div class="mt-4 overflow-hidden rounded-xl border border-border/80 bg-zinc-950 p-4 text-xs font-mono text-zinc-300 shadow-inner">
				<pre class="overflow-x-auto leading-relaxed no-scrollbar"><code>{dockerSnippet}</code></pre>
			</div>
		</section>

		<!-- Section 5: Architecture Flow Map -->
		<section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs mb-10">
			<div class="flex items-center gap-2">
				<span class="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
					<IconServer size={14} />
				</span>
				<h2 class="text-lg font-bold text-foreground">{m.sec_5_title()}</h2>
			</div>
			<p class="mt-1 text-xs text-muted-foreground">
				{m.sec_5_desc()}
			</p>

			<div class="mt-6 rounded-xl border border-border/70 bg-background/60 p-6">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div class="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
						<div>
							<div class="inline-flex rounded bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
								{m.layer_1_title()}
							</div>
							<h4 class="mt-2 text-sm font-bold text-foreground">{m.layer_1_sub()}</h4>
							<p class="mt-1 text-xs text-muted-foreground">
								{m.layer_1_desc()}
							</p>
						</div>
						<div class="mt-4 rounded bg-muted/70 p-2 font-mono text-[11px] text-foreground">
							<code>import &#123; Povixa &#125; from '@povixa/sdk'</code>
						</div>
					</div>

					<div class="flex flex-col justify-between rounded-xl border border-primary/50 bg-card p-4 shadow-2xs ring-1 ring-primary/30">
						<div>
							<div class="inline-flex rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600">
								{m.layer_2_title()}
							</div>
							<h4 class="mt-2 text-sm font-bold text-foreground">{m.layer_2_sub()}</h4>
							<p class="mt-1 text-xs text-muted-foreground">
								{m.layer_2_desc()}
							</p>
						</div>
						<div class="mt-4 rounded bg-emerald-500/10 p-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
							<code>Zero Network Round-trips</code>
						</div>
					</div>

					<div class="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
						<div>
							<div class="inline-flex rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
								{m.layer_3_title()}
							</div>
							<h4 class="mt-2 text-sm font-bold text-foreground">{m.layer_3_sub()}</h4>
							<p class="mt-1 text-xs text-muted-foreground">
								{m.layer_3_desc()}
							</p>
						</div>
						<div class="mt-4 rounded bg-muted/70 p-2 font-mono text-[11px] text-foreground">
							<code>100% Data Sovereignty</code>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 6: Helpful Page Feedback & Contribution -->
		<section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs mb-10">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h3 class="text-sm font-bold text-foreground">{m.feedback_title()}</h3>
					<p class="mt-0.5 text-xs text-muted-foreground">
						{m.feedback_desc()}
					</p>
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => (feedbackGiven = 'yes')}
						class="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-500/40 {feedbackGiven === 'yes' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 font-semibold' : ''}"
					>
						<span>{m.feedback_yes()}</span>
					</button>
					<button
						type="button"
						onclick={() => (feedbackGiven = 'no')}
						class="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/40 {feedbackGiven === 'no' ? 'bg-rose-500/15 border-rose-500 text-rose-600 font-semibold' : ''}"
					>
						<span>{m.feedback_no()}</span>
					</button>
				</div>
			</div>

			{#if feedbackGiven}
				<div class="mt-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
					{m.feedback_thanks()}
				</div>
			{/if}

			<div class="mt-4 flex flex-wrap items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
				<a
					href="https://github.com/hnamhocit/povixa/tree/main/apps/docs"
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
				>
					<IconCode size={14} />
					<span>{m.edit_github()}</span>
				</a>

				<span>{m.last_updated()}</span>
			</div>
		</section>

		<!-- Pre-Footer CTA -->
		<div class="rounded-2xl border border-border/80 bg-card p-8 text-center shadow-xs">
			<h2 class="text-xl font-bold text-foreground">{m.cta_ready_title()}</h2>
			<p class="mt-2 text-xs text-muted-foreground max-w-lg mx-auto">
				{m.cta_ready_desc()}
			</p>
			<div class="mt-5 flex items-center justify-center gap-3">
				<a
					href="https://console.povixa.cloud"
					target="_blank"
					rel="noreferrer"
					class="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
				>
					<span>{m.btn_open_console()}</span>
					<IconArrowRight size={14} />
				</a>
				<a
					href="https://povixa.cloud/support"
					target="_blank"
					rel="noreferrer"
					class="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-xs font-semibold text-foreground shadow-2xs transition-all hover:bg-muted"
				>
					<span>{m.btn_support()}</span>
				</a>
			</div>
		</div>
	</div>
</div>
</div>

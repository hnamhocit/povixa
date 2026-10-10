<script lang="ts">
	import {
		IconServer,
		IconWifi,
		IconCpu,
		IconDatabase,
		IconActivity,
		IconRefresh,
		IconPlayerPause,
		IconPlayerPlay,
		IconTrash,
		IconAlertCircle,
		IconCheck,
		IconTerminal2,
		IconNetwork,
		IconShieldCheck
	} from '@tabler/icons-svelte-runes';

	let testingNode = $state<string | null>(null);
	let pingResult = $state<string | null>(null);

	const edgeNodes = [
		{
			id: 'sin1',
			name: 'Singapore Edge Core (APAC Central)',
			region: 'Đông Nam Á (Equinix SG1 Datacenter)',
			ip: '103.145.22.84',
			anycastIp: '198.51.100.1 / 2001:db8::1',
			status: 'active',
			uptime: '99.998%',
			latency: '24ms',
			qps: '4,280 req/s',
			cpu: 34,
			ram: '5.2 GB / 16 GB (32%)',
			hardware: '32 vCPU AMD EPYC 9654 · 64GB DDR5',
			cacheHit: '94.2%',
			version: 'v2.8.4-edge',
			egress: '1.24 Gbps',
			bgpPeers: 'VNPT, Viettel, Singtel, Telstra, Equinix IX'
		},
		{
			id: 'iad1',
			name: 'US East Virginia Primary (Americas Core)',
			region: 'Bắc Mỹ (Ashburn Datacenter Alley)',
			ip: '198.51.100.42',
			anycastIp: '198.51.100.1 / 2001:db8::1',
			status: 'active',
			uptime: '99.995%',
			latency: '180ms',
			qps: '6,140 req/s',
			cpu: 48,
			ram: '8.4 GB / 16 GB (52%)',
			hardware: '64 vCPU AMD EPYC 9654 · 128GB DDR5',
			cacheHit: '91.8%',
			version: 'v2.8.4-edge',
			egress: '2.10 Gbps',
			bgpPeers: 'Cogent, Lumen, Comcast, NTT, LINX'
		},
		{
			id: 'hkg1',
			name: 'Hong Kong Mega PoP (East Asia Hub)',
			region: 'Đông Á (Mega-i Datacenter)',
			ip: '118.143.8.19',
			anycastIp: '198.51.100.1 / 2001:db8::1',
			status: 'active',
			uptime: '99.999%',
			latency: '38ms',
			qps: '3,820 req/s',
			cpu: 29,
			ram: '4.8 GB / 16 GB (30%)',
			hardware: '32 vCPU AMD EPYC 9654 · 64GB DDR5',
			cacheHit: '95.1%',
			version: 'v2.8.4-edge',
			egress: '1.05 Gbps',
			bgpPeers: 'HKIX, China Telecom CN2, PCCW, Telstra'
		},
		{
			id: 'fra1',
			name: 'Frankfurt Central Europe (EU Core)',
			region: 'Châu Âu (Equinix FR5 Datacenter)',
			ip: '194.12.44.102',
			anycastIp: '198.51.100.1 / 2001:db8::1',
			status: 'active',
			uptime: '99.992%',
			latency: '165ms',
			qps: '4,510 req/s',
			cpu: 41,
			ram: '6.1 GB / 16 GB (38%)',
			hardware: '48 vCPU AMD EPYC 9654 · 96GB DDR5',
			cacheHit: '93.4%',
			version: 'v2.8.4-edge',
			egress: '1.45 Gbps',
			bgpPeers: 'DE-CIX, Deutsche Telekom, Orange, Arelion'
		},
		{
			id: 'nrt1',
			name: 'Tokyo Narita Gateway (Northeast Asia)',
			region: 'Nhật Bản (Equinix TY2 Datacenter)',
			ip: '203.0.113.88',
			anycastIp: '198.51.100.1 / 2001:db8::1',
			status: 'active',
			uptime: '99.997%',
			latency: '72ms',
			qps: '3,110 req/s',
			cpu: 26,
			ram: '4.1 GB / 16 GB (25%)',
			hardware: '32 vCPU AMD EPYC 9654 · 64GB DDR5',
			cacheHit: '96.0%',
			version: 'v2.8.4-edge',
			egress: '890 Mbps',
			bgpPeers: 'JPIX, BBIX, NTT Com, KDDI, SoftBank'
		}
	];

	const pingMatrix = [
		{ origin: 'Hà Nội (VNPT / Viettel Fiber)', sin1: '24ms', hkg1: '38ms', nrt1: '72ms', iad1: '195ms', fra1: '175ms' },
		{ origin: 'TP. Hồ Chí Minh (FPT Telecom)', sin1: '22ms', hkg1: '41ms', nrt1: '75ms', iad1: '198ms', fra1: '178ms' },
		{ origin: 'Singapore (Singtel Gigabit)', sin1: '2ms', hkg1: '32ms', nrt1: '68ms', iad1: '185ms', fra1: '162ms' },
		{ origin: 'Tokyo (NTT East OCN)', sin1: '70ms', hkg1: '45ms', nrt1: '3ms', iad1: '145ms', fra1: '195ms' },
		{ origin: 'San Francisco (Silicon Valley)', sin1: '175ms', hkg1: '150ms', nrt1: '105ms', iad1: '62ms', fra1: '145ms' },
		{ origin: 'Frankfurt (DE-CIX Frankfurt)', sin1: '160ms', hkg1: '175ms', nrt1: '210ms', iad1: '85ms', fra1: '2ms' }
	];

	function runDiagnostic(nodeId: string) {
		testingNode = nodeId;
		pingResult = `Đang kết nối Anycast BGP tới node [${nodeId}]...`;
		setTimeout(() => {
			pingResult = `[${nodeId}] KẾT QUẢ CHẨN ĐOÁN:\n✓ BGP Peering: Established (ASN 13335)\n✓ ICMP Ping: 5/5 packets received (0% loss, rtt min/avg/max = 23.4/24.1/25.2 ms)\n✓ TLS 1.3 Handshake: 11.2ms (mTLS Verified)\n✓ Envoy Proxy Buffer: 0 drops · 4,280 active streams\n✓ Trạng thái: Node hoạt động tối ưu, sẵn sàng nhận 100% traffic.`;
			testingNode = null;
		}, 800);
	}
</script>

<div class="space-y-8">
	<!-- Section Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h2 class="text-base font-semibold text-foreground flex items-center gap-2">
				<IconServer size={18} class="text-primary" />
				Mạng Lưới Hạ Tầng Biên Toàn Cầu (Anycast Edge Fleet Topology)
			</h2>
			<p class="text-xs text-muted-foreground mt-0.5">
				5 cụm POP phân tán địa lý với định tuyến BGP Anycast tự động và đồng bộ cấu hình thời gian thực
			</p>
		</div>

		<div class="flex items-center gap-2">
			<button
				type="button"
				class="px-3.5 py-2 rounded-lg border border-border/50 bg-card/60 text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5"
			>
				<IconTrash size={15} class="text-muted-foreground" />
				Xả Toàn Bộ Cache CDN
			</button>
			<button
				type="button"
				class="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs"
			>
				<IconRefresh size={15} />
				Đồng Bộ Cấu Hình Fleet
			</button>
		</div>
	</div>

	<!-- 4 Fleet Core KPIs -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Tổng Số Cụm PoP</div>
			<div class="text-2xl font-bold text-foreground">5 / 5 <span class="text-xs font-normal text-emerald-500 font-semibold">100% Hoạt Động</span></div>
			<div class="text-xs text-muted-foreground">BGP Anycast AS13335 đồng bộ</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Tổng Dung Lượng Mạng</div>
			<div class="text-2xl font-bold text-foreground">18.2 Gbps <span class="text-xs font-normal text-muted-foreground">Băng Thông</span></div>
			<div class="text-xs text-muted-foreground">Đang sử dụng 6.73 Gbps (37%)</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Độ Trễ P90 Toàn Cầu</div>
			<div class="text-2xl font-bold text-emerald-500">28.2ms <span class="text-xs font-normal text-muted-foreground">Trung Bình</span></div>
			<div class="text-xs text-muted-foreground">Tối ưu hóa BGP Anycast tự động</div>
		</div>

		<div class="p-4 rounded-xl border border-border/50 bg-card/20 space-y-1">
			<div class="text-xs text-muted-foreground">Tỷ Lệ Cache Hit Toàn Mạng</div>
			<div class="text-2xl font-bold text-emerald-500">94.1% <span class="text-xs font-normal text-muted-foreground">Hiệu Quả</span></div>
			<div class="text-xs text-muted-foreground">Tiết kiệm 131.9 TB egress máy chủ gốc</div>
		</div>
	</div>

	<!-- Edge Nodes List (Deep Enterprise Specification) -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h3 class="text-sm font-semibold text-foreground">Chi Tiết 5 Cụm POP Phân Tán (Global Points of Presence)</h3>
			<span class="text-xs text-muted-foreground">Cập nhật mỗi 2 giây</span>
		</div>

		{#each edgeNodes as node}
			<div class="p-5 rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 transition-colors space-y-4">
				<!-- Top row: Node Identity, Status, Quick Actions -->
				<div class="flex flex-wrap items-center justify-between gap-4">
					<div class="flex items-center gap-3.5 min-w-[280px]">
						<div class="h-11 w-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-sm text-primary">
							{node.id}
						</div>
						<div>
							<div class="flex items-center gap-2 font-semibold text-sm text-foreground">
								<span>{node.name}</span>
								<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
							</div>
							<div class="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
								<span>{node.region}</span>
								<span>·</span>
								<span class="text-foreground/80">{node.ip}</span>
							</div>
						</div>
					</div>

					<!-- Direct Action Buttons -->
					<div class="flex items-center gap-2">
						<button
							type="button"
							onclick={() => runDiagnostic(node.id)}
							class="px-3 py-1.5 rounded-lg border border-border/50 text-xs font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5"
						>
							<IconTerminal2 size={14} class="text-primary" />
							Chẩn Đoán Node
						</button>
						<button
							type="button"
							class="px-3 py-1.5 rounded-lg border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
						>
							Xả Cache
						</button>
						<button
							type="button"
							class="px-3 py-1.5 rounded-lg border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
						>
							Drain Node
						</button>
					</div>
				</div>

				<!-- Middle row: Hardware specs & Metrics Grid -->
				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-border/30 text-xs">
					<div class="space-y-0.5">
						<span class="text-muted-foreground">Độ Trễ P90:</span>
						<div class="text-sm font-semibold text-emerald-500">{node.latency}</div>
					</div>

					<div class="space-y-0.5">
						<span class="text-muted-foreground">Lưu Lượng Yêu Cầu:</span>
						<div class="text-sm font-semibold text-foreground">{node.qps}</div>
					</div>

					<div class="space-y-0.5">
						<span class="text-muted-foreground">Tỷ Lệ Cache Hit:</span>
						<div class="text-sm font-semibold text-emerald-500">{node.cacheHit}</div>
					</div>

					<!-- CPU Progress -->
					<div class="space-y-1">
						<div class="flex justify-between text-muted-foreground">
							<span>CPU Tải:</span>
							<span class="font-medium text-foreground">{node.cpu}%</span>
						</div>
						<div class="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
							<div
								class="h-full rounded-full {node.cpu > 70 ? 'bg-rose-500' : node.cpu > 40 ? 'bg-amber-500' : 'bg-emerald-500'}"
								style="width: {node.cpu}%"
							></div>
						</div>
					</div>

					<div class="space-y-0.5">
						<span class="text-muted-foreground">Bộ Nhớ RAM:</span>
						<div class="text-xs font-medium text-foreground">{node.ram}</div>
					</div>

					<div class="space-y-0.5">
						<span class="text-muted-foreground">Băng Thông Egress:</span>
						<div class="text-sm font-semibold text-foreground">{node.egress}</div>
					</div>
				</div>

				<!-- Bottom row: Hardware & BGP Peers -->
				<div class="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground border-t border-border/20">
					<div>
						<span>Phần cứng: <strong class="text-foreground">{node.hardware}</strong></span>
					</div>
					<div>
						<span>BGP Đối Tác: <strong class="text-foreground">{node.bgpPeers}</strong></span>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Real-Time Diagnostic Terminal Output (If active) -->
	{#if pingResult}
		<div class="p-4 rounded-xl border border-primary/30 bg-card/60 space-y-2">
			<div class="flex items-center justify-between">
				<h4 class="text-xs font-semibold text-primary flex items-center gap-2">
					<IconTerminal2 size={16} />
					Bảng Kết Quả Chẩn Đoán Tuyến Đường Anycast
				</h4>
				<button
					type="button"
					onclick={() => (pingResult = null)}
					class="text-xs text-muted-foreground hover:text-foreground"
				>
					Đóng
				</button>
			</div>
			<pre class="p-3 rounded-lg bg-black/60 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed border border-border/40">{pingResult}</pre>
		</div>
	{/if}

	<!-- Latency Benchmark Matrix -->
	<div class="p-5 rounded-xl border border-border/50 bg-card/30">
		<h3 class="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
			<IconWifi size={18} class="text-primary" />
			Bảng Ma Trận Độ Trễ Biên Theo Vùng Địa Lý (Anycast Global Benchmark)
		</h3>
		<p class="text-xs text-muted-foreground mb-4">
			Kết quả kiểm tra P90 ping thực tế từ các nhà mạng lớn trên thế giới tới cụm Anycast gần nhất
		</p>

		<div class="overflow-x-auto">
			<table class="w-full text-left text-xs border-collapse">
				<thead>
					<tr class="border-b border-border/40 bg-muted/20 text-muted-foreground">
						<th class="py-3 px-4 font-semibold text-sm">Điểm Truy Cập & Nhà Mạng Nguồn</th>
						<th class="py-3 px-4 font-semibold font-mono text-sm">sin1 (Singapore)</th>
						<th class="py-3 px-4 font-semibold font-mono text-sm">hkg1 (Hong Kong)</th>
						<th class="py-3 px-4 font-semibold font-mono text-sm">nrt1 (Tokyo)</th>
						<th class="py-3 px-4 font-semibold font-mono text-sm">iad1 (US East)</th>
						<th class="py-3 px-4 font-semibold font-mono text-sm">fra1 (Frankfurt)</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border/20">
					{#each pingMatrix as row}
						<tr class="hover:bg-muted/20 transition-colors">
							<td class="py-3 px-4 font-medium text-foreground text-sm">{row.origin}</td>
							<td class="py-3 px-4 font-semibold text-emerald-500 text-sm">{row.sin1}</td>
							<td class="py-3 px-4 font-semibold text-emerald-500 text-sm">{row.hkg1}</td>
							<td class="py-3 px-4 {parseInt(row.nrt1) < 100 ? 'text-emerald-500 font-semibold' : 'text-muted-foreground'} text-sm">{row.nrt1}</td>
							<td class="py-3 px-4 {parseInt(row.iad1) < 100 ? 'text-emerald-500 font-semibold' : 'text-muted-foreground'} text-sm">{row.iad1}</td>
							<td class="py-3 px-4 {parseInt(row.fra1) < 100 ? 'text-emerald-500 font-semibold' : 'text-muted-foreground'} text-sm">{row.fra1}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

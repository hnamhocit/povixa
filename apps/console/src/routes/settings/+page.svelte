<script lang="ts">
	import {
		IconSettings,
		IconDeviceFloppy,
		IconUsers,
		IconMail,
		IconShieldCheck,
		IconTrash,
		IconAlertTriangle,
		IconPlus,
		IconCheck
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';

	let projectName = $state('Production Main Cluster');
	let projectSlug = $state('prod-main-cluster');
	let region = $state('sin1 (Singapore Edge)');
	let savedSuccess = $state(false);

	let teamMembers = $state([
		{ name: 'Hoang Nam', email: 'hnamhocit@gmail.com', role: 'Owner', status: 'Active' },
		{ name: 'Alex Rivera', email: 'alex@startup.dev', role: 'Developer', status: 'Active' },
		{ name: 'Sarah Connor', email: 'sarah.c@cyberdyne.io', role: 'Admin', status: 'Pending Invite' }
	]);

	function saveSettings() {
		savedSuccess = true;
		setTimeout(() => {
			savedSuccess = false;
		}, 2000);
	}
</script>

<div class="space-y-8 max-w-4xl">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<IconSettings size={20} stroke={2.5} />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">{m.nav_settings()}</h1>
			</div>
			<p class="text-xs text-muted-foreground mt-1">
				Quản lý cấu hình chung dự án, thành viên nhóm, phân quyền và kết nối hạ tầng.
			</p>
		</div>

		<button
			type="button"
			onclick={saveSettings}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
		>
			{#if savedSuccess}
				<IconCheck size={14} class="text-emerald-300" stroke={3} />
				<span>Đã lưu thành công!</span>
			{:else}
				<IconDeviceFloppy size={14} />
				<span>Lưu Cài Đặt</span>
			{/if}
		</button>
	</div>

	<!-- General Settings Section -->
	<div class="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm space-y-4">
		<h2 class="text-base font-bold text-foreground">Thông Tin Chung Dự Án</h2>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
			<div>
				<label for="set-pname" class="block font-semibold text-foreground mb-1">Tên Dự Án</label>
				<input
					id="set-pname"
					type="text"
					bind:value={projectName}
					class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
				/>
			</div>

			<div>
				<label for="set-pslug" class="block font-semibold text-foreground mb-1">Mã Định Danh (Slug)</label>
				<input
					id="set-pslug"
					type="text"
					bind:value={projectSlug}
					class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground font-mono focus:border-primary focus:outline-none"
				/>
			</div>

			<div>
				<label for="set-region" class="block font-semibold text-foreground mb-1">Cụm Máy Chủ Chính (Primary Region)</label>
				<select
					id="set-region"
					bind:value={region}
					class="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-foreground focus:border-primary focus:outline-none"
				>
					<option value="sin1 (Singapore Edge)">sin1 (Singapore Edge - Lowest Latency VN/SEA)</option>
					<option value="iad1 (US-East)">iad1 (US-East North Virginia)</option>
					<option value="fra1 (Frankfurt Europe)">fra1 (Frankfurt Europe)</option>
					<option value="self-hosted (Bare Metal)">self-hosted (Hetzner / Private Metal VPC)</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Team Members Section -->
	<div class="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-base font-bold text-foreground">Thành Viên Nhóm & Phân Quyền</h2>
				<p class="text-xs text-muted-foreground mt-0.5">Không giới hạn thành viên trong không gian làm việc (Unlimited Seats).</p>
			</div>
			<button
				type="button"
				class="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent"
			>
				<IconPlus size={14} />
				<span>Mời Thành Viên Mới</span>
			</button>
		</div>

		<div class="divide-y divide-border/40 text-xs">
			{#each teamMembers as tm}
				<div class="flex items-center justify-between py-3">
					<div class="flex items-center gap-3">
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
							{tm.name.slice(0, 2).toUpperCase()}
						</div>
						<div>
							<p class="font-semibold text-foreground">{tm.name}</p>
							<p class="text-[11px] text-muted-foreground font-mono">{tm.email}</p>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<span class="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
							{tm.role}
						</span>
						<span
							class="rounded-full px-2 py-0.5 text-[10px] font-semibold {tm.status === 'Active'
								? 'bg-emerald-500/15 text-emerald-500'
								: 'bg-amber-500/15 text-amber-500'}"
						>
							{tm.status}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Danger Zone -->
	<div class="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 space-y-3">
		<div class="flex items-center gap-2 text-destructive font-bold text-sm">
			<IconAlertTriangle size={18} />
			<span>Vùng Nguy Hiểm (Danger Zone)</span>
		</div>
		<p class="text-xs text-muted-foreground leading-relaxed">
			Xóa dự án này sẽ ngừng toàn bộ API gateway, xóa các cờ remote config và thu hồi tất cả API keys ngay lập tức. Dữ liệu trên S3 lưu trữ sẽ được giữ trong 7 ngày trước khi hủy vĩnh viễn.
		</p>
		<button
			type="button"
			class="rounded-xl border border-destructive/40 bg-card px-3.5 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
		>
			Yêu Cầu Xóa Dự Án Này
		</button>
	</div>
</div>

<script lang="ts">
	import {
		IconArrowRight,
		IconBrandDiscord,
		IconBrandFacebook,
		IconBrandGithub,
		IconBrandGoogle,
		IconChartBar,
		IconFingerprint,
		IconLanguage,
		IconSun
	} from '@tabler/icons-svelte-runes';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.module_id_name()} — Povixa Identity</title>
</svelte:head>

<section class="min-h-[calc(100vh-4rem)] bg-[#f8faff] text-slate-900">
	<div class="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-6 sm:px-10 lg:px-12">
		<header class="flex h-16 items-center justify-between border-b border-slate-200/80">
			<a href="/" class="flex items-center gap-2.5">
				<span
					class="flex size-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/25"
				>
					<IconFingerprint size={18} stroke={2.2} />
				</span>
				<span class="text-[15px] font-bold tracking-tight">Povixa</span>
				<span
					class="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600"
					>ID</span
				>
			</a>
			<nav class="hidden items-center gap-8 text-xs font-medium text-slate-500 sm:flex">
				<a href="/docs" class="hover:text-blue-600">Tài liệu</a>
				<a href="/status" class="flex items-center gap-1.5 hover:text-blue-600"
					><span class="size-1.5 rounded-full bg-emerald-400"></span>Trạng thái</a
				>
			</nav>
			<div class="flex items-center gap-2 text-xs text-slate-500">
				<button
					type="button"
					class="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white"
					><IconLanguage size={14} /></button
				>
				<button
					type="button"
					class="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white"
					><IconSun size={14} /></button
				>
			</div>
		</header>

		<div
			class="grid min-h-[calc(100vh-8rem)] items-center gap-12 py-12 lg:grid-cols-[1fr_390px] lg:gap-24 lg:py-16"
		>
			<div class="max-w-xl">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-600"
				>
					<span class="size-1.5 rounded-full bg-blue-500"></span>
					Tài khoản Povixa · Đăng nhập nhanh và an toàn
				</div>
				<h1
					class="mt-7 text-5xl leading-[.98] font-extrabold tracking-[-0.06em] text-slate-950 sm:text-6xl"
				>
					Một tài khoản duy nhất.<br /><span
						class="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent"
						>Cho mọi dịch vụ của bạn.</span
					>
				</h1>
				<p class="mt-6 max-w-lg text-base leading-relaxed text-slate-500">
					Đăng nhập để quản lý dự án, ứng dụng và dữ liệu trên toàn bộ nền tảng Povixa. Nhanh chóng,
					an toàn và hoàn toàn bảo mật.
				</p>
				<div class="mt-8 grid max-w-lg gap-4 text-sm text-slate-600 sm:grid-cols-2">
					<span>✓ Đăng nhập nhanh qua mạng xã hội</span><span>✓ Bảo vệ thông tin tuyệt đối</span>
					<span>✓ Đồng bộ liền mạch trên mọi thiết bị</span><span>✓ Hoàn toàn miễn phí sử dụng</span
					>
				</div>
				<div class="mt-10">
					<p class="text-xs text-slate-400">Dịch vụ bạn có thể truy cập ngay:</p>
					<div class="mt-3 flex flex-wrap gap-2">
						<a
							href="/"
							class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm"
							><IconChartBar size={13} class="text-blue-500" />Bảng điều khiển</a
						>
						<a
							href="/config"
							class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm"
							><IconFingerprint size={13} class="text-blue-500" />Cấu hình</a
						>
					</div>
				</div>
			</div>

			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-7"
			>
				<div class="mb-5">
					<h2 class="text-xl font-bold tracking-tight text-slate-950">Chào mừng bạn trở lại</h2>
					<p class="mt-1 text-xs text-slate-400">
						Đăng nhập để tiếp tục vào không gian làm việc của bạn
					</p>
				</div>
				<div
					class="grid grid-cols-2 rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-400"
				>
					<span class="rounded-md bg-white py-2 text-center text-slate-700 shadow-sm"
						>Đăng nhập</span
					><span class="py-2 text-center">Tạo tài khoản</span>
				</div>
				<div class="mt-5 grid grid-cols-2 gap-2">
					<a
						href="https://id.povixa.cloud"
						class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
						><IconBrandGoogle size={15} class="text-blue-500" />Google</a
					>
					<a
						href="https://id.povixa.cloud"
						class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
						><IconBrandGithub size={15} />GitHub</a
					>
					<a
						href="https://id.povixa.cloud"
						class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
						><IconBrandDiscord size={15} class="text-indigo-500" />Discord</a
					>
					<a
						href="https://id.povixa.cloud"
						class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
						><IconBrandFacebook size={15} class="text-blue-600" />Facebook</a
					>
				</div>
				<div class="my-5 flex items-center gap-3 text-[10px] text-slate-400">
					<span class="h-px flex-1 bg-slate-200"></span>Hoặc tiếp tục bằng email<span
						class="h-px flex-1 bg-slate-200"
					></span>
				</div>
				<div class="block text-[11px] font-semibold text-slate-600">
					Địa chỉ email
					<div
						class="mt-1.5 flex h-10 items-center rounded-xl border border-slate-200 px-3 text-slate-300"
					>
						ban@example.com
					</div>
				</div>
				<div class="mt-4 block text-[11px] font-semibold text-slate-600">
					Mật khẩu
					<div
						class="mt-1.5 flex h-10 items-center rounded-xl border border-slate-200 px-3 text-slate-300"
					>
						Nhập mật khẩu của bạn
					</div>
				</div>
				<div class="mt-3 flex items-center justify-between text-[10px] text-slate-400">
					<label class="flex items-center gap-1.5"
						><input type="checkbox" checked class="size-3 accent-blue-600" /> Ghi nhớ đăng nhập</label
					><a href="https://id.povixa.cloud" class="text-blue-600 hover:underline">Quên mật khẩu?</a
					>
				</div>
				<a
					href="https://id.povixa.cloud"
					class="mt-5 flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
					>Đăng nhập <IconArrowRight size={14} /></a
				>
				<a
					href="https://id.povixa.cloud"
					class="mt-3 flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 text-[11px] font-medium text-slate-500 hover:bg-slate-50"
					><IconFingerprint size={14} class="text-blue-500" />Đăng nhập bằng vân tay / Face ID</a
				>
				<p class="mt-5 border-t border-slate-100 pt-4 text-center text-[10px] text-slate-400">
					Bạn chưa có tài khoản? <a
						href="https://id.povixa.cloud"
						class="font-semibold text-blue-600">Đăng ký ngay</a
					>
				</p>
			</div>
		</div>
	</div>
</section>

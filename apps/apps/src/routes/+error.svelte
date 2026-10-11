<script lang="ts">
	import { page } from '$app/state';
	import { NotFound } from '@povixa/ui';
</script>

<svelte:head>
	<title>{page.status} - Applications Hub — Povixa</title>
</svelte:head>

<section class="flex flex-1 items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
	{#if page.status === 404}
		<NotFound
			code="404"
			title="Tính Năng Ứng Dụng Đang Được Phát Triển"
			description={page.error?.message ||
				'Chức năng bạn đang truy cập đang được hoàn thiện trong lộ trình tiếp theo của Povixa Applications Hub.'}
			homeHref="/"
			homeLabel="Về Kho Ứng Dụng"
			backHref="/"
			backLabel="Quay lại"
			suggestions={[
				{
					href: '/',
					label: 'Applications Hub',
					description: 'Danh sách triển khai ứng dụng, container và trạng thái dịch vụ'
				},
				{
					href: '/templates',
					label: 'Kho Mẫu Dự Án Sẵn Sàng Triển Khai',
					description: 'Khởi tạo nhanh với SvelteKit, NestJS, Next.js, Go và AI Agents'
				},
				{
					href: '/domains',
					label: 'Mạng Lưới Tên Miền Toàn Cầu',
					description: 'Cấu hình SSL tự động và định tuyến CNAME Anycast'
				},
				{
					href: 'https://console.povixa.cloud',
					label: 'Developer Console',
					description: 'Điều phối hạ tầng dữ liệu và khóa bảo mật API'
				}
			]}
		/>
	{:else}
		<div class="max-w-md mx-auto text-center space-y-4">
			<div class="h-12 w-12 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg">
				{page.status}
			</div>
			<h1 class="text-xl font-bold text-foreground">Đã xảy ra sự cố</h1>
			<p class="text-xs text-muted-foreground">{page.error?.message || 'Có sự cố trong quá trình kết nối tới ứng dụng.'}</p>
			<a href="/" class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
				Về trang chủ Applications
			</a>
		</div>
	{/if}
</section>

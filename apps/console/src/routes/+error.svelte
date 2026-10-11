<script lang="ts">
	import { page } from '$app/state';
	import { NotFound } from '@povixa/ui';
</script>

<svelte:head>
	<title>{page.status} - Developer Console — Povixa</title>
</svelte:head>

<section class="flex flex-1 items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
	{#if page.status === 404}
		<NotFound
			code="404"
			title="Tính Năng Đang Phát Triển hoặc Không Tìm Thấy"
			description={page.error?.message ||
				'Phân hệ bạn đang tìm kiếm đang được đội ngũ Povixa hoàn thiện hoặc đường dẫn không còn hiệu lực.'}
			homeHref="/"
			homeLabel="Về Bảng Điều Khiển Console"
			backHref="/"
			backLabel="Quay lại"
			suggestions={[
				{
					href: '/',
					label: 'Bảng Điều Khiển Dự Án',
					description: 'Tổng quan chỉ số, modules và dự án đang hoạt động'
				},
				{
					href: '/auth',
					label: 'Povixa Auth (End-Users)',
					description: 'Cổng xác thực OAuth 2.1, Passkeys và phân quyền người dùng'
				},
				{
					href: '/config',
					label: 'Remote Config & Feature Flags',
					description: 'Tính năng cờ và cấu hình từ xa thời gian thực'
				},
				{
					href: '/storage',
					label: 'Lưu Trữ Đối Tượng (S3)',
					description: 'Quản lý buckets S3 và mạng phân phối nội dung CDN'
				},
				{
					href: '/observability',
					label: 'Quan Sát & Edge Logs',
					description: 'Truy vết phân tán OpenTelemetry và nhật ký sự kiện'
				},
				{
					href: 'https://apps.povixa.cloud',
					label: 'Applications Hub',
					description: 'Trung tâm triển khai ứng dụng biên và microservices'
				}
			]}
		/>
	{:else}
		<div class="max-w-md mx-auto text-center space-y-4">
			<div class="h-12 w-12 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg">
				{page.status}
			</div>
			<h1 class="text-xl font-bold text-foreground">Đã xảy ra lỗi tại Console</h1>
			<p class="text-xs text-muted-foreground">{page.error?.message || 'Có sự cố trong quá trình xử lý yêu cầu.'}</p>
			<a href="/" class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
				Về trang tổng quan Console
			</a>
		</div>
	{/if}
</section>

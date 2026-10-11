<script lang="ts">
	import { page } from '$app/state';
	import { NotFound } from '@povixa/ui';
</script>

<svelte:head>
	<title>{page.status} - Povixa Admin</title>
</svelte:head>

<section class="flex flex-1 items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
	{#if page.status === 404}
		<NotFound
			code="404"
			title="Phân hệ Quản trị Đang Phát Triển hoặc Không Tồn Tại"
			description={page.error?.message ||
				'Đường dẫn bạn yêu cầu không tồn tại trong Cổng Super Admin Povixa hoặc đang nằm trong kế hoạch phát hành tiếp theo.'}
			homeHref="/"
			homeLabel="Về Bảng Điều Khiển Admin"
			backHref="/"
			backLabel="Quay lại"
			suggestions={[
				{
					href: '/',
					label: 'Tổng Quan Hệ Thống',
					description: 'Chỉ số đo lường Anycast Edge Fleet và lưu lượng toàn cầu'
				},
				{
					href: 'https://console.povixa.cloud',
					label: 'Developer Console',
					description: 'Quản lý dự án, API keys, cơ sở dữ liệu và cấu hình'
				},
				{
					href: 'https://apps.povixa.cloud',
					label: 'Applications Hub',
					description: 'Triển khai container, microservices và kho mẫu dự án'
				},
				{
					href: 'https://id.povixa.cloud',
					label: 'Central Auth SSO',
					description: 'Cổng định danh và quản lý phiên làm việc tập trung'
				}
			]}
		/>
	{:else}
		<div class="max-w-md mx-auto text-center space-y-4">
			<div class="h-12 w-12 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg">
				{page.status}
			</div>
			<h1 class="text-xl font-bold text-foreground">Đã xảy ra sự cố</h1>
			<p class="text-xs text-muted-foreground">{page.error?.message || 'Hệ thống quản trị gặp lỗi không mong muốn.'}</p>
			<a href="/" class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
				Về trang chủ Admin
			</a>
		</div>
	{/if}
</section>

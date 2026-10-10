<script lang="ts">
	import { page } from '$app/state';
	import { NotFound } from '@povixa/ui';
</script>

<svelte:head>
	<title>{page.status} - Không tìm thấy trang — Povixa</title>
</svelte:head>

<section class="flex flex-1 items-center justify-center py-12">
	<NotFound
		code={String(page.status || 404)}
		title={page.status === 404 ? 'Không tìm thấy trang yêu cầu' : 'Đã xảy ra sự cố'}
		description={page.error?.message ||
			'Đường dẫn bạn yêu cầu không tồn tại trên hệ thống Povixa, đã được chuyển hướng hoặc đang được hoàn thiện.'}
		homeHref="/"
		homeLabel="Về trang chủ"
		backHref="/"
		backLabel="Quay lại"
		suggestions={[
			{
				href: '/',
				label: 'Trang chủ Povixa',
				description: 'Khám phá nền tảng điều khiển ứng dụng thống nhất'
			},
			{
				href: '/modules',
				label: 'Tất cả Modules',
				description: 'Xem chi tiết 8 mô-đun cốt lõi trong hệ sinh thái'
			},
			{
				href: '/docs',
				label: 'Tài liệu hướng dẫn',
				description: 'Khởi chạy nhanh trong 15 giây với bộ công cụ CLI'
			},
			{
				href: '/status',
				label: 'Trạng thái hệ thống',
				description: 'Kiểm tra độ ổn định và thời gian hoạt động của dịch vụ'
			}
		]}
	/>
</section>

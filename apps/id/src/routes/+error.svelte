<script lang="ts">
	import { page } from '$app/state';
	import { NotFound } from '@povixa/ui';
</script>

<svelte:head>
	<title>{page.status} - Povixa ID</title>
</svelte:head>

<section class="flex flex-1 items-center justify-center py-12">
	<NotFound
		code={String(page.status || 404)}
		title={page.status === 404 ? 'Không tìm thấy trang tài khoản' : 'Đã xảy ra sự cố'}
		description={page.error?.message ||
			'Đường dẫn bạn yêu cầu không tồn tại trong hệ thống Povixa ID hoặc phiên làm việc đã hết hạn.'}
		homeHref="/"
		homeLabel="Về trang chủ ID"
		suggestions={[
			{
				href: '/',
				label: 'Đăng nhập & Tài khoản',
				description: 'Trang xác thực và quản lý hồ sơ người dùng'
			},
			{
				href: '/login',
				label: 'Đăng nhập',
				description: 'Truy cập vào bảng điều khiển tài khoản Povixa'
			},
			{
				href: '/register',
				label: 'Tạo tài khoản mới',
				description: 'Đăng ký tài khoản miễn phí trong 15 giây'
			},
			{
				href: 'https://povixa.cloud',
				label: 'Nền tảng Povixa Cloud',
				description: 'Khám phá nền tảng điều khiển ứng dụng'
			}
		]}
	/>
</section>

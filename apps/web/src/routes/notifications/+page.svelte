<script lang="ts">
	import { FeatureInDevelopment } from '@povixa/ui';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.module_notify_name()} — Povixa</title>
</svelte:head>

<section class="py-12">
	<FeatureInDevelopment
		moduleName={m.module_notify_tag()}
		title={m.module_notify_name()}
		description={m.module_notify_desc()}
		badge="Đang phát triển • In Development"
		progress={65}
		eta="Q2 2026"
		highlights={[
			{
				title: 'Thông báo đẩy đa kênh (Web, iOS, Android)',
				description:
					'Hỗ trợ Web Push API, Apple APNs, Firebase Cloud Messaging (FCM) qua một giao diện API duy nhất.',
				icon: 'bolt'
			},
			{
				title: 'Kênh dự phòng Email & SMS thông minh',
				description:
					'Tự động định tuyến gửi Email hoặc SMS nếu thông báo đẩy không được người dùng đọc sau khoảng thời gian cài đặt.',
				icon: 'code'
			},
			{
				title: 'Hàng đợi phân tán chịu tải cao',
				description:
					'Xử lý hàng triệu thông báo mỗi phút với cơ chế hàng đợi Redis/Kafka phân tán và retry tự động.',
				icon: 'shield'
			}
		]}
		backHref="/modules"
		backLabel="Xem tất cả modules"
		secondaryActionHref="/docs"
		secondaryActionLabel="Đọc tài liệu"
	/>
</section>

<script lang="ts">
	import { FeatureInDevelopment } from '@povixa/ui';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.module_storage_name()} — Povixa</title>
</svelte:head>

<section class="py-12">
	<FeatureInDevelopment
		moduleName={m.module_storage_tag()}
		title={m.module_storage_name()}
		description={m.module_storage_desc()}
		badge="Đang phát triển • In Development"
		progress={55}
		eta="Q3 2026"
		highlights={[
			{
				title: 'Chuẩn S3-Compatible tương thích 100%',
				description:
					'Dễ dàng tích hợp với AWS SDK, MinIO, rclone và các công cụ lưu trữ đám mây hiện hữu.',
				icon: 'code'
			},
			{
				title: 'Không phí tải ra (Zero Egress Markup)',
				description:
					'Chấm dứt việc bị các nhà cung cấp đám mây lớn tính phí băng thông cắt cổ khi dữ liệu tăng trưởng.',
				icon: 'shield'
			},
			{
				title: 'Tự động tối ưu hóa hình ảnh & CDN Edge',
				description:
					'Chuyển đổi định dạng WebP/AVIF theo thời gian thực và phân phối qua mạng biên toàn cầu.',
				icon: 'bolt'
			}
		]}
		backHref="/modules"
		backLabel="Xem tất cả modules"
		secondaryActionHref="/docs"
		secondaryActionLabel="Đọc tài liệu"
	/>
</section>

<script lang="ts">
	import { FeatureInDevelopment } from '@povixa/ui';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.module_analytics_name()} — Povixa</title>
</svelte:head>

<section class="py-12">
	<FeatureInDevelopment
		moduleName={m.module_analytics_tag()}
		title={m.module_analytics_name()}
		description={m.module_analytics_desc()}
		badge="Đang phát triển • In Development"
		progress={60}
		eta="Q3 2026"
		highlights={[
			{
				title: 'Bảo mật quyền riêng tư 100% (Zero-Cookie)',
				description:
					'Phân tích hành vi người dùng tuân thủ GDPR/CCPA nghiêm ngặt mà không cần banner chấp thuận Cookie.',
				icon: 'shield'
			},
			{
				title: 'Luồng dữ liệu sự kiện thời gian thực',
				description:
					'Trực quan hóa lượng truy cập, phễu chuyển đổi (conversion funnels) và retention theo giây.',
				icon: 'bolt'
			},
			{
				title: 'SDK siêu nhẹ dưới 2KB',
				description:
					'Không làm chậm tốc độ tải trang (Zero Core Web Vitals impact), hỗ trợ mọi framework hiện đại.',
				icon: 'code'
			}
		]}
		backHref="/modules"
		backLabel="Xem tất cả modules"
		secondaryActionHref="/docs"
		secondaryActionLabel="Đọc tài liệu"
	/>
</section>

<script lang="ts">
	import { FeatureInDevelopment } from '@povixa/ui';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.module_config_name()} — Povixa</title>
</svelte:head>

<section class="py-12">
	<FeatureInDevelopment
		moduleName={m.module_config_tag()}
		title={m.module_config_name()}
		description={m.module_config_desc()}
		badge="Sắp ra mắt • In Development"
		progress={75}
		eta="Q2 2026"
		highlights={[
			{
				title: 'Cờ tính năng thời gian thực (Realtime Flags)',
				description:
					'Bật/tắt tính năng theo thời gian thực mà không cần triển khai lại mã nguồn hoặc build lại app.',
				icon: 'bolt'
			},
			{
				title: 'Thử nghiệm A/B & Phân đoạn người dùng',
				description:
					'Phân nhóm người dùng theo phần trăm, vị trí địa lý, phiên bản ứng dụng hoặc thuộc tính tùy chỉnh.',
				icon: 'code'
			},
			{
				title: 'Đồng bộ hóa tức thì tại Edge',
				description:
					'Phân phối cấu hình qua mạng lưới Edge CDN độ trễ cực thấp dưới 15ms trên toàn cầu.',
				icon: 'shield'
			}
		]}
		backHref="/modules"
		backLabel="Xem tất cả modules"
		secondaryActionHref="/docs"
		secondaryActionLabel="Đọc tài liệu SDK"
	/>
</section>

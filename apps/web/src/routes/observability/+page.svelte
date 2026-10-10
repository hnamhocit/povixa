<script lang="ts">
	import { FeatureInDevelopment } from '@povixa/ui';
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.module_obs_name()} — Povixa</title>
</svelte:head>

<section class="py-12">
	<FeatureInDevelopment
		moduleName={m.module_obs_tag()}
		title={m.module_obs_name()}
		description={m.module_obs_desc()}
		badge="Kế hoạch • Roadmap"
		progress={40}
		eta="Q4 2026"
		highlights={[
			{
				title: 'Chuẩn OpenTelemetry Native',
				description:
					'Thu thập logs, metrics và distributed traces mà không bị phụ thuộc vào một giải pháp proprietary APM.',
				icon: 'code'
			},
			{
				title: 'Bảng điều khiển sức khỏe ứng dụng',
				description:
					'Giám sát độ trễ API, tỷ lệ lỗi (error rate), mức tiêu thụ bộ nhớ và CPU theo thời gian thực.',
				icon: 'bolt'
			},
			{
				title: 'Cảnh báo thông minh qua Discord / Slack',
				description:
					'Nhận thông báo sự cố ngay lập tức qua webhook tùy biến khi có bất thường về hiệu năng.',
				icon: 'shield'
			}
		]}
		backHref="/modules"
		backLabel="Xem tất cả modules"
		secondaryActionHref="/docs"
		secondaryActionLabel="Đọc tài liệu"
	/>
</section>

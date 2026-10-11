import { l as spread_props, o as ensure_array_like, s as head, w as escape_html, y as attr } from "../../chunks/server.js";
import { t as Icon } from "../../chunks/Icon.js";
import { t as Clock } from "../../chunks/clock.js";
import { t as Code } from "../../chunks/code.js";
import { t as Cookie } from "../../chunks/cookie.js";
import { t as File_text } from "../../chunks/file-text.js";
import { t as Lock } from "../../chunks/lock.js";
import { t as Server } from "../../chunks/server2.js";
import { t as Shield_check } from "../../chunks/shield-check.js";
import { t as effective_date } from "../../chunks/effective_date.js";
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/arrow-right.svelte
function Arrow_right($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "arrow-right"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M5 12l14 0" }],
				["path", { "d": "M13 18l6 -6" }],
				["path", { "d": "M13 6l6 6" }]
			],
			children
		}
	]));
}
//#endregion
//#region ../../node_modules/.bun/@tabler+icons-svelte-runes@3.49.0+4d34efae0051345e/node_modules/@tabler/icons-svelte-runes/dist/icons/scale.svelte
function Scale($$renderer, $$props) {
	let { children, $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{
			type: "outline",
			name: "scale"
		},
		props,
		{
			iconNode: [
				["path", { "d": "M7 20l10 0" }],
				["path", { "d": "M6 6l6 -1l6 1" }],
				["path", { "d": "M12 3l0 17" }],
				["path", { "d": "M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" }],
				["path", { "d": "M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" }]
			],
			children
		}
	]));
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const legalDocuments = [
			{
				href: "/terms",
				title: "Điều khoản Dịch vụ (Terms of Service)",
				badge: "Phiên bản 2.4",
				desc: "Quy định sử dụng nền tảng, điều khoản cam kết không khóa mã nguồn (No Lock-in), và quyền tự vận hành Self-Hosted.",
				icon: File_text,
				updated: "Tháng 10, 2026"
			},
			{
				href: "/privacy",
				title: "Chính sách Quyền riêng tư (Privacy Policy)",
				badge: "GDPR & CCPA",
				desc: "Cam kết minh bạch về thu thập dữ liệu, quyền tự quyết dữ liệu người dùng và triết lý không bán dữ liệu cho bên thứ ba.",
				icon: Lock,
				updated: "Tháng 10, 2026"
			},
			{
				href: "/dpa",
				title: "Thoả thuận Xử lý Dữ liệu (DPA)",
				badge: "Doanh nghiệp",
				desc: "Đặc tả tuân thủ Điều 28 GDPR dành cho khách hàng doanh nghiệp ủy thác dữ liệu người dùng trên Povixa Cloud.",
				icon: Shield_check,
				updated: "Tháng 10, 2026"
			},
			{
				href: "/cookies",
				title: "Chính sách Cookie & Lưu trữ Cục bộ",
				badge: "Audit định kỳ",
				desc: "Minh bạch các token phiên làm việc, cookie xác thực cần thiết và tùy chọn từ chối telemetry phân tích.",
				icon: Cookie,
				updated: "Tháng 10, 2026"
			},
			{
				href: "/subprocessors",
				title: "Danh sách Bên Xử lý Phụ (Subprocessors)",
				badge: "6 Đối tác",
				desc: "Bảng kê chi tiết các nhà cung cấp hạ tầng trung tâm dữ liệu, máy chủ đám mây và cổng thanh toán được ủy quyền.",
				icon: Server,
				updated: "Tháng 10, 2026"
			},
			{
				href: "/sla",
				title: "Cam kết Mức Dịch vụ (SLA Guarantee)",
				badge: "99.99% Uptime",
				desc: "Cam kết thời gian hoạt động hệ thống, chỉ tiêu thời gian phản hồi sự cố khẩn cấp và chính sách bồi hoàn Service Credit.",
				icon: Clock,
				updated: "Tháng 10, 2026"
			},
			{
				href: "/licenses",
				title: "Giấy phép Mã nguồn Mở (Open Source Licensing)",
				badge: "AGPL-3.0 / MIT",
				desc: "Đặc tả mô hình giấy phép kép: AGPL-3.0 cho Core Platform Infrastructure và MIT permissive cho Client SDKs.",
				icon: Code,
				updated: "Tháng 10, 2026"
			}
		];
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Trung tâm Pháp lý &amp; Tuân thủ — Povixa Legal Hub</title>`);
			});
			$$renderer.push(`<meta name="description" content="Tổng hợp các văn bản pháp lý, điều khoản dịch vụ, chính sách bảo vệ dữ liệu và cam kết tuân thủ của Povixa."/>`);
		});
		$$renderer.push(`<div class="mb-8"><div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary mb-3">`);
		Scale($$renderer, { size: 14 });
		$$renderer.push(`<!----> <span>TRUST, PRIVACY &amp; COMPLIANCE ARCHITECTURE</span></div> <h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Trung tâm Pháp lý &amp; Cam kết Minh bạch</h1> <p class="mt-3 text-base text-muted-foreground leading-relaxed">Tất cả các điều khoản, chính sách quyền riêng tư và thoả thuận mức độ dịch vụ của Povixa đều được công khai minh bạch nhằm bảo vệ tối đa quyền tự do và an toàn dữ liệu của nhà phát triển.</p> <div class="mt-4 flex items-center gap-3 text-xs text-muted-foreground font-mono"><span class="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> ${escape_html(effective_date())}</span></div></div> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12"><!--[-->`);
		const each_array = ensure_array_like(legalDocuments);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let doc = each_array[$$index];
			const Icon = doc.icon;
			$$renderer.push(`<a${attr("href", doc.href)} class="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition-all hover:border-primary/50 hover:bg-card hover:shadow-xs"><div><div class="flex items-center justify-between"><div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">`);
			if (Icon) {
				$$renderer.push("<!--[-->");
				Icon($$renderer, {
					size: 18,
					stroke: 2
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div> <span class="rounded-full border border-border/80 bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground">${escape_html(doc.badge)}</span></div> <h3 class="mt-3.5 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">${escape_html(doc.title)}</h3> <p class="mt-1.5 text-xs leading-relaxed text-muted-foreground">${escape_html(doc.desc)}</p></div> <div class="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs"><span class="text-[11px] text-muted-foreground">Hiệu lực: ${escape_html(doc.updated)}</span> <div class="flex items-center gap-1 text-primary font-medium"><span>Đọc văn bản</span> `);
			Arrow_right($$renderer, {
				size: 13,
				class: "transition-transform group-hover:translate-x-1"
			});
			$$renderer.push(`<!----></div></div></a>`);
		}
		$$renderer.push(`<!--]--></div> <section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs mb-10"><div class="flex items-center gap-2"><span class="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600">`);
		Shield_check($$renderer, { size: 14 });
		$$renderer.push(`<!----></span> <h2 class="text-lg font-bold text-foreground">3 Cam Kết Pháp Lý Cốt Lõi Của Povixa</h2></div> <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"><div class="rounded-xl border border-border/70 bg-background/60 p-4"><span class="font-mono text-xs font-bold text-primary">01. BẢO MẬT DỮ LIỆU TUYỆT ĐỐI</span> <p class="mt-2 text-xs leading-relaxed text-muted-foreground">Chúng tôi không bao giờ bán, cho thuê hoặc khai thác dữ liệu người dùng hay telemetry của bạn cho mục đích quảng cáo hoặc huấn luyện AI thương mại.</p></div> <div class="rounded-xl border border-border/70 bg-background/60 p-4"><span class="font-mono text-xs font-bold text-primary">02. QUYỀN TỰ CHỦ VĨNH VIỄN</span> <p class="mt-2 text-xs leading-relaxed text-muted-foreground">Toàn bộ mã nguồn Core Engine được cấp phép AGPL-3.0. Bạn có quyền xuất toàn bộ dữ liệu và chuyển đổi sang tự host trên máy chủ riêng bất kỳ lúc nào.</p></div> <div class="rounded-xl border border-border/70 bg-background/60 p-4"><span class="font-mono text-xs font-bold text-primary">03. MINH BẠCH VỀ CHI PHÍ</span> <p class="mt-2 text-xs leading-relaxed text-muted-foreground">Cam kết giới hạn hóa đơn trần (Capped fee guarantee). Không phát sinh phụ phí ẩn hoặc thay đổi điều khoản đơn phương làm ảnh hưởng hệ thống của bạn.</p></div></div></section>`);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map
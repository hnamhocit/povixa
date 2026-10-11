import { o as ensure_array_like, s as head, w as escape_html } from "../../../chunks/server.js";
import { n as Printer, r as Arrow_left, t as btn_print } from "../../../chunks/btn_print.js";
import { t as Clock } from "../../../chunks/clock.js";
import { t as effective_date } from "../../../chunks/effective_date.js";
//#region src/routes/sla/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const creditTiers = [
			{
				uptime: "< 99.99% và ≥ 99.9%",
				credit: "10% hóa đơn tháng"
			},
			{
				uptime: "< 99.9% và ≥ 99.0%",
				credit: "25% hóa đơn tháng"
			},
			{
				uptime: "< 99.0%",
				credit: "50% hóa đơn tháng"
			}
		];
		head("1xx3elh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Cam kết Mức Dịch vụ (SLA) — Povixa Legal</title>`);
			});
			$$renderer.push(`<meta name="description" content="Cam kết mức độ sẵn sàng dịch vụ 99.99% và chính sách bồi hoàn Service Credit của Povixa."/>`);
		});
		$$renderer.push(`<div class="mb-6 flex items-center justify-between border-b border-border/80 pb-4"><div class="flex items-center gap-2"><a href="/" class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">`);
		Arrow_left($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>Về tổng quan</span></a> <span class="text-muted-foreground">/</span> <span class="text-xs font-semibold text-foreground">SLA Agreement</span></div> <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs">`);
		Printer($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>${escape_html(btn_print())}</span></button></div> <div class="mb-8"><div class="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-primary mb-2">`);
		Clock($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>99.99% UPTIME COMMITMENT</span></div> <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Cam kết Mức Dịch vụ (Service Level Agreement - SLA)</h1> <p class="mt-2 text-xs text-muted-foreground font-mono">${escape_html(effective_date())}</p></div> <article class="space-y-8 text-sm leading-relaxed text-muted-foreground"><section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">1. Cam kết Tính Sẵn Sàng Hệ Thống</h2> <p>Povixa cam kết cung cấp thời gian hoạt động hàng tháng (Monthly Uptime Percentage) tối thiểu <strong>99.99%</strong> đối với các dịch vụ cốt lõi: Povixa ID Authentication, Remote Config Edge Evaluation, S3 Presigned Upload API và Notification Dispatcher.</p></section> <section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">2. Biểu Bồi Hoàn Tín Dụng Dịch Vụ (Service Credits)</h2> <div class="overflow-x-auto no-scrollbar"><table class="w-full text-left text-xs border border-border/80 rounded-xl overflow-hidden"><thead class="bg-muted text-foreground font-mono text-[11px]"><tr><th class="p-3">Thời gian hoạt động thực tế trong tháng</th><th class="p-3">Mức hoàn trả tín dụng dịch vụ</th></tr></thead><tbody class="divide-y divide-border/60"><!--[-->`);
		const each_array = ensure_array_like(creditTiers);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let tier = each_array[$$index];
			$$renderer.push(`<tr class="hover:bg-muted/30"><td class="p-3 font-mono text-foreground font-semibold">${escape_html(tier.uptime)}</td><td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">${escape_html(tier.credit)}</td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></section></article>`);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map
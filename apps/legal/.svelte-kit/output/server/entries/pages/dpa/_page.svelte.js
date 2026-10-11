import { s as head, w as escape_html } from "../../../chunks/server.js";
import { n as Printer, r as Arrow_left, t as btn_print } from "../../../chunks/btn_print.js";
import { t as Shield_check } from "../../../chunks/shield-check.js";
import { t as effective_date } from "../../../chunks/effective_date.js";
//#region src/routes/dpa/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1rn7ueo", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Thoả thuận Xử lý Dữ liệu (DPA) — Povixa Legal</title>`);
			});
			$$renderer.push(`<meta name="description" content="Thoả thuận xử lý dữ liệu GDPR Điều 28 và phụ lục bảo vệ dữ liệu doanh nghiệp của Povixa."/>`);
		});
		$$renderer.push(`<div class="mb-6 flex items-center justify-between border-b border-border/80 pb-4"><div class="flex items-center gap-2"><a href="/" class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">`);
		Arrow_left($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>Về tổng quan</span></a> <span class="text-muted-foreground">/</span> <span class="text-xs font-semibold text-foreground">Data Processing Addendum</span></div> <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs">`);
		Printer($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>${escape_html(btn_print())}</span></button></div> <div class="mb-8"><div class="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-primary mb-2">`);
		Shield_check($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>GDPR ARTICLE 28 COMPLIANCE</span></div> <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Thoả thuận Xử lý Dữ liệu (Data Processing Addendum - DPA)</h1> <p class="mt-2 text-xs text-muted-foreground font-mono">${escape_html(effective_date())}</p></div> <article class="space-y-8 text-sm leading-relaxed text-muted-foreground"><section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">1. Mục đích &amp; Tư cách Pháp lý</h2> <p>Thoả thuận Xử lý Dữ liệu này ("DPA") điều chỉnh việc xử lý Dữ liệu Cá nhân mà Khách hàng ủy thác cho Povixa trong quá trình sử dụng Povixa Cloud.</p> <p>Khách hàng đóng vai trò là <strong>Bên Kiểm Soát Dữ Liệu (Data Controller)</strong> và Povixa đóng vai trò là <strong>Bên Xử Lý Dữ Liệu (Data Processor)</strong> tuân theo các quy định của Quy định Bảo vệ Dữ liệu Chung của Châu Âu (GDPR).</p></section> <section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">2. Biện pháp Kỹ thuật &amp; An ninh Tổ chức (TOMs)</h2> <p>Povixa cam kết áp dụng và duy trì các biện pháp kỹ thuật tiên tiến nhằm đảm bảo mức độ bảo mật thích ứng với rủi ro:</p> <ul class="list-disc pl-5 space-y-2 text-xs"><li>Kiểm soát truy cập dựa trên vai trò phân quyền chi tiết (Granular RBAC) và xác thực đa yếu tố bắt buộc đối với mọi nhân sự kỹ thuật.</li> <li>Mã hóa toàn diện cơ sở dữ liệu với khóa quản lý riêng biệt tại từng cụm môi trường.</li> <li>Bảo vệ chống tấn công từ chối dịch vụ (DDoS) và lọc lưu lượng bất thường tại lớp Edge Router.</li> <li>Sao lưu tự động đa vùng (Multi-Region Replication) với thời gian khôi phục mục tiêu RPO &lt; 1 giờ và RTO &lt; 4 giờ.</li></ul></section> <section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">3. Thông báo Sự cố An ninh Dữ liệu</h2> <p>Trong trường hợp phát hiện bất kỳ sự cố rò rỉ dữ liệu hoặc truy cập trái phép nào làm ảnh hưởng đến dữ liệu cá nhân của khách hàng, Povixa cam kết thông báo cho khách hàng qua kênh liên hệ khẩn cấp trong vòng <strong>48 giờ</strong> kể từ thời điểm xác nhận sự cố, kèm theo báo cáo đánh giá tác động và biện pháp khắc phục.</p></section></article>`);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map
import { s as head, w as escape_html } from "../../../chunks/server.js";
import { n as Printer, r as Arrow_left, t as btn_print } from "../../../chunks/btn_print.js";
import { t as Lock } from "../../../chunks/lock.js";
import { t as effective_date } from "../../../chunks/effective_date.js";
//#region src/routes/privacy/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("7ke6fz", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Chính sách Quyền riêng tư (Privacy Policy) — Povixa Legal</title>`);
			});
			$$renderer.push(`<meta name="description" content="Chính sách bảo vệ dữ liệu cá nhân, quyền riêng tư và cam kết không bán dữ liệu của Povixa."/>`);
		});
		$$renderer.push(`<div class="mb-6 flex items-center justify-between border-b border-border/80 pb-4"><div class="flex items-center gap-2"><a href="/" class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">`);
		Arrow_left($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>Về tổng quan</span></a> <span class="text-muted-foreground">/</span> <span class="text-xs font-semibold text-foreground">Privacy Policy</span></div> <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted shadow-2xs">`);
		Printer($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>${escape_html(btn_print())}</span></button></div> <div class="mb-8"><div class="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-primary mb-2">`);
		Lock($$renderer, { size: 13 });
		$$renderer.push(`<!----> <span>PRIVACY DIRECTIVE • GDPR &amp; CCPA</span></div> <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Chính sách Quyền riêng tư &amp; Bảo vệ Dữ liệu</h1> <p class="mt-2 text-xs text-muted-foreground font-mono">${escape_html(effective_date())}</p></div> <article class="space-y-8 text-sm leading-relaxed text-muted-foreground"><section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">1. Triết lý Quyền riêng tư Cốt lõi</h2> <p>Povixa được xây dựng bởi các kỹ sư tin rằng quyền riêng tư là quyền cơ bản của con người và nhà phát triển. Chúng tôi tuân thủ các nguyên tắc:</p> <ul class="list-disc pl-5 space-y-1.5 text-xs"><li><strong>Thu thập tối thiểu (Data Minimization):</strong> Chỉ xử lý các trường dữ liệu cần thiết nhất để vận hành hệ thống xác thực và dịch vụ hạ tầng.</li> <li><strong>Không bán dữ liệu (Never Monitized):</strong> Tuyệt đối không bán dữ liệu, không chia sẻ với các nhà môi giới dữ liệu (data brokers) hay các mạng quảng cáo.</li> <li><strong>Mã hóa đầu cuối:</strong> Dữ liệu lưu trữ (at rest) được mã hóa AES-256; dữ liệu truyền tải (in transit) luôn được bảo vệ qua TLS 1.3 và chữ ký ed25519.</li></ul></section> <section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">2. Thông tin Chúng tôi Thu thập</h2> <p>Tùy thuộc vào cách bạn sử dụng Povixa, các dữ liệu có thể được xử lý bao gồm:</p> <ul class="list-disc pl-5 space-y-1.5 text-xs"><li><strong>Tài khoản &amp; Định danh:</strong> Email, tên người dùng, khóa công khai WebAuthn Passkey (chúng tôi không bao giờ lưu trữ khóa riêng tư sinh trắc học của bạn).</li> <li><strong>Thông tin Thanh toán:</strong> Được xử lý bảo mật trực tiếp bởi cổng thanh toán Stripe đạt chuẩn PCI-DSS Level 1. Chúng tôi không lưu trữ số thẻ ngân hàng.</li> <li><strong>Telemetry Hệ thống:</strong> Thời gian phản hồi, mã lỗi HTTP, dung lượng băng thông sử dụng nhằm mục đích giám sát độ ổn định và tính định mức tài nguyên.</li></ul></section> <section class="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-4"><h2 class="text-base font-bold text-foreground">3. Quyền của Bạn Theo Luật Bảo vệ Dữ liệu (GDPR / CCPA)</h2> <p>Bạn có toàn quyền thực hiện các yêu cầu pháp lý đối với dữ liệu của mình bất cứ lúc nào:</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"><div class="rounded-xl border border-border/70 bg-background/60 p-3"><strong class="text-foreground">Quyền Truy Cập &amp; Trích Xuất:</strong> Tải xuống toàn bộ bản ghi dữ liệu người dùng dưới định dạng JSON/CSV từ Povixa Console.</div> <div class="rounded-xl border border-border/70 bg-background/60 p-3"><strong class="text-foreground">Quyền Được Quên Lãng:</strong> Xóa vĩnh viễn tài khoản và hủy toàn bộ dữ liệu liên quan khỏi các cụm lưu trữ trong vòng 30 ngày.</div></div></section></article>`);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map
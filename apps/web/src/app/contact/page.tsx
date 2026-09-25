import { ArrowUpRight, FileText, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Liên hệ · povixa studio",
  description:
    "Gửi tín hiệu cho studio povixa. Phản hồi trong 1–2 ngày làm việc.",
};

export default function ContactPage() {
  return (
    <section className="relative border-t border-border bg-background">
      <div
        className="rm-grid-overlay pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        {/* HUD header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 rm-mono">
              <span className="rm-mono rm-mono-primary">// CHANNEL 01</span>
              <span className="h-[1px] w-10 bg-[var(--ink-line)]" />
              <span>CONTACT · povixa STUDIO</span>
            </div>
            <h1 className="rm-heading mt-4 text-5xl md:text-7xl">
              Mở kênh
              <br />
              <span className="text-muted-foreground">liên lạc.</span>
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-foreground/60">
            Không cần brief hoàn chỉnh. Một vài câu mô tả thứ đang làm bạn mất
            ngủ là đủ để bắt đầu — chúng tôi sẽ phản hồi qua email trong vòng 24
            giờ.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Form */}
          <ContactForm />

          {/* Intel sidebar */}
          <aside className="space-y-4">
            {/* Quick comms */}
            <div className="rm-card p-6">
              <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
                <span className="rm-mono rm-mono-primary">// INTEL</span>
                <span className="rm-serial ml-auto">COMMS · 01</span>
              </div>
              <ul className="space-y-4">
                <IntelRow
                  icon={<Mail className="h-4 w-4" />}
                  label="PRIMARY"
                  href={`mailto:${site.email}`}
                  value={site.email}
                />
                <IntelRow
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="SUPPORT"
                  href={`mailto:${site.supportEmail}`}
                  value={site.supportEmail}
                />
              </ul>
            </div>

            {/* Commitments */}
            <div className="rm-card p-6">
              <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
                <span className="rm-mono rm-mono-primary">// PROTOCOL</span>
                <span className="rm-serial ml-auto">COMMS · 02</span>
              </div>
              <ul className="space-y-3 text-sm text-foreground/70">
                {[
                  "Phản hồi trong 1–2 ngày làm việc.",
                  "Trao đổi rõ vấn đề trước khi báo giá.",
                  "Không hứa những gì không làm được.",
                  "NDA được ký trước khi trao đổi tài liệu mật.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] h-[2px] w-3 shrink-0 bg-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="rm-card p-6">
              <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
                <span className="rm-mono rm-mono-primary">// QUICK ACCESS</span>
                <span className="rm-serial ml-auto">COMMS · 03</span>
              </div>
              <ul className="space-y-1">
                {[
                  { href: site.docsUrl, label: "Tài liệu kỹ thuật" },
                  { href: "/support", label: "Hỗ trợ & FAQ" },
                  { href: site.legalUrl, label: "Điều khoản & Chính sách" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group flex items-center justify-between py-2.5 px-3 -mx-3 text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <span>{l.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Serial footer */}
            <div className="rm-serial text-center pt-2">
              · {site.name?.toUpperCase() || "POVIXA"} · EST. HO CHI MINH CITY ·
              UTC+7 ·
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function IntelRow({
  icon,
  label,
  href,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  value: string;
}) {
  return (
    <li>
      <div className="rm-mono text-foreground/40">{label}</div>
      <a
        href={href}
        className="group mt-1 flex items-center gap-3 text-foreground transition hover:text-primary"
      >
        <span className="flex h-8 w-8 items-center justify-center border border-border bg-muted text-foreground/60 transition group-hover:border-primary group-hover:text-primary">
          {icon}
        </span>
        <span className="font-mono text-sm break-all">{value}</span>
      </a>
    </li>
  );
}

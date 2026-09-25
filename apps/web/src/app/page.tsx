import {
  ArrowRight,
  BookOpen,
  CloudCog,
  Code,
  Compass,
  Component,
  Fingerprint,
  Hammer,
  Hand,
  Lock,
  type LucideIcon,
  Monitor,
  PenTool,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { HeroStage } from "@/components/hero-stage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { news, team } from "@/lib/data/site-content";
import { site } from "@/lib/site";

const capabilities: {
  title: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  serial: string;
}[] = [
  {
    serial: "CPB-01",
    title: "Web & Product Frontend",
    desc: "Landing page, SaaS, dashboard, e-commerce, internal tool. Hiệu năng, accessibility, bản sắc thương hiệu.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    icon: Monitor,
  },
  {
    serial: "CPB-02",
    title: "Backend & API",
    desc: "Authentication, database, REST/GraphQL, payment, notification, integration và nghiệp vụ vận hành.",
    tags: ["Node.js", "PostgreSQL", "REST", "GraphQL"],
    icon: Server,
  },
  {
    serial: "CPB-03",
    title: "Mobile",
    desc: "iOS/Android với React Native/Expo hoặc native khi cần. Tái dùng logic, design system và API với web.",
    tags: ["React Native", "Expo", "iOS", "Android"],
    icon: Smartphone,
  },
  {
    serial: "CPB-04",
    title: "DevOps & Infrastructure",
    desc: "Docker, CI/CD, môi trường, deploy, monitoring, logging, backup và khả năng scale.",
    tags: ["Docker", "CI/CD", "Monitoring", "Cloud"],
    icon: CloudCog,
  },
  {
    serial: "CPB-05",
    title: "Design System & UX",
    desc: "Token, component, pattern, motion, responsive và tiêu chuẩn giao diện cho nhiều sản phẩm.",
    tags: ["Tokens", "Components", "Motion", "A11y"],
    icon: Component,
  },
  {
    serial: "CPB-06",
    title: "Docs, Support & Operations",
    desc: "Tài liệu, help center, legal pages, admin, ticket, knowledge base và quy trình nội bộ.",
    tags: ["Docs", "Support", "Legal", "Admin"],
    icon: BookOpen,
  },
];

const proofs = [
  {
    label: "Hệ sinh thái nội bộ",
    title: "povixa platform",
    bullets: [
      "web thương hiệu cho studio",
      "admin vận hành dự án và nội dung",
      "auth/user tập trung cho nhiều surface",
      "docs, support và legal tách riêng",
    ],
  },
  {
    label: "Năng lực kỹ thuật",
    title: "Fullstack delivery",
    bullets: [
      "frontend production-grade với Next.js/React",
      "backend API, database và authentication",
      "mobile-ready architecture với React Native/Expo",
      "CI/CD, monitoring và quy trình deploy",
    ],
  },
  {
    label: "Định hướng thiết kế",
    title: "Anti-template UI",
    bullets: [
      "editorial typography thay vì card grid vô hồn",
      "semantic token cho color, radius, motion",
      "tactile interaction: hover, active, focus rõ",
      "accessibility và reduced motion làm chuẩn",
    ],
  },
];

const metrics = [
  { value: "5", unit: "SURFACES", label: "surface nội bộ" },
  { value: "6", unit: "TEAMS", label: "nhóm năng lực" },
  { value: "1", unit: "CORE", label: "auth core" },
  { value: "3", unit: "PLATFORMS", label: "nền tảng: web / mobile / backend" },
];

const standards = [
  {
    title: "Bảo mật mặc định",
    desc: "Mã hóa dữ liệu, xác thực đa tầng (MFA), và kiến trúc Zero-Trust bảo vệ an toàn từ API đến Database.",
    icon: Lock,
  },
  {
    title: "Hiệu năng cực hạn",
    desc: "Core Web Vitals luôn ở mức xanh. Tối ưu Server-Side Rendering (SSR) và Edge Caching toàn cầu.",
    icon: Zap,
  },
  {
    title: "Sẵn sàng mở rộng",
    desc: "Hạ tầng Dockerized & CI/CD tự động, dễ dàng scale từ 100 đến 1.000.000 người dùng mà không gãy hệ thống.",
    icon: ShieldCheck,
  },
];

const process: {
  title: string;
  desc: string;
  icon: LucideIcon;
  code: string;
}[] = [
  {
    code: "PH.01",
    title: "Làm rõ ý tưởng",
    desc: "Hiểu vấn đề, người dùng, giới hạn kỹ thuật và mục tiêu kinh doanh.",
    icon: Compass,
  },
  {
    code: "PH.02",
    title: "Thiết kế trải nghiệm",
    desc: "Xây flow, wireframe, visual direction và prototype tương tác.",
    icon: PenTool,
  },
  {
    code: "PH.03",
    title: "Hiện thực hóa",
    desc: "Phát triển sản phẩm với kiến trúc sạch, component hóa và tối ưu hiệu năng.",
    icon: Code,
  },
  {
    code: "PH.04",
    title: "Hoàn thiện & vận hành",
    desc: "Test, polish, deploy, tài liệu hóa, hỗ trợ và iterate tiếp.",
    icon: Rocket,
  },
];

const pillars: {
  title: string;
  desc: string;
  icon: LucideIcon;
  num: string;
}[] = [
  {
    num: "01",
    title: "Trong tầm tay",
    desc: "Khoảng cách giữa ý tưởng trong đầu và sản phẩm chạy thật chỉ là bắt tay vào làm.",
    icon: Hand,
  },
  {
    num: "02",
    title: "Phá khuôn mẫu",
    desc: "Nói không với template công nghiệp phẳng lì và vô hồn. Mọi chi tiết đều phải có lý do.",
    icon: Hammer,
  },
  {
    num: "03",
    title: "Đã khi chạm",
    desc: "Công nghệ không đo bằng độ phức tạp, mà bằng cảm giác thỏa mãn khi thực sự sử dụng.",
    icon: Fingerprint,
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <HeroStage />

      {/* 2. STANDARD COMPLIANCE — dark strip */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-10 flex items-center gap-4">
            <span className="rm-mono rm-mono-primary">COMPLIANCE</span>
            <span className="h-[1px] flex-1 bg-[var(--ink-line)]" />
            <span className="rm-mono">TIER-1 · SECURITY</span>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {standards.map((std, i) => (
              <div
                key={std.title}
                className="flex items-start gap-5 border-l-2 border-border pl-6 transition hover:border-primary"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-card text-primary">
                  <std.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="rm-mono">0{i + 1} / SPEC</span>
                  <h3 className="font-condensed mt-2 text-lg font-bold uppercase tracking-wider text-foreground">
                    {std.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="rm-mono rm-mono-primary">
                // 01 — CAPABILITIES
              </span>
              <h2 className="rm-heading mt-4 text-5xl md:text-7xl">
                Chúng tôi
                <br />
                làm được gì?
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-foreground/60">
              Không chỉ frontend. povixa cover từ ý tưởng, giao diện, API,
              mobile đến hạ tầng vận hành.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item.title} className="rm-card relative p-8">
                <div className="mb-8 flex items-center justify-between">
                  <span className="rm-serial">{item.serial}</span>
                  <span className="rm-crosshair h-4 w-4" />
                </div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center border border-border bg-muted text-primary">
                  <item.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="rm-heading text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                  {item.desc}
                </p>
                <div className="mt-8 border-t border-border pt-4">
                  <div className="rm-mono">STACK /</div>
                  <div className="mt-2 font-mono text-[11px] text-foreground/80">
                    {item.tags.join(" · ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. METRICS — HUD */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="mb-16">
            <span className="rm-mono rm-mono-primary">// 02 — EVIDENCE</span>
            <h2 className="rm-heading mt-4 text-5xl md:text-7xl">
              Không cần logo đối tác.
              <br />
              <span className="text-muted-foreground">Đây là thứ thật.</span>
            </h2>
          </div>

          <div className="grid gap-0 border border-border sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`relative p-8 transition hover:bg-muted ${
                  i < metrics.length - 1
                    ? "lg:border-r lg:border-border"
                    : ""
                } ${i % 2 === 0 && i < metrics.length - 2 ? "border-b border-border sm:border-b-0 sm:border-r" : ""}`}
              >
                <span className="rm-mono">METRIC 0{i + 1}</span>
                <div className="rm-num mt-6 text-[96px] md:text-[128px]">
                  {m.value}
                  <span className="rm-num-unit">{m.unit}</span>
                </div>
                <div className="mt-4 text-sm uppercase tracking-wider text-foreground/60">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {proofs.map((p, i) => (
              <div key={p.title} className="rm-card relative p-8">
                <span className="rm-mono rm-mono-primary">PROOF 0{i + 1}</span>
                <h3 className="rm-heading mt-4 text-xl">{p.title}</h3>
                <ul className="mt-6 grid gap-3 text-sm text-foreground/70">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-1 h-1 w-3 shrink-0 bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS — horizontal timeline */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="rm-mono rm-mono-primary">// 03 — WORKFLOW</span>
              <h2 className="rm-heading mt-4 text-5xl md:text-7xl">
                Pipeline.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-foreground/60">
              Quy trình khép kín từ bản phác thảo đầu tiên tới khi sản phẩm chạy
              ổn định trên hạ tầng production.
            </p>
          </div>

          <div className="relative">
            {/* connector */}
            <div className="absolute left-0 right-0 top-7 hidden h-[1px] bg-[var(--ink-line)] md:block" />
            <div className="grid gap-8 md:grid-cols-4">
              {process.map((s, i) => (
                <div key={s.title} className="relative">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center border-2 border-border bg-background text-primary transition-all hover:border-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-8">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="rm-mono rm-mono-primary">{s.code}</span>
                      <span className="rm-serial">STEP {i + 1}/4</span>
                    </div>
                    <h3 className="rm-heading mt-3 text-xl">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. MANIFESTO — pillars */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="rm-mono rm-mono-primary">// 04 — MANIFESTO</span>
              <h2 className="rm-heading mt-4 text-5xl md:text-7xl">
                Ba điều
                <br />
                không đổi.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/60">
                Những nguyên tắc kỹ thuật và thẩm mỹ định hình cách povixa viết
                code, dựng layout và bàn giao sản phẩm.
              </p>
            </div>

            <div className="space-y-0 border-t border-border">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="group border-b border-border py-10 transition-colors hover:bg-muted px-4 -mx-4"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="rm-mono rm-mono-primary">/ {p.num}</span>
                    <span className="rm-mono">PRINCIPLE</span>
                  </div>
                  <h3 className="rm-heading mt-4 text-3xl md:text-4xl group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-foreground/60">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWS */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="rm-mono rm-mono-primary">// 05 — SIGNAL</span>
              <h2 className="rm-heading mt-4 text-5xl md:text-7xl">
                Chúng tôi viết gì
              </h2>
            </div>
            <Link
              href="/news"
              className="rm-btn-ghost !h-12 !px-6 !text-[11px]"
            >
              Tất cả bài viết <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {news.slice(0, 3).map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="rm-card group flex flex-col p-8"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="rm-mono rm-mono-primary">
                    {n.tag.toUpperCase()}
                  </span>
                  <span className="rm-mono">{n.date}</span>
                </div>
                <h3 className="rm-heading text-2xl leading-tight group-hover:text-primary transition-colors">
                  {n.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                  {n.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 border-t border-border pt-5 rm-mono">
                  READ MORE <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CAREERS */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-4 py-2">
                <span className="rm-pulse-dot" />
                <span className="rm-mono rm-mono-signal">
                  WE&apos;RE HIRING
                </span>
              </div>
              <h2 className="rm-heading text-4xl md:text-6xl leading-[0.95]">
                Cùng nhau xây dựng
                <br />
                <span className="text-muted-foreground">
                  những sản phẩm tử tế.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/60">
                povixa không chuộng văn hóa cày cuốc (hustle culture). Chúng tôi
                thích những kỹ sư bị ám ảnh bởi chất lượng code, những designer
                hiểu về component, và những con người muốn làm ra sản phẩm có
                hồn.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/careers" className="rm-btn-primary">
                  Xem vị trí mở <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/about" className="rm-btn-ghost">
                  Đội ngũ hiện tại
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  role: "Senior Frontend Engineer",
                  type: "Remote / HCM",
                  status: "HOT",
                },
                {
                  role: "Product Designer (UI/UX)",
                  type: "Remote",
                  status: "OPEN",
                },
                { role: "Backend Developer", type: "HCM", status: "SOON" },
              ].map((job, idx) => (
                <Link
                  key={idx}
                  href="/careers"
                  className="rm-card group flex items-center justify-between p-6"
                >
                  <div>
                    <span className="rm-mono">
                      JOB {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h4 className="rm-heading mt-2 text-lg group-hover:text-primary transition-colors">
                      {job.role}
                    </h4>
                    <p className="mt-1 rm-mono text-foreground/60">{job.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rm-mono ${job.status === "HOT" ? "rm-mono-signal" : "rm-mono-primary"}`}
                    >
                      {job.status}
                    </span>
                    <ArrowRight className="h-5 w-5 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-32 text-center lg:px-8">
          <span className="rm-mono rm-mono-primary">// CONTACT</span>
          <h2 className="rm-heading mt-6 text-6xl md:text-8xl [text-wrap:balance]">
            Bạn đang
            <br />
            có ý tưởng?
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/60">
            Hãy bắt đầu bằng một cuộc trao đổi. Chỉ cần mô tả vấn đề — chúng tôi
            sẽ giúp bạn hình dung sản phẩm có thể trở thành gì.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rm-btn-primary">
              Gửi yêu cầu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/support" className="rm-btn-ghost">
              Câu hỏi thường gặp
            </Link>
          </div>
          <div className="mt-16 rm-serial">
            Response within 24 hours · Ho Chi Minh City · UTC+7
          </div>
        </div>
      </section>
    </>
  );
}

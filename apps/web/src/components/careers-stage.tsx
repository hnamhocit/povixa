"use client";

import {
  Armchair,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  FileSearch,
  GraduationCap,
  Handshake,
  HeartPulse,
  Laptop,
  type LucideIcon,
  Minus,
  Plane,
  Plus,
  Send,
  Ticket,
  Users,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { site } from "@/lib/site";

/* ================= data ================= */

type JobStatus = "HOT" | "OPEN" | "SOON";

type Job = {
  serial: string;
  title: string;
  status: JobStatus;
  location: string;
  type: string;
  salary: string;
  stack: string[];
  mission: string;
  duties: string[];
  requires: string[];
  plus: string[];
};

const JOBS: Job[] = [
  {
    serial: "JOB-01",
    title: "Senior Frontend Engineer",
    status: "HOT",
    location: "Remote / HCM",
    type: "Full-time",
    salary: "40 – 70M VND",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Radix"],
    mission:
      "Sở hữu chất lượng giao diện trên mọi surface web của povixa và khách hàng: từ landing tốc độ cao tới dashboard nghiệp vụ nặng dữ liệu.",
    duties: [
      "Xây UI production-grade bằng Next.js App Router và React Server Components.",
      "Thiết kế, bảo trì design system token + component dùng chung nhiều brand.",
      "Tối ưu Core Web Vitals, accessibility và chuyển động có chủ đích.",
      "Review code, viết test, chịu trách nhiệm tới khi feature sống khỏe.",
    ],
    requires: [
      "4+ năm React/TypeScript với sản phẩm production thật.",
      "Hiểu sâu CSS hiện đại: Tailwind, container queries, cascade layers.",
      "Có mắt thẩm mỹ — phân biệt được spacing 4px và 6px.",
      "Đọc viết tiếng Anh kỹ thuật ổn.",
    ],
    plus: [
      "Kinh nghiệm React Native/Expo.",
      "Từng làm design system multi-brand.",
      "Biết viết tài liệu kỹ thuật dễ đọc.",
    ],
  },
  {
    serial: "JOB-02",
    title: "Product Designer (UI/UX)",
    status: "OPEN",
    location: "Remote",
    type: "Full-time",
    salary: "30 – 55M VND",
    stack: ["Figma", "Prototyping", "Design Tokens", "Motion"],
    mission:
      "Định hình trải nghiệm và ngôn ngữ thị giác cho sản phẩm khách hàng lẫn hệ sinh thái nội bộ povixa.",
    duties: [
      "Nghiên cứu người dùng, dựng flow, wireframe và prototype tương tác.",
      "Thiết kế UI hệ thống: token, component, state và motion spec.",
      "Bắt tay trực tiếp với engineer để bản dựng khớp bản thiết kế.",
      "Bảo vệ quyết định thiết kế bằng lý do, không bằng cảm tính.",
    ],
    requires: [
      "3+ năm thiết kế sản phẩm số, portfolio có case study đủ ngữ cảnh.",
      "Thành thạo Figma: variables, component properties, dev mode.",
      "Hiểu giới hạn implementation, biết khi nào nên thoả hiệp.",
      "Tư duy hệ thống thay vì tư duy màn hình đơn lẻ.",
    ],
    plus: [
      "Biết motion design (Rive / After Effects).",
      "Có nền tảng frontend cơ bản.",
      "Từng vận hành design system.",
    ],
  },
  {
    serial: "JOB-03",
    title: "Backend Developer",
    status: "SOON",
    location: "HCM",
    type: "Full-time",
    salary: "35 – 60M VND",
    stack: ["Node.js", "PostgreSQL", "REST", "GraphQL", "Redis"],
    mission:
      "Xây lõi API, auth và dữ liệu dùng chung cho nhiều surface của nền tảng povixa.",
    duties: [
      "Thiết kế schema PostgreSQL và API REST/GraphQL rõ ràng, có versioning.",
      "Xây auth tập trung: session, MFA, phân quyền đa tầng.",
      "Tích hợp payment, notification, queue và job nền.",
      "Viết migration an toàn cùng chiến lược backup/restore.",
    ],
    requires: [
      "3+ năm Node.js (hoặc Go/Java) với hệ production thật.",
      "Hiểu index, transaction và cách query plan hoạt động.",
      "Từng thiết kế API phục vụ nhiều client (web + mobile).",
      "Cẩn thận với dữ liệu người dùng như dữ liệu của chính mình.",
    ],
    plus: [
      "PostgreSQL trình nâng cao.",
      "Kinh nghiệm Redis / hàng đợi.",
      "Từng làm hệ multi-tenant.",
    ],
  },
  {
    serial: "JOB-04",
    title: "DevOps / Platform Engineer",
    status: "OPEN",
    location: "Remote",
    type: "Full-time",
    salary: "40 – 65M VND",
    stack: ["Docker", "GitHub Actions", "Terraform", "Grafana"],
    mission:
      "Giữ hạ tầng povixa nhanh, ổn định và nhàm chán — theo nghĩa tốt nhất của từ này.",
    duties: [
      "Vận hành CI/CD và preview deploy cho mọi pull request.",
      "Quản lý môi trường Docker/K8s hoặc serverless tuỳ dự án.",
      "Dựng monitoring, logging, alerting có tín hiệu thật, không ồn.",
      "Viết runbook và diễn tập incident định kỳ.",
    ],
    requires: [
      "3+ năm vận hành hệ production có người dùng thật.",
      "Thành thạo Docker và CI/CD (GitHub Actions hoặc tương đương).",
      "Hiểu networking nền: DNS, TLS, CDN, reverse proxy.",
      "Bình tĩnh khi incident, giao tiếp rõ ràng lúc đang cháy.",
    ],
    plus: [
      "Terraform / IaC.",
      "Kubernetes.",
      "Kinh nghiệm tối ưu chi phí cloud.",
    ],
  },
];

const CULTURE = [
  {
    num: "01",
    title: "Chất lượng là tiến độ",
    desc: "Ship chậm hơn một nhịp còn hơn ship thứ mình không dám dùng. Deadline quan trọng, nhưng niềm tin quan trọng hơn.",
  },
  {
    num: "02",
    title: "Không hustle culture",
    desc: "Không OT mặc định, không tin nhắn lúc 23h, on-call luôn có compensations. Nghỉ là nghỉ thật.",
  },
  {
    num: "03",
    title: "Async trước, meeting sau",
    desc: "Mọi thứ được viết ra trước. Meeting chỉ để chốt và gỡ rối — trung bình 3 giờ họp mỗi tuần.",
  },
  {
    num: "04",
    title: "Ownership trọn vòng",
    desc: "Người viết ra nó là người vận hành nó. Không có đội đứng sau dọn rác.",
  },
  {
    num: "05",
    title: "Feedback bọc giáp",
    desc: "Review thẳng vào việc, không vòng vo, không công kích người. Code và design được review như nhau.",
  },
];

const BENEFITS: {
  serial: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    serial: "BEN-01",
    title: "Loadout chuẩn",
    desc: "MacBook M-series hoặc máy Windows/Linux theo tay bạn, kèm màn hình 27–32 inch.",
    icon: Laptop,
  },
  {
    serial: "BEN-02",
    title: "Góc làm việc",
    desc: "Budget ghế công thái học và bàn khi làm remote, thanh toán thẳng không hỏi lý do.",
    icon: Armchair,
  },
  {
    serial: "BEN-03",
    title: "Học tập",
    desc: "12 triệu mỗi năm cho sách, khoá học, chứng chỉ — không cần duyệt nội dung.",
    icon: GraduationCap,
  },
  {
    serial: "BEN-04",
    title: "Conference",
    desc: "1 vé conference trong nước mỗi năm; slot quốc tế do team cùng vote.",
    icon: Ticket,
  },
  {
    serial: "BEN-05",
    title: "Sức khoẻ",
    desc: "Bảo hiểm sức khoẻ mở rộng và khám định kỳ hằng năm cho bạn lẫn người thân.",
    icon: HeartPulse,
  },
  {
    serial: "BEN-06",
    title: "Retreat",
    desc: "2 chuyến team retreat mỗi năm — đi để ngồi gần nhau thật, không để check-in.",
    icon: Plane,
  },
];

const PIPELINE: {
  code: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    code: "HR.01",
    title: "Gửi tín hiệu",
    desc: "CV hoặc portfolio + vài dòng kể bạn đang mày mò gì gần đây. Không cần cover letter khuôn mẫu.",
    icon: Send,
  },
  {
    code: "HR.02",
    title: "Sàng lọc async",
    desc: "Call 30 phút làm rõ kỳ vọng hai bên. Bài tập nhỏ (nếu có) luôn được trả phí, tối đa 3 giờ.",
    icon: FileSearch,
  },
  {
    code: "HR.03",
    title: "Pairing session",
    desc: "90 phút code hoặc design cùng một lead trên repo thật. Không leetcode, không whiteboard.",
    icon: Users,
  },
  {
    code: "HR.04",
    title: "Talk & fit",
    desc: "Trao đổi với founder về cách làm việc, kỳ vọng, và cả những thứ bạn muốn tránh.",
    icon: Handshake,
  },
  {
    code: "HR.05",
    title: "Offer trong 48h",
    desc: "Quyết định nhanh, lương nằm trong khung niêm yết, không ép deadline ký.",
    icon: BadgeCheck,
  },
];

const FAQ = [
  {
    q: "Remote thật hay remote nửa vời?",
    a: "Remote thật. Ritual, tài liệu và quyết định đều diễn ra async. Lên hub khi bạn muốn, không phải khi bị bắt.",
  },
  {
    q: "Thử việc bao lâu, lương tính thế nào?",
    a: "2 tháng thử việc hưởng 100% lương và full loadout thiết bị từ ngày đầu tiên.",
  },
  {
    q: "Khung lương có thật sự minh bạch?",
    a: "Có. Mọi slot đều niêm yết khung công khai như bạn thấy ở trên. Offer luôn nằm trong khung, không deal ngầm.",
  },
  {
    q: "Ứng tuyển trượt có được apply lại?",
    a: "Sau 6 tháng, kèm feedback cụ thể từ lần trước. Nhiều người trong team hiện tại từng trượt lần một.",
  },
];

/* ================= primitives ================= */

function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative border-t border-border bg-background ${className}`}
    >
      <div
        className="rm-grid-overlay pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function SectionHead({
  code,
  title,
  outline,
  desc,
}: {
  code: string;
  title: string;
  outline?: string;
  desc?: string;
}) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
      <div>
        <span className="rm-mono rm-mono-primary">{code}</span>
        <h2 className="rm-heading rm-title-hero mt-4 text-5xl md:text-7xl">
          {title}
          {outline && (
            <>
              <br />
              <span className="rm-outline">{outline}</span>
            </>
          )}
        </h2>
      </div>
      {desc && (
        <p className="max-w-md text-sm leading-relaxed text-foreground/60">{desc}</p>
      )}
    </div>
  );
}

function StatusChip({ status }: { status: JobStatus }) {
  if (status === "HOT")
    return (
      <span className="inline-flex shrink-0 items-center gap-2 border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-3 py-1.5">
        <span className="rm-pulse-dot" />
        <span className="rm-mono rm-mono-signal">HOT</span>
      </span>
    );
  if (status === "OPEN")
    return (
      <span className="inline-flex shrink-0 items-center border border-primary/40 bg-primary/10 px-3 py-1.5">
        <span className="rm-mono rm-mono-primary">OPEN</span>
      </span>
    );
  return (
    <span className="inline-flex shrink-0 items-center border border-[var(--ink-hi)] px-3 py-1.5">
      <span className="rm-mono">SOON</span>
    </span>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-foreground/70">
      <span className="mt-[9px] h-[2px] w-3 shrink-0 bg-primary" />
      <span>{children}</span>
    </li>
  );
}

/* ================= job accordion ================= */

function JobCard({
  job,
  open,
  onToggle,
}: {
  job: Job;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`rm-card group ${open ? "!bg-muted" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-5 p-6 text-left md:gap-8 md:p-8"
      >
        <div className="hidden shrink-0 flex-col items-center gap-2 sm:flex">
          <span className="rm-crosshair h-4 w-4" />
          <span className="rm-serial [writing-mode:vertical-rl]">
            {job.serial}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`rm-heading text-2xl transition-colors md:text-3xl ${open ? "text-primary" : "group-hover:text-primary"}`}
          >
            {job.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 rm-mono text-foreground/50">
            <span>{job.location}</span>
            <span>{job.type}</span>
            <span className="text-foreground/80">{job.salary}</span>
          </div>
        </div>
        <StatusChip status={job.status} />
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-foreground/40 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-10 border-t border-border p-6 md:grid-cols-[1.15fr_1fr] md:p-8">
            <div>
              <div className="rm-mono rm-mono-primary">// MISSION BRIEF</div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {job.mission}
              </p>
              <div className="rm-mono mt-8">// YOU WILL</div>
              <ul className="mt-4 grid gap-3">
                {job.duties.map((d) => (
                  <Bullet key={d}>{d}</Bullet>
                ))}
              </ul>
            </div>
            <div>
              <div className="rm-mono">// YOU HAVE</div>
              <ul className="mt-4 grid gap-3">
                {job.requires.map((r) => (
                  <Bullet key={r}>{r}</Bullet>
                ))}
              </ul>
              <div className="rm-mono mt-8">// BONUS POINTS</div>
              <ul className="mt-4 grid gap-3">
                {job.plus.map((p) => (
                  <Bullet key={p}>{p}</Bullet>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6 md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`[${job.serial}] ${job.title}`)}`}
                className="rm-btn-primary !h-12 !px-6 !text-[11px]"
              >
                ỨNG TUYỂN SLOT NÀY <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= page ================= */

export function CareersStage() {
  const [openJob, setOpenJob] = useState<string | null>("JOB-01");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const openSlots = JOBS.filter((j) => j.status !== "SOON").length;

  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(55% 45% at 70% 40%, color-mix(in oklab, var(--signal) 12%, transparent), transparent 70%)",
          }}
        />
        <span className="rm-scanline" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-32">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-3 border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-4 py-2">
              <span className="rm-pulse-dot" />
              <span className="rm-mono rm-mono-signal">
                WE&apos;RE HIRING · {openSlots} SLOTS OPEN
              </span>
            </span>
            <span className="rm-serial">
              SN/HR-{new Date().getFullYear()} · CREW MANIFEST
            </span>
          </div>

          <h1 className="rm-heading rm-title-hero mt-8 text-6xl md:text-8xl">
            <span className="block">CHỌN SLOT.</span>
            <span className="block">BẬT MÁY.</span>
            <span className="rm-outline block">LÀM ĐIỀU HAY.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/60">
            povixa tuyển người như tuyển linh kiện cho một cỗ máy: khớp văn hoá,
            đủ tiêu chuẩn, chạy bền. Không hustle, không chính trị, không họp vô
            nghĩa — chỉ có sản phẩm tử tế và đồng đội đáng tin.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#slots" className="rm-btn-primary">
              XEM VỊ TRÍ MỞ <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("[OPEN] Ứng tuyển tự do")}`}
              className="rm-btn-ghost"
            >
              GỬI OPEN APPLICATION
            </a>
          </div>

          <div className="rm-rule mt-16 grid grid-cols-2 gap-8 pt-8 sm:grid-cols-4">
            {[
              { v: String(openSlots), u: "SLOTS", l: "vị trí đang mở" },
              { v: "100", u: "%", l: "remote-friendly, lên hub khi muốn" },
              { v: "48", u: "H", l: "turnaround offer sau bước cuối" },
              { v: "0", u: "LEETCODE", l: "bài thuật toán trong phỏng vấn" },
            ].map((m) => (
              <div key={m.l}>
                <div className="rm-mono">{m.l.toUpperCase()}</div>
                <div className="rm-num mt-3 text-6xl md:text-7xl">
                  {m.v}
                  <span className="rm-num-unit">{m.u}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. OPEN SLOTS ===== */}
      <SectionShell id="slots">
        <SectionHead
          code="// 01 — OPEN SLOTS"
          title="Bảng slot."
          outline="Khung lương niêm yết."
          desc="Mở slot để xem mission brief, trách nhiệm và yêu cầu. Bấm ứng tuyển để mail tự gắn mã job."
        />
        <div className="grid gap-5">
          {JOBS.map((job) => (
            <JobCard
              key={job.serial}
              job={job}
              open={openJob === job.serial}
              onToggle={() =>
                setOpenJob(openJob === job.serial ? null : job.serial)
              }
            />
          ))}
        </div>
      </SectionShell>

      {/* ===== 3. OPERATING SYSTEM ===== */}
      <SectionShell>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="rm-mono rm-mono-primary">
              // 02 — OPERATING SYSTEM
            </span>
            <h2 className="rm-heading rm-title-hero mt-4 text-5xl md:text-7xl">
              Cách bọn mình
              <br />
              <span className="rm-outline">vận hành.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/60">
              Năm nguyên tắc không đàm phán. Nếu đọc xong thấy gai mắt ở điều
              nào, có lẽ hai bên nên tiết kiệm thời gian cho nhau.
            </p>
          </div>
          <div className="space-y-0 border-t border-border">
            {CULTURE.map((c) => (
              <div
                key={c.num}
                className="group -mx-4 border-b border-border px-4 py-9 transition-colors hover:bg-muted"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="rm-mono rm-mono-primary">/ {c.num}</span>
                  <span className="rm-mono">PRINCIPLE</span>
                </div>
                <h3 className="rm-heading mt-3 text-2xl transition-colors group-hover:text-primary md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* ===== 4. LOADOUT ===== */}
      <SectionShell>
        <SectionHead
          code="// 03 — LOADOUT"
          title="Trang bị tiêu chuẩn."
          desc="Không phải phúc lợi khoe cho đẹp. Đây là những thứ được ghi trong offer letter."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.serial} className="rm-card relative p-8">
              <div className="mb-8 flex items-center justify-between">
                <span className="rm-serial">{b.serial}</span>
                <span className="rm-crosshair h-4 w-4" />
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-border bg-muted text-primary">
                <b.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="rm-heading text-2xl">{b.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ===== 5. PIPELINE ===== */}
      <SectionShell>
        <SectionHead
          code="// 04 — PIPELINE"
          title="Năm bước."
          outline="Không bước ẩn."
          desc="Trung bình 10 ngày làm việc từ tín hiệu đầu tiên tới offer. Chậm nhất là lịch của bạn, không phải của bọn mình."
        />
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-7 hidden h-[1px] bg-[var(--ink-line)] lg:block"
            aria-hidden
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {PIPELINE.map((s, i) => (
              <div key={s.code} className="relative">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center border-2 border-border bg-background text-primary transition-all hover:border-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="rm-mono rm-mono-primary">{s.code}</span>
                    <span className="rm-serial">STEP {i + 1}/5</span>
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
      </SectionShell>

      {/* ===== 6. FAQ + OPEN APPLICATION ===== */}
      <SectionShell>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="rm-mono rm-mono-primary">// 05 — FAQ</span>
            <h2 className="rm-heading rm-title-hero mt-4 text-4xl md:text-6xl">
              Hỏi thẳng.
            </h2>
            <div className="mt-10 border-t border-border">
              {FAQ.map((f, i) => (
                <div key={f.q} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`rm-heading text-lg transition-colors md:text-xl ${openFaq === i ? "text-primary" : "group-hover:text-primary"}`}
                    >
                      {f.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-foreground/60 transition group-hover:border-primary group-hover:text-primary">
                      {openFaq === i ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pb-6 pr-14 text-sm leading-relaxed text-foreground/60">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rm-card relative p-8 lg:sticky lg:top-24">
            <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <span className="rm-pulse-dot" />
                <span className="rm-mono rm-mono-signal">VAULT OPEN</span>
              </div>
              <span className="rm-serial">SN/HR-OPEN</span>
            </div>
            <h3 className="rm-heading text-3xl md:text-4xl">
              Không khớp
              <br />
              <span className="rm-outline">slot nào?</span>
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-foreground/60">
              Giỏi thứ bọn mình chưa nghĩ ra? Gửi portfolio hoặc GitHub kèm vài
              dòng mô tả thứ bạn muốn làm tiếp theo. Hồ sơ mở được giữ 6 tháng
              trong vault và luôn có người đọc thật.
            </p>
            <div className="mt-8 grid gap-3">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("[OPEN] Ứng tuyển tự do")}`}
                className="rm-btn-primary w-full justify-center"
              >
                GỬI TÍN HIỆU MỞ <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/about" className="rm-btn-ghost w-full justify-center">
                XEM ĐỘI NGŨ HIỆN TẠI
              </a>
            </div>
            <div className="rm-serial mt-8 text-center">
              RESPONSE ≤ 48H · HCM CITY · UTC+7
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===== 7. CLOSE ===== */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-28 text-center lg:px-8">
          <span className="rm-mono rm-mono-primary">// END OF MANIFEST</span>
          <h2 className="rm-heading rm-title-hero mt-6 text-5xl md:text-8xl [text-wrap:balance]">
            Bạn vẫn ở đây?
            <br />
            <span className="rm-outline">Thì ứng tuyển đi.</span>
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href="#slots" className="rm-btn-primary">
              QUAY LẠI BẢNG SLOT <ArrowRight className="h-4 w-4" />
            </a>
            <a href={`mailto:${site.email}`} className="rm-btn-ghost">
              HỎI TRƯỚC ỨNG TUYỂN SAU
            </a>
          </div>
          <div className="rm-serial mt-14">
            povixa CREW MANIFEST · REV {new Date().getFullYear()}.09 · KHÔNG
            DÙNG HEADHUNTER
          </div>
        </div>
      </section>
    </>
  );
}

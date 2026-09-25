import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrewStage } from "@/components/crew-stage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Về chúng tôi · povixa studio",
  description:
    "Câu chuyện, con người và nguyên tắc vận hành của studio povixa — từ một cái bàn thuê chung tới cỗ máy bốn người.",
};

/* ================= data ================= */

const TIMELINE = [
  {
    code: "OR.01",
    year: "2021",
    title: "Một cái bàn thuê chung",
    desc: "Minh rời phòng server ngân hàng với một niềm tin bướng bỉnh: phần mềm Việt không cần sao chép ai để tử tế. Freelance, cà phê sữa đá, và con VPS cũ mua lại.",
  },
  {
    code: "OR.02",
    year: "2022",
    title: "Người thứ hai gõ cửa",
    desc: "An mang theo obsession typography và dị ứng template. Design system đầu tiên ra đời vì hai người không chịu nổi việc mỗi project một kiểu chữ.",
  },
  {
    code: "OR.03",
    year: "2023",
    title: "Thành studio, có tên",
    desc: "Khoa và Vy vào đội. Cái tên povixa được chốt trong một đêm deploy hụt. Nguyên tắc 'owner trọn vòng' được viết lên bảng trắng ngày đầu tiên.",
  },
  {
    code: "OR.04",
    year: "2024",
    title: "Năm surface, một lõi",
    desc: "Web thương hiệu, admin, auth tập trung, docs và support chạy chung một nền tảng. Bài học lớn nhất: nói không với nhiều dự án hơn khả năng giữ lời hứa.",
  },
  {
    code: "OR.05",
    year: "2026",
    title: "Ngôn ngữ Red Magic",
    desc: "Thiết kế lại toàn bộ nhận diện số theo hướng tactical HUD: cut-corner, mono label, signal red. Mở crew slot đầu tiên sau ba năm tự làm hết.",
  },
];

const NUMBERS = [
  { value: "2021", unit: "EST", label: "năm cắm cờ" },
  { value: "27", unit: "SHIPS", label: "sản phẩm đã bàn giao" },
  { value: "4", unit: "CREW", label: "người chính thức" },
  { value: "0", unit: "TEMPLATE", label: "giao diện mua sẵn" },
];

/* ================= page ================= */

export default function AboutPage() {
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
              "radial-gradient(55% 45% at 30% 40%, color-mix(in oklab, var(--glow-1) 12%, transparent), transparent 70%)",
          }}
        />
        <span className="rm-scanline" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-32">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rm-mono rm-mono-primary">
              // STUDIO — ORIGIN LOG
            </span>
            <span className="h-[1px] w-10 bg-[var(--ink-line)]" />
            <span className="rm-serial">
              SN/ABT-{new Date().getFullYear()} · HCM CITY
            </span>
          </div>

          <h1 className="rm-heading rm-title-hero mt-8 text-6xl md:text-8xl">
            <span className="block">BỐN CON NGƯỜI.</span>
            <span className="block">MỘT CỔ MÁY.</span>
            <span className="rm-outline block">NHIỀU VẾT SẸO ĐẸP.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/60">
            povixa không bắt đầu bằng business plan. Nó bắt đầu bằng bốn người
            lần lượt rời những nơi trả lương cao hơn, vì muốn tự tay làm thứ
            mình dám ký tên.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/careers" className="rm-btn-primary">
              MUỐN VÀO CREW? <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="rm-btn-ghost">
              NÓI CHUYỆN VỚI BỌN MÌNH
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 2. ORIGIN LOG ===== */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="rm-mono rm-mono-primary">
                // 01 — ORIGIN LOG
              </span>
              <h2 className="rm-heading rm-title-hero mt-4 text-5xl md:text-7xl">
                Năm chương.
                <br />
                <span className="rm-outline">Chưa hết truyện.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-foreground/60">
              Không có phiên bản nào của câu chuyện này được viết sẵn. Mỗi
              chương là một lần bọn mình chọn thứ khó hơn nhưng đúng hơn.
            </p>
          </div>

          <ol className="relative space-y-14 border-l border-border pl-8 md:pl-12">
            {TIMELINE.map((t) => (
              <li key={t.code} className="relative">
                <span
                  className="absolute -left-[38px] top-2 h-3 w-3 border border-primary bg-background md:-left-[54px]"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="rm-num text-4xl md:text-5xl">{t.year}</span>
                  <span className="rm-mono rm-mono-primary">{t.code}</span>
                  <span className="rm-serial ml-auto">CHAPTER</span>
                </div>
                <h3 className="rm-heading mt-3 text-2xl md:text-3xl">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
                  {t.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 3. NUMBERS ===== */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="grid gap-0 border border-border sm:grid-cols-2 lg:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <div
                key={n.label}
                className={`relative p-8 transition hover:bg-muted ${
                  i < NUMBERS.length - 1
                    ? "lg:border-r lg:border-border"
                    : ""
                } ${
                  i % 2 === 0 && i < NUMBERS.length - 2
                    ? "border-b border-border sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <span className="rm-mono">STAT 0{i + 1}</span>
                <div className="rm-num mt-6 text-7xl md:text-8xl">
                  {n.value}
                  <span className="rm-num-unit">{n.unit}</span>
                </div>
                <div className="mt-4 text-sm uppercase tracking-wider text-foreground/60">
                  {n.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. CREW ===== */}
      <CrewStage />

      {/* ===== 5. CTA ===== */}
      <section className="relative border-t border-border bg-background">
        <div
          className="rm-grid-overlay pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-28 text-center lg:px-8">
          <span className="rm-mono rm-mono-primary">// END OF LOG</span>
          <h2 className="rm-heading rm-title-hero mt-6 text-5xl md:text-8xl [text-wrap:balance]">
            Muốn viết chương tiếp
            <br />
            <span className="rm-outline">cùng bọn mình?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-foreground/60">
            Chương 06 đang trống. Nó có thể là một dự án của bạn, hoặc chính bạn
            — người cầm bút tiếp theo của {site.name}.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rm-btn-primary">
              KỂ Ý TƯỞNG CỦA BẠN <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/careers" className="rm-btn-ghost">
              XEM SLOT ĐANG MỞ
            </Link>
          </div>
          <div className="rm-serial mt-14">
            {site.name?.toUpperCase()} STUDIO · CHAPTER 06 PENDING · UTC+7
          </div>
        </div>
      </section>
    </>
  );
}

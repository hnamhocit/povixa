"use client";

import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";

/* ================= helpers ================= */

function hashString(s: string): string {
  return Math.abs(
    s.split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0),
  )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0");
}

/* ================= hooks ================= */

function useUptime() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return s;
}

function useClock() {
  const [ts, setTs] = useState("00:00:00");
  useEffect(() => {
    const update = () =>
      setTs(
        new Date().toISOString().split("T")[1]?.split(".")[0] ?? "00:00:00",
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return ts;
}

/* ================= tactical cells ================= */

const CELLS = [
  {
    id: "c1",
    x: 110,
    y: 140,
    w: 168,
    h: 48,
    label: "HTTP",
    value: "404",
    color: "var(--signal)",
    trace: "M 278 164 H 360 V 300 H 500 V 384",
  },
  {
    id: "c2",
    x: 1200 - 110 - 184,
    y: 180,
    w: 184,
    h: 48,
    label: "SIGNAL",
    value: "LOST",
    color: "var(--glow-1)",
    trace: "M 906 204 H 820 V 340 H 700 V 384",
  },
  {
    id: "c3",
    x: 150,
    y: 620,
    w: 172,
    h: 48,
    label: "DIAG",
    value: "SN-0404",
    color: "var(--glow-2)",
    trace: "M 322 644 H 400 V 480 H 540 V 420",
  },
];

/* ================= diagnostic cell ================= */

function DiagnosticCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative border-b border-border p-4 transition-colors hover:bg-muted sm:border-b-0 sm:border-r last:border-r-0 ${
        accent ? "bg-muted" : "bg-card"
      }`}
    >
      <div className="rm-mono">{label}</div>
      <div
        className={`mt-2 font-mono text-[11px] break-all tracking-tight ${
          accent ? "text-[var(--signal)]" : "text-foreground/90"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* ================= page ================= */

export default function NotFound() {
  const pathname = usePathname();
  const uptime = useUptime();
  const ts = useClock();

  const mm = String(Math.floor(uptime / 60)).padStart(2, "0");
  const ss = String(uptime % 60).padStart(2, "0");
  const hash = useMemo(() => hashString(pathname || "/unknown"), [pathname]);

  return (
    <section className="relative flex min-h-[calc(100svh-64px)] flex-col overflow-hidden bg-background">
      {/* layers */}
      <div
        className="rm-grid-overlay pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(55% 48% at 50% 42%, color-mix(in oklab, var(--signal) 16%, transparent), transparent 72%)",
        }}
      />
      <div
        className="noise pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden
      />

      {/* scanline */}
      <span className="rm-scanline" aria-hidden />

      {/* ===== tactical cells + traces ===== */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="traceGrad404" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--signal)" />
            <stop offset="0.5" stopColor="var(--glow-1)" />
            <stop offset="1" stopColor="var(--glow-2)" />
          </linearGradient>
        </defs>

        {/* crosshair ở trung tâm */}
        <g stroke="var(--ink-line)" strokeDasharray="3 9">
          <line x1="600" y1="40" x2="600" y2="760" />
          <line x1="40" y1="400" x2="1160" y2="400" />
        </g>

        {CELLS.map((c) => (
          <g key={c.id}>
            {/* cut-corner cell body */}
            <polygon
              points={`${c.x},${c.y} ${c.x + c.w - 16},${c.y} ${c.x + c.w},${c.y + 16} ${c.x + c.w},${c.y + c.h} ${c.x + 16},${c.y + c.h} ${c.x},${c.y + c.h - 16}`}
              fill="var(--ink-2)"
              stroke={c.color}
              strokeOpacity="0.7"
              strokeWidth="1.25"
            />
            {/* inner shadow line */}
            <polygon
              points={`${c.x + 2},${c.y + 2} ${c.x + c.w - 18},${c.y + 2} ${c.x + c.w - 2},${c.y + 18} ${c.x + c.w - 2},${c.y + c.h - 2} ${c.x + 18},${c.y + c.h - 2} ${c.x + 2},${c.y + c.h - 18}`}
              fill="none"
              stroke={c.color}
              strokeOpacity="0.2"
            />
            {/* label + value */}
            <text
              x={c.x + 14}
              y={c.y + 20}
              fill={c.color}
              fontSize="9"
              letterSpacing="2"
              fontFamily="var(--font-mono), monospace"
            >
              // {c.label}
            </text>
            <text
              x={c.x + 14}
              y={c.y + 38}
              fill="#ffffff"
              fontSize="14"
              fontWeight="700"
              letterSpacing="2"
              fontFamily="var(--font-condensed), sans-serif"
            >
              {c.value}
            </text>

            {/* via dot tại đầu trace */}
            <circle
              cx={c.id === "c2" ? c.x : c.x + c.w}
              cy={c.y + c.h / 2}
              r="3"
              fill="none"
              stroke={c.color}
            />
            <circle
              cx={c.id === "c2" ? c.x : c.x + c.w}
              cy={c.y + c.h / 2}
              r="1.2"
              fill={c.color}
              className="rm-blink"
            />

            {/* trace base */}
            <path
              d={c.trace}
              fill="none"
              stroke="url(#traceGrad404)"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            {/* pulse chạy dọc trace */}
            <path
              d={c.trace}
              fill="none"
              stroke="url(#traceGrad404)"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray="0.08 0.92"
              strokeLinecap="round"
              style={{
                animation: "trace-flow 6s linear infinite",
                filter: `drop-shadow(0 0 4px ${c.color})`,
              }}
            />
          </g>
        ))}

        {/* target reticle ở tâm */}
        <g stroke="var(--primary)" strokeOpacity="0.6" fill="none">
          <circle cx="600" cy="400" r="14" strokeDasharray="2 4" />
          <circle cx="600" cy="400" r="28" strokeOpacity="0.3" />
          <line x1="600" y1="370" x2="600" y2="384" />
          <line x1="600" y1="416" x2="600" y2="430" />
          <line x1="570" y1="400" x2="584" y2="400" />
          <line x1="616" y1="400" x2="630" y2="400" />
        </g>
      </svg>

      {/* ===== nội dung ===== */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-20 pt-24 text-center">
        {/* signal lost badge */}
        <div className="inline-flex items-center gap-3 border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-4 py-2">
          <span className="rm-pulse-dot" />
          <span className="rm-mono rm-mono-signal">CHANNEL OFFLINE</span>
          <span className="rm-serial ml-2">ERR // 04</span>
        </div>

        {/* HUD number 404 */}
        <div className="mt-10">
          <div className="flex items-center justify-center gap-2 rm-mono">
            <span className="rm-crosshair h-3 w-3" />
            <span>// STATUS_CODE</span>
          </div>
          <div className="mt-3">
            <span className="rm-num text-[clamp(6rem,18vw,13rem)]">
              404
              <span className="rm-num-unit">ERR</span>
            </span>
          </div>
        </div>

        {/* title */}
        <h1 className="rm-heading rm-title-hero mt-6 text-4xl md:text-6xl">
          NHÁNH NÀY
          <br />
          <span className="rm-outline">CHƯA ĐƯỢC NỐI.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/60 [text-wrap:balance]">
          Đường dẫn bạn tìm không nằm trong mạch của{" "}
          <span className="text-foreground">{site.name}</span>. Có thể trang đã được
          di chuyển, hoặc bạn rẽ nhầm tại một giao lộ cũ.
        </p>

        {/* buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rm-btn-primary">
            TÁI ĐỊNH TUYẾN <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="rm-btn-ghost">
            XEM NĂNG LỰC
          </Link>
        </div>

        {/* diagnostic strip */}
        <div className="mt-14 grid w-full max-w-2xl grid-cols-2 sm:grid-cols-4 border border-border">
          <DiagnosticCell label="ROUTE" value={pathname || "/unknown"} />
          <DiagnosticCell label="STATUS" value="404 / NOT_FOUND" accent />
          <DiagnosticCell label="UPTIME" value={`${mm}:${ss}`} />
          <DiagnosticCell label="ROUTE_HASH" value={`0x${hash}`} />
        </div>

        {/* bottom */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rm-mono text-foreground/40">
          <Terminal className="h-3 w-3" />
          <span>hoặc gửi log lỗi tới</span>
          <a
            href={`mailto:${site.email}`}
            className="text-foreground/70 transition hover:text-primary"
          >
            {site.email}
          </a>
          <span className="rm-serial ml-2">· {ts} UTC</span>
        </div>
      </div>
    </section>
  );
}

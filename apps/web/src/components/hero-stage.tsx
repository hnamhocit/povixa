"use client";

import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ================= hooks ================= */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useCountUp(target: number, decimals = 0, duration = 1500) {
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(target * (1 - (1 - p) ** 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);
  return val.toFixed(decimals);
}

function useLiveNumber(base: number, spread: number, interval = 1600) {
  const reduced = usePrefersReducedMotion();
  const [v, setV] = useState(base);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setV(Math.round(base + (Math.random() - 0.5) * spread)),
      interval,
    );
    return () => clearInterval(id);
  }, [base, spread, interval, reduced]);
  return v;
}

/* ================= data ================= */

const HERO_METRICS = [
  { label: "CORE VOLTAGE", value: 1.28, decimals: 2, unit: "V" },
  { label: "COOLANT FLOW", value: 840, decimals: 0, unit: "ML/S" },
  { label: "CYCLE STABILITY", value: 99.98, decimals: 2, unit: "%" },
  { label: "THERMAL INDEX", value: 38.4, decimals: 1, unit: "°C" },
];

const TRACES = [
  "M 70 130 H 210 L 275 212",
  "M 570 130 H 430 L 365 212",
  "M 70 510 H 210 L 275 428",
  "M 570 510 H 430 L 365 428",
];

const NODES: [number, number][] = [
  [275, 212],
  [365, 212],
  [275, 428],
  [365, 428],
];

const PARTICLES = [
  { top: "16%", left: "10%", delay: "0s" },
  { top: "28%", left: "88%", delay: "1.2s" },
  { top: "74%", left: "6%", delay: "2.1s" },
  { top: "86%", left: "72%", delay: "0.6s" },
  { top: "6%", left: "56%", delay: "3s" },
  { top: "62%", left: "94%", delay: "1.8s" },
];

/* ================= reactor visual ================= */

function ReactorCore({ flow, rpm }: { flow: number; rpm: number }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* bloom + radar + scanline */}
      <div className="rm-core-bloom" aria-hidden />
      <div className="rm-radar" aria-hidden />
      <span className="rm-scanline" aria-hidden />

      {/* HUD corner brackets */}
      <span className="rm-bracket left-0 top-0 border-l border-t" aria-hidden />
      <span
        className="rm-bracket right-0 top-0 border-r border-t"
        aria-hidden
      />
      <span
        className="rm-bracket bottom-0 left-0 border-b border-l"
        aria-hidden
      />
      <span
        className="rm-bracket bottom-0 right-0 border-b border-r"
        aria-hidden
      />

      {/* floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="rm-particle"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          aria-hidden
        />
      ))}

      <svg viewBox="0 0 640 640" className="relative h-full w-full">
        <defs>
          <linearGradient id="traceGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--signal)" />
            <stop offset="0.5" stopColor="var(--glow-1)" />
            <stop offset="1" stopColor="var(--glow-2)" />
          </linearGradient>
          <radialGradient id="orbGrad" cx="0.35" cy="0.3" r="0.95">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#f0abfc" />
            <stop offset="0.7" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#22d3ee" />
          </radialGradient>
          <filter id="coreGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="16" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* organic dashed blob */}
        <g className="rm-spin-slower">
          <path
            d="M470 180 C 560 240 560 400 470 470 C 380 540 240 520 180 440 C 120 360 150 240 240 190 C 320 145 400 135 470 180 Z"
            fill="none"
            stroke="var(--ink-hi)"
            strokeOpacity="0.45"
            strokeDasharray="3 7"
          />
        </g>

        {/* rotating rings */}
        <g className="rm-spin-slow">
          <circle
            cx="320"
            cy="320"
            r="292"
            fill="none"
            stroke="var(--ink-hi)"
            strokeOpacity="0.5"
            strokeDasharray="2 10"
          />
        </g>
        <g className="rm-spin-rev">
          <circle
            cx="320"
            cy="320"
            r="238"
            fill="none"
            stroke="var(--glow-1)"
            strokeOpacity="0.28"
            strokeDasharray="40 18 6 18"
          />
        </g>
        <g className="rm-spin-slower">
          <circle
            cx="320"
            cy="320"
            r="196"
            fill="none"
            stroke="var(--ink-hi)"
            strokeOpacity="0.7"
            strokeDasharray="1 14"
            strokeWidth="6"
          />
        </g>

        {/* crosshair */}
        <line
          x1="320"
          y1="40"
          x2="320"
          y2="600"
          stroke="var(--ink-line)"
          strokeDasharray="3 9"
        />
        <line
          x1="40"
          y1="320"
          x2="600"
          y2="320"
          stroke="var(--ink-line)"
          strokeDasharray="3 9"
        />

        {/* traces: base line + energy pulse */}
        {TRACES.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke="url(#traceGrad)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <path
              d={d}
              fill="none"
              stroke="url(#traceGrad)"
              strokeWidth="2.5"
              className="rm-trace-pulse"
              style={{ animationDelay: `${i * 0.85}s` }}
            />
          </g>
        ))}

        {/* blinking nodes */}
        {NODES.map(([x, y], i) => (
          <rect
            key={i}
            x={x - 4}
            y={y - 4}
            width="8"
            height="8"
            fill="var(--signal)"
            className="rm-blink"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* octagon shell */}
        <polygon
          points="365,212 428,275 428,365 365,428 275,428 212,365 212,275 275,212"
          fill="var(--ink-2)"
          stroke="var(--ink-hi)"
          strokeWidth="1.5"
        />
        <polygon
          points="357,229 411,283 411,357 357,411 283,411 229,357 229,283 283,229"
          fill="var(--ink)"
          stroke="var(--glow-1)"
          strokeOpacity="0.5"
        />

        {/* turbine */}
        <g className="rm-spin-med">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="320"
              y1="240"
              x2="320"
              y2="268"
              stroke="var(--glow-1)"
              strokeOpacity="0.4"
              strokeWidth="2"
              transform={`rotate(${i * 45} 320 320)`}
            />
          ))}
        </g>

        {/* orbiting satellite */}
        <g className="rm-spin-fast">
          <circle cx="320" cy="150" r="4" fill="var(--glow-2)" />
        </g>

        {/* core orb */}
        <g className="rm-breathe" filter="url(#coreGlow)">
          <circle cx="320" cy="320" r="52" fill="url(#orbGrad)" />
          <circle cx="320" cy="320" r="22" fill="#ffffff" opacity="0.95" />
        </g>
      </svg>

      {/* live HUD labels */}
      <div className="absolute left-[56%] top-[28%] flex items-center gap-2">
        <span className="h-[1px] w-8 bg-[var(--ink-hi)]" />
        <span className="rm-mono">INLET_A // FLOW {flow}%</span>
      </div>
      <div className="absolute left-[58%] top-[64%] flex items-center gap-2">
        <span className="h-[1px] w-8 bg-[var(--ink-hi)]" />
        <span className="rm-mono">PURGE VALVE // CLOSED</span>
      </div>
      <div className="rm-mono rm-mono-primary absolute right-[2%] top-[47%] text-right">
        RPM // {rpm.toLocaleString("en-US")}
      </div>
    </div>
  );
}

/* ================= metric cell ================= */

function HeroMetric({
  label,
  value,
  decimals,
  unit,
}: (typeof HERO_METRICS)[number]) {
  const v = useCountUp(value, decimals);
  return (
    <div>
      <div className="rm-mono">{label}</div>
      <div className="mt-2 font-mono text-xl font-bold tracking-tight text-foreground">
        {v}
        <span className="ml-1 text-[10px] font-normal text-primary">
          {unit}
        </span>
      </div>
    </div>
  );
}

/* ================= stage ================= */

export function HeroStage() {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const flow = useLiveNumber(94, 6, 1800);
  const rpm = useLiveNumber(12400, 400, 1400);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  return (
    <section
      ref={stageRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative overflow-hidden bg-background"
    >
      <div
        className="rm-grid-overlay pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 72% 45%, color-mix(in oklab, var(--signal) 13%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="noise pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 pb-20 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-32">
        {/* ---- left: copy ---- */}
        <div>
          <div className="flex items-center gap-2 rm-mono rm-mono-primary">
            <Terminal className="h-3 w-3" />
            <span>ARCHITECTURE / INTERACTIVE ENGINE</span>
          </div>

          {/* FIX: rm-title-hero => line-height 1.08 cho dấu tiếng Việt */}
          <h1 className="rm-heading rm-title-hero mt-6 text-6xl md:text-7xl">
            <span className="block">NGHĨ ĐƯỢC.</span>
            <span className="block">CHẠM ĐƯỢC.</span>
            <span className="rm-outline block">KHÁC BIỆT HÓA.</span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-relaxed text-foreground/60">
            povixa hợp nhất web app, hạ tầng đám mây và giao diện phản hồi xúc
            giác vào một lõi duy nhất. Tự thiết kế, tự tối ưu biên độ, tự vận
            hành ổn định.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="rm-btn-primary">
              KHỞI ĐỘNG DỰ ÁN <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="rm-btn-ghost">
              BẢNG NĂNG LỰC
            </Link>
          </div>

          <div className="rm-rule mt-16 grid grid-cols-2 gap-8 pt-8 sm:grid-cols-4">
            {HERO_METRICS.map((m) => (
              <HeroMetric key={m.label} {...m} />
            ))}
          </div>
        </div>

        {/* ---- right: reactor (parallax tilt) ---- */}
        <div
          className="relative hidden transition-transform duration-300 ease-out will-change-transform md:block"
          style={{
            transform: `perspective(1200px) rotateY(${(tilt.x * 8).toFixed(2)}deg) rotateX(${(tilt.y * -8).toFixed(2)}deg)`,
          }}
        >
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${(tilt.x * -12).toFixed(1)}px, ${(tilt.y * -12).toFixed(1)}px, 0)`,
            }}
          >
            <ReactorCore flow={flow} rpm={rpm} />
          </div>
        </div>
      </div>
    </section>
  );
}

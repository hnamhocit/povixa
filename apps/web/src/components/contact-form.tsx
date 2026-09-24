"use client";

import { ArrowRight, Check, Loader2, Send } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  company: string;
  budget: string;
  projectType: string;
  message: string;
};

const PROJECT_TYPES = [
  "Web / Landing Page",
  "SaaS / Dashboard",
  "Mobile App",
  "E-commerce",
  "Internal Tool",
  "Other",
];

const BUDGETS = [
  { value: "under-50", label: "< 50M VND" },
  { value: "50-150", label: "50 – 150M VND" },
  { value: "150-500", label: "150 – 500M VND" },
  { value: "500-plus", label: "500M+ VND" },
  { value: "undecided", label: "Chưa xác định" },
];

const initial: FormData = {
  name: "",
  email: "",
  company: "",
  budget: "undecided",
  projectType: "Web / Landing Page",
  message: "",
};

export function ContactForm() {
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const signalStrength = Math.min(
    100,
    Math.round(
      (data.name.length * 2 + data.email.length * 2 + data.message.length) *
        1.2,
    ),
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (signalStrength < 40) {
      setStatus("error");
      setErrorMsg(
        "SIGNAL TOO WEAK — Điền tối thiểu tên, email và mô tả dự án.",
      );
      return;
    }
    setStatus("sending");
    try {
      // TODO: replace with real endpoint
      await new Promise((r) => setTimeout(r, 1400));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("TRANSMISSION FAILED — Thử lại hoặc gửi thẳng qua email.");
    }
  };

  if (status === "success") {
    return (
      <SuccessPanel
        onReset={() => {
          setStatus("idle");
          setData(initial);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rm-card relative p-6 sm:p-10">
      {/* HUD Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--ink-line)] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rm-pulse-dot" />
            <span className="rm-mono rm-mono-signal">LIVE · CHANNEL OPEN</span>
          </div>
          <h2 className="rm-heading mt-3 text-3xl md:text-4xl">
            TRANSMISSION
            <br />
            REQUEST
          </h2>
        </div>
        <div className="rm-serial">SN/CTC-001 · {new Date().getFullYear()}</div>
      </div>

      {/* Signal strength meter */}
      <div className="mb-8">
        <div className="flex items-center justify-between rm-mono">
          <span>// SIGNAL STRENGTH</span>
          <span
            className={
              signalStrength >= 60 ? "rm-mono-primary" : "rm-mono-signal"
            }
          >
            {signalStrength}%
          </span>
        </div>
        <div className="mt-2 h-[2px] w-full bg-[var(--ink-line)]">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${signalStrength}%`,
              background:
                signalStrength >= 60 ? "var(--primary)" : "var(--signal)",
            }}
          />
        </div>
      </div>

      {/* Grid fields */}
      <div className="grid gap-6 md:grid-cols-2">
        <TacticalField label="IDENTIFIER" index="01" required>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Tên của bạn"
            className="rm-input"
            required
          />
        </TacticalField>

        <TacticalField label="COMM LINK" index="02" required>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="email@domain.com"
            className="rm-input"
            required
          />
        </TacticalField>

        <TacticalField label="ORGANIZATION" index="03">
          <input
            type="text"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Công ty / Studio (tuỳ chọn)"
            className="rm-input"
          />
        </TacticalField>

        <TacticalField label="MISSION TYPE" index="04">
          <select
            value={data.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            className="rm-input"
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-[var(--ink-2)]">
                {t}
              </option>
            ))}
          </select>
        </TacticalField>

        <TacticalField
          label="RESOURCE ALLOCATION"
          index="05"
          className="md:col-span-2"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {BUDGETS.map((b) => {
              const active = data.budget === b.value;
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => update("budget", b.value)}
                  className={`rm-chip ${active ? "rm-chip-active" : ""}`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </TacticalField>

        <TacticalField
          label="BRIEF // MISSION DESCRIPTION"
          index="06"
          className="md:col-span-2"
        >
          <textarea
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Mô tả vấn đề bạn đang gặp phải, mục tiêu sản phẩm, deadline dự kiến..."
            rows={6}
            className="rm-input resize-none font-mono"
            required
          />
          <div className="mt-2 flex justify-between rm-mono text-white/40">
            <span>// MIN 20 CHARS</span>
            <span>{data.message.length} CHARS</span>
          </div>
        </TacticalField>
      </div>

      {/* Error strip */}
      {status === "error" && errorMsg && (
        <div className="mt-6 border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-4 py-3 rm-mono rm-mono-signal">
          ⚠ {errorMsg}
        </div>
      )}

      {/* Submit row */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ink-line)] pt-6">
        <div className="rm-mono text-white/50">
          RESPONSE WITHIN 24H · ENCRYPTED CHANNEL
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="rm-btn-primary disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              TRANSMITTING...
            </>
          ) : (
            <>
              TRANSMIT SIGNAL
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="rm-card relative p-10 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center border-2 border-primary bg-[var(--ink-3)]">
        <Check className="h-10 w-10 text-primary" strokeWidth={1.5} />
      </div>
      <div className="mt-6 rm-mono rm-mono-primary">TRANSMISSION RECEIVED</div>
      <h3 className="rm-heading mt-3 text-3xl md:text-4xl">
        Tín hiệu đã tới
        <br />
        Command Center.
      </h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
        Đội ngũ povixa sẽ phản hồi trong 1–2 ngày làm việc qua email bạn đã cung
        cấp. Trong thời gian chờ, bạn có thể xem qua các case study hoặc tài
        liệu kỹ thuật.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={onReset} className="rm-btn-ghost !h-12 !px-6">
          GỬI TÍN HIỆU KHÁC
        </button>
        <a href="/news" className="rm-btn-ghost !h-12 !px-6">
          XEM DOCS
        </a>
      </div>
      <div className="mt-10 rm-serial">
        ACK/{Date.now().toString(36).toUpperCase()} · STATUS OK
      </div>
    </div>
  );
}

function TacticalField({
  label,
  index,
  required,
  children,
  className = "",
}: {
  label: string;
  index: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 rm-mono">
          <span className="rm-crosshair h-3 w-3" />
          <span>
            // {index} — {label}
            {required && " *"}
          </span>
        </div>
        <span className="rm-serial">REQ</span>
      </div>
      {children}
    </div>
  );
}

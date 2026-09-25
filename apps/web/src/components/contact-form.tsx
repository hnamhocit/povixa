"use client";

import { ArrowRight, Check, Loader2, Send } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Status = "idle" | "sending" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  company: string;
  budget: string;
  projectType: string;
  message: string;
};





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
    <form onSubmit={handleSubmit} className="rounded-xl border bg-card shadow-sm relative p-6 sm:p-10">
      {/* HUD Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary">LIVE · CHANNEL OPEN</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            TRANSMISSION
            <br />
            REQUEST
          </h2>
        </div>
        <div className="font-mono text-xs text-muted-foreground">SN/CTC-001 · {new Date().getFullYear()}</div>
      </div>

      {/* Signal strength meter */}
      <div className="mb-8">
        <div className="flex items-center justify-between font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>// SIGNAL STRENGTH</span>
          <span
            className={
              signalStrength >= 60 ? "text-primary" : "text-primary"
            }
          >
            {signalStrength}%
          </span>
        </div>
        <div className="mt-2 h-[2px] w-full bg-[var(--ink-line)]">
          <div
            className="h-full transition-shadow duration-300"
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
            className="flex h-10 w-full rounded-md border border-input bg-background transition-shadow duration-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </TacticalField>

        <TacticalField label="COMM LINK" index="02" required>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="email@domain.com"
            className="flex h-10 w-full rounded-md border border-input bg-background transition-shadow duration-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </TacticalField>

        <TacticalField label="ORGANIZATION" index="03" className="md:col-span-2">
          <input
            type="text"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Công ty / Studio (tuỳ chọn)"
            className="flex h-10 w-full rounded-md border border-input bg-background transition-shadow duration-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </TacticalField>

        

        

        <TacticalField
          label="BRIEF // MISSION DESCRIPTION"
          index="04"
          className="md:col-span-2"
        >
          <TextareaAutosize
            minRows={3}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Mô tả vấn đề bạn đang gặp phải, mục tiêu sản phẩm, deadline dự kiến..."
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background transition-shadow duration-300 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none font-mono"
            required
          />
          <div className="mt-2 flex justify-between font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>// MIN 20 CHARS</span>
            <span>{data.message.length} CHARS</span>
          </div>
        </TacticalField>
      </div>

      {/* Error strip */}
      {status === "error" && errorMsg && (
        <div className="mt-6 border border-primary/40 bg-primary/10 rounded-md px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-primary">
          ⚠ {errorMsg}
        </div>
      )}

      {/* Submit row */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          RESPONSE WITHIN 24H · ENCRYPTED CHANNEL
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
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
    <div className="rounded-xl border bg-card shadow-sm relative p-10 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center border-2 border-primary bg-muted">
        <Check className="h-10 w-10 text-primary" strokeWidth={1.5} />
      </div>
      <div className="mt-6 font-mono text-xs font-medium uppercase tracking-wider text-primary">TRANSMISSION RECEIVED</div>
      <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
        Tín hiệu đã tới
        <br />
        Command Center.
      </h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/60">
        Đội ngũ povixa sẽ phản hồi trong 1–2 ngày làm việc qua email bạn đã cung
        cấp. Trong thời gian chờ, bạn có thể xem qua các case study hoặc tài
        liệu kỹ thuật.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={onReset} className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          GỬI TÍN HIỆU KHÁC
        </button>
        <a href="/news" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          XEM DOCS
        </a>
      </div>
      <div className="mt-10 font-mono text-xs text-muted-foreground">
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
        <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="hidden" />
          <span>
            // {index} — {label}
            {required && " *"}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">REQ</span>
      </div>
      {children}
    </div>
  );
}

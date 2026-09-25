"use client";

import { ChevronDown, Globe } from "lucide-react";
import { type ComponentType, useState } from "react";

/* ================= brand icons (lucide đã gỡ brand icons) ================= */

type IconCmp = ComponentType<{ className?: string }>;

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    ></svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function DribbbleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm7.94 5.53a10.2 10.2 0 0 1 2.3 6.36c-.34-.07-3.7-.75-7.09-.33-.08-.17-.15-.35-.23-.53-.21-.5-.44-1-.68-1.49 3.75-1.52 5.45-3.72 5.7-4.01ZM12 1.77c2.6 0 4.98.97 6.79 2.57-.21.3-1.72 2.36-5.34 3.72a52.4 52.4 0 0 0-3.8-5.94c.76-.22 1.55-.35 2.35-.35ZM7.64 2.86c.27.36 2.1 2.9 3.78 5.88-4.75 1.26-8.93 1.24-9.38 1.24a10.26 10.26 0 0 1 5.6-7.12ZM1.76 12.01v-.31c.44.01 5.36.07 10.5-1.46.3.57.57 1.15.83 1.73l-.4.12c-5.42 1.75-8.3 6.5-8.54 6.9a10.2 10.2 0 0 1-2.39-6.98Zm10.24 10.23a10.2 10.2 0 0 1-6.3-2.17c.19-.39 2.32-4.44 8.13-6.49l.07-.02a42.6 42.6 0 0 1 2.18 7.75 10.16 10.16 0 0 1-4.08.93Zm5.75-1.9c-.07-.43-.58-3.3-1.84-6.91 3.02-.48 5.66.3 5.99.41a10.24 10.24 0 0 1-4.15 6.5Z" />
    </svg>
  );
}

/* ================= data ================= */

type Social = { icon: IconCmp; href: string; label: string };

type Crew = {
  serial: string;
  name: string;
  role: string;
  initials: string;
  avatar?: string;
  caption: string;
  bio: string;
  story: string;
  tags: string[];
  socials: Social[];
};

const CREW: Crew[] = [
  {
    serial: "CREW-01",
    name: "Nguyen Hoang Nam (hnamhocit)",
    role: "FULLSTACK ENGINEER",
    initials: "HN",
    avatar: "https://github.com/hnamhocit.png",
    caption: "Code cũng như chữ ký tay: đọc là biết ai viết.",
    bio: "Phát triển phần mềm với sự tỉ mỉ, đam mê. Mong muốn mang lại sản phẩm tốt nhất cho người dùng.",
    story:
      "Với đam mê công nghệ từ sớm, mình luôn tìm tòi và học hỏi để xây dựng những hệ thống tốt nhất. Mình tin rằng một sản phẩm tốt không chỉ ở dòng code mà còn ở trải nghiệm mà nó mang lại.",
    tags: ["FULLSTACK", "NEXT.JS", "TYPESCRIPT"],
    socials: [
      {
        icon: GithubIcon,
        href: "https://github.com/hnamhocit",
        label: "GitHub",
      },
      {
        icon: FacebookIcon,
        href: "https://facebook.com/hnamhocit",
        label: "Facebook",
      },
      { icon: Globe, href: "https://hnamhocit.vercel.app", label: "Website" },
    ],
  },
];

/* ================= card ================= */

function CrewCard({ member }: { member: Crew }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-xl border bg-card shadow-sm relative flex h-full flex-col items-center p-8 text-center md:p-10">
      <span className="font-mono text-xs text-muted-foreground absolute left-6 top-6">{member.serial}</span>
      

      {/* avatar */}
      <div className="mt-8 flex h-20 w-20 overflow-hidden items-center justify-center border border-border bg-muted transition-colors hover:border-primary">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-2xl font-semibold leading-none text-primary">
            {member.initials}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight">{member.name}</h3>
      <div className="mt-2 font-mono text-xs font-medium uppercase tracking-wider text-primary">{member.role}</div>

      <p className="mt-6 max-w-sm text-sm italic leading-relaxed text-foreground/75">
        “{member.caption}”
      </p>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/55">
        {member.bio}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {member.tags.map((t) => (
          <span
            key={t}
            className="border border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group mt-7 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
      >
        {open ? "ẨN STORY" : "ĐỌC STORY"}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid w-full transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-5 border-t border-border pt-5 text-left text-sm leading-relaxed text-muted-foreground">
            {member.story}
          </p>
        </div>
      </div>

      <div className="mt-auto w-full pt-8">
        <div className="flex items-center justify-center gap-3 border-t border-border pt-6">
          {member.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              title={s.label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ================= section ================= */

export function CrewStage() {
  return (
    <section className="relative border-t border-border bg-background">
      <div
        className="hidden"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary">// CREW MANIFEST</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Người thật.
              <br />
              <span className="text-muted-foreground">Không phải máy móc.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-foreground/60">
            Bốn con người, bốn đường rẽ khác nhau dẫn tới cùng một cỗ máy. Bấm
            ĐỌC STORY để xem mỗi người tới đây bằng cách nào.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {CREW.map((m) => (
            <CrewCard key={m.serial} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

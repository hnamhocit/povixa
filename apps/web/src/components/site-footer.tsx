import { Send } from "lucide-react";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPalette,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { site } from "@/lib/site";

const SOCIALS = [
  { icon: FaGithub, href: "https://github.com/povixa", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/company/povixa",
    label: "LinkedIn",
  },
  { icon: FaXTwitter, href: "https://x.com/povixa", label: "X / Twitter" },
  { icon: FaPalette, href: "https://dribbble.com/povixa", label: "Dribbble" },
  { icon: FaFacebook, href: "https://facebook.com/povixa", label: "Facebook" },
  {
    icon: FaInstagram,
    href: "https://instagram.com/povixa",
    label: "Instagram",
  },
  { icon: FaYoutube, href: "https://youtube.com/@povixa", label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-background text-foreground">
      <div
        className="rm-grid-overlay pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        {/* Top: big brand + social */}
        <div className="grid gap-14 pb-16 md:grid-cols-[1.5fr_1fr] md:items-end md:gap-8">
          <div>
            <span className="rm-mono rm-mono-primary">povixa.studio</span>
            <h2 className="rm-heading mt-6 text-5xl md:text-7xl">
              Nghĩ được.
              <br />
              <span className="text-muted-foreground">Chạm được.</span>
              <br />
              Khác biệt hóa.
            </h2>
          </div>

          <div className="md:text-right">
            <span className="rm-mono">Connect / Follow</span>
            <div className="mt-6 flex flex-wrap gap-2 md:justify-end">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="rm-social"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: nav columns */}
        <div className="rm-rule pt-12" />
        <div className="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="rm-mono rm-mono-primary mb-5">// studio</div>
            <nav className="grid gap-3">
              {site.navPages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/careers"
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
              >
                Tuyển dụng
              </Link>
            </nav>
          </div>

          <div>
            <div className="rm-mono rm-mono-primary mb-5">// system</div>
            <nav className="grid gap-3">
              <a
                href={site.authUrl}
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
              >
                Auth Portal
              </a>
              <a
                href={site.docsUrl}
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
              >
                Documentation
              </a>
              <a
                href={site.supportUrl}
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
              >
                Help Center
              </a>
              <a
                href={site.legalUrl}
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
              >
                Legal
              </a>
            </nav>
          </div>

          <div>
            <div className="rm-mono rm-mono-primary mb-5">// contact</div>
            <nav className="grid gap-3">
              <a
                href={`mailto:${site.email}`}
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
              >
                {site.email}
              </a>
              <a
                href={`mailto:${site.supportEmail}`}
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-foreground/80 transition hover:text-primary"
              >
                {site.supportEmail}
              </a>
              <span className="rm-mono mt-2">Ho Chi Minh · Vietnam</span>
            </nav>
          </div>

          <div>
            <div className="rm-mono rm-mono-primary mb-5">// newsletter</div>
            <p className="font-condensed text-sm text-foreground/70">
              Nhận bản tin kỹ thuật hàng tháng. Không spam.
            </p>
            <form className="mt-4 flex border border-border">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 font-mono text-xs text-foreground placeholder:text-foreground/30 focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-auto items-center justify-center bg-primary px-4 text-[var(--ink)] transition hover:brightness-110"
                aria-label="Gửi"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom: serial + copyright */}
        <div className="rm-rule pt-8" />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <div className="rm-serial">
            Serial: PVX-{new Date().getFullYear()}-VIET · Build{" "}
            {process.env.NEXT_PUBLIC_BUILD || "0.1.0"}
          </div>
          <div className="flex items-center gap-6 rm-mono">
            <span className="flex items-center gap-2">
              <span className="rm-pulse-dot" />
              All systems operational
            </span>
          </div>
          <div className="rm-serial">
            © {new Date().getFullYear()} povixa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

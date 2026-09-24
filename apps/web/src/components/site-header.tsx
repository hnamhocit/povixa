"use client";

import { BookOpen, LifeBuoy, Menu, Moon, Search, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { SiteSearch } from "@/components/site-search";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--ink-line)] bg-[var(--ink)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        {/* Logo cut-corner */}
        <Link
          href="/"
          className="group relative flex items-center gap-2.5"
          aria-label="Về trang chủ povixa"
        >
          <Image
            src="/logo.png"
            alt="Povixa logo"
            width={40}
            height={40}
            className="object-cover"
          />

          <span className="font-condensed text-sm font-black uppercase tracking-[0.2em] text-white">
            povixa
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.navPages.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 font-condensed text-xs font-bold uppercase tracking-[0.18em] transition ${
                  active ? "text-primary" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary" />
                )}
              </Link>
            );
          })}
          <Link
            href="/careers"
            className={`relative flex items-center gap-2 px-4 py-2 font-condensed text-xs font-bold uppercase tracking-[0.18em] transition ${
              pathname.startsWith("/careers")
                ? "text-primary"
                : "text-white/70 hover:text-white"
            }`}
          >
            Tuyển dụng
            <span className="rm-pulse-dot" />
          </Link>
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Tìm kiếm"
            className="flex h-10 w-10 items-center justify-center border border-[var(--ink-line)] text-white/70 transition hover:border-primary hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Đổi giao diện"
            className="relative flex h-10 w-10 items-center justify-center border border-[var(--ink-line)] text-white/70 transition hover:border-primary hover:text-primary"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <a
            href={site.docsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Tài liệu kỹ thuật"
            className="flex h-10 w-10 items-center justify-center border border-[var(--ink-line)] text-white/70 transition hover:border-primary hover:text-primary"
          >
            <BookOpen className="h-4 w-4" />
          </a>
          <Link
            href="/support"
            aria-label="Hỗ trợ"
            className="flex h-10 w-10 items-center justify-center border border-[var(--ink-line)] text-white/70 transition hover:border-primary hover:text-primary"
          >
            <LifeBuoy className="h-4 w-4" />
          </Link>

          <a
            href={site.authUrl}
            className="rm-btn-primary ml-3 !h-10 !px-5 !text-[11px]"
          >
            Đăng nhập
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center border border-[var(--ink-line)] text-white md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--ink-line)] bg-[var(--ink)] md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {site.navPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 font-condensed text-xs font-bold uppercase tracking-[0.18em] text-white/80 transition hover:bg-[var(--ink-3)] hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/careers"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 font-condensed text-xs font-bold uppercase tracking-[0.18em] text-white/80 transition hover:bg-[var(--ink-3)] hover:text-primary"
            >
              Tuyển dụng <span className="rm-pulse-dot" />
            </Link>

            <div className="mt-3 grid grid-cols-4 gap-2 border-t border-[var(--ink-line)] pt-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-12 items-center justify-center border border-[var(--ink-line)] text-white/70"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
              </button>
              <a
                href={site.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center border border-[var(--ink-line)] text-white/70"
              >
                <BookOpen className="h-4 w-4" />
              </a>
              <Link
                href="/support"
                className="flex h-12 items-center justify-center border border-[var(--ink-line)] text-white/70"
              >
                <LifeBuoy className="h-4 w-4" />
              </Link>
              <a
                href={site.authUrl}
                onClick={() => setMenuOpen(false)}
                className="flex h-12 items-center justify-center bg-primary text-[var(--ink)]"
              >
                <span className="font-condensed text-[10px] font-black uppercase tracking-widest">
                  ĐĂNG NHẬP
                </span>
              </a>
            </div>
          </nav>
        </div>
      )}

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

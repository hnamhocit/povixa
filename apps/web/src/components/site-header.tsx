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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
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

          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            povixa
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex h-full">
          {site.navPages.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center h-full px-4 text-sm font-medium tracking-wide transition-all duration-300 ${
                  active 
                    ? "text-primary bg-[color-mix(in_oklab,var(--primary)_10%,transparent)]" 
                    : "text-foreground/70 hover:text-foreground hover:bg-background/50"
                }`}
              >
                {item.label}
                {active && (
                  <>
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary shadow-[0_0_12px_var(--primary)]" />
                    <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  </>
                )}
              </Link>
            );
          })}
          <Link
            href="/careers"
            className={`relative flex items-center h-full gap-2 px-4 text-sm font-medium tracking-wide transition-all duration-300 ${
              pathname.startsWith("/careers")
                ? "text-primary bg-[color-mix(in_oklab,var(--primary)_10%,transparent)]"
                : "text-foreground/70 hover:text-foreground hover:bg-background/50"
            }`}
          >
            Tuyển dụng
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
            {pathname.startsWith("/careers") && (
              <>
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary shadow-[0_0_12px_var(--primary)]" />
                <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </>
            )}
          </Link>
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Tìm kiếm"
            className="flex h-10 w-10 items-center justify-center border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Đổi giao diện"
            className="relative flex h-10 w-10 items-center justify-center border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <a
            href={site.docsUrl}
            aria-label="Tài liệu kỹ thuật"
            className="flex h-10 w-10 items-center justify-center border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
          >
            <BookOpen className="h-4 w-4" />
          </a>
          <a
            href={site.supportUrl}
            aria-label="Hỗ trợ"
            className="flex h-10 w-10 items-center justify-center border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
          >
            <LifeBuoy className="h-4 w-4" />
          </a>

          <a
            href={site.authUrl}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 ml-3"
          >
            Đăng nhập
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center border border-border text-foreground md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {site.navPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium tracking-wide text-foreground/80 transition hover:bg-muted hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/careers"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 text-sm font-medium tracking-wide text-foreground/80 transition hover:bg-muted hover:text-primary"
            >
              Tuyển dụng <span className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
            </Link>

            <div className="mt-3 grid grid-cols-4 gap-2 border-t border-border pt-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-12 items-center justify-center border border-border text-foreground/70"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
              </button>
              <a
                href={site.docsUrl}
                className="flex h-12 items-center justify-center border border-border text-foreground/70"
              >
                <BookOpen className="h-4 w-4" />
              </a>
              <a
                href={site.supportUrl}
                className="flex h-12 items-center justify-center border border-border text-foreground/70"
              >
                <LifeBuoy className="h-4 w-4" />
              </a>
              <a
                href={site.authUrl}
                onClick={() => setMenuOpen(false)}
                className="flex h-12 items-center justify-center bg-primary text-[var(--ink)]"
              >
                <span className="text-xs font-semibold uppercase tracking-wider">
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

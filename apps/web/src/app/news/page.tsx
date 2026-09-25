import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { news } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Bài viết về engineering, design và chuyện làm nghề của studio povixa.",
};

export default function NewsPage() {
  const [featured, ...rest] = news;

  return (
    <section className="relative border-b border-border bg-background">
      <div
        className="hidden"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
        {/* Header */}
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground-primary">
              // SIGNAL · ARTICLES
            </span>
            <h1 className="font-heading font-bold tracking-tight mt-4 text-5xl md:text-8xl">
              Chúng tôi
              <br />
              <span className="text-muted-foreground">viết gì.</span>
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-foreground/60">
            Không phải content marketing. Là những thứ chúng tôi thật sự đã làm,
            đã sai và đã sửa.
          </p>
        </div>

        {/* Featured */}
        <Link
          href={`/news/${featured.slug}`}
          className="rounded-xl border bg-card shadow-sm group relative block p-10 md:p-14"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground-primary">
                <span className="h-1.5 w-1.5 bg-primary" /> FEATURED
              </span>
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">{featured.date}</span>
            </div>
            <span className="rm-serial">
              PVX-
              {featured.slug
                .split("-")
                .map((s) => s[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>

          <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground-primary mb-4 block">
            / {featured.tag.toUpperCase()}
          </span>
          <h2 className="font-heading font-bold tracking-tight text-3xl md:text-6xl leading-[0.95] group-hover:text-primary transition-colors">
            {featured.title}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/60">
            {featured.excerpt}
          </p>

          <div className="mt-10 flex items-center gap-3 border-t border-border pt-6 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            READ ARTICLE{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </div>
        </Link>

        {/* Rest grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {rest.map((n, i) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="rounded-xl border bg-card shadow-sm group relative flex flex-col p-8"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground-primary">
                  / {n.tag.toUpperCase()}
                </span>
                <span className="rm-serial">
                  #{String(i + 2).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-heading font-bold tracking-tight text-xl leading-tight group-hover:text-primary transition-colors">
                {n.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                {n.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">{n.date}</span>
                <ArrowRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

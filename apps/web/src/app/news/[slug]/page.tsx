import { ArrowLeft, ArrowRight, Clock, Share2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { news } from "@/lib/data/site-content";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = news.find((n) => n.slug === params.slug);
  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Nguyen Hoang Nam (hnamhocit)"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = news.find((n) => n.slug === params.slug);
  if (!post) notFound();

  // Đọc bài: ~250 từ / phút
  const wordCount = post.body.join(" ").split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 250));

  return (
    <section className="relative border-b border-border bg-background">
      <div
        className="hidden"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 py-20 lg:px-8">
        {/* Back + meta */}
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/news"
            className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2 text-foreground/60 transition hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> ALL SIGNALS
          </Link>
          <div className="flex items-center gap-4 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-2 text-foreground/50">
              <Clock className="h-3 w-3" /> {readingMinutes} MIN
            </span>
            <span className="rm-serial">
              PVX-
              {post.slug
                .split("-")
                .map((s) => s[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
        </div>

        {/* Tag + heading */}
        <div className="mb-12 border-y border-border py-10">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground-primary">
            / {post.tag.toUpperCase()}
          </span>
          <h1 className="font-heading font-bold tracking-tight mt-6 text-4xl md:text-7xl leading-[0.95] [text-wrap:balance]">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">{post.date}</span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground text-foreground/40">·</span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground text-foreground/50">
              {wordCount.toLocaleString()} WORDS
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground text-foreground/40">·</span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground text-foreground/50">
              {readingMinutes} MIN READ
            </span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="mb-14 border-l-2 border-primary pl-6 text-lg leading-relaxed text-foreground/80 italic">
          {post.excerpt}
        </p>

        {/* Body */}
        <article className="space-y-6 text-base leading-[1.8] text-foreground/75">
          {post.body.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:font-condensed first-letter:text-6xl first-letter:font-black first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-[0.85]"
                  : ""
              }
            >
              {p}
            </p>
          ))}
        </article>

        {/* Footer actions */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <button className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2 text-foreground/60 transition hover:text-primary">
            <Share2 className="h-3 w-3" /> SHARE SIGNAL
          </button>

          <Link href="/news" className="rm-btn-ghost !h-12 !px-6 !text-[11px]">
            More articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

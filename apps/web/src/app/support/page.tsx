import { BookOpen, LifeBuoy, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@povixa/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@povixa/ui/components/card";
import { faq } from "@/lib/data/site-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hỗ trợ",
  description:
    "Kênh liên hệ hỗ trợ, câu hỏi thường gặp và tài liệu kỹ thuật của povixa.",
};

const channels = [
  {
    icon: Mail,
    title: "Email hỗ trợ",
    desc: "Dành cho khách hàng đang vận hành sản phẩm. Phản hồi trong 24 giờ làm việc.",
    href: `mailto:${site.supportEmail}`,
    cta: site.supportEmail,
  },
  {
    icon: BookOpen,
    title: "Tài liệu kỹ thuật",
    desc: "Hướng dẫn tích hợp, API reference, changelog và troubleshooting cho từng surface.",
    href: site.docsUrl,
    cta: "docs.povixa.cloud",
  },
  {
    icon: MessageSquare,
    title: "Kênh dự án",
    desc: "Mỗi dự án có kênh riêng cho team của bạn và team povixa: cập nhật, demo, quyết định.",
    href: "/contact",
    cta: "Yêu cầu mở kênh",
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="border-b py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-primary">
            <LifeBuoy className="h-6 w-6" />
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl [text-wrap:balance]">
            Có người thật phía sau.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Không bot trả lời vòng vo. Mọi ticket đều chạm tới một trong bốn
            người của studio.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map((c) => (
              <Card
                key={c.title}
                className="bg-card/60 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <CardHeader>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/60 text-muted-foreground">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <CardTitle className="mt-3 text-xl">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                  <a
                    href={c.href}
                    className="mt-4 inline-block font-mono text-xs text-primary underline decoration-primary/40 underline-offset-4"
                  >
                    {c.cta}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <div className="mt-8 grid gap-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border bg-card/60 backdrop-blur-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold">
                  {f.q}
                  <span className="font-mono text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="rm-btn-primary h-11 px-8 text-xs">
              Câu hỏi của bạn không ở đây?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

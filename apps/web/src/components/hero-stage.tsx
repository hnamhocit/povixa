"use client";

import { ArrowRight, Terminal, Smartphone, LayoutDashboard, Code2, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@povixa/ui/components/button";

export function HeroStage() {
  return (
    <section className="relative overflow-hidden bg-background min-h-screen flex flex-col justify-center pt-24 pb-12">
      {/* Background Layer: Grid and Glows (z-0) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      
      {/* Colorful Glowing Blobs */}
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 h-[500px] w-[800px] opacity-60 blur-[100px] pointer-events-none z-0">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/70  animate-pulse duration-1000"></div>
        <div className="absolute right-0 top-10 h-[400px] w-[400px] rounded-full bg-orange-500/50 "></div>
        <div className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-purple-600/40 "></div>
      </div>

      {/* Floating Mock UI Elements to add tech feel */}
      <div className="absolute top-1/4 left-[5%] xl:left-[10%] w-[240px] rounded-xl border border-border/50 bg-card/60 backdrop-blur-md p-5 shadow-2xl opacity-100 -rotate-6 hidden lg:block z-0 transform hover:-translate-y-2 transition-transform duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-16 bg-primary/80 rounded-full"></div>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          <div className="h-2.5 w-full bg-muted rounded-full"></div>
          <div className="h-2.5 w-4/5 bg-muted rounded-full"></div>
          <div className="h-2.5 w-2/3 bg-muted rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute top-1/3 right-[5%] xl:right-[10%] w-[280px] rounded-xl border border-border/50 bg-card/60 backdrop-blur-md p-5 shadow-2xl opacity-100 rotate-6 hidden lg:block z-0 transform hover:-translate-y-2 transition-transform duration-500 delay-100">
        <div className="flex gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-orange-500"></div>
          <div className="flex flex-col justify-center gap-2 w-full">
            <div className="h-2.5 w-24 bg-foreground/70 rounded-full"></div>
            <div className="h-2 w-16 bg-muted rounded-full"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-full bg-muted/50 rounded-md"></div>
          <div className="h-8 w-full bg-primary/20 rounded-md"></div>
        </div>
      </div>

      {/* Main Content (z-10) */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary mr-2 animate-pulse"></span>
            Software & App Development Studio
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl/tight">
            Biến ý tưởng kinh doanh thành <br className="hidden md:inline" />
            <span className="bg-gradient-to-br from-primary via-rose-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">sản phẩm công nghệ</span>
          </h1>
          
          <p className="mx-auto max-w-[42rem] text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed">
            Chúng tôi chuyên gia công và phát triển Web App, Mobile App và giải pháp phần mềm tuỳ chỉnh. Đồng hành cùng doanh nghiệp từ thiết kế đến triển khai.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pt-6 justify-center items-center">
            <Link href="/contact" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-10 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] transition-all w-full sm:w-auto">
              Liên hệ tư vấn <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/about" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-input bg-background/50 backdrop-blur-md px-10 text-lg font-bold text-foreground shadow-sm hover:bg-muted hover:scale-[1.02] transition-all w-full sm:w-auto">
              <LayoutDashboard className="h-5 w-5" /> Xem dự án mẫu
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

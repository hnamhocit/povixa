import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.authUrl),
  title: { default: `Tài khoản — ${site.name}`, template: `%s — ${site.name}` },
  description: "Trung tâm quản lý tài khoản, đăng nhập và đăng ký của hệ sinh thái povixa.",
  openGraph: {
    title: `Tài khoản — ${site.name}`,
    description: "Đăng nhập hoặc đăng ký tài khoản để truy cập vào hệ sinh thái ứng dụng của povixa.",
    url: site.authUrl,
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `povixa Auth` }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Tài khoản — ${site.name}`,
    description: "Đăng nhập hoặc đăng ký tài khoản povixa.",
    images: [site.ogImage],
  },
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["vietnamese", "latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${jakarta.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
        suppressHydrationWarning
      >
        <body className="antialiased flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

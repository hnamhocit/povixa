import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

const chakraPetch = Chakra_Petch({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.title }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  keywords: [
    "povixa",
    "studio",
    "software",
    "development",
    "web",
    "mobile",
    "app",
    "thiết kế web",
    "làm app",
    "hnamhocit",
  ],
  authors: [
    {
      name: "Nguyen Hoang Nam (hnamhocit)",
      url: "https://hnamhocit.vercel.app",
    },
  ],
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${chakraPetch.variable} ${jetbrains.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "povixa",
              url: site.url,
              logo: `${site.url}/og-image.png`,
              sameAs: [
                "https://github.com/hnamhocit",
                "https://facebook.com/hnamhocit",
                "https://hnamhocit.vercel.app",
              ],
            }),
          }}
        />
        <div
          className="noise pointer-events-none fixed inset-0 -z-10 opacity-[0.025]"
          aria-hidden
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <CustomCursor />
          <main>{children}</main>
          <SiteFooter />
          <ScrollToTop />
          <ScrollReveal />
        </ThemeProvider>
      </body>
    </html>
  );
}

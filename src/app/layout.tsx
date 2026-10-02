import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nadia Irdina — Data Translator & Strategic Storyteller",
    template: "%s | Nadia Irdina",
  },
  description:
    "Nadia Irdina is a Malaysia-based BI analyst translating business requirements and complex data into clear dashboards, structured systems, and practical decisions.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} portfolio-colorful`}>
        <Providers>
          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white focus:not-sr-only"
          >
            Skip to content
          </a>

          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            {children}

            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}

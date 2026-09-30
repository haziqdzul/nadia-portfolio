import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import "../src/app/globals.css";

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
      <body className={`${inter.variable} ${jakarta.variable}`}>
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

            <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
              <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-slate-600 sm:flex-row sm:justify-between dark:text-slate-400">
                <p>Nadia Irdina · Data Translator & Strategic Storyteller</p>
                <p>Built with care, Next.js, and curiosity.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

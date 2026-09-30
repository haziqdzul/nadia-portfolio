import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { DataTransformation } from "./data-transformation";
import { HeroIntro } from "./hero-intro";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-24 lg:pt-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <HeroIntro />
            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-300">I’m Nadia Irdina, a Business Intelligence Analyst. I translate business questions into structured requirements, dependable data, and decision-ready dashboards.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#portfolio" className="action-button">Explore my work <ArrowDownRight aria-hidden="true" className="size-4" /></Link>
              <Link href="#contact" className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-medium">Let’s talk <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
              <Image src="/images/profile.jpg" alt="Nadia Irdina" width={64} height={64} sizes="64px" className="size-16 rounded-full object-cover object-top" />
              <div><p className="font-semibold">Nadia Irdina</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Statistics background. Business perspective.</p><p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Based in Malaysia · Insights Enthusiast</p></div>
            </div>
          </div>
          <DataTransformation />
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400">DATA → INFORMATION → INSIGHT → ACTION</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">SQL / Oracle / Tableau / Power BI</p>
        </div>
      </div>
    </section>
  );
}

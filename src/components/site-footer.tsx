import { ArrowUp } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6 footer-mug"><path d="M18 9h1a3 3 0 0 1 0 6h-1M3 9h15v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" /><path className="mug-steam" d="M6 6c-2-2 2-2 0-4" /><path className="mug-steam" d="M10 6c-2-2 2-2 0-4" /><path className="mug-steam" d="M14 6c-2-2 2-2 0-4" /></svg>
            </span>
            <div>
              <p className="font-heading text-lg font-bold">Nadia Irdina</p>
              <p className="mt-1 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">Always curious. Always connecting the dots.</p>
            </div>
          </div>
          <a href="#main-content" className="footer-back inline-flex min-h-11 w-fit items-center gap-3 rounded-xl px-4 text-sm font-semibold transition-colors hover:bg-slate-200/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:hover:bg-white/10">
            <span>Back to the beginning</span> <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>Made with intention. Powered by matcha.</p>
          <p>Thanks for spending a little time here.</p>
        </div>
      </div>
    </footer>
  );
}

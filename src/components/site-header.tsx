"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Coffee, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const navigation = [
  { label: "Portfolio", id: "portfolio" },
  { label: "How I work", id: "how" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;
const iconButton = "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const scrollProgress = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const scrollableHeight = root.scrollHeight - root.clientHeight;
      const progress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0;
      if (scrollProgress.current) {
        scrollProgress.current.style.transform = `scaleX(${progress})`;
      }
      let current = "";
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 180 && section.getBoundingClientRect().bottom > 180) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Filters and expanded case studies change the page height without scrolling.
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(document.body);
    return () => { cancelAnimationFrame(frame); resizeObserver.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenuOpen(false); }} onKeyDown={(event) => { if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }}>
    <div
      ref={scrollProgress}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[5px] origin-left bg-emerald-600 dark:bg-emerald-300"
      style={{ transform: "scaleX(0)" }}
    />
    <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6">
      <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3"><Coffee aria-hidden="true" className="size-7 text-emerald-800 dark:text-emerald-300" /><span><span className="block text-sm font-semibold">Nadia Irdina<span className="text-emerald-700 dark:text-emerald-300">.</span></span><span className="block pt-0.5 text-[11px] text-slate-500 dark:text-slate-400">BI Analyst · Matcha powered</span></span></Link>
      <nav aria-label="Main navigation" className="hidden lg:block"><ul className="flex items-center gap-1">{navigation.map((item) => <li key={item.id}><Link href={`/#${item.id}`} aria-current={active === item.id ? "location" : undefined} className={`relative inline-flex min-h-11 items-center px-3 text-xs font-medium transition-colors ${active === item.id ? "text-emerald-800 dark:text-emerald-300" : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"}`}>{item.label}{active === item.id && <span aria-hidden="true" className="absolute inset-x-3 bottom-1 h-px bg-emerald-600 dark:bg-emerald-300" />}</Link></li>)}</ul></nav>
      <div className="flex gap-2"><button type="button" className={iconButton} aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><Moon aria-hidden="true" className="size-4 dark:hidden" /><Sun aria-hidden="true" className="hidden size-4 dark:block" /></button><button ref={menuButton} type="button" className={`${iconButton} lg:hidden`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}</button></div>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen} className="border-t border-slate-200 px-6 py-4 lg:hidden dark:border-slate-800"><ul className="grid grid-cols-2 gap-1">{navigation.map((item) => <li key={item.id}><Link href={`/#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-900">{item.label}</Link></li>)}</ul></nav>
  </header>;
}

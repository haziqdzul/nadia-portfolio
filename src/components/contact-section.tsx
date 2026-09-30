"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
const emailAddress = "nnadiafairos@gmail.com";

export function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyState("copied");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopyState("idle"), 2500);
    } catch { setCopyState("error"); }
  }
  return <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
    <p className="eyebrow">Let’s connect</p>
    <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
      <div><h2 id="contact-heading" className="section-heading">Ready to make<br /><span className="text-emerald-800 dark:text-emerald-300">your data speak?</span></h2><p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">I’m interested in Business Intelligence and Business Analyst roles where I can connect requirements, data preparation, and reporting to the decisions a team needs to make.</p><p className="mt-3 max-w-xl leading-8 text-slate-600 dark:text-slate-300">Let’s discuss the questions your team is trying to answer and where I can contribute.</p></div>
      <div className="border-t border-slate-300 pt-6 dark:border-slate-700"><p className="eyebrow">Start a conversation</p><a href={`mailto:${emailAddress}`} className="mt-4 inline-flex min-h-12 max-w-full items-center gap-3 text-lg font-semibold tracking-tight sm:text-2xl"><span className="break-all">{emailAddress}</span><ArrowUpRight aria-hidden="true" className="size-5 shrink-0" /></a><div className="mt-5 flex flex-wrap items-center gap-4"><button type="button" onClick={copyEmail} className="filter-button filter-idle">{copyState === "copied" ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}{copyState === "copied" ? "Copied!" : "Copy email"}</button><p className="text-xs text-slate-500 dark:text-slate-400">I typically reply within 48 hours.</p></div><p role="status" className="mt-3 min-h-5 text-xs text-slate-600 dark:text-slate-400">{copyState === "copied" ? "Email address copied to clipboard." : copyState === "error" ? "Copy unavailable. Select the email address above or open it in your mail app." : ""}</p></div>
    </div>
  </section>;
}

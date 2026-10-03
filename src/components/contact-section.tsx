"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { KineticSignature } from "./kinetic-signature";
const emailAddress = "nnadiafairos@gmail.com";

export function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const reveal = (delay: number) => ({ initial: false as const, whileInView: { opacity: [0, 1], y: reduce ? [0, 0] : [30, 0] }, viewport: { once: true, amount: 0.15 }, transition: { duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: reduce ? 0 : delay } });
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyState("copied");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopyState("idle"), 2000);
    } catch { setCopyState("error"); }
  }
  return <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
    <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <motion.div {...reveal(0)}><p className="eyebrow">Let’s connect</p>
        <h2 id="contact-heading" className="section-heading mt-6">Good ideas start<br /><span>with a conversation.</span></h2>
        <div>
          <p className="mt-6 max-w-xl text-base leading-8">Have a project in mind, a question worth exploring, or a new perspective to share? I bring curiosity, analytical thinking, and a practical approach to turning complex ideas into something useful.</p>
          <p className="mt-3 max-w-xl leading-8">Open to collaborations, meaningful opportunities, and conversations that spark something new. Tell me what you’re working on — let’s see where it could lead.</p>
        </div></motion.div><motion.div {...reveal(0.15)} className="min-w-0">
        <p className="eyebrow">Start a conversation</p>
        <a href={`mailto:${emailAddress}`} className="contact-email mt-6 inline-flex min-h-12 max-w-full items-center gap-3 text-lg font-semibold tracking-tight sm:text-2xl"><span className="break-all">{emailAddress}</span><ArrowUpRight aria-hidden="true" className="size-5 shrink-0" /></a>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" onClick={copyEmail} className="filter-button contact-copy" data-copied={copyState === "copied"}><span className="contact-copy-icon" key={copyState}>{copyState === "copied" ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}</span><span>{copyState === "copied" ? "Copied!" : "Copy email"}</span></button>
          <p className="text-xs leading-none">I typically reply within 48 hours.</p>
        </div>
        <p role="status" className="mt-3 min-h-5 text-xs">{copyState === "copied" ? "Email address copied to clipboard." : copyState === "error" ? "Copy unavailable. Select the email address above or open it in your mail app." : ""}</p>
        <KineticSignature />
      </motion.div>
    </div>
  </section>;
}




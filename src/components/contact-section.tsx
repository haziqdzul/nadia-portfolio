"use client";

import { useState } from "react";

export function ContactSection() {
    const [copied, setCopied] = useState(false);
    const emailAddress = "nnadiafairos@gmail.com";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="mx-auto max-w-6xl px-6 py-20 sm:py-28 scroll-mt-24"
        >
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-100 via-white to-fuchsia-50 p-7 shadow-sm transition-shadow hover:shadow-lg sm:p-8 dark:border-slate-800 dark:from-violet-950/30 dark:via-slate-900 dark:to-fuchsia-950/20 text-slate-900 dark:text-white select-none">

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full border-[24px] border-white/50 dark:border-white/5"
                />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">
                            Get in touch
                        </p>

                        <h2
                            id="contact-heading"
                            className="text-4xl font-bold tracking-tight sm:text-5xl leading-none"
                        >
                            Ready to make  <br className="hidden sm:inline" />your data speak?
                        </h2>

                        <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-300 text-sm sm:text-base text-justify">
                            Whether you need to untangle chaotic IT datasets, move from basic reporting into predictive analytics, or back up your business strategies with rigorous statistical models, I am here to help. <br /> Drop me a line to discuss how we can turn your data into clear, actionable growth pathways.
                        </p>
                    </div>

                    <div className="md:col-span-5 space-y-3 w-full md:justify-self-end max-w-md">
                        <div className="flex items-center justify-between rounded-full border border-slate-200/80 bg-white/70 p-1.5 pl-5 backdrop-blur-md dark:border-slate-700 dark:bg-slate-950/50 transition-colors focus-within:ring-2 focus-within:ring-violet-500">
                            <span className="font-mono text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300 truncate pr-2">
                                {emailAddress}
                            </span>

                            <button
                                type="button"
                                onClick={handleCopy}
                                className={`h-10 min-w-[100px] px-4 text-xs font-semibold tracking-wide rounded-full text-white transition-all active:scale-[0.96] ${copied
                                        ? "bg-emerald-600 dark:bg-emerald-500/80"
                                        : "bg-slate-950 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                    }`}
                            >
                                {copied ? "Copied!" : "Copy email"}
                            </button>
                        </div>

                        <p className="text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400 pl-3">
                            Feel free to reach out anytime—I typically reply within 48 hours.            </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

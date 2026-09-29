"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import React, { useState, useEffect } from 'react';
import Image from "next/image";

const skills = ["Tableau", "SQL", "Oracle", "Power BI"] as const;


export function Hero() {
    const reduceMotion = useReducedMotion();
    const taglines = [
        "Transforming Raw Data into Strategic Insights",
        "Architecting Dashboards That Drive Business Action",
        "Turning Complex Data into Decisive Strategy",
        "Converting Massive Datasets into Corporate Value"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out the old text sequence slightly ahead of time
            setIsVisible(false);

            setTimeout(() => {
                // Update the text slice indexing counter
                setCurrentIndex((prevIndex) => (prevIndex + 1) % taglines.length);
                // Fade the clean upcoming text choice back into visual baseline
                setIsVisible(true);
            }, 800); // 500ms fade transition window
        }, 6000); // Repeats continuously every 3 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <section
            aria-labelledby="hero-heading"
            className="relative isolate overflow-hidden"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cyan-100 via-violet-50 to-pink-100 dark:from-cyan-950/50 dark:via-slate-950 dark:to-fuchsia-950/40"
            />

            <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:py-32">
                <motion.div
                    initial={false}
                    animate={
                        reduceMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: [0, 1], y: [16, 0] }
                    }
                    transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <p className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-sm select-none">
                        {/* Data engine pulse dot */}
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-90" />
                            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                        </span>
                        <span
                            className={`
                                transition-all duration-500 ease-in-out transform
                                /* Automatically modulates the micro shift and transparency values */
                                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}
                            `}
                        >
                            {taglines[currentIndex]}
                        </span>

                    </p>

                    <h1
                        id="hero-heading"
                        className="max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        Data speaks.
                        <span className="mt-2 block bg-gradient-to-r from-cyan-700 via-violet-700 to-pink-700 bg-clip-text text-transparent dark:from-cyan-300 dark:via-violet-300 dark:to-pink-300 pb-2">
                            Insights follow.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                        I’m Nadia Irdina, a data translator & strategic storyteller turning raw data into decisions people can act on.
                    </p>

                    <ul
                        aria-label="Core skills"
                        className="mt-6 flex flex-wrap gap-2"
                    >
                        {skills.map((skill) => (
                            <li
                                key={skill}
                                className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-sm font-medium dark:border-slate-700 dark:bg-slate-900/80"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="inline-block" // prevents layout shift
                        >
                            <Link
                                href="#portfolio"
                                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 font-semibold text-white transition-colors duration-300 hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-100"
                            >
                                Explore my work
                                <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="inline-block" // prevents layout shift
                        >
                            <Link
                                href="#contact"
                                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full  border border-slate-300 px-6 font-semibold  transition-colors duration-300 hover:bg-violet-100 dark:border-slate-700 dark:hover:bg-slate-700"
                            >
                                Let's talk
                                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                            </Link>
                        </motion.div>

                    </div>
                </motion.div>

                {/* <aside
                    aria-labelledby="approach-heading"
                    className="relative rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-xl shadow-violet-950/5 sm:p-10 dark:border-slate-700 dark:bg-slate-900/80"
                > */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-6 shadow-xl shadow-violet-950/5 dark:border-slate-800 dark:bg-slate-900">
                    {/* Profile Image Container with bottom fade out gradient */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-purple-50/50 to-white dark:from-slate-800 dark:to-slate-900">
                        <img
                            src="/images/profile.jpg" // Replace with your actual image path (e.g., in the public/ folder)
                            alt="Profile photo"
                            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                        {/* Soft bottom vignette gradient blend */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-slate-900 dark:via-slate-900/40" />
                    </div>

                    {/* Identity Meta Info */}
                    <div className="mt-6 space-y-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Nadia Irdina
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Business Intelligence · Business Analyst · Malaysia
                        </p>
                    </div>

                    {/* Social Contact Badge Row */}
                    <div className="mt-6 flex flex-wrap gap-2.5">
                        {/* Email Link */}
                        <a
                            href="mailto:your.email@example.com"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-100 bg-rose-50/50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-950/30 dark:bg-rose-950/20 dark:text-rose-400"
                        >
                            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                        </a>

                        {/* LinkedIn Link */}
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-100 bg-sky-50/50 px-3 py-1.5 text-xs font-semibold text-sky-600 transition-colors hover:bg-sky-50 dark:border-sky-950/30 dark:bg-sky-950/20 dark:text-sky-400"
                        >
                            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                            LinkedIn
                        </a>

                        {/* GitHub Link */}
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                        >
                            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>

                {/* </aside> */}
            </div>
        </section>
    );
}
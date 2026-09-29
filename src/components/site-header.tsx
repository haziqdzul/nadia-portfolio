"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring } from "framer-motion";

const navigation = [
    { label: "How I Work", href: "/#how" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Skill", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/#about" },
] as const;

const iconButtonClass =
    "inline-flex size-11 items-center justify-center rounded-full " +
    "border border-slate-200 bg-white text-slate-700 " +
    "transition-colors hover:bg-slate-100 " +
    "dark:border-slate-800 dark:bg-slate-900 " +
    "dark:text-slate-200 dark:hover:bg-slate-800";

export function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("");
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const { resolvedTheme, setTheme } = useTheme();
    const [isRinging, setIsRinging] = useState(false);

    // Scroll Progress Bar Logic
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // MERGE POINT 2: Add the new 5-Second Timer Hook
    useEffect(() => {
        setIsRinging(true);
        const stopInitial = setTimeout(() => setIsRinging(false), 1000);

        const interval = setInterval(() => {
            setIsRinging(true);
            setTimeout(() => setIsRinging(false), 1000);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(stopInitial);
        };
    }, []);
    // --- NEW: Scroll Spy Logic (Updates Active Tab on Scroll) ---
    useEffect(() => {

        // A. Scroll Listener: Clears tabs if at the very top
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveTab(""); // Clear selection at top of page
            }
        };

        window.addEventListener("scroll", handleScroll);

        // B. Observer: Highlights tabs when scrolling down
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(`/#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px", // Trigger in middle of screen
            }
        );

        navigation.forEach((nav) => {
            const sectionId = nav.href.replace("/#", "");
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);


    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header

        
            className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80 transition-colors"
            onKeyDown={(event) => {
                if (event.key === "Escape" && menuOpen) {
                    event.preventDefault();
                    closeMenu();
                    menuButtonRef.current?.focus();
                }
            }}
        >
            
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 relative">
                {/* LEFT ZONE: Branding */}
                <Link
                    href="/"
                    onClick={() => {
                        closeMenu();
                        setActiveTab("");
                    }}
                    className="flex items-center gap-3 group focus:outline-none"
                >
                    <div
                        className={`
                    flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 border text-sm font-bold text-slate-800 transition-all duration-500 dark:bg-zinc-900 dark:text-white
                    
                    /* RINGING EFFECT: Emerald border glows and custom radial shadow drops */
                    ${isRinging
                                ? 'border-emerald-500 bg-emerald-50/40 shadow-lg shadow-emerald-500/20 dark:bg-emerald-950/20 dark:border-emerald-400 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                : 'border-slate-200 dark:border-zinc-800 shadow-none'
                            }
                    
                    /* Manual hover color adjustment override */
                    group-hover:border-emerald-500/40
                `}
                    >
                        {/* The Ringing/Twisting animation now only applies to the Matcha Cup itself! */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth={isRinging ? "2.5" : "2"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`
        h-5 w-5 transition-colors duration-300 
        
        /* 1. IDLE BASE COLOR */
        text-black dark:text-white 
        
        /* 2. AUTOMATIC RINGING LOOP COLOR & MOTION */
        ${isRinging ? 'animate-[iconTwist_0.8s_ease-in-out] text-emerald-600 dark:text-emerald-400' : ''}
    `}
                        >
                            {/* By changing 'stroke="currentColor"' to 'stroke="currentColor"' inside the paths, 
        they are now fully forced to obey the 'text-black' class utility rule! */}
                            <path stroke="currentColor" d="M2 11c0 5.5 4.5 9 10 9s10-3.5 10-9H2z" />
                            <path stroke="currentColor" d="M2 13c3-1 6-1 9 0s6 1 11 0" />
                            <path stroke="currentColor" d="M9 6c.5 1.5 2 2 2 2s-.5-1.5-2-2z" />
                            <path stroke="currentColor" d="M14 5c.3 1 .8 1.5 1.5 1.5s0-1-1.5-1.5z" />
                        </svg>

                    </div>
                    <div 
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
                style={{
                    // Gradient mask makes data lines solid on the left, but turns them transparent before hitting the right-side nav menu links
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 90%)',
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 90%)'
                }}
            >
                {/* Top Data Pipeline: Scrolling Left to Right */}
                <div className="absolute whitespace-nowrap text-[8px] font-mono tracking-[0.25em] uppercase text-slate-400/80 dark:text-zinc-500 animate-global-stream top-2 flex gap-6 w-full">
                    <span>01011001 BI_ANALYST SQL_SUCCESS DATAFRAME_LOADED MATRIX_INIT PIPELINE_RUNNING METRICS_STABLE // 01011001 BI_ANALYST SQL_SUCCESS DATAFRAME_LOADED MATRIX_INIT PIPELINE_RUNNING METRICS_STABLE // 01011001 BI_ANALYST SQL_SUCCESS DATAFRAME_LOADED</span>
                </div>
                
                {/* Bottom Data Pipeline: Scrolling Right to Left */}
                <div className="absolute whitespace-nowrap text-[8px] font-mono tracking-[0.25em] uppercase text-slate-400/80 dark:text-zinc-500 animate-global-stream bottom-2 flex gap-6 w-full" style={{ animationDirection: 'reverse' }}>
                    <span>LOAD_METRICS POWER_BI TABLEAU_RENDER TRUE MATCHA_POWER DB_CONNECTION_OK ANALYTICS_CONNECTED // LOAD_METRICS POWER_BI TABLEAU_RENDER TRUE MATCHA_POWER DB_CONNECTION_OK ANALYTICS_CONNECTED // LOAD_METRICS POWER_BI TABLEAU_RENDER</span>
                </div>
            </div>
                   {/* TYPOGRAPHY TEXT ZONE (High-contrast data stream visibility in Dark Mode) */}
<div className="relative z-10 flex flex-col justify-center min-w-[190px]">
    
    {/* ── CENTRALIZED STYLE INNER SHEET (Guarantees animations & fonts run together) ── */}
   <style>{`
    /* Font Imports */
    @import url('https://googleapis.com');
    
    .font-tech-name { font-family: 'Space Grotesk', sans-serif; }
    .font-tech-mono { font-family: 'Space Mono', monospace; }

    /* Global Infinite Header Background Data Stream Animation */
    @keyframes globalDataFlow {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.33%); }
    }
    
    /* CORRECTION FIX: The class name now matches the div classes below perfectly! */
    .animate-global-stream {
        animation: globalDataFlow 30s linear infinite;
    }
`}</style>

    

    {/* ── FOREGROUND USER PROFILE TEXT ── */}
    <span 
        className={`
            relative z-10 font-bold text-sm tracking-wide transition-colors duration-500 leading-tight
            ${isRinging ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-zinc-100'}
        `}
    >
        Nadia Irdina
    </span>
    
    <span 
        className={`
            relative z-10 text-xs transition-all duration-500 mt-0.5 inline-block origin-bottom
            ${isRinging 
              ? 'animate-[microBounce_0.8s_ease-in-out] text-emerald-700/90 dark:text-emerald-400/90 font-medium' 
              : 'text-slate-500 dark:text-zinc-400'
            }
        `}
    >
        BI Analyst · Matcha Powered 🍵
    </span>
</div>






                </Link>

                {/* CENTER ZONE: Navigation */}
                <nav aria-label="Main navigation" className="hidden md:block">
                    <ul className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/60 p-1.5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                        {navigation.map((item) => {
                            const isSelected = activeTab === item.href;
                            return (
                                <li key={item.href} className="relative z-0">
                                    <Link
                                        href={item.href}
                                        // We keep onClick to give immediate feedback before the scroll animation finishes
                                        onClick={() => setActiveTab(item.href)}
                                        className={`relative z-10 block px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${isSelected
                                            ? "text-slate-900 dark:text-white"
                                            : "text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                    {isSelected && (
                                        <motion.span
                                            layoutId="activeTabPill"
                                            layout
                                            className="absolute inset-0 z-0 rounded-full bg-slate-200/60 dark:bg-zinc-800"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* RIGHT ZONE: Controls */}
                <div className="flex items-center gap-3">
    
    {/* ── CONTACT ME BUTTON (Reversed Theme with Left-to-Right Matcha Green Hover Fill Effect) ── */}
    <Link
        href="/#contact"
        onClick={closeMenu}
        className="
            /* 1. Base Dimensions & Alignment */
            hidden md:inline-flex h-11 items-center justify-center rounded-full px-6 text-xs font-semibold tracking-wide 
            
            /* 2. LIGHT MODE BASE: Solid black background with crisp white text */
            bg-[#111111] text-white border border-[#111111]
            
            /* 3. DARK MODE BASE: Solid white background with sharp black text */
            dark:bg-white dark:text-black dark:border-white
            
            /* 4. Core Layout Mechanics */
            relative overflow-hidden transition-all duration-300 ease-in-out active:scale-[0.98] shadow-sm
            
            /* 5. BACKGROUND FILL LAYER (Starts collapsed on the far left side with 0 width) */
            before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 
            before:bg-emerald-600 before:transition-all before:duration-500 before:ease-out
            
            /* 6. HOVER STATE MODIFIERS (Stretches background to 100% width and sets text alignment rules) */
            hover:text-white dark:hover:text-black hover:border-emerald-600 dark:hover:border-emerald-600
            hover:before:w-full hover:shadow-lg hover:shadow-emerald-500/20
        "
    >
        {/* VITAL: The text must be wrapped inside a relative z-10 block to stack on top of the green slide layer */}
        <span className="relative z-10 transition-colors duration-300">Contact me</span>
    </Link>

    {/* THEME TOGGLE BUTTON (Unchanged) */}
    <button
        type="button"
        className={iconButtonClass}
        aria-label="Toggle theme"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
        <Moon aria-hidden="true" className="size-5 dark:hidden" />
        <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>

    {/* MOBILE MENU TOGGLE BUTTON (Unchanged) */}
    <button
        ref={menuButtonRef}
        type="button"
        className={`${iconButtonClass} md:hidden`}
        onClick={() => setMenuOpen((open) => !open)}
    >
        {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
</div>



                {/* Scroll Progress Bar (Bottom of Header) */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left z-50"
                    style={{ scaleX }}
                />
            </div>

            {/* Mobile Menu */}
            <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                hidden={!menuOpen}
                className="border-t border-slate-200 px-6 py-4 md:hidden dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl"
            >
                <ul className="mx-auto max-w-6xl space-y-1">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={closeMenu}
                                className="block rounded-xl px-4 py-3 font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-900"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

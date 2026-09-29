"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

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
    const [activeTab, setActiveTab] = useState<string>("/#");
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const { resolvedTheme, setTheme } = useTheme();

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header
            className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/90"
            onKeyDown={(event) => {
                if (event.key === "Escape" && menuOpen) {
                    event.preventDefault();
                    closeMenu();
                    menuButtonRef.current?.focus();
                }
            }}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    closeMenu();
                }
            }}
        >
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                <Link
                    href="/"
                    onClick={() => {
    closeMenu();
    setActiveTab(""); // Clears the underline state so no item is highlighted
  }}
                    aria-label="Nadia Irdina — home"
                    className="font-heading text-xl font-extrabold tracking-tight"
                >
                    Nadia Irdina<span className="text-violet-600 dark:text-violet-400">.</span>
                </Link>

                {/* Navigation Options Links Block */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navigation.map((item) => {
              const isSelected = activeTab === item.href;
              
              return (
                <li key={item.href} className="relative py-2">
                  <Link
                    href={item.href}
                    onClick={() => setActiveTab(item.href)}
                    className={`text-base font-medium tracking-wide transition-colors relative z-10 ${
                      isSelected 
                        ? "text-black dark:text-white" 
                        : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Fluid Underline Slider Element */}
                  {isSelected && (
                    <motion.span 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 h-[2px] w-4 bg-black dark:bg-white"
                      transition={{ 
                        type: "spring", 
                        stiffness: 380, 
                        damping: 30 
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

                <div className="flex items-center gap-2">

                    <Link
            href="/#contact"
            onClick={closeMenu}
            className="hidden md:inline-flex h-12 items-center justify-center rounded-xl bg-[#111111] px-6 text-sm font-semibold tracking-wide text-white transition-transform active:scale-[0.98] hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Contact me
          </Link>
          
                    <button
                        type="button"
                        className={iconButtonClass}
                        aria-label="Toggle light and dark color theme"
                        onClick={() => {
                            setTheme(resolvedTheme === "dark" ? "light" : "dark");
                        }}
                    >
                        <Moon aria-hidden="true" className="size-5 dark:hidden" />
                        <Sun aria-hidden="true" className="hidden size-5 dark:block" />
                    </button>

                    <button
                        ref={menuButtonRef}
                        type="button"
                        className={`${iconButtonClass} md:hidden`}
                        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? (
                            <X aria-hidden="true" className="size-5" />
                        ) : (
                            <Menu aria-hidden="true" className="size-5" />
                        )}
                    </button>
                </div>
            </div>

            <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                hidden={!menuOpen}
                className="border-t border-slate-200 px-6 py-4 md:hidden dark:border-slate-800"
            >
                <ul className="mx-auto max-w-6xl space-y-1">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={closeMenu}
                                className="block rounded-xl px-4 py-3 font-medium transition-colors hover:bg-violet-50 dark:hover:bg-slate-900"
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


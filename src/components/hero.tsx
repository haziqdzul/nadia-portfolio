"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { InteractiveLab } from "./interactive-lab";
import { HeroIntro } from "./hero-intro";
import { PolicyContext } from "./policy-simulator";
import { PipelineCover } from "./pipeline-cover";
import { RevenueStory } from "./revenue-story";

export function Hero() {
  const [labIndex, setLabIndex] = useState(0);
  const [labsOpen, setLabsOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const labArea = useRef<HTMLDivElement>(null);
  function toggleLabs(open: boolean) {
    setLabsOpen(open);
    if (open) setAdvanced(false);
    requestAnimationFrame(() => labArea.current?.querySelector<HTMLButtonElement>(open ? "[data-back-cover]" : "[data-cover] .action-button")?.focus({ preventScroll: true }));
  }
  
  return (
    <section aria-labelledby="hero-heading" className="relative border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-24 lg:pt-28">
        
        {/* Parent layout grid wrapper */}
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
          
          {/* Left Column Container */}
          <div className="flex min-w-0 flex-col items-start w-full">
            {/* Always Visible: Your main header */}
            <HeroIntro />
            
            {/* Always Visible: Your main introductory paragraph */}
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-lg">
              I’m Nadia Irdina, a Business Intelligence Analyst. I translate business questions into structured requirements, dependable data, and decision-ready dashboards.
            </p>
            
            {/* Action Buttons Container */}
            <div className="mt-6 flex flex-wrap items-center gap-4 w-full">
              <Link href="#portfolio" className="action-button">
                Explore my work <ArrowDownRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href="#contact" className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-medium">
                Let’s talk <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            {/* Profile Card & Social Links */}
            <div className="mt-8 w-full max-w-lg flex items-center gap-4 border-t border-slate-200 pt-5 dark:border-slate-800">
              <Image 
                src="/images/profile.jpg" 
                alt="Nadia Irdina" 
                width={64} 
                height={64} 
                sizes="64px" 
                className="size-16 rounded-full object-cover object-top shrink-0" 
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-slate-900 dark:text-white">Nadia Irdina</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Statistics background. Business perspective.
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Based in Malaysia · Insights Enthusiast
                </p>
                
                {/* Social Network Inline Icons row */}
                <div className="flex items-center gap-4 mt-3 pl-0.5">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="mailto:nnadiafairos@gmail.com" 
                    aria-label="Send Email"
                    className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            {labsOpen && advanced && <PolicyContext index={labIndex} />}
          </div>
          
          {/* Right Side Canvas Component */}
          <div ref={labArea} className="min-w-0 self-start">
            <div data-cover hidden={labsOpen}><PipelineCover active={!labsOpen} onOpen={() => toggleLabs(true)} /></div>
            <div hidden={!labsOpen}>
              <button data-back-cover type="button" onClick={() => toggleLabs(false)} className="mb-3 min-h-11 text-sm font-semibold text-emerald-800 dark:text-emerald-300">← Back to pipeline</button>
              <div hidden={advanced}><RevenueStory onAdvanced={() => setAdvanced(true)} /></div>
              <div hidden={!advanced}>
                <button type="button" onClick={() => setAdvanced(false)} className="mb-3 min-h-11 text-sm font-semibold text-emerald-800 dark:text-emerald-300">← Back to the sales story</button>
                <InteractiveLab index={labIndex} onSelect={setLabIndex} />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}






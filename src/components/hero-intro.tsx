"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const roles = ["Business Intelligence Analyst", "Data Translator", "Decision Enabler"] as const;

export function HeroIntro() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={paused ? "hero-intro hero-motion-paused" : "hero-intro"}>
      <div className="flex min-h-11 items-center gap-3">
        <p className="eyebrow flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-300" />
          <span className="sr-only">Business Intelligence Analyst. Data Translator. Decision Enabler.</span>
          <span aria-hidden="true" className="grid min-w-0">
            {roles.map((role, index) => (
              <span key={role} className="hero-role col-start-1 row-start-1" style={{ animationDelay: `${index * 4}s` }}>{role}</span>
            ))}
          </span>
        </p>
        <button
          type="button"
          aria-label={paused ? "Play hero animation" : "Pause hero animation"}
          onClick={() => setPaused((value) => !value)}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-400 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 motion-reduce:hidden"
        >
          {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
        </button>
      </div>
      <h1 id="hero-heading" className="mt-5 text-[clamp(3.1rem,6.5vw,5.5rem)] font-semibold leading-[1.06] tracking-[-0.065em]">
        <span className="sr-only">Data speaks. Insights follow.</span>
        <span aria-hidden="true">
          <span className="hero-data inline-block">Data</span>{" "}
          <span className="hero-speaks inline-block">speaks.</span>
          <br />
          <span className="text-emerald-800 dark:text-emerald-300">
            <span className="hero-insights inline-block">Insights</span>{" "}
            <span className="hero-follows inline-block">follow.</span>
          </span>
        </span>
      </h1>
    </div>
  );
}

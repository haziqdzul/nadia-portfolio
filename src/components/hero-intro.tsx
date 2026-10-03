"use client";

import { KineticHeadline } from "./kinetic-headline";
import { useInteractionPause } from "./use-interaction-pause";


const roles = ["Business Intelligence Analyst", "Data Translator", "Decision Enabler"] as const;

export function HeroIntro() {
  const { paused, handlers } = useInteractionPause();

  return (
    <div {...handlers} tabIndex={0} aria-label="Animated introduction. Hover or focus to pause; click or tap to toggle playback." className={paused ? "hero-intro hero-motion-paused" : "hero-intro"}>
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

      </div>
      <h1 id="hero-heading" className="hero-title mt-5 font-extrabold tracking-[-0.05em]">

        <span>
          <span className="hero-data inline-block">Data</span>{" "}
          <span className="hero-speaks inline-block">speaks.</span>
          <br />
          <KineticHeadline />
        </span>
      </h1>
    </div>
  );
}



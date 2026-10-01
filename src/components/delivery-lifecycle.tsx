"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

export type LifecycleStage = Readonly<{
  title: string;
  tagline: string;
  description: string;
  deliverables: readonly string[];
  experienceMilestones: readonly string[];
}>;

// Editable portfolio content adapted from the supplied reference.
export const lifecycleStages = [
  {
    title: "Requirements gathering",
    tagline: "Start with the decision",
    description: "I clarify the decision a team needs to make, then define the questions, measures, and source data needed to support it. Agreeing the scope early gives everyone a shared direction.",
    deliverables: ["Scope and requirements brief", "Agreed metric definitions", "Platform requirements review"],
    experienceMilestones: ["DOSM STATSDW requirements", "Enforcement agency use-case scoping"],
  },
  {
    title: "SME engagement",
    tagline: "Make expertise reusable",
    description: "I work with subject-matter experts to surface business rules, data gaps, and operational context. Workshop findings become structured input that the delivery team can use and validate.",
    deliverables: ["Structured expert findings", "Facilitated discovery workshops", "Follow-up coaching notes"],
    experienceMilestones: ["Seven-column thematic framework", "Two-day STATSDW expansion workshop"],
  },
  {
    title: "Business process analysis",
    tagline: "Follow the real workflow",
    description: "I trace how information and decisions move through a service, documenting handoffs and friction points. Those workflows guide the use cases and reporting requirements.",
    deliverables: ["Current-state workflow maps", "Process gaps and pain points", "Mapped business use cases"],
    experienceMilestones: ["DOSM workflow analysis", "Nine enforcement use cases mapped"],
  },
  {
    title: "Data cleaning & transformation",
    tagline: "Build a dependable foundation",
    description: "I assess source readiness, standardize structures and types, and record inconsistencies for review. Transformations stay explicit so issues can be traced back to their origin.",
    deliverables: ["Data readiness assessment", "Schema mappings and Oracle DDL", "Source-data issue register"],
    experienceMilestones: ["Doris / StarRocks to Oracle migration", "STATSDW data readiness checks"],
  },
  {
    title: "Dashboard design",
    tagline: "Make the next question easy",
    description: "I organize dashboards around the decisions users make most often. Clear summaries, consistent filters, and accessible detail help people investigate without losing context.",
    deliverables: ["Decision-focused Tableau views", "KPI and visualization specifications", "Consistent cross-filter behavior"],
    experienceMilestones: ["CIDB consultant performance profiling", "Public-sector reporting dashboards"],
  },
  {
    title: "UAT facilitation",
    tagline: "Make acceptance evidence-based",
    description: "I help users test realistic scenarios against agreed requirements. Findings are recorded with owners and follow-up actions, giving the team a clear basis for acceptance.",
    deliverables: ["UAT scenarios and test sessions", "Defect logs and follow-up tracking", "PAT / TOT / TOK coordination"],
    experienceMilestones: ["DOSM UAT · March 2025", "DOSM PAT / TOT / TOK · April 2025"],
  },
  {
    title: "Delivery & training",
    tagline: "Support adoption beyond launch",
    description: "I prepare users to work confidently with the system, support the transition into live use, and follow through on acceptance activities so delivery leads to practical adoption.",
    deliverables: ["User training and guidance", "Go-live assistance", "Final acceptance support"],
    experienceMilestones: ["DOSM go-live · June 2025", "DOSM FAT · July 2025"],
  },
] as const satisfies readonly LifecycleStage[];

// React uses the server snapshot during hydration, then reads the client snapshot.
const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function DeliveryLifecycle() {
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playback, setPlayback] = useState<boolean | null>(null);
  // Autoplay after hydration unless reduced motion is preferred; manual controls override it.
  const isPlaying = hydrated && (playback ?? reducedMotion === false);
  const stage = lifecycleStages[activeIndex];

  useEffect(() => {
    if (!isPlaying || !inView) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    function synchronizeTimer() {
      clearInterval(timer);
      if (!document.hidden) {
        timer = setInterval(() => {
          setActiveIndex((index) => (index + 1) % lifecycleStages.length);
        }, 5000);
      }
    }
    synchronizeTimer();
    document.addEventListener("visibilitychange", synchronizeTimer);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", synchronizeTimer);
    };
  }, [isPlaying, inView]);

  function selectStep(index: number) {
    setPlayback(false);
    setActiveIndex(index);
  }

  function handleStepKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = (index + 1) % lifecycleStages.length; break;
      case "ArrowUp": next = (index - 1 + lifecycleStages.length) % lifecycleStages.length; break;
      case "Home": next = 0; break;
      case "End": next = lifecycleStages.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectStep(next);
    stepRefs.current[next]?.focus();
  }

  return (
    <section ref={sectionRef} id="how" aria-labelledby={`${id}-heading`} className="scroll-mt-20 bg-slate-50 py-20 text-slate-900 dark:bg-[#0b0f17] dark:text-zinc-100 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-zinc-400">03 / How I work</p>
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <h2 id={`${id}-heading`} className="section-heading">My contribution across the delivery lifecycle</h2>
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400"><span aria-hidden="true" className={`size-1.5 rounded-full ${isPlaying ? "bg-emerald-600 dark:bg-emerald-300" : "bg-zinc-500"}`} />{isPlaying ? "Auto-playing" : "Paused"}</span>
            <button type="button" onClick={() => setPlayback(!isPlaying)} aria-controls={`${id}-panel`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white dark:border-white/15 dark:bg-white/5 px-4 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 dark:text-zinc-100 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:focus-visible:outline-emerald-300 motion-reduce:transition-none">
              {isPlaying ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)]">
          <ol aria-label="Delivery lifecycle stages" className="relative space-y-1">
            <li aria-hidden="true" className="pointer-events-none absolute bottom-6 left-6 top-6 w-px bg-slate-200 dark:bg-white/10">
              <span className="block w-full origin-top bg-emerald-600/70 dark:bg-emerald-300/70 transition-[height] duration-300 motion-reduce:transition-none" style={{ height: `${activeIndex / (lifecycleStages.length - 1) * 100}%` }} />
            </li>
            {lifecycleStages.map((item, index) => (
              <li key={item.title} className="relative">
                <button
                  ref={(element) => { stepRefs.current[index] = element; }}
                  type="button"
                  aria-current={index === activeIndex ? "step" : undefined}
                  aria-controls={`${id}-panel`}
                  onClick={() => selectStep(index)}
                  onFocus={() => setPlayback(false)}
                  onKeyDown={(event) => handleStepKey(event, index)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:focus-visible:outline-emerald-300 motion-reduce:transition-none ${index === activeIndex ? "bg-emerald-100/80 font-semibold text-slate-950 dark:bg-white/[0.07] dark:text-white" : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"}`}
                >
                  <span aria-hidden="true" className={`relative flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${index === activeIndex ? "border-emerald-700 bg-emerald-700 text-white dark:border-emerald-200 dark:bg-emerald-200 dark:text-[#0b0f17]" : "border-emerald-700/40 bg-slate-50 text-emerald-800 dark:border-emerald-200/35 dark:bg-[#0b0f17] dark:text-emerald-200/80"}`}>{index + 1}</span>
                  <span><span className="sr-only">Step {index + 1}: </span>{item.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div id={`${id}-panel`} role="region" aria-label="Selected lifecycle stage" tabIndex={0} onFocus={() => setPlayback(false)} className="relative isolate min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#141e22] p-6 shadow-xl shadow-slate-900/5 dark:shadow-black/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 dark:focus-visible:outline-emerald-300 sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 text-emerald-900 opacity-[0.045] dark:text-emerald-200 dark:opacity-[0.035]" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <motion.div key={activeIndex} initial={!hydrated || reducedMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }} className="relative min-h-[25rem]">
              <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-3 select-none font-mono text-7xl font-bold tracking-tighter text-emerald-900/[0.07] dark:text-emerald-200/[0.07] sm:text-8xl">{String(activeIndex + 1).padStart(2, "0")}</span>
              <p className="relative font-mono text-xs uppercase tracking-[0.16em] text-emerald-800 dark:text-emerald-200/80">Stage {activeIndex + 1} of {lifecycleStages.length}</p>
              <h3 className="relative mt-3 max-w-lg text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{stage.title}</h3>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-200/70">{stage.tagline}</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">{stage.description}</p>
              <div className="mt-8 grid gap-7 border-t border-slate-200 dark:border-white/10 pt-6 sm:grid-cols-2">
                {([
                  ["What I deliver", stage.deliverables],
                  ["Where I've done it", stage.experienceMilestones],
                ] as const).map(([heading, items]) => (
                  <div key={heading}>
                    <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600 dark:text-zinc-400">{heading}</h4>
                    <ul className="mt-3 space-y-3">{items.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate-700 dark:text-zinc-200"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-[1px] bg-emerald-700 dark:bg-emerald-200/80" />{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <p className="sr-only" role="status" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">Stage {activeIndex + 1} of {lifecycleStages.length}: {stage.title}</p>
      </div>
    </section>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const stages = [
  { title: "Raw data", detail: "Many inputs. No shared picture.", label: "Find the signal" },
  { title: "Structure", detail: "Consistent fields. A common language.", label: "Connect the evidence" },
  { title: "Insight", detail: "Relationships become visible.", label: "Make it actionable" },
  { title: "Decision", detail: "A clear question. An informed next step.", label: "Explore again" },
] as const;

// Deterministic positions keep the server and first client render identical.
function point(index: number, stage: number) {
  if (stage === 0) return { x: 36 + (index * 71) % 328, y: 35 + (index * 47) % 154 };
  if (stage === 1) return { x: 64 + (index % 6) * 54, y: 52 + Math.floor(index / 6) * 48 };
  if (stage === 2) return { x: 40 + index * 14, y: 183 - index * 6 + (index % 3) * 14 };
  return { x: 150 + (index % 6) * 19, y: 80 + Math.floor(index / 6) * 19 };
}

export function DataTransformation() {
  const [stage, setStage] = useState(0);
  const [manual, setManual] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container, { amount: 0.6 });
  const reduce = useReducedMotion();
  // One short introduction; never loops or runs offscreen. Any interaction stops it.
  useEffect(() => {
    if (manual || reduce !== false || !inView || stage === 3) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const sync = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(() => setStage((current) => Math.min(3, current + 1)), 1100);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", sync); };
  }, [inView, manual, reduce, stage]);
  function selectStage(next: number) { setManual(true); setStage(next); }
  return (
    <div ref={container} onFocus={() => setManual(true)} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <span className="eyebrow">From complexity to clarity</span>
        <span className="font-mono text-xs text-emerald-700 dark:text-emerald-300">0{stage + 1} / 04</span>
      </div>
      <svg aria-hidden="true" viewBox="0 0 400 225" className="w-full text-emerald-700 dark:text-emerald-300">
        {[40, 88, 136, 184].map((y) => <path key={y} d={`M24 ${y}H376`} className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="2 6" />)}
        <motion.path initial={false} animate={{ opacity: stage === 2 ? 0.65 : 0 }} d="M35 195L355 64" stroke="currentColor" strokeWidth="1.5" />
        {Array.from({ length: 24 }, (_, i) => {
          const position = point(i, stage);
          return <motion.circle key={i} initial={false} animate={{ cx: position.x, cy: position.y, r: stage === 3 ? 6 : 4, opacity: stage === 2 && i % 3 === 0 ? 0.35 : 0.85 }} transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.004 }} fill="currentColor" />;
        })}
        <motion.rect initial={false} animate={{ opacity: stage === 3 ? 1 : 0 }} x="133" y="61" width="132" height="97" rx="12" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="px-5 pb-5">
        <p className="text-xl font-semibold" aria-live={manual ? "polite" : "off"}>{stages[stage].title}</p>
        <p className="mt-1 min-h-10 text-sm text-slate-600 dark:text-slate-400">{stages[stage].detail}</p>
        <div className="mt-3 grid grid-cols-4 gap-1" aria-label="Explore the transformation">
          {stages.map((item, i) => <button key={item.title} type="button" aria-pressed={stage === i} onClick={() => selectStage(i)} className={`min-h-11 border-t-2 px-1 text-xs transition-colors ${stage === i ? "border-emerald-600 font-semibold text-emerald-800 dark:border-emerald-300 dark:text-emerald-300" : "border-slate-200 text-slate-600 hover:border-emerald-500 dark:border-slate-700 dark:text-slate-400"}`}>{item.title}</button>)}
        </div>
        <button type="button" onClick={() => selectStage((stage + 1) % stages.length)} className="mt-3 flex min-h-11 w-full items-center justify-between rounded-lg bg-slate-100 px-4 text-sm font-medium transition-colors hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-slate-700">{stages[stage].label}<ArrowRight className="size-4" aria-hidden="true" /></button>
        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">Interactive process illustration · not client data</p>
      </div>
    </div>
  );
}

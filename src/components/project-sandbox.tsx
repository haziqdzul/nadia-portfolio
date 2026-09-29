"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";

const stages = ["Raw", "Cleaned", "Insight"] as const;
type Stage = (typeof stages)[number];
const months = ["Jan", "Feb", "Mar", "Apr"] as const;
type Month = (typeof months)[number];
type SampleRow = Readonly<{ id: string; month: Month; value: number | null }>;

// Fictional, deterministic input. No customer records or network requests.
const validRows: readonly SampleRow[] = Array.from({ length: 12 }, (_, i) => ({
  id: `R${String(i + 1).padStart(2, "0")}`,
  month: months[i < 2 ? 0 : i < 4 ? 1 : i < 7 ? 2 : 3],
  value: 20 + i * 7,
}));
const sample: readonly SampleRow[] = [
  ...validRows,
  { id: "R13", month: "Feb", value: null },
  { id: "R14", month: "Mar", value: null },
  { id: "R01", month: "Jan", value: 20 },
  { id: "R02", month: "Jan", value: 27 },
];
const seen = new Set<string>();
const records = sample.map((row, index) => {
  const issue = row.value === null ? "Missing value" : seen.has(row.id) ? "Duplicate ID" : null;
  if (!issue) seen.add(row.id);
  return { ...row, key: `${row.id}-${index}`, issue };
});
const cleaned = records.filter((row) => !row.issue);
const counts = months.map((month) => cleaned.filter((row) => row.month === month).length);
const missing = records.filter((row) => row.issue === "Missing value").length;
const duplicates = records.filter((row) => row.issue === "Duplicate ID").length;
const summaries: Record<Stage, string> = {
  Raw: `${records.length} records · ${missing} missing values · ${duplicates} duplicate IDs`,
  Cleaned: `${cleaned.length} valid records · ${records.length - cleaned.length} excluded · IDs deduplicated`,
  Insight: months.map((month, i) => `${month}: ${counts[i]}`).join(" · "),
};
const explanations: Record<Stage, string> = {
  Raw: "Inspect the incoming records. Pink dots identify missing values or duplicate IDs.",
  Cleaned: "Exclude missing values, keep the first valid record for each ID, and organize the remaining rows.",
  Insight: "Group the cleaned records by month. Each dot represents one valid record, not its numeric value.",
};

type ProjectSandboxProps = Readonly<{ title?: string; className?: string }>;

export function ProjectSandbox({ title = "Data pipeline", className = "" }: ProjectSandboxProps) {
  const id = useId();
  const [stage, setStage] = useState<Stage>("Raw");
  const [playing, setPlaying] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();

  // Runs only after an explicit click. Manual selection cancels playback.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      const next = stages[stages.indexOf(stage) + 1];
      if (next) setStage(next);
      else setPlaying(false);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [playing, stage]);

  function selectStage(next: Stage) {
    setPlaying(false);
    setStage(next);
  }

  function handleKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % stages.length; break;
      case "ArrowLeft": next = (index + stages.length - 1) % stages.length; break;
      case "Home": next = 0; break;
      case "End": next = stages.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectStage(stages[next]);
    tabs.current[next]?.focus();
  }

  const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 text-xs font-semibold transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800";

  return (
    <section aria-label={`${title} interactive preview`} className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-950/80 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
        <p className="flex items-center gap-2 font-mono text-xs font-semibold">
          <span aria-hidden="true" className="size-2 rounded-full bg-violet-500" />
          {title}
        </p>
        <span className="text-xs text-slate-500 dark:text-slate-400">Illustrative sample · local only</span>
      </div>

      <div className="p-4 sm:p-5">
        <div role="tablist" aria-label="Pipeline stage" className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
          {stages.map((item, index) => (
            <button
              key={item}
              ref={(element) => { tabs.current[index] = element; }}
              id={`${id}-tab-${item}`}
              type="button"
              role="tab"
              aria-selected={stage === item}
              aria-controls={`${id}-panel`}
              tabIndex={stage === item ? 0 : -1}
              onClick={() => selectStage(item)}
              onKeyDown={(event) => handleKeys(event, index)}
              className={`min-h-11 rounded-lg px-2 text-sm font-semibold transition-colors ${stage === item ? "bg-white text-violet-800 shadow-sm dark:bg-slate-800 dark:text-violet-300" : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </div>

          <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${stage}`} tabIndex={0} className="mt-4 rounded-lg">
                <p className="min-h-16 text-sm leading-6 text-slate-600 dark:text-slate-300">{explanations[stage]}</p>
                <svg viewBox="0 0 440 270" role="img" aria-label={`${title}: ${stage}. ${summaries[stage]}`} className="block h-auto w-full rounded-xl bg-slate-50 dark:bg-slate-900/70">
                  {[60, 110, 160, 210].map((y) => <line key={y} x1="30" x2="410" y1={y} y2={y} className="stroke-slate-200 dark:stroke-slate-800" />)}
                  {records.map((row, index) => {
                    const cleanIndex = cleaned.findIndex((candidate) => candidate.key === row.key);
                    const monthIndex = months.indexOf(row.month);
                    const rank = cleaned.slice(0, Math.max(0, cleanIndex)).filter((candidate) => candidate.month === row.month).length;
                    const x = stage === "Raw" ? 38 + ((index * 83) % 365) : stage === "Cleaned" ? 70 + (cleanIndex % 4) * 100 : 70 + monthIndex * 100;
                    const y = stage === "Raw" ? 35 + ((index * 47) % 180) : stage === "Cleaned" ? 65 + Math.floor(cleanIndex / 4) * 60 : 215 - rank * 32;
                    return (
                      <motion.circle key={row.key} initial={false} animate={{ cx: x, cy: y, opacity: stage !== "Raw" && row.issue ? 0 : 1 }} transition={{ duration: reduceMotion ? 0 : 0.45 }} r="8" className={row.issue ? "fill-rose-600 dark:fill-rose-400" : "fill-violet-600 dark:fill-violet-400"} />
                    );
                  })}
                  {stage === "Insight" && months.map((month, index) => (
                    <text key={month} x={70 + index * 100} y="253" textAnchor="middle" className="fill-slate-600 text-xs dark:fill-slate-300">{month} ({counts[index]})</text>
                  ))}
                </svg>
          </div>

        <p role="status" aria-live="polite" aria-atomic="true" className="mt-4 min-h-10 font-mono text-xs leading-5 text-violet-800 dark:text-violet-300">{summaries[stage]}</p>

        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonClass} onClick={() => {
            if (playing) setPlaying(false);
            else { setStage("Raw"); setPlaying(true); }
          }}>
            {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            {playing ? "Pause walkthrough" : "Play walkthrough"}
          </button>
          <button type="button" className={buttonClass} onClick={() => selectStage("Raw")}>
            <RotateCcw aria-hidden="true" className="size-4" />Reset
          </button>
        </div>

        <details className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <summary className="cursor-pointer rounded text-xs font-semibold text-slate-600 dark:text-slate-300">Inspect sample records</summary>
          <div className="mt-3 max-h-56 overflow-auto rounded-lg" tabIndex={0} role="region" aria-label="Sample records table">
            <table className="w-full text-left text-xs">
              <caption className="sr-only">Fictional input records and validation results</caption>
              <thead><tr>{["ID", "Month", "Value", "Validation"].map((label) => <th key={label} scope="col" className="p-2">{label}</th>)}</tr></thead>
              <tbody>{records.map((row) => <tr key={row.key} className="border-t border-slate-200 dark:border-slate-800"><td className="p-2 font-mono">{row.id}</td><td className="p-2">{row.month}</td><td className="p-2">{row.value ?? "—"}</td><td className="p-2">{row.issue ?? "Valid"}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  );
}

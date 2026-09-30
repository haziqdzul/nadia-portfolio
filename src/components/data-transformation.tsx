"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, CircleAlert, RotateCcw } from "lucide-react";
import { AudienceToggle, type AudienceView } from "./audience-toggle";
import { applyCorrections, demoCorrections, DEMO_THRESHOLD, readiness } from "@/lib/demo/readiness";

export function DataTransformation() {
  const id = useId();
  const reduce = useReducedMotion();
  const [view, setView] = useState<AudienceView>("business");
  const [resolved, setResolved] = useState<readonly string[]>([]);
  const [structured, setStructured] = useState(true);
  const result = readiness(applyCorrections(resolved));
  const percentage = result.percent.toFixed(1);

  function toggleCorrection(recordId: string) {
    setResolved((current) => current.includes(recordId)
      ? current.filter((value) => value !== recordId)
      : [...current, recordId]);
  }

  return (
    <section aria-labelledby={`${id}-title`} className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
      <div className="border-b border-slate-200 p-5 dark:border-slate-700">
        <p className="eyebrow">Interactive lab / Synthetic data</p>
        <h2 id={`${id}-title`} className="mt-2 text-xl font-semibold tracking-tight">Is this data ready for review?</h2>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">One question. Two ways to explain the answer.</p>
        <div className="mt-3"><AudienceToggle value={view} onChange={setView} controls={`${id}-view`} /></div>
      </div>

      <div className="p-5">
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow">Records passing checks</p><p className="mt-1 font-mono text-4xl font-semibold tracking-tight">{percentage}<span className="text-xl text-slate-500">%</span></p></div>
          <span className="mb-1 font-mono text-xs text-slate-600 dark:text-slate-400">{result.passed} / {result.total} records</span>
        </div>
        <div className="relative mt-4 h-3 rounded-full bg-slate-100 dark:bg-slate-800" role="meter" aria-label="Records passing demo validation" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Number(percentage)} aria-valuetext={`${result.passed} of ${result.total} records pass; ${percentage} percent`}>
          <motion.div initial={false} animate={{ scaleX: result.percent / 100 }} transition={{ duration: reduce ? 0 : 0.3 }} className="absolute inset-0 origin-left rounded-full bg-emerald-600 dark:bg-emerald-300" />
          <span aria-hidden="true" className="absolute -top-1 h-5 w-0.5 bg-slate-900 dark:bg-white" style={{ left: `${DEMO_THRESHOLD}%` }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400"><span>0%</span><span>Review threshold ≥ {DEMO_THRESHOLD}%</span><span>100%</span></div>
        <p role="status" aria-atomic="true" className="mt-3 min-h-10 text-sm font-medium text-emerald-800 dark:text-emerald-200">
          {result.passed} of {result.total} pass. {result.eligible ? "Review threshold met. Human approval still required." : "Below review threshold. Resolve the flagged records."}
        </p>

        <div id={`${id}-view`} className="mt-4 min-h-64 border-t border-slate-200 pt-4 dark:border-slate-700">
          {view === "business" ? (
            <motion.div key="business" initial={false} animate={{ opacity: [0.65, 1] }} transition={{ duration: reduce ? 0 : 0.18 }}>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">Each tile is the same event record throughout the demo. A check means its identifier, station, and units pass the defined rules.</p>
              <ul aria-label="Validation results for all twelve synthetic records" className="mt-4 grid grid-cols-4 gap-2">
                {result.checked.map((record) => <li key={record.id} className={`rounded-md border p-2 ${record.valid ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40" : "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30"}`}>
                  <span className="block font-mono text-[10px]">{record.id}</span>
                  <span className="mt-2 flex items-center gap-1 text-[10px]">{record.valid ? <Check aria-hidden="true" className="size-3" /> : <CircleAlert aria-hidden="true" className="size-3" />}{record.valid ? "Pass" : "Check"}</span>
                  <span className="sr-only">{record.issues.join(", ")}</span>
                </li>)}
              </ul>
            </motion.div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2"><p className="eyebrow">Same records / inspect structure</p><button type="button" aria-pressed={structured} onClick={() => setStructured(!structured)} className="min-h-11 rounded-md px-2 text-xs font-semibold text-emerald-800 dark:text-emerald-200">{structured ? "Show raw records" : "Structure records"}</button></div>
              <ul aria-label={structured ? "Structured event records" : "Raw event records"} className={`mt-2 max-h-52 overflow-y-auto overscroll-contain rounded-lg border border-slate-200 p-2 dark:border-slate-700 ${structured ? "space-y-1" : "grid grid-cols-2 gap-2"}`} tabIndex={0}>
                {result.checked.map((record) => <motion.li layout={reduce ? false : "position"} key={record.id} transition={{ duration: reduce ? 0 : 0.25 }} className="min-w-0 rounded bg-slate-50 p-2 font-mono text-[10px] leading-5 dark:bg-slate-950">
                  {structured ? <span className="flex flex-wrap justify-between gap-x-2"><span>{record.id} / {record.station}</span><span>{record.units ?? "NULL"} units · {record.valid ? "PASS" : "MISSING"}</span></span> : <code className="break-all">{JSON.stringify({ id: record.id, station: record.station, units: record.units })}</code>}
                </motion.li>)}
              </ul>
              <details className="mt-3 text-xs"><summary className="cursor-pointer py-2 font-medium">Inspect the calculation</summary><pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-emerald-200"><code>{`valid = unique(id) && nonEmpty(station)\n        && safeInteger(units) && units >= 0\nreadiness = ${result.passed} / ${result.total} * 100\nreview = readiness >= ${DEMO_THRESHOLD}`}</code></pre><p className="mt-2 leading-5 text-slate-500 dark:text-slate-400">Pseudocode for the TypeScript checks running in this demo.</p></details>
            </div>
          )}
        </div>

        <fieldset className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
          <legend className="px-1 text-xs font-semibold">Try a documented synthetic correction</legend>
          <div className="mt-2 flex flex-wrap gap-2">{Object.entries(demoCorrections).map(([recordId, units]) => <button key={recordId} type="button" aria-label={`Apply synthetic correction for ${recordId}: units ${units}`} aria-pressed={resolved.includes(recordId)} onClick={() => toggleCorrection(recordId)} className={`filter-button ${resolved.includes(recordId) ? "filter-active" : "filter-idle"}`}>{recordId} → {units}{resolved.includes(recordId) && <Check aria-hidden="true" className="size-3" />}</button>)}</div>
          <button type="button" onClick={() => setResolved([])} disabled={resolved.length === 0} className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs text-slate-600 disabled:cursor-default disabled:opacity-50 dark:text-slate-400"><RotateCcw aria-hidden="true" className="size-3" />Reset corrections</button>
        </fieldset>
        <p className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">Independent demonstration, not a client outcome. All 12 records and correction values are fictional. Passing these checks does not certify production readiness.</p>
      </div>
    </section>
  );
}

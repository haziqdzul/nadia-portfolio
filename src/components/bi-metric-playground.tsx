"use client";

import { useId, useState } from "react";
import { CircleCheck, TriangleAlert } from "lucide-react";

export function BIMetricPlayground() {
  const id = useId();
  const [target, setTarget] = useState(85);
  const [highDrift, setHighDrift] = useState(false);
  // Deterministic synthetic fixture: high drift moves 80 events out of SLA.
  const onTime = highDrift ? 820 : 900;
  const performance = onTime / 1000 * 100;
  const compliant = performance >= target;
  const gap = performance - target;

return <section aria-labelledby={`${id}-title`} className="h-full rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">    <header className="border-b border-slate-200 p-5 dark:border-slate-700">
      <p className="eyebrow">Interactive lab / Synthetic data</p>
      <h2 id={`${id}-title`} className="mt-2 text-xl font-semibold tracking-tight">BI Metric Playground</h2>
      <p className="eyebrow mt-3">02 // OPERATIONAL LOGIC SANDBOX</p>
      <p className="mt-3 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200">Metric Design &amp; Threshold Simulation</p>
      <h3 className="mt-3 text-lg font-semibold">Dynamic SLA Adjustment Simulator</h3>
      <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">Translate business risk into rules. Adjust the target and drift to see when an operational SLA triggers an alert.</p>
    </header>
    <div className="space-y-4 p-5">
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-400/20 dark:bg-indigo-400/5">
        <p className="eyebrow">Observed SLA performance</p>
        <p className="mt-2 font-mono text-4xl font-semibold tabular-nums">{performance}<span className="text-xl text-slate-500">%</span></p>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{onTime} of 1,000 events completed on time.</p>
        <div aria-hidden="true" className="relative mt-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700">
          <div style={{ width: `${performance}%` }} className="h-full rounded-full bg-indigo-500 transition-[width] duration-300 motion-reduce:transition-none" />
          <span style={{ left: `${target}%` }} className="absolute -top-1 h-5 w-0.5 bg-slate-950 dark:bg-white" />
        </div>
        <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">Target {target}% · Gap: {gap > 0 ? "+" : ""}{gap} percentage points</p>
      </div>
      <div>
        <div className="flex items-center justify-between gap-3"><label htmlFor={`${id}-target`} className="text-sm font-semibold">SLA target</label><span className="font-mono text-sm tabular-nums">{target}%</span></div>
        <input id={`${id}-target`} type="range" min={70} max={95} step={1} value={target} aria-valuetext={`${target} percent`} onChange={(event) => setTarget(Number(event.currentTarget.value))} className="mt-2 h-11 w-full cursor-pointer accent-indigo-500" />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400"><span>70% / tolerant</span><span>95% / strict</span></div>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold">Data drift variance</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">{([false, true] as const).map((high) => <button key={String(high)} type="button" aria-pressed={highDrift === high} onClick={() => setHighDrift(high)} className={`filter-button justify-center ${highDrift === high ? "filter-active" : "filter-idle"}`}>{high ? "High" : "Low"}</button>)}</div>
        <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">Synthetic stress scenario: high drift reduces on-time events by 80. This is an assumed effect, not a forecast.</p>
      </fieldset>
      <div role="status" aria-live="polite" aria-atomic="true" className={`flex h-36 items-center gap-3 rounded-xl border p-4 ${compliant ? "border-emerald-800 bg-slate-950 text-emerald-300" : "border-amber-500 bg-slate-950 text-amber-300"}`}>
        {compliant ? <CircleCheck aria-hidden="true" className="size-6 shrink-0" /> : <TriangleAlert aria-hidden="true" className="size-6 shrink-0" />}
        <div key={String(compliant)} className="showcase-fade"><p className="text-sm font-semibold">{compliant ? "Pipeline Compliant" : "SLA VIOLATION DETECTED: Action Required"}</p><p className="mt-2 text-xs leading-5 text-slate-300">{compliant ? "Observed performance meets the target. Continue monitoring." : "Observed performance is below target. Investigate delays and escalate for review."}</p></div>
      </div>
      <div className="rounded-lg bg-slate-50 p-4 text-xs leading-6 dark:bg-slate-950">
        <p className="font-semibold">Metric contract</p>
        <code className="mt-2 block break-words font-mono">on_time / total × 100 ≥ target</code>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Equality passes. Target changes policy; drift changes performance. Synthetic data only; no live alerts are sent.</p>
      </div>
    </div>
  </section>;
}



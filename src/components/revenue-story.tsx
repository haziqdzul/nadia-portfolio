"use client";

import { useId, useState } from "react";

const regions = ["North", "South", "Central"] as const;
type Region = (typeof regions)[number];
type Quarter = "Q1" | "Q2";
const dataset: Record<Quarter, Record<Region, { revenue: number; cost: number }>> = {
  Q1: { North: { revenue: 80000, cost: 64000 }, South: { revenue: 50000, cost: 32500 }, Central: { revenue: 30000, cost: 23500 } },
  Q2: { North: { revenue: 92000, cost: 78200 }, South: { revenue: 60000, cost: 36000 }, Central: { revenue: 33000, cost: 25740 } },
};
function metrics(quarter: Quarter, region: Region | null) {
  const rows = region ? [dataset[quarter][region]] : Object.values(dataset[quarter]);
  const revenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const cost = rows.reduce((sum, row) => sum + row.cost, 0);
  return { revenue, profit: revenue - cost, margin: (revenue - cost) / revenue * 100 };
}
const money = (value: number) => `RM ${(value / 1000).toFixed(1)}k`;
function story(quarter: Quarter, region: Region | null) {
  const current = metrics(quarter, region);
  const prior = metrics("Q1", region);
  if (!region) return quarter === "Q2"
    ? { headline: "More sales. A thinner margin.", evidence: `Revenue rose 15.6% from Q1, but gross margin fell from 25.0% to ${current.margin.toFixed(1)}%. North leads sales; South generates the most gross profit.`, action: "Investigate North’s cost mix before scaling. Compare South’s unit economics and capacity as a candidate for the next investment." }
    : { headline: "The biggest region is not the most profitable.", evidence: "North sells RM80.0k, but retains RM16.0k in gross profit. South sells RM50.0k and retains RM17.5k. Revenue alone gives an incomplete ranking.", action: "Click South, then switch to gross profit. Check margins before deciding where to invest." };
  return { headline: region === "North" ? "Sales leadership comes with a cost." : region === "South" ? "A smaller region creates stronger returns." : "Steady contribution deserves context.", evidence: `${region} generates ${money(current.revenue)} in sales and ${money(current.profit)} in gross profit: a ${current.margin.toFixed(1)}% margin.${quarter === "Q2" ? ` Q1 margin was ${prior.margin.toFixed(1)}%.` : " This is the baseline quarter."}`, action: region === "North" ? "Review product mix, discounts and fulfilment costs. This chart identifies the question; it does not establish the cause." : region === "South" ? "Evaluate capacity and customer acquisition costs before testing additional investment. High margin alone does not guarantee scalable growth." : "Investigate customer retention and operating capacity before changing investment. Compare the other regions for context." };
}

export function RevenueStory({ onAdvanced }: { onAdvanced: () => void }) {
  const id = useId();
  const [quarter, setQuarter] = useState<Quarter>("Q2");
  const [region, setRegion] = useState<Region | null>(null);
  const [measure, setMeasure] = useState<"revenue" | "profit">("revenue");
  const current = metrics(quarter, region);
  return <section aria-labelledby={`${id}-title`} className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
    <header className="p-5"><p className="eyebrow">Interactive BI story / 60-second walkthrough</p><h2 id={`${id}-title`} className="mt-3 text-2xl font-semibold tracking-tight">Revenue is growing. Where should we invest next?</h2><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Start with sales. Click a region, compare its profit, then decide what to investigate.</p><p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Fictional retail dataset · all figures in MYR · no client results claimed</p></header>
    <div className="border-t border-slate-200 p-5 dark:border-slate-700">
      <div className="flex flex-wrap justify-between gap-3"><div role="group" aria-label="Reporting quarter" className="flex gap-2">{(["Q1", "Q2"] as const).map((item) => <button type="button" key={item} aria-pressed={quarter === item} onClick={() => setQuarter(item)} className={`filter-button ${quarter === item ? "filter-active" : "filter-idle"}`}>{item}</button>)}</div><button type="button" onClick={() => { setRegion(null); setQuarter("Q2"); setMeasure("revenue"); }} className="min-h-11 text-xs font-semibold text-emerald-800 dark:text-emerald-300">Reset story</button></div>
      <p className="mt-4 font-mono text-xs text-slate-500 dark:text-slate-400">{quarter} / {region ?? "All regions"}</p>
      <dl className="mt-3 grid grid-cols-2 gap-3"><div><dt className="text-xs text-slate-500 dark:text-slate-400">Revenue</dt><dd className="mt-1 font-mono text-2xl font-semibold tabular-nums">{money(current.revenue)}</dd></div><div><dt className="text-xs text-slate-500 dark:text-slate-400">Gross margin</dt><dd className="mt-1 font-mono text-2xl font-semibold tabular-nums text-emerald-800 dark:text-emerald-300">{current.margin.toFixed(1)}%</dd></div></dl>
      <div role="group" aria-label="Chart measure" className="mt-5 flex gap-2">{(["revenue", "profit"] as const).map((item) => <button key={item} type="button" aria-pressed={measure === item} onClick={() => setMeasure(item)} className={`filter-button ${measure === item ? "filter-active" : "filter-idle"}`}>{item === "revenue" ? "Revenue" : "Gross profit"}</button>)}</div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Click a bar to filter the story. Click again to show all regions.</p>
      <div role="group" aria-label="Select a region from the chart" className="mt-3 space-y-2">{regions.map((name) => { const row = metrics(quarter, name); const value = row[measure]; return <button key={name} type="button" aria-pressed={region === name} aria-label={`${name}: ${measure === "revenue" ? "revenue" : "gross profit"} ${money(value)}`} onClick={() => setRegion(region === name ? null : name)} className={`block w-full rounded-lg border p-3 text-left transition-colors ${region === name ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-400/10" : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"}`}><span className="flex justify-between gap-2 text-xs"><span>{name}</span><span className="font-mono tabular-nums">{money(value)}</span></span><span aria-hidden="true" className="mt-2 block h-3 rounded-full bg-slate-100 dark:bg-slate-800"><span className="block h-full rounded-full bg-emerald-500 transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${value / (measure === "revenue" ? 100000 : 30000) * 100}%` }} /></span></button>; })}</div>
      <p className="mt-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">Shared scale: 0–{measure === "revenue" ? "RM100k revenue" : "RM30k gross profit"}</p>
    </div>
    <div className="border-t border-slate-200 p-5 dark:border-slate-700"><p className="eyebrow">What changed — and why it matters</p><div className="mt-3 grid" aria-live="polite" aria-atomic="true">{(["Q1", "Q2"] as const).flatMap((q) => [null, ...regions].map((r) => { const active = quarter === q && region === r; const narrative = story(q, r); return <div key={`${q}-${r}`} aria-hidden={!active} className="col-start-1 row-start-1" style={{ visibility: active ? "inherit" : "hidden" }}><h3 className="text-lg font-semibold">{narrative.headline}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{narrative.evidence}</p><p className="mt-4 text-sm leading-6"><strong>Recommended next step: </strong>{narrative.action}</p></div>; }))}</div>
      <details className="mt-4 text-xs"><summary className="cursor-pointer py-3 font-semibold">How are these metrics calculated?</summary><p className="mt-2 leading-6">Gross profit = revenue − cost of goods sold. Gross margin = gross profit / revenue × 100. All-region margin uses totals, not an average of regional percentages. Operating costs and acquisition costs are excluded.</p></details>
      <button type="button" onClick={onAdvanced} className="mt-5 min-h-11 text-sm font-semibold text-emerald-800 dark:text-emerald-300">Explore advanced policy scenarios →</button>
    </div>
  </section>;
}

"use client";

import { useId, useState, type ReactNode } from "react";
import { fuelScenario, capacityScenario } from "@/lib/policy-scenarios";

const contexts = [
  { eyebrow: "CASE STUDY 01 // POLICY METRICS", badge: "Targeted Fuel Subsidy & Consumption Framework", title: "BUDI MADANI / RON95 Impact Simulator", diagnostic: "Track illustrative B40 and M40 disposable incomes against fuel spending to investigate consumption patterns and potential leakage signals.", predictive: "Simulate fuel price ceilings and eligibility assumptions to compare fiscal savings with household cost exposure and compensatory support options." },
  { eyebrow: "CASE STUDY 02 // DEMOGRAPHIC DISPERSION", badge: "Resource Optimization & Aid Architecture", title: "Rohingya Refugee Operational Placement Model", diagnostic: "Explore fictional regional service-demand concentrations across Selangor, Penang, and Johor to identify potential healthcare infrastructure bottlenecks.", predictive: "Model decentralized service provision against municipal budgets to compare healthcare capacity constraints. This demonstration allocates service capacity, not people." },
] as const;

export function PolicyContext({ index }: { index: number }) {
  return <div className="mt-8 grid w-full max-w-lg self-start">{contexts.map((context, i) => <section key={context.title} aria-label={context.title} aria-hidden={index !== i} inert={index !== i} className="col-start-1 row-start-1 border-t border-slate-200 pt-5 dark:border-slate-800" style={{ visibility: index === i ? "visible" : "hidden" }}>
    <p className="eyebrow">{context.eyebrow}</p>
    <p className={`mt-3 inline-block rounded-full border px-3 py-2 text-xs font-semibold ${i === 0 ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200" : "border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200"}`}>{context.badge}</p>
    <h2 className="mt-4 text-2xl font-semibold tracking-tight">{context.title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-slate-100">Descriptive &amp; Diagnostic: </strong>{context.diagnostic}</p>
    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300"><strong className="text-slate-900 dark:text-slate-100">Predictive &amp; Prescriptive: </strong>{context.predictive}</p>
    <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">Independent synthetic study. No household records, UNHCR cardholder records, or measured policy outcomes are used.</p>
  </section>)}</div>;
}

function Layer({ label, children }: { label: string; children: ReactNode }) {
  return <div className="border-t border-slate-200 p-5 dark:border-slate-700"><p className="eyebrow mb-3">{label}</p>{children}</div>;
}

function Slider({ label, value, min, max, step = 1, display, onChange }: { label: string; value: number; min: number; max: number; step?: number; display: string; onChange: (value: number) => void }) {
  const id = useId();
  return <div className="mt-3"><div className="flex justify-between gap-3 text-sm"><label htmlFor={id}>{label}</label><span className="shrink-0 font-mono tabular-nums">{display}</span></div><input id={id} type="range" min={min} max={max} step={step} value={value} aria-valuetext={display} onChange={(e) => onChange(Number(e.currentTarget.value))} className="h-11 w-full cursor-pointer accent-emerald-600 dark:accent-emerald-300" /></div>;
}

function Action({ critical, warning, success }: { critical: boolean; warning: string; success: string }) {
  // Reserve both messages, but inherit slide visibility so inactive panels cannot leak text.
  return <div className={`rounded-lg border p-4 ${critical ? "border-amber-500 bg-slate-950 text-amber-200" : "border-emerald-700 bg-slate-950 text-emerald-200"}`}>
    <p className="mb-2 font-mono text-[10px] uppercase tracking-wider">Illustrative recommendation / human review required</p>
    <div className="grid text-sm leading-6" role="status" aria-live="polite" aria-atomic="true">{[success, warning].map((text, i) => <p key={text} className="col-start-1 row-start-1" aria-hidden={critical !== (i === 1)} style={{ visibility: critical === (i === 1) ? "inherit" : "hidden" }}>{text}</p>)}</div>
  </div>;
}

export function PolicySimulator({ kind }: { kind: "fuel" | "capacity" }) {
  const id = useId();
  const [cents, setCents] = useState(255);
  const [exclude, setExclude] = useState(false);
  const [density, setDensity] = useState(65);
  const [funding, setFunding] = useState(40);
  const fuel = fuelScenario(cents, exclude);
  const regional = capacityScenario(density, funding);
  const isFuel = kind === "fuel";
  return <section aria-labelledby={`${id}-title`} className="h-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
    <header className="p-5"><p className="eyebrow">Interactive lab / Synthetic data</p><h2 id={`${id}-title`} className="mt-2 text-xl font-semibold tracking-tight">{isFuel ? "Fuel Subsidy Optimization Matrix" : "Demographic Allocation Logic"}</h2><p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">Scenario analysis · illustrative coefficients · not an official policy model</p></header>
    <Layer label="01 / Descriptive · establish the baseline">
      <p className="text-xs text-slate-500 dark:text-slate-400">{isFuel ? "Projected annual fiscal savings · synthetic volume" : "Resource capacity saturation · synthetic network"}</p>
      <p className="mt-2 font-mono text-4xl font-semibold tabular-nums tracking-tight">{isFuel ? `RM ${fuel.savingsM.toFixed(1)}M` : `${regional.saturation.toFixed(1)}%`}</p>
      <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800">{isFuel ? `Est. CPI inflation vector: ${fuel.cpi.toFixed(2)}% · proxy only` : regional.critical ? "High Vulnerability Alert" : "Operational Buffer Sustained"}</p>
    </Layer>
    <Layer label="02 / Diagnostic · explain the pressure">
      {isFuel ? <div className="grid grid-cols-2 gap-3 text-xs"><p className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">B40 scenario<br /><strong className="mt-2 block font-mono text-lg">{fuel.burdenB40.toFixed(1)}%</strong>income spent on fuel</p><p className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">M40 scenario<br /><strong className="mt-2 block font-mono text-lg">{fuel.burdenM40.toFixed(1)}%</strong>income spent on fuel</p></div> : <div className="space-y-2">{[["Selangor", density], ["Penang", (100 - density) / 2], ["Johor", (100 - density) / 2]].map(([name, share]) => <div key={name} className="text-xs"><p className="flex justify-between"><span>{name} / assumed demand</span><span className="font-mono">{Number(share).toFixed(1)}%</span></p><div aria-hidden="true" className="mt-1 h-2 rounded bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded bg-indigo-500" style={{ width: `${share}%` }} /></div></div>)}</div>}
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{isFuel ? "Assumed monthly disposable income / fuel use: B40 RM2,500 / 120L; M40 RM5,500 / 180L. These are fictional profiles, not cohort estimates or detected leakage." : "100,000 assumed annual visits. The density cap is treated as the Selangor demand share; remaining demand is split equally. No actual regional UNHCR distribution is inferred."}</p>
    </Layer>
    <Layer label="03 / Predictive · stress the assumptions">
      {isFuel ? <><Slider label="Simulated RON95 float cap" value={cents} min={205} max={340} step={5} display={`RM ${fuel.price.toFixed(2)}/L`} onChange={setCents} /><label className="mt-2 flex min-h-11 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={exclude} onChange={(e) => setExclude(e.currentTarget.checked)} className="size-5 accent-emerald-600" />Exclusion Optimization / hypothetical T15</label><p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">Assume 15% of fuel volume pays RM3.40 when enabled. RM2.05–RM3.40 is a scenario range, not current BUDI95 eligibility or retail pricing.</p></> : <><Slider label="Regional density cap" value={density} min={40} max={90} display={`${density}%`} onChange={setDensity} /><Slider label="Municipal funding allocation" value={funding} min={10} max={80} display={`RM ${funding}M`} onChange={setFunding} /></>}
      <code className="mt-3 block break-words rounded-lg bg-slate-50 p-3 font-mono text-[11px] leading-5 dark:bg-slate-950">{isFuel ? "savings = 200M litres × (weighted price − 2.05); CPI proxy = price change % × 0.03" : "saturation = (100,000 × density / 100) / (60,000 + funding_M × 1,000) × 100"}</code>
    </Layer>
    <Layer label="04 / Prescriptive · compare response options">
      <Action critical={isFuel ? fuel.critical : regional.critical} warning={isFuel ? "CRITICAL ACTION REQUIRED: Projected cost burden exceeds M40 resilience thresholds. Deploy compensatory cash transfer mitigation cycles immediately via PADU." : "Action Required: Outpatient saturation model exceeded in Selangor municipal centers. Pivot to a decentralized healthcare voucher architecture across network clinics."} success={isFuel ? "Scenario within the RM2.80 review boundary. Continue household affordability monitoring before any policy decision." : "Operational buffer sustained. Compare clinic accessibility and funding coverage before allocating resources."} />
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{isFuel ? "RM2.80 is a demonstration trigger, not a validated M40 resilience threshold. The message is a simulated workflow; no PADU integration or actual transfer recommendation is made." : "55% is an illustrative early-review trigger, not a clinical overload threshold. Compare voluntary service-access options with local providers; this model does not assign or relocate individuals."}</p>
      <a className="mt-3 inline-block text-xs underline underline-offset-4" href={isFuel ? "https://www.mof.gov.my/portal/en/news/press-release/non-subsidised-ron95-retail-price-set-at-rm2-60-per-litre-as-budi95-commences" : "https://www.unhcr.org/my/what-we-do/figures-glance-malaysia"}>{isFuel ? "Policy context: Ministry of Finance (BUDI95)" : "Population context: UNHCR Malaysia"}</a>
    </Layer>
  </section>;
}



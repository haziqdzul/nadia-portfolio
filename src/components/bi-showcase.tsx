"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { analystExamples, type AnalystExample } from "@/lib/bi-showcase";

function ModelCanvas({ example }: { example: Extract<AnalystExample, { kind: "model" }> }) {
  const [zoom, setZoom] = useState(1);
  return <div className="flex h-full flex-col">
    <div role="group" aria-label="Diagram zoom" className="flex shrink-0 items-center justify-end gap-1 border-b border-slate-800 p-2">
      <button type="button" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((v) => Math.max(1, v - 0.25))} className="flex size-11 items-center justify-center rounded-md hover:bg-slate-800 disabled:opacity-30"><Minus className="size-4" /></button>
      <output aria-live="polite" className="w-12 text-center font-mono text-xs">{Math.round(zoom * 100)}%</output>
      <button type="button" aria-label="Zoom in" disabled={zoom >= 2.5} onClick={() => setZoom((v) => Math.min(2.5, v + 0.25))} className="flex size-11 items-center justify-center rounded-md hover:bg-slate-800 disabled:opacity-30"><Plus className="size-4" /></button>
      <button type="button" aria-label="Reset diagram zoom" onClick={() => setZoom(1)} className="flex size-11 items-center justify-center rounded-md hover:bg-slate-800"><RotateCcw className="size-4" /></button>
    </div>
    <div tabIndex={0} role="region" aria-label="Commercial model diagram; scroll to pan when zoomed" className="min-h-0 flex-1 overflow-auto overscroll-contain">
      <div className="relative" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%`, minHeight: 420 }}><Image src={example.src} alt={example.alt} fill sizes="(min-width: 1024px) 440px, 90vw" className="object-contain p-3" /></div>
    </div>
  </div>;
}

function SqlCanvas({ code }: { code: string }) {
  // Render tokens as React text, never untrusted HTML.
  const tokens = code.split(/(--[^\n]*|'[^']*'|\b(?:WITH|AS|SELECT|FROM|WHERE|AND|GROUP|BY|ORDER|OVER|SUM|LAG|ROUND|NULLIF|date_trunc)\b)/gi);
  return <pre tabIndex={0} aria-label="Illustrative SQL query; scroll to inspect" className="h-full overflow-auto overscroll-contain p-4 font-mono text-xs leading-7"><code>{tokens.map((token, i) => <span key={i} className={token.startsWith("--") ? "text-slate-400" : token.startsWith("'") ? "text-amber-200" : /^(WITH|AS|SELECT|FROM|WHERE|AND|GROUP|BY|ORDER|OVER|SUM|LAG|ROUND|NULLIF|date_trunc)$/i.test(token) ? "text-emerald-300" : "text-slate-100"}>{token}</span>)}</code></pre>;
}

export function BIShowcase() {
  const [index, setIndex] = useState(0);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const id = useId();
  const example = analystExamples[index];
  function select(next: number) { setIndex((next + analystExamples.length) % analystExamples.length); setFrameLoaded(false); }
  return <section aria-labelledby={`${id}-title`} className="h-full overflow-y-auto overscroll-contain rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <p className="eyebrow">BI analyst showcase</p>
      <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">Data. Meaning. Decisions.</h2>
      <p role="status" aria-atomic="true" className="mt-3 text-xs text-slate-600 dark:text-slate-300">Example {index + 1} of {analystExamples.length} · {example.category}</p>
      <div role="group" aria-label="Choose showcase category" className="mt-3 flex flex-wrap gap-2">{analystExamples.map((item, i) => <button key={item.id} type="button" aria-label={`Show ${item.category} example`} aria-pressed={i === index} aria-controls={`${id}-slide`} onClick={() => select(i)} className={`filter-button ${i === index ? "filter-active" : "filter-idle"}`}>{item.category}</button>)}</div>
    </header>
    <div id={`${id}-slide`}>
      <div key={example.id} className="showcase-fade transition-opacity duration-300 motion-reduce:transition-none">
        <div className="p-4">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{example.domain}</span>
          <h3 className="mt-3 text-lg font-semibold">{example.title}</h3>
          <p className="mt-3 inline-block rounded-lg border border-emerald-300 px-3 py-2 font-mono text-xl font-semibold text-emerald-800 dark:border-emerald-800 dark:text-emerald-300">{example.metric}</p>
          <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{example.metricContext}</p>
          <ul aria-label="Technical stack" className="mt-3 flex flex-wrap gap-2">{example.stack.map((tool) => <li key={tool} className="rounded border border-slate-200 px-2 py-1 text-[11px] dark:border-slate-700">{tool}</li>)}</ul>
        </div>
        <div className="relative h-[520px] overflow-hidden bg-slate-950 text-slate-100">
          {example.kind === "dashboard" && <><iframe title="Synthetic revenue and margin dashboard" src={example.src} sandbox="allow-scripts" referrerPolicy="no-referrer" onLoad={() => setFrameLoaded(true)} className="h-full w-full border-0" />{!frameLoaded && <p role="status" className="pointer-events-none absolute inset-x-0 top-4 text-center text-xs text-slate-300">Loading dashboard…</p>}</>}
          {example.kind === "model" && <ModelCanvas example={example} />}
          {example.kind === "sql" && <SqlCanvas code={example.code} />}
        </div>
        <div className="p-4"><p className="eyebrow">So what?</p><p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{example.decision}</p><p className="mt-4 text-[11px] leading-5 text-slate-500 dark:text-slate-400">Independent portfolio example · synthetic data and illustrative architecture. No measured client outcome is claimed.</p>{example.kind === "dashboard" && <a href={example.src} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 dark:text-emerald-300">Open dashboard in a new tab ↗</a>}</div>
      </div>
    </div>
  </section>;
}


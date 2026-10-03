"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { useInteractionPause } from "./use-interaction-pause";

// Set to true when the BI analysis invitation is ready to be shown again.
const showBiInvitation = false;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const monthlyCounts = [3, 4, 4, 5, 6, 6, 7, 8, 11]; // 54 cleaned records.
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const readMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotion = () => true;

const records = Array.from({ length: 64 }, (_, i) => ({
  id: i,
  x: 28 + ((i * 137 + 59) % 504),
  y: 28 + ((i * 89 + 17) % 370),
  issue: i < 6 ? "null" : i < 10 ? "duplicate" : null,
  group: i % 3,
}));
const clean = records.filter((record) => !record.issue);
const insightPositions = monthlyCounts.flatMap((count, month) =>
  Array.from({ length: count }, (_, dot) => ({ x: 48 + month * 58, y: 384 - dot * 16 })),
);
const modes = ["Raw", "Cleaned", "Insight"] as const;

export function PipelineCover({ onOpen, active = true }: { onOpen: () => void; active?: boolean }) {
  const [mode, setMode] = useState<(typeof modes)[number]>("Raw");
  const id = useId();
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, serverMotion);
  const { paused, handlers } = useInteractionPause();
  const autoPlaying = playing && !paused && !reducedMotion;
  useEffect(() => {
    if (!autoPlaying || !active) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setMode((current) => modes[(modes.indexOf(current) + 1) % modes.length]);
      }
    }, 2000);
    return () => window.clearInterval(timer);
  }, [autoPlaying, active]);
  return <div className="min-w-0 self-start">
    <section aria-labelledby={`${id}-title`} className="pipeline-themed overflow-hidden rounded-2xl border border-emerald-950/15 bg-[#192420] text-[#b8c9c2] shadow-sm dark:border-emerald-100/10">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 p-4">
        <h2 id={`${id}-title`} className="flex items-center gap-2 font-mono text-xs"><span aria-hidden="true" className="size-2 rounded-sm bg-emerald-200/70" />pipeline.view</h2>
        <div role="group" aria-label="Pipeline view" className="flex rounded-lg border border-white/5 bg-black/15 p-1">{modes.map((item) => <button key={item} type="button" aria-pressed={mode === item} aria-controls={`${id}-canvas`} onClick={() => { setPlaying(false); setMode(item); }} className={`min-h-11 rounded-md px-3 font-mono text-xs transition-colors ${mode === item ? "bg-white/5 text-white shadow-sm" : "text-[#91a7a0] hover:text-white"}`}>{item}</button>)}</div>
      </header>
      <div className="flex items-center justify-between px-4 pt-2 font-mono text-[10px] text-[#91a7a0]">
        <span>{autoPlaying ? "Auto-playing / 2s per stage" : "Manual exploration"}</span>

      </div>
      <div id={`${id}-canvas`} {...handlers} tabIndex={0} aria-label="Animated pipeline. Hover or focus to pause; click or tap to toggle playback." data-paused={!autoPlaying}>
        <svg viewBox="0 0 560 440" role="img" aria-labelledby={`${id}-chart-title ${id}-chart-desc`} className="block h-auto w-full">
          <title id={`${id}-chart-title`}>{`${mode} synthetic records`}</title>
          <desc id={`${id}-chart-desc`}>{mode === "Raw" ? "64 records, including six nulls and four duplicates." : mode === "Cleaned" ? "54 valid records, arranged in rows after removing six null records and four duplicate records." : "54 valid records by month: January 3, February 4, March 4, April 5, May 6, June 6, July 7, August 8, September 11. September is the peak."}</desc>
          {records.map((record) => {
            const position = clean.findIndex((item) => item.id === record.id);
            const insight = insightPositions[position];
            const x = mode === "Raw" || record.issue ? record.x : mode === "Insight" ? insight.x : 64 + (position % 9) * 54;
            const y = mode === "Raw" || record.issue ? record.y : mode === "Insight" ? insight.y : 62 + Math.floor(position / 9) * 60;
            return <g key={record.id} style={{ transform: `translate(${x}px, ${y}px)`, opacity: mode !== "Raw" && record.issue ? 0 : 1 }} className="transition-all duration-700 ease-in-out motion-reduce:transition-none">
              <g className={mode === "Raw" ? "pipeline-drift" : undefined} style={{ animationDelay: `${-record.id * 0.17}s`, animationPlayState: autoPlaying && active ? "running" : "paused" }}>
              <circle r="6" fill={record.issue === "null" ? "none" : record.issue === "duplicate" ? "var(--pipe-warning)" : mode === "Insight" ? "var(--pipe-insight)" : "var(--pipe-dot)"} stroke={record.issue === "null" ? "var(--pipe-warning)" : "none"} strokeWidth="2" strokeDasharray={record.issue === "null" ? "2 3" : undefined} />
              {(record.id === 0 || record.id === 6) && mode === "Raw" && <text x="12" y="4" fill="var(--pipe-warning)" fontSize="10" fontFamily="monospace">{record.issue === "null" ? "null" : "dup"}</text>}
              </g>
            </g>;
          })}
          <g fontFamily="monospace" opacity={mode === "Insight" ? 1 : 0} className="transition-opacity duration-500 motion-reduce:transition-none">
            <line x1="38" y1="392" x2="524" y2="392" stroke="var(--pipe-grid)" />
            {monthlyCounts.map((_, month) => <g key={months[month]}>
              <text x={48 + month * 58} y="414" textAnchor="middle" fill="#91a7a0" fontSize="11">{months[month]}</text>
            </g>)}
            <polyline points={monthlyCounts.map((count, month) => `${48 + month * 58},${384 - count * 16}`).join(" ")} fill="none" stroke="var(--pipe-line)" strokeWidth="2" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={mode === "Insight" ? 0 : 1} className="transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none" />
            {monthlyCounts.map((count, month) => <circle key={months[month]} cx={48 + month * 58} cy={384 - count * 16} r={month === 8 ? 5 : 3} fill={month === 8 ? "var(--pipe-line)" : "#192420"} stroke="var(--pipe-line)" strokeWidth="2" />)}
          </g>
        </svg>
      </div>
      <footer className="flex flex-wrap justify-between gap-2 border-t border-white/5 px-4 py-3 font-mono text-[11px]"><p aria-live={autoPlaying ? "off" : "polite"}>{mode === "Raw" ? "64 records · 6 nulls · 4 duplicates" : mode === "Cleaned" ? "54 valid records · 10 removed" : "Records per month · Sep is the peak (11)"}</p><span className="text-[#91a7a0]">Illustrative sample</span></footer>
    </section>
    <div hidden={!showBiInvitation} className="mt-5 rounded-xl border border-slate-200 p-5 dark:border-slate-700">
      <p className="text-lg font-semibold tracking-tight">Think you know what a BI analyst does?</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Go beyond the dashboard. Click regions, compare profit, and watch the business story change. Then explore the policy case studies.</p>
      <button type="button" onClick={onOpen} className="action-button mt-4">See BI analysis in action <span aria-hidden="true">→</span></button>
    </div>
  </div>;
}







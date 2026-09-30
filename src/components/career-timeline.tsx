"use client";

import { useId, useState } from "react";

type Milestone = Readonly<{
  id: string;
  label: string;
  date: string;
  month: string;
  description: string;
}>;

const milestones = [
  { id: "training", label: "Training", date: "2025-02", month: "February", description: "User training ahead of the STATSDW rollout." },
  { id: "uat", label: "UAT", date: "2025-03", month: "March", description: "User acceptance testing for the STATSDW platform." },
  { id: "pat", label: "PAT / TOT / TOK", date: "2025-04", month: "April", description: "The PAT, TOT and TOK delivery milestone." },
  { id: "launch", label: "Go-live", date: "2025-06", month: "June", description: "STATSDW go-live milestone." },
  { id: "fat", label: "FAT", date: "2025-07", month: "July", description: "The final acceptance testing milestone following go-live." },
] as const satisfies readonly Milestone[];

type MilestoneId = (typeof milestones)[number]["id"];

// Year-level ranges from the reference; no precise employment months implied.
const roles = [
  { id: "analyst", title: "Business Intelligence Analyst", organization: "DataMicron System Sdn Bhd", period: "2024 – present", start: 2024, end: 2026, current: true },
  { id: "intern", title: "Intern, ESG & climate risk", organization: "MCIS Insurance Berhad", period: "Dates not specified", start: null, end: null, current: false },
  { id: "degree", title: "BSc (Hons) Statistics", organization: "UiTM Shah Alam", period: "2020 – 2024", start: 2020, end: 2024, current: false },
] as const;

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export function CareerTimeline() {
  const id = useId();
  const [selected, setSelected] = useState<MilestoneId>("launch");
  const active = milestones.find((milestone) => milestone.id === selected)!;

  return (
    <section id="experience" aria-labelledby={`${id}-heading`} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Experience</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id={`${id}-heading`} className="section-heading">Career timeline</h2>
        <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">Select a milestone to see its role in the delivery sequence.</p>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white/75 p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/70">
        <div aria-hidden="true" className="mb-2 hidden grid-cols-[15rem_1fr] gap-6 md:grid">
          <span className="text-xs text-slate-500 dark:text-slate-400">Year-level overview</span>
          <div className="grid grid-cols-7 font-mono text-xs text-slate-500 dark:text-slate-400">{years.map((year) => <span key={year}>{year}</span>)}</div>
        </div>

        <ol className="divide-y divide-slate-200 dark:divide-slate-700">
          {roles.filter((role) => role.start !== null).map((role) => (
            <li key={role.id} className="grid gap-4 py-6 md:grid-cols-[15rem_1fr] md:items-center md:gap-6">
              <div>
                <h3 className="font-semibold">{role.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{role.organization}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">{role.period}</p>
              </div>
              <div aria-hidden="true" className="relative hidden min-h-12 grid-cols-7 items-center md:grid">
                <div className="pointer-events-none absolute inset-0 grid grid-cols-7">{years.map((year) => <span key={year} className="border-l border-slate-200/70 dark:border-slate-700/50" />)}</div>
                {role.start !== null && role.end !== null ? (
                  <div
                    style={{ gridColumn: `${role.start - 2020 + 1} / ${role.end - 2020 + 2}` }}
                    className={`relative mx-1 h-7 rounded-md border ${role.current ? "border-emerald-600 bg-emerald-600 dark:border-emerald-300 dark:bg-emerald-300" : "border-emerald-400 bg-emerald-100 dark:border-emerald-500 dark:bg-emerald-400/10"}`}
                  >
                    {role.current && <span className="absolute -right-1 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-700 dark:border-slate-900 dark:bg-emerald-200" />}
                  </div>
                ) : <span className="relative col-span-7 px-3 text-xs text-slate-500 dark:text-slate-400">Dates to be confirmed</span>}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-700"><p className="eyebrow">Additional experience</p><h3 className="mt-2 font-semibold">Intern, ESG &amp; climate risk</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">MCIS Insurance Berhad</p></div>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-600 dark:text-slate-400" aria-label="Timeline legend">
          <span className="flex items-center gap-2"><span aria-hidden="true" className="size-3 rounded-sm bg-emerald-600 dark:bg-emerald-300" />Current role</span>
          <span className="flex items-center gap-2"><span aria-hidden="true" className="size-3 rounded-sm border border-emerald-400" />Past</span>
          <span className="flex items-center gap-2"><span aria-hidden="true" className="size-2.5 rotate-45 border border-emerald-400" />Milestone</span>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">
          <h3 className="text-lg font-semibold">DOSM STATSDW milestones</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Training → FAT · 2025</p>
          <ul aria-label="Select a delivery milestone" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {milestones.map((milestone) => (
              <li key={milestone.id}>
                <button
                  type="button"
                  aria-pressed={selected === milestone.id}
                  aria-controls={`${id}-detail`}
                  onPointerEnter={(event) => { if (event.pointerType === "mouse") setSelected(milestone.id); }}
                  onFocus={() => setSelected(milestone.id)}
                  onClick={() => setSelected(milestone.id)}
                  className={`flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border px-2 py-4 text-center text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 motion-reduce:transition-none ${selected === milestone.id ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:border-emerald-300 dark:bg-emerald-400/10 dark:text-emerald-200" : "border-slate-200 text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:text-slate-300"}`}
                >
                  <span aria-hidden="true" className={`size-3 rotate-45 border border-current ${selected === milestone.id ? "bg-current" : ""}`} />
                  <span className="font-semibold">{milestone.label}</span>
                  <time dateTime={milestone.date}>{milestone.month} 2025</time>
                </button>
              </li>
            ))}
          </ul>
          <div id={`${id}-detail`} role="status" aria-live="polite" aria-atomic="true" className="mt-5 min-h-32 rounded-xl bg-emerald-50 p-5 dark:bg-slate-950/70">
            <p className="font-mono text-xs text-emerald-700 dark:text-emerald-300"><time dateTime={active.date}>{active.month} 2025</time></p>
            <h4 className="mt-2 font-semibold">{active.label}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


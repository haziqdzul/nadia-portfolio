"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Database, GitBranch } from "lucide-react";
import { AudienceToggle, type AudienceView } from "./audience-toggle";

const fields = [
  { id: "event_id", source: "event_key · text", target: "VARCHAR2(12 CHAR)", rule: "Preserve the supplied identifier; reject blank, duplicate, or overlength values.", sample: "EV-01 → EV-01", boundary: "13 characters → reject; duplicate identifier → reject", reason: "A stable key lets reviewers trace a reporting value back to its source event." },
  { id: "station_id", source: "station_code · text", target: "VARCHAR2(8 CHAR)", rule: "Resolve each code against the fictional station dimension; do not silently invent a station.", sample: "NORTH → NORTH", boundary: "Unknown station → quarantine for review", reason: "Referential integrity prevents events from being grouped under an unknown station." },
  { id: "event_at", source: "local_event_time · ISO text", target: "TIMESTAMP(3)", rule: "This example assumes local wall-clock time and millisecond precision. A timezone-bearing source needs a separate policy.", sample: "2030-01-01T08:15:30.125 → same local timestamp", boundary: "Impossible date or timezone suffix → reject under this example policy", reason: "An explicit temporal contract prevents silent precision or timezone changes." },
  { id: "units", source: "unit_count · text", target: "NUMBER(8,0)", rule: "Accept whole units from 0 to 99,999,999. Reject missing, fractional, negative, or out-of-range input before conversion.", sample: "12 → 12", boundary: "-1 / 2.5 / 100000000 / empty → reject", reason: "Validated quantities make the daily total interpretable without silently rounding records." },
] as const;

const ddl = `-- Fictional teaching schema; not client DDL.
CREATE TABLE dim_station (
  station_id VARCHAR2(8 CHAR) PRIMARY KEY
);

CREATE TABLE fact_event (
  event_id   VARCHAR2(12 CHAR) PRIMARY KEY,
  station_id VARCHAR2(8 CHAR) NOT NULL,
  event_at   TIMESTAMP(3) NOT NULL,
  units      NUMBER(8,0) NOT NULL,
  CONSTRAINT event_station_fk FOREIGN KEY (station_id)
    REFERENCES dim_station (station_id),
  CONSTRAINT units_nonnegative CHECK (units >= 0)
);
-- Validate source strings before inserting.
-- Grain: one accepted source event per event_id.`;

export function SchemaEvidence() {
  const id = useId();
  const reduce = useReducedMotion();
  const [view, setView] = useState<AudienceView>("business");
  const [fieldId, setFieldId] = useState<(typeof fields)[number]["id"]>("units");
  const field = fields.find((item) => item.id === fieldId)!;

  return (
    <section aria-labelledby={`${id}-title`} className="mt-8 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-7 dark:border-slate-700">
        <div><p className="eyebrow">Independent evidence lab / Fictional event warehouse</p><h4 id={`${id}-title`} className="mt-2 text-xl font-semibold">From source field to trusted measure</h4><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">Question: how many valid units were recorded per station and day?</p></div>
        <AudienceToggle value={view} onChange={setView} controls={`${id}-content`} />
      </div>

      <div id={`${id}-content`} className="p-5 sm:p-7">
        <figure>
          <figcaption className="mb-4 flex items-center gap-2 text-xs font-semibold"><GitBranch className="size-4 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />Lineage / the same event remains traceable</figcaption>
          <ol className="grid gap-3 md:grid-cols-3">
            {[
              ["01 / Source", "event_feed", "One fictional event per record", "Identifier · station · time · units"],
              ["02 / Validate", "fact_event", "One accepted event per event_id", "Rejected inputs → review queue"],
              ["03 / Report", "station_daily", "One row per station and day", "SUM(units) over accepted events"],
            ].map(([label, table, grain, note], index) => <li key={table} className="relative rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="eyebrow">{label}</p><p className="mt-3 flex items-center gap-2 font-mono text-sm font-semibold"><Database aria-hidden="true" className="size-4 text-emerald-700 dark:text-emerald-300" />{table}</p><p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-300">{grain}</p><p className="mt-2 border-t border-slate-100 pt-3 text-[11px] leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">{note}</p>{index < 2 && <ArrowRight aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden size-5 rounded-full bg-slate-50 text-emerald-700 md:block dark:bg-slate-950 dark:text-emerald-300" />}
            </li>)}
          </ol>
          <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-400">Lookup relationship: each station can have many events; each accepted event references one station. Unknown stations enter the review queue.</p>
        </figure>

        <div className="mt-6 min-h-80">
          {view === "business" ? <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30"><p className="eyebrow">What makes the result useful</p><h5 className="mt-3 text-lg font-semibold">Traceable totals, visible exceptions.</h5><p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">A reviewer can follow a daily total back to accepted events. Missing quantities and unknown stations stay visible as exceptions instead of disappearing into the metric.</p></div>
            <div className="p-5"><p className="eyebrow">Decision boundary</p><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">These rules explain which records enter the total. They do not establish that every real-world event was captured or that the business measure is complete.</p><p className="mt-4 text-sm font-medium">Switch to Technical view to inspect types, boundaries and DDL.</p></div>
          </div> : <div>
            <p className="eyebrow">Schema matrix / select a field</p>
            <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700" role="region" aria-label="Fictional schema mapping matrix" tabIndex={0}>
              <table className="w-full min-w-[34rem] text-left text-xs">
                <caption className="sr-only">Source-to-Oracle design mappings. Select a field to inspect its assumptions.</caption>
                <thead className="bg-slate-100 dark:bg-slate-900"><tr><th scope="col" className="p-3">Field</th><th scope="col" className="p-3">Source</th><th scope="col" className="p-3">Oracle target</th></tr></thead>
                <tbody>{fields.map((item) => <tr key={item.id} className={`border-t border-slate-200 dark:border-slate-700 ${fieldId === item.id ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-white dark:bg-slate-950"}`}><th scope="row" className="px-3"><button type="button" aria-pressed={fieldId === item.id} aria-controls={`${id}-field`} onClick={() => setFieldId(item.id)} className="min-h-12 font-mono font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 dark:text-emerald-200">{item.id}</button></th><td className="p-3 font-mono">{item.source}</td><td className="p-3 font-mono">{item.target}</td></tr>)}</tbody>
              </table>
            </div>
            <motion.div id={`${id}-field`} key={fieldId} initial={false} animate={{ opacity: [0.65, 1] }} transition={{ duration: reduce ? 0 : 0.2 }} className="mt-4 rounded-lg border-l-2 border-emerald-600 bg-white p-5 dark:bg-slate-900" aria-live="polite" aria-atomic="true">
              <p className="font-mono text-sm font-semibold">{field.id} → {field.target}</p><p className="mt-3 text-sm leading-7">{field.rule}</p><dl className="mt-4 space-y-3 text-xs leading-6"><div><dt className="font-semibold text-emerald-800 dark:text-emerald-300">Expected mapping</dt><dd className="font-mono">{field.sample}</dd></div><div><dt className="font-semibold text-amber-800 dark:text-amber-300">Boundary policy</dt><dd>{field.boundary}</dd></div><div><dt className="font-semibold">Why this choice matters</dt><dd className="text-slate-600 dark:text-slate-400">{field.reason}</dd></div></dl>
            </motion.div>
            <details className="mt-4"><summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">Inspect fictional Oracle DDL</summary><pre tabIndex={0} aria-label="Example Oracle table definitions" className="overflow-x-auto rounded-lg bg-slate-950 p-5 text-xs leading-6 text-emerald-200"><code>{ddl}</code></pre><p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">Design example; not executed against Oracle in this portfolio. Source validation is separate from DDL constraints, including checks that prevent numeric rounding.</p></details>
          </div>}
        </div>
        <details className="mt-5 border-t border-slate-200 pt-3 text-xs dark:border-slate-700"><summary className="min-h-11 cursor-pointer py-3 font-medium">Evidence provenance · independent synthetic example</summary><p className="max-w-3xl pb-2 leading-6 text-slate-600 dark:text-slate-400">All entities, fields, relationships and records were created for this portfolio demonstration. This is not a reconstruction of a client system, a client artifact, or a claim of production validation. The rules illustrate technical reasoning without exposing restricted client material.</p></details>
      </div>
    </section>
  );
}

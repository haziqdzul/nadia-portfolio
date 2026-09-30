export function RequirementsEvidence() {
  return (
    <figure className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
      <figcaption className="text-sm font-semibold">One requirement, traced to a test</figcaption>
      <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">Independent synthetic example · not a DOSM requirement or test result.</p>
      <ol className="mt-5 space-y-5 border-l border-emerald-600/40 pl-5">
        {[
          ["Question", "Which events belong to the selected station?"],
          ["REQ-DEMO-01", "Selecting North must return only records whose station is North."],
          ["TEST-DEMO-01", "Given EV-01 at North and EV-02 at South, select North."],
          ["Expected evidence", "EV-01 is visible; EV-02 is excluded. Record observed results and reviewer approval before acceptance."],
        ].map(([label, text]) => <li key={label} className="relative"><span aria-hidden="true" className="absolute -left-[25px] top-1 size-2 rounded-full bg-emerald-600 dark:bg-emerald-300" /><p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">{label}</p><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p></li>)}
      </ol>
      <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-500 dark:border-slate-700 dark:text-slate-400">Illustrative acceptance script. No client execution, sign-off or approval is implied.</p>
    </figure>
  );
}
